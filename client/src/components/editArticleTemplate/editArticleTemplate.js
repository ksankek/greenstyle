import {toastMixin} from "@/mixins/toastMixin";

export default {
    name: 'templateEditArticle',
    mixins: [toastMixin],
    props: {
        article: Object
    },
    data() {
        return {
            selectedSectionId: {},
            imageFiles: null,
            editArticle: {}
        }
    },
    created() {
        this.$options.static = {
            sections: [
                {
                    id: 1,
                    name: 'Спорт'
                },
                {
                    id: 2,
                    name: 'Правильное питание'
                },
                {
                    id: 3,
                    name: 'Вредные привычки'
                }
            ],
            toolbarOptions: [
                ['bold', 'italic', 'underline', 'strike'],
                ['blockquote'],
                [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                [{'size': ['small', 'normal', 'large', 'huge']}],
                [{ 'color': [] }, { 'background': [] }],
                [{ 'font': [] }],
                [{ 'align': [] }],
            ]
        }

        this.modifiedArticle(this.article)
    },
    watch: {
        article: function () {
            this.modifiedArticle(this.article)
        }
    },
    methods: {
        reqEditArticle() {
            this.$http({
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.token}`
                },
                url: `http://localhost:5000/api/article/${this.article.id}`,
                data: JSON.stringify(this.editArticle)
            }).then(res => {
                if (res.status === 200) {
                    if (this.imageFiles) {
                        this.imageFiles.forEach(img => {
                            this.reqAddPhoto(img, this.article.id)
                        })
                    }
                    this.setToastSuccess(res.data.msg)
                    this.$root.$emit('closeArticleDialog', false)
                }
            })
        },

        reqCreateArticle() {
            this.$http({
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.token}`
                },
                url: `http://localhost:5000/api/article`,
                data: JSON.stringify(this.editArticle)
            }).then(res => {
                if (res.status === 200) {
                    this.imageFiles.forEach(img => {
                        this.reqAddPhoto(img, res.data.id)
                    })
                    this.setToastSuccess('Статья успешно создана')
                    this.$root.$emit('closeArticleDialog', false)
                }
            }).catch(err => {
                if (err.response.status === 400) {
                    this.setToastError('Статья с таким названием уже существует')
                }
            })
        },

        reqAddPhoto(img, id) {
            const data = new FormData()
            data.append('img', img)

            this.$http({
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.token}`
                },
                url: `http://localhost:5000/api/article/photo/${id}`,
                data: data
            }).then(res => {
                if (res.status === 200) {
                    console.log(res)
                }
            })
        },

        reqDeletePhoto(img) {
            this.$http({
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.token}`
                },
                url: `http://localhost:5000/api/article/${this.article.id}/photo/${img}`
            }).then(res => {
                if (res.status === 200) {
                    this.reqGetArticle(this.article.id)
                }
            })
        },

        reqGetArticle(id) {
            this.$http({
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                url: `http://localhost:5000/api/article/${id}`
            }).then(res => {
                if (res.status === 200) {
                    this.modifiedArticle(res.data)
                }
            })
        },

        modifiedArticle(article) {
            this.editArticle = {
                name: article?.name,
                sectionId: article?.sectionId || 1,
                description: article?.description,
                files: article?.files
            }
            return this.editArticle
        },

        modifiedUserPhoto(photo) {
            return `http://localhost:5000/${photo}`
        },
    }
}

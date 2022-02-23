import {mapGetters} from "vuex";

export default {
    name: 'HabitsPage',
    components: {},
    props: {
    },
    data() {
        return {
            articles: [],
            inFavourite: []
        }
    },
    created() {
        if (this.USER.id) {
            this.reqGetFavourite().then(res => {
                console.log(res)
                this.reqGetAllArticles()
            })
        }
    },
    mounted() {
    },
    watch: {
        USER: function () {
            this.reqGetFavourite().then(res => {
                console.log(res)
                this.reqGetAllArticles()
            })
        }
    },
    computed: {
        ...mapGetters(['USER']),
    },
    methods: {
        reqGetAllArticles() {
            this.$http({
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                url: `http://localhost:5000/api/article/all/3`
            }).then(res => {
                if (res.status === 200) {
                    const modArticles = res.data
                    modArticles.forEach(item => {
                        const favouriteStatus = this.inFavourite.find(({articleId}) => item.id === articleId)
                        item.inFavourite = !!favouriteStatus;
                    })
                    this.articles = modArticles
                }
            })
        },

        reqGetFavourite() {
            return this.$http({
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.token}`
                },
                url: `http://localhost:5000/api/favourite/${this.USER.id}`
            }).then(res => {
                this.inFavourite = res.data
            })
        },

        getPhoto(url) {
            return `http://localhost:5000/${url}`
        },

        reqAddToFavourite(articleId) {
            this.$http({
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.token}`
                },
                url: `http://localhost:5000/api/favourite`,
                data: JSON.stringify({
                    favouriteId: this.USER.id,
                    articleId: articleId
                })
            }).then(res => {
                if (res.status === 200) {
                    this.reqGetFavourite().then(res => {
                        console.log(res)
                        this.reqGetAllArticles()
                    })
                }
            })
        },

        reqDeleteFromFavourite(idArticle) {
            const {id} = this.inFavourite.find(({articleId}) => idArticle === articleId)

            this.$http({
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.token}`
                },
                url: `http://localhost:5000/api/favourite/${id}`
            }).then(res => {
                if (res.status === 200) {
                    this.reqGetFavourite().then(res => {
                        console.log(res)
                        this.reqGetAllArticles()
                    })
                }
            })
        },

        addFavourite(article) {
            if (article.inFavourite) {
                this.reqDeleteFromFavourite(article.id)
            } else {
                this.reqAddToFavourite(article.id)
            }
        }
    }
}

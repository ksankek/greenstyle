import { Carousel, Slide } from 'vue-carousel';
import {mapGetters} from "vuex";

export default {
    name: 'ViewPage',
    components: {Carousel, Slide},
    props: {
        id: {
            type: [String, Number],
            default: 0
        }
    },
    data() {
        return {
            article: {},
            commentObj: {
                comment: ''
            },
            allUsers: []
        }
    },
    created() {
        this.reqGetArticle()
        this.getUsers()
    },
    mounted() {
    },
    watch: {
    },
    computed: {
        ...mapGetters(['USER']),

        modifiedArticle() {
            return {
                name: this.article.name,
                files: this.article.files,
                description: this.article.description,
                comments: this.article.comments?.reverse()
            }
        }
    },
    methods: {
        reqGetArticle() {
            this.$http({
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                url: `http://localhost:5000/api/article/${this.id}`
            }).then(res => {
                if (res.status === 200) {
                    this.article = res.data
                }
            })
        },
        reqSendComment() {
            this.commentObj.userId = this.USER.id;
            this.commentObj.date = new Date()

            this.$http({
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.token}`
                },
                url: `http://localhost:5000/api/article/comment/${this.id}`,
                data: JSON.stringify(this.commentObj)
            }).then(res => {
                if (res.status === 200) {
                    this.reqGetArticle()
                }
            })
        },
        getUsers() {
            this.$http({
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.token}`
                },
                url: `http://localhost:5000/api/user`
            }).then(res => {
                if (res.status === 200) {
                    this.allUsers = res.data
                }
            })
        },
        getCommentUser(userId, field) {
            let obj = {}
            this.allUsers.forEach(({id, firstname, lastname, photo}) => {
                if (id === userId) {
                    let fullName
                    if (firstname !== null && lastname !== null) {
                        fullName = `${firstname} ${lastname}`
                    } else {
                        fullName = ''
                    }

                    obj = {fullName, photo}
                }
            })

            return obj[field]
        },
        modifiedDate(value) {
            const formatter = new Date(value)
            return formatter.toLocaleDateString('ru-RU', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            }).replace('.', '')
        },
        modifiedUserPhoto(photo) {
            return `http://localhost:5000/${photo}`
        }
    }
}

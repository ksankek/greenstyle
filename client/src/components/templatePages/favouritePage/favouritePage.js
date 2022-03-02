import {mapGetters} from "vuex";
import {toastMixin} from "@/mixins/toastMixin";

export default {
    name: 'FavouritePage',
    mixins: [toastMixin],
    data() {
        return {
            inFavourite: [],
            articles: []
        }
    },
    created() {
        if (this.USER.id) {
            this.reqGetFavourite()
        }
    },
    watch: {
        USER: function () {
            this.reqGetFavourite()
        }
    },
    computed: {
        ...mapGetters(['USER']),
    },
    methods: {
        reqGetFavourite() {
            this.$http({
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.token}`
                },
                url: `http://localhost:5000/api/favourite/${this.USER.id}`
            }).then(res => {
                this.inFavourite = res.data
                this.reqGetAllArticles()
            })
        },

        reqGetAllArticles() {
            this.articles = []

            this.$http({
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                url: `http://localhost:5000/api/article/all`
            }).then(res => {
                if (res.status === 200) {
                    const modArticles = res.data
                    modArticles.forEach(item => {
                        const favouriteStatus = this.inFavourite.find(({articleId}) => item.id === articleId)
                        if (favouriteStatus) {
                            this.articles.push(item)
                        }
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
                    this.reqGetFavourite()
                    this.setToastSuccess(res.data.msg)
                }
            })
        },

        getPhoto(url) {
            return `http://localhost:5000/${url}`
        }
    }
}

import {mapGetters} from "vuex";

export default {
    name: 'FoodPage',
    components: {},
    props: {
    },
    data() {
        return {
            articles: [],
            test: {}
        }
    },
    created() {
        this.reqGetAllArticles()
    },
    mounted() {

    },
    watch: {
    },
    computed: {
        ...mapGetters(['USER']),

        modUser() {
            return {
                id: this.USER.id
            }
        }
    },
    methods: {
        reqGetAllArticles() {
            this.$http({
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                url: `http://localhost:5000/api/article/all/2`
            }).then(res => {
                if (res.status === 200) {
                    this.articles = res.data
                    console.log(this.USER)
                    this.articles.forEach(({id}) => {
                        this.checkAddFavorite(id)
                    })
                }
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
                    console.log(res.data)
                }
            })
        },
        checkAddFavorite(articleId) {
            this.$http({
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.token}`
                },
                url: `http://localhost:5000/api/favourite/${this.modUser.id}/check/${articleId}`
            }).then(res => {
                if (res.status === 200) {
                    this.test[articleId] = res.data.added
                }
            })
        }
    }
}

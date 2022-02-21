export default {
    name: 'SportPage',
    components: {},
    props: {
    },
    data() {
        return {
            articles: []
        }
    },
    created() {
    },
    mounted() {
        this.reqGetAllArticles()
    },
    watch: {
    },
    computed: {
    },
    methods: {
        reqGetAllArticles() {
            this.$http({
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                url: `http://localhost:5000/api/article/all/1`
            }).then(res => {
                if (res.status === 200) {
                    this.articles = res.data
                }
            })
        },

        getPhoto(url) {
            return `http://localhost:5000/${url}`
        }
    }
}

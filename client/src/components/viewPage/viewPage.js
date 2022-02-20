export default {
    name: 'ViewPage',
    components: {},
    props: {
        id: {
            type: [String, Number],
            default: 0
        }
    },
    data() {
        return {
            article: {}
        }
    },
    created() {
        this.reqGetArticle()
    },
    mounted() {
    },
    watch: {
    },
    computed: {
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
    }
}

import { Carousel, Slide } from 'vue-carousel';

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
            content: ''
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
        modifiedArticle() {
            return {
                name: this.article.name,
                files: this.article.files,
                description: this.article.description
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
    }
}

import {mapGetters} from "vuex";

export default {
    name: 'Search',
    components: {},
    props: {
    },
    data() {
        return {
            search: '',
            articles: [],
            sections: {},
            searchArticles: []
        }
    },
    created() {
        this.$options.static = {
            routerNames: {
                1: 'SportArticle',
                2: 'FoodArticle',
                3: 'HabitsArticle'
            }
        }

        this.reqGetSections()
        this.reqGetAllArticles()
    },
    mounted() {
    },
    watch: {
    },
    computed: {
        ...mapGetters(['NAV_LINKS']),
    },
    methods: {
        reqGetAllArticles() {
            this.$http({
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                url: `http://localhost:5000/api/article/all`
            }).then(res => {
                if (res.status === 200) {
                    this.articles = res.data
                }
            })
        },
        getSearchArticles() {
            this.searchArticles = []
            this.articles.forEach(article => {
                if (article.name.toLowerCase().includes(this.search.toLowerCase())) {
                    this.searchArticles.push(article)
                }
            })
        },
        getPhoto(url) {
            return `http://localhost:5000/${url}`
        },
        reqGetSections() {
            this.$http({
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                url: `http://localhost:5000/api/section`
            }).then(res => {
                if (res.status === 200) {
                    res.data.forEach(item => {
                        this.sections[item.id] = item.name
                    })
                }
            })
        },
        routeToArticle(id, sectionId) {
            this.$router.replace({
                name: this.$options.static.routerNames[sectionId],
                params: {id: id}
            })
        }
    }
}

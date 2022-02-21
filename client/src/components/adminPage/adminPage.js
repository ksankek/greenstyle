export default {
    name: 'AdminPage',
    components: {},
    props: {
    },
    data() {
        return {
            newArticle: {
                name: 'test',
                description: '',
                sectionId: 2
            }
        }
    },
    created() {
    },
    mounted() {
    },
    watch: {
    },
    computed: {
    },
    methods: {
        reqSaveArticle() {
            this.$http({
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.token}`
                },
                url: `http://localhost:5000/api/article/1`,
                data: JSON.stringify(this.newArticle)
            }).then(res => {
                if (res.status === 200) {
                    this.article = res.data
                }
            })
        }
    }
}

export default {
    name: 'VideoPage',
    components: {},
    props: {
    },
    data() {
        return {
            videos: []
        }
    },
    created() {
    },
    mounted() {
        this.reqGetAllVideos()
    },
    watch: {
    },
    computed: {
    },
    methods: {
        reqGetAllVideos() {
            this.$http({
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                url: `http://localhost:5000/api/video`
            }).then(res => {
                if (res.status === 200) {
                    this.videos = res.data
                }
            })
        },

        getPhoto(url) {
            return `http://localhost:5000/${url}`
        }
    }
}

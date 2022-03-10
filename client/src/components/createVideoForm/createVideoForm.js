import {toastMixin} from "@/mixins/toastMixin";

export default {
    name: 'VideoForm',
    mixins: [toastMixin],
    props: {
    },
    data() {
        return {
            videoCreateForm: {
                sectionId: 1
            }
        }
    },
    methods: {
        reqAddVideo() {
            const startId = this.videoCreateForm.url.indexOf('v=')
            const endId = this.videoCreateForm.url.indexOf('&')
            this.videoCreateForm.url = `https://www.youtube.com/embed/${this.videoCreateForm.url.slice(startId + 2, endId)}`

            this.$http({
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.token}`
                },
                url: `http://localhost:5000/api/video`,
                data: JSON.stringify(this.videoCreateForm)
            }).then(res => {
                if (res.status === 200) {
                    this.setToastSuccess('Видео добавлено')
                    this.$root.$emit('closeVideoDialog', false)
                }
            })
        },
    }
}

export const toastMixin = {
    data() {
        return {
            toastInfo: {}
        }
    },
    methods: {
        setToastSuccess(message) {
            this.toastInfo = {
                isSuccess: true,
                message: message
            }
            this.$nextTick().then(this.$bvToast.show('infoToast'))
        },

        setToastError(message) {
            this.toastInfo = {
                isSuccess: false,
                message: message
            }
            this.$nextTick().then(this.$bvToast.show('infoToast'))
        }
    }
}

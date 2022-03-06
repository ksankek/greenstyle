export default {
    name: 'ModalConfirm',
    components: {},
    props: {
        dialogVisible: {
            type: Boolean,
            default: false
        },
        modalFunction: Function,
        userId: Number
    },
    data() {
        return {
        }
    },
    methods: {
        hideModal() {
            this.$root.$emit('hideModalConfirm', false)
        }
    }
}

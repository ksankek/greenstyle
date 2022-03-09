export default {
    name: 'ModalConfirm',
    components: {},
    props: {
        dialogVisible: {
            type: Boolean,
            default: false
        },
        modalFunction: Function,
        id: Number
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

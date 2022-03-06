import {mapGetters} from "vuex";
import templateEditUser from "@/components/templatePages/templateEditUser.vue";
import {toastMixin} from "@/mixins/toastMixin";
import modalConfirm from "@/components/common/modal/modalConfirm.vue";

export default {
    name: 'AdminPage',
    components: {templateEditUser, modalConfirm},
    mixins: [toastMixin],
    data() {
        return {
            newArticle: {
                name: 'test',
                description: '',
                sectionId: 2
            },
            users: [],
            selectedUser: {},
            dialogUser: false,
            dialogConfirm: false
        }
    },
    created() {
        this.reqGetAllUsers()
    },
    mounted() {
        this.$root.$on('hideModalConfirm', value => {
            this.dialogConfirm = value
        })
    },
    watch: {
    },
    computed: {
        ...mapGetters(['USER'])
    },
    methods: {
        reqGetAllUsers() {
            this.$http({
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                url: `http://localhost:5000/api/user`
            }).then(res => {
                if (res.status === 200) {
                    this.users = res.data
                }
            })
        },

        modifiedUserPhoto(photo) {
            return `http://localhost:5000/${photo}`
        },

        closeDialog(dialogType) {
            this.reqGetAllUsers()
            this[dialogType] = false
        },

        selectUser(user) {
            this.selectedUser = user
        },

        reqDeleteUser(userId) {
            this.$http({
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                url: `http://localhost:5000/api/user/${userId}`
            }).then(res => {
                if (res.status === 200) {
                    this.reqGetAllUsers()
                    this.setToastSuccess(res.data.msg)
                }
            })
        },

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
    },
    beforeDestroy() {
        this.$root.$off('hideModalConfirm')
    }
}

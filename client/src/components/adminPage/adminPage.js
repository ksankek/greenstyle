import {mapGetters} from "vuex";
import templateEditUser from "@/components/templatePages/templateEditUser.vue";
import {toastMixin} from "@/mixins/toastMixin";
import modalConfirm from "@/components/common/modal/modalConfirm.vue";
import templateEditArticle from "@/components/editArticleTemplate.vue";

export default {
    name: 'AdminPage',
    components: {templateEditUser, modalConfirm, templateEditArticle},
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
            dialogConfirm: false,
            articles: [],
            selectedArticle: {},
            dialogArticle: false,
            dialogConfirmArticle: false,
        }
    },
    created() {
        this.reqGetAllUsers()
        this.reqGetAllArticles()
    },
    mounted() {
        this.$root.$on('hideModalConfirm', value => {
            this.dialogConfirm = value
            this.dialogConfirmArticle = value
        })

        this.$root.$on('closeArticleDialog', value => {
            this.dialogArticle = value
            this.reqGetAllArticles()
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
                }
            })
        },

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

        reqDeleteArticle(articleId) {
            this.$http({
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.token}`
                },
                url: `http://localhost:5000/api/article/${articleId}`
            }).then(res => {
                if (res.status === 200) {
                    this.reqGetAllArticles()
                }
            })
        },

        selectArticle(article) {
            this.selectedArticle = article
        },

        openCreateArticleForm() {
            this.selectedArticle = {}
            this.dialogArticle = true
        }
    },
    beforeDestroy() {
        this.$root.$off('hideModalConfirm')
    }
}

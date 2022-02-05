import {mapGetters} from "vuex";

export default {
    name: 'SideBar',
    components: {},
    props: {
    },
    data() {
        return {
        }
    },
    created() {
        this.$options.static = {
            profileLinks: [
                {
                    name: 'Мой профиль',
                    icon: 'profile',
                    route: '/profile',
                    forAdmin: false
                },
                {
                    name: 'Закладки',
                    icon: 'mark',
                    route: '/favourite',
                    forAdmin: false
                },
                {
                    name: 'Админ-панель',
                    icon: 'admin',
                    route: '/admin',
                    forAdmin: true
                },
            ]
        }
    }
    ,
    mounted() {
    },
    watch: {
    },
    computed: {
        ...mapGetters(['USER', 'PERMISSION', 'NAV_LINKS']),

        getUserPhoto() {
            return `http://localhost:5000/${this.USER.photo}`
        },
        modifiedUser() {
            return {
                firstname: this.USER?.firstname,
                lastname: this.USER?.lastname,
                patronymic: this.USER?.patronymic,
                photo: this.USER?.patronymic ? this.getUserPhoto : '',
                email: this.USER?.email,
                role: this.USER?.role
            }
        }
    },
    methods: {
        visibleLink(forAdmin) {
            if (forAdmin && this.modifiedUser.role === 'ADMIN') {
                return true
            } else if (forAdmin && this.modifiedUser.role === 'USER') {
                return false
            }
            return true
        },
        replaceRouter() {
            localStorage.removeItem('token')
            this.$router.replace({path:'login'})
        }
    }
}

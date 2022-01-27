import VueJwtDecode from 'vue-jwt-decode'

export default {
    name: 'mainComponent',
    components: {},
    props: {
    },
    data() {
        return {
            user: {
                email: 'test@mail.ru',
                password: '1234',
                role: 'USER'
            },
            users: [],
            isLogin: false,
            isAdmin: false,
            loginForm: {
                email: 'admin@mail.ru',
                password: '1234'
            },
            activeUser: {}
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
        addUser() {
            this.$http({
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                url: `http://localhost:5000/api/user/registration`,
                data: JSON.stringify(this.user)
            }).then(res => {
                if (res.status === 200) {
                    console.log(res.data)
                }
            })
        },
        getUsers(id, token) {
            this.$http({
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                url: `http://localhost:5000/api/user`
            }).then(res => {
                if (res.status === 200) {
                    this.isAdmin = true
                    this.users = res.data
                }
            }).catch(err => {
                if (err) {
                    this.getUser(id, token)
                }
            })
        },
        login() {
            this.$http({
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                url: `http://localhost:5000/api/user/login`,
                data: JSON.stringify(this.loginForm)
            }).then(res => {
                if (res.status === 200) {
                    this.checkIsAdmin(res.data.token)
                    this.isLogin = true
                }
            })
        },
        checkIsAdmin(token) {
            this.$http({
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                url: `http://localhost:5000/api/user/auth`
            }).then(res => {
                if (res.status === 200) {
                    const {id} = VueJwtDecode.decode(res.data.token);
                    this.getUsers(id, res.data.token)
                }
            })
        },
        getUser(id, token) {
            this.$http({
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                url: `http://localhost:5000/api/user/${id}`
            }).then(res => {
                if (res.status === 200) {
                    this.activeUser = res.data
                }
            })
        },
        editUser(id, data) {
            const JSONdata = JSON.stringify(data)
            this.$http({
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                url: `http://localhost:5000/api/user/${id}`,
                data: JSONdata
            }).then(res => {
                if (res.status === 200) {
                    console.log(res.data)
                }
            })
        }
    }
}

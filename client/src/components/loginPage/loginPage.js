import {mapActions} from 'vuex'

export default {
    name: 'LoginPage',
    components: {},
    props: {
    },
    data() {
        return {
            loginForm: {
                email: '',
                password: ''
            },
            error: {
                email: false,
                emailValid: false,
                password: false
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
        disabledButton() {
            return this.loginForm.password === '' ||
                this.loginForm.email === '' ||
                this.error.emailValid
        }
    },
    methods: {
        ...mapActions(['setUser']),

        reqLogin() {
            this.$http({
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                url: `http://localhost:5000/api/user/login`,
                data: JSON.stringify(this.loginForm)
            }).then(res => {
                if (res.status === 200) {
                    this.setUser(res.data.token)
                    this.$router.push({path:'/sport'})
                }
            }).catch(err => {
                localStorage.removeItem('token')
                console.log(err.response.data.message)
            })
        },

        isRequired(validateItem) {
            this.error[validateItem] = !this.loginForm[validateItem]
        },

        isValidEmail() {
            const mask = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/
            this.error.emailValid = !mask.test(this.loginForm.email);
        }
    }
}

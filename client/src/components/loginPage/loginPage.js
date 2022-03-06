import {mapActions} from 'vuex'
import {toastMixin} from "@/mixins/toastMixin";

export default {
    name: 'LoginPage',
    mixins: [toastMixin],
    data() {
        return {
            loginForm: {
                email: '',
                password: ''
            },
            error: {
                email: false,
                emailValid: false,
                password: false,
                passwordValid: false
            },
            visible: {
                password: false
            }
        }
    },
    computed: {
        disabledButton() {
            return this.loginForm.password === '' ||
                this.loginForm.email === '' ||
                this.error.emailValid ||
                this.error.passwordValid
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
            })
        },

        isRequired(validateItem) {
            this.error[validateItem] = !this.loginForm[validateItem]
        },

        isValidEmail() {
            const mask = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/
            this.error.emailValid = !mask.test(this.loginForm.email);
        },

        isValidPassword() {
            this.error.passwordValid = this.loginForm.password.length < 8
        }
    }
}

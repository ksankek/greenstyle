import {mapActions} from 'vuex'
import {toastMixin} from "@/mixins/toastMixin";

export default {
    name: 'RegistrationPage',
    mixins: [toastMixin],
    data() {
        return {
            formData: {
                email: '',
                password: '',
                confirmPassword: '',
                role: 'ADMIN'
            },
            error: {
                email: false,
                emailValid: false,
                password: false,
                passwordValid: false,
                confirmPassword: false,
                equalPasswords: false
            }
        }
    },
    computed: {
        disabledButton() {
            return this.formData.password === '' ||
                this.formData.email === '' ||
                this.error.equalPasswords ||
                this.error.emailValid ||
                this.error.passwordValid
        }
    },
    methods: {
        ...mapActions(['setUser']),

        reqRegistration() {
            this.$http({
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                url: `http://localhost:5000/api/user/registration`,
                data: JSON.stringify(this.formData)
            }).then(res => {
                if (res.status === 200) {
                    this.setUser(res.data.token)
                    this.$router.push({path:'/sport'})
                }
            }).catch(err => {
                this.setToastError(err.response.data.message)
            })
        },

        isRequired(validateItem) {
            this.error[validateItem] = !this.formData[validateItem]
            return this.error[validateItem]
        },

        isValidEmail() {
            const mask = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/
            this.error.emailValid = !mask.test(this.formData.email);
            return this.error.emailValid
        },

        isValidPassword() {
            this.error.passwordValid = this.formData.password.length < 8
        },

        isEqualPasswords() {
            this.error.equalPasswords = this.formData.password !== this.formData.confirmPassword
        }
    }
}

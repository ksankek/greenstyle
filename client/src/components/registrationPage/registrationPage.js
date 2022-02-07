import {mapActions} from 'vuex'

export default {
    name: 'RegistrationPage',
    components: {},
    props: {
    },
    data() {
        return {
            formData: {
                email: '',
                password: '',
                confirmPassword: '',
                role: 'USER'
            },
            error: {
                email: false,
                emailValid: false,
                password: false,
                confirmPassword: false
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
            return this.formData.password === '' ||
                this.formData.email === '' ||
                this.formData.password !== this.formData.confirmPassword ||
                this.error.emailValid
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
        }
    }
}

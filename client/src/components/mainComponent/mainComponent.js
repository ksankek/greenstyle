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
            users: []
        }
    },
    created() {
        this.getUsers()
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
                    this.getUsers()
                }
            })
        },
        getUsers() {
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
        }

    }
}

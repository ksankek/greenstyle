import {mapActions, mapGetters} from "vuex";
import {toastMixin} from "@/mixins/toastMixin";

export default {
    name: 'ProfilePage',
    mixins: [toastMixin],
    data() {
        return {
            user: {
                phone: null
            },
            dialog: false,
            imageFile: null
        }
    },
    computed: {
        ...mapGetters(['USER']),

        getUserPhoto() {
            return `http://localhost:5000/${this.USER.photo}`
        },
        modifiedUser() {
            this.user = {
                firstname: this.USER?.firstname,
                lastname: this.USER?.lastname,
                patronymic: this.USER?.patronymic,
                photo: this.USER?.photo ? this.getUserPhoto : '',
                email: this.USER?.email,
                phone: this.USER?.phone,
            }
            return this.user
        }
    },
    methods: {
        ...mapActions(['setUser']),

        reqSaveChanges() {
            this.$http({
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.token}`
                },
                url: `http://localhost:5000/api/user/${this.USER.id}`,
                data: JSON.stringify(this.user)
            }).then(res => {
                if (res.status === 200) {
                    this.setUser(localStorage.getItem('token'))
                    this.setToastSuccess(res.data.msg)
                }
            })
        },
        rollback() {
            this.user = {
                firstname: this.USER?.firstname,
                lastname: this.USER?.lastname,
                patronymic: this.USER?.patronymic,
                photo: this.USER?.photo ? this.getUserPhoto : '',
                email: this.USER?.email,
                phone: this.USER?.phone,
            }
        },
        reqDeletePhoto() {
            this.$http({
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.token}`
                },
                url: `http://localhost:5000/api/user/photo/delete/${this.USER.id}`
            }).then(res => {
                if (res.status === 200) {
                    this.setUser(localStorage.getItem('token'))
                    this.setToastSuccess(res.data.msg)
                }
            })
        },
        reqUploadPhoto() {
            const data = new FormData()
            data.append('img', this.imageFile)

            this.$http({
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.token}`
                },
                url: `http://localhost:5000/api/user/photo/${this.USER.id}`,
                data: data
            }).then(res => {
                if (res.status === 200) {
                    console.log(res.data)
                    this.setUser(localStorage.getItem('token'))
                    this.dialog = false
                    this.setToastSuccess(res.data.msg)
                }
            })
        }
    }
}

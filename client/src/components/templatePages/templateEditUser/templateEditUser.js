import {mapActions} from "vuex";
import {toastMixin} from "@/mixins/toastMixin";

export default {
    name: 'TemplateEditUser',
    mixins: [toastMixin],
    props: {
        editUser: Object,
        fromProfile: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            user: {
                phone: null
            },
            dialog: false,
            imageFile: null,
            adminSwitch: false
        }
    },
    created() {
        this.modifiedUser(this.editUser)
        this.adminSwitch = this.editUser.role === 'USER' ? false : true
    },
    watch: {
        editUser: function () {
            this.modifiedUser(this.editUser)
            this.adminSwitch = this.editUser.role === 'USER' ? false : true
        }
    },
    methods: {
        ...mapActions(['setUser']),

        reqSaveChanges() {
            if (!this.fromProfile) {
                this.user.role = this.adminSwitch ? 'ADMIN' : 'USER'
            } else {
                this.user.role = this.editUser.role
            }

            this.$http({
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.token}`
                },
                url: `http://localhost:5000/api/user/${this.editUser.id}`,
                data: JSON.stringify(this.user)
            }).then(res => {
                if (res.status === 200) {
                    if (this.fromProfile) this.setUser(localStorage.getItem('token'))
                    this.setToastSuccess(res.data.msg)
                }
            })
        },
        rollback() {
            this.modifiedUser(this.editUser)
        },
        reqDeletePhoto() {
            this.$http({
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.token}`
                },
                url: `http://localhost:5000/api/user/photo/delete/${this.editUser.id}`
            }).then(res => {
                if (res.status === 200) {
                    if (this.fromProfile) this.setUser(localStorage.getItem('token'))
                    this.reqGetUser()
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
                url: `http://localhost:5000/api/user/photo/${this.editUser.id}`,
                data: data
            }).then(res => {
                if (res.status === 200) {
                    console.log(res.data)
                    if (this.fromProfile) this.setUser(localStorage.getItem('token'))
                    this.dialog = false
                    this.reqGetUser()
                    this.setToastSuccess(res.data.msg)
                }
            })
        },
        modifiedUser(editUser) {
            this.user = {
                firstname: editUser?.firstname,
                lastname: editUser?.lastname,
                patronymic: editUser?.patronymic,
                photo: editUser?.photo ? this.getUserPhoto(editUser.photo) : '',
                email: editUser?.email,
                phone: editUser?.phone,
            }
            return this.user
        },
        getUserPhoto(photo) {
            return `http://localhost:5000/${photo}`
        },
        reqGetUser() {
            this.$http({
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                url: `http://localhost:5000/api/user/${this.editUser.id}`
            }).then(res => {
                if (res.status === 200) {
                    this.modifiedUser(res.data)
                }
            })
        }
    }
}

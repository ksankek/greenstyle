<template>
    <v-app id="inspire">
        <div class="app">
            <div class="wrapper">
                <Sidebar v-if="checkLoginPage()" />
                <div class="content">
                    <Search v-if="checkLoginPage()" />
                    <router-view />
                </div>
            </div>
        </div>
    </v-app>
</template>

<script>
import {mapActions} from 'vuex'
import Sidebar from "@/components/common/sidebar/sidebar.vue";
import Search from "@/components/common/search/search.vue";

export default {
    name: 'App',
    components: {Sidebar, Search},
    data: () => ({
        sections: ['Спорт', 'Правильное питание', 'Вредные привычки']
    }),
    mounted() {
        if (!this.getAllSections.length) {
            this.sections.forEach(item => {
                this.setSections(item)
            })
        }
        this.createAdmin()
        this.checkUserLogin()
        this.checkLoginPage()
    },
    methods: {
        ...mapActions(['setUser']),

        checkUserLogin() {
            if (localStorage.getItem('token')) {
                this.setUser(localStorage.getItem('token'))
            }
        },

        checkLoginPage() {
            return this.$route.name !== 'LoginPage' && this.$route.name !== 'RegistrationPage'
        },

        createAdmin() {
            if (!this.getCheckAllUsers().length) {
                this.$http({
                    method: 'POST',
                    url: `http://localhost:5000/api/user/registration`,
                    headers: {
                        'Content-Type': 'application/json; charset=UTF-8'
                    },
                    data: JSON.stringify({
                        role: 'ADMIN',
                        email: 'admin@gmail.com',
                        password: '12345678'
                    })
                })
            }
        },

        getCheckAllUsers() {
            let test = []
            this.$http({
                method: 'GET',
                url: `http://localhost:5000/api/user`,
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8'
                }
            }).then(res => {
                test = res.data.filter(({role}) => role === 'ADMIN')
            })
            return test
        },

        setSections(item) {
            this.$http({
                method: 'POST',
                url: `http://localhost:5000/api/section`,
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8'
                },
                data: JSON.stringify({name: item})
            })
        },

        getAllSections() {
            let test = []
            this.$http({
                method: 'GET',
                url: `http://localhost:5000/api/section`,
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8'
                }
            }).then(res => {
                test = res.data
            })
            return test
        },
    }
};
</script>

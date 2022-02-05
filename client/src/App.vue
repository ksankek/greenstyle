<template>
    <v-app id="inspire">
        <div class="app">
            <div class="wrapper">
                <Sidebar v-if="checkLoginPage()" />
                <div class="content">
                    <div class="search" v-if="checkLoginPage()"></div>
                    <router-view />
                </div>
            </div>
        </div>
    </v-app>
</template>

<script>
import {mapActions} from 'vuex'
import Sidebar from "@/components/common/sidebar/sidebar.vue";

export default {
    name: 'App',
    components: {Sidebar},
    data: () => ({
        //
    }),
    mounted() {
        this.checkUserLogin()
        this.checkLoginPage()
    },
    methods: {
        ...mapActions(['setUser']),

        checkUserLogin() {
            if (localStorage.getItem('token')) {
                this.setUser(localStorage.getItem('token'))
                this.$router.replace({path:'/sport'}).catch(()=>{})
                this.checkLoginPage()
            }
        },

        checkLoginPage() {
            return this.$route.name !== 'LoginPage' && this.$route.name !== 'RegistrationPage'
        }
    }
};
</script>

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
            }
        },

        checkLoginPage() {
            return this.$route.name !== 'LoginPage' && this.$route.name !== 'RegistrationPage'
        }
    }
};
</script>

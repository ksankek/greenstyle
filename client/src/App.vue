<template>
    <v-app id="inspire">
        <router-view/>
    </v-app>
</template>

<script>
import {mapActions} from 'vuex'

export default {
    name: 'App',
    data: () => ({
        //
    }),
    mounted() {
        this.checkUserLogin()
    },
    methods: {
        ...mapActions(['setUser']),

        checkUserLogin() {
            if (localStorage.getItem('token')) {
                this.setUser(localStorage.getItem('token'))
                // this.$router.replace({path:'/sport'}).catch(()=>{})
            }
        }
    }
};
</script>

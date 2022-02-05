import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueJwtDecode from 'vue-jwt-decode'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        user: {},
        isAuth: false,
        permission: ''
    },
    getters: {
        USER: state => {
            return state.user
        },
        IS_AUTH: state => {
            return state.isAuth
        },
        PERMISSION: state => {
            return state.permission
        },
        NAV_LINKS: () => {
            return [
                {
                    name: 'Спорт',
                    icon: 'sport',
                    route: '/sport'
                },
                {
                    name: 'Правильное питание',
                    icon: 'apple',
                    route: '/food'
                },
                {
                    name: 'Вредные привычки',
                    icon: 'alcohol',
                    route: '/sport'
                },
                {
                    name: 'Видеогалерея',
                    icon: 'video',
                    route: '/video'
                },
            ]
        }
    },
    mutations: {
        SET_USER: (state, data) => {
            state.user = data
        },
        SET_AUTH: (state, data) => {
            state.isAuth = data
        },
        SET_PERMISSION: (state, data) => {
            state.permission = data
        }
    },
    actions: {
        setUser: async (context, data) => {
            return new Promise( (resolve) => {
                (async () => {
                    const {id} = VueJwtDecode.decode(data);
                    let res = await axios({
                        method: 'GET',
                        url: `http://localhost:5000/api/user/${id}`,
                        headers: {
                            'Content-Type': 'application/json; charset=UTF-8',
                            'Authorization': `Bearer ${data}`
                        },
                    })

                    if (res.status === 200) {
                        localStorage.setItem('token', data)
                        context.commit('SET_USER', res.data)
                        context.commit('SET_AUTH', true)
                        context.commit('SET_PERMISSION', res.data.role)
                    }
                    resolve()
                })()
            })
        },
    }
})

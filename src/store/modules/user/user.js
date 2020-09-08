import axios from "../../../axios/index";

export default {
    namespaced: true,   //для обращения к текущему модулю из вне без слеша
    state: {
        isLoggedIn: false,
        userDetails:{}
    },
    mutations: {
        setLoggedIn(state, payload){
            state.isLoggedIn = payload;
        },
        setUserDetails(state, payload){
            state.userDetails = payload;
        }
    },
    actions: {
        registerUser(ctx, payload) {
            return new Promise((resolve, reject)=>{
                axios
                    .post('register', payload)
                    .then((response) => {
                        if(response.data){
                            resolve(response);
                        }else{
                            reject(response)
                        }
                    })
                    .catch((error)=>{
                        reject(error)
                    })
            })
        },
        loginUser(ctx, payload) {
            return new Promise((resolve, reject)=>{
                axios
                    .post('login', payload)
                    .then((response) => {
                        if(response.data.access_token){
                            localStorage.setItem('token', response.data.access_token);
                            ctx.commit('setLoggedIn', true);
                            resolve(response);
                        }else{
                            reject(response)
                        }

                        // this.$router.push({name: 'dashboard'});
                    })
                    .catch((error)=>{
                        reject(error)
                    })
            })
        },
        logoutUser(ctx) {
            return new Promise((resolve)=>{
                localStorage.removeItem('token');
                ctx.commit('setLoggedIn', false);
                resolve(true);
            })
        },
        setLoggedInState(ctx){
            return new Promise((resolve)=>{
                if(localStorage.getItem('token')){
                    ctx.commit('setLoggedIn', true)
                    resolve(true)
                }else{
                    ctx.commit('setLoggedIn', false)
                    resolve(false)
                }
            });
        },
        forgotPassword(ctx, payload){
            return new Promise((resolve, reject)=>{
                axios
                    .post('forgot-password', payload)
                    .then((response) => {
                        resolve(response);
                    })
                    .catch((error)=>{
                        reject(error)
                    })
            })
        },
        resetPassword(ctx, payload){
            return new Promise((resolve, reject)=>{
                axios
                    .post('reset-password', payload)
                    .then((response) => {
                        resolve(response);
                    })
                    .catch((error)=>{
                        reject(error)
                    })
            })
        },
         me(ctx){
            return new Promise((resolve, reject)=>{
                axios
                    .get('me')
                    .then((response) => {
                        ctx.commit('setUserDetails', response.data.data)
                        console.log(response.data);
                        resolve(response);
                    })
                    .catch((error)=>{
                        reject(error)
                    })
            })
        }


    },
    getters: {
        loggedIn(state){
            return state.isLoggedIn;
        },
        userDetails(state){
            return state.userDetails;
        }
    }

}
<template>
    <v-main>
        <v-app-bar
                app
                color="primary"
                dark
        >
            <div class="d-flex align-center">
                <v-img
                        alt="Vuetify Logo"
                        class="shrink mr-2"
                        contain
                        src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
                        transition="scale-transition"
                        width="40"
                />

                <v-img
                        alt="Vuetify Name"
                        class="shrink mt-1 hidden-sm-and-down"
                        contain
                        min-width="100"
                        src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
                        width="100"
                />
            </div>

            <v-spacer></v-spacer>
            <v-btn
                    small
                    @click="logout"
                    v-if="loggedIn"
            >
                <span class="mr-2">Loguot</span>
            </v-btn>
        </v-app-bar>

        <v-main>
            <router-view></router-view>
        </v-main>
    </v-main>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex';

    export default {
        name: 'AppLayout',

        components: {

        },
        computed:{
            ...mapGetters({
                loggedIn:'user/loggedIn'
            }),
        },
        methods:{
            ...mapActions({
                logoutUser:'user/logoutUser',
                addNotification: 'application/addNotification'
            }),

            logout(){
                this.logoutUser()
                    .then(()=>{
                        return this.addNotification({
                            show:true,
                            text: 'Logged out!',
                        })
                    })
                    .then(()=>{
                        this.$router.push({name: 'login'})
                    })
            }
        }
    };
</script>

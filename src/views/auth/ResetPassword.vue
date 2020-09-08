<template>
<div>
    <v-container
            class="fill-height"
            fluid
    >
        <v-row
                align="center"
                justify="center"
        >
            <v-col
                    cols="12"
                    sm="8"
                    md="4"
            >
                <v-card class="elevation-12">
                    <v-toolbar
                            color="primary"
                            dark
                            flat
                    >
                        <v-toolbar-title>Reset password form</v-toolbar-title>
                        <v-spacer></v-spacer>

                    </v-toolbar>
                    <v-card-text>
                        <v-form ref="resetPasswordForm">
                            <v-text-field
                                    label="Email"
                                    name="email"
                                    prepend-icon="mdi-account"
                                    type="email"
                                    v-model="user.email"
                            ></v-text-field>

                            <v-text-field
                                    id="password"
                                    label="Password"
                                    name="password"
                                    prepend-icon="mdi-lock"
                                    type="password"
                                    v-model="user.password"
                            ></v-text-field>

                            <v-text-field
                                    id="password_confirmation"
                                    label="Password confirmation"
                                    name="password_confirmation"
                                    prepend-icon="mdi-lock"
                                    type="password"
                                    v-model="user.password_confirmation"
                            ></v-text-field>
                        </v-form>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" @click="sendResetPassword">Reset password</v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>

    <router-link :to="{ path: 'login' }">Login</router-link>
</div>


</template>

<script>
    import {mapActions} from 'vuex';
    export default {
        name: "ResetPassword",
        props: {
            source: String,
        },
        data(){
            return {
                user:{
                    email: '',
                    password:'',
                    password_confirmation:'',
                },
            }
        },
        methods:{
            ...mapActions({
               resetPassword: 'user/resetPassword',
                addNotification: 'application/addNotification'
            }),
            sendResetPassword(){
                if(this.$refs.resetPasswordForm.validate()){
                    const token = this.$route.query.token;          // получение токена из URL
                    this.resetPassword({...this.user, token})
                        .then(()=>{
                            this.addNotification({
                                show : true,
                                text : 'Password changed!'
                            }).then(()=>{
                                this.$router.push({name: 'login'});
                            });
                        }).catch(()=>{
                        this.addNotification({
                            show : true,
                            text : 'Failed to change password !!'
                        });
                    })
                    // axios
                    //     .post('http://127.0.0.1:8000/api/login', this.user)
                    //     .then((response) => {
                    //         localStorage.setItem('token', response.data);
                    //         this.$router.push({name: 'dashboard'});
                    //         console.log(response.data)
                    //     })
                }
            }
        }
    }
</script>

<style scoped>

</style>
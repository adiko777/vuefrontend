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
                        <v-toolbar-title>Forgot password form</v-toolbar-title>
                        <v-spacer></v-spacer>

                    </v-toolbar>
                    <v-card-text>
                        <v-form ref="forgotPasswordForm">
                            <v-text-field
                                    label="Email"
                                    name="email"
                                    prepend-icon="mdi-account"
                                    type="email"
                                    v-model="email"
                            ></v-text-field>
                        </v-form>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" @click="sendForgotPassword">Send email</v-btn>
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
        name: "ForgotPassword",
        props: {
            source: String,
        },
        data(){
            return {
                email: '',
            }
        },
        methods:{
            ...mapActions({
                forgotPassword:'user/forgotPassword',
                addNotification:'application/addNotification'

            }),
            sendForgotPassword(){
                if(this.$refs.forgotPasswordForm.validate()){
                    this.forgotPassword({email:this.email})
                        .then(()=>{
                            this.addNotification({
                                show : true,
                                text : 'Email sent!'
                            });
                        })
                        .catch(()=>{
                            this.addNotification({
                                show : true,
                                text : 'Failed to send email!!'
                            });
                    })
                }
            }

        }
    }
</script>

<style scoped>

</style>
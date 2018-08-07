<template>
    <div class="limiter">
         <!-- Main jumbotron for a primary marketing message or call to action -->
        <div class="container-login100">
            <div class="container pt-5">
                    <div class="wrap-input100 validate-input" data-validate = "Enter your new password">
                       
                     <input class="input100" type="password" v-model="password" placeholder="Enter your new password" required>
                        <span class="focus-input100"></span>
                        <span class="symbol-input100">
                            <i class="fa fa-lock" aria-hidden="true"></i>
                        </span>
                    </div>
                    <div class="container-login100-form-btn">
                        <button class="login100-form-btn" @click.prevent="resetPass">
                            Reset
                        </button>
                    </div>
                    
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import Header from '../Header.vue'
    import {mapGetters, mapActions} from 'vuex'
    export default {
        data(){
            return{
                resetToken : this.$route.params.id,
                isVerified : false,
                password : '',
            }
        },
        components:{
            appHeader: Header
        },
        computed:{
            ...mapGetters([
                'user',
                'url'
            ])
        },
        methods:{
            
            resetPass(){
                axios.post(this.url + '/reset', {
                    resetToken : this.resetToken,
                    newPassword: this.password
                }).then( response => {
                    // if(response.data.validation){
                    //     this.isVerified = true;
                    //     setTimeout( () => this.$router.push({name: 'Login'}), 5000);  
                    // }
                    console.log(response.data);
                }).catch(err => {
                    console.log(err);
                })
            }
            
        }
    }
</script>

<style >


</style>

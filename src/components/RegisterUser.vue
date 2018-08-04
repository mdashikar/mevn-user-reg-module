<template>
    <div class="limiter">
       <div class="container-login100">
           <div class="wrap-login100">
               <div class="login100-pic js-tilt" data-tilt>
                   <img src="/static/images/img-01.png" alt="IMG">
               </div>

               <form class="login100-form validate-form">
                   <span class="login100-form-title">
                       Member Register
                   </span>

                   <div class="wrap-input100 validate-input" data-validate = "Name is required. ">
                       <input class="input100" type="text" v-model="userData.name" placeholder="Full name" >
                       <span class="focus-input100"></span>
                       <span class="symbol-input100">
                           <i class="fa fa-user" aria-hidden="true"></i>
                       </span>
                   </div>
                   <div class="wrap-input100 validate-input" data-validate = "Valid username is required: abc123">
                       <input class="input100" type="text" v-model="userData.username" placeholder="Username" >
                       <span class="focus-input100"></span>
                       <span class="symbol-input100">
                           <i class="fa fa-user" aria-hidden="true"></i>
                       </span>
                   </div>
                   
                   <div class="wrap-input100 validate-input" data-validate = "Valid email is required: ex@abc.xyz">
                       <input class="input100" type="email" v-model="userData.email" placeholder="Email" >
                       <span class="focus-input100"></span>
                       <span class="symbol-input100">
                           <i class="fa fa-envelope" aria-hidden="true"></i>
                       </span>
                   </div>

                   <div class="wrap-input100 validate-input" data-validate = "Password is required">
                       <input class="input100" type="password" v-model="userData.password" placeholder="Password">
                       <span class="focus-input100"></span>
                       <span class="symbol-input100">
                           <i class="fa fa-lock" aria-hidden="true"></i>
                       </span>
                   </div>
                   

                   <div class="wrap-input100 validate-input" data-validate = "Re-enter password is required">
                       <input class="input100" type="password" v-model="confirmPassword" placeholder="Re-enter password">
                       <span class="focus-input100"></span>
                       <span class="symbol-input100">
                           <i class="fa fa-lock" aria-hidden="true"></i>
                       </span>
                                                                 
                   </div>
                   <div class="alert" :class="classBinding" role="alert" v-if="msg && confirmPassword.length > 0">
                        {{msg}}
                    </div>
                   
                   
                   <div class="container-login100-form-btn">
                       <button class="login100-form-btn" @click.prevent="registerUser">
                          Register
                       </button>
                   </div>

                   <div class="text-center p-t-12">
                       <span class="txt1">
                           Forgot
                       </span>
                       <a class="txt2" href="#">
                           Username / Password?
                       </a>
                   </div>

                   <div class="text-center p-t-136">
       
                       <router-link to="/" class="txt2">Login <i class="fa fa-long-arrow-right m-l-5" aria-hidden="true"></i></router-link>
                       
                   </div>
               </form>
           </div>
       </div>
   </div>
</template>

<script>
import axios from 'axios';
import {mapGetters} from 'vuex';
export default {
    data(){
        return{
            userData: {
                name: '',
                username: '',
                email: '',
                password: '',
            },
            confirmPassword: '',
            msg: '',
            passwordStatus: false,
            classBinding: ''

        }
    },
    computed:{
        ...mapGetters([
            'url'
        ])
    },
    methods:{
        comparePassword(){
            if(this.userData.password == this.confirmPassword){
                this.msg = "Password matched",
                this.classBinding = 'alert-success'
            }else{
                this.msg = "Password not matched",
                this.classBinding = 'alert-danger'
            }
        },
        registerUser(){
                
            axios.post(this.url + '/signup', {
                name: this.userData.name,
                username: this.userData.username,
                email: this.userData.email,
                password: this.userData.password
            })
            .then(response => {
            // JSON responses are automatically parsed.
                if(response.data.success){
                    console.log(response);
                    this.$router.push({name: 'Login'})
                }else{
                    alert(response.data);
                }
               

            })
            .catch(e => {
                this.errors.push(e)
            })
        }
    },
    watch:{
        password(){
            this.comparePassword();
        },
        confirmPassword(){
            this.comparePassword();
        }
    }
}
</script>

<style>

</style>

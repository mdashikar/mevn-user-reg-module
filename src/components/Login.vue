<template>
    <div class="limiter">
        <div class="container-login100">
            <div class="wrap-login100">
                <div class="login100-pic js-tilt" data-tilt>
                    <img src="/static/images/img-01.png" alt="IMG">
                </div>

                <form class="login100-form validate-form">
                    <span class="login100-form-title">
                        Member Login
                    </span>

                    <div class="wrap-input100 validate-input" data-validate = "Valid email is required: ex@abc.xyz">
                        <input class="input100" type="text" v-model="email" placeholder="Email" >
                        <span class="focus-input100"></span>
                        <span class="symbol-input100">
                            <i class="fa fa-envelope" aria-hidden="true"></i>
                        </span>
                    </div>

                    <div class="wrap-input100 validate-input" data-validate = "Password is required">
                        <input class="input100" type="password" v-model="password" placeholder="Password">
                        <span class="focus-input100"></span>
                        <span class="symbol-input100">
                            <i class="fa fa-lock" aria-hidden="true"></i>
                        </span>
                    </div>
                    
                    <div class="container-login100-form-btn">
                        <button class="login100-form-btn" @click.prevent="loginUser">
                            Login
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
        
                        <router-link to="/register" class="txt2">Create your Account <i class="fa fa-long-arrow-right m-l-5" aria-hidden="true"></i></router-link>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    export default {
        data(){
            return{
                email:'',
                password:''
            }
        },
        methods:{
            loginUser(){
                
                axios.post('http://localhost:5050/addname', {
                    email: this.email,
                    password: this.password
                })
                .then(response => {
                // JSON responses are automatically parsed.
                    console.log(response)
                    alert(response.data);
                })
                .catch(e => {
                    this.errors.push(e)
                    alert(e);
                })
            }
        }
    }
</script>

<style>

</style>

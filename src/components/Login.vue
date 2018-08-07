<template>
    <div class="limiter" v-loading.body="loading">
        <div class="alert alert-danger fade show" v-if="msg.length > 0" role="alert">
            <strong>Oh snap!!</strong> {{msg}}
        </div>
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
                        <input class="input100" type="email" v-model="email" placeholder="Email" required>
                        <span class="focus-input100"></span>
                        <span class="symbol-input100">
                            <i class="fa fa-envelope" aria-hidden="true"></i>
                        </span>
                    </div>

                    <div class="wrap-input100 validate-input" data-validate = "Password is required">
                        <input class="input100" type="password" v-model="password" placeholder="Password" required>
                        <span class="focus-input100"></span>
                        <span class="symbol-input100">
                            <i class="fa fa-lock" aria-hidden="true"></i>
                        </span>
                    </div>
                    
                    <div class="container-login100-form-btn">
                        <button class="login100-form-btn" @click.prevent="loginUser" v-loading.fullscreen.lock="fullscreenLoading" element-loading-text="Loading...">
                            Login
                        </button>
                    </div>

                    <div class="text-center p-t-12">
                        <span class="txt1">
                            Forgot
                        </span>
                        <a class="txt2" href="#" @click.prevent="isClicked = !isClicked">
                            Username / Password?
                        </a>
                    </div>
                    <div class="input-group mb-3 mt-3" v-if="isClicked">
                        <input type="text" class="form-control" v-model="findUser" placeholder="username/email" aria-label="Recipient's username" aria-describedby="basic-addon2" required>
                        <div class="input-group-append">
                            <button class="btn btn-outline-secondary" type="button" @click.prevent="sendResetToken" v-loading.fullscreen.lock="fullscreenLoading">Submit</button>
                        </div>
                    </div>

                    <div class="text-center p-t-96">
        
                        <router-link to="/register" class="txt2">Create your Account <i class="fa fa-long-arrow-right m-l-5" aria-hidden="true"></i></router-link>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import {mapGetters, mapActions} from 'vuex';

    export default {
        data(){
            return{
                email:'',
                password:'',
                isClicked: false,
                findUser : '',
                fullscreenLoading: false,
                loading: true,
                msg: ''
            }
        },
        computed: {
            ...mapGetters([
                'url',
                'baseUrl'
            ])
        },
        methods:{
            ...mapActions({
                setUserData : 'setUser'
            }),
            forgotPass(){
                this.isClicked = true;
            },
            sendResetToken(){
                this.fullscreenLoading = true;
                axios.post(this.url + '/reset-password', {
                    findUser : this.findUser
                }).
                then(response => {
                    this.fullscreenLoading = false;
                    console.log(response);
                })
                .catch( e => {
                    console.log(e);
                })
            },
            loginUser(){
                this.fullscreenLoading = true;
                axios.post(this.url + '/login', {
                    email: this.email,
                    password: this.password
                })
                .then(response => {
                // JSON responses are automatically parsed.
                    this.fullscreenLoading = false;
                    if(response.data.local){
                        this.setUserData(response.data.local);
                        this.$router.push({name: 'User'})
                    }else{
                        this.msg = response.data;
                    }
                   
                })
                .catch(e => {
                    this.errors.push(e)
                })
            },
            isLoged(){
                axios.get(this.url + '/user', {withCredentials: true})
                    .then(response => {
                        this.loading = false;
                        if(response.data.local){
                            this.setUserData(response.data.local);
                            this.$router.push({name: 'User'});  
                        }  
                    })
                    .catch(e => {
                        this.errors.push(e)
                    })

            },
        },
        created(){
            this.isLoged();
            
        }
    }
</script>

<style scoped>

</style>

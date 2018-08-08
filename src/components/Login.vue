<template>
    <div class="limiter" v-loading.body="loading">
        
        <div class="container-login100">

            <div class="wrap-login100">
                <el-alert
                    class="mb-5"
                    title="Reset Password"
                    type="success"
                    :description="successMsg"
                    show-icon v-if="successMsg.length > 0">
                </el-alert>
                <el-alert
                    class="mb-5"
                    title="An Error occured"
                    type="error"
                    :description="errorMsg"
                    show-icon v-if="errorMsg">
                </el-alert>
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
                        
                        <!-- Form -->
                        <el-button type="text" @click="dialogFormVisible = true">Password?</el-button>

                        <el-dialog title="Reset Password" :visible.sync="dialogFormVisible">
                            <el-form :model="resetToken">
                                <el-form-item label="Enter your email" :label-width="formLabelWidth">
                                    <el-input v-model="resetToken.findUser" auto-complete="off"></el-input>
                                </el-form-item>
                            
                            </el-form>
                            <span slot="footer" class="dialog-footer">
                                <el-button @click="dialogFormVisible = false">Cancel</el-button>
                                <el-button type="primary" @click="sendResetToken"  v-loading.fullscreen.lock="fullscreenLoading">Submit</el-button>
                            </span>
                        </el-dialog>
                    </div>
                 
                    <div class="text-center p-t-46">
        
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
                resetToken: {
                    findUser : '',
                },
                fullscreenLoading: false,
                loading: true,
                errorMsg: '',
                dialogTableVisible: false,
                dialogFormVisible: false,
                formLabelWidth: '120px',
                successMsg: ''
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
                this.dialogFormVisible = false;
                axios.post(this.url + '/reset-password', {
                    findUser : this.resetToken.findUser
                }).
                then(response => {
                    this.fullscreenLoading = false;
                    if(response.data.updateLink){
                        this.successMsg = 'A reset link has been sent your email.'
                    }else{
                        this.errorMsg = response.data;
                    }
                    
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
                    
                    if(response.data.local){
                       
                        this.$message({
                            message: 'Login Successful...',
                            type: 'success'
                        });
                        this.setUserData(response.data.local);
                        this.fullscreenLoading = false;
                        this.$router.push({name: 'User'})
                        
                    }else{
                        this.fullscreenLoading = false;
                        this.errorMsg = response.data;
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

<template>
    <div class="limiter">
         <!-- Main jumbotron for a primary marketing message or call to action -->
        <div class="container-login100">
            <div class="container pt-5">
                <div class="alert alert-success pt-5" role="alert" v-if="isVerified">
                    <strong>Well done!</strong> Your {{email}} is verified successfully.
                </div>
                <div class="alert alert-danger" role="alert" else>
                    <strong>Oh snap!</strong> Link is expired or broken.
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
                hashId : this.$route.params.id,
                email: '',
                isVerified : false
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
            
            verifyEmail(){
                axios.post(this.url + '/verify', {
                    verifyEmail : this.hashId
                }).then( response => {
                    this.email = response.data.email;
                    if(response.data.validation){
                        this.isVerified = true;
                        setTimeout( () => this.$router.push({name: 'Login'}), 5000);  
                    }
                    
                }).catch(err => {
                    console.log(err);
                })
            }
            
        },
        created(){
            this.verifyEmail();
            
        }
    }
</script>

<style >


</style>

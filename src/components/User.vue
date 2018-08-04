<template>
    <div>
        <app-header></app-header>
         <!-- Main jumbotron for a primary marketing message or call to action -->
        <div class="jumbotron">
            <div class="container">
            <h1 class="display-3">Hello, {{user.name}}!</h1>
            <p>This is a template for a simple marketing or informational website. It includes a large callout called a jumbotron and three supporting pieces of content. Use it as a starting point to create something more unique.</p>
            <p><a class="btn btn-primary btn-lg" href="#" role="button">Learn more &raquo;</a></p>
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
             ...mapActions({
                setUserData : 'setUser'
            }),
            isLoged(){
                axios.get(this.url + '/user', {withCredentials: true})
                    .then(response => {
                        if(response.data.local){
                            this.setUserData(response.data.local);
                        }else{
                            this.$router.push({name: 'Login'})
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

<style>

</style>

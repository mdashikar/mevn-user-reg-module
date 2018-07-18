<template>
    <div>
        <dl v-for="item in bigData.data">
            <dt>Name:-</dt>
            <dd>{{ item.name}}</dd>
            <dt>Email</dt>
            <dd>{{ item.email }}</dd>
        </dl>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        data(){
            return{
                bigData : [],
                user : []
            }
        },
        methods:{
            init(){
                //call API
                axios.get( ('http://localhost:5050/getdata')).
                    then( (res) => {
                        console.log(res)
                        this.bigData = res;
                    })

                axios.get(('http://localhost:5050/data')).
                    then((res) => {
                        console.log(res);
                        this.user = res.data
                    })   
            }
        },
        mounted(){
            this.init()
        }
    }
</script>

<style>

</style>

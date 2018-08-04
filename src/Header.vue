<template>
    <div>
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container">
        <a class="navbar-brand" href="#">Container</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample07" aria-controls="navbarsExample07" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarsExample07">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
              <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Link</a>
            </li>
            <li class="nav-item">
              <a class="nav-link disabled" href="#">Disabled</a>
            </li>
            
          </ul>
          <ul class="navbar-nav float-right">
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="https://example.com" id="dropdown07" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{{user.username}}</a>
                <div class="dropdown-menu" aria-labelledby="dropdown07">
                    <a class="dropdown-item" href="#">Edit Profile</a>
                    
                    <a class="dropdown-item" href="#" @click="logOut">Logout</a>
                </div>
            </li>

          </ul>
          
        </div>
      </div>
    </nav>
    </div>
</template>

<script>
import {mapGetters} from 'vuex'
import axios from 'axios'
export default {
    computed: {
        ...mapGetters([
            'user',
            'url'
        ])
    },
    methods:{
        logOut(){
                axios.get(this.url + '/logout')
                    .then(response => {
                        if(response.data.logedOut){
                            this.$router.push({name: 'Login'});
                        }
                    })
                    .catch(e => {
                        this.errors.push(e)
                    })
            }
    },
}
</script>

<style>

</style>

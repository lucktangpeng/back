<template>
  <div id="app">
    <vframe></vframe>
    <!-- <router-view/> -->
  </div>
</template>

<script>
// import "bootstrap/dist/css/bootstrap.min.css"
import Vframe from "./components/Vframe.vue"
export default {
  name: 'App',
  data(){
    return{

    }
  },
  components:{
    Vframe
  },
  mounted(){
    this.$store.dispatch("content")
  }
}
</script>

<style>
/* #app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */
</style>

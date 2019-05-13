import Vue from 'vue'
import Vuex from "vuex"

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        stat:"ni s zhu"
    },
    mutations: {
      increment (state) {
        state.count++
      }
    },
    actions:{
        content(context){
            Vue.prototype.$axios.request({
                url:"http://127.0.0.1:8000/api/course/",
                method:"GET",
                headers:{
                  'Content-Type':'application/json',
                }
              }).then(function(date){
                // 请求发送成功
                console.log(date)
                
              }).catch(function(){
                // 请求发送失败
                console.log("请求失败")
              })
        }
    }
  })
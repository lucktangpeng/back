import Vue from 'vue'
import Vuex from "vuex"

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        content_val:"",
        title_status:{
          list:"",
          create:"",
          client:""
        },
        altercontent:"",
        clientcontent:""
    },
    mutations: {
      CONTENT (state,date) {
        state.content_val = date.data
      },
      ALTER_CONTENT(state,date){
        state.altercontent = date.data
      },
      CLIENT_CONTENT(state,date){
        state.clientcontent = date.data
      },
    },
    actions:{
        content(context){
            Vue.prototype.$axios.request({
                url:"http://192.168.10.151:8000/api/course/",
                method:"GET",
                headers:{
                  'Content-Type':'application/json',
                }
              }).then(function(date){
                // 请求发送成功
                console.log(date)
                context.commit("CONTENT",date)
              }).catch(function(){
                // 请求发送失败
                console.log("请求失败")
              })
        },
        alter_conent(context,id){
          Vue.prototype.$axios.request({
              url:"http://192.168.10.151:8000/api/course/"+id,
              method:"GET",
              headers:{
                'Content-Type':'application/json',
              }
            }).then(function(date){
              // 请求发送成功
              console.log(date)
              context.commit("ALTER_CONTENT",date)
            }).catch(function(){
              // 请求发送失败
              console.log("请求失败")
            })
      },
        client_content(context){
          Vue.prototype.$axios.request({
            url:"http://192.168.10.151:8000/api/record/",
            method:"GET",
            headers:{
              'Content-Type':'application/json',
            }
          }).then(function(date){
            // 请求发送成功
            console.log(date)
            context.commit("CLIENT_CONTENT",date)
          }).catch(function(){
            // 请求发送失败
            console.log("请求失败")
          })
        }
    }
  })
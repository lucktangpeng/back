import Vue from 'vue'
export default{
    content(context){
        Vue.prototype.$axios.request({
            url:Vue.prototype.com.course_url,
            method:"GET",
            headers:{
              'Content-Type':'application/json',
            }
          }).then(function(date){
            // 请求发送成功
            
            context.commit("CONTENT",date)
          }).catch(function(){
            // 请求发送失败
            console.log("请求失败")
          })
    },
    alter_conent(context,id){
      Vue.prototype.$axios.request({
          url:Vue.prototype.com.course_url+id,
          method:"GET",
          headers:{
            'Content-Type':'application/json',
          }
        }).then(function(date){
          // 请求发送成功
          
          context.commit("ALTER_CONTENT",date)
        }).catch(function(){
          // 请求发送失败
          console.log("请求失败")
        })
  },
    client_content(context){
      Vue.prototype.$axios.request({
        url:Vue.prototype.com.record_url,
        method:"GET",
        headers:{
          'Content-Type':'application/json',
        }
      }).then(function(date){
        // 请求发送成功
        context.commit("CLIENT_CONTENT",date)
      }).catch(function(){
        // 请求发送失败
        console.log("请求失败")
      })
    }
}
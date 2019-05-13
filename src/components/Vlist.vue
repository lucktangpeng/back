<template>
   <div class="col-lg-12">
                  <div class="card">
                    <div class="card-close">
                      
                    </div>
                    <div class="card-header d-flex align-items-center">
                      <h3 class="h4">课程明细</h3>
                    </div>
                    <div class="card-body">
                      <div class="table-responsive">
                        <table class="table">
                          <thead>
                            <tr>
                              <th>#</th>
                              <th>课程id</th>
                              <th>课程名称</th>
                              <th>课程时间</th>
                              <th>讲师</th>
                              <th>会议室号</th>
                              <th>会议室密码</th>
                              <th>操作</th>

                            </tr>
                          </thead>
                          <tbody>
                            <tr v-for="item in all_content">
                              <th scope="row">{{item.id}}</th>
                              <td>{{item.course_code}}</td>
                              <td>{{item.course_name}}</td>
                              <td>{{item.time}}</td>
                              <td>{{item.lecturer}}</td>
                              <td>{{item.meeting_room}}</td>
                              <td>{{item.meeting_room_pwd}}</td>
                              <td>
                                <button type="button" class="btn btn-success">修改</button>
                                <button type="button" class="btn btn-danger" @click="ele_remove(item.id)">删除</button>
                              </td>
                            </tr>
                            
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
</template>
<script>
export default {
    name:"Vlist",
    data(){
        return{
            
        }
    },
    methods:{
      ele_remove(id){
        var that = this
        this.$axios.request({
                url:"http://127.0.0.1:8000/api/course/"+id,
                method:"DELETE",
                headers:{
                  'Content-Type':'application/json',
                }
              }).then(function(date){
                // 请求发送成功
                console.log(date)
                // this.reload()
                that.$store.dispatch("content")
              }).catch(function(){
                // 请求发送失败
                console.log("请求失败")
              })
      }
    },
    mounted(){
      this.$store.dispatch("content")
    },
    computed:{
      all_content(){
        return this.$store.state.content_val
      }
    }
}
</script>
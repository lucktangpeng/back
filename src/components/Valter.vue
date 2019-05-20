<template>
  

        <!-- 这里是整个模块的不同点 -->
        <div class="col-lg-12">
            <div class="card">
                <div class="card-header d-flex align-items-center">
                    <h3 class="h4">课程修改</h3>
                </div>
                <div class="card-body">
                    <form class="form-horizontal">
                        <div class="form-group row">
                            <label class="col-sm-2 form-control-label">课程ID</label>
                            <div class="col-sm-9">
                                <input type="text" v-model="put_title.course_code" class="form-control" id="course_code" >
                            </div>
                        </div>
                        <div class="line"></div>
                        <div class="form-group row">
                            <label class="col-sm-2 form-control-label">课程名称</label>
                            <div class="col-sm-9">
                                <input type="text" v-model="put_title.course_name" class="form-control"
                                        id="course_name">
                            </div>
                        </div>
                        <div class="line"></div>
                        <div class="form-group row">
                            <label class="col-sm-2 form-control-label">开始时间</label>
                            <div class="col-sm-9">
                                <div class='input-group date' id='datetimepicker1'>
                                    <input type="text" v-model="put_title.start_time" class="form-control " id="start_time"  >
                                    <span class="input-group-addon">
                                        <span class="glyphicon glyphicon-calendar"></span>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div class="line"></div>
                        <div class="form-group row">
                            <label class="col-sm-2 form-control-label">结束时间</label>
                            <div class="col-sm-9">
                                <div class='input-group date' id='datetimepicker2'>
                                    <input type="text" v-model="put_title.end_time" class="form-control " id="end_time"  >
                                    <span class="input-group-addon">
                                        <span class="glyphicon glyphicon-calendar"></span>
                                    </span>
                                </div>
                            </div>
                        </div>
                    


                        <div class="line"></div>
                        <div class="form-group row">
                            <label class="col-sm-2 form-control-label">讲师</label>
                            <div class="col-sm-9">
                                <input type="text" v-model="put_title.lecturer" class="form-control" id="lecturer">
                            </div>
                        </div>
                        <div class="line"></div>
                        <div class="form-group row">
                            <label class="col-sm-2 form-control-label">会议室号</label>
                            <div class="col-sm-9">
                                <input type="text" v-model="put_title.meeting_room" class="form-control"
                                        id="meeting_room">
                            </div>
                        </div>
                        <div class="line"></div>
                        <div class="form-group row">
                            <label class="col-sm-2 form-control-label">会议室密码</label>
                            <div class="col-sm-9">
                                <input type="text" v-model="put_title.meeting_room_pwd" class="form-control"
                                        id="meeting_room_pwd">
                            </div>
                        </div>
                        <div class="line"></div>
                        <div class="form-group row">
                            <div class="col-sm-4 offset-sm-3">
                                <button type="button" class="btn btn-secondary " id="cancel">取消</button>
                                <button type="button" class="btn btn-primary " id="save" @click="click_save()">保存</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
</template>

<script>
import Vmodal from "../components/Vmodal.vue"
export default {
  name: 'Valter',
  data () {
    return {
      put_title:{
          course_code:"",
          course_name:"",
          start_time:"",
          end_time:"",
          lecturer:"",
          meeting_room:"",
          meeting_room_pwd:"",
      }
     
    }
  },
  methods:{
    click_save(){
      var tham = this
      this.$axios.request({
          url:this.com.course_url + tham.$route.params.index,
          method:"PUT",
          data:this.put_title,
          headers:{
            'Content-Type':'application/json',
          }
        }).then(function(date){
          // 请求发送成功
          
          if (date.status == 200){
              tham.$router.push({name:"Vlist"})
          }
        }).catch(function(){
          // 请求发送失败
          console.log("请求失败")
        })
    },
  },
  mounted(){
    var that = this
    this.status.create = false
    this.status.list = false
    this.$axios.request({
              url:this.com.course_url+that.$route.params.index,
              method:"GET",
              headers:{
                'Content-Type':'application/json',
              }
            }).then(function(date){
              // 请求发送成功
              // console.log(date.data)
              // for(let rt in that.put_title){
              //   console.log(that.put_title.rt)
              //   that.put_title.rt = date.data.rt
              // }
              that.put_title.course_code=date.data.course_code
              that.put_title.course_name=date.data.course_name
              that.put_title.start_time=date.data.start_time
              that.put_title.end_time=date.data.end_time
              that.put_title.lecturer=date.data.lecturer
              that.put_title.meeting_room=date.data.meeting_room
              that.put_title.meeting_room_pwd=date.data.meeting_room_pwd
            }).catch(function(){
              // 请求发送失败
              console.log("请求失败")
            })

    $("#datetimepicker1,#datetimepicker2").datetimepicker({
        // format: "yyyy dd MM  - hh:ii",
        dateFormat: "yy-mm-dd",
        autoclose: true,
        todayBtn: true,
        pickerPosition: "bottom-left",
        language:'zh-CN'
    }).on("change",function(ev){
        that.start_time = $("#start_time").val();
        that.end_time = $("#end_time").val();
    });
    
    
  },
  computed:{
    
    detail_time(){
        return this.time.split(" ")
    },
    alter_val(){
        return this.$store.state.altercontent
    },
    status(){
        return this.$store.state.title_status
      }
    
  },
  components:{
      Vmodal,
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
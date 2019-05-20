<template>
  

        <!-- 这里是整个模块的不同点 -->
        <div class="col-lg-12">
            <div class="card">
                <div class="card-header d-flex align-items-center">
                    <h3 class="h4">课程创建</h3>
                </div>
                <div class="card-body">
                    <form class="form-horizontal">
                        <div class="form-group row has-danger">
                            <label class="col-sm-2 form-control-label">课程ID</label>
                            <div class="col-sm-9">
                                <input type="text" v-model="put_title.course_code" class="form-control "  :class="{'is-invalid':course_code}" @change="change_course_code()" id="course_code">
                                <div class="invalid-feedback"  >{{course_code_error}}</div>
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
                                    <input type="text" v-model="put_title.start_time" class="form-control" :class="{'is-invalid':start_time}" @click="change_start_time()" id="start_time"  >
                                    <div class="invalid-feedback" > {{start_time_error}}</div>
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
                                    <input type="text" v-model="put_title.end_time" class="form-control " :class="{'is-invalid':end_time}" @click="change_end_time()" id="end_time"  >
                                    <div class="invalid-feedback" >{{end_time_error}}</div>
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
  name: 'HelloWorld',
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
            sum_val:"1"
      },
      course_code:false,
      start_time:false,
      end_time:false,
      course_code_error:"",
      start_time_error:"",
      end_time_error:""
    }
  },
  methods:{
    click_save(){
      console.log(this.put_title)
      var that = this
      this.$axios.request({
          url:this.com.course_url,
          method:"post",
          data:this.put_title,
          headers:{
            'Content-Type':'application/json',
          }
        }).then(function(date){
          // 请求发送成功
          console.log(date)
          if (date.data.status == false){
            console.log(date.data.error)
            
            for(var k in date.data.error){
              console.log(k)
              if( k == "course_code"){
                console.log("执行")
                that.course_code=true
                that.course_code_error = date.data.error[k]
              }
              if( k == "start_time"){
                console.log("执行")
                that.start_time=true
                that.start_time_error = date.data.error[k]
              }
              if( k == "end_time"){
                console.log("执行")
                that.end_time=true
                that.end_time_error = date.data.error[k]
              }
            }
            
          }else{
            $("#my_modal").modal("show")
            that.$router.push({name:"Vlist"})
          }
        }).catch(function(){
          // 请求发送失败
          console.log("请求失败")
        })
    },
    change_course_code(){
      this.course_code=false
      this.course_code_error=""
    },
    change_start_time(){
      this.start_time=false
      this.start_time_error=""
    },
    change_end_time(){
      this.end_time=false
      this.end_time_error=""
    },
  },
  mounted(){
    var that = this
    this.status.create = true
    this.status.list = false
    this.status.client = false
    this.$axios.request({
                url:this.com.course_url,
                method:"GET",
                headers:{
                  'Content-Type':'application/json',
                }
              }).then(function(date){
                // 请求发送成功
                var len = date.data.length
                // console.log(date.data[len-1].course_code)
                that.put_title.course_code = parseInt(date.data[len-1].course_code)+1
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
        that.put_title.start_time = $("#start_time").val();
        that.put_title.end_time = $("#end_time").val();
    })
    
  },
  computed:{
    create_values(){
      return {
            "course_code":this.course_code,
            "course_name":this.course_name,
            "time":this.detail_time[0],
            "small_time":this.detail_time[1],
            "lecturer":this.lecturer,
            "meeting_room":this.meeting_room,
            "meeting_room_pwd":this.meeting_room_pwd,
      }
    },
    detail_time(){
        return this.time.split(" ")
    },
    status(){
        return this.$store.state.title_status
      },
    con(){
        return this.$store.state.content_val.length
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

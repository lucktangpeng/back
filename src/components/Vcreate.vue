<template>
  

        <!-- 这里是整个模块的不同点 -->
        <div class="col-lg-12">
            <div class="card">
                <div class="card-header d-flex align-items-center">
                    <h3 class="h4">课程创建</h3>
                </div>
                <div class="card-body">
                    <form class="form-horizontal">
                        <div class="form-group row">
                            <label class="col-sm-2 form-control-label">课程ID</label>
                            <div class="col-sm-9">
                                <input type="text" v-model="course_code" class="form-control" id="course_code">
                            </div>
                        </div>
                        <div class="line"></div>
                        <div class="form-group row">
                            <label class="col-sm-2 form-control-label">课程名称</label>
                            <div class="col-sm-9">
                                <input type="text" v-model="course_name" class="form-control"
                                        id="course_name">
                            </div>
                        </div>
                        <div class="line"></div>
                        <div class="form-group row">
                            <label class="col-sm-2 form-control-label">课程时间</label>
                            <div class="col-sm-9">
                                <div class='input-group date' id='datetimepicker1'>
                                    <input type="text" v-model="time" class="form-control " id="time"  >
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
                                <input type="text" v-model="lecturer" class="form-control" id="lecturer">
                            </div>
                        </div>
                        <div class="line"></div>
                        <div class="form-group row">
                            <label class="col-sm-2 form-control-label">会议室号</label>
                            <div class="col-sm-9">
                                <input type="text" v-model="meeting_room" class="form-control"
                                        id="meeting_room">
                            </div>
                        </div>
                        <div class="line"></div>
                        <div class="form-group row">
                            <label class="col-sm-2 form-control-label">会议室密码</label>
                            <div class="col-sm-9">
                                <input type="text" v-model="meeting_room_pwd" class="form-control"
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
// import './assets/css/bootstrap.min.css'
// import "./assets/css/bootstrap-datetimepicker.min.css"
// import './assets/js/bootstrap.min'
// import './assets/js/bootstrap-datetimepicker.min.js'
// import $ from "jquery"
import Vmodal from "../components/Vmodal.vue"
export default {
  name: 'HelloWorld',
  data () {
    return {
      course_code:"",
      course_name:"",
      time:"",
      lecturer:"",
      meeting_room:"",
      meeting_room_pwd:"",
    }
  },
  methods:{
    click_save(){
      var that = this
      console.log(this.create_values)
      console.log(this.detail_time)
      console.log($('#time').val())
      this.$axios.request({
          url:"http://127.0.0.1:8000/api/course/",
          method:"post",
          data:this.create_values,
          headers:{
            'Content-Type':'application/json',
          }
        }).then(function(date){
          // 请求发送成功
          console.log(date)
          if (date.status == 201){
            console.log("")
            $("#my_modal").modal("show")
            that.$router.push({name:"Vlist"})
          }
        }).catch(function(){
          // 请求发送失败
          console.log("请求失败")
        })
    },
  },
  mounted(){
    // this.test()
    var that = this
    this.status.create = true
    this.status.list = false
    this.status.client = false
    // this.course_code = this.content_val.lenght()
    console.log("这里11")
    console.log(this.con )
    this.$axios.request({
                url:"http://192.168.10.151:8000/api/course/",
                method:"GET",
                headers:{
                  'Content-Type':'application/json',
                }
              }).then(function(date){
                // 请求发送成功
                var len = date.data.length
                console.log(date.data[len-1].course_code)
                that.course_code = parseInt(date.data[len-1].course_code)+1
              }).catch(function(){
                // 请求发送失败
                console.log("请求失败")
              })


    $("#datetimepicker1").datetimepicker({
        // format: "yyyy dd MM  - hh:ii",
        dateFormat: "yy-mm-dd",
        autoclose: true,
        todayBtn: true,
        pickerPosition: "bottom-left",
        language:'zh-CN'
    }).on("change",function(ev){
        var startTime = $("#time").val();
        that.time = startTime
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

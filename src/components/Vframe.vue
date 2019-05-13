<template>
  <div class="page">
    <!-- Main Navbar-->
    <vmodal></vmodal>
    <header class="header">
        <nav class="navbar">
            <!-- Search Box-->
            <div class="search-box">
                <button class="dismiss"><i class="icon-close"></i></button>
                <form id="searchForm" action="#" role="search">
                    <input type="search" placeholder="What are you looking for..." class="form-control">
                </form>
            </div>
            <div class="container-fluid">
                <div class="navbar-holder d-flex align-items-center justify-content-between">
                    <!-- Navbar Header-->
                    <div class="navbar-header">
                        <!-- Navbar Brand -->
                        <a href="index.html" class="navbar-brand d-none d-sm-inline-block">
                        <div class="brand-text d-none d-lg-inline-block"><span>课程报名后台 </span></div>
                        <div class="brand-text d-none d-sm-inline-block d-lg-none"><strong>BD</strong></div>
                    </a>
                        <!-- Toggle Button-->
                        <a id="toggle-btn" href="#" class="menu-btn active"><span></span><span></span><span></span></a>
                    </div>
                    <!-- Navbar Menu -->
                    <ul class="nav-menu list-unstyled d-flex flex-md-row align-items-md-center">

                        <!-- Logout    -->
                        <li class="nav-item"><a href="login.html" class="nav-link logout"> <span
                                class="d-none d-sm-inline">Logout</span><i class="fa fa-sign-out"></i></a></li>
                    </ul>
                </div>
            </div>
        </nav>
    </header>
    <div class="page-content d-flex align-items-stretch">
        <!-- Side Navbar -->
        <nav class="side-navbar">
            <!-- Sidebar Header-->
            <div class="sidebar-header d-flex align-items-center">
                <div class="avatar"><img src="/static/img/avatar-1.jpg" alt="..." class="img-fluid rounded-circle">
                </div>
                <div class="title">
                    <h1 class="h4">Mark Stephen</h1>
                    <p>Web Designer</p>
                </div>
            </div>
            <!-- Sidebar Navidation Menus-->
            <!-- <span class="heading">Main</span> -->
            <ul class="list-unstyled">
                <li class="active">
                    <router-link to="/create"><i class="icon-padnote"></i>课程创建</router-link>
                    <!-- <a href="forms.html"> <i class="icon-padnote"></i>课程创建 </a> -->
                 </li>
                <li >
                    <router-link to="/list"><i class="icon-padnote"></i>课程明细</router-link>
                    <!-- <a href="forms.html"> <i class="icon-padnote"></i>课程明细 </a> -->
                </li>
            </ul>
        </nav>
        <div class="content-inner">
            <!-- Page Header-->
            <!-- <header class="page-header">
                <div class="container-fluid">
                    <h2 class="no-margin-bottom">Forms</h2>
                </div>
            </header> -->
            <!-- Breadcrumb-->
            <div class="breadcrumb-holder container-fluid">
                <ul class="breadcrumb">
                    <li class="breadcrumb-item"><a href="index.html">Home</a></li>
                    <li class="breadcrumb-item active">Forms</li>
                </ul>
            </div>
            <!-- Forms Section-->
            
            <section class="forms">
                <div class="container-fluid">
                    <div class="row">

                        <!-- 这里是整个模块的不同点 -->
                
                         <router-view/>
                    </div>
                </div>
            </section>
            <!-- Page Footer-->
            <!-- <footer class="main-footer">

            </footer> -->
        </div>
    </div>
</div>
</template>

<script>
import Vmodal from "../components/Vmodal.vue"
import Vcreate from "../components/Vcreate.vue"
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
    }
  },
  components:{
      Vmodal,
  }
}
// $('#datetimepicker1').datetimepicker({
//      format : 'dddd YYYY年MM月DD日 HH:mm:ss'
// });
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

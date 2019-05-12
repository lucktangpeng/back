<template>
  <div class="page">
    <!-- Main Navbar-->
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
                                   <!-- <li><a href="index.html"> <i class="icon-home"></i>Home </a></li>
                                    <li><a href="tables.html"> <i class="icon-grid"></i>Tables </a></li>
                                   <li><a href="charts.html"> <i class="fa fa-bar-chart"></i>Charts </a></li> -->
                <li class="active"><a href="forms.html"> <i class="icon-padnote"></i>Forms </a></li>
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

                        <!-- Form Elements -->
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
                                                <input type="text" v-model="time" class="form-control " id="time">
                                            </div>
                                        </div>
                              
                                          <div class='col-sm-6'>
                                          <div class="form-group">
                                              <div class='input-group date' >
                                                  <input type="text" class="datetimepicker">
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
                    </div>
                </div>
            </section>
            <!-- Page Footer-->
            <footer class="main-footer">

            </footer>
        </div>
    </div>
</div>
</template>

<script>
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
        }).catch(function(){
          // 请求发送失败
          console.log("请求失败")
        })
    },
    test(){
      $('.datetimepicker').datetimepicker({
        minView: "month",
        format: "yyyy-mm-dd",
        language: 'zh-CN',
        autoclose:true
    });

    },
  },
  mounted(){
    this.test()
  },
  computed:{
    create_values(){
      return {
            "course_code":this.course_code,
            "course_name":this.course_name,
            "time":this.time,
            "lecturer":this.lecturer,
            "meeting_room":this.meeting_room,
            "meeting_room_pwd":this.meeting_room_pwd,
      }
    }
  }
}
// $('#datetimepicker1').datetimepicker({
//      format : 'dddd YYYY年MM月DD日 HH:mm:ss'
// });
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

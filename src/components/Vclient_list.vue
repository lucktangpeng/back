<template>
   <div class="col-lg-12">
                  <div class="card">
                    <div class="card-close">
                      
                    </div>
                    <div class="card-header d-flex align-items-center col-sm-12">
                      <h3 class="h4">报名信息</h3>
                      
                            <div class="col-sm-3 offset-1" >
                                <select class="form-control" v-model="select_id" id="select_cour" @change="course_change()">
                                  <option value="0">选择查看课程</option>
                                  <option  v-for="itme in content_val">{{itme.course_name}}</option>
                                </select>
                            </div>
                            <div class="col-sm-3 offset-1">
                                <select class="form-control" v-model="time_id">
                                  <option value="0">选择开始时间</option>
                                  <option v-for="ti in course_time">{{ti.start_date}}</option>
                                  
                                </select>
                            </div>
                            <button type="button" class="btn btn-success" @click="seekhander()">搜索</button>
                            <button type="button" class="btn btn-info offset-1" @click="click_all()">全部信息</button>
                    </div>
                    <div class="card-body">
                      <div class="table-responsive">
                        <table class="table" id="out_table">
                          <thead>
                            <tr>
                              <!-- <th>#</th> -->
                              <th>课程</th>
                              <th>代理商代号</th>
                              <th>培训人名称</th>
                              <th>手机号</th>
                              <th>区域</th>
                              <!-- <th>操作</th> -->
                            </tr>
                          </thead>
                          <tbody>
                            <tr v-for="item in local_content">
                              <th scope="row">{{item.course_id}}</th>
                              <td>{{item.agent_id}}</td>
                              <td>{{item.company}}</td>
                              <td>{{item.phone}}</td>
                              <td>{{item.area}}</td>
                              <!-- <td>
                                <button type="button" class="btn btn-success" @click="ele_alter(item.id)">修改</button>
                                <button type="button" class="btn btn-danger" @click="ele_remove(item.id)">删除</button>
                              </td> -->
                            </tr>
                           
                          </tbody>
                        </table>
                         <button type="button" class="btn btn-info pull-right" @click="downloadExl(change_save)">数据导出</button>
                      </div>
                    </div>
                  </div>
                </div>
</template>
<script>
import { mapState, mapGetters } from 'vuex';
export default {
    name:"Vlist",
    data(){
        return{
            select_id:0,
            test: this.id_in,
            time_id:0,
            local_content:""
        }
    },
    methods:{
      onexport(){
        var wb = XLSX.utils.table_to_book(document.getElementById("out_table"));
        var wbout = XLSX.write(wb,{bookType:"xlsx",type:"binary"});
        saveAs(new Blob([this.s2ab(wbout)],{type:"application/octet-stream"}),"sheetjs.xlsx");
      },
      s2ab:function(s){
        if (typeof ArrayBuffer !== "undefined"){
          var buf = new ArrayBuffer(s.length);
          var view = new Uint8Array(buf);
          for (var i=0;i!=s.length;++i) view[i] = s.charCodeAt(i) & 0xFF;
          return buf
        }else{
          var buf = new Array(s.length);
          for (var i=0;i!=s.length;++i) buf[i] = s.charCodeAt(i) & 0xFF;
          return buf
        }
      },

      downloadExl(data,type){
        
        var keys = Object.keys(data[0]);
        var firstRow = {};
        keys.forEach(function (item) {
        firstRow[item] = item;
        });
        data.unshift(firstRow);

        var content = {};
        // 把json格式的数据转为excel的行列形式
        
        var sheetsData = data.map(function (item, rowIndex) {
                return keys.map(function (key, columnIndex) {
                   return Object.assign({}, {
                         value: item[key],
                        position: (columnIndex > 25 ? getCharCol(columnIndex) : String.fromCharCode(65 + columnIndex)) + (rowIndex + 1),
                     });
                 });
             }).reduce(function (prev, next) {
                 return prev.concat(next);
            });
            console.log(sheetsData)
            var title = ["序号","课程名称","代理商代号","培训人名称","手机号","区域"]
            for(var my_itme in [0,1,2,3,4,5]){
              sheetsData[my_itme].value = title[my_itme]
            }
            
            
            sheetsData.forEach(function (item, index) {
                 content[item.position] = { v: item.value };
             });
        //设置区域,比如表格从A1到D10,SheetNames:标题，
             var coordinate = Object.keys(content);
             var workBook = {
                 SheetNames: ["helloSheet"],
                Sheets: {
                    // "helloSheet": Object.assign({}, content, { "!ref": coordinate[0] + ":" + coordinate[coordinate.length - 1] }),
                    "helloSheet": Object.assign({}, content, { "!ref": coordinate[0] + ":" + coordinate[coordinate.length - 1] }),
                    
                 }
             };
             //这里的数据是用来定义导出的格式类型
             var excelData = XLSX.write(workBook, { bookType: "xlsx", bookSST: false, type: "binary" });
             var blob = new Blob([this.string2ArrayBuffer(excelData)], { type: "" });
             saveAs(blob, "hello.xlsx");
         },
         //字符串转字符流
         string2ArrayBuffer(s) {
             var buf = new ArrayBuffer(s.length);
             var view = new Uint8Array(buf);
             for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
             return buf;
         },
         // 将指定的自然数转换为26进制表示。映射关系：[0-25] -> [A-Z]。
         getCharCol(n) {
             let temCol = "",
                 s = "",
                 m = 0
            while (n > 0) {
                 m = n % 26 + 1
                 s = String.fromCharCode(m + 64) + s
                n = (n - m) / 26
             }
             return s
         },     
      
      seekhander(){
        let seach = {}
       
        if(this.select_id && this.time_id !=0){       
          seach["course_name"] = this.select_id
          seach["start_time"] = this.time_id
          // seach["time"] = times[0]
          // seach["small_time"] = times[1]
        }
        if(this.select_id != 0){
          seach["course_name"] = this.select_id
       
        }
        var that = this
        this.$axios.request({
            url:this.com.many_about,
            method:"POST",
            data:seach,
            headers:{
              'Content-Type':'application/json',
            }
          }).then(function(date){
            // 请求发送成功
            that.local_content = date.data.data
          }).catch(function(){
            // 请求发送失败
            console.log("请求失败")
          })
      },
      click_all(){
        var that = this
        this.select_id=0
        this.time_id=0
        this.$axios.request({
            url:this.com.many_about,
            method:"POST",
            data:{},
            headers:{
              'Content-Type':'application/json',
            }
          }).then(function(date){
            // 请求发送成功
            that.local_content = date.data.data
            that.local_content = date.data.data
          }).catch(function(){
            // 请求发送失败
            
            console.log("请求失败")
          })
      },
      course_change(){
        this.time_id = 0
      },
      
      
      
      
      
      },
     
  
    
    mounted(){
      this.$store.dispatch("client_content")
      this.status.create = false
      this.status.list = false
      this.status.client = true
      let seach = {}
      let url_params = this.$route.params
      if(url_params){
        seach = url_params
      }
      var that = this
      this.$axios.request({
            url:this.com.many_about,
            method:"POST",
            data:seach,
            headers:{
              'Content-Type':'application/json',
            }
          }).then(function(date){
            // 请求发送成功
            that.local_content = date.data.data
          }).catch(function(){
            // 请求发送失败
            console.log("请求失败")
          })
    },
    computed:{
      ...mapState({
        all_content:"clientcontent",
        status:"title_status",
        content_val:"content_val"
      }),
      
       course_time(){
        var time_list = []
        var test = JSON.parse(JSON.stringify(this.content_val))
        for (var i=0;i<this.content_val.length;i++){
          if(this.content_val[i].course_name == this.select_id){
            time_list.push({
              "start_date":this.content_val[i].start_time,
            })
          }
        }
        return time_list
      },
      change_save(){
        return JSON.parse(JSON.stringify(this.local_content))
      }
    }
}
</script>
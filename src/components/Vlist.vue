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
                        <table class="table" id="out_table">
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
                              <td>{{item.time + " " + item.small_time}}</td>
                              <td>{{item.lecturer}}</td>
                              <td>{{item.meeting_room}}</td>
                              <td>{{item.meeting_room_pwd}}</td>
                              <td>
                                <button type="button" class="btn btn-success" @click="ele_alter(item.id)">修改</button>
                                <button type="button" class="btn btn-danger" @click="ele_remove(item.id)">删除</button>
                              </td>
                            </tr>
                           
                          </tbody>
                        </table>
                         <button type="button" class="btn btn-info pull-right" @click="downloadExl(out_content)">数据导出</button>
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
                url:"http://192.168.10.151:8000/api/course/"+id,
                method:"DELETE",
                headers:{
                  'Content-Type':'application/json',
                }
              }).then(function(date){
                // 请求发送成功
                console.log(date)
                if(date.status == 204){
                  that.$store.dispatch("content")
                  $("#my_modal").modal("show")
                }
              }).catch(function(){
                // 请求发送失败
                console.log("请求失败")
              })
      },
      ele_alter(id){
        this.$store.dispatch("alter_conent",id)
        this.$router.push({name:'Valter',params:{index:id}})
      },
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
            var title = ['id',"课程代号","课程名称","日期","时间","讲师","会议室号","会议室密码"]
            for(var my_itme in [0,1,2,3,4,5,6,7]){
              sheetsData[my_itme].value = title[my_itme]
            }
            
            
            sheetsData.forEach(function (item, index) {
                //  console.log(item.position)
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
         }     
      },

    
    mounted(){
      this.$store.dispatch("content")
      this.status.create = false
      this.status.list = true
      this.status.client = false
      
    },
    computed:{
      all_content(){
        return this.$store.state.content_val
      },
      out_content(){
        let b = JSON.parse(JSON.stringify(this.$store.state.content_val))
        return b
      },
      status(){
        return this.$store.state.title_status
      }
    }
}
</script>
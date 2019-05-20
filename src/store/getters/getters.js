export default{
    out_content(state){
        
        return JSON.parse(JSON.stringify(state.clientcontent))
      },
}
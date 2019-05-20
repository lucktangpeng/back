export default{
    CONTENT (state,date) {
        state.content_val = date.data
      },
      ALTER_CONTENT(state,date){
        state.altercontent = date.data
      },
      CLIENT_CONTENT(state,date){
        state.clientcontent = date.data
      },
}
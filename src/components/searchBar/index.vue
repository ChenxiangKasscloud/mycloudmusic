<template>
  <div class="head-center">
    <div class="search_wrapper">
      <router-link :to="{name:'Search'}" id="header_search">
        <i class="iconfont icon-sm icon-head-search fl"></i>
        <input disable class="search-input ellipsis" placeholder="搜索音乐、歌词、电台"/>
      </router-link>
    </div>
  </div>
</template>
<script>
  export default{
    data(){
      return{

      }
    },
    methods:{
      goToSearch(){
        console.info("locNow",this.$route.name);
      }
    }

  }

</script>
<style scoped>
  .head-center{
    flex:6;
    padding: .3rem 0;
  }
  .icon-head-search{
    color: #cdcdcd;
    line-height: 2.3rem;
    position: relative;
    padding-right: .6rem;
    font-size: 1rem;
  }
  .icon-head-search::before{
    content: "\e678"
  }
  .search_wrapper{
    padding: 0 20%;
    border-radius:30px;
    background: #f5f5f5;
  }
  .search-input{
    height: 2.3rem;
    width: calc( 100% - 1.8rem );
    margin: 0 0;
    background-color: #f5f5f5;
    border: none;
  }
  .search-input:focus{
    border-color: #fff;
    border: none;
  }
  ::-webkit-input-placeholder {
    color:#999;
    text-align: left;
  }
  :-moz-placeholder {color:#999;}
  :-ms-input-placeholder {color:#999;}

  input:disabled{
    color: #333;
  }

</style>

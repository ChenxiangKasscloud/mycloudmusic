<template>
  <div class="search_wrapper">
    <div class="search_header clearfix">
      <div class="search_cancle fr" @click="$router.go(-1)">
        <span>取消</span>
      </div>
      <div class="search_area fr">
        <i class="iconfont icon-sm icon-head-search fl"></i>
        <input class="search-input ellipsis" placeholder="搜索音乐、歌词、电台"/>
      </div>
    </div>
    <div class="search_content">

    </div>
  </div>
</template>

<script>

  import '@/assets/css/search.css'

  export default{
    name:'searchPage',
    data() {
      return{

      }
    },
    mounted : {

    }
  }

</script>

<style scoped>
  .search_wrapper{
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-pack: distribute;
    justify-content: space-around;
    padding: 5px 0;
    background: #fff;
    position: relative;
    top: 0;
    width: 100%;
    z-index: 1;
  }
  .search_header{
    -webkit-box-flex: 6;
    -ms-flex: 6;
    flex: 6;
    padding: .3rem 0;
  }
  .search_header .search_area{
    width: 75%;
    padding: 0 20%;
    border-radius:30px;
    background: #f5f5f5;
    transition: .3s all
  }
  .search_header .search_cancle{
    width: 4em;
    text-align: center;
    line-height: 2.3;
  }
  .search_header div{
    display: inline-block;
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
  .search-input{
    height: 2.3em;
    width: calc( 100% - 1.8rem );
    margin: 0 0;
    background-color: #f5f5f5;
    border: none;
  }
</style>

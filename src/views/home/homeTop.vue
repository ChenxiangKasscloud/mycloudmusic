<template>
   <div class="container">
      <div class="head-left">
         <a class="block" href="javascript:viod(0)">
           <i class="iconfont icon-md icon-head-mic"></i>
         </a>
      </div>
      <SearchBar></SearchBar>
      <div class="head-right">
         <i v-show="playing" class="block whiteBg" @click="goPlay()">
           <play-icon slot="right"></play-icon>
         </i>
      </div>
    </div>
</template>

<script>
  import PlayIcon from '@/components/playicon/index'
  import SearchBar from '../../components/searchBar/index'
  import { mapState } from 'vuex'
  export default{
    data(){
       return{
         name: 'homeTop',
         yangshi:{
           color:'#333'
         }
       }
    },
    methods: {
      // goToSearch () {
      //   this.$router.push({name: 'Search'})
      // },
      goPlay(){
        if( !this.playing )
          return;
        this.$router.push({ name: 'Player'})
      }
    },
    components:{
      SearchBar,PlayIcon
    },
    computed: {
      ...mapState([
				'playing'
			])
    }
  }
</script>
<style scoped>
  .container{
    display:flex;
    justify-content: space-around;
    padding: 5px 0;
    background:#fff;
    position: relative;
    top:0;
    width: 100%;
    z-index: 1;
  }
  .head-left{
    flex:1;
    text-align: center;
    line-height: 2.5rem;
  }
  .head-left .icon-mic{

  }
  .head-left .icon-head-mic:before{
    content: "\e682";
  }
  .head-right{
    flex:1;
    text-align: center;
    line-height: 2.5rem;
  }
  .head-right .icon-head-playing{

  }
  .head-right .icon-head-playing:before{
    content: "\e6e9";
  }
  .search_wrapper{
    background: #fff;
    font-size: 12px;
    height: 26px;
    line-height: 26px;
    border-radius:30px;
    position: relative;
    margin-top:3px;
  }

</style>

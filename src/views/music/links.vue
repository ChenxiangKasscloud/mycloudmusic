<template>
  <div class="flex">
    <div class="flex-item" >
      <div class="item"
        :style="{width : componentWidth, height : componentHeight, lineHeight:componentLineH}">
         <i class="iconfont icon-fm"></i>
      </div>
      <p>私人FM</p>
    </div>
    <div class="flex-item" >
      <div class="item"
        :style="{width : componentWidth, height : componentHeight, lineHeight:componentLineH}">
        <i class="iconfont icon-daily"></i>
      </div>
      <p>每日推荐</p>
    </div>
    <div class="flex-item" @click="go()">
      <div class="item" :style="{width : componentWidth, height : componentHeight, lineHeight:componentLineH}">
        <i class="iconfont icon-songs"></i>
      </div>
      <p>歌单</p>
    </div>
    <div class="flex-item" @click="go()">
      <div class="item" :style="{width : componentWidth, height : componentHeight, lineHeight:componentLineH}">
        <i class="iconfont icon-hot"></i>
      </div>
      <p>排行榜</p>
    </div>
  </div>
</template>
<script>
  export default{
    data(){
      return{
        list:[
          {className:'fm',  itemName:'私人FM'},
          {className:'daily',  itemName:'每日歌曲推荐'},
          {className:'hot',  itemName:'云音乐热歌榜'},
        ],
        componentWidth : "1rem",
        componentWidth : "1rem",
        componentLineH : "1rem"
      }
    },
    beforeMount () {
      let dpr = parseInt(document.getElementsByTagName('html')[0].dataset.dpr);
      console.info("dpr+1 <= 3 ? 3 : ( dpr+1 >= 4 ? 4 : dpr+1 )",( dpr+1 ) >= 4 ? 4 : 3)
      let pureWidth = ( dpr+1 ) >= 4 ? 4 : 3;
      this.componentWidth = pureWidth.toString() + 'rem';
      this.componentHeight = this.componentLineH = this.componentWidth;
    },
    methods:{
      go(){
        this.$router.push({
          name: 'RankingList'
        })
      }
    }
  }
</script>
<style scoped>
  .flex{
    display: flex;
    justify-content: space-around;
    background-color: #fff;
    border-bottom: .01rem solid #eee;
  }
  .flex-item{
    padding: 1rem 0;
    width:25%;
    text-align: center;
  }
  .item{
    border:1px solid #d33a31;
    color: #d33a31;
    -webkit-border-radius:50%;
    -moz-border-radius:50%;
    border-radius:50%;
    margin: 0 auto;
  }
  .flex-item p{
    margin-top: .5rem;
  }
  i{
    display: block;
    font-size: 1.8rem;
  }
  .icon-fm{
    position: relative;
    top: -0.1rem;
  }
  .icon-fm:before{
    content: "\e71b";
  }
  .icon-daily:before{
    content: "\e704"
  }
  .icon-songs:before{
    content: "\e600"
  }
  .icon-hot:before{
    content: "\e677"
  }
</style>

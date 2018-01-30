<template>
  <div id="hqpl" v-show="hqinfo.name">
    <div class="blurbg album_cover"
      :style="{'background-image':'url('+(hqinfo.coverImgUrl)+'?param=300y300)','background-color':'#eee'}">
    </div>
    <router-link :to="{name: ''}" class="flexlist flex-image">
      <div class="flexleft fl-image">
        <img :src="hqinfo.coverImgUrl+'?param=200y200'" class="album_cover" />
      </div>
      <div class="flexlist" style="border-bottom: none;">
        <div class="flexmain">
          <div id="hq_title">
            <!-- <img src="../../../../static/images/cm4_slist_icn_hot@2x.png" alt="" /> -->
            精品歌单
            <!-- <img src="../../../../static/images/common_icon_arrow@2x.png" alt="" /> -->
          </div>
          <div>{{hqinfo.name}}</div>
          <div class="relistdes">{{hqinfo.copywriter}}</div>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
  import OrderApi from '../../service/api/orderapi.js'

  export default{
    name : 'hquality',
    data (){
      return {
        hqinfo : {}
      }
    },
    created (){
      this.getHigthQuality()
    },
    methods : {
      // 获取精品推荐
      getHigthQuality () {
        let randomNum = Math.floor(Math.random()*10);
        OrderApi.getHQList().then( (res) => {
          if( randomNum <= res.playlists.length )
            this.hqinfo = res.playlists[randomNum]
          else
            this.hqinfo = res.playlists[0]
          console.info("this.hqinfo",this.hqinfo);
        }).catch( (err) => {
        })
      }
    }
  }
</script>
<style scoped>
  .flexlist .flexlist {
      flex: 1;
      padding: .5em .5em .5em 0;
      margin: 0;
      align-items: center;
      margin-left: 0;
      box-sizing: content-box;
      overflow: hidden;
      line-height: 1.5;
      position: relative;
      border-bottom: 1px solid #dadada;
      width: auto;
  }
  #hqpl {
    position: relative;
    padding: 1em 0;
    color: #fff;
    overflow: hidden;
  }

  #hqpl a ,#hqpl .relistdes{
    color: #fff;
  }

  #hq_title img {
    height: 1.5em;
    margin-right: .5em;
  }
  #hqpl .fl-image{margin:0 1em;}
  #hq_title img:last-child {
    height: 1em;
    margin-left: .5em;
  }

  #hq_title {
    font-size: 1.2em;
    padding-bottom: .5em;
  }

  #hqpl .fl-image img {
    height: 8em;
    width: 8em;
  }
</style>

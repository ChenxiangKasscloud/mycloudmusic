<template>
  <div class="home-model-component music-list-component">
    <i-card
      :datalist="musicrecommends"
      :cellcount="2"
      :showht="true"
      :cardclick="toSonglist">
    </i-card>
  </div>
</template>

<script>
  import HOMEAPI from '../../service/api/homeapi.js';
  import  ICard from '../icard'

  export default{
    name : "music",
    data () {
      return {
        musicrecommends : []
      }
    },
    components: {
      ICard
    },
    created () {
      this.loadData()
    },
    methods : {
      // 获取电台推荐节目
      loadData () {
        HOMEAPI.getRecommendsList().then( (res) => {
          this.musicrecommends = [];
          let randomNum = Math.floor(Math.random()*10);
          for( let i = 0 ; i < 6; i++){
            if( i+randomNum < res.result.length ){
              let randomNode = res.result[i+randomNum];
              let obj = {
                id : randomNode.id,
                picUrl : randomNode.picUrl,
                playCount : randomNode.playCount,
                desc : randomNode.name
              }
              this.musicrecommends.push(obj)
            }
          }
        }).catch( (err) => {

        })
      },
      toSonglist (item) {
        this.$router.push({ name:'PlayList',params:{id : item.id, img: item.picUrl,desc:item.desc} })
      }
    }
  }
</script>
、

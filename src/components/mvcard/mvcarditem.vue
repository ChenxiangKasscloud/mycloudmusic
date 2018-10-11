<template>
  <div class="carditem-component">
    <div class="song-list-detail" @click="goToMusicList(iteminfo.id)" :style="{height:detailHeigth+'rem'}">
      <img class="song-list-detail-cover" :src="iteminfo.picUrl">
      <div class="flex song-list-detail-listen">
        <div class="song-list-detail-listen-count">
          <i class="iconfont icon icon-mv"></i>
          {{ iteminfo.playCount | transformNumberCount }}
        </div>
      </div>
    </div>
    <p class="song-list-name ellipsis">{{ iteminfo.name }}</p>
    <p class="song-list-name user-name ellipsis">{{ iteminfo.artistName }}</p>
  </div>
</template>

<script>
  import HOMEAPI from '../../service/api/homeapi.js';

  export default{
    name:"carditem",
    props: {
      iteminfo : {
        type : Object,
        required : true
      }
    },
    data () {
      return {
        fontSize : 0.1,
        detailHeigth:0
      }
    },
    methods: {
      goToMusicList (id) {
        this.$router.push({
          name: 'MusicList',
          params: {
            id: id
          }
        })
      }
    },
    beforeMount () {
      let dpr = document.getElementsByTagName('html')[0].dataset.dpr;
      this.fontSize = dpr <= 2 ? 0.75 : 0.9 ;
      this.detailHeigth = dpr <= 2 ? 6.3 : 8.2;
    }
  }
</script>

<style scoped>
  .icon-mv{
    font-weight: 600;
    font-size: 1rem;
  }
  .user-name{
    font-size: .9rem;
    color:#a0a0a0;
  }
  .song-list-name {
    display: block;
  }
</style>

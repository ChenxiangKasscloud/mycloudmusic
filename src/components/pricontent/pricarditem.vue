<template>
  <div class="carditem-component">
    <div class="song-list-detail" @click="goToMusicList(iteminfo.id)" :style="{height:detailHeigth+'rem'}">
      <img class="song-list-detail-cover" :src="iteminfo.picUrl">
      <div class="flex song-list-detail-listen">
        <div class="song-list-detail-listen-count">
          <i class="song-list-detail-listen-icon background"></i>
        </div>
      </div>
    </div>
    <p class="song-list-name">{{ iteminfo.name }}</p>
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
      },
      index : {
        type : Number,
        required :true
      }
    },
    data () {
      return {
        fontSize : 0.1,
        detailHeigth:0
      }
    },
    computed: {
      phoneResolutionWidth () {
        return this.$store.state.phoneResolutionWidth
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
      if( this.index % 3 == 0 )
        this.detailHeigth = dpr <= 2 ? 8.2 : 10.8;
      else
        this.detailHeigth = dpr <= 2 ? 6.3 : 8.2;
    }
  }
</script>

<style scoped>
  .carditem-component:nth-child(3n) {
      flex: 0 0 100%;
  }
  
</style>

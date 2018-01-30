<template>
  <div class="carditem-component flex-two">
    <div class="song-list-detail" @click="goToMusicList(iteminfo.id)" >
      <img class="song-list-detail-cover" :src="iteminfo.coverImgUrl">
      <div class="flex song-list-detail-listen">
        <div class="song-list-detail-listen-count">
          <i class="iconfont icon icon-disc"></i>
          {{ iteminfo.playCount | transformNumberCount }}
        </div>
      </div>
      <div class="img_creator">
        <i class="iconfont icon icon-personal"></i>
				{{iteminfo.creator.nickname}}
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
      }
    },
    data () {
      return {
        fontSize : 0.1
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
      this.componentWidth = dpr*3.2;
      this.fontSize = dpr*0.3 < 0.75 ? 0.75 : dpr*0.3 ;
    }
  }
</script>

<style scoped>
  .icon-personal,
  .icon-disc{
    font-weight: 600
  }
  .icon-disc{
    font-size: .85rem
  }
  .flex .song-list-component:last-child{
    margin:0!important;
  }
  .song-list-detail {
    position: relative;
    width: 100%;
  }
  .song-list-detail-cover {
    width: 100%;
    height: 100%;
  }
  .song-list-detail-listen {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height:100%;
  }
  .song-list-detail-listen-count {
    position:absolute;
    right:0.05rem;
    top:0.05rem;
    color: #fff;
    padding: 0 0.2rem;
  }
  .song-list-name {
    margin: .05rem 0 .15rem;
    text-align: left;
    padding: 0rem .2rem;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
</style>

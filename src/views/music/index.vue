<template>
  <div class="home-model-component music-list-component">
    <index-banner></index-banner>
    <index-links></index-links>
    <card-title title="推荐歌单" @click="toRouter('OrderList')"></card-title>
    <div class="flex song-list-container">
      <music-card></music-card>
    </div>
    <card-title title="独家放送"></card-title>
    <div class="flex song-list-container">
      <private-card></private-card>
    </div>
    <card-title title="推荐MV"></card-title>
    <div class="flex song-list-container">
      <mv-card></mv-card>
    </div>
    <card-title title="推荐电台" @click="toRouter('DjList')"></card-title>
    <div class="flex song-list-container">
      <dj-card></dj-card>
    </div>
  </div>
</template>

<script>

  import IndexBanner from '../../components/banner/banner'
  import IndexLinks from './links'
  import CardTitle from '../../components/cardtitle/cardtitle'
  import MusicCard from '../../components/musiccard'
  import PrivateCard from '../../components/pricontent/pricardlist'
  import MvCard from '../../components/mvcard/mvcardlist'
  import DjCard from '../../components/djcard'

  export default{
    name : "music",
    components: {
      IndexBanner, IndexLinks, CardTitle, MusicCard, PrivateCard, MvCard, DjCard
    },
    methods : {
      toRouter (routName) {
        this.$router.push( { path : routName } )
      }
    }
  }
</script>

<style scoped>
  .song-list-container,
  .mv-recommend-container,
  .dj-container
  {
    display:flex;
    justify-content: space-between;
    display:-webkit-box;
  }
  .mv-recommend-container:last-child {
    padding-bottom: .25rem;
  }
</style>

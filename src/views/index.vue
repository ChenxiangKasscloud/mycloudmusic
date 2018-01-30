<template>
  <div class="index-component">
    <!-- :class="{'padding-bottom': songMsg.id !== undefined}" -->
    <div class="index-wrap">
      <div class="home-head">
        <home-top></home-top>
        <home-nav></home-nav>
      </div>
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
      <FootBar></FootBar>
    </div>
  </div>
</template>

<script>
  import homeTop from './home/homeTop'
  import homeNav from './home/homeNav'
  import FootBar from '../components/footBar/index'
  // import FooterPlayer from './common/FooterPlayer.vue'
  // import FootBar from './common/footTabBar.vue'

  export default {
    name: 'index',
    data () {
      return {}
    },
    computed: {
      // songMsg () {
      //   return this.$store.state.songMsg
      // }

    },
    components: {
      FootBar, homeTop, homeNav
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .index-component{
    padding-bottom: 55px;
    padding-top: 5.8rem;
  }
  .index-wrap{

  }
  .home-head{
    position: fixed;
    width: 100%;
    top: 0;
    z-index: 2;
  }
</style>

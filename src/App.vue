<template>
  <div id="app" class="body_wrap">
    <keep-alive exclude="AudioPlayer">
      <router-view></router-view>
    </keep-alive>
    <!-- 播放器 -->
    <audio-player></audio-player>
  </div>
</template>

<script>

  // 引入相应组件
  import AudioPlayer from '@/components/audioplayer/audioplayer'

  export default {
    name: 'app',
    components:{
      AudioPlayer
    },
    // 处理app加载前相应事宜
    beforeCreate () {
      // 获取当前设备的像素比
      const DPR = window.devicePixelRatio || 1;
      console.info("DPR",DPR);
      //  获取当前手机分辨率宽度
      this.$store.commit('SETREALWIDTH', document.body.clientWidth * DPR)
      //  动态获取手机的DPR设备像素比，对总体字体大小进行设置
      var viewport = document.querySelector('meta[name="viewport"]')
      var html = document.getElementsByTagName('html')[0]
      var body = document.getElementsByTagName('body')[0]
      //  设置比例
      //html.style.fontSize = 16 * dpr + 'px'
      html.dataset.dpr = DPR
     // body.style.fontSize = 12 * dpr + 'px'
      //viewport.content = 'width=device-width, initial-scale=' + 1 / dpr + ', maximum-scale=' + 1 / dpr + ', minimum-scale=' + 1 / dpr + ', user-scalable=no'
    },
    mounted() {
      let audio = null;
      audio = document.querySelector("#audio");
      this.$store.commit("SETAUDIO",audio)
      window.onscroll = () => {
  			this.$store.commit("SETSCROLL", window.pageYOffset)
  		}
    }

  }
</script>

<style scoped>
  .body_wrap{
    height: 100%;
    /* background: #fff; */
  }
</style>

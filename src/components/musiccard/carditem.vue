<template>
  <div class="carditem-component">
    <div class="song-list-detail" @click="handleClick()" >
      <img class="song-list-detail-cover" :src="iteminfo.picUrl">
      <div class="flex song-list-detail-listen">
        <div class="song-list-detail-listen-count">
          <i class="iconfont icon icon-headset"></i>
          {{ iteminfo.playCount | transformNumberCount }}
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
      handleClick (event) {
        this.$emit('click', event);
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
  .carditem-component {
    margin-right:.01rem;
    margin-bottom:.8rem;
    width: 32.5%;
    font-size: .9rem
  }
</style>

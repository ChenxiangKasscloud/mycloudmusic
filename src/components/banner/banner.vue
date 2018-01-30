<template>
  <div class="index-banner-component">
    <swipe class="my-swipe" :auto="auto" :style="{height:bannerHeight+'rem'}">
      <swipe-item class="slide" v-for="(item, index) in bannerList"  :key="index">
        <img class="slide-img" :src="item.pic">
      </swipe-item>
    </swipe>
  </div>
</template>

<script>
  import { Swipe, SwipeItem } from 'vue-swipe'
  import HOMEAPI from '../../service/api/homeapi.js';
  export default{
    data () {
      return {
        auto: 5000,
        bannerList:[],
        bannerHeight:0
      }
    },
    components: {
      Swipe, SwipeItem
    },
    methods:{
       getBanners(){
        let _this=this;
        HOMEAPI.getBanners().then( (res) => {
          _this.bannerList=res.banners;
        }).catch( (err) => {

        })
       }
    },
    beforeMount(){
      let dpr = document.getElementsByTagName('html')[0].dataset.dpr;
      this.bannerHeight = dpr <= 2 ? 9.5 : 11.5;
    },
    mounted(){
       this.getBanners()
    }
  }
</script>


<style scoped>
  @import "~vue-swipe/dist/vue-swipe.css";
  .my-swipe {
    width: 100%;
  }
  .slide {
    width: 100%;
    height: 100%;
  }
  .slide-img {
    width: 100%;
    height: 100%;
  }
</style>

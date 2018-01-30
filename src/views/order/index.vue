<template>
  <!-- 分类头部 -->
  <div v-cloak class="home-model-component order-list-component"
    v-infinite-scroll="getplaylist"
    infinite-scroll-disabled="stopinfinite"
    infinite-scroll-distance="10">
    <hquality></hquality>
    <!-- 歌单分类 -->
    <template v-if='catelist.length != 0' >
      <div id="plc_header">
        <span @click="showCateList">
          <!-- {{catelist.checked.name}} -->
          全部分类
          <i class="iconfont icon-arrow-right"></i>
        </span>
      </div>
      <!-- 分类列表 -->
      <cate-list v-model="cateVisible"></cate-list>
    </template>
    <!-- 歌曲列表 -->
    <order-list :datalist="playlist" v-show=" playlist.length != 0 "></order-list>
    <!-- 加载等待 -->
    <loading v-if="isloading"></loading>
    <!-- 空数据 -->
    <span v-if=" !isloading && playlist.length == 0 ">暂无数据</span>
  </div>
</template>

<script>
  import { InfiniteScroll } from 'mint-ui'
  import OrderApi from '../../service/api/orderapi.js'
  import Loading from '../../components/widget/loading'
  import Hquality from './highquality'
  import CateList from './cate'
  import OrderList from '../../components/order/orderlist'

  export default{
    name : "order",
    data () {
      return {
        isloading : true,
        playlist : [],
        cateVisible : false,
        LIMIT : 10,
        OFFSET : 0,
        hasmore : true,
        stopinfinite : true,
        cateType : '全部',
        catelist : [],
      }
    },
    components: {
      Loading, Hquality, CateList, OrderList
    },
    activated() {
			this.stopinfinite = this.isloading ? true : false
		},
		deactivated() {
			this.stopinfinite = true
		},
    created () {
      this.getcatelist();
      this.getplaylist();
    },
    methods :{
      // 获取歌曲分类
      getcatelist() {
        OrderApi.getCateList().then( (res) => {
          this.catelist = res.sub;
        }).catch( (err) => {

        })
			},
      // 根据类型获取歌单列表
      getplaylist(  ) {
        this.stopinfinite = true;
        if( this.hasmore ){
          this.isloading = true;
          let params = {
            limit : this.LIMIT,
            offset : this.OFFSET,
            type : this.cateType
          }
          OrderApi.getPlayList ( params ).then( (res) => {
            this.isloading = false;
            this.stopinfinite = false;
            this.OFFSET += this.LIMIT;
            this.playlist = this.playlist.concat(res.playlists);
          }).catch( (err) => {

          })
        }else {
          return ;
        }
			},
      showCateList () {
        this.cateVisible = true;
        console.log("showAllOrders",this.cateVisible)
      }
    }
  }
</script>


<style scoped>
  .flex-boxlist {
    min-height: 500px;
  }
  #plc_header {
    overflow: hidden;
    padding: 1em 2% .5em;
  }
  #plc_header span {
    border: 1px solid #ddd;
    border-radius: 2em;
    line-height: 2;
    padding: 0 .5em 0 1em;
    display: inline-block;
  }
  .icon-arrow-right{
    font-size: .9rem;
    vertical-align: inherit;
  }
</style>

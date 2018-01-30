<template>
    <ul class="index-nav-component tabs flex">
      <router-link v-for="(item, index) in tabs" class="tab-item" :key="index" active-class="tbi-cur" :to="{path:item.routerName}">
        <li @click="goToRouter(item.routerName, index)"  >
          <span :class="{'tab-item-active':index === tabIndex}">{{ item.name }}</span>
        </li>
      </router-link>
      <li class="tab-active" :style="{ 'left' : tabIndex*33.3.toString() + '%' }">
        <div></div>
      </li>
    </ul>
</template>

<script>
  export default{
    data () {
      return {
        tabs: [
          { name: '推荐', routerName: 'RecmdList'},
          { name: '歌单', routerName: 'OrderList'},
          { name: '电台', routerName: 'DjList'},
        ],
        tabIndex: 0, //  默认激活tab索引
      }
    },
    methods: {
      goToRouter (name, index) {
        if (this.tabIndex === index) return
        this.tabIndex = index;
      },
      initNav () {
        this.tabs.map( (tab, index ) => {
          if( tab.routerName == this.$route.name )
            this.tabIndex = index;
        })
      }
    },
    watch: {
      $route() {
        this.initNav();
      }
    },
    created() {
      this.initNav();
    }
  }
</script>

<style scoped>
  li {
    list-style: none;
  }
  .tabs {
    background-color: #feffff;
    position: relative;
    width: 100%;
    z-index: 1;
  }
  .tabs .tab-item {
    font-size: 1rem;
    width: 33.3%;
    color: #666;
    line-height: 2.45rem;
    text-align: center;
    padding: 0 12%;
    transition: .3s all;
    -webkit-tap-highlight-color:transparent;
  }
  .tabs .tab-item span{
    display: block;
  }
  .tabs .tab-active{
    width: 33.3%;
    height: .15rem;
    text-align: center;
    position: absolute;
    bottom: 0;
    left:0;
    padding: 0 12%;
    -webkit-transition: all .3s ease;
    -moz-transition: all .3s ease;
    -ms-transition: all .3s ease;
    -o-transition: all .3s ease;
    transition: all .3s ease;
  }
  .tabs .tab-active div{
    height: 100%;
    background-color: #d33a31;
  }
  .tabs .tab-item .tab-item-active {
    color: #d33a31;
    /* border-bottom-color: #d33a31; */
  }
</style>

<template>
    <ul class="index-nav-component tabs flex">
      <router-link v-for="(item, index) in tabs" class="tab-item" :key="index" active-class="tbi-cur" :to="{path:item.routerName}">
        <li @click="goToRouter(item.routerName, index)"  >
          <span :class="{'tab-item-active':index === tabIndex}">{{ item.name }}</span>
        </li>
      </router-link>
      <li class="tab-active" :style="{ 'left' : (tabIndex*49.5).toString() + '%' }">
        <div></div>
      </li>
    </ul>
</template>

<script>
  export default{
    data () {
      return {
        tabs: [
          { name: '个性推荐', routerName: 'RecmdList'},
          // { name: '歌单', routerName: 'OrderList'},
          { name: '电台之声', routerName: 'DjList'},
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
    color: #666;
    line-height: 2.45rem;
    text-align: center;
    padding: 0 12%;
    transition: .3s all;
    -webkit-tap-highlight-color:transparent;
    flex: 1 0 auto;
  }
  .tabs .tab-item span{
    display: block;
  }
  .tabs .tab-active{
    width: 50%;
    height: .15rem;
    text-align: center;
    position: absolute;
    bottom: 0;
    left: 0;
    padding: 0 18%;
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

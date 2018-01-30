<template>
    <mt-tabbar v-model="selected">
      <mt-tab-item id="tab1" :class="{active:selected=='find_music'}" @click.native="setTab('find_music')">
        <div class="tabIcon">
          <i class="iconfont icon-findmusic"></i>
        </div>
        发现音乐
      </mt-tab-item>
      <mt-tab-item id="tab2" :class="{active:selected=='my_music'}" @click.native="setTab('my_music')">
        <div class="tabIcon">
          <i class="iconfont icon-mymusic"></i>
        </div>
        我的音乐
      </mt-tab-item>
      <mt-tab-item id="tab3" :class="{active:selected=='friends'}" @click.native="setTab('friends')">
        <div class="tabIcon">
          <i class="iconfont icon-friends"></i>
        </div>
        朋友
      </mt-tab-item>
      <mt-tab-item id="tab4" :class="{active:selected=='account'}" @click.native="setTab('account')">
        <div class="tabIcon">
          <i class="iconfont icon-account"></i>
        </div>
         账号
      </mt-tab-item>
    </mt-tabbar>
</template>

<script>
import { Tabbar, TabItem } from 'mint-ui';
import { mapState, mapActions, mapGetters } from 'vuex'
export default{
     data(){
        return{
           isShow:true
        }
     },
     methods:{
        setTab(tab){
          this.$store.dispatch('SET_TABBAR',{
            selected:tab
          })
        }
     },
     computed:{
      ...mapState(['selected'])
     }
}

</script>

<style scoped>
  .mint-tabbar{
    position:fixed;
    z-index: 2;
  }
  .mint-tab-item{
    color: #969696;
  }
  .active{
    color:#d33a31;
  }
  .tabIcon{
    margin-bottom: .4rem;
  }
  .tabIcon .icon-findmusic,
  .tabIcon .icon-account,
  .tabIcon .icon-mymusic,
  .tabIcon .icon-friends{
      font-size: 1.5rem;
  }
  .tabIcon .icon-findmusic:before{
    content: "\e601"
  }
  .tabIcon .icon-mymusic:before{
    content: "\e680"
  }
  .tabIcon .icon-friends:before{
    content: "\e691"
  }
  .tabIcon .icon-account:before{
    content: "\e697"
  }
</style>

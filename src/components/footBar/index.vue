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
          this.$store.commit('SETTABBAR', tab)
        }
     },
     computed:{
      // ...mapState(['selected'])
        selected: {
          get () { return this.$store.state.modelSelected },
          set () { /* 计算属性以函数形式写的时候是只设置了 get 方法，v-model='activeTab' 是一个双向绑定，即既会调用activeTab 的 get 去读取值 ，又会调用其 set 去设置值 */ }
        }
     }
}

</script>

<style scoped>
  .mint-tabbar{
    position:fixed;
    z-index: 9;
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

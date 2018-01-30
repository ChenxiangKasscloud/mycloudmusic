<template>
  <div class="home-model-component dj-list-component">
    <index-banner></index-banner>
    <!-- 分类入口 -->
    <center-link></center-link>
    <!-- DJ分类列表 -->
    <card-title title="个性推荐"></card-title>
    <div class="flex song-list-container">
      <dj-card></dj-card>
    </div>
    <card-title title="脱口秀"></card-title>
    <div class="flex song-list-container" v-if="talkshowlist.length!=0">
      <i-card :datalist="talkshowlist" :showht="false"></i-card>
    </div>
    <card-title title="有声书"></card-title>
    <div class="flex song-list-container" v-if="voicebooklist.length!=0">
      <i-card :datalist="voicebooklist" :showht="false"></i-card>
    </div>
    <card-title title="创作 | 翻唱"></card-title>
    <div class="flex song-list-container" v-if="crtcoverlist.length!=0">
      <i-card :datalist="crtcoverlist" :showht="false"></i-card>
    </div>
    <card-title title="音乐故事"></card-title>
    <div class="flex song-list-container" v-if="musicstorylist.length!=0">
      <i-card :datalist="musicstorylist" :showht="false"></i-card>
    </div>
    <card-title title="情感调频"></card-title>
    <div class="flex song-list-container" v-if="emotionlist.length!=0">
      <i-card :datalist="emotionlist" :showht="false"></i-card>
    </div>
    <card-title title="人文历史"></card-title>
    <div class="flex song-list-container" v-if="humhislist.length!=0">
      <i-card :datalist="humhislist" :showht="false"></i-card>
    </div>
  </div>
</template>

<script>
  import DJAPI from '../../service/api/djapi.js';
  import IndexBanner from '../../components/banner/banner'
  import CardTitle from '../../components/cardtitle/cardtitle'
  import CenterLink from './centerlink'
  import DjCard from '../../components/djcard'
  import ICard from '../../components/icard'

  export default{
    name : "dj",
    data () {
      return {
        talkshowlist : [],     // 脱口秀
        voicebooklist : [],    // 有声书
        crtcoverlist : [],     // 创作翻唱
        musicstorylist : [],    // 音乐故事
        emotionlist : [],      // 情感调频
        humhislist  : []       // 人文历史
      }
    },
    components: {
      IndexBanner, CardTitle, DjCard, CenterLink, ICard
    },
    created () {
      this.getTalkShow();
      this.getVoiceBooks();
      this.getMusicStorys();
      this.getCrtCovers();
      this.getEmotions();
      this.getHumHistorys();
    },
    methods : {
      // 获取电台分类节目
      getDjRecommends (type) {
        return new Promise ( (resolve ,reject) => {
          let params = {
            type : type
          }
          DJAPI.getRecommendDjs(params).then( (res) => {
            let resolveArray = [];
            res.djRadios.map( (radio) => {
              let obj = {
                name : radio.name,
                nickname : radio.dj.nickname ,
                id : radio.id,
                desc : radio.desc,
                category : radio.category,
                categoryId : radio.categoryId,
                picUrl : radio.picUrl,
                playCount : radio.subCount,
              }
              resolveArray.push(obj);
            })
            resolve(resolveArray)
          }).catch( (err) => {

          })
        })
      },
      // 获取脱口秀节目
      getTalkShow () {
        this.getDjRecommends('5').then( (res) => {
          this.talkshowlist = res;
        })
      },
      // 获取有声书节目
      getVoiceBooks () {
        this.getDjRecommends('10001').then( (res) => {
          this.voicebooklist = res;
        })
      },
      // 获取音乐故事节目
      getMusicStorys () {
        this.getDjRecommends('2').then( (res) => {
          this.musicstorylist = res;
        })
      },
      // 获取创作翻唱节目
      getCrtCovers () {
        this.getDjRecommends('2001').then( (res) => {
          this.crtcoverlist = res;
        })
      },
      // 获取情感调频节目
      getEmotions () {
        this.getDjRecommends('3').then( (res) => {
          this.emotionlist = res;
        })
      },
      // 获取人文历史节目
      getHumHistorys () {
        this.getDjRecommends('11').then( (res) => {
          this.humhislist = res;
        })
      }
    }
  }
</script>
、

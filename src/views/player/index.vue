<template>
    <div
      :class=" 'playingpage' + ( playing ? ' playing' : '' )">
  		<mt-header fixed :title="(music.name||''+' - '+(music.ar||music.artists||[])[0].name)">
  			<mt-button slot="left" @click="$router.go(-1)" icon="back"></mt-button>
  		</mt-header>
      <div
        id="playing-bg"
        class="anim_fade_image blurbg"
        :style="{'background-image':'url('+(cover||(music.al||music.album||{}).picUrl)+'?param=500y500)'}">
      </div>
      <div class="playing-zz" v-show="!showlrc" @click="showlrc=!showlrc">
    		<img src="../../assets/img/aag.png" />
    	</div>
      <div class="playing-main" v-show="!showlrc" @click="showlrc=!showlrc">
        <div class="playing-disc">
          <div class="playing-turn">
            <img v-show="!playing" class="playingmainbg" src="../../assets/img/play.png" />
            <div
              v-show="playing"
              :style="{'background-image':'url('+(cover||(music.al||music.album||{}).picUrl)+'?param=200y200)'}"
              bindtap="loadlrc"
              class="pmaincover">
            </div>
          </div>
        </div>
    		
    	</div>
      <!-- 歌词 -->
    	<div id="lrclist" class="playing-lyric" @click="showlrc=!showlrc">
    		<Lrc :lrc="lrcObj" :showlrc="showlrc" lrcindex="1"></Lrc>
    	</div>
      <!-- 歌曲属性 -->
      <div class="playing-actwrap">
  			<div class="playing-info" v-show="!showlrc">
  				<div class="pi-act" @click="favorite">
  					<img v-if='!!star' src="../../assets/img/cm2_play_icn_loved@2x.png" />
            <img v-else src="../../assets/img/cm2_play_icn_love@2x.png" />
  				</div>
  				<div class="pi-act" bindtap="downmusic">
  					<img src="../../assets/img/cm2_play_icn_dld@2x.png" />
  				</div>
  				<div class="pi-act commentscount">
  					<router-link :to="{name:'comment',params:{id:music.id},query:{ctype:2}}">
  						<img v-if="!commentscount" src="../../assets/img/cm2_play_icn_cmt@2x.png" />
  						<img v-if="commentscount" src="../../assets/img/cm2_play_icn_cmt_num@2x.png" />
  						<span v-if="commentscount">{{commentscount>999?'999+':commentscount}}</span>
  					</router-link>
  				</div>
  				<div class="pi-act" @click="pop_tg=1">
  					<img src="../../assets/img/cm2_play_icn_more@2x.png" />
  				</div>
  			</div>
        <!-- 播放器进度条 -->
  			<playing-bar  v-on:change="change" :duration="music.dt"></playing-bar>
        <!-- 播放器控制台 -->
  			<div class="playingaction">
  				<div class="pa-saction" @click="changePlayType">
  					<img v-if='playtype==1' src="../../assets/img/cm2_icn_loop@2x.png" />
            <img v-if='playtype==2' src="../../assets/img/cm2_icn_one@2x.png" />
            <img v-if='playtype==3' src="../../assets/img/cm2_icn_shuffle@2x.png" />
  				</div>
  				<div class="pa-maction" @click="prev" bindtap="playother">
  					<img src="../../assets/img/ajh.png" />
  				</div>
  				<div class="pa-baction" @click="playingtoggle">
            <img v-if='playing' class='pa-playing' src="../../assets/img/ajd.png"/>
  					<img v-else class='pa-playing' src="../../assets/img/ajf.png" />
  				</div>
  				<div class="pa-maction" @click="next">
  					<img src="../../assets/img/ajb.png" />
  				</div>
  				<div class="pa-saction" @click="pop_tg=3">
  					<img src="../../assets/img/cm2_icn_list@2x.png" />
  				</div>
  			</div>
  		</div>
    </div>
</template>

<script>

  import { mapState,mapMutations} from 'vuex';
  import PlayerApi from '../../service/api/playerapi.js'
  import Lrc from '@/components/lrc/lrc';
  import PlayingBar from '@/components/playingbar/index'
  import u from '@/utils.js'

  export default{
    name : 'player',
    data( ){
      return{
        isloading: true,
				id: 0,
				showlrc: false,
				cover: "",
        pop_tg: 0,
        lrcObj:{lrc: [{}]}
      }
    },
    components : {
      Lrc,PlayingBar
    },
    created() {
      this.initPlayer()
    },
    computed : {
      star () {
				//歌曲红心状态
				if(!this.music.id) return 0;
				return this.favorites.indexOf(this.music.id) + 1
			},
      ...mapState([
				'playing',
				'music',
				'audiotype',
				'favorites',
				// 'lrcObj',
				'commentscount',
				// 'list_am',
				'playurl',
				'playtype',
				// 'bgmchange',
				// 'uplaylist',
				// 'index_am'
			])
    },
    methods: {
      // 加载歌词
      loadLrc( id ) {
				if( !!id ){
          let params = {
            id : id
          }
          PlayerApi.getLrc(params).then( (res) => {
            let lrc = u.parse_lrc(res.lrc && res.lrc.lyric ? res.lrc.lyric : '');
            let tlrc = u.parse_lrc(res.tlyric && res.tlyric.lyric ? res.tlyric.lyric : '');
            tlrc = tlrc.now_lrc;
            if(tlrc.length) {
              lrc.now_lrc.map((v, i) => {
                tlrc.forEach(k => {
                  if(k.lrc_sec == v.lrc_sec) {
                    v.tlrc = k.lrc == v.lrc ? '' : k.lrc
                  }
                })
                return v
              })
            }
            res.lrc = lrc.now_lrc;
            res.scroll = lrc.scroll ? 1 : 0;
            this.lrcObj = res;
          }).catch( (err) =>{})
        }
			},
      // 获取评论信息
      getcommentinfo() {
        let params = {
          id : this.music.id,
          limit : 1,
          offset : 0
        }
				PlayerApi.getComments(params).then(res => {
					this.$store.commit('SETCOMMENTSCOUNT', res.total);
				})
			},
      // 获取音乐播放地址
      getMusicPlayUrls (id) {
        return new Promise( (resolve,reject) => {
          let params = { id : id }
          PlayerApi.getPlayUrls(params).then( (res) => {
            this.$store.commit('SETPLAYING',true)
            resolve(res.data[0].url)
          }).catch()
        })
      },
      // 初始化音乐数据
      initMusic() {
        if(!this.music.id || this.audiotype != 1) return;
        // 是否显示歌词
				this.showlrc && this.loadLrc(this.music.id);
				this.$store.commit("INITMUSIC");
      },
      // 初始化播放器
      initPlayer () {
        this.initMusic();
				this.cover = "";
        this.getcommentinfo()
        this.getMusicPlayUrls(this.music.id).then( (res) =>{
          this.$store.commit('SETPLAYURL',res);
        })
      },
      // 喜欢收藏
      favorite () {

      },
      // 切换播放类型
      changePlayType (){
        let type = 1;
        if( this.playtype < 3 )
          type = this.playtype + 1;
        this.$store.commit('SETPLAYTYPE',type)
      },
      // 上一首
      prev () {
        this.$store.dispatch('toPrevAudio')
      },
      // 下一首
      next (){
        this.$store.dispatch('toNextAudio',true)
      },
      // 改变播放状态
      playingtoggle () {
        this.playing ? this.$store.commit('SETPLAYING',false) : this.$store.commit('SETPLAYING',true);
      },
      // change
      change () {

      }
    },
    watch : {
      music() {
        this.initMusic();
				if(!this.playurl) {
					this.cover = "";
          this.getcommentinfo()
          this.getMusicPlayUrls(this.music.id).then( (res) =>{
            console.info("getPlayUrls",res)
            this.$store.commit('SETPLAYURL',res);
          })
				}
				(this.$route.name == 'Player')  && this.$router.replace({
  				name: 'Player',
  				params: {
  					id: this.music.id,
            img: this.cover || ( this.music.al || this.music.album || {} ).picUrl
  				}
				})
      },
      showlrc(value) {
				if(value && !this.lrcObj.code) {
					this.loadLrc(this.music.id)
				}
			}
    },
    mounted( ) {
    }
  }
</script>

<style scoped>
  .playingpage {
  	background: url('../../assets/img/default_player_bg.jpg') center top no-repeat;
  	-webkit-background-size: 100% auto;
  	background-size: 100% auto;
    height: 100%;
    overflow: hidden;
    position: relative;
  }
  .mint-header {
    background: transparent;
    border-bottom: 0.02rem solid rgba(255, 255, 255, .2);
  }
  .playing-zz {
  	text-align: center;
  	position: absolute;
  	z-index: 20;
  	width: 100%;
  	top: 40px;
  	overflow: hidden;
  }
  .playing-lyric {
    height: 100%;
    overflow: hidden;
    padding: 40px 0 100px 0;
  }
  .playing-lyric:before{
		content: "";
	}
	.playing-lyric:after{
		content: "";
	}
  .playing-zz img {
  	width: 27.5%;
  	margin-top: -8%;
  	margin-left: 10%;
  	margin-bottom: 30px;
  	transform: rotate(-30deg);
  	transform-origin: 26% 17%;
  	transition: all linear .5s;
  }
  .playing-main {
    /* margin: 0 auto; */
    /* position: relative; */
    /* top: 17%; */
    padding-top: 7.142857rem;
  	z-index: 10;
    /* width: 22rem; */
  	/* animation-delay: .5s;
  	animation: circle 20s linear infinite;
  	animation-play-state: paused; */
  }
  .playing-disc{
    position: relative;
    margin: 0 auto;
    width: 17.714286rem;
    height: 17.714286rem;
  }
  .playing-turn{
    width: 100%;
    height: 100%;
  }
  .playing-turn:before {
    content: " ";
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 2;
    background: url(http://s3.music.126.net/m/s/img/disc.png?d3bdd1080a72129346aa0b4b4964b75f) no-repeat;
    background-size: contain;
  }
  @keyframes circle {
  	0% {
  		transform: rotate(0deg);
  	}
  	100% {
  		transform: rotate(360deg);
  	}
  }
  .playing .playing-zz img {
  	transform: rotate(-0deg);
  }
  .playingmainbg {
    width: 92%;
    position: relative;
    z-index: 1;
    height: 92%;
    left: 4%;
    top: 4%;
  }
  .pmaincover {
  	position: absolute;
  	width: 64%;
  	left: 18%;
  	top: 18%;
  	z-index: 3;
  	height: 0;
  	padding-top: 64%;
  	border-radius: 50%;
  	overflow: hidden;
  	background-size: 100% 100%;
    animation-delay: .5s;
  	animation: circle 20s linear infinite;
  	animation-play-state: paused;
  }
  .playing .pmaincover {
  	animation-play-state: running !important;
  }
  .playing-actwrap {
  	position: absolute;
  	left: 0;
  	bottom: 0;
  	width: 100%;
  	box-sizing: border-box;
  	overflow: hidden;
  	z-index: 10;
  }
  .playing-info {
  	display: flex;
  	margin: 0 5%;
  }
  .playingaction {
  	display: flex;
  	margin-bottom: 3%;
  }
  .pi-act {
  	flex: 1;
  	text-align: center;
  	position: relative;
  }
  .pi-act img {
  	width: 50%;
  	/* max-width: ; */
  }
  .pa-baction,
  .pa-maction,
  .pa-saction {
  	flex: 1;
  	text-align: center;
  	width: 100%
  }
  .pa-baction img {
  	width: 65%;
  }
  .pa-maction img {
  	width: 45%;
  	margin-top: 8%
  }
  .pa-saction img {
    width: 55%;
    margin-top: .25em;
  }
  .commentscount span {
  	position: absolute;
  	font-size: .8em;
  	left: 50%;
  	top: 50%;
  	margin-left: .5em;
  	margin-top: -1.5em;
  	color: #fff;
  }
  .blurbg{
    z-index: 0;
    height: 100%;
    padding: 0;
    background-position: center center;
    background-size: auto 100%;
  }
  @media screen and (min-width: 360px){
    .playing-main {
      padding-top: 110px;
    }
    .playing-disc{
      width: 21.142857rem;
      height: 21.142857rem;
    }
    .playing-turn:before {
      background-image: url(http://s3.music.126.net/m/s/img/disc-ip6.png?69796123ad7cfe95781ea38aac8f2d48);
    }
  }
  @media screen and (min-width: 414px){
    .playing-main {
        padding-top: 120px;
    }
    .playing-disc{
      width: 24.428571rem;
      height: 24.428571rem;
    }
    .playing-turn:before{
      background-image: url(//s3.music.126.net/m/s/img/disc-plus.png?b700b62e1971b351dcb8b8ce1c9ceea3);
    }
  }
</style>

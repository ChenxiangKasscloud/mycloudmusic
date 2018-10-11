<template>
	<div :class="(!showlrc?'playinghidden':'plyaing')" >
		<div class="lrcwrap" v-show="lrc" :style="{'transform':'translateY('+(-lrcindex*100/(lrc.lrc.length+6) )+'%)', 'font-size': phoneInfo.DPR >= 3 ? '18px' : '15px' }">
			<div v-if="lrc.nolyric" class="notext">纯音乐，请欣赏</div>
			<div v-if="lrc.scroll&&!lrc.nolyric&&!lrc.uncollected" class="notext">*歌词不支持滚动*</div>
			<div v-if="lrc.uncollected" class="notext">暂无歌词</div>
			<div v-for="(item,idx) in lrc.lrc" :key="idx" :data-t="item.lrc_sec" :class="((idx==lrcindex)&&!lrc.scroll?'lrcur':'')">
				<span :style="{'font-size': phoneInfo.DPR >= 3 ? '18px' : '15px' }" >{{item.lrc}}<br/>{{item.tlrc}}</span>
			</div>
		</div>
		<Loading text="歌词加载中..." v-show="lrc.code!=200"></Loading>
		<div class="cnloading" v-show="lrc.code&&(lrc.code!=200)">加载出错了</div>
	</div>
</template>

<script>
	import { mapState} from 'vuex'
	import Loading from "@/components/widget/loading"
	export default {
		name: 'lrc',
		components: {
			Loading
		},
		data() {
			return {
				lrcindex: 0,
				overHeight: 8
			}
		},
		props: {
			lrc: Object,
			showlrc: Boolean
		},
		watch: {
			playtime(v) {
				if(!this.lrc.lrc) return;
				v = Math.floor(v / 1e3);
				this.lrcindex = 0;
				for(let i = 0; i < this.lrc.lrc.length; i++) {
					if(v >= this.lrc.lrc[i].lrc_sec) {
						this.lrcindex = i
					}
				}
			}
		},
		computed: {
			...mapState([
				'musicloading',
				'playtime',
				'phoneInfo'
			])
		}
	}
</script>

<style scoped>
	.plyaing{
		height: 100%;
		overflow: hidden;	
	}
	.playinghidden{
		display: none;
	}
  .lrcwrap {
    top: 45%;
    width: 100%;
    transition: all ease 1s;
    text-align: center;
		color: #e0e0e0;
    padding: 0 0 14.4em 0;
		position: relative;
		min-height: 100%;
  }
  .lrcwrap .lrcur {
    opacity: 1;
		transition: all ease 1s;
		color: #fff;
  }

  .lrcwrap .siblings1 {
    opacity: .3
  }

  .lrcwrap .siblings2 {
    opacity: .1;
  }

  .lrcwrap div {
    line-height: 1.2;
    word-break: break-word;
    opacity: .5;
    min-height: 2.4em;
    /* overflow: hidden; */
    transition: all ease .5s;
    display: flex;
    align-items: center;
    width: 100%;
    text-align: center;
		margin-bottom: .714286rem;
  }

  .lrcwrap .notext {
    text-align: center;
    display: block;
		color: #fff;
		opacity: .8;
  }

  .lrcwrap div span {
    display: block;
    text-align: center;
    width: 100%
  }
</style>

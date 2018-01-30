<template>
	<div :class="(!showlrc?'playinghidden':'')" >
		<div class="lrcwrap" v-show="lrc" :style="{'transform':'translateY('+(-lrcindex*100/(lrc.lrc.length+6))+'%)'}">
			<div v-if="lrc.nolyric" class="notext">纯音乐，无歌词</div>
			<div v-if="lrc.scroll&&!lrc.nolyric&&!lrc.uncollected" class="notext">*歌词不支持滚动*</div>
			<div v-if="lrc.uncollected" class="notext">暂无歌词</div>
			<div v-for="(item,idx) in lrc.lrc" :key="(item.lrc_sec||idx)" :data-t="item.lrc_sec" :class="((idx==lrcindex)&&!lrc.scroll?'lrcur':'')">
				<span>{{item.lrc}}</span>
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
				lrcindex: 0
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
				'playtime'
			])
		}
	}
</script>

<style scoped>
  .lrcwrap {
    top: 50%;
    position: absolute;
    width: 100%;
    transition: all ease 1s;
    text-align: center;
    padding-bottom: 14.4em;
  }

  .lrcwrap .lrcur {
    opacity: 1;
    transition: all ease 1s;
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
    height: 2.4em;
    overflow: hidden;
    transition: all ease .5s;
    display: flex;
    align-items: center;
    width: 100%;
    text-align: center
  }

  .lrcwrap .notext {
    text-align: center;
    display: block
  }

  .lrcwrap div span {
    display: block;
    text-align: center;
    width: 100%
  }
</style>

<template>
		<audio
			:src='playurl'
      @timeupdate="playingtime"
      @error="onerror"
      @waiting="SETWAITING"
      @ended="toNextAudio"
      @canplay="SETPLAYING(true)"
      id="audio">
    </audio>
</template>
<script>
	import { mapState,mapMutations,mapActions } from 'vuex';
	export default {
		name: 'audioPlayer',
		methods: {
			playingtime(e) {
				this.$store.commit("SETPLAYTIME", this.AUDIO.currentTime*1000);
			},
			onerror(e) {
				//出错再重新请求一次
				//this.playurl && this.$store.dispatch('only_murl'), console.log("music loading error", e);
			},
			...mapActions([
				'toNextAudio'
			]),
			...mapMutations([
				'SETPLAYING',
				'SETWAITING'
			])
		},
		watch : {
			playurl(){
				console.info("this.$store.state.playurl",this.$store.state.playurl)
			}
		},
		computed: {
			...mapState([
				'playurl',
				'music',
				'playtype',
				'AUDIO'
			])
		}
	}
</script>

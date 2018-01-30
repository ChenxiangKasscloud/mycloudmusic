<template>
	<router-link
    id="playicon"
    v-if="music.id"
    :class="(!playing ? 'playingicon':'') +' cntloading'"
    :to="{'name':((playtype==1)?'Player':(playtype==2?'fm':'program')),params:{id:music.id,img:music.pic_str||music.pic||''} }">
		<span class="cl1"></span>
		<span class="cl2"></span>
		<span class="cl3"></span>
		<span class="cl4"></span>
	</router-link>
</template>

<script>
	import { mapState } from 'vuex'
	export default {
		name: 'playicon',
		computed: {
			...mapState([
				'music',
				'playtype',
				'playing'
			])
		},
    watch : {
      playing () {
        console.info("this.playing",this.playing)
      }
    }
	}
</script>

<style scoped>
	.cntloading {
		position: relative;
		display: inline-block;
		height: 1.2em;
		overflow: hidden;
		padding: 0;
	}
	.cntloading span {
		background-color: #fff;
		margin-left: 4px;
		float: left;
		height: 100%;
		transform: translateY(40%);
	}
	.cntloading span.cl2 {
		animation-delay: -.6s !important;
		transform: translateY(0%);
	}
	.cntloading span.cl4 {
		animation-delay: -.3s !important;
		transform: translateY(20%);
	}
	.cntloading span.cl3 {
		animation-delay: 0s !important;
		transform: translateY(50%);
	}
	.playingicon span {
		animation: none;
	}
	.whiteBg .cntloading{
		position: relative;
		top: .45em;
	}
	.whiteBg .cntloading span{
		background-color: #676767;
	}
</style>

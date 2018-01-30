<template>
	<div class="playing-status">
		<div>{{playtime|time}}</div>
		<slider :value="playtime" :min="0" :max="duration"  @change="seekmusic"></slider>
		<div>{{duration|time}}</div>
	</div>
</template>

<script>
	import { mapState } from 'vuex';
	import slider from "@/components/widget/slider"
	export default {
		name: 'playingbar',
		props: {
			duration: {
				type: Number,
				default: 0
			}
		},
		components: {
			slider
		},
		methods: {
			seekmusic(v) {
				this.AUDIO.currentTime = v / 1000
			}
		},
		filters: {
			time(v) {
				v = new Date(v);
        return ( v.getMinutes() > 9 ? v.getMinutes() : ('0' + v.getMinutes()) ) + ':' + (v.getSeconds() > 9 ? v.getSeconds() : ('0' + v.getSeconds()))
			}
		},
		computed: {
      // 问题：新版vuex中使用v-model双向绑定会提示setter的错误
      // 优化方法：使用 :value 代替v-model实现双向绑定
			...mapState([
        'AUDIO',
        'playtime'
			])
		}
	}
</script>

<style>
	.playing-status {
		color: #fff;
		font-size: .8em;
		padding: .5em 1em;
		display: flex;
		align-items:center
	}
	.mu-slider{
    margin: 0 1em;
  }

</style>

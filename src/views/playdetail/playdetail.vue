<template>
	<div ref="detailBox">
		<div class="header-topBox">
			<div class="blurbg" :style="{'background-image':'url('+cover+')','top':-st+'px'}"></div>
		</div>
		<mt-header fixed :title="(title || list.playlist.name)">
			<mt-button slot="left" @click="$router.go(-1)" icon="back"></mt-button>
			<play-icon slot="right"></play-icon>
		</mt-header>
		<div class="plist-header" ref="main">
			<div class="blurbg" :style="{'background-image':'url('+cover+')'}"></div>
			<div class="plh-main">
				<div class="plh-cover">
					<div class="hqico cover_ico" v-if="list.playlist.highQuality"></div>
					<img class="music_cover" :src="cover" />
					<div class="img_playcount" v-if="list.playlist.playCount">
						<i class="iconfont icon icon-headset"></i>
						{{ list.playlist.playCount | transformNumberCount }}
					</div>
					<div class="plh-playinfo">
						<img src="../../assets/img/cm2_list_detail_icn_infor@2x.png" />
					</div>
				</div>
				<div class="plh-cnt">
					<span ref="palyname" class="music_h_name">
						{{ name || list.playlist.name}}
					</span>
					<div>
						<img class="user_ava" :src="list.playlist.creator.avatarUrl" />
						<router-link :to="{name:'user',params:{id:list.playlist.creator.userId}}">
							{{list.playlist.creator.nickname||" "}}
						</router-link>
						<i class="iconfont icon icon-arrow-right"></i>
					</div>
				</div>
			</div>
			<div ref="playAction" class="plh_action">
				<div>
					<img src="../../assets/img/cm2_list_detail_icn_fav_new@2x.png" v-if="!list.playlist.subscribed" />
					<img src="../../assets/img/cm2_list_detail_icn_faved@2x.png" v-if="list.playlist.subscribed" />
					<span>{{list.playlist.subscribedCount||'收藏'}}</span>
				</div>
				<div>
					<router-link :to="{name:'comment',params:{id:list.playlist.commentThreadId||0}}">
						<img src="../../assets/img/cm2_list_detail_icn_cmt@2x.png" />
						<span>{{list.playlist.commentCount||'评论'}}</span>
					</router-link>
				</div>
				<div>
					<img src="../../assets/img/cm2_list_detail_icn_share@2x.png" />
					<span>{{list.playlist.shareCount||'分享'}}</span>
				</div>
			</div>
		</div>
		<div class="plist-detail">
			<div v-if="!isloading">
				<div @click="playall" :class=" 'playall flexlist flex-center ' + ( affixed ? 'affixed' : '' ) ">
					<div class="flexleft flexnum ">
						<img src="../../assets/img/pl-playall.png" />
					</div>
					<div class="flexlist">
						<span class="pa-count">
							播放全部
							<span style="color:#9a9a9a"> ( 共{{list.playlist.trackCount}}首 )</span>
						</span>
					</div>
				</div>
				<song-list
					:list="list.playlist.tracks"
					v-on:playindex="playindex"
					:toplist="istoptype"
					:curplay="music.id"
					:trackids="list.playlist.trackIds">
				</song-list>
			</div>
			<Loading v-else></Loading>
		</div>
	</div>
</template>

<script>
	import {mapState } from 'vuex'
	import PdApi from '../../service/api/pdetailapi.js';
	import Loading from "@/components/widget/loading"
	import PlayIcon from "@/components/playicon/index"
	import SongList from "./songlist";
	export default {
		name: 'playdetail',
		data() {
			return {
				cover: '',
				list: {
					playlist: {
						creator: {}
					},
				},
				istoptype: "0",
				opacity: 0,
				name: '',
				id: -1,
				isloading: true,
				canplay: []
			}
		},
		components: {
			SongList,
			Loading,
			PlayIcon
		},
		beforeRouteEnter: (to, from, next) => {
			next(vm => {
				if(parseInt(to.params.id) !== parseInt(vm.id)) {
					vm.name = "";
					vm.loaded = false;
					vm.cover = "";
					vm.canplay=[];
					vm.list = {
						playlist: {
							creator: {}
						}
					};
          vm.loadpl();
				}
			})
		},
		methods: {
			loadpl() {
				this.cover = this.$route.params.img;
				let desc = this.$route.params.desc;
				this.name = desc;
				this.id = this.$route.params.id;
				// this.istoptype = this.$route.query.istop;
				// img && (this.cover = bs64.id2Url(img));
				let params = {
					id : this.id,
				}
				PdApi.getPlayDetail(params).then(res => {
					console.info("getSListDetail",res)
					this.isloading = false;
					let canplay = res.playlist.tracks.map(item => {
						if(item.st >= 0) return item;
					});
					this.canplay = this.canplay.concat(canplay);
					this.cover = this.cover || res.playlist.coverImgUrl;
					this.list = res;
				});
			},
			// 播放单曲
			playindex(i){
				this.$store.commit("SETAUDIOTYPE",1);
				this.$store.commit("SETPLAYLIST",this.canplay);
				this.$store.commit("SETPLAYINDEX",i);
			},
			// 播放全部
			playall(){
				// this.playindex(0);
				// this.$store.dispatch("only_murl");
				// api.comments(this.music.id, 0, 2).then(res => {
				// 	this.$store.commit('commentscount', res.data.total);
				// })
			}
		},
		computed: {
			title(){
				return this.scrolltop > 100 ? '' : '歌单';
			},
			st(){
				let main = this.$refs.main;
				main = main ? main.getBoundingClientRect().height : 0;
				return this.scrolltop > main ? main : this.scrolltop
			},
			affixed (){
				if( this.scrolltop > 0 ){
					if( this.$refs.playAction.getBoundingClientRect().top <= 0 )
						return true;
					else
						return false;
				}
			},
			...mapState([
				"scrolltop",
				"music"
			])
		}
	}
</script>

<style scoped>
	.mint-header {
		background: transparent;
		height: 50px;
		z-index: 6;
	}
	.blurbg {
		background-color: #eee
	}
	.flexlist .flexlist{
    	border-bottom: 0.06rem solid #eaeaea;
	}
	.icon-arrow-right{
		color: #ccc;
		font-size: 1.2em;
	}
	.pa-count{
		font-size: 1.1em;
	}
	.affixed{
		top: 50px;
		position: fixed;
		width: 100%;
		z-index: 6;
		background-color: #fff;
	    border-bottom: 0.06rem solid #eaeaea;
	}
	.affixed .flexlist{
    border-bottom: none;
	}
</style>

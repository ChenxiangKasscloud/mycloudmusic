<template>
	<div class="songs">
		<router-link v-for="(re,index) in list"
			:key="re.id"
			:to="{name: 'Player',params:{id:re.id, img: re.al.picUrl || re.al.pic_str}}"
			@click.native="playindex(index)"
			:class="'flexlist flex-center '+(re.id===curplay?'cur ':' ')+(toplist==1?'istop':'')+(nonum=='a'?'':'ml')">
			<div class="flexleft flexnum " v-if="nonum=='a'">
				<div v-if="re.id===curplay">
					<img src="../../assets/img/aal.png" alt="">
				</div>
				<div v-else>
					<span :class="(toplist&&index<3?'topindex':'')">{{index+1}}</span>
					<div v-if="toplist==1">
						<div class="ftp" v-if="trackids[index].ratio">
							<img src="../../assets/img/xv.png" />{{trackids[index].ratio}}%</div>
						<div class="ftp" v-if="!trackids[index].ratio&&trackids[index].v">
							<img src="../../assets/img/wu.png" v-if="index>trackids[index].v" />
							<img src="../../assets/img/xu.png" v-if="trackids[index].v>index" />
							<img src="../../assets/img/xr.png" v-if="trackids[index].v==index" />
							<span>{{(trackids[index].v>index)?(trackids[index].v-index):(index-trackids[index].v)}}</span>
						</div>
						<div class="ftp" v-if="!trackids[index].ratio&&!trackids[index].v">
							<img src="../../assets/img/xy.png" class="tpnew" />
						</div>
					</div>
				</div>
			</div>
			<div class="flexlist">
				<div class="flexleft " v-if="re.id===curplay&&nonum!='a'">
					<div>
						<img src="../../assets/img/aal.png" alt="">
					</div>
				</div>
				<div class="flexmain">
					<div class="song-title">
            {{re.name}}
            <span v-if="re.alia.length">（{{...re.alia}}）</span>
          </div>
					<div class="relistdes">{{re.ar[0].name}} - {{re.al.name}}</div>
				</div>
				<div class="flexact">
					<router-link :to="{name:'',params:{id:re.mv}}" class="fa_list fa_mv" v-if="re.mv!=0">
						<img src="../../assets/img/l0.png" />
					</router-link>
					<div class="fa_list">
						<img src="../../assets/img/cm2_list_btn_more@2x.png" />
					</div>
				</div>
			</div>
		</router-link>
	</div>
</template>

<script>
	export default {
		name: 'songlist',
		props: {
			list: Array,
			privileges: Array,
			toplist: {
				type: String,
				default: ''
			},
			nonum: {
				type: String,
				default: 'a'
			},
			trackids: Array,
			curplay: {
				type: Number,
				default: -1
			}
		},
    created() {
    },
		methods: {
			playindex(index) {
				// this.$store.commit("setbgmchange", false)
				this.$emit("playindex", index)
			}
		}
	}
</script>

<style scoped>
  .songs a:hover{
    color: inherit;
  }
	.flexnum img {
		width: 1.3em
	}
	.topindex {
		color: #BB2C08;
	}
	.ftp {
		font-size: .5em;
		font-weight: lighter;
	}
	.ftp img {
		height: .8em;
		width: auto;
	}
  .flexlist .flexlist{
    border-bottom: 0.06rem solid #eaeaea;
	}
  .song-title{
    font-size: 1.1em;
  }
</style>

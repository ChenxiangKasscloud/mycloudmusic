<template>
  <div class="carditem-component">
    <div class="song-list-detail" @click="onClick" >
      <img class="song-list-detail-cover" :src="iteminfo.picUrl">
      <div class="flex song-list-detail-listen">
        <div class="song-list-detail-listen-count" v-if="showvisiable && iteminfo.playCount!=undefined ">
          <i :class=" 'iconfont icon ' + htIconClass "></i>
          {{ iteminfo.playCount | transformNumberCount }}
        </div>
      </div>
      <div class="img_creator">
				{{iteminfo.nickname}}
			</div>
    </div>
    <p class="song-list-name">{{ iteminfo.desc }}</p>
  </div>
</template>

<script>
  import HOMEAPI from '../../service/api/homeapi.js';

  export default{
    name:"icarditem",
    props: {
      iteminfo : {
        type : Object,
        required : true
      },
      showvisiable : {
        type : Boolean,
        default : true
      },
      icontype : {
        type : String,
        default : 'audio'
      }
    },
    data () {
      return {
        fontSize : 0.1
      }
    },
    computed: {
      phoneResolutionWidth () {
        return this.$store.state.phoneResolutionWidth
      },
      htIconClass () {
        let htclass = this.icontype == 'audio' ? "icon-headset" :
                      this.icontype == 'video' ? "icon-mv" : '';
        return htclass
      }
    },
    methods: {
      onClick () {
        this.$emit('click', event);
      }
    },
    beforeMount () {
      let dpr = document.getElementsByTagName('html')[0].dataset.dpr;
      this.componentWidth = dpr*3.2;
      this.fontSize = dpr*0.3 < 0.75 ? 0.75 : dpr*0.3 ;
    }
  }
</script>

<style scoped>

</style>

<template>
  <div class="home-model-component dj-list-component">
    <i-card :datalist="djrecommends" :cellcount="2" :showht="false" :cardclick="test"></i-card>
  </div>
</template>

<script>
  import HOMEAPI from '../../service/api/homeapi.js';
  import  ICard from '../icard'

  export default{
    name : "dj",
    data () {
      return {
        djrecommends : []
      }
    },
    components: {
      ICard
    },
    created () {
      this.loadData()
    },
    methods : {
      // 获取电台推荐节目
      loadData () {
        HOMEAPI.getRecommendDjs().then( (res) => {
          this.djrecommends = [];
          res.result.map( (re) => {
            let obj = {
              id : re.id,
              picUrl : re.picUrl,
              desc : re.name,
              playCount : re.program.adjustedPlayCount,
              nickname : re.program.dj.nickname
            }
            this.djrecommends.push(obj)
          })
        }).catch( (err) => {

        })
      },
      test (item){
        console.info("ahhahahahahahahahahahah",item)
      }
    }
  }
</script>
、

<template>
  <div class="card-list flex flex-two">
    <mvcard-item v-for="(item, index) in recommendMvlist" :key="index" :iteminfo="item" ></mvcard-item>
  </div>
</template>

<script>
  import HOMEAPI from '../../service/api/homeapi.js';
  import MvcardItem from './mvcarditem';

  export default{
    name : 'mvcardlist',
    data () {
      return{
        recommendMvlist : []
      }
    },
    components : {
      MvcardItem
    },
    methods: {
      loadData () {
        HOMEAPI.getRecommendMvs().then( (res) => {
          this.recommendMvlist = [];
          this.recommendMvlist = res.result
        }).catch( (err) => {

        })
      }
    },
    created(){
      this.loadData()
    }
  }

</script>

<style scoped >
  .card-list{
    width: 100%;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-pack: distribute;
    -webkit-box-pack: justify;
    justify-content: space-between;
    -webkit-box-flex: 0;
    -ms-flex: 0 1 auto;
    flex: 0 1 auto;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
  }
  .card-item-box{
    flex: 0 1 auto;
  }
</style>

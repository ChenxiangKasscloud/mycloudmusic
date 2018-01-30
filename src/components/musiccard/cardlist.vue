<template>
  <div class="card-list flex">
    <card-item v-for="(item, index) in recommendlist" :key="index" :iteminfo="item" @click="goSongList(item)"></card-item>
  </div>
</template>

<script>
  import HOMEAPI from '../../service/api/homeapi.js';
  import CardItem from './carditem';

  export default{
    name : 'cardlist',
    props : {
      showCounts : {
        type : Number,
        default : 6
      }
    },
    data () {
      return{
        recommendlist : []
      }
    },
    components : {
      CardItem
    },
    methods: {
      loadData () {
        HOMEAPI.getRecommendsList().then( (res) => {
          this.recommendlist = [];
          let randomNum = Math.floor(Math.random()*10);
          for( let i = 0 ; i < this.showCounts; i++){
            if( i+randomNum < res.result.length )
              this.recommendlist.push(res.result[i+randomNum])
          }
        }).catch( (err) => {

        })
      },
      goSongList (item) {
        console.info("item",item)
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

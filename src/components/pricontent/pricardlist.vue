<template>
  <div class="card-list flex flex-two">
    <pircard-item v-for="(item, index) in pricontentitems" :key="index" :index="index+1" :iteminfo="item" ></pircard-item>
  </div>
</template>

<script>
  import HOMEAPI from '../../service/api/homeapi.js';
  import PircardItem from './pricarditem';

  export default{
    name : 'pricardlist',
    data () {
      return{
        pricontentitems : []
      }
    },
    components : {
      PircardItem
    },
    methods: {
      loadData () {
        HOMEAPI.getPriContentList().then( (res) => {
          this.pricontentitems = [];
          res.result.map( (rs,index) => {
            if( index != 2 )
              rs.picUrl = rs.sPicUrl;
            this.pricontentitems.push( rs )
          })
        }).catch( (err) => {})
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

<template>
  <div class="card-list flex flex-two">
    <card-item v-for="(data, index) in datalist" :key="index" :iteminfo="data" ></card-item>
  </div>
</template>

<script>
  import CardItem from './orderitem';

  export default{
    name : 'orderlist',
    props : {
      datalist: {
        type: Array,
        default: () => []
      }
    },
    components : {
      CardItem
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

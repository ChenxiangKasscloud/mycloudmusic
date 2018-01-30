<template>
  <div class="cntloading">
    <div>{{title}}</div>
    <div>
      <span class="cl1"></span>
      <span class="cl2"></span>
      <span class="cl3"></span>
    </div>

  </div>
</template>
<script>
  export default {
    name: 'loading',
    props : {
      title : {
        type : String,
        default : '加载中'
      }
    }
  }
</script>

<style scoped>

</style>

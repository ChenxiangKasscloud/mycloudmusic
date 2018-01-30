<template>
  <div class="flex cate-title-component" @click="handleClick">
    <div class="cardtitle-box">
      <span>{{title}}</span>
      <i class="iconfont icon-arrow-right"></i>
    </div>
  </div>
</template>
<style scoped>
  .cate-title-component {
    height: 3.5rem;
    align-items: flex-start;
    background-color: #fff;
  }
  .cardtitle-box{
    margin: .8rem 0;
    height: 1.3rem;
    line-height: 1.2rem;
    width: 100%;
    position: relative;
    display: flex;
    align-self: flex-end;
    border-left: 0.15rem solid #d33a31
  }
  .cardtitle-box span{
    font-size: 1.2rem;
    margin-left: .5rem;
  }
  .icon-arrow-right {
    font-size: 1.1rem;
    line-height: 1.3rem;
    margin-left: .5rem;
  }
</style>
<script>
  export default{
    props: {
      title: {
        Type: String,
        required: true
      }
    },
    methods : {
      handleClick (event) {
        this.$emit('click', event);
      }
    }
  }
</script>

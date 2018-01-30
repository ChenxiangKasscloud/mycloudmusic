<template>
  <div class="center-link clearfix">
    <div>
      <span>
        <i class="icon dj-type"></i>
        电台分类
      </span>
    </div>
    <div>
      <span>
        <i class="icon dj-rank"></i>
        电台排行
      </span>
    </div>
  </div>
</template>

<script>
  export default{
    name : 'centerlink',
    methods : {

    }
  }

</script>

<style scoped>
  .center-link{
    border-bottom: .01rem solid #e6e6e6;
    padding: .8rem 0;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    margin-bottom: .4rem;
  }
  .center-link >div {
      float: left;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      width: 49.3%;
      -webkit-box-pack: center;
      -ms-flex-pack: center;
      justify-content: center;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
  }
  .center-link >div:nth-child(2n+1) {
      border-right: 1px solid #e6e6e6;
  }
  .center-link i,
  .center-link span{
      float: left;
  }
  .center-link span {
      line-height: 30px;
      display: inline-block;
      font-size: 14px;
  }
</style>

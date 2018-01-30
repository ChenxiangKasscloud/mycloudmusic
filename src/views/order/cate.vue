<template>
  <transition name="actionsheet-float">
    <div v-show="currentValue" :value="value" class="actionsheet">
      <a class="actionsheet-button"  @click.stop="currentValue = false">取消</a>
    </div>
  </transition>
</template>

<script>
  export default{
    name : 'cate',
    data () {
      return{
        currentValue: false,
      }
    },
    props : {
      value: {
        type: Boolean,
        default:false
      }
    },
    watch: {
      currentValue(val) {
        console.info("currentValue",val)
        this.$emit('input', val);
      },
      value(val) {
        console.info("value",val)
        this.currentValue = val;
      }
    },
    mounted() {
      if (this.value) {
        this.currentValue = true;
      }
    }
  }
</script>
<style scoped>
  .actionsheet{
    position: fixed;
    background: #e0e0e0;
    width: 100%;
    height: 100%;
    text-align: center;
    bottom: 0;
    left: 50%;
    transform: translate3d(-50%, 0, 0);
    backface-visibility: hidden;
    transition: transform .3s ease-out;
    z-index: 2001;
  }
  .actionsheet-button,
  .actionsheet-listitem {
    display: block;
    width: 100%;
    height: 45px;
    line-height: 45px;
    font-size: 18px;
    color: #333;
    background-color: #fff;
  }
  .actionsheet-float-enter,
  .actionsheet-float-leave-active {
    transform: translate3d(-50%, 100%, 0);
  }
  #catewrap {
    padding: 0 1%;
    box-sizing: border-box;
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: 100;
    left: 0;
    top: 0;
    background-color: #fff;
    overflow: auto;
  }
  #closecatelist {
    margin: .5em auto;
  }
  #cateall {
    float: none;
    width: auto;
    display: block;
    margin: 0 3px 1em;
  }
  .catelist {
    margin-bottom: .5em;
    border: 1px solid #eee;
    border-width: 1px 0 0 1px;
  }
  .catelist:after {
    display: table;
    clear: both;
    content: '';
  }
  .checked {
    z-index: 2;
  }
  .checked:after {
    border-color: #BB2C08;
    border-width: 1px;
    left: -1px;
    top: -1px;
    display: block;
  }
  .cl_list {
    text-align: center;
    position: relative;
    z-index: 1;
    width: 25%;
    float: left;
    line-height: 1.5em;
    height: 3.5em;
    padding: 1em 0;
    box-sizing: border-box;
    cursor: pointer;
  }
  .cl_list:after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    border: 1px solid #eee;
    event-pointer: none;
    border-width: 0 1px 1px 0;
    display: block;
  }
  .cl_ico {
    height: 7em;
    padding: 0;
    overflow: hidden;
    padding: 0;
  }
  .cl_ico_checked {
    background-image: url(/static/img/cm2_discover_slted@2x.decf991.png);
    width: 1.5em;
    height: 1.5em;
    right: 0;
    bottom: 0;
    background-size: 100% 100%;
  }
  .cl_ico_hot {
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAA4CAMAAACfWMssAAABTVBMV…/Q0WF1WB1Wh9VhdVgdVofVYXVYHVaH1WF1WB1Wh9VhdScljLevgPOTYwAAAABJRU5ErkJggg==);
    width: 2em;
    height: 2em;
    left: 0;
    top: 0;
    background-size: 100% auto;
  }
  .cl_ico_checked, .cl_ico_hot {
    content: "";
    position: absolute;
  }
</style>

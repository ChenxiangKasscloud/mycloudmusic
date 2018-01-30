<template>
  <div :class="classObject">
    <i-carditem
      v-for="(card, index) in cardlist"
      :key="index"
      :iteminfo="card"
      :icontype="icontype"
      @click="cardclick(card)"
      :showvisiable="showht">
    </i-carditem>
  </div>
</template>

<script>
  import ICarditem from './icarditem';

  export default{
    name : 'icardlist',
    data () {
      return{
        cardlist : []
      }
    },
    props : {
      datalist : {
        type : Array,
        default : [],
        required : true
      },
      rowcount : {
        type : Number,
        default : 3
      },
      cellcount : {
        type : Number,
        default : 1
      },
      showht : {
        type : Boolean,
        default : true
      },
      icontype : {
        type : String,
        default : 'audio'
      },
      cardclick : {
        type : Function,
        default : () => {}
      }
    },
    components : {
      ICarditem
    },
    computed: {
      classObject: function () {
        return {
          "flex-one": this.rowcount == 1,
          "flex-two": this.rowcount == 2,
          "flex-three": this.rowcount == 3,
          "card-list" : true,
          "flex" : true
        }
      }
    },
    watch : {
      datalist :{
        handler(newValue, oldValue) {
          if( newValue != oldValue )
            this.buildCardList()
　　　　},
　　　　deep: true
      }
    },
    created (){
      this.buildCardList()
    },
    methods : {
      buildCardList () {
        if( this.cellcount*3 == this.datalist.length ){
          this.cardlist = this.datalist;
          return ;
        }
        this.datalist.map( (data, index) => {
          if( index < this.cellcount*3 )
            this.cardlist.push(data);
        })
      }
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

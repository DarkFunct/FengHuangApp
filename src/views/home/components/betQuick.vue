<template>
  <div class="weui-tabbar vux-demo-tabbar">
    <a href="javascript:;" class="weui-tabbar__item" @click="clearOdds()">
      <p class="weui-tabbar__label_p menuBtnL"><span>清 空</span></p>
    </a> 
    <a href="javascript:;" class="weui-tabbar__item weui-bar__item_on" @click="toBetList()">
      <p class="weui-tabbar__label_p menuBtnR"><span>投 注</span><span v-if="oddsNum!=0" id="selCount" class="layui-badge layui-bg-blue">{{oddsNum}}</span></p>
    </a>
  </div>

  <!-- <footer>
    <div class="bottom_btn layui-form">
      <button class="layui-btn layui-btn-normal" id="clearBtn">清空</button>
      <button class="layui-btn layui-btn-danger" id="OrderBtn">投注<span id="selCount" class="layui-badge layui-bg-blue">{{orderDataList.lenght?orderDataList.lenght:0}}</span></button>
    </div>
  </footer> -->
</template>


<script>
  import { mapGetters } from 'vuex';


  export default {
    props: {
    },
    data() {
      return {
        radio10: '1',
        hahahaid: '',
        moneyOrderTemp: '',
        kuaijiePay: false,
        isOpenOdds: true,
        disableBtn: true,
        choumaPay: 0,
        oddIng: false,

        oddsNum: 0
      }
    },
    components: {
    },
    created() {

      console.log('orderDataList',this.orderDataList.length);
    },
    computed:{
      ...mapGetters({
        bocaiInfoData: 'getbocaiInfoData',
        bocaiName: 'getbocaiName',
        userInfo: 'getuserInfo',
        bocaiCategory: 'getbocaiCategory',
        bocaiTypeId: 'getbocaiTypeId',
        curPeriods: 'getcurPeriods',
        isOdding: 'getisOdding',
        oddsList: 'getoddsList',
        focusIndex: 'getfocusIndex',
        orderList: 'getorderList',
        orderOddsVisible: 'getorderOddsVisible',
        moneyOrder: 'getmoneyOrder',
        orderDataList: 'getorderDataList'
      })
    },
    mounted(){
      bus.$on('getoddsNum', (data) => {
        this.oddsNum = data;
      });
      bus.$on('gotoreset', (data) => {
        this.reset();
      });
    },
    methods: {
      toBetList() {
        console.log('this.bocaiInfoData',this.bocaiInfoData);
        store.commit('updatecurPeriods',this.bocaiInfoData.bocaiPeriods);
        this.$router.push({name:'betList'});
      },
      clearOdds() {
        this.$emit('childByReset', '');
      }
    },
    watch: {
    }

  }

</script>

<style scoped>

</style>


<style lang="less">
</style>

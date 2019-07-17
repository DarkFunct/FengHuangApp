<template>
  <div id="game">

    <div class="game-body">

      <clock-time></clock-time>

      <odd-body :bocaiCategoryList="bocaiCategoryList"></odd-body>

    </div>

    <bet-quick></bet-quick>

  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import BetQuick from '@/views/home/components/betQuick';
import ClockTime from '@/views/home/components/clockTime';
import OddBody from '@/views/home/components/oddBody';

$(document).ready(function() {
  $(".drawer-mask").click(function() {
    
    console.log('closeRightMenureadyready');

      if($('.vux-drawer-content.drawer-right').hasClass('vux-drawer-active')) {
        $('.vux-drawer-content.drawer-right').removeClass('vux-drawer-active');

        $('.vux-drawer-body').css({"transform":"translate3d(0px, 0px, 0px)"});

        $('.drawer-mask.vux-drawer-active').removeClass('vux-drawer-active');

      }

  });
});

export default {
  components: {
    ClockTime,
    BetQuick,
    OddBody
  },
  data() {
    return {
      showSubMenu: false,

      dialogMessage: '',
      min : 0, //生成的最小的数字，比如200
      max : 9, //生成的最大的数字，比如500
      imgUrl: 0,
      t: null, //轮询  开奖结果
      resultList: [],
      submenu: '',
      messageinfo: '',
      centerDialogVisible: false,
      bocaiCategoryList: [],


      pathBocaiId: this.$route.params.id

    }
  },
  async created() {
    this.getbocaoName();

    //只循环一个
    this.getBocaiInfo5sOnce();
  },
  computed: {
    ...mapGetters({
      bocaiTypeList: 'getbocaiTypeList',
      bocaiTypeId: 'getbocaiTypeId',
      bocaiName: 'getbocaiName',
      hasResult: 'gethasResult',
      iskaipaning: 'getiskaipaning'
    }),
    bocaiTypeListTemp() {
      return _.chunk(this.bocaiTypeList,3) || [];
    }
  },
  beforeDestroy: function() {
      if (this.t) {
        clearTimeout(this.t)
      }
  },
  methods: {
    async bocaiInfo() {

        if(!this.hasResult && this.iskaipaning) {

        let res = await this.$get(`${window.url}/api/bocaiInfo?bocaiTypeId=`+this.bocaiTypeId);

            if(res.code===200){

              if(res.data.companyIsOpenSet == 2) {
                if(res.data.isOpenSet == 1) {

                  store.commit('updateiskaipaning',true);

                  store.commit('updatebocaiInfoData',res.data);

                  if(res.data.preResult != '') {

                    store.commit('updatehasResult',true);
                  }

                  console.log('this.preResult',this.preResult);
                } else {
                  bus.$emit('iskaipaning', false);
                  store.commit('updatehasResult',false);
                }
              } else {
                bus.$emit('iskaipaning', false);
                store.commit('updatehasResult',false);
              }

            }
       }

    },
    async getBocaiInfo5sOnce() { 
      //console.log('5秒调一次','this.preResult',this.preResult,'this.iskaipaning',this.iskaipaning);

       if(!this.hasResult && this.iskaipaning) {

        let res = await this.$get(`${window.url}/api/bocaiInfo?bocaiTypeId=`+this.bocaiTypeId);

            if(res.code===200){


              if(res.data.companyIsOpenSet == 2) {
                if(res.data.isOpenSet == 1) {

                  store.commit('updateiskaipaning',true);

                  store.commit('updatebocaiInfoData',res.data);

                  if(res.data.preResult != '') {

                    store.commit('updatehasResult',true);
                  }

                  console.log('this.preResult',this.preResult);
                } else {
                  bus.$emit('iskaipaning', false);
                  store.commit('updatehasResult',false);
                }
              } else {
                bus.$emit('iskaipaning', false);
                store.commit('updatehasResult',false);
              }

            }

       }

        this.t = setTimeout(this.getBocaiInfo5sOnce, window.refreshTimeFast);
    },
    getbocaoName() {

      let name = '';

      switch (this.pathBocaiId) {
        case '1':
        name = '重庆时时彩';
        break;
        case '8555':
        name = '幸运飞艇';
        break;
        case '8806':
        name = '北京赛车';
        break;
        case '8811':
        name = '山东11选5';
        break;
        case '8374':
        name = '广东11选5';
        break;
        case '8813':
        name = '极速时时彩';
        break;
        case '8223':
        name = 'PC蛋蛋';
        break;
        case '8498':
        name = '江苏快3';
        break;
        case '8266':
        name = '北京快乐8';
        break;
        case '9057':
        name = '极速赛车';
        break;
        case '8815':
        name = '极速时时彩';
        break;
        case '8809':
        name = '广东快乐十分';
        break;
      }

      store.commit('updatebocaiName',name);

      store.commit('updatebocaiTypeId', this.pathBocaiId);

      this.getOddsInfo();

    },
    //切换菠菜获取菠菜二级菜单并调数据接口
    async getOddsInfo() {

      let that = this;

          this.$isLoading(true);

          await that.$get(`${window.url}/api/getOdds?bocaiTypeId=`+this.bocaiTypeId).then((res) => {
            that.$handelResponse(res, (result) => {

              this.$isLoading(false);
              if(result.code===200){

                that.bocaiCategoryList = result.bocaiCategoryList;

                store.commit('updatebocaiCategory',result.bocaiCategoryList[0]);

                //获取菠菜信息
                this.bocaiInfo();

              }
            })
          });

    }
  },
  mounted() {
    bus.$on('getbocaiInfo', (data) => {
        this.bocaiInfo();
    });
  },
  updated() {
  }
};


</script>
<style scoped lang="less">


</style>
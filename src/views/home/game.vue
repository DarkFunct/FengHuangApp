<template>
  <div id="game">

    <div class="game-body">

      <clock-time></clock-time>

        <div class="sublist">
            <div class="more" style="display:none"><i class="layui-icon" style="font-size:18px"></i></div>
            <div class="menu">
              <button class="layui-btn layui-btn-mini layui-btn-radius layui-btn-normal">主盘势</button>
              <button class="layui-btn layui-btn-mini layui-btn-radius layui-btn-danger">一字</button>
              <button class="layui-btn layui-btn-mini layui-btn-radius layui-btn-danger">二字</button>
              <button class="layui-btn layui-btn-mini layui-btn-radius layui-btn-danger">三字</button>
              <button class="layui-btn layui-btn-mini layui-btn-radius layui-btn-danger">组选三</button>
              <button class="layui-btn layui-btn-mini layui-btn-radius layui-btn-danger">组选六</button>
              <button class="layui-btn layui-btn-mini layui-btn-radius layui-btn-danger">跨度</button>
              <button class="layui-btn layui-btn-mini layui-btn-radius layui-btn-danger">其它</button>
              <button class="layui-btn layui-btn-mini layui-btn-radius layui-btn-danger">准对</button>
              <button class="layui-btn layui-btn-mini layui-btn-radius layui-btn-danger">不出号</button>
            </div>
            <div class="sublist3" style="height: 0px;"><div id="subMenu3"></div></div>
        </div>

        <div class="gamelist">
          <div class="gameitem">
            <div class="header">
              <i class="layui-icon"></i><span class="t">全五.一字组合</span></div><div class="game_body"><ul><li><div class="hm" data="1,全五.一字组合,0"><span class="t sschm">0</span><span id="rate_1" data-value="2.1" class="rate">2.1</span></div></li><li><div class="hm" data="2,全五.一字组合,1"><span class="t sschm">1</span><span id="rate_2" data-value="2.1" class="rate">2.1</span></div></li><li><div class="hm" data="3,全五.一字组合,2"><span class="t sschm">2</span><span id="rate_3" data-value="2.1" class="rate">2.1</span></div></li><li><div class="hm" data="4,全五.一字组合,3"><span class="t sschm">3</span><span id="rate_4" data-value="2.1" class="rate">2.1</span></div></li><li><div class="hm" data="5,全五.一字组合,4"><span class="t sschm">4</span><span id="rate_5" data-value="2.1" class="rate">2.1</span></div></li><li><div class="hm" data="6,全五.一字组合,5"><span class="t sschm">5</span><span id="rate_6" data-value="2.1" class="rate">2.1</span></div></li><li><div class="hm" data="7,全五.一字组合,6"><span class="t sschm">6</span><span id="rate_7" data-value="2.1" class="rate">2.1</span></div></li><li><div class="hm" data="8,全五.一字组合,7"><span class="t sschm">7</span><span id="rate_8" data-value="2.1" class="rate">2.1</span></div></li><li><div class="hm" data="9,全五.一字组合,8"><span class="t sschm">8</span><span id="rate_9" data-value="2.1" class="rate">2.1</span></div></li><li><div class="hm" data="10,全五.一字组合,9"><span class="t sschm">9</span><span id="rate_10" data-value="2.1" class="rate">2.1</span></div></li></ul></div></div><div class="gameitem"><div class="header"><i class="layui-icon"></i><span class="t">全五龙虎</span></div><div class="game_body"><ul><li><div class="hm" data="9424,全五龙虎,龙"><span class="t">龙</span><span id="rate_9424" data-value="2.12" class="rate">2.12</span></div></li><li><div class="hm" data="9425,全五龙虎,虎"><span class="t">虎</span><span id="rate_9425" data-value="2.12" class="rate">2.12</span></div></li><li><div class="hm" data="9426,全五龙虎,和"><span class="t">和</span><span id="rate_9426" data-value="9.55" class="rate">9.55</span></div></li></ul></div></div><div class="gameitem"><div class="header"><i class="layui-icon"></i><span class="t">万定位</span></div><div class="game_body"><ul><li><div class="hm" data="37,万定位,大"><span class="t">大</span><span id="rate_37" data-value="1.94" class="rate">1.94</span></div></li><li><div class="hm" data="38,万定位,小"><span class="t">小</span><span id="rate_38" data-value="1.94" class="rate">1.94</span></div></li><li><div class="hm" data="39,万定位,单"><span class="t">单</span><span id="rate_39" data-value="1.94" class="rate">1.94</span></div></li><li><div class="hm" data="40,万定位,双"><span class="t">双</span><span id="rate_40" data-value="1.94" class="rate">1.94</span></div></li><li><div class="hm" data="41,万定位,质"><span class="t">质</span><span id="rate_41" data-value="1.94" class="rate">1.94</span></div></li><li><div class="hm" data="42,万定位,合"><span class="t">合</span><span id="rate_42" data-value="1.94" class="rate">1.94</span></div></li></ul></div></div><div class="gameitem"><div class="header"><i class="layui-icon"></i><span class="t">千定位</span></div><div class="game_body"><ul><li><div class="hm" data="53,千定位,大"><span class="t">大</span><span id="rate_53" data-value="1.94" class="rate">1.94</span></div></li><li><div class="hm" data="54,千定位,小"><span class="t">小</span><span id="rate_54" data-value="1.94" class="rate">1.94</span></div></li><li><div class="hm" data="55,千定位,单"><span class="t">单</span><span id="rate_55" data-value="1.94" class="rate">1.94</span></div></li><li><div class="hm" data="56,千定位,双"><span class="t">双</span><span id="rate_56" data-value="1.94" class="rate">1.94</span></div></li><li><div class="hm" data="57,千定位,质"><span class="t">质</span><span id="rate_57" data-value="1.94" class="rate">1.94</span></div></li><li><div class="hm" data="58,千定位,合"><span class="t">合</span><span id="rate_58" data-value="1.94" class="rate">1.94</span></div></li></ul></div></div><div class="gameitem"><div class="header"><i class="layui-icon"></i><span class="t">百定位</span></div><div class="game_body"><ul><li><div class="hm" data="21,百定位,大"><span class="t">大</span><span id="rate_21" data-value="1.94" class="rate">1.94</span></div></li><li><div class="hm" data="22,百定位,小"><span class="t">小</span><span id="rate_22" data-value="1.94" class="rate">1.94</span></div></li><li><div class="hm" data="23,百定位,单"><span class="t">单</span><span id="rate_23" data-value="1.94" class="rate">1.94</span></div></li><li><div class="hm" data="24,百定位,双"><span class="t">双</span><span id="rate_24" data-value="1.94" class="rate">1.94</span></div></li><li><div class="hm" data="25,百定位,质"><span class="t">质</span><span id="rate_25" data-value="1.94" class="rate">1.94</span></div></li><li><div class="hm" data="26,百定位,合"><span class="t">合</span><span id="rate_26" data-value="1.94" class="rate">1.94</span></div></li></ul></div></div><div class="gameitem"><div class="header"><i class="layui-icon"></i><span class="t">十定位</span></div><div class="game_body"><ul><li><div class="hm" data="69,十定位,大"><span class="t">大</span><span id="rate_69" data-value="1.94" class="rate">1.94</span></div></li><li><div class="hm" data="70,十定位,小"><span class="t">小</span><span id="rate_70" data-value="1.94" class="rate">1.94</span></div></li><li><div class="hm" data="71,十定位,单"><span class="t">单</span><span id="rate_71" data-value="1.94" class="rate">1.94</span></div></li><li><div class="hm" data="72,十定位,双"><span class="t">双</span><span id="rate_72" data-value="1.94" class="rate">1.94</span></div></li><li><div class="hm" data="73,十定位,质"><span class="t">质</span><span id="rate_73" data-value="1.94" class="rate">1.94</span></div></li><li><div class="hm" data="74,十定位,合"><span class="t">合</span><span id="rate_74" data-value="1.94" class="rate">1.94</span></div></li></ul></div></div><div class="gameitem"><div class="header"><i class="layui-icon"></i><span class="t">个定位</span></div><div class="game_body"><ul><li><div class="hm" data="85,个定位,大"><span class="t">大</span><span id="rate_85" data-value="1.94" class="rate">1.94</span></div></li><li><div class="hm" data="86,个定位,小"><span class="t">小</span><span id="rate_86" data-value="1.94" class="rate">1.94</span></div></li><li><div class="hm" data="87,个定位,单"><span class="t">单</span><span id="rate_87" data-value="1.94" class="rate">1.94</span></div></li><li><div class="hm" data="88,个定位,双"><span class="t">双</span><span id="rate_88" data-value="1.94" class="rate">1.94</span></div></li><li><div class="hm" data="89,个定位,质"><span class="t">质</span><span id="rate_89" data-value="1.94" class="rate">1.94</span></div></li><li><div class="hm" data="90,个定位,合"><span class="t">合</span><span id="rate_90" data-value="1.94" class="rate">1.94</span></div></li></ul></div></div><div class="gameitem"><div class="header"><i class="layui-icon"></i><span class="t">全五和数</span></div><div class="game_body"><ul><li><div class="hm" data="9418,全五和数,大"><span class="t">大</span><span id="rate_9418" data-value="1.94" class="rate">1.94</span></div></li><li><div class="hm" data="9419,全五和数,小"><span class="t">小</span><span id="rate_9419" data-value="1.94" class="rate">1.94</span></div></li><li><div class="hm" data="9416,全五和数,单"><span class="t">单</span><span id="rate_9416" data-value="1.94" class="rate">1.94</span></div></li><li><div class="hm" data="9417,全五和数,双"><span class="t">双</span><span id="rate_9417" data-value="1.94" class="rate">1.94</span></div></li></ul></div></div><div class="gameitem"><div class="header"><i class="layui-icon"></i><span class="t">全五尾数</span></div><div class="game_body"><ul><li><div class="hm" data="9420,全五尾数,大"><span class="t">大</span><span id="rate_9420" data-value="1.94" class="rate">1.94</span></div></li><li><div class="hm" data="9421,全五尾数,小"><span class="t">小</span><span id="rate_9421" data-value="1.94" class="rate">1.94</span></div></li><li><div class="hm" data="9422,全五尾数,质"><span class="t">质</span><span id="rate_9422" data-value="1.94" class="rate">1.94</span></div></li><li><div class="hm" data="9423,全五尾数,合"><span class="t">合</span><span id="rate_9423" data-value="1.94" class="rate">1.94</span></div></li></ul></div></div></div>
    </div>

    <footer>
        <div class="bottom_btn layui-form">
            <button class="layui-btn layui-btn-normal" id="clearBtn">清空</button>
            <button class="layui-btn layui-btn-danger" id="OrderBtn">投注<span id="selCount" class="layui-badge layui-bg-blue">0</span></button>
        </div>
    </footer>


  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import BetQuick from '@/views/home/components/betQuick';
import ClockTime from '@/views/home/components/clockTime';

export default {
  components: {
    ClockTime,
    BetQuick
  },
  data() {
    return {
      showSubMenu: false,
      iskaipaning: true,

      dialogMessage: '',
      min : 0, //生成的最小的数字，比如200
      max : 9, //生成的最大的数字，比如500
      imgUrl: 0,
      t: null, //轮询  开奖结果
      resultList: [],
      submenu: '',
      hasResult: false,
      messageinfo: '',
      centerDialogVisible: false,
      bocaiCategoryList: [],


      pathBocaiId: this.$route.params.id

    }
  },
  async created() {
    if(this.bocaiTypeList.length == 0) {
      console.log('????111111?');
      this.getBocai();
    } else {
      console.log('????2222?');
      this.getOddsInfo();
    }

    this.getbocaoName();

    //只循环一个
    this.getBocaiInfo5sOnce();
  },
  computed: {
    ...mapGetters({
      bocaiTypeList: 'getbocaiTypeList',
      bocaiTypeId: 'getbocaiTypeId',
      bocaiName: 'getbocaiName'
    }),
    bocaiTypeListTemp() {
      return _.chunk(this.bocaiTypeList,3) || [];
    }
  },
  beforeDestroy: function() {
      this.clearTime();
  },
  methods: {
    outHide() {
      //console.log('outHide');
      $('.overShowLi').removeClass('active');
      this.showSubMenu = false;
    },
    overShow() {
      //console.log('overShow');
      $('.overShowLi').addClass('active');
      this.showSubMenu = true;

      //console.log('bocaiTypeId',this.bocaiTypeId);

      $('.div_gameno_'+this.bocaiTypeId).addClass('active').siblings().removeClass('active');
    },
    async exit() {
      this.$router.push({name: 'login'});
      
      let ret = await this.$get(`${window.url}/api/exitLogin`);
      if(ret.code===200) {
        
      } else {
      }
      
    },
    clearTime() {
      if (this.t) {
        clearTimeout(this.t)
      }
    },
    goRightMenu(path) {
      $('#div_title_'+path).addClass('bST_1_s active').siblings().removeClass('bST_1_s active');
      this.$router.push({name: path});
    },
    async bocaiInfo() {
        //console.log('this.bocaiTypeId666666',this.bocaiTypeId);

        //console.log('this.preResult',this.preResult);

        let res = await this.$get(`${window.url}/api/bocaiInfo?bocaiTypeId=`+this.bocaiTypeId);

            if(res.code===200){

              //if("companyIsOpenSet": "",//该会员上级公司对该期博彩的封盘状态。状态：0删除，1封盘，2开盘。只有开盘才能投注。)   未做
               //if("isOpenSet": "",//管理员对于当期博彩的开关设置) 

              if(res.data.companyIsOpenSet == 2) {
                if(res.data.isOpenSet == 1) {
                  bus.$emit('iskaipaning', true);

                  bus.$emit('getbocaiInfoData', res.data);

                  store.commit('updatebocaiInfoData',res.data);

                  store.commit('updatepreResult',res.data.preResult);

                  if(res.data.preResult != '') {

                    //开奖了
                    bus.$emit('kaijianglaaa', '');
                  }

                  console.log('this.preResult',this.preResult);
                } else {
                  bus.$emit('iskaipaning', false);
                }
              } else {
                bus.$emit('iskaipaning', false);
              }

            }
        

    },
    async getBocai() {
      let res = await this.$get(`${window.url}/api/getBocai`);

          if(res.code===200){
            //console.log('第一次刷新调取默认菠菜',res.bocaiTypeList[0]);
            //store.commit('updatebocaiName',res.bocaiTypeList[0].bocaiName);
            //store.commit('updatebocaiTypeId', res.bocaiTypeList[0].bocaiId); 
            store.commit('updatebocaiTypeList',res.bocaiTypeList);
            this.getOddsInfo();

          }
    },
    async getBocaiInfo5sOnce() { 
      //console.log('5秒调一次','this.preResult',this.preResult,'this.iskaipaning',this.iskaipaning);

       if(this.preResult == '' || !this.iskaipaning) {

        let res = await this.$get(`${window.url}/api/bocaiInfo?bocaiTypeId=`+this.bocaiTypeId);

            if(res.code===200){

              //if("companyIsOpenSet": "",//该会员上级公司对该期博彩的封盘状态。状态：0删除，1封盘，2开盘。只有开盘才能投注。)   未做
               //if("isOpenSet": "",//管理员对于当期博彩的开关设置) 

              if(res.data.companyIsOpenSet == 2) {
                if(res.data.isOpenSet == 1) {
                  bus.$emit('iskaipaning', true);

                  bus.$emit('getbocaiInfoData', res.data);

                  store.commit('updatebocaiInfoData',res.data);

                  store.commit('updatepreResult',res.data.preResult);


                  if(res.data.preResult != '') {

                    //开奖了
                    bus.$emit('kaijianglaaa', '');
                  }

                  console.log('this.preResult',this.preResult);
                } else {
                  bus.$emit('iskaipaning', false);
                }
              } else {
                bus.$emit('iskaipaning', false);
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

    },
    async getOddsCategory(item) {

      let that = this;

      store.commit('updatebocaiCategory',item);

      $('.OddsCategory'+item.id).addClass('selected').siblings().removeClass('selected');

      this.$isLoading(true);

          await that.$get(`${window.url}/api/getOdds?bocaiTypeId=`+this.bocaiTypeId+`&bocaiCategoryId=`+item.id).then((res) => {
            that.$handelResponse(res, (result) => {
              this.$isLoading(false);

              if(result.code===200){

                store.commit('updateoddsList',result.oddsList);

                bus.$emit('getresetOddsCategory', item.name);

              }
            })
          });
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

                //获取菠菜数据
                this.getOddsCategory(result.bocaiCategoryList[0]);

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
    bus.$on('iskaipaning', (data) => {
        this.iskaipaning = data;
    });
  },
  updated() {
  }
};


</script>
<style scoped lang="less">


</style>
<template>
  <div id="cp-container" class="layui-container layui-clear layui-border-box">
    <div class="layui-row layui-col-space10" v-for="(itemPa,indexPa) in bocaiTypeListTemp">
      <div class="layui-col-xs4" v-for="(item,index) in itemPa">
        <div>
          <a><img :src="'./static/img/'+item.bocaiName+'.png'" width="70px" height="70px"><br><span>{{item.bocaiName}}</span></a>
          <p><span class="time">00:29</span></p>
        </div>
      </div>


    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  components: {
  },
  data() {
    return {
      showSubMenu: false,
      iskaipaning: true,

      dialogMessage: '',
      min : 0, //生成的最小的数字，比如200
      max : 9, //生成的最大的数字，比如500
      imgUrl: 0,
      t1: null, //轮询  博彩信息
      t2: null, //轮询  开奖结果
      t3: null, //轮询  动画
      t4: null, //轮询  开奖结果 快速
      resultList: [],
      submenu: '',
      hasResult: false,
      messageinfo: '',
      centerDialogVisible: false,
      bocaiCategoryList: []

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
    

    this.openPrizeTime = this.$timestampToTimeRi(new Date());

    this.getbocaoName();

    this.getcUserInfo();

    //只循环一个
    this.getBocaiInfo5sOnce();
  },
  computed: {
    ...mapGetters({
      bocaiTypeList: 'getbocaiTypeList'
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
      if (this.t1) {
        clearTimeout(this.t1)
      }
      if (this.t2) {
        clearTimeout(this.t2)
      }
      if (this.t3) {
        clearTimeout(this.t3)
      }
      if (this.t4) {
        clearTimeout(this.t4)
      }
    },
    async getcUserInfo() {
      let res = await this.$get(`${window.url}/api/cUserInfo`);

      if(res.code===200){
        store.commit('updateuserInfo',res.data);
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

        this.t2 = setTimeout(this.getBocaiInfo5sOnce, window.refreshTimeFast);
    },
    getbocaoName() {

      let typeid = '';
      let name = '';

        switch (this.bocaiPathName) {
          case 'chongqindubo':
            typeid = '1';
            name = '重庆时时彩';
            break;
          case 'luckyairship':
            typeid = '8555';
            name = '幸运飞艇';
            break;
          case 'beijingpk10':
            typeid = '8806';
            name = '北京赛车';
            break;
          case 'shandong11xuan5':
            typeid = '8811';
            name = '山东11选5';
            break;
          case 'guangdong11xuan5':
            typeid = '8374';
            name = '广东11选5';
            break;
          case 'jiangxi11xuan5':
            typeid = '8813';
            name = '极速时时彩';
            break;
          case 'pcdandan':
            typeid = '8223';
            name = 'PC蛋蛋';
            break;
          case 'jiangsukuaisan':
            typeid = '8498';
            name = '江苏快3';
            break;
          case 'beijingkuaile8':
            typeid = '8266';
            name = '北京快乐8';
            break;
          case 'jisusaiche':
            typeid = '9057';
            name = '极速赛车';
            break;
          case 'jisudubo':
            typeid = '8815';
            name = '极速时时彩';
            break;
          case 'guangdongkuaile10':
            typeid = '8809';
            name = '广东快乐十分';
            break;
        }

        store.commit('updatebocaiName',name);

        store.commit('updatebocaiTypeId', typeid);

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

                if([1,8815].findIndex((n) => n==this.bocaiTypeId)>-1) {
                  that.bocaiCategoryList.push({
                    id: 100001,
                    name: "牛牛、梭哈"
                  },{
                    id: 100002,
                    name: "整合"
                  });
                } else if([9057,8806,8555].findIndex((n) => n==this.bocaiTypeId)>-1) {
                  that.bocaiCategoryList.push({
                    id: 100001,
                    name: "三、四、五、六名"
                  },{
                    id: 100002,
                    name: "七、八、九、十名"
                  });
                } else if([8809].findIndex((n) => n==this.bocaiTypeId)>-1) {
                  that.bocaiCategoryList.push({
                    id: 100001,
                    name: "单球1~8"
                  },{
                    id: 100002,
                    name: "总和、龙虎"
                  });
                }

                store.commit('updatebocaiCategory',result.bocaiCategoryList[0]);

                //获取菠菜数据
                this.getOddsCategory(result.bocaiCategoryList[0]);

                //获取菠菜信息
                this.bocaiInfo();

              }
            })
          });

    },
    async getOdds(item,index) {

      $('.bST_1').siblings().removeClass('bST_1_s active');

      if(['重庆时时彩','极速时时彩','广东快乐十分','极速赛车','幸运飞艇','北京赛车','江苏快3'].findIndex((n) => n==item.bocaiName)>-1) {

        $('.div_gameno_'+item.bocaiId).addClass('active').siblings().removeClass('active');


        let path = '';
          switch (item.bocaiName) {
            case '重庆时时彩':
              path = 'chongqindubo';
              break;
            case '幸运飞艇':
              path = 'luckyairship';
              break;
            case '北京赛车':
              path = 'beijingpk10';
              break;
            case '山东11选5':
              path = 'shandong11xuan5';
              break;
            case '广东11选5':
              path = 'guangdong11xuan5';
              break;
            case '江西11选5':
              path = 'jiangxi11xuan5';
              break;
            case 'PC蛋蛋':
              path = 'pcdandan';
              break;
            case '江苏快3':
              path = 'jiangsukuaisan';
              break;
            case '北京快乐8':
              path = 'beijingkuaile8';
              break;
            case '极速赛车':
              path = 'jisusaiche';
              break;
            case '极速时时彩':
              path = 'jisudubo';
              break;
            case '广东快乐十分':
              path = 'guangdongkuaile10';
              break;
          }

        store.commit('updatebocaiTypeId',item.bocaiId);

        this.bocaiInfo();

        //this.clearTime();

        store.commit('updatebocaiName',item.bocaiName);

        this.$router.push({name: path});

        this.getOddsInfo();


      } else {
        bus.$emit('iskaipaning', false);
        store.commit('updatebocaiTypeId','');
        store.commit('updatebocaiName',item.bocaiName);
        this.$router.push({name: 'testbocai'});
      }

      
    }
  },
  mounted() {
    bus.$on('getbocaiInfo', (data) => {
        this.bocaiInfo();
    });
    bus.$on('getcUserInfo', (data) => {
        this.getcUserInfo();
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
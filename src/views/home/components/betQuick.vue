<template>
  <footer>
    <div class="bottom_btn layui-form">
      <button class="layui-btn layui-btn-normal" id="clearBtn">清空</button>
      <button class="layui-btn layui-btn-danger" id="OrderBtn">投注<span id="selCount" class="layui-badge layui-bg-blue">{{orderDataList.lenght?orderDataList.lenght:0}}</span></button>
    </div>
  </footer>
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
        orderDatas: {
          periodsId:'',//投注期数ID
          bocaiTypeId:'',//投注博彩ID
          bocaiTypeName:'',//投注博彩名称
          bocaiCategory1Id:'',//投注博彩分类1ID
          bocaiCategory1Name:'',//投注博彩分类1名称
          orderBetMoneySum:0,//投注总和
          cuserId:'',//当前登录ID
          list:[]
        },
        oddIng: false
      }
    },
    components: {
    },
    created() {
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
        hasError: 'gethasError',
        hasErrorMessage: 'gethasErrorMessage',

        orderDataList: 'getorderDataList'
      }),
      totalMoney() {
        let totalMoney = 0;
        for(let n in this.orderList) {
          totalMoney += this.orderList[n].betsMoney*1;
        }
        return totalMoney;
      },
      differTime() {
        let now = new Date();
        return this.bocaiInfoData.nowTime ? now.getTime() - this.bocaiInfoData.nowTime*1000 : 0;
      }
    },
    mounted(){
      bus.$on('isOpenOdds', (data) => {
        this.isOpenOdds = data;
      });
      bus.$on('gotoreset', (data) => {
        this.reset();
      });
    },
    methods: {
      inputFuncOrder(moneyOrderTemp) {
        console.log('moneyOrderTemp',moneyOrderTemp);
        store.commit('updatemoneyOrder',moneyOrderTemp);
      },
      QCExplain() {
        bus.$emit('showleftMessage','鼠标点击选中赔率下注，选好后输入金额来方便快速下注');
      },
      cancelOdd() {
        store.commit('updateorderOddsVisible',false);
        store.commit('updateisOdding', false);
      },
      reset2() {
        console.log('this.kuaijiePay--reset',this.kuaijiePay)
        store.commit('updateisOdding',false);

        store.commit('updatemoneyOrder','');
        this.moneyOrderTemp = '';
        store.commit('updatefocusIndex',1);

        this.$emit('childByReset',!this.kuaijiePay,this.oddsList);

        this.orderOdds2();
      },
      reset() {
        console.log('this.kuaijiePay--reset',this.kuaijiePay)
        store.commit('updateisOdding',false);

        store.commit('updatemoneyOrder','');
        this.moneyOrderTemp = '';
        store.commit('updatefocusIndex',1);

        this.$emit('childByReset',this.kuaijiePay,this.oddsList);

        this.orderOdds2();

        store.commit('updatefocusIndex',1);

      },
      async orderSub() {

        console.log('this.curPeriods3333333333',this.curPeriods,'this.orderList',this.orderList);
        //console.log('this.bocaiInfoData.bocaiPeriodsId',this.bocaiInfoData.bocaiPeriods);

        if(this.curPeriods != this.bocaiInfoData.bocaiPeriods) {
            bus.$emit('toleftShow',22,'指定期数为非交易状态!');
            store.commit('updateorderOddsVisible',false);
        } else if(!this.isOpenOdds) {
            bus.$emit('toleftShow',22,'非交易时间,不允许下注!');
            store.commit('updateorderOddsVisible',false);
        } else if(this.userInfo.isFrozen == 1) {
            bus.$emit('toleftShow',22,'该帐号或上级代理被禁用或暂停下注');
            store.commit('updateorderOddsVisible',false);
        } else {

          //console.log('this.bocaiName',this.bocaiName);

          //console.log('this.bocaiInfoData',this.bocaiInfoData);

          this.orderDatas.list = [];

          this.orderDatas.periodsId = this.bocaiInfoData.bocaiPeriodsId;
          this.orderDatas.bocaiTypeId = +this.bocaiTypeId;
          this.orderDatas.bocaiTypeName = this.bocaiName;
          this.orderDatas.bocaiCategory1Id = this.bocaiCategory.id;
          this.orderDatas.bocaiCategory1Name = this.bocaiCategory.name;
          this.orderDatas.orderBetMoneySum = this.totalMoney;
          this.orderDatas.cuserId = this.userInfo.id;


          let timeNum = this.$timestampToms(new Date().getTime() + this.differTime);

         // console.log('timeNum',timeNum);

          for(let n in this.orderList) {
            let obj = {
              bocaiCategory2Id: this.orderDataList[n].bocaiCategory2Id,//8225,//投注博彩分类2ID
              bocaiCategory2Name: this.orderDataList[n].bocaiCategory2Name,//"混合",//投注博彩分类2名称
              bocaiOddId: this.orderDataList[n].bocaiOddId,//5543,//投注博彩赔率ID
              bocaiOddName: this.orderDataList[n].bocaiOddName,//"大",//投注博彩赔率名称
              bocaiValue: this.orderDataList[n].bocaiValue,//投注内容,六合彩连肖/连尾
              betsMoney: +this.orderList[n].betsMoney,//10000,//一般模式下，选择的金额
              bocaiOdds: this.orderDataList[n].bocaiOdds,//1.90//赔率
              dewaterId: this.orderDataList[n].dewaterId, //退水ID
              orderNum: timeNum+n
            }
            this.orderDatas.list.push(obj);
          }

         // console.log('this.orderDatas',this.orderDatas);


          store.commit('updateorderOddsVisible',false);

          console.log('this.orderOddsVisible',this.orderOddsVisible);
          
          let that = this;
          const loading = this.$loading({
                lock: true,
                //text: 'Loading',
                background: 'rgba(0, 0, 0, 0.7)'
              });
          await that.$post(`${window.url}/api/orderSub`,this.orderDatas).then((res) => {
            that.$handelResponse(res, (result) => {
            loading.close();
              if(result.code===200){
                //更新用户信息
                store.commit('updateorderDatasShow',that.orderDatas.list);
                bus.$emit('getorderList', that.orderList,that.totalMoney); 
                bus.$emit('getcUserInfo', ''); 
                that.orderDatas.list = [];
                that.reset();
              } else {
                that.reset();
              }
            })
          });
        }
      },
      //下单前先刷新最新的赔率
      async orderOdds() {

        let that = this;

          const loading = this.$loading({
                lock: true,
                background: 'rgba(0, 0, 0, 0.7)'
              });
          await that.$get(`${window.url}/api/getOdds?bocaiTypeId=`+this.bocaiTypeId+`&bocaiCategoryId=`+this.bocaiCategory.id).then((res) => {
            that.$handelResponse(res, (result) => {
            loading.close();

              if(result.code===200){

                bus.$emit('setNewOddsList', result.oddsList); //要不要下注时，更新最新赔率 


                for(let n in this.orderDataList) {
                  for(let m in result.oddsList) {
                    if(this.orderDataList[n].bocaiCategory2Id == result.oddsList[m].id) {

                      for(let x in result.oddsList[m].list) {

                        if(this.orderDataList[n].bocaiOddId == result.oddsList[m].list[x].oddsId) {

                          this.orderDataList[n].bocaiOdds = result.oddsList[m].list[x].odds;
                        }
                      }
                    }
                  }
                }


              }
            })
          });

      },
      async orderOdds2() {

        let that = this;

          await that.$get(`${window.url}/api/getOdds?bocaiTypeId=`+this.bocaiTypeId+`&bocaiCategoryId=`+this.bocaiCategory.id).then((res) => {
            that.$handelResponse(res, (result) => {

              if(result.code===200){

                bus.$emit('setNewOddsList', result.oddsList); //要不要下注时，更新最新赔率 

                // for(let n in this.orderDataList) {
                //   for(let m in result.oddsList) {
                //     if(this.orderDataList[n].bocaiCategory2Id == result.oddsList[m].id) {

                //       for(let x in result.oddsList[m].list) {

                //         if(this.orderDataList[n].bocaiOddId == result.oddsList[m].list[x].oddsId) {

                //           this.orderDataList[n].bocaiOdds = result.oddsList[m].list[x].odds;
                //         }
                //       }
                //     }
                //   }
                // }


              } else {
                store.commit('updatehasError',true);
                store.commit('updatehasErrorMessage',result.msg);
                store.commit('updateorderOddsVisible',true);
              }
            })
          });

      },

      orderOddsTo() {


          store.commit('updateisOdding',true);
          store.commit('updateorderList',[]);


          store.commit('updatecurPeriods', this.bocaiInfoData.bocaiPeriods);  //每次点下注时，记录当时的菠菜期数

          console.log('this.orderDataListthis.orderDataList',this.orderDataList);
        if(this.userInfo.isFrozen == 1) {
          bus.$emit('toleftShow',22,'该帐号或上级代理被禁用或暂停下注');
        } else if(!this.kuaijiePay) {
            //console.log('正常');
            let minpay = true;
            let str1 = '';
            let str2 = '';
            let orderListTemp = [];

            for(let n in this.orderDataList) {
              if(+this.orderDataList[n].normalMoney < 2) {
                console.log('+this.orderDataList[n].normalMoney < 2',+this.orderDataList[n].normalMoney,+this.orderDataList[n].normalMoney < 2);

                minpay = false;
                str1 = this.orderDataList[n].bocaiCategory2Name;
                str2 = this.orderDataList[n].bocaiOddName;
              }
              if(this.orderDataList[n].normalMoney != '') {
                let obj = {};

                if(this.orderDataList[n].bocaiValue == '') {
                    // obj.oddNames = this.orderDataList[n].bocaiCategory2Name + '  ' + this.orderDataList[n].bocaiOddName,
                    obj.bocaiCategory2Name = this.orderDataList[n].bocaiCategory2Name;
                    obj.bocaiOddName = this.orderDataList[n].bocaiOddName;

                    obj.bocaiOdds = this.orderDataList[n].bocaiOdds,
                    obj.betsMoney = this.orderDataList[n].normalMoney
                } else {
                    // obj.oddNames = this.orderDataList[n].bocaiOddName + '  ' + this.orderDataList[n].bocaiValue,
                    obj.bocaiValue = this.orderDataList[n].bocaiValue;
                    obj.bocaiOddName = this.orderDataList[n].bocaiOddName;

                    obj.bocaiOdds = this.orderDataList[n].bocaiOdds,
                    obj.betsMoney = this.orderDataList[n].normalMoney
                }

                orderListTemp.push(obj);
              }
            }

            store.commit('updateorderList',orderListTemp);

            if(!minpay) {
              //有超过最小金额的
              store.commit('updatehasError',true);
              store.commit('updatehasErrorMessage','【'+str1+'】'+str2 + '--' +'最低单注金额2元');
              store.commit('updateorderOddsVisible',true);
            } else if(this.totalMoney > this.userInfo.cashBalance) {
              store.commit('updatehasError',true);
              store.commit('updatehasErrorMessage','超过您的额度,无法下注,请联系上级代理');
              store.commit('updateorderOddsVisible',true);
            } else if(this.orderList.length == '0') {
              store.commit('updatehasError',true);
              store.commit('updatehasErrorMessage','请填写下注金额!!!');
              store.commit('updateorderOddsVisible',true);
            } else {
              store.commit('updatehasError',false);
              store.commit('updateorderOddsVisible',true);
            }


          } else {
            //console.log('快捷');
            let nukk = $('#txtqcstake').val() || '';

            if(nukk != '') {
              store.commit('updatemoneyOrder',nukk);
            }

            //console.log('nukk',nukk);

            let orderListTemp = [];

            for(let n in this.orderDataList) {
                let obj = {};

                if(this.orderDataList[n].bocaiValue == '') {
                    // obj.oddNames = this.orderDataList[n].bocaiCategory2Name + '  ' + this.orderDataList[n].bocaiOddName,
                    obj.bocaiCategory2Name = this.orderDataList[n].bocaiCategory2Name;
                    obj.bocaiOddName = this.orderDataList[n].bocaiOddName;

                    obj.bocaiOdds = this.orderDataList[n].bocaiOdds,
                    obj.betsMoney = this.moneyOrder
                } else {
                    // obj.oddNames = this.orderDataList[n].bocaiOddName + '  ' + this.orderDataList[n].bocaiValue,
                    obj.bocaiValue = this.orderDataList[n].bocaiValue;
                    obj.bocaiOddName = this.orderDataList[n].bocaiOddName;

                    obj.bocaiOdds = this.orderDataList[n].bocaiOdds,
                    obj.betsMoney = this.moneyOrder
                }

                orderListTemp.push(obj);
            }

            store.commit('updateorderList',orderListTemp);

             console.log('this.orderList.length == 0',this.orderList.length == 0);

            if(+this.moneyOrder < 2) {
              //有超过最小金额的
              store.commit('updatehasError',true);
              store.commit('updatehasErrorMessage','最低单注金额2元');
              store.commit('updateorderOddsVisible',true);
            } else if(this.totalMoney > this.userInfo.cashBalance) {
              store.commit('updatehasError',true);
              store.commit('updatehasErrorMessage','超过您的额度,无法下注,请联系上级代理');
              store.commit('updateorderOddsVisible',true);
            } else if(this.orderList.length == 0) {
              store.commit('updatehasError',true);
              store.commit('updatehasErrorMessage','请填写下注金额!!!');
              store.commit('updateorderOddsVisible',true);
            } else {
              store.commit('updatehasError',false);
              store.commit('updateorderOddsVisible',true);
            }

              
              store.commit('updateorderOddsVisible',true);

          }

          store.commit('updatefocusIndex',2);

          console.log('this.focusIndex',this.focusIndex,'this.orderList',this.orderList);
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

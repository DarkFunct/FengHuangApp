<template>
  <div class="betListbody">

    <div class="betBody" style="bottom:140px">
      <table borer="0" class="table">
        <tbody>
          <tr>
            <th>类型</th>
            <th>号码</th>
            <th>赔率</th>
            <th>金额</th>
            <th></th>
          </tr>
        </tbody>
        <tbody id="OrderList">
          <tr data-id="9">
            <td>全五.一字组合</td>
            <td>8</td>
            <td>2.1</td>
            <td><input type="number" onkeyup="value=value.replace(/[^\d]/g,'')" value="0" class="amount"></td>
            <td class="delete"><icon type="cancel"></icon></td>
          </tr>
          <tr data-id="9">
            <td>全五.一字组合</td>
            <td>8</td>
            <td>2.1</td>
            <td><input type="number" onkeyup="value=value.replace(/[^\d]/g,'')" value="0" class="amount"></td>
            <td class="delete"><icon type="cancel"></icon></td>
          </tr>
          <tr data-id="9">
            <td>全五.一字组合</td>
            <td>8</td>
            <td>2.1</td>
            <td><input type="number" onkeyup="value=value.replace(/[^\d]/g,'')" value="0" class="amount"></td>
            <td class="delete"><icon type="cancel"></icon></td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="kjpanel">
      <div class="kj">金额：<input type="number" id="setAmount" onkeyup="value=value.replace(/[^\d]/g,'')" value="0" style="width:40px" class="amount"> 
        <button id="SetBtn" style="width:40px" class="layui-btn layui-btn-mini layui-btn-radius layui-btn-danger">确定</button>
        <button id="ResBtn" style="width:40px;margin-left:2px" class="layui-btn layui-btn-mini layui-btn-radius layui-btn-danger">重置</button>
      </div>
      <div class="spr_chips">
        <span>10</span>
        <span>20</span>
        <span>50</span>
        <span>100</span>
      </div>
    </div>

    <div class="total">
      您已选择 <font color="red" id="order_total">0</font> 
      注 共 <font color="red" id="order_amount">0</font> 
      元 可用余额 <font color="red" id="order_balance">2000</font> 元
    </div>

    <div class="weui-tabbar vux-demo-tabbar">
      <a href="javascript:;" class="weui-tabbar__item" @click="cancelOdds()">
        <p class="weui-tabbar__label_p menuBtnL"><span>取消投注</span></p>
      </a> 
      <a href="javascript:;" class="weui-tabbar__item weui-bar__item_on" @click="orderSub()">
        <p class="weui-tabbar__label_p menuBtnR"><span>确认投注</span></p>
      </a>
    </div>

  </div>
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
        orderDataList: 'getorderDataList',
        curPeriods: 'getcurPeriods'

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
      bus.$on('getoddsNum', (data) => {
        this.oddsNum = data;
      });
      bus.$on('gotoreset', (data) => {
        this.reset();
      });
    },
    methods: {
      cancelOdds() {

      },

      clearOdds() {
        this.$emit('childByReset', '');
      },
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
          this.$toast('此注已过投注期，请返回重新下注！');
        } else if(!this.isOpenOdds) {
          this.$toast('已封盘，不允许下注!');
        } else if(this.userInfo.isFrozen == 1) {
          this.$toast('该帐号或上级代理被禁用或暂停下注!');
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
.betListbody {
  background-color: #fff;
}
.table {
    width: 100%;
}
.table th {
    background-color: #9ca9b0;
    height: 25px;
    line-height: 25px;
    color: #fff;
    font-weight: normal;
}
.table td {
    height: 25px;
    padding: 5px;
    text-align: center;
}
.amount {
    padding: 3px;
    width: 50px;
    border-radius: 3px;
    border: 1px solid #ccc;
    height: 24px;
    line-height: 24px;
    font-size: 12px;
}
.table i {
    font-size: 20px;
}
.betBody {
  position: absolute;
  width: 100%;
  height: auto;
  top: 40px;
  bottom: 58px;
  overflow-x: hidden;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}
.kjpanel {
    position: absolute;
    bottom: 0;
    height: 40px;
    line-height: 40px;
    text-align: center;
    border-top: 1px solid #ccc;
    margin-bottom: 90px;
    width: 100%;
    background-color: #fff;
}
.kjpanel .kj {
    float: left;
    width: 180px;
    font-size: 12px;
    z-index: 1;
}
.kjpanel .spr_chips {
    float: right;
    background: url(../../../static/img/spr_chips.png) no-repeat;
    height: 30px;
    line-height: 25px;
    background-size: 100% 100%;
    margin: 5px 5px 0px 0px;
    width: 130px;
}
.kjpanel .spr_chips span {
    display: block;
    float: left;
    font-size: 12px;
    font-weight: bold;
    width: 25%;
    height: 100%;
    text-align: center;
}
.total {
    position: absolute;
    bottom: 0;
    height: 40px;
    line-height: 40px;
    text-align: center;
    border-top: 1px solid #ccc;
    margin-bottom: 50px;
    width: 100%;
    background-color: #fff;
}

</style>


<style lang="less">
</style>

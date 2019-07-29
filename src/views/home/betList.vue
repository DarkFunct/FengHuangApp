<template>
  <div class="betListbody">

    <div class="betBody">
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
          <tr v-for="(item,index) in orderList">
            <td>{{item.bocaiCategory2Name}}</td>
            <td>{{item.bocaiOddName}}</td>
            <td>{{item.bocaiOdds}}</td>
            <td><input v-model.number="item.betsMoney" onkeypress="return event.keyCode>=48&&event.keyCode<=57" onkeyup="value=value.replace(/[^\d]/g,'') " ng-pattern="/[^a-zA-Z]/" class="amount"></td>
            <td class="delete"><icon type="cancel" @click.native="deleteOdd(index)"></icon></td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="kjpanel">
      <div class="kj">金额：<input id="setAmount" v-model.number="setAmount" onkeypress="return event.keyCode>=48&&event.keyCode<=57" onkeyup="value=value.replace(/[^\d]/g,'') " ng-pattern="/[^a-zA-Z]/" class="amount"> 
        <button id="SetBtn" class="layui-btn layui-btn-mini layui-btn-radius layui-btn-danger" @click="setAmountMoney">确定</button>
        <button id="ResBtn" class="layui-btn layui-btn-mini layui-btn-radius layui-btn-danger" @click="resetMoney">重置</button>
      </div>
      <div class="spr_chips">
        <span @click.stop="orderMul(10)">10</span>
        <span @click="orderMul(20)">20</span>
        <span @click="orderMul(50)">50</span>
        <span @click="orderMul(100)">100</span>
      </div>
    </div>

    <div class="total">
      您已选择 <font color="red" id="order_total">{{totalOdds}}</font> 
      注 共 <font color="red" id="order_amount">{{totalMoney}}</font> 
      元 可用余额 <font color="red" id="order_balance">{{userInfo.cashBalance}}</font> 元
    </div>

    <div class="weui-tabbar vux-demo-tabbar">
      <a href="javascript:;" class="weui-tabbar__item" @click="cancelOdds()">
        <p class="weui-tabbar__label_p menuBtnL"><span>取消投注</span></p>
      </a> 
      <a href="javascript:;" class="weui-tabbar__item weui-bar__item_on" @click="orderSub()">
        <p class="weui-tabbar__label_p menuBtnR"><span>确认投注</span></p>
      </a>
    </div>


    <div v-transfer-dom>
      <confirm v-model="showOdds"
      :title="'下注信息'"
      @on-cancel="onCancel"
      @on-confirm="onConfirm"
      >
        <p style="text-align:center;">您已选择<span class="red">{{totalOdds}}</span>注，共<span class="red">{{totalMoney}}</span>元</p>确认提交?
      </confirm>
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

        oddsNum: 0,
        setAmount: '',
        showOdds: false
      }
    },
    components: {
    },
    created() {

      console.log('orderList',this.orderList);

    },
    computed:{
      ...mapGetters({
        orderDataList: 'getorderDataList',
        curPeriods: 'getcurPeriods',
        orderList: 'getorderList',
        userInfo: 'getuserInfo',
        bocaiTypeId: 'getbocaiTypeId',
        bocaiName: 'getbocaiName',
        bocaiCategory: 'getbocaiCategory',
        bocaiInfoData: 'getbocaiInfoData'
      }),
      totalMoney() {
        let totalMoney = 0;
        for(let n in this.orderList) {
          totalMoney += this.orderList[n].betsMoney*1;
        }
        return totalMoney;
      },
      totalOdds() {
        return this.orderList.length || 0;
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
      onCancel () {
        console.log('on cancel')
      },
      async onConfirm () {
        console.log('on confirm')
        let that = this;

        if(this.curPeriods != this.bocaiInfoData.bocaiPeriods) {
          this.$toast('此注已过投注期，请返回重新下注！');
        } else if(!this.isOpenOdds) {
          this.$toast('已封盘，不允许下注!');
        } else if(this.userInfo.isFrozen == 1) {
          this.$toast('该帐号或上级代理被禁用或暂停下注!');
        } else {
          this.$isLoading(true);
          await that.$post(`${window.url}/api/orderSub`,that.orderDatas).then((res) => {
            that.$handelResponse(res, (result) => {
              that.$isLoading(false);
              if(result.code===200){
                    //更新用户信息
                    that.$toast('下注成功!');
                    bus.$emit('getcUserInfo', ''); 
                    that.reset();
                    that.cancelOdds();
                  } else {
                    that.reset();
                    that.$toast('下注异常!');
                  }
                })
          });
        }

        
      },
      cancelOdds() {
        this.$router.go(-1);
      },
      deleteOdd(index) {
        console.log('moneyOrderTemp',4444);
        this.orderList.splice(index,1);

        store.commit('updateorderList',this.orderList);
      },
      orderMul(pay) {
        for(let n in this.orderList) {
          this.orderList[n].betsMoney = pay*1 + this.orderList[n].betsMoney*1;
        }
      },
      setAmountMoney() {
        for(let n in this.orderList) {
          this.orderList[n].betsMoney = this.setAmount*1;
        }
      },
      resetMoney() {
        for(let n in this.orderList) {
          this.orderList[n].betsMoney = '';
        }
        this.setAmount = '';
      },

      reset() {
        this.orderDatas.list = [];
      },
      async orderSub() {
        let that = this;

        let minpay = true;

        console.log('this.curPeriods3333333333',this.curPeriods,'this.orderList',this.orderList);
        console.log('this.bocaiInfoData.bocaiPeriodsId',this.bocaiInfoData.bocaiPeriods);

        if(this.curPeriods != this.bocaiInfoData.bocaiPeriods) {
          this.$toast('此注已过投注期，请返回重新下注！');
        } else if(!this.isOpenOdds) {
          this.$toast('已封盘，不允许下注!');
        } else if(this.userInfo.isFrozen == 1) {
          this.$toast('该帐号或上级代理被禁用或暂停下注!');
        } else {

          this.orderDatas.list = [];

          this.orderDatas.periodsId = this.bocaiInfoData.bocaiPeriodsId;
          this.orderDatas.bocaiTypeId = +this.bocaiTypeId;
          this.orderDatas.bocaiTypeName = this.bocaiName;
          this.orderDatas.bocaiCategory1Id = this.bocaiCategory.id;
          this.orderDatas.bocaiCategory1Name = this.bocaiCategory.name;
          this.orderDatas.orderBetMoneySum = this.totalMoney;
          this.orderDatas.cuserId = this.userInfo.id;

          for(let n in this.orderList) {

            if(+this.orderList[n].betsMoney < 2) {
              minpay = false;
            }

            let obj = {
              bocaiCategory2Id: this.orderDataList[n].bocaiCategory2Id,//8225,//投注博彩分类2ID
              bocaiCategory2Name: this.orderDataList[n].bocaiCategory2Name,//"混合",//投注博彩分类2名称
              bocaiOddId: this.orderDataList[n].bocaiOddId,//5543,//投注博彩赔率ID
              bocaiOddName: this.orderDataList[n].bocaiOddName,//"大",//投注博彩赔率名称
              bocaiValue: this.orderDataList[n].bocaiValue,//投注内容,六合彩连肖/连尾
              betsMoney: +this.orderList[n].betsMoney,//10000,//一般模式下，选择的金额
              bocaiOdds: this.orderDataList[n].bocaiOdds,//1.90//赔率
              dewaterId: this.orderDataList[n].dewaterId //退水ID
            }
            this.orderDatas.list.push(obj);
          }


          if(!minpay) {
            this.$toast('最低单注金额不低于2元!');
          } else if(this.totalMoney > this.userInfo.cashBalance) {
            this.$toast('下注金额超过您的可用余额,无法下注,请联系上级代理!');
          } else {

            this.showOdds = true;
            
          }

        }
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
  width: 100%;
  height: auto;
  bottom: 58px;
  overflow-x: hidden;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  padding-bottom: 80px;
}
.kjpanel {
    position: absolute;
    bottom: 0;
    height: 40px;
    line-height: 40px;
    text-align: center;
    border-top: 1px solid #ccc;
    margin-bottom: 88px;
    width: 100%;
    background-color: #fff;
}
.kjpanel .kj {
    float: left;
    width: 220px;
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
    margin-bottom: 48px;
    width: 100%;
    background-color: #fff;
}
</style>


<style lang="less">
</style>

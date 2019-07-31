<template>
  <div class="menuBody" style="bottom: 0px;">

    <template v-if="!ifshowBetInfo">

      <group title="游戏:">
        <selector placeholder="请选择游戏" v-model="bocaiTypeId" :options="bocaiList" @on-change="hisOrder"></selector>
      </group>

      <table border="0" class="table2">
        <tbody>
          <caption>本周</caption> 
          <tr>
            <th>日期</th>
            <th>投注金额</th>
            <th>派彩结果</th> 
            <th>注数</th>
          </tr>
        </tbody>
        <tbody id="orderList">
          <tr v-if="nowWeekPage.length*1 == '0'">
            <td style="line-height: 26px;" colspan="4">{{"暂无数据"}}</td> 
          </tr>
          <tr v-else v-for="item in nowWeekPage">
            <td>{{item.createDateStr}}</td>
            <td style="text-align:right">{{item.betsMoneySum}}</td>
            <td style="text-align:right">
              <font color="#00F" title="历史详情" @click="goBetInfo(item.createDateStr)">{{item.winnerMoneySum}}</font>
            </td>
            <td style="text-align:right">{{item.orderCount}}</td>
          </tr>
          <tr>
            <th align="right">合计：</th>
            <th align="right">{{betsAllNow}}</th>
            <th align="right">{{winnerAllNow}}</th>
            <th align="right">{{orderAllNow}}</th>
          </tr>
        </tbody>
      </table>

      <table border="0" class="table2">
        <tbody>
          <caption>上周</caption> 
          <tr>
            <th>日期</th>
            <th>投注金额</th>
            <th>派彩结果</th> 
            <th>注数</th>
          </tr>
        </tbody>
        <tbody id="orderList">
          <tr v-if="nowWeekPage.length*1 == '0'">
            <td style="line-height: 26px;" colspan="4">{{"暂无数据"}}</td> 
          </tr>
          <tr v-else v-for="item in nowWeekPage">
            <td>{{item.createDateStr}}</td>
            <td style="text-align:right">{{item.betsMoneySum}}</td>
            <td style="text-align:right">
              <font color="#00F" title="历史详情" @click="goBetInfo(item.createDateStr)">{{item.winnerMoneySum}}</font>
            </td>
            <td style="text-align:right">{{item.orderCount}}</td>
          </tr>
          <tr>
            <th align="right">合计：</th>
            <th align="right">{{betsAllAfter}}</th>
            <th align="right">{{winnerAllAfter}}</th>
            <th align="right">{{orderAllAfter}}</th>
          </tr>
        </tbody>
      </table>

    </template>

    <template v-else>
      <group>
        <p><a class="back" @click="backBetHis">返回</a></p> 
      </group>

      <ul class="list">
        <li v-for="(item,index) in betInfo.list">
          <div class="card">
            <div>单号：{{item.orderNum}}</div>
            <div>日期：{{$timestampToTime(item.createDate)}}</div>
            <div>期数：第 {{item.periods}} 期</div>
            <div>游戏类型：<font color="green">{{item.bocaiTypeName}}</font></div>
            <div>投注内容：<font color="blur">{{item.bocaiCategory2Name}}</font> {{item.bocaiOddName}}@<font color="red">{{item.bocaiOdds}}</font></div> 
            <div>投注金额：<font color="red">{{item.betsMoney}}</font>&nbsp;&nbsp;&nbsp;&nbsp;可赢：<font color="red">{{(+item.winnerMoney-item.betsMoney*1).toFixed(2)}}</font></div>
            <div>退水：<font color="green">{{item.userDewater}}</font>&nbsp;&nbsp;&nbsp;&nbsp;派彩：<font color="red">{{(+item.paicai+item.userDewater).toFixed(2)}}</font></div>
            <div>注单状态: {{item.status=='1'?'已结算' : '未结算'}}</div>
          </div>
        </li>
      </ul>



      <div style="width:100%;text-align:center;">
        <a @click="getbetInfo" style="width:80%;margin-bottom:10px;margin-top:10px" class="layui-btn layui-btn-small layui-btn-normal">点击加载更多</a>
      </div>

      <footer style="">
        <div style="width:100%;text-align:center;color:#fff">
          共 <span class="qs" id="order_sum">3</span> 笔&nbsp;&nbsp;
          总投注：<span class="qs" id="order_money">30</span> &nbsp;&nbsp;
          总输赢：<span class="qs" id="order_win">-30</span>
        </div>
      </footer>



                </tbody> 
                <tr class="tab-footer">
                  <td colspan="4" class="tar">此页面统计：</td> 
                  <td>{{totalbetsMoney.toFixed(2)}}</td> 
                  <td>{{totalwinMoney.toFixed(2)}}</td> 
                  <td>&nbsp;</td> 
                  <td>{{totalpaicai.toFixed(2)}}</td> 
                  <td>&nbsp;</td>
                </tr> 
                <tr class="tab-footer">
                  <td colspan="4" class="tar">总计：</td> 
                  <td>{{sumData.betsMoneySum.toFixed(2)}}</td> 
                  <td>{{sumData.winnerMoneySum.toFixed(2)}}</td> 
                  <td>&nbsp;</td> 
                  <td>{{sumData.winnerMoneyResultSum.toFixed(2)}}</td> 
                  <td>&nbsp;</td>
                </tr>



    </template>



  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  components: {
  },
  data() {
    return {
    	pageSize: 0,
    	nowOrder: {},

      betInfo: {},
      currentPage: 1,
      dayStr: '',
      ifshowBetInfo: false,
      totalbetsMoney: 0,
      totalwinMoney: 0,
      totalpaicai: 0,
      bocaiTypeList: [],
      bocaiTypeId: '',
      afterWeekPage: [],
      sumData: {},
      nowWeekPage: [],
      betsAllNow: '',
      winnerAllNow: '',
      orderAllNow: '',
      betsAllAfter: '',
      winnerAllAfter: '',
      orderAllAfter: ''
    }
  },
  created() {
  	this.hisOrder();
  },
  computed: {
    ...mapGetters({
        bocaiName: 'getbocaiName',
        bocaiTypeList: 'getbocaiTypeList',
        bocaiTypeId: 'getbocaiTypeId'
      }),
    bocaiList() {
      let arr = [];
      for(let n in this.bocaiTypeList) {
        let obj = {
          key: this.bocaiTypeList[n].bocaiTypeId,
          value: this.bocaiTypeList[n].bocaiTypeName
        }
        arr.push(obj);
      }
      return arr;
    }
  },
  methods: {
    backBetHis() {
      this.pageSize = 0;
      this.ifshowBetInfo = false;
    },
    goBetInfo(daytime) {

      this.dayStr = daytime;

      this.getbetInfo();
    },
    async getbetInfo() {

      let that = this;
      this.pageSize = this.pageSize + 5;

      this.$isLoading(true);
      await that.$get(`${window.url}/api/hisOrderInfo?currentPage=`+this.currentPage+`&pageSize=`+this.pageSize+`&dayStr=`+this.dayStr).then((res) => {
        that.$handelResponse(res, (result) => {
          that.$isLoading(false);
          this.betInfo = res.page;
          this.sumData = res.sumData[0];

          for(let n in this.betInfo.list) {
                // this.betInfo.list[n].winMoney =  this.betInfo.list[n].betsMoney*this.betInfo.list[n].bocaiOdds*1 - this.betInfo.list[n].betsMoney*1;
                if(this.betInfo.list[n].winnerStatus == 0) {
                  this.betInfo.list[n].paicai = this.betInfo.list[n].betsMoney*(-1);
                } else if(this.betInfo.list[n].winnerStatus == 1) {
                  this.betInfo.list[n].paicai = this.betInfo.list[n].winnerMoney;
                } else {
                  this.betInfo.list[n].paicai = 0;
                }
                this.totalbetsMoney += this.betInfo.list[n].betsMoney*1;
                this.totalwinMoney += this.betInfo.list[n].betsMoney*1*this.betInfo.list[n].bocaiOdds*1 - this.betInfo.list[n].betsMoney*1;
                this.totalpaicai += this.betInfo.list[n].paicai*1;
              }
            })
      });

      let res = await this.$get(`${window.url}/api/hisOrderInfo?currentPage=`+this.currentPage+`&pageSize=`+this.pageSize+`&dayStr=`+this.dayStr);
      if(res.code===200){
        this.betInfo = res.page;
        this.sumData = res.sumData[0];

        for(let n in this.betInfo.list) {
          // this.betInfo.list[n].winMoney =  this.betInfo.list[n].betsMoney*this.betInfo.list[n].bocaiOdds*1 - this.betInfo.list[n].betsMoney*1;
          if(this.betInfo.list[n].winnerStatus == 0) {
            this.betInfo.list[n].paicai = this.betInfo.list[n].betsMoney*(-1);
          } else if(this.betInfo.list[n].winnerStatus == 1) {
            this.betInfo.list[n].paicai = this.betInfo.list[n].winnerMoney;
          } else {
            this.betInfo.list[n].paicai = 0;
          }
          this.totalbetsMoney += this.betInfo.list[n].betsMoney*1;
          this.totalwinMoney += this.betInfo.list[n].betsMoney*1*this.betInfo.list[n].bocaiOdds*1 - this.betInfo.list[n].betsMoney*1;
          this.totalpaicai += this.betInfo.list[n].paicai*1;
        }

      }

      this.ifshowBetInfo = true;

    },
    async getBocai() {
      let res = await this.$get(`${window.url}/api/getBocai`);

      if(res.code===200){
        this.bocaiTypeList = res.bocaiTypeList;
      }
    },
    changeboType(data) {
      this.hisOrder(data);
    },
    async hisOrder() {

      this.betsAllNow = '';
      this.winnerAllNow = '';
      this.orderAllNow = '';
      this.betsAllAfter = '';
      this.winnerAllAfter = '';
      this.orderAllAfter = '';

      let res = await this.$get(`${window.url}/api/hisOrder?bocaiTypeId=`+this.bocaiTypeId);

        if(res.code===200){
            this.nowWeekPage = res.page.nowWeekPage;

            for(let n in res.page.nowWeekPage) {
              this.betsAllNow += res.page.nowWeekPage[n].betsMoneySum*1;
              this.winnerAllNow += res.page.nowWeekPage[n].winnerMoneySum*1;
              this.orderAllNow += res.page.nowWeekPage[n].orderCount*1;
            }  

            this.afterWeekPage = res.page.afterWeekPage;

            for(let n in res.page.afterWeekPage) {
              this.betsAllAfter += res.page.afterWeekPage[n].betsMoneySum*1;
              this.winnerAllAfter += res.page.afterWeekPage[n].winnerMoneySum*1;
              this.orderAllAfter += res.page.afterWeekPage[n].orderCount*1;
            }

            console.log('afterWeekPage.length*1',this.afterWeekPage.length*1);
            console.log('nowWeekPage.length*1',this.nowWeekPage.length*1);
        } 
    }
  },
  mounted() {
  },
  updated() {
  }
};
</script>
<style scoped>
.default-list h2 {
    margin-top: 10px;
    font-size: 16px;
    font-weight: 700;
}
.default-list p {
    line-height: 30px;
}
.text-indent {
    text-indent: 2em;
}
h1, h2, h3 {
    font-size: 0.373rem;
    font-weight: 400;
    font-weight: bold;
}

.resulList li, .list li {
    overflow: hidden;
    margin: 10px 0 10px 0;
}
.list .card {
    border: 1px dashed #ccc;
    width: 95%;
    margin: 0 auto;
    padding: 10px;
}

</style>
<style lang="less">
  
</style>
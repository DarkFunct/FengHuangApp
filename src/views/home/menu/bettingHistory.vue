<template>
  <div class="menuBody" style="bottom: 0px;padding: 1px;">

    <template v-if="!ifshowBetInfo">
      <div id='game'>
        <div class="sublist">
          <div class="menu">
            <button v-for="(item,index) in bocaiTypeList" class="layui-btn layui-btn-mini layui-btn-radius" :class="['OddsCategory'+item.bocaiTypeId,item.bocaiTypeId == bocaiTypeIdSele? 'selected':'']"  @click="hisOrderSele(item.bocaiTypeId)">{{item.bocaiTypeName}}</button>
          </div>
        </div>
      </div>
      
      <table border="0" class="table2">
        <tbody>
          <p>本周</p> 
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
            <th align="right">{{+betsAllNow}}</th>
            <th align="right">{{+winnerAllNow}}</th>
            <th align="right">{{+orderAllNow}}</th>
          </tr>
        </tbody>
      </table>

      <table border="0" class="table2">
        <tbody>
          <p>上周</p> 
          <tr>
            <th>日期</th>
            <th>投注金额</th>
            <th>派彩结果</th> 
            <th>注数</th>
          </tr>
        </tbody>
        <tbody id="orderList">
          <tr v-if="afterWeekPage.length*1 == '0'">
            <td style="line-height: 26px;" colspan="4">{{"暂无数据"}}</td> 
          </tr>
          <tr v-else v-for="item in afterWeekPage">
            <td>{{item.createDateStr}}</td>
            <td style="text-align:right">{{item.betsMoneySum}}</td>
            <td style="text-align:right">
              <font color="#00F" title="历史详情" @click="goBetInfo(item.createDateStr)">{{item.winnerMoneySum}}</font>
            </td>
            <td style="text-align:right">{{item.orderCount}}</td>
          </tr>
          <tr>
            <th align="right">合计：</th>
            <th align="right">{{+betsAllAfter}}</th>
            <th align="right">{{+winnerAllAfter}}</th>
            <th align="right">{{+orderAllAfter}}</th>
          </tr>
        </tbody>
      </table>

    </template>

    <template v-else>
      <div style="width:100%;text-align:center;">
        <a @click="backBetHis" style="width:80%;margin-bottom:10px;margin-top:10px" class="layui-btn layui-btn-small layui-btn-normal">返回上层</a>
      </div>

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
          合计: &nbsp;&nbsp;
          投注额: <span class="qs" id="order_money">{{sumData.betsMoneySum.toFixed(2)}}</span> &nbsp;&nbsp;
          可赢金额：<span class="qs" id="order_money">{{sumData.winnerMoneySum.toFixed(2)}}</span> &nbsp;&nbsp;
          派彩：<span class="qs" id="order_win">{{sumData.winnerMoneyResultSum.toFixed(2)}}</span>
        </div>
      </footer>


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
      bocaiTypeIdSele: '',

      betInfo: {},
      currentPage: 1,
      dayStr: '',
      ifshowBetInfo: false,
      totalbetsMoney: 0,
      totalwinMoney: 0,
      totalpaicai: 0,
      afterWeekPage: [],
      sumData: {},
      nowWeekPage: [],
      betsAllNow: 0,
      winnerAllNow: 0,
      orderAllNow: 0,
      betsAllAfter: 0,
      winnerAllAfter: 0,
      orderAllAfter: 0
    }
  },
  created() {
    console.log('this.bocaiTypeList',this.bocaiTypeList);
    //this.bocaiTypeIdSele = (this.bocaiTypeId == ''? this.bocaiTypeList[0].bocaiTypeId : this.bocaiTypeId);
    if(this.bocaiTypeId != '') {
      this.bocaiTypeIdSele = this.bocaiTypeId;
    }
  	this.hisOrder();
  },
  computed: {
    ...mapGetters({
        bocaiName: 'getbocaiName',
        bocaiTypeList: 'getbocaiTypeList',
        bocaiTypeId: 'getbocaiTypeId'
    })
  },
  methods: {
    hisOrderSele(data) {
      this.bocaiTypeIdSele = data;
      this.hisOrder();
    },
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

      console.log('this.bocaiTypeIdSele',this.bocaiTypeIdSele);

      $('.OddsCategory'+this.bocaiTypeIdSele).addClass('selected').siblings().removeClass('selected');

      this.betsAllNow = 0;
      this.winnerAllNow = 0;
      this.orderAllNow = 0;
      this.betsAllAfter = 0;
      this.winnerAllAfter = 0;
      this.orderAllAfter = 0;

      if(this.bocaiTypeIdSele != '') {

        let res = await this.$get(`${window.url}/api/hisOrder?bocaiTypeId=`+this.bocaiTypeIdSele);

        if(res.code===200){
            this.nowWeekPage = res.page.nowWeekPage;

            for(let n in res.page.nowWeekPage) {
              this.betsAllNow += +res.page.nowWeekPage[n].betsMoneySum*1;
              this.winnerAllNow += +res.page.nowWeekPage[n].winnerMoneySum*1;
              this.orderAllNow += +res.page.nowWeekPage[n].orderCount*1;
            }  

            this.afterWeekPage = res.page.afterWeekPage;

            for(let n in res.page.afterWeekPage) {
              this.betsAllAfter += +res.page.afterWeekPage[n].betsMoneySum*1;
              this.winnerAllAfter += +res.page.afterWeekPage[n].winnerMoneySum*1;
              this.orderAllAfter += +res.page.afterWeekPage[n].orderCount*1;
            }

            console.log('afterWeekPage.length*1',this.afterWeekPage.length*1);
            console.log('nowWeekPage.length*1',this.nowWeekPage.length*1);
        } 
      }

      
    }
  },
  mounted() {
    bus.$on('getbocaiTypeList', (data) => {
        this.bocaiTypeIdSele = this.bocaiTypeList[0].bocaiTypeId;
        this.hisOrder();
    });
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

.table2 {
    width: 100%;
    border-collapse: collapse;
    margin-top: 10px;
}

.table2 th {
    background-color: #9ca9b0;
    height: 25px;
    line-height: 25px;
    color: #fff;
    font-weight: normal;
    border: 1px solid #ccc;
    padding: 3px;
}
.table2 td {
    height: 25px;
    padding: 5px;
    text-align: center;
    border: 1px solid #ccc;
    padding: 3px;
}


footer {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    background-color: #455463;
    height: 40px;
    line-height: 40px;
    padding: 5px 0px 10px 0px;
    z-index: 9;
    overflow: hidden;
}
.page header, .page footer {
    text-align: center;
    position: absolute;
}
.qs {
    color: #FF5722;
    margin-left: 2px;
    margin-right: 2px;
}
</style>
<style lang="less">
  
</style>
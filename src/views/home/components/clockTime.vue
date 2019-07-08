<template>
  <div>

    <div class="qs_panel balance">
      可用余额：<span class="qs" id="balance">{{userInfo.cashBalance}}</span><i id="refresh_balance" class="layui-icon layui-anim layui-anim-loop">ဂ</i>
    </div>

    <div class="qs_panel">
      <div class="qs_left"><span class="qs" id="sq_qs">{{bocaiInfoData.preBocaiPeriods}}</span>期</div>
      <div class="qs_right">
        <div class="ssc_result" id="sq_result">
          <div class="hm7">7</div>
          <div class="hm5">5</div>
          <div class="hm3">3</div>
          <div class="hm5">5</div>
          <div class="hm8">8</div>
        </div>
        <div class="ssc_result_txt" id="sq_result_txt"></div>
      </div>
    </div>

    <div class="sq_panel">
      <div class="qs_left"><span class="qs" id="now_qs">{{bocaiInfoData.bocaiPeriods}}</span>期</div>
      <div class="clock">
        <div class="label" id="statusText">距离封盘</div>
          <div id="now_start" class="flip-clock-wrapper">

            <span class="flip-clock-divider hours"><span class="flip-clock-label">Hours</span></span>

            <ul class="flip">
              <li class="flip-clock-before">
                <a href="#"><div class="up"><div class="shadow"></div><div class="inn">9</div></div><div class="down"><div class="shadow"></div><div class="inn">9</div></div></a>
              </li>
              <li class="flip-clock-active">
                <a href="#"><div class="up"><div class="shadow"></div><div class="inn">0</div></div><div class="down"><div class="shadow"></div><div class="inn">0</div></div></a>
              </li>
            </ul>

            <ul class="flip">
              <li class="flip-clock-before">
                <a href="#"><div class="up"><div class="shadow"></div><div class="inn">9</div></div><div class="down"><div class="shadow"></div><div class="inn">9</div></div></a>
              </li>
              <li class="flip-clock-active">
                <a href="#"><div class="up"><div class="shadow"></div><div class="inn">0</div></div><div class="down"><div class="shadow"></div><div class="inn">0</div></div></a>
              </li>
            </ul>

            <span class="flip-clock-divider minutes"><span class="flip-clock-label">Minutes</span><span class="flip-clock-dot top"></span><span class="flip-clock-dot bottom"></span></span>

            <ul class="flip">
              <li class="flip-clock-before">
                <a href="#"><div class="up"><div class="shadow"></div><div class="inn">0</div></div><div class="down"><div class="shadow"></div><div class="inn">0</div></div></a>
              </li>
              <li class="flip-clock-active">
                <a href="#"><div class="up"><div class="shadow"></div><div class="inn">1</div></div><div class="down"><div class="shadow"></div><div class="inn">1</div></div></a>
              </li>
            </ul>
            <ul class="flip play">
              <li class="flip-clock-before">
                <a href="#"><div class="up"><div class="shadow"></div><div class="inn">7</div></div><div class="down"><div class="shadow"></div><div class="inn">7</div></div></a>
              </li>
              <li class="flip-clock-active">
                <a href="#"><div class="up"><div class="shadow"></div><div class="inn">6</div></div><div class="down"><div class="shadow"></div><div class="inn">6</div></div></a>
              </li>
            </ul>

            <span class="flip-clock-divider seconds"><span class="flip-clock-label">Seconds</span><span class="flip-clock-dot top"></span><span class="flip-clock-dot bottom"></span></span>

            <ul class="flip play">
              <li class="flip-clock-before">
                <a href="#"><div class="up"><div class="shadow"></div><div class="inn">5</div></div><div class="down"><div class="shadow"></div><div class="inn">5</div></div></a>
              </li>
              <li class="flip-clock-active">
                <a href="#"><div class="up"><div class="shadow"></div><div class="inn">4</div></div><div class="down"><div class="shadow"></div><div class="inn">4</div></div></a>
              </li>
            </ul>
            <ul class="flip play">
              <li class="flip-clock-before">
                <a href="#"><div class="up"><div class="shadow"></div><div class="inn">4</div></div><div class="down"><div class="shadow"></div><div class="inn">4</div></div></a>
              </li>
              <li class="flip-clock-active">
                <a href="#"><div class="up"><div class="shadow"></div><div class="inn">3</div></div><div class="down"><div class="shadow"></div><div class="inn">3</div></div></a>
              </li>
            </ul>
          </div>
        </div>
    </div>

    <!-- <table class="table000 width700">
      <tbody>
        <tr>
          <td class="bocaiNameTd">
            <b class="b_title">{{bocaiName}}</b>
            <span class="todayWinSpan">今天输赢：</span>
            <span class="font_r" id="UserResult">
              <span class="black">{{bocaiInfoData.winnerMoneySum}}</span>
            </span>
          </td>
          <td width="55%" colspan="1" class="vertical-r">
            <table width="100%" class="table000">
              <tbody>
                <tr>
                  <td class="height27">

                    <div class="head_f2" id="div_betno" v-if="['重庆时时彩','极速时时彩'].findIndex((n) => n==bocaiName)>-1">
                      <div class="versionKJDiv">
                        <span class="floatL">&nbsp;</span>
                        <span class="floatL" v-for="(item,index) in preResult">
                          <div class="CQREDiv" :class="'CQNo_'+item"></div>
                        </span>
                      </div>
                      <span class="versionKJSpan"><span id="span_roundno">{{bocaiInfoData.preBocaiPeriods}}</span>期开奖&nbsp;</span>
                    </div>

                    <div class="head_f2" id="div_betno" v-if="['广东快乐十分'].findIndex((n) => n==bocaiName)>-1">
                      <div style="float:right;width:229px;">
                        <span style="float:left;">&nbsp;</span>
                        <span style="float:left;" v-for="(item,index) in preResult">
                          <div :class="'Nomm_'+item" style=" height:27px; width:27px; margin-top:1px;"></div>
                        </span>
                      </div>
                      <span class="versionKJSpan"><span id="span_roundno">{{bocaiInfoData.preBocaiPeriods}}</span>期开奖&nbsp;</span>
                    </div>

                    <div class="head_f2" id="div_betno" style="width: 428px;" v-if="['极速赛车','幸运飞艇','北京赛车'].findIndex((n) => n==bocaiName)>-1">
                      
                      <div style="float:right;width:285px;">
                        <span style="float:left;">&nbsp;</span>
                        <span style="float:left;" v-for="(item,index) in preResult">
                          <div :class="'BJNo_'+item" style=" height:27px; width:27px; margin-top:1px;"></div>
                        </span>
                      </div>
                      <span class="versionKJSpan"><span id="span_roundno">{{bocaiInfoData.preBocaiPeriods}}</span>期开奖&nbsp;</span>
                    </div>


                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>

    <table class="table000 width700">
      <tbody>
        <tr>
          <td class="h24w28">
            <b id="t_LID" class="green">{{bocaiInfoData.bocaiPeriods}}</b>期　<b class="bocaiSubName">{{bocaiCategory.name}}</b>
          </td>
          <td class="alrwd25">
            <span id="hClockTime_C" v-if="juliFengOrKai">距离封盘：<b>{{fengTimeM}}</b>:<b>{{fengTimeS}}</b></span>
            <span id="hClockTime_C" v-if="!juliFengOrKai">距离开盘：<b>{{openPrizeTimeM}}</b>:<b>{{openPrizeTimeS}}</b></span>
          </td>
          <td class="alrwd25"><span id="hClockTime_O">距离开奖：<b class="red">{{openPrizeTimeM}}</b>:<b class="red">{{openPrizeTimeS}}</b></span></td>
          <td class="vertical-r" width="22%"><span id="Update_Time"></span></td>
        </tr>
      </tbody>
    </table> -->

  </div>
</template>


<script>
  
  import { mapGetters } from 'vuex';

	export default {
		props: {
      orderDataList: {
        type: Array
      }
		},
		data() {
			return {
        openPrizeTimeM: '',
        openPrizeTimeS: '',
        openTimeM: '',
        openTimeS: '',
        fengTimeM: '',
        fengTimeS: '',
        timeLeft:'',
        timeLeftM: '',
        timeLeftS: '',
        t: null, //轮询
        closeTimeSet: 0,
        //hasFast: false,
        temdata: {},
        noneResult: false,
        juliFengOrKai: true,
        ifcloseOdds: false
			}
		},
    components: {
		},
		created() {
      this.gettimeLeft();
    },
    computed:{
      ...mapGetters({
        bocaiInfoData: 'getbocaiInfoData',
        bocaiName: 'getbocaiName',
        bocaiCategory: 'getbocaiCategory',
        userInfo: 'getuserInfo'
      }),
      totalMoney() {
        let totalMoney = 0;
        for(let n in this.orderList) {
          totalMoney += this.orderList[n].betsMoney*1;
        }
        return totalMoney;
      },
      preResult() {
        return this.bocaiInfoData.preResult ? this.bocaiInfoData.preResult.split(',') : [];
      },
      differTime() {
        let now = new Date();
        return this.bocaiInfoData.nowTime ? now.getTime() - this.bocaiInfoData.nowTime*1000 : 0;
      },
      differFengOrKai() {
        let path = 0;

          switch (this.bocaiName) {
            case '重庆时时彩':
              path = 100000;
              break;
            case '幸运飞艇':
              path = 16;
              break;
            case '北京赛车':
              path = 16;
              break;
            case '山东11选5':
              path = 16;
              break;
            case '广东11选5':
              path = 16;
              break;
            case '江西11选5':
              path = 16;
              break;
            case 'PC蛋蛋':
              path = 16;
              break;
            case '江苏快3':
              path = 16;
              break;
            case '北京快乐8':
              path = 16;
              break;
            case '极速赛车':
              path = 16;
              break;
            case '极速时时彩':
              path = 16000;
              break;
          }

          return path;
      }

    },
    mounted(){
      bus.$on('hasFast', (data) => {
        this.noneResult = data;
      });
    },
    beforeDestroy: function() {
      if (this.t) {
        clearTimeout(this.t)
      }
    },
		methods: {
      getServerDate(){
          return new Date($.ajax({async: false}).getResponseHeader("Date"));
      },
      gettimeLeft() {

        // if() {

        // }

        //console.log('this.getServerDate()',this.getServerDate());
        //console.log('new Date()',new Date());
        //console.log('this.differTime',this.differTime);
        let now = new Date();
        let leftTime = this.bocaiInfoData.openPrizeTime - now.getTime() + this.differTime;

        let openPrizeTime = this.bocaiInfoData.openPrizeTime - now.getTime() + this.differTime;


        let fengTime = this.bocaiInfoData.openPrizeTime - now.getTime() + this.differTime - this.bocaiInfoData.closeTimeSet*1000;

        let kaipangTime = this.bocaiInfoData.closeTimeSet*1000 - now.getTime() + this.differTime;

        // console.log('getbocaiInfoData--获取传来博彩数据',this.bocaiInfoData,
        //   '当前菠菜相差时间：'+this.differFengOrKai,
        //   '当前时间：'+new Date(),
        //   '当期开奖时间：'+this.timestampToTime(this.bocaiInfoData.openPrizeTime),
        //   '当期开盘时间：'+this.timestampToTime(this.bocaiInfoData.openTime),
        //   '当期封盘时间：'+this.timestampToTime(this.bocaiInfoData.closetime),
        //   '提前多少秒封盘:'+this.bocaiInfoData.closeTimeSet,
        //   '服务器时间:'+this.timestampToTime(this.bocaiInfoData.nowTime*1000));

        //console.log('leftTime',leftTime);
        let closeTime = leftTime - this.bocaiInfoData.closeTimeSet*1000;

        let closeTimeSet = this.openPrizeTime - this.bocaiInfoData.closeTimeSet*1000;


        //console.log('当前时间',this.timestampToTime(now.getTime()));

        //console.log('this.closeTimeSet',this.closeTimeSet);
        //console.log('封盘时间',this.timestampToTime(closeTimeSet));

        if(closeTime<=0 && leftTime<=0) {
          //当期结束，开下一期,还没开之前，都是封盘状态

          //bus.$emit('getRefreshTimeFast', '');

          this.fengTimeM = '--';
          this.fengTimeS = '--';
          this.openPrizeTimeM = '--';
          this.openPrizeTimeS = '--';

          bus.$emit('isOpenOdds', false);

          store.commit('updatepreResult','');

          bus.$emit('getbocaiInfo', '');
        } 

        if(closeTime<=0 && leftTime>0) {
          //封盘未开盘

          let msfeng = parseInt(kaipangTime % 1000).toString();
          kaipangTime = parseInt(kaipangTime / 1000); 
          let ofeng = Math.floor(kaipangTime / 3600);
          let dfeng = Math.floor(ofeng / 24);
          let mfeng = Math.floor(kaipangTime / 60 % 60);
          let sfeng = kaipangTime % 60;

          this.fengTimeM = mfeng*1> 9 ? mfeng : '0'+ mfeng;
          this.fengTimeS = sfeng*1 > 9 ? sfeng : '0'+ sfeng;

          this.juliFengOrKai = false;

          bus.$emit('isOpenOdds', false);

        }
        if(closeTime>0) {
          //距离封盘

          let msfeng = parseInt(fengTime % 1000).toString();
          fengTime = parseInt(fengTime / 1000); 
          let ofeng = Math.floor(fengTime / 3600);
          let dfeng = Math.floor(ofeng / 24);
          let mfeng = Math.floor(fengTime / 60 % 60);
          let sfeng = fengTime % 60;

          this.fengTimeM = mfeng*1> 9 ? mfeng : '0'+ mfeng;
          this.fengTimeS = sfeng*1 > 9 ? sfeng : '0'+ sfeng;

          this.juliFengOrKai = true;

          bus.$emit('isOpenOdds', true);

        }

        //bus.$emit('getRefreshTimeFast', '');


        //this.getopenPrizeTime(openPrizeTime);
        //this.getfengTime(fengTime);


        let msOpen = parseInt(openPrizeTime % 1000).toString();
        openPrizeTime = parseInt(openPrizeTime / 1000); 
        let oOpen = Math.floor(openPrizeTime / 3600);
        let dOpen = Math.floor(oOpen / 24);
        let mOpen = Math.floor(openPrizeTime / 60 % 60);
        let sOpen = openPrizeTime % 60;

        this.openPrizeTimeM = mOpen*1> 9 ? mOpen : '0'+ mOpen;
        this.openPrizeTimeS = sOpen*1 > 9 ? sOpen : '0'+ sOpen;


        this.t = setTimeout(this.gettimeLeft, 1000);


      },
      timestampToTime(timestamp) {
        var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
        var Y = date.getFullYear() + '-';
        var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
        var D = date.getDate()*1 > 9 ? date.getDate() + ' ' : '0' + date.getDate() + ' ';
        var h = date.getHours()*1 > 9 ? date.getHours() + ':' : '0' + date.getHours() + ':';
        var m = date.getMinutes()*1 > 9 ? date.getMinutes() + ':' : '0' + date.getMinutes() + ':';
        var s = date.getSeconds()*1 > 9 ? date.getSeconds() : '0'+ date.getSeconds();
        return Y+M+D+h+m+s;
      }
		}
	}

</script>

<style scoped>
.betQuick {
    text-align: center;
    margin-bottom: 20px;
    margin-top: 14px;
    position: relative;
    height: 67px;
}

.betQuick div {
  display: inline-block;
  float: left;
  margin-left: 20px;
}

.betRight {
  width: 380px;
  margin-left: 50px;
}

.betRBottom label {
  color: #fff;
  float: left;
  padding: 5px 20px 0px 20px;
}

.betRBottom {
  margin-top: 10px;
}


.popup-body {
    overflow-y: auto;
    margin-left: 0px !important;
}

.default-list {
    padding: 8px 10px;
    margin-left: 0px !important;
}

.default-list table {
    margin-top: 5px;
    width: 100%;
    border-collapse: collapse;
    border-spacing: 0;
}

.default-list table thead {
    background-color: #d6d4de;
    font-weight: 700;
    color: #261238;
}
.default-list table td, .default-list table th {
    text-align: center;
    line-height: 30px;
    border: 1px solid #aca6c2;
    padding: 0 6px;
    position: relative;
}
.default-list table td p, .default-list table th p {
    line-height: 18px;
}
.odds-font {
    color: #d63e35;
    font-weight: 700;
}
.betValue {
    height: 16px;
    width: 60px;
    padding: 0 3px;
    line-height: 16px;
}
button.btn-delete {
    margin-left: 8px;
    width: 50px;
    height: 24px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    color: #fff;
    outline: none;
}
button.btn-delete {
    line-height: 16px;
    background: #d63e35;
}
.default-list table tr.tab-footer {
    background-color: #d6d4de;
    font-weight: 700;
    color: #261238;
}

.wanfaBtn .rule {
    height: 24px;
    line-height: 24px;
    font-size: 14px;
    width: 100px;
    text-align: center;
    background: rgba(255, 255, 255, 0.2);
    border: 1px solid rgba(255, 255, 255, 0.5);
    border-radius: 5px;
    color: #efcc9f;
    cursor: pointer;
}
.wanfaBtn .rule:hover {
    background-color: #9b7547;
}
.qiciDiv {
  height: 42px;
  line-height: 42px;
}

#div_betno {
    float: right;
}

.CQNo_0, .CQNo_1, .CQNo_2, .CQNo_3, .CQNo_4, .CQNo_5, .CQNo_6, .CQNo_7, .CQNo_8, .CQNo_9 {
    height:27px; width:27px; margin-top:1px;
}

</style>

<style lang="less">

</style>

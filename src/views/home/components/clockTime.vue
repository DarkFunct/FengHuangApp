<template>
  <div>

    <div class="qs_panel balance">
      可用余额：<span class="qs" id="balance">{{userInfo.cashBalance}}</span>
      <button class="layui-btn layui-btn-mini layui-btn-radius textColorBtn" @click="togetcUserInfo">刷新</button>
    </div>

    <div class="qs_panel">
      <div class="qs_left"><span class="qs" id="sq_qs">{{bocaiInfoData.preBocaiPeriods}}</span>期</div>
      <div class="qs_right">
        <div class="ssc_result" id="sq_result">
          <div v-for="(item,index) in result" :class="'hm'+item" >{{item}}</div>
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
              <li class="flip-clock-active">
                <a href="#"><div class="up"><div class="shadow"></div><div class="inn">{{fengTimeH1}}</div></div><div class="down"><div class="shadow"></div><div class="inn">{{fengTimeH1}}</div></div></a>
              </li>
            </ul>

            <ul class="flip">
              <li class="flip-clock-active">
                <a href="#"><div class="up"><div class="shadow"></div><div class="inn">{{fengTimeH2}}</div></div><div class="down"><div class="shadow"></div><div class="inn">{{fengTimeH2}}</div></div></a>
              </li>
            </ul>

            <span class="flip-clock-divider minutes"><span class="flip-clock-label">Minutes</span><span class="flip-clock-dot top"></span><span class="flip-clock-dot bottom"></span></span>

            <ul class="flip">
              <li class="flip-clock-active">
                <a href="#"><div class="up"><div class="shadow"></div><div class="inn">{{fengTimeM1}}</div></div><div class="down"><div class="shadow"></div><div class="inn">{{fengTimeM1}}</div></div></a>
              </li>
            </ul>
            <ul class="flip play">
              <li class="flip-clock-active">
                <a href="#"><div class="up"><div class="shadow"></div><div class="inn">{{fengTimeM2}}</div></div><div class="down"><div class="shadow"></div><div class="inn">{{fengTimeM2}}</div></div></a>
              </li>
            </ul>

            <span class="flip-clock-divider seconds"><span class="flip-clock-label">Seconds</span><span class="flip-clock-dot top"></span><span class="flip-clock-dot bottom"></span></span>

            <ul class="flip play">
              <li class="flip-clock-active">
                <a href="#"><div class="up"><div class="shadow"></div><div class="inn">{{fengTimeS1}}</div></div><div class="down"><div class="shadow"></div><div class="inn">{{fengTimeS1}}</div></div></a>
              </li>
            </ul>
            <ul class="flip play">
              <li class="flip-clock-active">
                <a href="#"><div class="up"><div class="shadow"></div><div class="inn">{{fengTimeS2}}</div></div><div class="down"><div class="shadow"></div><div class="inn">{{fengTimeS2}}</div></div></a>
              </li>
            </ul>
          </div>
        </div>
    </div>

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
        fengTimeH1: 0,
        fengTimeH2: 0,
        fengTimeM1: 0,
        fengTimeM2: 0,
        fengTimeS1: 0,
        fengTimeS2: 0,
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
        hasResult: 'gethasResult',
        userInfo: 'getuserInfo',
        isLunXuning: 'getisLunXuning'
      }),
      differTime() {
        let now = new Date();
        return this.bocaiInfoData.nowTime ? now.getTime() - this.bocaiInfoData.nowTime*1000 : 0;
      },
      result() {
        return this.bocaiInfoData.preResult ? this.bocaiInfoData.preResult.split(',') : [];
      }
    },
    mounted(){
    },
    beforeDestroy: function() {
      if (this.t) {
        clearTimeout(this.t)
      }
    },
		methods: {
      togetcUserInfo() {
        bus.$emit('getcUserInfo','');
      },
      gettimeLeft() {

        var now = new Date();
        var leftTime = this.bocaiInfoData.openPrizeTime*1000 - now.getTime() + this.differTime;
        var closeTime = leftTime - this.bocaiInfoData.closeTimeSet*1000;

        var closeTimeSet = this.bocaiInfoData.openPrizeTime*1000 - this.bocaiInfoData.closeTimeSet*1000;

        if(closeTime<=0 && leftTime<=0) {
          //当期结束，开下一期,还没开之前，都是封盘状态

          this.fengTimeH1 = 0;
          this.fengTimeH2 = 0;
          this.fengTimeM1 = 0;
          this.fengTimeM2 = 0;
          this.fengTimeS1 = 0;
          this.fengTimeS2 = 0;

          if(!this.isLunXuning) {
            store.commit('updateisOpenOdds',false);
            bus.$emit('getbocaiInfo', '');
            bus.$emit('allQingkong','');
          }


        } 

        if(closeTime<=0 && leftTime>0) {
          //封盘未开盘

          var ms = parseInt(leftTime % 1000).toString();
          leftTime = parseInt(leftTime / 1000); 
          var o = Math.floor(leftTime / 3600);
          var d = Math.floor(o / 24);
          var m = Math.floor(leftTime / 60 % 60);
          var s = leftTime % 60;

          this.timeLeft = (o*1> 9 ? o : '0'+ o) + ":" + (m*1> 9 ? m : '0'+ m) + ":" + (s*1 > 9 ? s : '0'+ s);

          this.fengTimeH1 = this.timeLeft.substring(0,1);
          this.fengTimeH2 = this.timeLeft.substring(1,2);
          this.fengTimeM1 = this.timeLeft.substring(3,4);
          this.fengTimeM2 = this.timeLeft.substring(4,5);
          this.fengTimeS1 = this.timeLeft.substring(6,7);
          this.fengTimeS2 = this.timeLeft.substring(7,8);

          store.commit('updateisOpenOdds',false);

        }
        if(closeTime>0) {

          var ms = parseInt(leftTime % 1000).toString();
          leftTime = parseInt(leftTime / 1000); 
          var o = Math.floor(leftTime / 3600);
          var d = Math.floor(o / 24);
          var m = Math.floor(leftTime / 60 % 60);
          var s = leftTime % 60;

          this.timeLeft = (o*1> 9 ? o : '0'+ o) + ":" + (m*1> 9 ? m : '0'+ m) + ":" + (s*1 > 9 ? s : '0'+ s);

          this.fengTimeH1 = this.timeLeft.substring(0,1);
          this.fengTimeH2 = this.timeLeft.substring(1,2);
          this.fengTimeM1 = this.timeLeft.substring(3,4);
          this.fengTimeM2 = this.timeLeft.substring(4,5);
          this.fengTimeS1 = this.timeLeft.substring(6,7);
          this.fengTimeS2 = this.timeLeft.substring(7,8);

          store.commit('updateisOpenOdds',true);

        }

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

</style>

<style lang="less">

</style>

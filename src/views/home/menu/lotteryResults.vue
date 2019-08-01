<template>
  <div class="menuBody" style="bottom: 0px;padding: 1px;">

    <div id='game'>
      <div class="sublist">
        <div class="menu">
          <button v-for="(item,index) in bocaiTypeList" class="layui-btn layui-btn-mini layui-btn-radius" :class="['OddsCategory'+item.bocaiTypeId,item.bocaiTypeId == bocaiTypeIdSele? 'selected':'']"  @click="hisOrderSele(item.bocaiTypeId)">{{item.bocaiTypeName}}</button>
        </div>
      </div>
    </div>

    <group>
      <datetime
        v-model="openPrizeTime"
        @on-change="changeTime"
        title="日期"
        @on-cancel="log('cancel')"
        @on-confirm="onConfirm"
        @on-hide="log('hide', $event)">
      </datetime>
    </group>

    <ul class="resulList" v-if="[1,8815].findIndex((n) => n==bocaiTypeIdSele)>-1">
      <li v-for="item in resultList">
        <div class="p1">
          <div class="q">{{item.periods}}</div>
          <div class="t">{{$timestampToTime(item.openPrizetime)}}</div>
        </div>
        <template v-if="!item.result || item.result == ''">
          <div>
            <div>暂未开奖</div>
          </div>
        </template>
        <template v-else>
          <div class="ssc_result">
            <div :class="'hm'+item.num1">{{item.num1}}</div>
            <div :class="'hm'+item.num2">{{item.num2}}</div>
            <div :class="'hm'+item.num3">{{item.num3}}</div>
            <div :class="'hm'+item.num4">{{item.num4}}</div>
            <div :class="'hm'+item.num5">{{item.num5}}</div>
          </div>
          <div class="p1 clearb">
            <div class="t headerColor">{{item.zonghe}}</div>
            <div class="t headerColor"><span :class="item.zonghedaxiao == '大' ? 'red' : ''">{{item.zonghedaxiao}}</span></div>
            <div class="t headerColor"><span :class="item.zonghedanshuang == '双' ? 'red' : ''">{{item.zonghedanshuang}}</span></div>
            <div class="t headerColor"><span :class="item.longhu == '龙' ? 'red' : item.longhu == '虎' ? 'blue' : ''">{{item.longhu}}</span></div>
            <div class="t headerColor">{{item.qiansan}}</div>
            <div class="t headerColor">{{item.zhongsan}}</div>
            <div class="t headerColor">{{item.housan}}</div>
          </div>
        </template>
      </li>
    </ul>


    <div style="width:100%;text-align:center;">
      <a @click="getPrizeResult" style="width:80%;margin-bottom:10px;margin-top:10px" class="layui-btn layui-btn-small layui-btn-normal">点击加载更多</a>
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
      bocaiTypeIdSele: '',
      pageSize: 0,
      openPrizeTime: '',
      currentPage: 1,
      resultList: []

    }
  },
  created() {
    this.openPrizeTime = this.$timestampToTimeRi(new Date());


    if(this.bocaiTypeId != '') {
      this.bocaiTypeIdSele = this.bocaiTypeId;
    }
  	this.getPrizeResult();
  },
  computed: {
    ...mapGetters({
        bocaiName: 'getbocaiName',
        bocaiTypeList: 'getbocaiTypeList',
        bocaiTypeId: 'getbocaiTypeId'
      })
  },
  methods: {
    log (str1, str2 = '') {
      console.log(str1, str2)
    },
    onConfirm (val) {
      console.log('on-confirm arg', val)
      console.log('current value', this.openPrizeTime)
    },
    changeTime() {
      this.pageSize = 0;
      this.getPrizeResult();
    },
    hisOrderSele(data) {
      this.pageSize = 0;
      this.bocaiTypeIdSele = data;
      this.getPrizeResult();
    },
    async getPrizeResult() { 
      let that = this;

      if(this.bocaiTypeIdSele != '') {

        $('.OddsCategory'+this.bocaiTypeIdSele).addClass('selected').siblings().removeClass('selected');

        this.pageSize = this.pageSize + 10;

        this.$isLoading(true);
        await that.$get(`${window.url}/api/openPrizeResult?bocaiTypeId=`+this.bocaiTypeIdSele+`&currentPage=1&pageSize=`+this.pageSize+`&dayStr=`+this.openPrizeTime).then((res) => {
          that.$handelResponse(res, (result) => {
            that.$isLoading(false);

            if(result.code===200){
              if(that.bocaiTypeIdSele == '8266') {
                for(let n in res.list) {

                  if(res.list[n].result) {
                    console.log('res.list[n].result',res.list[n].result);

                    res.list[n].result = res.list[n].result.split(','); 
                  }
                }
              }

              that.resultList = res.list;
            } else {

            }

          })
        });


      }
    }
  },
  mounted() {
    bus.$on('getbocaiTypeList', (data) => {
        this.bocaiTypeIdSele = this.bocaiTypeList[0].bocaiTypeId;
        this.getPrizeResult();
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
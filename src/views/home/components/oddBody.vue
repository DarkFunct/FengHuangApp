<template>
  <div>
    <div class="sublist">
      <div class="more" style="display:none"><i class="layui-icon" style="font-size:18px"></i></div>
      <div class="menu">
        <button v-for="(item,index) in bocaiCategoryList" class="layui-btn layui-btn-mini layui-btn-radius" :class="['OddsCategory'+item.id,index==0?'selected':'']"  @click="getOddsCategory(item)" v-if="!(['组选三','组选六','连码','直选'].findIndex((n) => n==item.name)>-1)">{{item.name}}</button>
      </div>

      <div class="sublist3">
      </div>

    </div>

    <div class="gamelist">

      <div class="gameitem" v-for="(itemPa,indexPa) in oddsList">
        <div class="header">
          <i class="layui-icon"></i>
          <span class="t">{{itemPa.name}}</span>
        </div>
        <div class="game_body">
          <ul>
            <li v-for="(item,index) in itemPa.list">
              <!-- 重庆时时彩 极速时时彩-->
              <template v-if="[1,8815].findIndex((n) => n==bocaiTypeId)>-1">
                <div class="hm" :class="'oddsId'+item.oddsId" @click.stop="oddInto(itemPa,item)">
                  <span class="t" :class="(['一字','二字','三字','二定位','三定位'].findIndex((n) => n == bocaiCategory.name)>-1)? 'sschm': ''">{{item.oddsName}}</span>
                  <span v-if="isOpenOdds" class="rate">{{item.odds}}</span>
                  <span v-else class="rate">封盘中</span>
                </div>
              </template>

              <!-- 江苏快三-->
              <template v-if="[8498,8810].findIndex((n) => n==bocaiTypeId)>-1">
                <div class="hm kuaisanDiv" :class="'oddsId'+item.oddsId" @click.stop="oddInto(itemPa,item)">

                  <template v-if="['三军、大小'].findIndex((n) => n == itemPa.name)>-1">
                    <template v-if="['大','小'].findIndex((n) => n == item.oddsName)>-1">
                      <span class="t">{{item.oddsName}}</span>
                    </template>
                    <template v-else>
                      <i :class="'jsk3-icon-'+item.oddsName"></i>
                    </template>
                  </template>
                  <template v-else-if="['点数'].findIndex((n) => n == itemPa.name)>-1">
                    <span class="t sschm">{{item.oddsName}}</span>
                  </template>
                  <template v-else-if="['围骰、全骰'].findIndex((n) => n == itemPa.name)>-1">
                    <template v-if="['全骰'].findIndex((n) => n == item.oddsName)>-1">
                      <span class="t">{{item.oddsName}}</span>
                    </template>
                    <template v-else>
                      <i :class="'jsk3-icon-'+item.oddsName.slice(0,1)"></i>
                      <i :class="'jsk3-icon-'+item.oddsName.slice(2,3)"></i>
                      <i :class="'jsk3-icon-'+item.oddsName.slice(4,5)"></i>
                    </template>
                  </template>
                  <template v-else>
                    <i :class="'jsk3-icon-'+item.oddsName.slice(0,1)"></i>
                    <i :class="'jsk3-icon-'+item.oddsName.slice(2,3)"></i>
                  </template>
                  <span v-if="isOpenOdds" class="rate">{{item.odds}}</span>
                  <span v-else class="rate">封盘中</span>
                </div>
              </template>

              <!-- 北京PK10  幸运飞艇 急速赛车-->
              <template v-if="[8555,8806,9057].findIndex((n) => n==bocaiTypeId)>-1">
                <div class="hm" :class="'oddsId'+item.oddsId" @click.stop="oddInto(itemPa,item)">
                  <template v-if="['1~10','1~10名'].findIndex((n) => n == bocaiCategory.name)>-1">
                    <template v-if="['1','2','3','4','5','6','7','8','9','10'].findIndex((n) => n == item.oddsName)>-1">
                      <span class="t" :class="'pkhm'+item.oddsName">{{item.oddsName}}</span>
                    </template>
                    <template v-else>
                      <span class="t">{{item.oddsName}}</span>
                    </template>
                  </template>
                  <template v-else>
                      <span class="t">{{item.oddsName}}</span>
                    </template>
                  <span v-if="isOpenOdds" class="rate">{{item.odds}}</span>
                  <span v-else class="rate">封盘中</span>
                </div>
              </template>

              <!-- 广东快乐10分-->
              <template v-if="[8809].findIndex((n) => n==bocaiTypeId)>-1">
                <div class="hm" :class="'oddsId'+item.oddsId" @click.stop="oddInto(itemPa,item)">
                  <template v-if="['两面盘'].findIndex((n) => n == bocaiCategory.name)>-1">
                    <span class="t">{{item.oddsName}}</span>
                  </template>
                  <template v-else-if="['正码'].findIndex((n) => n == bocaiCategory.name)>-1">
                    <template v-if="['正码'].findIndex((n) => n == itemPa.name)>-1">
                      <span class="t" :class="'sschm'">{{item.oddsName}}</span>
                    </template>
                    <template v-else>
                      <span class="t">{{item.oddsName}}</span>
                    </template>
                  </template>
                  <template v-else>
                    <template v-if="['大','小','单','双','合数单','合数双','尾大','尾小','东','南','西','北','中','发','白','龙','虎'].findIndex((n) => n == item.oddsName)>-1">
                      <span class="t">{{item.oddsName}}</span>
                    </template>
                    <template v-else>
                      <span class="t" :class="'sschm'">{{item.oddsName}}</span>
                    </template>
                  </template>
                  <span v-if="isOpenOdds" class="rate">{{item.odds}}</span>
                  <span v-else class="rate">封盘中</span>
                </div>
              </template>

              <!-- pc蛋蛋-->
              <template v-if="[8223].findIndex((n) => n==bocaiTypeId)>-1">
                <div class="hm" :class="'oddsId'+item.oddsId" @click.stop="oddInto(itemPa,item)">
                  <span class="t" :class="(['特码'].findIndex((n) => n == itemPa.name)>-1)? 'sschm': ''">{{item.oddsName}}</span>
                  <span v-if="isOpenOdds" class="rate">{{item.odds}}</span>
                  <span v-else class="rate">封盘中</span>
                </div>
              </template>

              <!-- 北京快乐8-->
              <template v-if="[8266].findIndex((n) => n==bocaiTypeId)>-1">
                <div class="hm" :class="'oddsId'+item.oddsId" @click.stop="oddInto(itemPa,item)">
                  <span class="t" :class="(['正码'].findIndex((n) => n == itemPa.name)>-1)? 'sschm': ''">{{item.oddsName}}</span>
                  <span v-if="isOpenOdds" class="rate">{{item.odds}}</span>
                  <span v-else class="rate">封盘中</span>
                </div>
              </template>

              <!-- 广东11选5 -->
              <template v-if="[8374,8813,8811].findIndex((n) => n==bocaiTypeId)>-1">
                <div class="hm" :class="'oddsId'+item.oddsId" @click.stop="oddInto(itemPa,item)">
                  <span class="t" :class="(['单号'].findIndex((n) => n == bocaiCategory.name)>-1)? 'sschm': ''">{{item.oddsName}}</span>
                  <span v-if="isOpenOdds" class="rate">{{item.odds}}</span>
                  <span v-else class="rate">封盘中</span>
                </div>
              </template>
              
            </li>
          </ul>
        </div>
      </div>

    </div>

    <bet-quick v-on:childByReset="childByReset"></bet-quick>

  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import BetQuick from '@/views/home/components/betQuick';

export default {
  props: {
    bocaiCategoryList: {
      type: Array
    }
  },
  components: {
    BetQuick
  },
  data () {
    return {
      curBocaiTypeId: '',
      curactiveIndex: '',
      activeIndex: '',
      showOdds: '',
      submenu: '',
      longhuhe_lmp: {},
      yiwuqiu_lmp: [],
      qianhousan_lmp: [],
      normalPay: false,
      shishiZiDatas: {},
      shishiZiDatasList: [],
      kuaixuanTouList:[],
      kuaixuanWeiList:[],
      tempList:[],
      selectedZiTd:[],
      canOrder: true,

      huiheData: {},
      boseData: {},
      temaData: {}
    }
  },
  computed: {
    ...mapGetters({
        bocaiInfoData: 'getbocaiInfoData',
        bocaiName: 'getbocaiName',
        userInfo: 'getuserInfo',
        bocaiCategory: 'getbocaiCategory',
        bocaiTypeId: 'getbocaiTypeId',
        curPeriods: 'getcurPeriods',
        isOdding: 'getisOdding',
        oddsList: 'getoddsList',
        orderList: 'getorderList',
        moneyOrder: 'getmoneyOrder',
        isOpenOdds: 'getisOpenOdds',
        orderDataList: 'getorderDataList'
      })
  },
  created() {
    //获取菠菜数据
    //this.getOddsCategory(this.bocaiCategoryList[0]);
  },
  mounted(){
    bus.$on('getOddsCategory', (data) => {
        this.getOddsCategory(data);
    });
    bus.$on('allQingkong',(data) =>{
      this.allQingkong();
    });
  },
  methods: {
    oddInto(oddsObj,item) {

      if(this.isOpenOdds) {

          if($('.oddsId'+item.oddsId).hasClass('active')){

            console.log('取消你','.oddsId'+item.oddsId);

              $('.oddsId'+item.oddsId).removeClass('active');
              _.remove(this.orderDataList, function(n) {
                return n.bocaiOddId == item.oddsId;
              });

          } else {
            $('.oddsId'+item.oddsId).addClass('active');

            let obj = {
              bocaiCategory2Id: oddsObj.id,//8225,//投注博彩分类2ID
              bocaiCategory2Name: oddsObj.name,//"混合",//投注博彩分类2名称
              bocaiOddId: item.oddsId,//5543,//投注博彩赔率ID
              bocaiOddName: item.oddsName,//"大",//投注博彩赔率名称
              bocaiValue:"",//投注内容,六合彩连肖/连尾
              normalMoney: item.normalMoney,//10000,//一般模式下，选择的金额
              orderNormal: false,   //是快捷，还是一般投注
              bocaiOdds: item.odds,//1.90//赔率
              dewaterId: item.dewaterId
            };

            this.orderDataList.push(obj);
          }

        store.commit('updateorderDataList',this.orderDataList);
      }

      console.log('orderDataList',this.orderDataList);

      bus.$emit('getoddsNum',this.orderDataList.length);
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

              }
            })
          });

      this.allQingkong();

    },
    allQingkong() {
      store.commit('updateorderDataList',[]);
      $('.game_body div').removeClass('active');
      bus.$emit('getoddsNum',this.orderDataList.length);
    },
    childByReset(data) {
      this.allQingkong();
    },
    async resetOddsCategory(item) {

      let that = this;

          const loading = this.$loading({
                lock: true,
                text: 'Loading',
                background: 'rgba(0, 0, 0, 0.7)'
              });
          await that.$get(`${window.url}/api/getOdds?bocaiTypeId=`+this.curBocaiTypeId+`&bocaiCategoryId=`+item.id).then((res) => {
            that.$handelResponse(res, (result) => {
            loading.close();
              that.showOdds = item.name;
              that.bocaiCategory = item;
              if(result.code===200){
                that.oddsList = result.oddsList;
                
                //that.orderDataList = [];
                that.normalPay = false;
                bus.$emit('getnormalPay', false); 

                that.shuaiXuanDatas(result.oddsList);

              }
            })
          });
    },
    async getnotice() {
      let res = await this.$get(`${window.url}/api/notice`);

          if(res.code===200){

            bus.$emit('getmessage', res.data);
          } else {
          }

    },
    shuaiXuanDatas(dataList) {

      if(this.showOdds == 'PC蛋蛋') {

        for(let m in dataList) {
          if(dataList[m].name == '混合') {
            this.huiheData = dataList[m];
          }
          if(dataList[m].name == '波色') {
            this.boseData = dataList[m];
          }
          if(dataList[m].name == '特码') {
            this.temaData = dataList[m];
          }
        }
      }

    }

  },
  watch: {
  }
}

</script>

<style lang="less" scoped>

</style>

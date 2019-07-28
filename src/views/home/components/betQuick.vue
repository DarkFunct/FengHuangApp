<template>
  <div class="weui-tabbar vux-demo-tabbar">
    <a href="javascript:;" class="weui-tabbar__item" @click="clearOdds()">
      <p class="weui-tabbar__label_p menuBtnL"><span>清 空</span></p>
    </a> 
    <a href="javascript:;" class="weui-tabbar__item weui-bar__item_on" @click="isOpenOdds?toBetList():''">
      <p class="weui-tabbar__label_p menuBtnR" :class="isOpenOdds?'':'closeOddA'"><span>投 注</span><span v-if="oddsNum!=0" id="selCount" class="layui-badge layui-bg-blue">{{oddsNum}}</span></p>
    </a>
  </div>

  <!-- <footer>
    <div class="bottom_btn layui-form">
      <button class="layui-btn layui-btn-normal" id="clearBtn">清空</button>
      <button class="layui-btn layui-btn-danger" id="OrderBtn">投注<span id="selCount" class="layui-badge layui-bg-blue">{{orderDataList.lenght?orderDataList.lenght:0}}</span></button>
    </div>
  </footer> -->
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
        disableBtn: true,
        choumaPay: 0,
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
        orderDataList: 'getorderDataList',
        isOpenOdds: 'getisOpenOdds'
      })
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
      async orderOdds() {

        let that = this;

        if(this.oddsNum != 0) {
          store.commit('updatecurPeriods',this.bocaiInfoData.bocaiPeriods);

          this.$isLoading(true);

            await that.$get(`${window.url}/api/getOdds?bocaiTypeId=`+this.bocaiTypeId+`&bocaiCategoryId=`+this.bocaiCategoryId).then((res) => {
              that.$handelResponse(res, (result) => {
              loading.close();

                if(result.code===200){

                  store.commit('updateoddsList',result.oddsList);

                  for(let n in that.orderDataList) {
                    for(let m in result.oddsList) {
                      if(that.orderDataList[n].bocaiCategory2Id == result.oddsList[m].id) {

                        for(let x in result.oddsList[m].list) {

                          if(that.orderDataList[n].bocaiOddId == result.oddsList[m].list[x].oddsId) {

                            that.orderDataList[n].bocaiOdds = result.oddsList[m].list[x].odds;
                          }
                        }
                      }
                    }
                  }

                  store.commit('updateorderDataList',that.orderDataList);


                  that.toBetList();

                }
              })
            });
        }


      },

      toBetList() {
        console.log('this.bocaiInfoData',this.bocaiInfoData);

        if(!this.isOpenOdds){
          this.$alertMessage('请输入金额!', '温馨提示');
        } else {

          store.commit('updateorderList',[]);

          for(let n in this.orderDataList) {

            let obj = {};

            if(this.orderDataList[n].bocaiValue == '') {
              obj.bocaiCategory2Name = this.orderDataList[n].bocaiCategory2Name,
              obj.bocaiOddName = this.orderDataList[n].bocaiOddName,
              obj.bocaiOdds = this.orderDataList[n].bocaiOdds,
              obj.betsMoney = ''
            } else {
              obj.bocaiCategory2Name = this.orderDataList[n].bocaiCategory2Name,
              obj.bocaiOddName = this.orderDataList[n].bocaiOddName,
              obj.bocaiOdds = this.orderDataList[n].bocaiOdds,
              obj.betsMoney = ''
            }

            this.orderList.push(obj);
          }

          store.commit('updateorderList',this.orderList);

          this.$router.push({name:'betList'});

        }
      },
      clearOdds() {
        this.$emit('childByReset', '');
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

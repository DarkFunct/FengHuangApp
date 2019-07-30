<template>
  <div id="cp-container" class="layui-container layui-clear layui-border-box">
    <div class="layui-row layui-col-space10" v-for="(itemPa,indexPa) in bocaiTypeListTemp">
      <div class="layui-col-xs4" v-for="(item,index) in itemPa">
        <div>
          <a @click="getOdds(item)"><img :src="require('@/assets/img/icon'+item.bocaiId+'.png')" width="70px" height="70px"><br><span>{{item.bocaiName}}</span></a>
          <p><span class="time" :class="'bocaiTiem'+item.bocaiId"></span></p>
        </div>
      </div>

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
      bocaiInfoList: [],
      t1: null,
      t2: null
    }
  },
  async created() {
    this.getBocaiList20sOnce();

    this.gettimeLeft();
  },
  computed: {
    ...mapGetters({
      bocaiTypeList: 'getbocaiTypeList',
      completeOddList: 'getcompleteOddList',
      bocaiInfoData: 'getbocaiInfoData'
    }),
    bocaiTypeListTemp() {
      let arr = [];
      for(let x in this.bocaiTypeList) {
        if(this.completeOddList.findIndex((n) => n==this.bocaiTypeList[x].bocaiId)>-1) {
          arr.push(this.bocaiTypeList[x]);
        }
      }
      return _.chunk(arr,3) || [];
    },
    differTime() {
        let now = new Date();
        return this.bocaiInfoData.nowTime ? now.getTime() - this.bocaiInfoData.nowTime*1000 : 0;
    }
  },
  beforeDestroy: function() {
      if (this.t1) {
        clearTimeout(this.t1)
      }
      if (this.t2) {
        clearTimeout(this.t2)
      }
  },
  methods: {
    async getBocaiList() { 

      let res = await this.$get(`${window.url}//api/bocaiMainPage`);

      if(res.code===200){
        this.bocaiInfoList = res.data.data;

      }
    }, 
    async getBocaiList20sOnce() { 
      console.log('20秒调一次');

      let res = await this.$get(`${window.url}//api/bocaiMainPage`);

      if(res.code===200){
        this.bocaiInfoList = res.data.data;

      }

      this.t2 = setTimeout(this.getBocaiList20sOnce, window.refreshTime);
    },

    //切换菠菜获取菠菜二级菜单并调数据接口
    async getOdds(item) {

      bus.$emit('togetOdds',item);

      // console.log('item',item);

      // if(['重庆时时彩','极速时时彩','广东快乐十分','极速赛车','幸运飞艇','北京赛车','江苏快3'].findIndex((n) => n==item.bocaiName)>-1) {

      //   store.commit('updatebocaiTypeId',item.bocaiId);

      //   store.commit('updatebocaiName',item.bocaiName);

      //   this.$router.push({path: '/game/'+item.bocaiId});

      // } else {

      //   this.$toast('此菠菜未完成，请等待！');

      // }

      
    },
    gettimeLeft() {

      if(this.bocaiInfoList.length != 0) {

        for(let n in this.bocaiInfoList) {

          let timeLeft = '';
          let now = new Date();
          let leftTime = this.bocaiInfoList[n].openPrizeTime*1000 - now.getTime() + this.differTime;


          console.log('this.bocaiInfoList[n].openPrizeTime',this.bocaiInfoList[n].openPrizeTime);

          console.log('this.bocaiInfoList[n].closeTimeSet',this.bocaiInfoList[n].closeTimeSet);

          let closeTime = leftTime - this.bocaiInfoList[n].closeTimeSet*1000;

          if(closeTime<=0) {

            timeLeft = '00' + ":" + '00';

            $('.bocaiTiem'+this.bocaiInfoList[n].bocaiTypeId).html(timeLeft);

            this.getBocaiList();

          } else if(closeTime>0) {

            console.log('closeTime',closeTime);

            let ms = parseInt(closeTime % 1000).toString();
            closeTime = parseInt(closeTime / 1000); 
            let o = Math.floor(closeTime / 3600);
            let d = Math.floor(o / 24);
            let m = Math.floor(closeTime / 60 % 60);
            let s = closeTime % 60;

            timeLeft = (m*1> 9 ? m : '0'+ m) + ":" + (s*1 > 9 ? s : '0'+ s);

            $('.bocaiTiem'+this.bocaiInfoList[n].bocaiTypeId).html(timeLeft);

            console.log('timeLeft',timeLeft);
          } else {
            timeLeft = '00' + ":" + '00';

            $('.bocaiTiem'+this.bocaiInfoList[n].bocaiTypeId).html(timeLeft);
          }


        }

      }


      this.t1 = setTimeout(this.gettimeLeft, 1000);

    }
  },
  mounted() {
  },
  updated() {
  }
};


</script>
<style scoped lang="less">


</style>
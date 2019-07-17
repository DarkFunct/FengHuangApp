<template>
  <div id="cp-container" class="layui-container layui-clear layui-border-box">
    <div class="layui-row layui-col-space10" v-for="(itemPa,indexPa) in bocaiTypeListTemp">
      <div class="layui-col-xs4" v-for="(item,index) in itemPa">
        <div>
          <a @click="getOdds(item,index)"><img :src="'./static/img/'+item.bocaiName+'.png'" width="70px" height="70px"><br><span>{{item.bocaiName}}</span></a>
          <p><span class="time">00:29</span></p>
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
      showSubMenu: false,
      iskaipaning: true,

      dialogMessage: '',
      submenu: '',
      hasResult: false,
      messageinfo: '',
      centerDialogVisible: false,
      bocaiCategoryList: []

    }
  },
  async created() {
    // if(this.bocaiTypeList.length == 0) {
    //   console.log('????111111?');
    //   this.getBocai();
    // } else {
    //   console.log('????2222?');
    // }

    this.openPrizeTime = this.$timestampToTimeRi(new Date());


    //只循环一个
    //this.getBocaiInfo5sOnce();
  },
  computed: {
    ...mapGetters({
      bocaiTypeList: 'getbocaiTypeList'
    }),
    bocaiTypeListTemp() {
      return _.chunk(this.bocaiTypeList,3) || [];
    }
  },
  methods: {
    async getBocai() {
      let res = await this.$get(`${window.url}/api/getBocai`);

          if(res.code===200){
            store.commit('updatebocaiTypeList',res.bocaiTypeList);
          }
    },
    async getBocaiInfo5sOnce() { 
      //console.log('5秒调一次','this.preResult',this.preResult,'this.iskaipaning',this.iskaipaning);

       if(this.preResult == '' || !this.iskaipaning) {

        let res = await this.$get(`${window.url}/api/bocaiInfo?bocaiTypeId=`+this.bocaiTypeId);

            if(res.code===200){

              //if("companyIsOpenSet": "",//该会员上级公司对该期博彩的封盘状态。状态：0删除，1封盘，2开盘。只有开盘才能投注。)   未做
               //if("isOpenSet": "",//管理员对于当期博彩的开关设置) 

              if(res.data.companyIsOpenSet == 2) {
                if(res.data.isOpenSet == 1) {
                  bus.$emit('iskaipaning', true);

                  bus.$emit('getbocaiInfoData', res.data);

                  store.commit('updatebocaiInfoData',res.data);

                  store.commit('updatepreResult',res.data.preResult);


                  if(res.data.preResult != '') {

                    //开奖了
                    bus.$emit('kaijianglaaa', '');
                  }

                  console.log('this.preResult',this.preResult);
                } else {
                  bus.$emit('iskaipaning', false);
                }
              } else {
                bus.$emit('iskaipaning', false);
              }

            }

       }

        this.t2 = setTimeout(this.getBocaiInfo5sOnce, window.refreshTimeFast);
    },
    //切换菠菜获取菠菜二级菜单并调数据接口
    async getOdds(item,index) {

      if(['重庆时时彩','极速时时彩','广东快乐十分','极速赛车','幸运飞艇','北京赛车','江苏快3'].findIndex((n) => n==item.bocaiName)>-1) {

        store.commit('updatebocaiTypeId',item.bocaiId);

        store.commit('updatebocaiName',item.bocaiName);

        this.$router.push({path: '/game/'+item.bocaiId});

      } else {

        this.$toast('此菠菜未完成，请等待！');

      }

      
    }
  },
  mounted() {
    bus.$on('getcUserInfo', (data) => {
        this.getcUserInfo();
    });
    bus.$on('iskaipaning', (data) => {
        this.iskaipaning = data;
    });
  },
  updated() {
  }
};


</script>
<style scoped lang="less">


</style>
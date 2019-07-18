<template>
  <div id="cp-container" class="layui-container layui-clear layui-border-box">
    <div class="layui-row layui-col-space10" v-for="(itemPa,indexPa) in bocaiTypeListTemp">
      <div class="layui-col-xs4" v-for="(item,index) in itemPa">
        <div>
          <a @click="getOdds(item)"><img :src="'./static/img/'+item.bocaiName+'.png'" width="70px" height="70px"><br><span>{{item.bocaiName}}</span></a>
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
    }
  },
  async created() {
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
<template>
  <div id="home" style="height:100%;">

    <drawer
    width="5.333rem;"
    :show.sync="drawerVisibility"
    :show-mode="showModeValue"
    :placement="placement"
    :drawer-style="{'background-color':'#35495e', width: '5.333rem'}">

      <div slot="drawer">
        <group title="选择玩法">
          <ul>
            <li style="padding-left:45px" @click="goHome()">返回首页</li>
            <li v-for="(item,index) in bocaiTypeList" @click="getOdds(item)" v-if="completeOddList.findIndex((n) => n==item.bocaiTypeId)>-1">
              <img :src="require('@/assets/img/icon'+item.bocaiTypeId+'.png')" width="20px">{{item.bocaiTypeName}}
            </li>
          </ul>
        </group>
      </div>

      <view-box ref="viewBox" :body-padding-top="isShowHeader ? '1.227rem' : '0'" body-padding-bottom="1.255rem" style="background-color: #fff;">

        <x-header
          v-if="isShowHeader"
          slot="header"
          style="width:100%;position:absolute;left:0;top:0;z-index:100;"
          :left-options="showBack"
          @on-click-back="clickBack"
          :title="headTitle"
          >
          <span v-if="showMore" slot="right" @click="clickRight">
            <x-icon v-if="$route.name == 'game'" type="navicon" size="35" style="fill:#fff;position:relative;top:-8px;right:-3px;"></x-icon>
          </span>
        </x-header>

        <transition>

          <router-view class="router-view"></router-view>

        </transition>

        <tabbar class="vux-demo-tabbar" icon-class="vux-center" v-if="isShowBar" slot="bottom">
          <tabbar-item link="/home/bocaiList" :class="$route.path == '/home/bocaiList' ? 'selected':''">
            <img slot="icon" :src="$route.path == '/home/bocaiList' ? require('@/assets/img/shouye-selected.png') : require('@/assets/img/shouye.png')">
            <span slot="label">首页</span>
          </tabbar-item>
          <tabbar-item link="/home/userInfo" :class="$route.path == '/home/userInfo' ? 'selected':''">
            <img slot="icon" :src="$route.path == '/home/userInfo' ? require('@/assets/img/wode-selected.png') : require('@/assets/img/wode.png')">
            <span slot="label">我的</span>
          </tabbar-item>
        </tabbar>

      </view-box>


    </drawer>

    <!-- v-clickoutside="closeRightMenu" -->

    <div id="right_menu" class="vux-drawer-content right_menu drawer-right" style="background-color: rgb(53, 73, 94); width: 5.333rem;">
      <div>
        <div>
          <div class="weui-cells__title">会员中心</div>  
          <div class="weui-cells"> 

            <ul>
              <li @click="goRightMenu('instantorder')">即时注单</li>
              <li @click="goRightMenu('bettingHistory')">下注历史</li>
              <li @click="goRightMenu('personalinfo')">个人资讯</li>
              <li v-if="userInfo.cashCredit == 0" @click="goRightMenu('caiwumanager')">财务管理</li>
              <li @click="goRightMenu('lotteryResults')">开奖结果</li>
              <li @click="goRightMenu('rules')">游戏规则</li>
            </ul>

          </div> 
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import clickoutside from '../assets/js/clickoutside.js';

export default {
  data () {
    return {
      entryUrl: document.location.href,
      drawerVisibility: false,
      showMode: 'push',
      showModeValue: 'push',
      path: '',

      placement: 'left',
      showRightMenu: false,


      icons:[
            require('@/assets/img/icon1.png'),
          ],
    }
  },
  components: {
  },
  computed: {
    ...mapGetters({
      bocaiTypeList: 'getbocaiTypeList',
      isLoading: 'getisLoading',
      bocaiName: 'getbocaiName',
      userInfo: 'getuserInfo',
      completeOddList: 'getcompleteOddList'
    }),
    isShowBar () {
      if (this.$route.path.indexOf('home') > -1) {
        return true
      } else {
        return false
      }
    },
    isShowHeader() {
      if (['userInfo'].findIndex((n) => n==this.$route.name)>-1) {
        return false
      } else {
        return true
      }
    },
    showBack() {
      if (this.$route.name == 'game') {
        return {preventGoBack:true,backText:this.bocaiName}
      } else if(['bocaiList','userInfo'].findIndex((n) => n==this.$route.name)>-1) {
        return {showBack:false}
      } else {
        return {showBack:true}
      }
    },
    showMore() {
      if (this.$route.name == 'game') {
        return true
      } else {
        return false
      }
    },
    headTitle() {

      let title = '凤凰';

        switch (this.$route.name) {
          case 'game':
            title = '';
            break;
          case 'rules':
            title = '游戏规则';
            break;
          case 'betList':
            title = '投注列表';
            break;
          case 'bettingHistory':
            title = '下注历史';
            break;
          case 'instantorder':
            title = '即时注单';
            break;
          case 'personalinfo':
            title = '个人资讯';
            break;
          case 'caiwumanager':
            title = '财务管理';
            break;
          case 'lotteryResults':
            title = '开奖结果';
            break;
        }

      return title;
    }
  },
  mounted() {
    bus.$on('togetOdds', (data) => {
        this.getOdds(data);
    });
    bus.$on('getcUserInfo', (data) => {
        this.getcUserInfo();
    });
  },
  created() {
    this.getcUserInfo();
    this.gotobocai();
  },
  methods: {
    goHome() {
      this.$router.push({name: 'bocaiList'});
      this.drawerVisibility = false;
    },
    async gotobocai() {
      let res = await this.$get(`${window.url}/api/bocaiMainPage`);
          if(res.code===200){
            store.commit('updatebocaiTypeList',res.data.data);

            bus.$emit('getbocaiTypeList');
          }
    },
    async getcUserInfo() {
      let res = await this.$get(`${window.url}/api/cUserInfo`);

      if(res.code===200){
        store.commit('updateuserInfo',res.data);
        bus.$emit('newUserInfo','');
      }
    },
    goRightMenu(path) {
      this.$router.push({name: path});
      this.drawerVisibility = false;

      if($('.vux-drawer-content.drawer-right').hasClass('vux-drawer-active')) {
        $('.vux-drawer-content.drawer-right').removeClass('vux-drawer-active');

        $('.vux-drawer-body').css({"transform":"translate3d(0px, 0px, 0px)"});

        $('.drawer-mask.vux-drawer-active').removeClass('vux-drawer-active');

      }
      
    },
    clickBack() {
      //console.log('clickBack');
      //this.placement = 'left';
      this.drawerVisibility = true;
    },
    clickRight() {
      //console.log('clickRight');

      $('.vux-drawer-content.right_menu.drawer-right').addClass('vux-drawer-active');

      $('.vux-drawer-body').css({"transform":"translate3d(-5.333rem, 0px, 0px)"});

      $('.drawer-mask').addClass('vux-drawer-active');
    },
    async getOdds(item) {


      if(['重庆时时彩','PC蛋蛋','极速时时彩','北京快乐8','广东快乐十分','极速赛车','幸运飞艇','北京赛车','江苏快3','广东11选5'].findIndex((n) => n==item.bocaiTypeName)>-1) {

        store.commit('updatebocaiTypeId',item.bocaiTypeId);

        store.commit('updatebocaiName',item.bocaiTypeName);

        this.$router.push({path: '/game/'+item.bocaiTypeId});

        bus.$emit('togetOddsInfo','');

        this.drawerVisibility = false;

      } else {

        this.$toast('此菠菜未完成，请等待！');

      }

    }
  },
  directives: {
    clickoutside
  },
  beforeDestroy () {
  },
  watch: {
  }

}
</script>

<style scoped lang="less">


</style>
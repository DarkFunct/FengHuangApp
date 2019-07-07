<template>
  <div id="home" style="height:100%;">

    <drawer
    width="200px;"
    :show.sync="drawerVisibility"
    :show-mode="showModeValue"
    :placement="placement"
    :drawer-style="{'background-color':'#35495e', width: '200px'}">

      <!-- drawer content -->
      <div slot="drawer">
        <group title="选择玩法">
          <ul>
            <li style="padding-left:45px"><img slot="icon" :src="$route.path =='./../../static/img/shouye.png'"> 返回首页</li>
            <li v-for="(item,index) in bocaiTypeList" @click="getOdds(item,index)"><img :src="'./static/img/'+item.bocaiName+'.png'" width="20px">{{item.bocaiName}}</li>
          </ul>

          <!-- <cell title="返回首页" link="/home/bocaiList" value="首页" @click.native="drawerVisibility = false">
          </cell>
          <cell title="Buy me a coffee" link="project/donate" @click.native="drawerVisibility = false">
          </cell>
          <cell title="Github" link="http://github.com/airyland/vux" value="Star me" @click.native="drawerVisibility = false">
          </cell> -->

        </group>
      </div>


      <!-- <div id="right_menu" class="vux-drawer-content drawer-right vux-drawer-active" style="background-color: rgb(53, 73, 94); width: 200px;">
        <div>
          <div class="martop20">
            <div class="weui-cells__title">选择玩法</div>  
            <div class="weui-cells"> 
              <ul>
                  <li onclick="$.game.showDetail();"><i class="layui-icon"></i> 未结注单</li>
                  <li onclick="$.game.showResult();"><i class="layui-icon"></i> 开奖结果</li>
                  <li onclick="$.game.showReport();"><i class="layui-icon"></i> 历史报表</li>
                  <li onclick="$.game.showRule();"><i class="layui-icon"></i> 游戏规则</li>
                  <li onclick="$.game.showXe();"><i class="layui-icon"></i> 游戏限额</li>
                  <li><a href="/m/user" style="color:#000"><i class="layui-icon"></i> 会员中心</a></li>
                  <li><a href="/m/recharge" style="color:#000"><i class="icon icon-11"></i> 在线充值</a></li>
                  <li><a href="/m/withdraw" style="color:#000"><i class="icon icon-42"></i> 在线取款</a></li>
              </ul>
              <div class="weui-cell vux-tap-active weui-cell_access">
                <div class="weui-cell__hd"></div> 
                <div class="vux-cell-bd vux-cell-primary">
                  <p><label class="vux-label">会员中心</label></p> 
                  <span class="vux-label-desc"></span>
                </div> 
                <div class="weui-cell__ft">首页</div> 
              </div> 
            </div>
          </div>
        </div>
      </div> -->

      <!-- main content -->
      <view-box ref="viewBox" :body-padding-top="isShowHeader ? '1.227rem' : '0'" body-padding-bottom="1.315rem">

        <x-header
          v-if="isShowHeader"
          slot="header"
          style="width:100%;position:absolute;left:0;top:0;z-index:100;"
          :left-options="showBack"
          @on-click-back="clickBack"
          :title="headTitle"
          >
          <span v-if="showMore" slot="right" @click="clickRight">
            <x-icon type="navicon" size="35" style="fill:#fff;position:relative;top:-8px;right:-3px;"></x-icon>
          </span>
        </x-header>

        <!-- remember to import BusPlugin in main.js if you use components: x-img and sticky -->
        <transition>

          <router-view class="router-view"></router-view>

        </transition>

        <tabbar class="vux-demo-tabbar" icon-class="vux-center" v-if="isShowBar" slot="bottom">
          <tabbar-item link="/home/bocaiList" :class="$route.path == '/home/bocaiList' ? 'selected':''">
            <img slot="icon" :src="$route.path == '/home/bocaiList' ? './../../static/img/shouye-selected.png':'./../../static/img/shouye.png'">
            <span slot="label">首页</span>
          </tabbar-item>
          <tabbar-item link="/home/userInfo" :class="$route.path == '/home/userInfo' ? 'selected':''">
            <img slot="icon" :src="$route.path == '/home/userInfo' ? './../../static/img/wode-selected.png':'./../../static/img/wode.png'">
            <span slot="label">我的</span>
          </tabbar-item>
        </tabbar>

      </view-box>


    </drawer>

    <div v-if="showRightMenu" v-clickoutside="closeRightMenu" id="right_menu" class="vux-drawer-content right_menu drawer-right" style="background-color: rgb(53, 73, 94); width: 200px;"><div data-v-7eb2bc79=""><div data-v-7eb2bc79="" class="martop20"><div class="weui-cells__title">会员中心</div>  <div class="weui-cells"> <div data-v-7eb2bc79="" class="weui-cell vux-tap-active weui-cell_access"><div class="weui-cell__hd"></div> <div class="vux-cell-bd vux-cell-primary"><p><label class="vux-label">返回首页</label> </p> <span class="vux-label-desc"></span></div> <div class="weui-cell__ft"> 首页</div> </div> <div data-v-7eb2bc79="" class="weui-cell vux-tap-active weui-cell_access"><div class="weui-cell__hd"></div> <div class="vux-cell-bd vux-cell-primary"><p><label class="vux-label">Buy me a coffee</label> </p> <span class="vux-label-desc"></span></div> <div class="weui-cell__ft"> </div> </div> <div data-v-7eb2bc79="" class="weui-cell vux-tap-active weui-cell_access"><div class="weui-cell__hd"></div> <div class="vux-cell-bd vux-cell-primary"><p><label class="vux-label">Github</label> </p> <span class="vux-label-desc"></span></div> <div class="weui-cell__ft"> Star me </div> </div></div> </div></div></div>

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
      showRightMenu: false
    }
  },
  components: {
  },
  computed: {
    ...mapGetters({
      bocaiTypeList: 'getbocaiTypeList',
      isLoading: 'getisLoading',
      headTitle: 'getheadTitle',
      bocaiName: 'getbocaiName'
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
      if (this.$route.path.indexOf('game') > -1) {
        return {preventGoBack:true,backText:this.bocaiName}
      } else if(['bocaiList','userInfo'].findIndex((n) => n==this.$route.name)>-1) {
        return {showBack:false}
      } else {
        return {showBack:true}
      }
    },
    showMore() {
      if (this.$route.path.indexOf('game') > -1) {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    clickBack() {
      console.log('clickBack');
      //this.placement = 'left';
      this.drawerVisibility = true;
    },
    clickRight() {
      console.log('clickRight');
      // this.placement = 'right';
      // this.drawerVisibility = true;

      this.showRightMenu = true;

      $('.vux-drawer-content.drawer-right').addClass('vux-drawer-active');

      $('.vux-drawer-body').css({"transform":"translate3d(-200px, 0px, 0px)"});

      $('.drawer-mask').addClass('vux-drawer-active');
      // vux-drawer-content drawer-right
    },
    closeRightMenu() {
      console.log('closeRightMenu');

      if($('.vux-drawer-content.drawer-right').hasClass('vux-drawer-active')) {
        $('.vux-drawer-content.drawer-right').removeClass('vux-drawer-active');

        $('.vux-drawer-body').css({"transform":"translate3d(0px, 0px, 0px)"});

        $('.drawer-mask').removeClass('vux-drawer-active');

        this.showRightMenu = false;

      }
      
    },
    getOdds(ef,efs) {
      console.log('getOdds');
    }
  },
  directives: {
    clickoutside
  },
  mounted () {
  },
  beforeDestroy () {
  },
  watch: {
  }

}
</script>

<style scoped lang="less">


</style>
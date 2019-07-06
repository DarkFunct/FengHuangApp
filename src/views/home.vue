<template>
  <div id="home" style="height:100%;">

    <drawer
    width="200px;"
    :show.sync="drawerVisibility"
    :show-mode="showModeValue"
    placement="right"
    :drawer-style="{'background-color':'#35495e', width: '200px'}">

      <!-- drawer content -->
      <div slot="drawer">
        <group title="选择玩法" style="margin-top:20px;">
          <cell title="返回首页" link="/home/bocaiList" value="首页" @click.native="drawerVisibility = false">
          </cell>
        <!--   bocaiTypeList

          <el-menu-item v-for="(item,index) in bocaiTypeList" :key="index" :index="item.bocaiName"  @click.native="getOdds(item,index)" v-if="index*1 < 8">{{item.bocaiName}}</el-menu-item> -->

          <cell title="Buy me a coffee" link="project/donate" @click.native="drawerVisibility = false">
          </cell>
          <cell title="Github" link="http://github.com/airyland/vux" value="Star me" @click.native="drawerVisibility = false">
          </cell>
        </group>
      </div>

      <!-- main content -->
      <view-box ref="viewBox" :body-padding-top="isShowHeader ? '1.227rem' : '0'" body-padding-bottom="1.467rem">

        <x-header
          v-if="isShowHeader"
          slot="header"
          style="width:100%;position:absolute;left:0;top:0;z-index:100;"
          :left-options="showBack"
          :title="headTitle"
          @on-click-more="onClickMore">
          <span v-if="showMore" slot="overwrite-left" @click.native="drawerVisibility = !drawerVisibility">
            <x-icon type="navicon" size="35" style="fill:#fff;position:relative;top:-8px;left:-3px;"></x-icon>
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

  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data () {
    return {
      entryUrl: document.location.href,
      showMenu: false,
      menus: {
        'language.noop': '<span class="menu-title">Language</span>',
        'zh-CN': '中文',
        'en': 'English'
      },
      drawerVisibility: false,
      showMode: 'push',
      showModeValue: 'push',
      showPlacement: 'left',
      showPlacementValue: 'left',
      path: ''
    }
  },
  components: {
  },
  methods: {
    onShowModeChange (val) {
      /** hide drawer before changing showMode **/
      this.drawerVisibility = false
      setTimeout(one => {
        this.showModeValue = val
      }, 400)
    },
    onPlacementChange (val) {
      /** hide drawer before changing position **/
      this.drawerVisibility = false
      setTimeout(one => {
        this.showPlacementValue = val
      }, 400)
    },
    onClickMore () {
      this.showMenu = true
    },
    changeLocale (locale) {
      this.$i18n.set(locale)
      this.$locale.set(locale)
    },
    // ...mapActions([
    //   'updateDemoPosition'
    // ])
  },
  mounted () {
    this.handler = () => {
      if (this.path === '/demo') {
        this.box = document.querySelector('#demo_list_box')
        // this.updateDemoPosition(this.box.scrollTop)
      }
    }
  },
  beforeDestroy () {
    this.box && this.box.removeEventListener('scroll', this.handler, false)
  },
  watch: {
    path (path) {
      if (path === '/component/demo') {
        this.$router.replace('/demo')
        return
      }
      if (path === '/demo') {
        setTimeout(() => {
          this.box = document.querySelector('#demo_list_box')
          if (this.box) {
            this.box.removeEventListener('scroll', this.handler, false)
            this.box.addEventListener('scroll', this.handler, false)
          }
        }, 1000)
      } else {
        this.box && this.box.removeEventListener('scroll', this.handler, false)
      }
    }
  },
  computed: {
    ...mapGetters({
      bocaiTypeList: 'getbocaiTypeList',
      isLoading: 'getisLoading',
      showMore: 'getshowMore',
      showBack: 'getshowBack',
      headTitle: 'getheadTitle'
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
    }
  }

}
</script>

<style scoped lang="less">


</style>
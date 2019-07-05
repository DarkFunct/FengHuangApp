<template>
  	<div id="app" @touchstart="bodyTouchStart" @touchmove="bodyTouchMove" @touchend="bodyTouchEnd">
        <router-view />
        <div v-transfer-dom>
          <loading v-model="isLoading"></loading>
        </div>
    </div>
</template>


<script>
import { mapGetters } from 'vuex'

var swidth = document.documentElement.clientWidth;
export default {
	name: 'App',
    data() {
        return {
            touchLeft: swidth*2/5,  //划动起点界限，起点在靠近屏幕左侧时才有效
            touchStartPoint: 0,     //记录起始点X坐标
            distance: 0,           //记录划动的距离
            backBtn: 0,            //回退按钮的dom，根据页面上是否存在此dom来判断该路由是否可回退
        }
    },
    computed: {
        ...mapGetters({
          isLoading: 'getisLoading'
        })
      },
    components: {
  	},
    created() {
        console.log('isLoading',this.isLoading);   
    },
    methods: {
        bodyTouchStart(event){
            this.backBtn = document.getElementsByClassName("container-view").length;
            if(this.backBtn){
                this.touchStartPoint = event.targetTouches[0].pageX;
                this.distance = 0;
            }
        },
        bodyTouchMove(event) {
            if (this.backBtn && this.touchStartPoint < this.touchLeft) {
                // 只监听单指划动，多指划动不作响应
                if (event.targetTouches.length > 1) {
                    return;
                }
                // 实时计算distance
                this.distance = event.targetTouches[0].pageX - this.touchStartPoint;
                if (this.distance < 0) { // driver组件是右滑，所以totalDiff不能小于0
                    this.distance = 0;
                } else if (this.distance > swidth) { // 这里maxMoveDistance为屏幕宽度
                    this.distance = swidth;
                }
                let el = document.getElementsByClassName("container-view")[this.backBtn-1];
                this.translate(el, this.distance, 0); // 对组件进行滑动
            }
        },
        bodyTouchEnd(event){
            if (this.backBtn && this.touchStartPoint < this.touchLeft) {
                this.touchStartPoint = 0;
                let el = document.getElementsByClassName("container-view")[this.backBtn-1];
                if (this.distance > this.touchLeft) {
                    this.translate(el, swidth, 0, {
                        transitionTimingFunction: 'linear',
                        transitionDuration: '.1s'
                    })
                    this.$router.goBack('');
                } else {
                    this.distance = 0;
                    this.translate(el, this.distance, 0)
                }
            }
        },
        translate(el, x, y, options) {
            const defaultOptions = {
                useTransfrom: true,
                transitionTimingFunction: 'cubic-bezier(0.165, 0.84, 0.44, 1)',
                transitionDuration: '.2s'
            }
            for (let option in options) {
                defaultOptions[option] = options[option]
            }
            if (defaultOptions.useTransfrom) {
                el.style.transform = `translate3d(${x}px,${y}px,0)`
                el.style.transitionProperty = 'transform'
                el.style.transitionTimingFunction = defaultOptions.transitionTimingFunction
                el.style.transitionDuration = defaultOptions.transitionDuration
            } else {
                el.style.left = x
                el.style.top = y
            }
        }
    }
}
</script>

<style scoped type="text/css">
    
</style>

<style lang="less">
@import '~vux/src/styles/reset.less';
@import '~vux/src/styles/1px.less';
@import '~vux/src/styles/tap.less';

body {
  background-color: #fbf9fe;
}
html, body {
  height: 100%;
  width: 100%;
  overflow-x: hidden;
}

.demo-icon-22 {
  font-family: 'vux-demo';
  font-size: 22px;
  color: #888;
}
.weui-tabbar.vux-demo-tabbar {
  /** backdrop-filter: blur(10px);
  background-color: none;
  background: rgba(247, 247, 250, 0.5);**/
}
.vux-demo-tabbar .weui-bar__item_on .demo-icon-22 {
  color: #F70968;
}
.vux-demo-tabbar .weui-tabbar_item.weui-bar__item_on .vux-demo-tabbar-icon-home {
  color: rgb(53, 73, 94);
}
.demo-icon-22:before {
  content: attr(icon);
}
.vux-demo-tabbar-component {
  background-color: #F70968;
  color: #fff;
  border-radius: 7px;
  padding: 0 4px;
  line-height: 14px;
}
.weui-tabbar__icon + .weui-tabbar__label {
  margin-top: 0!important;
}
.vux-demo-header-box {
  z-index: 100;
  position: absolute;
  width: 100%;
  left: 0;
  top: 0;
}

.demo-icon {
  font-family: 'vux-demo';
  font-size: 20px;
  color: #04BE02;
}

.demo-icon-big {
  font-size: 28px;
}

.demo-icon:before {
  content: attr(icon);
}

.router-view {
  width: 100%;
  top: 46px;
}
.vux-pop-out-enter-active,
.vux-pop-out-leave-active,
.vux-pop-in-enter-active,
.vux-pop-in-leave-active {
  will-change: transform;
  transition: all 500ms;
  height: 100%;
  top: 46px;
  position: absolute;
  backface-visibility: hidden;
  perspective: 1000;
}
.vux-pop-out-enter {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
.vux-pop-out-leave-active {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.vux-pop-in-enter {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.vux-pop-in-leave-active {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
.menu-title {
  color: #888;
}
</style>
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './vuex/store';
import '@/filters'
import "babel-polyfill"
import 'lib-flexible/flexible'
import '@/assets/scss/index.scss'

import $ from 'jquery'
import _ from './assets/js/lodash.js';
import axios from 'axios';

import util from './assets/js/util.js';
Vue.use(util);
import config from './assets/js/config.js';
Vue.use(config);
import cookie from './assets/js/cookie';
import _g from './assets/js/global';
import request from './assets/js/request.js';
Vue.use(request);

import { Group,Cell,Loading,XInput,XButton,Alert } from 'vux'

Vue.component('x-input', XInput)
Vue.component('loading', Loading)
Vue.component('group', Group)
Vue.component('cell', Cell)
Vue.component('x-button', XButton)
Vue.component('alert', Alert)


import FastClick from 'fastclick'
FastClick.attach(document.body)

import VueScroller from 'vue-scroller'
Vue.use(VueScroller)

import transition from '@/components/layout/transition';
Vue.component('lg-transition', transition);

Vue.config.productionTip = false

window.router = router;
window.store = store;
window.axios = axios;
window._ = _;
window._g = _g;
window.cookie = cookie;
window.ENV = ENV;
const bus = new Vue();
window.bus = bus;


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

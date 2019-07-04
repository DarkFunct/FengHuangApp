import Vue from 'vue'
import Router from 'vue-router'
import store from '@/vuex/store'
import cookie from '../assets/js/cookie'

Vue.use(Router)

Router.prototype.goBack = function (val) {
  store.commit('updatedirection', val);
  if(store.state.direction == 'tip'){
    window.history.go(-1);
  }else{
    setTimeout(()=>{window.history.go(-1)},50);
  }
}

const router =  new Router({
  routes: [
    {
      path: '/', name: 'index', component: r => require.ensure([], () => r(require('./../App')), 'index'),redirect: '/login'
    },
    {
      path: '/login', name: 'login', component: r => require.ensure([], () => r(require('@/views/login')), 'login')
    },
    // { path: '/gambling/luckyairship', name: 'luckyairship',
    //       meta: {
    //           requireAuth: true,
    //       },
    //       component: r => require.ensure([], () => r(require('@/views/apps/bocai/luckyairship')), 'luckyairship'), meta: { requiresAuth: true }
    // }
  ]
})



router.beforeEach((to, from, next) => {

  let token = cookie.getCookie('accesstoken');

    if (to.matched.some(r => r.meta.requireAuth)) {
        if (token) {
            next();
        }
        else {
            next({
                path: '/login'
            })
        }
    }
    else {
        next();
    }
});

router.afterEach((to, from) => {
  if(store.state.direction !== 'tip')
    store.commit('updatedirection', 'tip');
})

export default router;

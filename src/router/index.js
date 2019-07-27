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
    {
      path: '/togambling',name: 'userAgreement',meta: { requireAuth: true, },
      component: r => require.ensure([], () => r(require('@/views/userAgreement')), 'userAgreement')
    },
    {
      path: '/home', name: 'home', component: r => require.ensure([], () => r(require('@/views/home')), 'home'),
      children: [
        { path: '/home/bocaiList', name: 'bocaiList',
          meta: {                                
              requireAuth: true,
          },
          component: r => require.ensure([], () => r(require('@/views/home/bocaiList')), 'bocaiList'), meta: { requiresAuth: true }
        },
        { path: '/home/userInfo', name: 'userInfo',
          meta: {                                
              requireAuth: true,
          },
          component: r => require.ensure([], () => r(require('@/views/home/userInfo')), 'userInfo'), meta: { requiresAuth: true }
        },
        { path: '/home/changePassword', name: 'changePassword',
          meta: {                                
              requireAuth: true,
          },
          component: r => require.ensure([], () => r(require('@/views/home/changePassword')), 'changePassword'), meta: { requiresAuth: true }
        },

        { path: '/game/:id', name: 'game',
          meta: {                                
              requireAuth: true,
          },
          component: r => require.ensure([], () => r(require('@/views/home/game')), 'game'), meta: { requiresAuth: true }
        },

        { path: '/menu/rules', name: 'rules',
          meta: {                                
              requireAuth: true,
          },
          component: r => require.ensure([], () => r(require('@/views/home/rules')), 'rules'), meta: { requiresAuth: true }
        },

        { path: '/action/betList', name: 'betList',
          meta: {                                
              requireAuth: true,
          },
          component: r => require.ensure([], () => r(require('@/views/home/betList')), 'betList'), meta: { requiresAuth: true }
        }
      ]
    }

  ]
})



router.beforeEach((to, from, next) => {

  let token = cookie.getCookie('accesstoken');

    if (to.meta.requireAuth) {
      console.log('requireAuth',to.meta.requireAuth);
        if (token) {
            next();
        }
        else {
            next({
                path: '/login'
            })
        }
    } else {
        next();
    }
});

router.afterEach((to, from) => {
})

export default router;

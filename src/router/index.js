import Vue from 'vue'
import Router from 'vue-router'
import Vcreate from '@/components/Vcreate'
import Vlist from '@/components/Vlist'
import Valter from '@/components/Valter'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/create',
      name: 'Vcreate',
      component: Vcreate
    },
    {
      path: '/list',
      name: 'Vlist',
      component: Vlist
    },
    {
      path: '/alter',
      name: 'Valter',
      component: Valter
    },
  ]
})

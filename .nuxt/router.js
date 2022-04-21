import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _0566bf19 = () => interopDefault(import('..\\pages\\CreateTweet.vue' /* webpackChunkName: "pages/CreateTweet" */))
const _1b2ee32e = () => interopDefault(import('..\\pages\\MyTweet.vue' /* webpackChunkName: "pages/MyTweet" */))
const _c1e07c26 = () => interopDefault(import('..\\pages\\Profile.vue' /* webpackChunkName: "pages/Profile" */))
const _d268c9e2 = () => interopDefault(import('..\\pages\\Register.vue' /* webpackChunkName: "pages/Register" */))
const _9c558f94 = () => interopDefault(import('..\\pages\\UserHome.vue' /* webpackChunkName: "pages/UserHome" */))
const _43771fb6 = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/CreateTweet",
    component: _0566bf19,
    name: "CreateTweet"
  }, {
    path: "/MyTweet",
    component: _1b2ee32e,
    name: "MyTweet"
  }, {
    path: "/Profile",
    component: _c1e07c26,
    name: "Profile"
  }, {
    path: "/Register",
    component: _d268c9e2,
    name: "Register"
  }, {
    path: "/UserHome",
    component: _9c558f94,
    name: "UserHome"
  }, {
    path: "/",
    component: _43771fb6,
    name: "index"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}

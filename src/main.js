import babelpolyfill from 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import store from './vuex/store'
import Vuex from 'vuex'
import routes from './routes'
import Mock from './mock'
import iview from 'iview'
import 'iview/dist/styles/iview.css'
Mock.bootstrap();

Vue.use(VueRouter)
Vue.use(Vuex)
Vue.use(iview)

const router = new VueRouter({
    routes
})

router.beforeEach((to, from, next) => {
    if (to.path == '/login') {
        console.log("/login");
        sessionStorage.removeItem('user');
    }
    let user = JSON.parse(sessionStorage.getItem('user'));
    console.log(user);
    if (!user && to.path != '/login') {
        console.log(1)
        next({ path: '/login' })
    } else {
        console.log(2)
        next()
    }
})

//router.afterEach(transition => {
//NProgress.done();
//});

new Vue({
    el: '#app',
    template: '<App/>',
    router,
    store,
    components: { App }
    //render: h => h(Login)
}).$mount('#app')

//router.replace('/login')
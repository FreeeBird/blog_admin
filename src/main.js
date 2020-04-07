import Vue from 'vue';
import App from './App.vue';
import router from './router';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'; // 默认主题

import './assets/css/icon.css';

import 'babel-polyfill';
import moment from 'moment';

Vue.config.productionTip = false;
Vue.use(ElementUI, {
    size: 'small'
});

Vue.filter('dateFmt',(input,formatString = "YYYY-MM-DD")=>{
    return moment(input).format(formatString)
})


new Vue({
    router,
    render: h => h(App)
}).$mount('#app');

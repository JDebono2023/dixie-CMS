/* eslint-disable prettier/prettier */
import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import '@mdi/font/css/materialdesignicons.css'

Vue.config.productionTip = false;

new Vue({
	router,
	store,
	vuetify,
	iconfont: 'mdi',
	render: h => h(App),
}).$mount("#app");

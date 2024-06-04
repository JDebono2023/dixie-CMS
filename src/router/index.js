/* eslint-disable prettier/prettier */
import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Control from "../views/StoreControl.vue";
import Categories from "../views/Categories.vue";
import Orders from "../views/Orders.vue";
import Order from "../views/Order.vue";
import OrderPrint from "../views/OrderPrint.vue";

Vue.use(VueRouter);

const routes = [
	{
		path: "/products",
		name: "Products",
		component: Home,
	},
	{
		path: "/control",
		name: "Control",
		component: Control,
	},
	{
		path: "/categories",
		name: "Categories",
		component: Categories,
	},
	{
		path: "/orders",
		name: "Orders",
		component: Orders,
	  },
	  {
		path: "/order/:id",
		component: Order,
		name: "Order",
	  },
	  {
		path: "/orderprint/:id",
		component: OrderPrint,
		base: process.env.BASE_URL,
		name: "OrderPrint",
	  },
];

const router = new VueRouter({
	mode: 'history',
	routes,
});

export default router;

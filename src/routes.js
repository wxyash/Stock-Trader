import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

import Home from './components/Home.vue';
import Stocks from './components/Stocks.vue';
import Portfolio from './components/Portfolio.vue';
import AddStock from './components/AddStock.vue';

const routes = [
    {path:'',component:Home},
    {path:'/stocks',component:Stocks},
    {path:'/portfolio',component:Portfolio},
    {path:'/addstock',component:AddStock}
];

export const router = new VueRouter({routes,mode:'history'})

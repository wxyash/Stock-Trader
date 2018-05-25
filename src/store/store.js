import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex)

export const store = new Vuex.Store({
    state:{
        balance:10,
        stocks:[
            {Name:'BMW',Price:0.21},
            {Name:'Apple',Price:0.49},
            {Name:'Microsoft',Price:0.81},
            {Name:'Mercedes',Price:0.41}
        ],
        ownedStocks:[]
    },
    getters:{
        getBalance(state){
            let bal = parseFloat(state.balance);
            return bal.toFixed(2);
        },
        getStocks(state){
            return state.stocks;
        },
        getOwnedStocks(state){
            return state.ownedStocks;
        }
    },
    mutations:{
        setBalance(state,b){
            state.balance = b;
        },
        addOwnedStock(state,s){
            state.ownedStocks.push(s);
        },
        loadStocks(state,stocksArray){
            state.stocks = stocksArray;
        },
        loadOwnedStocks(state,stocksArray){
            state.ownedStocks = stocksArray;
        }
    }
})

<template>
    <div id="nav">
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <a class="navbar-brand">Stock Trader</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">
                    <router-link to="/" tag="li" class="nav-item" active-class="" ><a class="nav-link" >Home</a></router-link>
                    <router-link to="/stocks" tag="li" class="nav-item" ><a class="nav-link" >Stocks</a></router-link>
                    <router-link to="/portfolio" tag="li" class="nav-item" ><a class="nav-link" >Portfolio</a></router-link>
                    <router-link to="/addStock" tag="li" class="nav-item" ><a class="nav-link" >AddStock</a></router-link>
                </ul>

                <ul class="navbar-nav">
                    <li class=" nav-item btn btn-secondary" @click="endDay" style="cursor:default" >End Day</li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Load/Save Data
                        </a>
                        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                            <a  @click="loadData" class="dropdown-item" href="#">Load Data</a>
                            <div class="dropdown-divider"></div>
                            <a @click="saveData" class="dropdown-item" href="#">Save Data</a>
                        </div>
                    </li>
                    <li class="nav-item">
                    </li>
                    <li class="nav-item">
                        <a class="nav-link"><strong>Funds:${{this.$store.getters.getBalance}}</strong></a>
                    </li>
                </ul>
            </div>
        </nav>

    </div>
</template>
<script>
    export default {
        methods: {
            endDay() {
                this.$store.getters.getStocks.forEach(function(stock) {
                    var previousPrice = parseFloat(stock.Price);
                    var x = Math.floor(Math.random() * Math.floor(4));
                    if (x % 2 == 0) {
                        stock.Price = (parseFloat(stock.Price) + Math.random() + (Math.random()) * Math.random()).toFixed(2);
                        if (stock.Price <= 0) {
                            stock.Price = previousPrice;
                        }


                    } else {
                        stock.Price = (parseFloat(stock.Price) - Math.random() + (Math.random()) * Math.random()).toFixed(2);
                        if (stock.Price <= 0) {
                            stock.Price = previousPrice;
                        }

                    }

                })
            },

            saveData() {

                var stockData = this.$store.getters.getStocks;
                var allStocks = "";
                stockData.forEach(function(data) {
                    allStocks += data.Name + "," + data.Price + '-'
                })
                allStocks += '|'
                stockData = this.$store.getters.getOwnedStocks;
                stockData.forEach(function(data) {
                    allStocks += data[0].Name + "," + data[0].Price + "," + data[1] + '-'
                })
                allStocks += '|';
                allStocks += this.$store.getters.getBalance;

                this.createCookie('stocks', allStocks, 7);

            },
            createCookie(name, value, days) {
                var date, expires;
                if (days) {
                    date = new Date();
                    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
                    expires = "; expires=" + date.toGMTString();
                } else {
                    expires = "";
                }
                document.cookie = name + "=" + value + expires + "; path=/";
            },
            loadData() {
                var stocks = document.cookie;
                var stocks = stocks.split('=');
                stocks = stocks[1];
                stocks = stocks.split('|');
               
                var ownedStocks = stocks[1];
                ownedStocks = ownedStocks.split('-');
                var offeredStocks = stocks[0];
                offeredStocks = offeredStocks.split('-');
                var ownedStockArray = [];
                var offeredStockArray = [];
                var checkArray = [];

                //filling up ownedStockAray
                ownedStocks.forEach(function(stock) {
                    stock = stock.split(',');
                    if(stock!=""){
                        var stockObject = {
                        Name: stock[0],
                        Price: stock[1]
                    };
                    offeredStockArray.push(stockObject);
                    ownedStockArray.push([stockObject, stock[2]]);
                    }
                })
                
                Array.prototype.hasStockObject = function(obj){
                    for(var i = 0 ; i <this.length ; i++){
                        if(this[i].Name == obj.Name && this[i].Price==obj.Price){
                            return true;
                        }
                        
                    }
                    return false;
                }

                //filling up offeredStockArray

                offeredStocks.forEach(function(stock) {
                    stock = stock.split(',');
                    if(stock!=""){
                        var stockObject = {Name:stock[0],Price:stock[1]}
                    if(offeredStockArray.hasStockObject(stockObject)==false){
                        offeredStockArray.push(stockObject);
                    }
                    }
                })
                
                // commiting 
                console.log(offeredStockArray);
                console.log(ownedStockArray)
                console.log(stocks[2]);
                this.$store.commit('loadStocks',offeredStockArray);
                this.$store.commit('loadOwnedStocks',ownedStockArray);
                this.$store.commit('setBalance',parseFloat(stocks[2]).toFixed(2));
                

            }
        },
        computed: {
            currentBalance() {
                return (this.$store.state.balance).toFixed(2);
            }
        }

    }

</script>
<style scoped>
    .navbar {
        border-radius: 10px;
    }

    #nav {
        margin: 1%;
    }

</style>

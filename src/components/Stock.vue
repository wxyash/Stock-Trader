<template>
    <div id="stocks">
        <!--DIV BELOW WILL ONLY BE DISPLAYED IN THE /STOCKS PAGE-->
        <div class="card"  v-if="this.$route.path=='/stocks'">
            <h5 class="card-header d-inline"> {{stockData.Name}}  <span class="price">(Price: ${{stockData.Price}} )</span> </h5>
            <div class="card-body">
                <div class="row">

                    <div class="col-md-6">
                        <input v-model="inputAmount" type="text" class="form-control" placeholder="Enter Amount"/>
                    </div>
                    <div class="col-md-3 offset-md-3"><button class="form-control btn btn-success" @click="buyStock" >Buy</button></div>
                </div>


            </div>
        </div>
        <!--DIV BELOW WILL ONLY BE DISPLAYED IN THE /PORTFOLIO PAGE-->
        <div class="card"  v-if="this.$route.path=='/portfolio'">
            <h5 class="card-header card-header-red d-inline"> {{ownedStockData[0].Name}}  <span class="price">(<strong>Price: </strong>${{ownedStockData[0].Price}} ) | (<strong>Amount:</strong> {{ownedStockData[1]}}) </span> </h5>
            <div class="card-body">
                <div class="row">
                    <!--DIV BELOW WILL ONLY BE DISPLAYED IN THE /STOCKS PAGE-->
                    <div class="col-md-6">
                        <input type="number" v-model="inputAmount" class="form-control" placeholder="Enter Amount"/>  <p style="display:inline-block" ></p>
                    </div>
                    <div @click="sellStock" class="col-md-3 offset-md-3"><button class="form-control btn btn-danger"  >Sell</button></div>
                </div>

                <!--DIV BELOW WILL ONLY BE DISPLAYED IN THE /PORTFOLIO PAGE-->
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                inputAmount: null
            }
        },
        props: ['stockData', 'ownedStockData'],
        methods: {
            buyStock() {
                if (this.$store.getters.getBalance >= this.stockData.Price * this.inputAmount && this.inputAmount >= 1) {
                    let balance = (this.$store.getters.getBalance - (this.stockData.Price * this.inputAmount));
                    this.$store.commit('setBalance', balance);           
                    var StockArray = [this.stockData, this.inputAmount];
                    this.$store.commit('addOwnedStock', StockArray);
                    this.inputAmount = null;
                    //console.log(this.$store.getters.getOwnedStocks);
                }
            },
            sellStock() {
                if (this.inputAmount <= this.ownedStockData[1]) {
                    var balance = parseFloat(this.$store.getters.getBalance) + (this.ownedStockData[0].Price * this.inputAmount);
                    this.$store.commit('setBalance', balance);
                    this.ownedStockData[1] -= this.inputAmount;
                    this.checkEmptyStockAmount();
                    

                }
                this.inputAmount = null;
            },
            checkEmptyStockAmount(){
                if(this.ownedStockData[1]<=0 ){
                    var ownedStocks = this.$store.getters.getOwnedStocks;
                    var currentStockIndex = ownedStocks.indexOf(this.ownedStockData);
                    if(currentStockIndex>=0){
                        ownedStocks.splice(currentStockIndex,1);
                        console.log(this.$store.getters.getOwnedStocks);
                    }

                }
            }
        }
    }

</script>
<style scoped>
    .price {
        font-size: 12px;
        color:
    }

    .card-header {
        background-color: #baedaf;
        color: #345b2c;
    }

    .card-header-red {
        background-color: #c9ddff;
        color: #2f3c51;
    }

</style>

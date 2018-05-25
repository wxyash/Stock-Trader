<template>
    <div>    
        <div v-if="this.$store.getters.getOwnedStocks.length>=1">
            <div class="row">
                <div class="col-md-6" v-for="astock in this.$store.getters.getOwnedStocks">
                    <stock :ownedStockData="astock"></stock>
                    <br>
                    <br>
                </div>
            </div>
        </div>


        <div v-else class="alert alert-danger" role="alert">
            <strong>Oh snap!</strong> You don't own any stocks yet. <router-link to="/stocks"><strong>Click Here </strong></router-link> to get some!
        </div>
    </div>

</template>


<script>
    import Stock from './Stock.vue'
    export default{
        components:{
            'stock':Stock
        }
    }
</script>


<style>

</style>
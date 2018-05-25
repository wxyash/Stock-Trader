<template>
<div>
   <div class="row">
       <div class="col-md-6" v-for="astock in this.$store.getters.getStocks">
           <stock :stockData="astock"></stock>
           <br>
           <br>
       </div>
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

<style scoped>

</style>

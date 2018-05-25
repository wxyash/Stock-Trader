<template>
<div>
        <div class="card">
        <h5 class="card-header d-inline">Add Stock </h5>
        <div class="card-body">
            <div class="row">
                <div class="col-sm-3">
                    <input v-model="inputName" type="text" class="form-control" placeholder="Name Of Stock"/>
                </div>
                <div class="col-sm-3 col-md-3">
                    <input v-model="inputPrice" type="number" class="form-control" placeholder="Enter Initial Price"/>
                </div>
                <div @click="addStock" class="offset-md-3 col-md-3"><button class="form-control btn btn-primary" >Add Stock</button></div>
            </div>


        </div>
    </div>
    <br>
    <br>
    <div v-if="stockAddedFlag" style="width: 40%; margin: auto" class="alert alert-success alert-dismissible fade show" role="alert">
       <button @click="$router.push('/stocks')" type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
		<strong>Your stock has been Added. Click 'x' to view it.</strong>
	</div>
</div>
</template>
<script>
export default{
    data(){
      return {inputName:null,inputPrice:null,stockAddedFlag:false}  
    },
    methods:{
        addStock(){
            var newStock = {Name:this.inputName,Price:this.inputPrice}
            this.$store.getters.getStocks.push(newStock);
            this.stockAddedFlag = true;
        }
    }
}
</script>
<style scoped>

</style>
<template>
    <div class="card">
        <div class="card-body">
            <h2> <strong>Trade or View your portfolio</strong></h2>
            <p class="card-text">
                You may load or save your data</p>
            <p>Click on End day to begin a new day!</p>
            <hr>
            <h3>Your Funds: ${{this.$store.getters.getBalance}}</h3>
        </div>
    </div>
</template>
<script></script>
<style scoped>
    .card-body{
        margin: 30px;
    }
</style>

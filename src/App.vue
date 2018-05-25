<template>
<div class="container-fluid">
    <app-Navbar></app-Navbar>
    <br>
    <div class="container-fluid">
    <transition 
    enter-active-class ="animated fadeInDown" 
    leave-active-class ="animated fadeOutUp" 
    mode="out-in"
    >
    <router-view></router-view>
    </transition>
    </div>

    </div>
</template>

<script>
    import Navbar from './components/Navigation.vue';
    import Home from './components/Home.vue';
    import Portfolio from './components/Portfolio.vue'

    export default {
        components: {
            'app-Navbar': Navbar
        }
    }

</script>

<style>


</style>

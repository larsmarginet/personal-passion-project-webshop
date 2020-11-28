<template>
    <v-app style="background: #F2F2F2">
        <v-main class="ma-4">
            <transition name="fade" mode="out-in">
                <router-view></router-view>
            </transition>
        </v-main>
    </v-app>
</template>

<script>
export default {
    name: 'App',
    mounted() {
       this.$store.dispatch('events/checkEventExperation')
    }
};
</script>

<style>
.fade-enter {
    opacity: 0;
    transform: translateY(-30px);
}

.fade-enter-active {
    transition: all 300ms ease-out;
}

.fade-enter-to {
    opacity: 1;
    transform: translateY(0);
}

.fade-leave {
    opacity: 1;
    transform: translateY(0);
}

.fade-leave-active {
    nsition: all 300ms ease-in;
}

.fade-leave-to {
    opacity: 0;
    transform: translateY(30px);
}
</style>
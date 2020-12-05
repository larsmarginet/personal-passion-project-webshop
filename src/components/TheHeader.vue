<template>
    <div>
        <v-app-bar app color="primary" flat>
            <v-progress-linear :active="loadingComponent" :indeterminate="loadingComponent" absolute bottom color="light-blue accent-4"></v-progress-linear>
            <v-avatar size="40">
                <img :src="event.bandLogo" :alt="event.bandName" v-if="event" >
            </v-avatar>
            <v-spacer></v-spacer>
            <router-link to="/">
                <v-toolbar-title >
                    <h1 class="headline grey--text text--lighten-5 font-weight-bold">Concery</h1>
                </v-toolbar-title>
            </router-link>
            <v-spacer></v-spacer>
            <router-link to="/merch/cart" class="px-0" text fab small v-if="shop">
                <v-badge bottom color="orange" :content="cartAmount" offset-x="15" offset-y="15" v-if="cartAmount > 0">
                    <v-icon large dark>shopping_cart</v-icon>
                </v-badge>
                <v-icon v-else large dark>shopping_cart</v-icon>
            </router-link>
            <div style="maxWidth: 50px; width: 10%" v-else></div>
        </v-app-bar>
        <MusicPlayer v-if="event"/>
    </div>
</template>

<script>
import MusicPlayer from './shared/MusicPlayer';
export default {
    components: {
        MusicPlayer
    },
    computed: {
        event() {
            return this.$store.getters['events/currentEvent'] ? this.$store.getters['events/currentEvent'] : null;
        },
        shop() {
            return this.$route.path.includes('merch') ?  true : false;
        },
        loadingComponent() {
            return this.$store.getters['loadingComponent'];
        },
        cartAmount() {
            return this.$store.getters['cart/totalCartAmount'];
        }
    },
    mounted() {
        this.$store.dispatch('cart/setCart', JSON.parse(window.localStorage.getItem('cart')));
    }
}
</script>
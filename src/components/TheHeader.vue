<template>
     <v-app-bar app color="primary" flat>
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
        <v-container style="maxWidth: 35px" class="px-0">
            <v-icon v-if="shop" large dark>shopping_cart</v-icon>
        </v-container>
     </v-app-bar>
</template>

<script>
export default {
    computed: {
        event() {
            return this.$store.getters['events/currentEvent'] ? this.$store.getters['events/currentEvent'] : null;
        },
        shop() {
            return false;
        }
    }
}
</script>
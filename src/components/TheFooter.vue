<template>
    <v-footer  color="primary" padless >
    <v-row justify="center" no-gutters class="pt-3">
        <v-btn fab depressed x-small :href="event.facebook" class="primary mx-2" target="_blank" rel="noreferrer" v-if="event && event.facebook">
            <img src="@/assets/facebook-white.svg" alt="facebook logo" width="35" height="35"/>
        </v-btn>
        <v-btn fab depressed x-small :href="event.instagram" class="primary mx-2" target="_blank" rel="noreferrer" v-if="event && event.instagram">
            <img src="@/assets/instagram-white.svg" alt="instagram logo" width="35" height="35"/>
        </v-btn>
        <v-btn fab depressed x-small :href="event.itunes" class="primary mx-2" target="_blank" rel="noreferrer" v-if="event && event.itunes">
            <img src="@/assets/itunes-white.svg" alt="itunes logo" width="35" height="35"/>
        </v-btn>
        <v-btn fab depressed x-small :href="event.spotify" class="primary mx-2" target="_blank" rel="noreferrer" v-if="event && event.spotify">
            <img src="@/assets/spotify-white.svg" alt="spotify logo" width="35" height="35"/>
        </v-btn>
        <v-btn fab depressed x-small :href="event.youtube" class="primary mx-2" target="_blank" rel="noreferrer" v-if="event && event.youtube">
            <img src="@/assets/youtube-white.svg" alt="youtube logo" width="35" height="35"/>
        </v-btn>
        <v-col class="py-4 text-center white--text" cols="12">
            &copy; {{ new Date().getFullYear() }} — <strong>Vuetify</strong>
        </v-col>
    </v-row>
  </v-footer>
</template>

<script>
export default {
    computed: {
        event() {
            return this.$store.getters['events/currentEvent'] ? this.$store.getters['events/currentEvent'] : null;
        }
    }
}
</script>

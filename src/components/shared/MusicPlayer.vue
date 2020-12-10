<template>
    <div >
        <div v-if="currentSong" tabindex="0" class="music-player" @keypress.enter="handleDialog" @click="handleDialog">
            <infinite-slide-bar class="grey darken-3 mt-14 mx-0 py-2" style="position: fixed; zIndex: 99" >
                <span class="white--text mb-0 mr-15" v-for="(n, i) in renderAmount" :key="i">{{currentSong.title}}</span>
            </infinite-slide-bar>
        </div>
        <v-dialog v-model="dialog" max-width="350px" v-if="currentSong">
            <v-card class="grey darken-3">
                <v-card-title>
                    <p class="text-center white--text" style="width: 100%">{{currentSong.title}}</p>
                    <v-btn fab small text style="position: absolute; right: 0; top: 0"><v-icon class="primary--text" @click="handleDialog">close</v-icon></v-btn>    
                </v-card-title>
                <v-card-text class="pb-12">
                   <v-row justify="center">
                        <v-btn fab depressed x-small :href="currentSong.itunes" class="mx-2" target="_blank" rel="noreferrer" v-if="currentSong && currentSong.itunes">
                            <img src="@/assets/itunes.svg" alt="apple music logo"/>
                        </v-btn>
                        <v-btn fab depressed x-small :href="currentSong.spotify" class="mx-2" target="_blank" rel="noreferrer" v-if="currentSong && currentSong.spotify">
                            <img src="@/assets/spotify.svg" alt="spotify logo"/>
                        </v-btn>
                        <v-btn fab depressed x-small :href="currentSong.youtube" class="mx-2" target="_blank" rel="noreferrer" v-if="currentSong && currentSong.youtube">
                            <img src="@/assets/youtube.svg" alt="youtube logo"/>
                        </v-btn>
                        <v-btn fab depressed x-small :href="currentSong.soundcloud" class="mx-2" target="_blank" rel="noreferrer" v-if="currentSong && currentSong.soundcloud">
                            <img src="@/assets/soundcloud.svg" alt="soundcloud logo"/>
                        </v-btn>
                        <v-btn fab depressed x-small :href="currentSong.shop" class="mx-2" target="_blank" rel="noreferrer" v-if="currentSong && currentSong.shop">
                            <img src="@/assets/shop.svg" alt="shop logo"/>
                        </v-btn>
                   </v-row>
                </v-card-text>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import InfiniteSlideBar from 'vue-infinite-slide-bar'
export default {
    components: {
        InfiniteSlideBar,
    },
    data() {
        return {
            dialog: false,
        }
    },
    computed: {
        currentSong() {
            return this.$store.getters['events/currentSong'];
        },
        renderAmount() {
            return Math.ceil(18 / this.currentSong.title.length) + 1;
        }
    },
    methods: {
        handleDialog() {
            this.dialog = !this.dialog;
        }
    },
    mounted() {
        this.$store.dispatch('events/loadCurrentSong');
    }
}
</script>

<style scoped>
.music-player:focus {
    opacity: .9;
}
</style>
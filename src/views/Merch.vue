<template>
    <section>
        <h2 style="display: none">Merchandise</h2>
        <v-row v-if="loading">
            <v-col cols="12" sm="6" md="4" lg="3" v-for="item in merch" :key="item.id">
                <v-card class="pa-4 rounded-lg" flat>
                    <v-skeleton-loader type="image"></v-skeleton-loader>
                    <v-skeleton-loader type="list-item-three-line"></v-skeleton-loader>
                </v-card>
            </v-col>
        </v-row>
        <v-row v-else-if="!loading && merch">
            <v-col cols="12" sm="6" md="4" lg="3" v-for="item in merch" :key="item.id">
                <MerchCard :item="item" />
            </v-col>
        </v-row>
    </section>
</template>

<script>
import MerchCard from '../components/merch/MerchCard';
export default {
    components: {
        MerchCard
    },
    computed: {
        merch() {
            return this.$store.getters['merch/merch'];
        },
        loading() {
            return this.$store.getters['merch/loading'];
        },
        error() {
            return this.$store.getters['merch/error'];
        }
    },
    mounted() {
        this.$store.dispatch('setLoadingComponent', false);
        this.$store.dispatch('merch/loadMerch');
    }
}
</script>

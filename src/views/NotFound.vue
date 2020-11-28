<template>
    <v-container>
        <v-col class="d-flex flex-column justify-center mt-10">
            <h2 class="display-4 primary--text text-center">404</h2>
            <p class="text-center">Oops... it appears that you have landed on a page that doesn't exist.</p>
            <v-btn depressed class="primary mx-auto" max-width="100" href="/">Go home</v-btn>
        </v-col>
    </v-container>
</template>

<script>
export default {
    mounted() {
        this.$store.dispatch('setLoadingComponent', false)
    }
}
</script>
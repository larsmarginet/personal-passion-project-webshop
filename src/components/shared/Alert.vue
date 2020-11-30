<template>
    <v-alert border="bottom" color="red" dismissible type="error" @input="onClose" :value="true" transition="expand-transition">
        {{text}}
    </v-alert>
</template>

<script>
export default {
    props: {
        text: {
            required: true, 
            type: String
        }
    },
    methods: {
        onClose() {
            this.$emit('dismissed');
        }
    }
}
</script>
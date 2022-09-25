<template>
    <ProductForm 
        :edit="false"
        :payload="payload"
    />
</template>

<script>
    export default {
        data() {
            return {
                payload:null,
            }
        },
    }
</script>

<style scoped>

</style>
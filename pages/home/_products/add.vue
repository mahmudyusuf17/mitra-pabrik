<template>
    <div class="row">
        <div class="col-12">
            <nuxt-child></nuxt-child>
        </div>
    </div>
</template>

<script>
    export default {
        mounted(){
            this.$emit('fullpage', false);
        }
    }
</script>

<style scoped>

</style>
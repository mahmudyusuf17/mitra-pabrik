<template>
    <div style="min-height: 100vh;">
        <div class="container" style="padding-top: 200px; padding-bottom: 150px">
            <NuxtChild  />
        </div>
    </div>
</template>

<script>
    export default {
        middleware: 'auth',
    }
</script>

<style scoped>

</style>
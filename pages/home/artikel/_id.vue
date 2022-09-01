<template>
    <div style="min-height: 100vh;">
        <div class="row mb-3">
            <div class="col-12">
                <nuxt-link to="/home/news"><b-icon icon="arrow-left-short"></b-icon> Kembali</nuxt-link>
            </div>
        </div>
        <div class="row">
            <div class="col-12">
                <h1>{{ artikel.title }}</h1>
                <span class="text-secondary">By: {{ artikel.author }}</span> | <span class="text-secondary">{{ $timeAgo(artikel.timestamp) }}</span> 
            </div>
            <div class="col-12 mb-3">
                <b-badge>{{ artikel.category }}</b-badge>
            </div>
            <div class="col-12 rounded-xl p-4 mb-5">
                <div v-html="artikel.body && $md.render(artikel.body)" class="text-break"></div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
        return {
          artikel:{},
        }
      },
      async mounted() {
          console.log(this.$route.params.id)
        let fetchArtikel = await this.$axios.get(`/artikels/artikel/${this.$route.params.id}`)
        this.artikel = fetchArtikel.data.data[0]
        console.log(this.artikel)
      }
    }
</script>

<style>
    /* img {
        width: 100% !important;
        height: 100% !important;
        object-fit: contain;
    } */
</style>
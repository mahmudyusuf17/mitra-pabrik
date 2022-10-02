<template>
    <div class="mp-container" id="news-section">
        <div class="mp-title-section mb-5">
            <h2>News</h2>
        </div>
        <b-row>
            <b-col>
                <div class="mp-news-card__new mb-4" v-for="(artikel, index) in listArtikels" :key="artikel.id_artikel">
                    <ArticleCard :news="artikel" v-if="index == 0"/>
                </div>
                <a href="/home/artikel" class="mp-fs-24">Lihat semua artikel</a>
            </b-col>
            <b-col>
                <div class="mp-news-card__sidebar" v-for="(data, index) in listArtikels" :key="index">
                    <NewsSidebarCard :news="data" v-if="index > 0" v-show="index > 0"/>
                </div>
            </b-col>
        </b-row>
    </div>
</template>
<script>

import ArticleCard from "~/components/news/ArticleCard.vue";
export default {
    name: "NewsSection",
    components:{
        ArticleCard,
    },
    data() {
        return {
          listArtikels:[],
          listKategori:[],
        }
    },
    async mounted() {
        let fetchArtikels = await this.$axios.get(`/artikels`)
            this.listArtikels = fetchArtikels.data.data
            this.listArtikels.forEach(row => {
                this.listKategori.push(row.category)
            }
        );

        this.listKategori = [...new Map(this.listKategori.map(v => [v, v])).values()]
    }
}
</script>
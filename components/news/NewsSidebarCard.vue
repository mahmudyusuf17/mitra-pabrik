<template>
    <b-card class="mb-3">
        <a :href="getUserCredentials.nama_depan ? `/home/artikel/${news.id_artikel}` : `/artikel/${news.id_artikel}`" style="text-decoration: unset;" class="mp-link__redirect">
            <div class="d-flex align-items-center mp-news-detail__sidebar">
                <img :src="`https://mitrapabrik.sgp1.digitaloceanspaces.com/articles/`+ news.image" alt="image news" class="mp-image-rounded mp-rounded mr-3">
                <div class="mp-news-content">
                    <h2 class="mp-fs-24">{{ news.title }}</h2>
                    <b-card-text>
                        <div v-html="news.body && $md.render(news.body).substring(0,150)" class="mp-text__elipsis"></div>
                        <a :href="getUserCredentials.nama_depan ? `/home/artikel/${news.id_artikel}` : `/artikel/${news.id_artikel}`" class="card-link">read more...</a>
                    </b-card-text>
                </div>
            </div>
        </a>
    </b-card>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
    name:"NewsSidebarCard",

    props:{
        news:{
            default:() => {}
        }
    },

    computed: {
        ...mapGetters({
            'getUserCredentials':'auth/getUserCredentials',
        }),
    },
}
</script>
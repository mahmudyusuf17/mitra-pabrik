<template>
    <b-card class="mb-3">
        <a :href="`/home/artikel/${news.id_artikel}`" style="text-decoration: unset;" class="mp-link__redirect">
            <div class="d-flex align-items-center mp-news-detail__sidebar">
                <img :src="`https://mitrapabrik.sgp1.digitaloceanspaces.com/articles/`+ news.image" alt="image news" class="mp-image-rounded mp-rounded mr-3">
                <div class="mp-news-content">
                    <h2 class="mp-fs-24">{{ news.title }}</h2>
                    <b-card-text>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                        Inventore error voluptate quibusdam reiciendis.
                        <a href="#" class="card-link">read more...</a>
                    </b-card-text>
                </div>
            </div>
        </a>
    </b-card>
</template>
<script>
export default {
    name:"NewsSidebarCard",

    props:{
        news:{
            default:() => {}
        }
    },
}
</script>
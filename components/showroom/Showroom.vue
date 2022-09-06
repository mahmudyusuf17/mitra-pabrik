<template>
    <div class="mp-container" id="showroom-section">
        <div class="mp-title-section mb-5">
            <h2>Showroom</h2>
        </div>
        <b-row>
            <b-col v-for="(data, kota) in showroomData" :key="kota">
                <b-card class="mb-3 text-center">
                    <div class="d-block">
                        <img :src="`https://ik.imagekit.io/d3rdfRTergDURe/mitrapabrik_assets/${kota}.webp?ik-sdk-version=javascript-1.4.3&updatedAt=1645510618902`" alt="image news" width="250" height="250" class="mp-rounded">
                        <div class="mp-news-content">
                            <h2 class="mp-fs-24 mt-4 mb-2">{{ $decodeHtml(kota) }}</h2>
                            <b-card-text class="text-left mt-3">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                                Inventore error voluptate quibusdam reiciendis, explicabo ipsa cupiditate autem odit, 
                                molestias culpa ex. Deserunt voluptatum sequi debitis minus ipsa quasi quo repellat!
                             <a href="#" class="card-link">read more...</a>
                            </b-card-text>
                        </div>
                    </div>
                </b-card>
            </b-col>
            <!-- <b-col>
                <b-card class="mb-3 text-center">
                    <div class="d-block">
                        <img src="https://picsum.photos/600/300/?image=25" alt="image news" width="150" height="150" class="mp-rounded">
                        <div class="mp-news-content">
                            <h2 class="mp-fs-24 mt-2 mb-2">Headline</h2>
                            <b-card-text class="text-left mt-3">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                                Inventore error voluptate quibusdam reiciendis, explicabo ipsa cupiditate autem odit, 
                                molestias culpa ex. Deserunt voluptatum sequi debitis minus ipsa quasi quo repellat!
                             <a href="#" class="card-link">read more...</a>
                            </b-card-text>
                        </div>
                    </div>
                </b-card>
            </b-col>
            <b-col>
                <b-card class="mb-3 text-center">
                    <div class="d-block">
                        <img src="https://picsum.photos/600/300/?image=25" alt="image news" width="150" height="150" class="mp-rounded">
                        <div class="mp-news-content">
                            <h2 class="mp-fs-24 mt-2 mb-2">Headline</h2>
                            <b-card-text class="text-left mt-3">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                                Inventore error voluptate quibusdam reiciendis, explicabo ipsa cupiditate autem odit, 
                                molestias culpa ex. Deserunt voluptatum sequi debitis minus ipsa quasi quo repellat!
                             <a href="#" class="card-link">read more...</a>
                            </b-card-text>
                        </div>
                    </div>
                </b-card>
            </b-col> -->
        </b-row>
        <a href="#" class="mp-fs-24 float-right mt-4">Lihat semua showroom</a>
    </div>
</template>
<script>
export default {
    name: "Showroom",

    data() {
        return {
            showroomData:null,
        }
    },

    async mounted() {
        let fetchShowrooms = await this.$axios.get(`/showrooms`)
        this.showroomData = fetchShowrooms.data.data
        for (const key in this.showroomData) {
            this.showroomData[key] = this.showroomData[key].filter(row => row.status != 0)
        }
    }
}
</script>
<template>
    <div class="mp-banner-homepage">
        <b-carousel
            id="carousel-1"
            v-model="slide"
            :interval="10000"
            controls
            indicators
            background="#ababab"
            img-width="1000"
            img-height="400"
            style="text-shadow: 1px 1px 2px #333;"
            @sliding-start="onSlideStart"
            @sliding-end="onSlideEnd"
        >
            <b-carousel-slide>
                <template #img>
                    <img
                    class="d-block img-fluid w-100 h-50"
                    width="1024"
                    height="400"
                    src="/background-image.png"
                    alt="mp-image"
                    >
                </template>
            </b-carousel-slide>
            <b-carousel-slide>
                <template #img>
                    <img
                    class="d-block img-fluid w-100 h-50"
                    width="1024"
                    height="400"
                    src="/background-image.png"
                    alt="mp-image"
                    >
                </template>
            </b-carousel-slide>
        </b-carousel>
    </div>
</template>
<script>
export default {
    name: "homepage-carousel",
    data() {
      return {
        slide: 0,
        sliding: null,
      }
    },
    methods: {
        onSlideStart(slide) {
            this.sliding = true
        },
        onSlideEnd(slide) {
            this.sliding = false
        },
    },
}
</script>
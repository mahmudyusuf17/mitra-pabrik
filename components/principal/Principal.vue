<template>
    <div class="mp-principal__section">
        <div class="mp-container principal" id="principal-section">
            <div class="mp-title-section mb-5">
                <h2>Lebih dari 90 principal sudah <br> bergabung dan percaya dengan <br> <span class="mp-primary-color">mitrapabrik.com</span></h2>
            </div>
        </div>
        <b-carousel 
            indicators
            controls
            class="mp-carousel__principal"
            @sliding-start="onSlideStart"
            >
            <!-- <b-carousel-slide v-for="(slide, i) in Math.ceil(partners.length / 12)" :key="i" class="mp-slider__principal">
                <template v-slot:img>
                    <b-row>
                        <b-col cols="12" md="4" lg="2" sm="6" class="my-4" style="cursor: pointer" v-for="(imgsrc, j) in paginate(partners)" :key="j" @onClick="principalDetail">
                                {{imgsrc.nama_perusahaan}}
                                <b-img :src="imgsrc.foto_perusahaan ? baseUrl+'/company_logo/'+imgsrc.foto_perusahaan+`?t=${new Date().getTime()}` : `/no-image-placeholder.png`" alt="Responsive image" class="mp-image-principal"></b-img>
                        </b-col>
                    </b-row>
                </template>
            </b-carousel-slide> -->
            <b-carousel-slide v-for="(slide, i) in Math.ceil(partners.length / 12)" :key="i" class="mp-slider__principal">
                <template v-slot:img>
                    <b-row>
                        <b-col cols="12" md="4" lg="2" sm="6" class="my-4" style="cursor: pointer" v-for="(imgsrc, j) in partners.slice(0,12)" :key="j" @onClick="principalDetail">
                            <b-img :src="imgsrc.foto_perusahaan ? baseUrl+'/company_logo/'+imgsrc.foto_perusahaan+`?t=${new Date().getTime()}` : `/no-image-placeholder.png`" alt="Responsive image" class="mp-image-principal"></b-img>
                        </b-col>
                    </b-row>
                </template>
            </b-carousel-slide>
        </b-carousel>
    </div>
</template>
<script>
export default {
    name: "Principal",
    data(){
        return{
            partners: [],
            baseUrl:process.env.BASE_FTP_URL,
            currentPage: 0,
            itemsPerPage: 12,
            resultCount: 0,
            isSlide: false,
        }
    },

    methods:{
        principalDetail(){

        },

        paginate(list) {
            this.resultCount = list.length
            if (this.currentPage >= this.totalPages) {
              this.currentPage = this.totalPages - 1
            }
            var index = this.currentPage * this.itemsPerPage
            // console.log(index, 'index')
            // var item = list.slice(index, index + this.itemsPerPage)
            // console.log(item, 'item')
            return list.slice(index, index + this.itemsPerPage)
        },

        onSlideStart(){
            this.isSlide = true
        },

        setPage(pageNumber) {
          this.currentPage = pageNumber
        }
    },

    async mounted() {
        let fetchPartners = await this.$axios.get(`/user/partners`)
        this.partners = fetchPartners.data.data
    },

    // filters: {
    //     paginate(list) {
    //         this.resultCount = list.length
    //         if (this.currentPage >= this.totalPages) {
    //           this.currentPage = this.totalPages - 1
    //         }
    //         var index = this.currentPage * this.itemsPerPage
    //         return list.slice(index, index + this.itemsPerPage)
    //     }
    // },

    computed:{
        totalPages() {
          return Math.ceil(this.resultCount / this.itemsPerPage)
        }
    },

    watch:{
        isSlide(){
            console.log(this.isSlide, 'slide')
            console.log(this.currentPage++)
            this.setPage(this.currentPage++)
        }
    }
}
</script>
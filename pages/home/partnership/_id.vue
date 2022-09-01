<template>
    <div style="min-height: 100vh;">
        <div class="row" v-if="!loading">
            <div class="col-12" v-if="partnerData != null">
                <div class="row mt-5">
                    <div class="col-12">
                        <b-card
                            bg-variant="primary"
                            text-variant="white"
                            class="rounded-xl"
                        >
                            <b-card-text>
                                <div class="row m-5">
                                    <div class="col-md-3">
                                        <p class="text-center">
                                            <b-avatar :src="baseUrl+'/company_logo/'+partnerData.foto_perusahaan+`?t=${new Date().getTime()}`" size="10rem" style="border: 1px solid black"></b-avatar>
                                        </p>
                                    </div>
                                    <div class="col-md-6">
                                        <h4 class="mitrapabrik">{{ partnerData.nama_perusahaan }}</h4>
                                        <p>{{ partnerData.asal_kota }}</p>
                                        <p>{{ partnerData.alamat_perusahaan }}</p>
                                        <p>{{ partnerData.no_hp }}</p>
                                    </div>
                                    <div class="col-md-3 col-sm-12">
                                        <a :href="`${baseUrl}/pdfs/${partnerData.portofolio}`" target="_blank">
                                            <b-card border-variant="light" class="shadow h-100">
                                                <div class="row h-100">
                                                    <div class="col-3 d-flex align-items-center">
                                                        <b-icon icon="file-image-fill" font-scale="2rem" variant="primary"></b-icon>
                                                    </div>
                                                    <div class="col-9 d-flex align-items-center">
                                                        <span>Download Katalog</span>
                                                    </div>
                                                </div>
                                            </b-card>
                                        </a>
                                    </div>
                                </div>
                            </b-card-text>
                        </b-card>
                    </div>
                    <div class="col-12">
                        <div class="row">
                            <div class="col-12 mt-5">
                                <h3>Produk Partner</h3>
                            </div>
                            <div class="col-md-3" v-for="p in products" :key="p.id_produk">
                                <nuxt-link :to="`/home/products/details/${p.id_produk}`">
                                    <ProductThumbnail 
                                        :data="p"
                                    />
                                </nuxt-link>
                            </div>
                        </div>
                    </div>
                    <div class="col-12" v-if="partnerData.gallery">
                        <div class="row mt-3">
                            <div class="col-12 mt-5">
                                <h3>Galeri Partner</h3>
                            </div>
                            <div class="col-auto d-flex justify-content-center align-items-center" v-for="(tmp,idx) in partnerData.gallery" :key="idx">
                                <div class="p-3 card h-100">
                                    <b-img :src="`${baseUrl}/gallery/${tmp}?t=${new Date().getTime()}`" fluid width="150" height="150" class="shadow mb-5"></b-img>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-12" v-else>
                <div class="row">
                    <div class="col-12 text-center text-secondary mb-3">
                        {{ errMsg }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                baseUrl:process.env.BASE_FTP_URL,
                partnerData:null,
                errMsg:'',
                loading: true,
                products:[],
            }
        },
        async mounted() {
            try {
                let fetchPartnerData = await this.$axios.get(`/user/partner/${this.$route.params.id}`, { params:{}, headers: { 'auth-token': this.$cookies.get('token') } })
                if(fetchPartnerData.data.data.length > 0) {
                    this.partnerData = fetchPartnerData.data.data[0]
                    if(this.partnerData.gallery) {
                        this.partnerData.gallery = this.partnerData.gallery.split(',')
                    }
                    let fetchProducts = await this.$axios.get(`/products/partner/${this.$route.params.id}`)
                    this.products = fetchProducts.data.data
                    this.products.forEach(row => {
                        row.katalog = row.katalog.split(',')
                    })
                } else {
                    this.errMsg = fetchPartnerData.data.msg
                }
            } catch (error) {
                console.log(error)
            }
            this.loading = false
        }
    }
</script>

<style scoped>

</style>
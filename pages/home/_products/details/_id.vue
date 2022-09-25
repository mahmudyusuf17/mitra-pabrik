<template>
    <div class="mp-product_detail">
        <b-row>
            <b-col cols="12" md="4">
                <b-img
                    width="450" height="450" 
                    :src="`${baseUrl}/products/${thumbnail}?t=${new Date().getTime()}`"
                    style="object-fit: cover;max-width: -webkit-fill-available;"
                    class="mb-2"
                ></b-img>
                <b-carousel
                    :interval="4000"
                    controls
                    v-model="slide"
                    v-if="product.katalog"
                >
                    <b-carousel-slide v-for="(section,k) in Math.ceil(product.katalog.length / 3)" :key="k">
                        <template #img>
                            <div class="row">
                                <template v-for="(img,idx) in product.katalog">
                                    <div class="col-4" 
                                        v-if="idx >= (k * 3) && idx < (3 * section)"
                                        :key="idx"
                                        :style="`width: 150px; height: 150px; background-size: cover; background-image: url('${baseUrl}/products/${img}')`" 
                                        @click="thumbnail = img">
                                    </div>
                                </template>
                            </div>
                        </template>
                    </b-carousel-slide>
                </b-carousel>
            </b-col>
            <b-col cols="12" md="5">
                <div class="mp-product__detail-desc">
                    <div class="mp-product__detail-title">
                        <h2>{{ product.title }}</h2>
                        <h4 class="text-secondary">Produk dari {{ product.nama_perusahaan }}</h4>
                        <span class="text-primary font-weight-bold">{{ product.penempatan }}</span>
                    </div>
                    <div class="mb-4">
                        <b-button 
                            v-if="product.id_partner != getUserCredentials.id_user"
                            variant="primary" pill class="px-3" size="sm" 
                            @click="addWishlist(product.id_produk)">
                            Save <b-icon :icon="currWishlist ? 'bookmark-fill' : 'bookmark'"></b-icon>
                        </b-button>
                        <b-button 
                            v-if="product.id_partner == getUserCredentials.id_user"
                            variant="primary" pill class="px-3" size="sm"
                            @click="editProduct(product.id_produk)"
                            >
                            edit
                        </b-button>
                    </div>
                    <div class="border-top text-secondary">
                        <p class="m-0">Tipe : {{ product.tipe }}</p>
                        <p class="m-0">
                            Varian : <b-badge v-for="(v,j) in product.varian" :key="j" variant="light" class="shadow-sm px-4 py-2 mx-2">{{ v }}</b-badge>
                        </p>
                    </div>
                    <p class="m-0 mt-4">Detail produk :</p>
                    <p class="mt-2" v-html="product.deskripsi"></p>
                    <!-- <div class="col-12 pb-4 border-bottom">
                        <div class="row">
                            <div class="col-md-6 d-flex justify-content-center align-items-center">
                                <b-icon icon="telephone-fill" font-scale="1.5em" class="m-3"></b-icon>
                                <span>
                                    {{ tmpHP }} <br>
                                    <small><b-link @click="showNoHp">Tampilkan Nomor</b-link></small>
                                </span>
                            </div>
                            <div class="col-md-6">
                                <b-card border-variant="light" class="shadow">
                                    <div class="row">
                                        <div class="col-9">
                                            {{ product.nama_perusahaan }} <br>
                                            <small class="text-secondary">{{ product.asal_kota }}</small>
                                        </div>
                                        <div class="col-3">
                                            <b-avatar :src="`${baseUrl}/company_logo/${product.foto_perusahaan}?t=${new Date().getTime()}`"></b-avatar>
                                        </div>
                                    </div>
                                </b-card>
                            </div>
                        </div>
                    </div> -->
                    <!-- <div class="col-12 py-5">
                        <b-tabs pills align="center">
                            <b-tab title="Spesifikasi" class="mt-4" v-html="product.spek_produk"></b-tab>
                            <b-tab title="Deskripsi" active class="mt-4" v-html="product.deskripsi"></b-tab>
                            <b-tab title="FAQ" class="mt-4" v-html="product.faq"></b-tab>
                        </b-tabs>
                    </div> -->
                </div>
            </b-col>
            <b-col cols="12" md="3">
                <div class="mp-product__detail-company">
                    <b-card class="mb-2" style="border-radius: 15px">
                        <b-img 
                            :src="baseUrl+'/company_logo/'+product.foto_perusahaan+`?t=${new Date().getTime()}`"
                            style="max-width: 100%; border-radius: 10px">
                        </b-img>
                        <b-card-text>
                            <p class="mt-3 mp-fs-20 mp-fw-600">{{product.nama_perusahaan}}</p>
                            <div class="d-flex align-items-center">
                                <b-icon font-scale="1.2" icon="geo-alt"></b-icon>
                                <span>{{ product.asal_kota }}</span>
                            </div>
                        </b-card-text>

                        <b-button :href="`/home/partnership/`+ product.id_partner" variant="primary" block pill>Kunjungi profile</b-button>
                    </b-card>
                </div>
            </b-col>
        </b-row>
    
    <!-- <div class="row mb-5">
        <div class="col-md-5">
            <b-img
                width="450" height="450" 
                :src="`${baseUrl}/products/${thumbnail}?t=${new Date().getTime()}`"
                style="object-fit: cover;max-width: -webkit-fill-available;"
                class="mb-2"
            ></b-img>
            <b-carousel
                :interval="4000"
                controls
                v-model="slide"
                v-if="product.katalog"
            >
                <b-carousel-slide v-for="(section,k) in Math.ceil(product.katalog.length / 3)" :key="k">
                    <template #img>
                        <div class="row">
                            <template v-for="(img,idx) in product.katalog">
                                <div class="col-4" 
                                    v-if="idx >= (k * 3) && idx < (3 * section)"
                                    :key="idx"
                                    :style="`width: 150px; height: 150px; background-size: cover; background-image: url('${baseUrl}/products/${img}')`" 
                                    @click="thumbnail = img">
                                </div>
                            </template>
                        </div>
                    </template>
                </b-carousel-slide>
            </b-carousel>
        </div>
        <div class="col-md-7">
            <div class="row">
                <div class="col-12">
                    <h2>{{ product.title }}</h2>
                    <h4 class="text-secondary">Produk dari {{ product.nama_perusahaan }}</h4>
                    <span class="text-primary font-weight-bold">{{ product.penempatan }}</span>
                </div>
                <div class="col-12 mb-4">
                    <b-button 
                        v-if="product.id_partner != getUserCredentials.id_user"
                        variant="primary" pill class="px-3" size="sm" 
                        @click="addWishlist(product.id_produk)">
                        Save <b-icon :icon="currWishlist ? 'bookmark-fill' : 'bookmark'"></b-icon>
                    </b-button>
                    <b-button 
                        v-if="product.id_partner == getUserCredentials.id_user"
                        variant="primary" pill class="px-3" size="sm"
                        @click="editProduct(product.id_produk)"
                        >
                        edit
                    </b-button>
                </div>
                <div class="col-12 py-4 border-top text-secondary">
                    <p class="m-0">Tipe : {{ product.tipe }}</p>
                    <p class="m-0">
                        Varian : <b-badge v-for="(v,j) in product.varian" :key="j" variant="light" class="shadow-sm px-4 py-2 mx-2">{{ v }}</b-badge>
                    </p>
                </div>
                <div class="col-12 pb-4 border-bottom">
                    <div class="row">
                        <div class="col-md-6 d-flex justify-content-center align-items-center">
                            <b-icon icon="telephone-fill" font-scale="1.5em" class="m-3"></b-icon>
                            <span>
                                {{ tmpHP }} <br>
                                <small><b-link @click="showNoHp">Tampilkan Nomor</b-link></small>
                            </span>
                        </div>
                        <div class="col-md-6">
                            <b-card border-variant="light" class="shadow">
                                <div class="row">
                                    <div class="col-9">
                                        {{ product.nama_perusahaan }} <br>
                                        <small class="text-secondary">{{ product.asal_kota }}</small>
                                    </div>
                                    <div class="col-3">
                                        <b-avatar :src="`${baseUrl}/company_logo/${product.foto_perusahaan}?t=${new Date().getTime()}`"></b-avatar>
                                    </div>
                                </div>
                            </b-card>
                        </div>
                    </div>
                </div>
                <div class="col-12 py-5">
                    <b-tabs pills align="center">
                        <b-tab title="Spesifikasi" class="mt-4" v-html="product.spek_produk"></b-tab>
                        <b-tab title="Deskripsi" active class="mt-4" v-html="product.deskripsi"></b-tab>
                        <b-tab title="FAQ" class="mt-4" v-html="product.faq"></b-tab>
                    </b-tabs>
                </div>
            </div>
        </div>
    </div> -->
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    export default {
        data() {
            return {
                baseUrl:process.env.BASE_FTP_URL,
                thumbnail:'',
                product:{},
                slide:0,
                tmpHP:'',
                alertMsg:'',
                currWishlist:false,
            }
        },
        computed: {
            ...mapGetters({
                'getUserCredentials':'auth/getUserCredentials',
            }),
        },
        methods: {
            showNoHp() {
                this.tmpHP = this.product.no_hp
            },
            async addWishlist(id_product) {
                try {
                    let result = await this.$axios.post(`/wishlist/${id_product}`, {}, { headers: {
                        'Content-Type': 'multipart/form-data',
                        "auth-token":this.$cookies.get('token')
                    }})
                    await this.getWishlistStatus()
                    this.$bvToast.toast(`${result.data.msg}`, {
                        variant: 'success',
                        autoHideDelay: 3000,
                        solid: true,
                        noCloseButton: true
                    })
                } catch (error) {
                    console.log(error)
                }
            },
            async getWishlistStatus() {
                let wishlistData = await this.$axios.get(`/wishlist`, { params:{}, headers: { 'auth-token': this.$cookies.get('token') } })
                let findWishlist = wishlistData.data.data.find(row => row.id_produk == this.product.id_produk)
                if(findWishlist)
                    this.currWishlist = true
                else 
                    this.currWishlist = false
            },

            editProduct(id){
                this.$router.push(`/home/products/details/edit/${id}`)
            }
        },
        async mounted() {
            let prodcutData = await this.$axios.get(`/products/detail/${this.$route.params.id}`)
            this.product = prodcutData.data.data[0]
            this.product.katalog = this.product.katalog && this.product.katalog.split(',')
            this.product.varian = this.product.varian.split(',')
            this.thumbnail = this.product.katalog[0]
            this.tmpHP = '+62********'
            await this.getWishlistStatus()

        }
    }
</script>

<style scoped>

</style>
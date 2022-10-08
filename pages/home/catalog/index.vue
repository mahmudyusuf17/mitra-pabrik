<template>
    <div class="mp-catalog">
        <div class="container">
            <b-row>
                <b-col cols="12" md="4">
                    <div class="mp-catalog__filter mp-box-shadow mb-5">
                        <b-input-group class="mp-search__form mt-3">    
                            <b-form-input
                                v-model="categorySearch"
                                placeholder="search"
                                class="rounded-pill border border-dark"
                                debounce="200"
                            ></b-form-input>
                            <template #append>
                                <b-icon icon="search"></b-icon>
                            </template>
                        </b-input-group>
                        <div class="mp-list-category mt-4">
                            <div class="mp-list-category__level-1" v-b-toggle="'collapse-'+1" v-for="(item, index) in category" :key="index">
                                <span> > {{item.tipe}}</span>
                            </div>
                            <!-- <div class="mp-list-category__level-1" v-b-toggle="'collapse-'+2">
                                <span> > Category 2</span>
                                <b-collapse id="collapse-2" class="mp-list-category__level-2 mt-2">
                                    <p> > Sub-category 1</p>
                                    <p> > Sub-category 2</p>
                                    <p> > Sub-category 3</p>
                                </b-collapse>
                            </div>
                            <div class="mp-list-category__level-1" v-b-toggle="'collapse-'+3">
                                <span> > Category 3</span>
                                <b-collapse id="collapse-3" class="mp-list-category__level-2 mt-2">
                                    <p> > Sub-category 1</p>
                                    <p> > Sub-category 2</p>
                                    <p> > Sub-category 3</p>
                                </b-collapse>
                            </div> -->
                        </div>
                    </div>
                    <div class="mp-catalog__ads" style="cursor: pointer">
                        <div class="mp-ads">
                            IKLAN
                        </div>
                    </div>
                </b-col>
                <b-col cols="12" md="8">
                    <div class="mp-catalog__product-list-carousel">
                        <b-carousel 
                        indicators
                        controls
                        class="mp-carousel__product"
                        >
                        <b-carousel-slide class="mp-slider__product" v-for="(slide, i) in products.length" :key="i">
                            <template v-slot:img>
                                <div class="mp-principal__product">
                                    <b-row>
                                        <b-col cols="12" md="3" v-for="(data, index) in products" :key="index">
                                            <nuxt-link :to="`/home/products/details/${data.id_produk}`" class="mp-link__black-color">
                                                <b-card
                                                    :img-src="`${baseUrl}/products/${data.katalog}?t=${new Date().getTime()}`"
                                                    img-alt="Image product"
                                                    img-top
                                                    tag="article"
                                                    style="max-width: 18rem; border-radius: 20px; cursor: pointer;"
                                                    class="mp-product__card mb-2 mp-box-shadow"
                                                    no-body
                                                >
                                                    <div class="mp-product__label d-flex justify-content-between align-items-center px-3 pt-3">
                                                        <div class="mp-product__wishlist">
                                                            <!-- <b-icon :icon="currWishlist ? 'bookmark-fill' : 'bookmark'"></b-icon> -->
                                                            <b-icon icon="bookmark"></b-icon>
                                                        </div>
                                                        <div class="mp-product__color">
                                                            <span style="background-color: #FF0000"></span>
                                                            <span style="background-color: #00FF00"></span>
                                                            <span style="background-color: #0000FF"></span>
                                                        </div>
                                                    </div>
                                                    <b-card-text class="px-3">
                                                        <h2 class="mp-fs-20 my-3">{{ data.title }}</h2>
                                                    </b-card-text>
                                                    <b-card-footer class="text-center" >brand</b-card-footer>
                                                </b-card>
                                            </nuxt-link>
                                        </b-col>
                                    </b-row>
                                </div>
                            </template>
                        </b-carousel-slide>
                        </b-carousel>
                        <div class="d-flex justify-content-end mt-2 mb-4">
                            <a href="#">Lihat semua</a>
                        </div>
                    </div>
                    <div class="mp-catalog__category mt-2">
                        <div class="mp-category__label">
                            <span class="mp-fs-20 mp-fw-600">Category 1 > sub category 1</span>
                        </div>
                        <div class="mp-catalog__filter-sort-and-search">
                            <b-dropdown id="dropdown-left" text="sort" variant="outline" class="mr-3 border border-dark mp-button-sort">
                                <b-dropdown-item href="#">Filter Sort</b-dropdown-item>
                                <b-dropdown-item href="#">Filter Sort</b-dropdown-item>
                                <b-dropdown-item href="#">Filter Sort</b-dropdown-item>
                            </b-dropdown>    
                            <b-input-group class="mp-search__form">
                                <b-form-input
                                    v-model="categorySearch"
                                    placeholder="search"
                                    class="rounded-pill border border-dark"
                                    debounce="200"
                                ></b-form-input>
                                <template #append>
                                    <b-icon icon="search"></b-icon>
                                </template>
                            </b-input-group>
                        </div>
                    </div>
                    <div class="mp-catalog__product-list mt-4">
                        <b-row>
                            <b-col cols="12" md="3"  v-for="(data, index) in products" :key="index" class="mb-4">
                                <nuxt-link :to="`/home/products/details/${data.id_produk}`" class="mp-link__black-color">
                                <b-card
                                    :img-src="`${baseUrl}/products/${data.katalog}?t=${new Date().getTime()}`"
                                    img-alt="Image product"
                                    img-top
                                    tag="article"
                                    style="max-width: 18rem; border-radius: 20px; cursor: pointer;"
                                    class="mp-product__card mb-2 mp-box-shadow"
                                    no-body
                                >
                                    <div class="mp-product__label d-flex justify-content-between align-items-center px-3 pt-3">
                                        <div class="mp-product__wishlist">
                                            <!-- <b-icon :icon="currWishlist ? 'bookmark-fill' : 'bookmark'"></b-icon> -->
                                            <b-icon icon="bookmark"></b-icon>
                                        </div>
                                        <div class="mp-product__color">
                                            <span style="background-color: #FF0000"></span>
                                            <span style="background-color: #00FF00"></span>
                                            <span style="background-color: #0000FF"></span>
                                        </div>
                                    </div>
                                    <b-card-text class="px-3">
                                        <h2 class="mp-fs-20 my-3">{{ data.title }}</h2>
                                    </b-card-text>
                                    <b-card-footer class="text-center" >brand</b-card-footer>
                                </b-card>
                                </nuxt-link>
                            </b-col>
                        </b-row>
                    </div>
                </b-col>
            </b-row>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                baseUrl: process.env.BASE_FTP_URL,
                categorySearch: "",
                visible: false,
                products: [],
                category: [],
                slides: [
                    [
                        "https://picsum.photos/1024/480/?image=45", 
                        "https://picsum.photos/1024/480/?image=40",
                        "https://picsum.photos/1024/480/?image=47",
                        "https://picsum.photos/1024/480/?image=47",
                    ],
                    [
                        "https://picsum.photos/1024/480/?image=48", 
                        "https://picsum.photos/1024/480/?image=39",
                        "https://picsum.photos/1024/480/?image=55",
                        "https://picsum.photos/1024/480/?image=47",
                    ],
                    [
                        "https://picsum.photos/1024/480/?image=51", 
                        "https://picsum.photos/1024/480/?image=52",
                        "https://picsum.photos/1024/480/?image=53",
                        "https://picsum.photos/1024/480/?image=47",
                    ]
                ],

                listCategory:[
                    [
                        "sub-category 1",
                        "sub-category 2",
                        "sub-category 3"
                    ],
                    [
                        "sub-category 1",
                        "sub-category 2",
                        "sub-category 3"
                    ],
                    [
                        "sub-category 1",
                        "sub-category 2",
                        "sub-category 3"
                    ]
                ]
            }
        },

       async mounted(){
            this.$emit('fullpage', false);
            
            let fetchProducts = await this.$axios.get(`/products`)
            if(fetchProducts.data != null){
                this.products = fetchProducts.data.data;
            }

            let fetchCategory = await this.$axios.get(`/products/tipe`)
            if(fetchCategory.data != null){
                this.category = fetchCategory.data.data;
            }
        }
    }
</script>
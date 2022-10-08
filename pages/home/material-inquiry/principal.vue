<template>
<div class="mp-material-inquiry__principal">
    <div class="container mp-material__principal">
        <div class="mp-title-page__with-shadow">
            <h1>Material Inquiry</h1>
        </div>
        <div class="mp-inquiry__filter mt-5">
            <b-dropdown id="dropdown-left" text="sort" variant="outline" class="mr-3 border border-dark mp-button-sort">
                <b-dropdown-item href="#">Terbaru</b-dropdown-item>
                <b-dropdown-item href="#">Terlama</b-dropdown-item>
            </b-dropdown>    
            <b-input-group class="mp-search__form">
                <b-form-input
                    v-model="materialSearch"
                    placeholder="search"
                    class="rounded-pill border border-dark"
                    debounce="200"
                ></b-form-input>
                <template #append>
                    <b-icon icon="search"></b-icon>
                </template>
            </b-input-group>
        </div>
        <div class="mp-inquiry__list-product mt-4">
            <b-row>
                <b-col cols="12" md="6" v-for="(item, i) in dataMaterial" :key="i" class="mb-5">
                    <nuxt-link to="/home/material-inquiry/detail" class="mp-link__redirect">
                    <b-card
                        :img-src="`https://mitrapabrik.sgp1.digitaloceanspaces.com/projects/${item.project_photo}`"
                        img-alt="Image"
                        img-top
                        tag="article"
                        class="mp-card__box-shadow"
                    >
                        <b-card-text>
                            <div class="d-flex justify-content-between mt-3">
                                <div class="mp-card-desc">
                                    <p>{{ item.project_name }}</p>
                                    <p>{{ item.project_city }}</p>
                                </div>
                                <div class="mp-card-desc">
                                    <p>{{ $formatIDDate(item.project_deadline) }}</p>
                                    <p>{{ item.person_name }}</p>
                                    <!-- <b-button 
                                        pill
                                        variant="outline-danger"
                                        size="md"
                                        :href="`https://wa.me/`+ item.person_phone"
                                    >Contact Whatsapp
                                    </b-button> -->
                                </div>
                            </div>
                        </b-card-text>
                    </b-card>
                    </nuxt-link>
                </b-col>
            </b-row>
            <div class="d-flex justify-content-center mt-4">
                <b-pagination v-model="currentPage" :total-rows="rows"></b-pagination>
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
                materialSearch: "",
                currentPage: 1,
                rows: 1,
                dataMaterial: [],
            }
        },
        methods: {
            
        },

        async mounted() {
            let fetchMaterials = await this.$axios.get(`/project`, {
                headers:{
                    "auth-token":this.$cookies.get('token')
                }
            })
            
            if(fetchMaterials.data != null){
                this.dataMaterial = fetchMaterials.data.data
            }

            this.$emit('fullpage', false);

        },
    }
</script>
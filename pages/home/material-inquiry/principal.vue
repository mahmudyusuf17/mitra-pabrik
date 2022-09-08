<template>
<div class="mp-material-inquiry__principal">
    <div class="container" style="min-height: 100vh; padding: 0 60px;">
        <div class="mp-title-page__with-shadow">
            <h1>Material Inquiry</h1>
        </div>
        <div class="mp-inquiry__filter">

        </div>
        <div class="mp-inquiry__list-product mt-4">
            <b-row>
                <b-col cols="12" md="6" v-for="(item, i) in 4" :key="i" class="mb-5">
                    <b-card
                        img-src="https://picsum.photos/600/300/?image=25"
                        img-alt="Image"
                        img-top
                        tag="article"
                        class="mp-card__box-shadow"
                    >
                        <b-card-text>
                            <div class="d-flex justify-content-between mt-3">
                                <div class="mp-card-desc">
                                    <p>nama proyek</p>
                                    <p>kota</p>
                                </div>
                                <div class="mp-card-desc">
                                    <p>tenggat waktu</p>
                                    <p>nama penyelenggara</p>
                                </div>
                            </div>
                        </b-card-text>
                    </b-card>
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
                showalert: false,
                loading:false,
                form: {
                    kebutuhan:'',
                    lokasi:'',
                    brand:'',
                    material_qty:'',
                },
                validation: {
                    kebutuhan:null,
                    lokasi:null,
                    brand:null,
                    material_qty:null,
                },
                rows: 100,
                currentPage: 1
            }
        },
        methods: {
            async onSubmit() {
                this.loading = true
                for(const key in this.validation) {
                    this.validation[key] = null
                }
                await this.$axios.post(`/requests`, this.form, { headers: {
                    "auth-token":this.$cookies.get('token')
                }})
                .then(res => {
                    this.showalert = true
                })
                .catch(err => {
                    err.response.data.errors.forEach(row => {
                        this.validation[row.param] = false
                    });
                })
                this.loading = false
            }
        },
    }
</script>

<style scoped>

</style>
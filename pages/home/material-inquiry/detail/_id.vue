<template>
<div class="mp-material-inquiry">
    <div class="container mp-material__container">
        <div class="mp-title-page__with-shadow">
            <h1>Material Inquiry</h1>
        </div>
        <div class="mp-card__transparant-form mt-5">
          <div class="mp-material-inquiry__form">
              <b-form>
                <div class="mp-form__group">
                  <b-row class="mb-4">
                      <b-col cols="4">
                        <p class="mb-0 mt-2 mp-fs-20 mp-fw-600">Tenggat Waktu: </p>
                      </b-col>
                      <b-col cols="6">
                        <b-form-datepicker 
                            v-model="form.project_deadline"
                            :value="dataMaterial.project_deadline" 
                            placeholder=""
                            class="rounded-pill bg-glass border border-dark"
                            locale="id"
                            disabled
                            >
                        </b-form-datepicker>
                      </b-col>
                  </b-row>
                  <b-row class="mb-4">
                      <b-col cols="4">
                        <p class="mb-0 mt-2 mp-fs-20 mp-fw-600">Nama contact person: </p>
                      </b-col>
                      <b-col cols="6">
                        <b-form-input
                            v-model="form.person_name"
                            type="text"
                            class="rounded-pill bg-glass border border-dark"
                            disabled
                        ></b-form-input>
                      </b-col>
                  </b-row>
                  <b-row class="mb-4">
                      <b-col cols="4">
                        <p class="mb-0 mt-2 mp-fs-20 mp-fw-600">Nomor telepon: </p>
                      </b-col>
                      <b-col cols="6">
                        <b-form-input
                            v-model="form.person_phone"
                            type="text"
                            class="rounded-pill bg-glass border border-dark"
                            disabled
                        ></b-form-input>
                      </b-col>
                  </b-row>
                  <b-row class="mb-4">
                      <b-col cols="4">
                        <p class="mb-0 mt-2 mp-fs-20 mp-fw-600">Nama proyek: </p>
                      </b-col>
                      <b-col cols="6">
                        <b-form-input
                            v-model="form.project_name"
                            type="text"
                            class="rounded-pill bg-glass border border-dark"
                            disabled
                        ></b-form-input>
                      </b-col>
                  </b-row>
                  <b-row class="mb-4">
                      <b-col cols="4">
                        <p class="mb-0 mt-2 mp-fs-20 mp-fw-600">Alamat proyek: </p>
                      </b-col>
                      <b-col cols="6">
                        <b-form-input
                            v-model="form.project_address"
                            type="text"
                            class="rounded-pill bg-glass border border-dark"
                            disabled
                        ></b-form-input>
                      </b-col>
                  </b-row>
                  <b-row class="mb-4">
                      <b-col cols="4">
                        <p class="mb-0 mt-2 mp-fs-20 mp-fw-600">Kota: </p>
                      </b-col>
                      <b-col cols="6">
                        <b-form-input
                            v-model="form.project_city"
                            type="text"
                            class="rounded-pill bg-glass border border-dark"
                            disabled
                        ></b-form-input>
                      </b-col>
                  </b-row>
                  <!-- <b-row class="mb-4">
                      <b-col cols="4">
                        <p class="mb-0 mt-2 mp-fs-20 mp-fw-600">Budget: </p>
                      </b-col>
                      <b-col cols="6">
                        <b-form-input
                            v-model="form.project_budget"
                            type="text"
                            class="rounded-pill bg-glass border border-dark"
                        ></b-form-input>
                        <b-form-invalid-f
                            Budget harus diisi
                        </b-form-invalid-feedback>
                      </b-col>
                  </b-row> -->
                  <b-row class="mb-4">
                      <b-col cols="4">
                        <p class="mb-0 mt-2 mp-fs-20 mp-fw-600">Catatan proyek: </p>
                      </b-col>
                      <b-col cols="6">
                            <b-form-textarea
                                id="textarea"
                                v-model="form.project_note"
                                rows="3"
                                max-rows="6"
                                class="border border-dark"
                                disabled
                                >
                            </b-form-textarea>
                      </b-col>
                  </b-row>
                  <b-row class="mb-4">
                      <b-col cols="4">
                        <p class="mb-0 mt-2 mp-fs-20 mp-fw-600">Status proyek: </p>
                      </b-col>
                      <b-col cols="6">
                        <b-form-input
                            v-model="form.project_status"
                            type="text"
                            class="rounded-pill bg-glass border border-dark"
                            disabled
                        ></b-form-input>
                      </b-col>
                  </b-row>
                  <b-row class="mb-4">
                      <b-col cols="4">
                        <p class="mb-0 mt-2 mp-fs-20 mp-fw-600">Upload foto proyek: </p>
                      </b-col>
                      <b-col cols="6">
                          <img :src="`https://mitrapabrik.sgp1.digitaloceanspaces.com/projects/${form.project_photo}`" width="200" height="200" alt="image foto proyek">
                        <!-- <b-form-file 
                            v-model="form.project_photo"
                            accept="image/jpeg, image/png, image/jiff"
                            name="uploadFoto"
                            class="border"
                            placeholder=""
                        ></b-form-file> -->
                      </b-col>
                  </b-row>
                  <b-row class="mb-4">
                      <b-col cols="4">
                        <p class="mb-0 mt-2 mp-fs-20 mp-fw-600">kebutuhan: </p>
                      </b-col>
                  </b-row>
                </div>

                <div class="mp-form__kebutuhan">
                    <b-row>
                        <b-col cols="12" md="4" class="mb-4" v-for="(data, index) in needs" :key="index">
                            <div class="mp-box__form">
                                <b-icon-x-lg v-show="index > 0" class="float-right mt-2" style="cursor:pointer" @click="remove(index)"></b-icon-x-lg>
                                <b-form-group
                                    id="input-group-1"
                                    label="Tipe barang:"
                                    label-for="input-1"
                                    label-class="mp-fs-20 mp-fw-600 mt-2"
                                >
                                    <b-form-input
                                        id="input-1"
                                        v-model="data.type"
                                        type="text"
                                        class="rounded-pill bg-glass border border-dark"
                                        disabled
                                    ></b-form-input>
                                </b-form-group>
                                <b-form-group
                                    id="input-group-1"
                                    label="Brand:"
                                    label-for="input-1"
                                    label-class="mp-fs-20 mp-fw-600"
                                >
                                    <b-form-input
                                        id="input-1"
                                        v-model="data.brand"
                                        type="text"
                                        class="rounded-pill bg-glass border border-dark"
                                        disabled
                                    ></b-form-input>
                                </b-form-group>
                                <b-form-group
                                    id="input-group-1"
                                    label="Material:"
                                    label-for="input-1"
                                    label-class="mp-fs-20 mp-fw-600"
                                >
                                    <b-form-input
                                        id="input-1"
                                        v-model="data.material"
                                        type="text"
                                        class="rounded-pill bg-glass border border-dark"
                                        disabled
                                    ></b-form-input>
                                </b-form-group>
                                <b-form-group
                                    id="input-group-1"
                                    label="Luas kebutuhan:"
                                    label-for="input-1"
                                    label-class="mp-fs-20 mp-fw-600"
                                >
                                    <b-form-input
                                        id="input-1"
                                        v-model="data.area_needed"
                                        type="text"
                                        class="rounded-pill bg-glass border border-dark"
                                        disabled
                                    ></b-form-input>
                                </b-form-group>
                                <b-form-group
                                    id="input-group-1"
                                    label="Ukuran:"
                                    label-for="input-1"
                                    label-class="mp-fs-20 mp-fw-600"
                                >
                                    <b-form-input
                                        id="input-1"
                                        v-model="data.size"
                                        type="text"
                                        class="rounded-pill bg-glass border border-dark"
                                        disabled
                                    ></b-form-input>
                                </b-form-group>
                                <b-form-group
                                    id="input-group-1"
                                    label="Quantity:"
                                    label-for="input-1"
                                    label-class="mp-fs-20 mp-fw-600"
                                >
                                    <b-form-input
                                        id="input-1"
                                        v-model="data.quantity"
                                        type="number"
                                        class="rounded-pill bg-glass border border-dark"
                                        disabled
                                    ></b-form-input>
                                </b-form-group>
                                <b-form-group
                                    id="input-group-1"
                                    label="Budget:"
                                    label-for="input-1"
                                    label-class="mp-fs-20 mp-fw-600"
                                >
                                    <b-form-input
                                        id="input-1"
                                        v-model="data.budget"
                                        type="text"
                                        class="rounded-pill bg-glass border border-dark"
                                        disabled
                                    ></b-form-input>
                                </b-form-group>
                                <b-form-group
                                    id="input-group-1"
                                    label="Upload Gambar Kerja:"
                                    label-for="input-1"
                                    label-class="mp-fs-20 mp-fw-600"
                                >
                                <img :src="`https://mitrapabrik.sgp1.digitaloceanspaces.com/projects/${data.photo}`" width="200" height="200" alt="image foto proyek">
                                </b-form-group>
                                <div class="d-flex justify-content-center mt-5">
                                    <b-button variant="primary" pill class="mb-3 px-5" size="lg" :href="`https://wa.me/`+ form.person_phone">Reply</b-button>
                                </div>
                            </div>
                        </b-col>
                    </b-row>
                </div>
              </b-form>
          </div>
        </div>
    </div>
</div>
</template>

<script>
    export default {
        data() {
            return {
                count: 1,
                values:{},
                form:{
                    project_deadline: "",
                    person_name: "",
                    person_phone: "",
                    project_name: "",
                    project_address: "",
                    project_city: "",
                    project_budget: "",
                    project_note: "",
                    project_status: "",
                    project_photo: [],
                },
                needs: [
                    {
                        type: "",
                        brand: "",
                        material: "",
                        area_needed: "",
                        size: "",
                        quantity: "",
                        budget: "",
                        photo: [],
                        project_id: "" 
                    }
                ],
                uploadFoto: [],
                dataMaterial:{}
            }
        },

        async mounted(){
            var id = this.$route.params.id;
            let fetchMaterialDetail = await this.$axios.get(`/project/${id}`, {
                headers:{
                    "auth-token":this.$cookies.get('token')
                }
            })

            
            if(fetchMaterialDetail.data != null){
                this.dataMaterial = fetchMaterialDetail.data.data[0]
                this.form = fetchMaterialDetail.data.data[0]
                var needs = fetchMaterialDetail.data.data[0].materials

                if(needs != null){
                    var parsingNeeds = JSON.parse(needs)
                    this.needs = parsingNeeds;
                }

                console.log(JSON.parse(needs))
            }

            this.$emit('fullpage', true);
        }
    }
</script>
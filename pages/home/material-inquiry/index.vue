<template>
<div class="mp-material-inquiry">
    <div class="container" style="min-height: 100vh; padding: 180px 80px;">
        <div class="mp-title-page__with-shadow">
            <h1>Material Inquiry</h1>
        </div>
        <div class="mp-card__transparant-form mt-5">
          <div class="mp-material-inquiry__form">
              <b-form @submit.prevent="submit">
                <div class="mp-form__group">
                  <b-row class="mb-4">
                      <b-col cols="4">
                        <p class="mb-0 mt-2 mp-fs-20 mp-fw-600">Tenggat Waktu: </p>
                      </b-col>
                      <b-col cols="6">
                        <b-form-datepicker 
                            v-model="form.project_deadline" 
                            :state="validation.project_deadline"
                            placeholder=""
                            class="rounded-pill bg-glass border border-dark"
                            locale="id"
                            >
                        </b-form-datepicker>
                        <b-form-invalid-feedback :state="validation.project_deadline">
                            
                        </b-form-invalid-feedback>
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
                            :state="validation.person_name"
                            class="rounded-pill bg-glass border border-dark"
                        ></b-form-input>
                        <b-form-invalid-feedback :state="validation.person_name">
                            Tenggat waktu harus diisi
                        </b-form-invalid-feedback>
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
                            :state="validation.person_phone"
                            class="rounded-pill bg-glass border border-dark"
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
                            :state="validation.project_name"
                            class="rounded-pill bg-glass border border-dark"
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
                            :state="validation.project_address"
                            class="rounded-pill bg-glass border border-dark"
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
                            :state="validation.project_city"
                            class="rounded-pill bg-glass border border-dark"
                        ></b-form-input>
                      </b-col>
                  </b-row>
                  <b-row class="mb-4">
                      <b-col cols="4">
                        <p class="mb-0 mt-2 mp-fs-20 mp-fw-600">Budget: </p>
                      </b-col>
                      <b-col cols="6">
                        <b-form-input
                            v-model="form.project_budget"
                            type="text"
                            :state="validation.project_budget"
                            class="rounded-pill bg-glass border border-dark"
                        ></b-form-input>
                      </b-col>
                  </b-row>
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
                            :state="validation.project_status"
                            class="rounded-pill bg-glass border border-dark"
                        ></b-form-input>
                      </b-col>
                  </b-row>
                  <b-row class="mb-4">
                      <b-col cols="4">
                        <p class="mb-0 mt-2 mp-fs-20 mp-fw-600">Upload foto proyek: </p>
                      </b-col>
                      <b-col cols="6">
                        <b-form-file 
                            v-model="form.project_photo"
                            accept="image/jpeg, image/png, image/jiff"
                            name="uploadFoto"
                            class="border"
                            placeholder=""
                        ></b-form-file>
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
                        <!-- <b-col cols="4" v-for="(key, index) in count" :key="index" class="mb-4">
                            <div class="mp-box__form">
                                <b-icon-x-lg v-show="index > 0" class="float-right mt-2" style="cursor:pointer" @click="remove()"></b-icon-x-lg>
                                <b-form-group
                                    id="input-group-1"
                                    label="Tipe barang:"
                                    label-for="input-1"
                                    label-class="mp-fs-20 mp-fw-600 mt-2"
                                >
                                    <b-form-input
                                        id="input-1"
                                        v-model="kebutuhan.type"
                                        type="email"
                                        :state="validation.type"
                                        class="rounded-pill bg-glass border border-dark"
                                    ></b-form-input>
                                    <b-form-invalid-feedback :state="validation.type">
                                        Email harus diisi
                                    </b-form-invalid-feedback>
                                </b-form-group>
                                <b-form-group
                                    id="input-group-1"
                                    label="Brand:"
                                    label-for="input-1"
                                    label-class="mp-fs-20 mp-fw-600"
                                >
                                    <b-form-input
                                        id="input-1"
                                        v-model="kebutuhan.brand"
                                        type="email"
                                        :state="validation.brand"
                                        class="rounded-pill bg-glass border border-dark"
                                    ></b-form-input>
                                    <b-form-invalid-feedback :state="validation.brand">
                                        Email harus diisi
                                    </b-form-invalid-feedback>
                                </b-form-group>
                                <b-form-group
                                    id="input-group-1"
                                    label="Material:"
                                    label-for="input-1"
                                    label-class="mp-fs-20 mp-fw-600"
                                >
                                    <b-form-input
                                        id="input-1"
                                        v-model="kebutuhan.material"
                                        type="email"
                                        :state="validation.material"
                                        class="rounded-pill bg-glass border border-dark"
                                    ></b-form-input>
                                    <b-form-invalid-feedback :state="validation.material">
                                        Email harus diisi
                                    </b-form-invalid-feedback>
                                </b-form-group>
                                <b-form-group
                                    id="input-group-1"
                                    label="Luas kebutuhan:"
                                    label-for="input-1"
                                    label-class="mp-fs-20 mp-fw-600"
                                >
                                    <b-form-input
                                        id="input-1"
                                        v-model="kebutuhan.area_needed"
                                        type="email"
                                        :state="validation.area_needed"
                                        class="rounded-pill bg-glass border border-dark"
                                    ></b-form-input>
                                    <b-form-invalid-feedback :state="validation.area_needed">
                                        Email harus diisi
                                    </b-form-invalid-feedback>
                                </b-form-group>
                                <b-form-group
                                    id="input-group-1"
                                    label="Ukuran:"
                                    label-for="input-1"
                                    label-class="mp-fs-20 mp-fw-600"
                                >
                                    <b-form-input
                                        id="input-1"
                                        v-model="kebutuhan.size"
                                        type="email"
                                        :state="validation.size"
                                        class="rounded-pill bg-glass border border-dark"
                                    ></b-form-input>
                                    <b-form-invalid-feedback :state="validation.size">
                                        Email harus diisi
                                    </b-form-invalid-feedback>
                                </b-form-group>
                                <b-form-group
                                    id="input-group-1"
                                    label="Quantity:"
                                    label-for="input-1"
                                    label-class="mp-fs-20 mp-fw-600"
                                >
                                    <b-form-input
                                        id="input-1"
                                        v-model="kebutuhan.quantity"
                                        type="email"
                                        :state="validation.quantity"
                                        class="rounded-pill bg-glass border border-dark"
                                    ></b-form-input>
                                    <b-form-invalid-feedback :state="validation.quantity">
                                        Email harus diisi
                                    </b-form-invalid-feedback>
                                </b-form-group>
                                <b-form-group
                                    id="input-group-1"
                                    label="project_budget:"
                                    label-for="input-1"
                                    label-class="mp-fs-20 mp-fw-600"
                                >
                                    <b-form-input
                                        id="input-1"
                                        v-model="kebutuhan.budget"
                                        type="email"
                                        :state="validation.budget"
                                        class="rounded-pill bg-glass border border-dark"
                                    ></b-form-input>
                                    <b-form-invalid-feedback :state="validation.budget">
                                        Email harus diisi
                                    </b-form-invalid-feedback>
                                </b-form-group>
                                <b-form-group
                                    id="input-group-1"
                                    label="Upload Gambar Kerja:"
                                    label-for="input-1"
                                    label-class="mp-fs-20 mp-fw-600"
                                >
                                    <b-form-file 
                                        v-model="kebutuhan.foto"
                                        accept="image/jpeg, image/png, image/jiff"
                                        name="uploadFoto"
                                        class="border"
                                        placeholder=""
                                    ></b-form-file>
                                    <b-form-invalid-feedback :state="validation.foto">
                                        Email harus diisi
                                    </b-form-invalid-feedback>
                                </b-form-group>
                            </div>
                        </b-col> -->

                        <b-col cols="4" class="mb-4" v-for="(data, index) in needs" :key="index">
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
                                        :state="validation.type"
                                        class="rounded-pill bg-glass border border-dark"
                                    ></b-form-input>
                                    <b-form-invalid-feedback :state="validation.type">
                                        Email harus diisi
                                    </b-form-invalid-feedback>
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
                                        :state="validation.brand"
                                        class="rounded-pill bg-glass border border-dark"
                                    ></b-form-input>
                                    <b-form-invalid-feedback :state="validation.brand">
                                        Email harus diisi
                                    </b-form-invalid-feedback>
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
                                        :state="validation.material"
                                        class="rounded-pill bg-glass border border-dark"
                                    ></b-form-input>
                                    <b-form-invalid-feedback :state="validation.material">
                                        Email harus diisi
                                    </b-form-invalid-feedback>
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
                                        :state="validation.area_needed"
                                        class="rounded-pill bg-glass border border-dark"
                                    ></b-form-input>
                                    <b-form-invalid-feedback :state="validation.area_needed">
                                        Email harus diisi
                                    </b-form-invalid-feedback>
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
                                        :state="validation.size"
                                        class="rounded-pill bg-glass border border-dark"
                                    ></b-form-input>
                                    <b-form-invalid-feedback :state="validation.size">
                                        Email harus diisi
                                    </b-form-invalid-feedback>
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
                                        :state="validation.quantity"
                                        class="rounded-pill bg-glass border border-dark"
                                    ></b-form-input>
                                    <b-form-invalid-feedback :state="validation.quantity">
                                        Email harus diisi
                                    </b-form-invalid-feedback>
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
                                        :state="validation.budget"
                                        class="rounded-pill bg-glass border border-dark"
                                    ></b-form-input>
                                    <b-form-invalid-feedback :state="validation.budget">
                                        Email harus diisi
                                    </b-form-invalid-feedback>
                                </b-form-group>
                                <b-form-group
                                    id="input-group-1"
                                    label="Upload Gambar Kerja:"
                                    label-for="input-1"
                                    label-class="mp-fs-20 mp-fw-600"
                                >
                                    <b-form-file 
                                        v-model="data.photo"
                                        accept="image/jpeg, image/png, image/jiff"
                                        name="uploadFoto"
                                        class="border"
                                        placeholder=""
                                    ></b-form-file>
                                    <b-form-invalid-feedback :state="validation.photo">
                                        Email harus diisi
                                    </b-form-invalid-feedback>
                                </b-form-group>
                            </div>
                        </b-col>

                        <b-col cols="4">
                            <div class="mp-box__form">
                                <div class="mp-button__add-form" @click="add">
                                    <b-icon icon="plus" font-scale="4"></b-icon>
                                    <p class="mb-0">Tambah</p>
                                </div>
                            </div>
                        </b-col>
                    </b-row>
                </div>

                <div class="d-flex justify-content-end pr-5 pb-5">
                    <b-button variant="primary" pill type="submit" class="mb-3 px-5" size="lg">Submit</b-button>
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
                // kebutuhan: {
                //     type: "",
                //     brand: "",
                //     material: "",
                //     area_needed: "",
                //     size: "",
                //     quantity: "",
                //     budget: "",
                //     photo: []
                // },
                validation:{
                    project_deadline: null,
                    person_name: null,
                    person_phone: null,
                    project_name: null,
                    project_address: null,
                    project_city: null,
                    project_budget: null,
                    project_note: null,
                    project_status: null,
                    type: null,
                    brand: null,
                    material: null,
                    area_needed: null,
                    size: null,
                    quantity: null,
                    budget: null,
                    project_photo: null,
                    photo: null,
                },
                msg: {
                    project_deadline: "",
                    person_name: "",
                    person_phone: "",
                    project_name: "",
                    project_address: "",
                    project_city: "",
                    project_budget: "",
                    project_note: "",
                    project_status: "",
                    type: "",
                    brand: "",
                    material: "",
                    area_needed: "",
                    size: "",
                    quantity: "",
                    budget: "",
                    project_photo: "",
                    foto: "",
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
            }
        },
        methods: {
            add(){
                // this.count++
                this.needs.push({
                    type: "",
                    brand: "",
                    material: "",
                    area_needed: "",
                    size: "",
                    quantity: "",
                    budget: "",
                    photo: [] 
                });
            },

            remove(index){
                // this.count--
                this.needs.splice(index, 1);
            },

            async submit(){
                for (const key in this.validation) {
                    this.validation[key] = null
                }
                let formData = new FormData();
                for (const key in this.form) {
                    formData.append(key, this.form[key])
                }
                
                await this.$axios.post("/project", formData, {
                    headers:{
                        'Content-Type': 'multipart/form-data',
                        "auth-token":this.$cookies.get('token')
                    }
                }).then(res => {
                    if(res.data.data != null){
                        let formDataNeeds = new FormData();

                        if(this.needs != null){
                            console.log(this.needs)
                            this.needs.forEach(arr =>{
                                arr.project_id  = res.data.data.id

                            for (const key in arr) {
                                formDataNeeds.append(key, arr[key])
                                }
                            })
                        }
                        
                        for (const pair of formDataNeeds.entries()) {
                            console.log(`${pair[0]} -> ${pair[1]}`);
                        }
                        
                        this.$axios.post("/material", formDataNeeds, {
                            headers:{
                                'Content-Type': 'multipart/form-data',
                                "auth-token":this.$cookies.get('token')
                            }
                        }).then(response => {
                            console.log(response, "response")
                            this.openModalSuccess()
                            // location.reload()
                        }).catch(err => {
                            console.log(err, "error")
                            // err.data.errors.forEach(row => {
                            //     this.validation[row] = false
                            //     this.msg[row] = row
                            // });
                            err.response.data.errors.forEach(row => {
                                this.validation[row] = false
                                this.msg[row] = row
                            });
                        })
                    }
                })
                .catch(err => {
                    //  console.log(err, "error")
                     err.response.data.errors.forEach(row => {
                        console.log(row)
                        this.validation[row] = false
                        this.msg[row] = row
                        console.log(this.msg[row.param])
                    });
                })
            },

            openModalSuccess() {
                this.boxTwo = ''
                this.$bvModal.msgBoxOk('Data was submitted successfully', {
                size: 'sm',
                buttonSize: 'sm',
                okVariant: 'success',
                headerClass: 'p-2 border-bottom-0',
                footerClass: 'p-2 border-top-0',
                centered: true
            }).then(value => {
                location.reload()
            })
            .catch(err => {
            })
            }
        },

        mounted(){
            this.$emit('fullpage', true);
        }
    }
</script>
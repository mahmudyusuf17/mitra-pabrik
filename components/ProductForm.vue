<template>
    <div class="mp-product__page">
        <div class="mt-4 mb-5">
            <h1 v-if="!edit">Tambah Produk Baru</h1>
            <h1 v-else>Edit Produk</h1>
        </div>
        <b-row>
            <b-col cols="4">
                <div class="mp-product__thumbnail" v-if="edit"  v-show="!editFoto">
                    <b-img
                        :src="`${baseUrl}/products/${thumbnail}?t=${new Date().getTime()}`"
                        style="object-fit: cover;max-width: -webkit-fill-available;"
                    ></b-img>
                    <!-- <b-button variant="dark" pill class="px-5 mt-2 position-absolut" style="bottom: 15px;" @click="removeFile(idx)" size="sm">X remove</b-button> -->
                    <b-carousel
                        :interval="4000"
                        controls
                        v-model="slide"
                        v-if="form.katalog"
                        class="mt-2"
                    >
                        <b-carousel-slide v-for="(section,k) in Math.ceil(form.katalog.length / 3)" :key="k">
                            <template #img>
                                <div class="row">
                                    <template v-for="(img,idx) in form.katalog">
                                        <div class="col-4" 
                                            v-if="idx >= (k * 3) && idx < (3 * section)"
                                            :key="idx"
                                            :style="`width: 100px; height: 100px; background-size: cover; background-image: url('${baseUrl}/products/${img}')`" 
                                            @click="thumbnail = img">
                                        </div>
                                    </template>
                                </div>
                            </template>
                        </b-carousel-slide>
                    </b-carousel>
                </div>
                <div class="mp-product__thumbnail" v-else>
                    <div class="row mt-3">
                        <div class="col-12 justify-content-center align-items-center mb-3" v-for="(tmp,idx) in tempUrl" :key="idx">
                            <div class="p-3 card h-100 text-center">
                                <b-img :src="tmp" fluid  class="shadow mb-2"></b-img>
                                <b-button variant="dark" pill class="px-5 mt-2 position-absolut" style="bottom: 15px;" @click="removeFile(idx)" size="sm">X remove</b-button>
                            </div>
                        </div>
                    </div>
                    <div style="background-color: #f0f0f0; width: 100%; max-height: 100%; padding: 200px; border-radius: 15px;" v-if="showPlacholder">
                    </div>
                    <!-- <b-img
                        :src="`${baseUrl}/products/${thumbnail}?t=${new Date().getTime()}`"
                        style="object-fit: cover;max-width: -webkit-fill-available;"
                    ></b-img>
                    <b-carousel
                        :interval="4000"
                        controls
                        v-model="slide"
                        v-if="form.katalog"
                        class="mt-2"
                    >
                        <b-carousel-slide v-for="(section,k) in Math.ceil(form.katalog.length / 3)" :key="k">
                            <template #img>
                                <div class="row">
                                    <template v-for="(img,idx) in form.katalog">
                                        <div class="col-4" 
                                            v-if="idx >= (k * 3) && idx < (3 * section)"
                                            :key="idx"
                                            :style="`width: 100px; height: 100px; background-size: cover; background-image: url('${baseUrl}/products/${img}')`" 
                                            @click="thumbnail = img">
                                        </div>
                                    </template>
                                </div>
                            </template>
                        </b-carousel-slide>
                    </b-carousel> -->
                </div>

                <div class="mp-product__edit-gambar" v-show="editFoto">
                    <b-form-group
                        id="input-group-katalog"
                        label="Upload Katalog Produk (minimal 1)"
                        label-for="input-katalog"
                        class="mt-3"
                    >
                        <b-form-file 
                            accept="image/jpeg, image/png, image/jiff"
                            id="input-katalog" 
                            multiple 
                            class="bg-glass"
                            :state="validation.katalog"
                            v-model="form.katalog"
                            @input="uploadPicture"
                        ></b-form-file>
                        <b-form-invalid-feedback :state="validation.katalog">
                            Format file yang diterima: .png .jpg .jpeg. jfif
                        </b-form-invalid-feedback>

                        <div class="row mt-3">
                            <div class="col-auto d-flex justify-content-center align-items-center" v-for="(tmp,idx) in tempUrl" :key="idx">
                                <div class="p-3 card h-100">
                                    <b-img :src="tmp" fluid width="150" height="150" class="shadow mb-5"></b-img>
                                    <b-button variant="dark" pill class="px-5 mt-2 position-absolute" style="bottom: 15px;" @click="removeFile(idx)" size="sm">X remove</b-button>
                                </div>
                            </div>
                        </div>
                    </b-form-group>
                </div>
                
                <div class="mp-product__buttons mt-3" v-if="edit">
                    <b-button variant="primary" pill block @click="editFoto = !editFoto">
                        Edit Foto
                    </b-button>
                    <b-button variant="primary" pill block>
                        Upload Catalog
                    </b-button>
                </div>
                <div class="mp-product__buttons mt-3" v-else>
                    <b-button variant="primary" pill block @click="editFoto = true">
                        Upload Foto
                    </b-button>
                </div>
            </b-col>
            <b-col cols="8">
                <div class="mp-product__form ml-5 mr-5">
                    <div class="mp-product__form-list">
                        <b-form-group
                            id="input-group-title"
                            label="Nama Produk:"
                            label-for="input-title"
                            class="mp-fw-600"
                        >
                            <b-form-input
                                id="input-title"
                                v-model="form.title"
                                placeholder="Nama produk anda"
                                :state="validation.title"
                                class="rounded-xl bg-glass"
                            ></b-form-input>
                            <b-form-invalid-feedback :state="validation.title">
                                {{ msg.title }}
                            </b-form-invalid-feedback>
                        </b-form-group>

                        <div class="row">
                            <div class="col-6">
                                <b-form-group
                                    id="input-group-tipe"
                                    label="Tipe Produk:"
                                    label-for="input-tipe"
                                >
                                    <b-form-select 
                                        id="input-tipe"
                                        v-model="form.tipe"
                                        :state="validation.tipe"
                                        :options="listTipe"
                                        class="rounded-xl bg-glass"
                                    >
                                    </b-form-select>
                                    <b-form-invalid-feedback :state="validation.tipe">
                                        {{ msg.tipe }}
                                    </b-form-invalid-feedback>
                                </b-form-group>
                            </div>
                            <div class="col-6">
                                <b-form-group
                                    id="input-group-penempatan"
                                    label="Penempatan Produk:"
                                    label-for="input-penempatan"
                                >
                                    <b-form-select 
                                        id="input-penempatan"
                                        v-model="form.penempatan"
                                        :state="validation.penempatan"
                                        :options="['Indoor','Outdoor','Indoor/Outdoor']"
                                        class="rounded-xl bg-glass"
                                    >
                                    </b-form-select>
                                    <b-form-invalid-feedback :state="validation.penempatan">
                                        {{ msg.penempatan }}
                                    </b-form-invalid-feedback>
                                </b-form-group>
                            </div>
                        </div>
                        <b-form-group
                            id="input-group-spek_produk"
                            label="Spesifikasi Produk:"
                            label-for="input-spek_produk"
                        >
                            <b-form-textarea
                                id="input-spek_produk"
                                v-model="form.spek_produk"
                                :state="validation.spek_produk"
                                class="rounded-xl bg-glass"
                                placeholder="Tuliskan dimensi dari produk, ex: Tinggi 100cm, tebal 5mm"
                            >
                            </b-form-textarea>
                            <b-form-invalid-feedback :state="validation.spek_produk">
                                {{ msg.spek_produk }}
                            </b-form-invalid-feedback>
                        </b-form-group>
                        <b-form-group
                            id="input-group-varian"
                            label="Varian:"
                            label-for="input-varian"
                        >
                            <b-form-tags 
                                input-id="input-varian" 
                                tag-pills
                                v-model="form.varian"
                                separator=" "
                                :limit="5"
                                placeholder="Masukkan varian / tipe dipisah dengan spasi."
                                class="rounded-xl bg-glass"
                                duplicate-tag-text="varian duplikat"
                                limit-tags-text="maksimal 5 varian"
                                :state="validation.varian"
                            >
                            </b-form-tags>
                            <b-form-invalid-feedback :state="validation.varian">
                                {{ msg.varian }}
                            </b-form-invalid-feedback>
                        </b-form-group>
                        
                        <b-form-group
                            id="input-group-deskripsi"
                            label="Deskripsi Produk:"
                            label-for="input-deskripsi"
                        >
                            <b-form-textarea
                                id="input-deskripsi"
                                v-model="form.deskripsi"
                                placeholder="Tuliskan kelebihan, manfaat bila di gunakan dan produk tidak boleh terkena apa dan cara pasang nya harus seperti apa"
                                :state="validation.deskripsi"
                                class="rounded-xl bg-glass"
                                style="min-height: 300px;"
                            ></b-form-textarea>
                            <b-form-invalid-feedback :state="validation.deskripsi">
                                {{ msg.deskripsi }}
                            </b-form-invalid-feedback>
                        </b-form-group>
                    </div>
                </div>

                <b-overlay
                    :show="loadingSubmit"
                    rounded
                    opacity="0.6"
                    spinner-small
                    spinner-variant="light"
                    class="d-inline-block float-right mr-5 mt-5"
                >
                    <b-button variant="primary" class="px-5 mb-5" pill @click="editProduct" size="lg" v-if="edit">Edit Product</b-button>
                    <b-button variant="primary" class="px-5 mb-5" pill @click="submitProduct" size="lg" v-else>Submit Product</b-button>
                </b-overlay>
            </b-col>
        </b-row>

        <!-- <div class="col-12">
            <b-form-group
                id="input-group-title"
                label="Nama Produk:"
                label-for="input-title"
            >
                <b-form-input
                    id="input-title"
                    v-model="form.title"
                    placeholder="Nama produk anda"
                    :state="validation.title"
                    class="rounded-xl bg-glass"
                ></b-form-input>
                <b-form-invalid-feedback :state="validation.title">
                    {{ msg.title }}
                </b-form-invalid-feedback>
            </b-form-group>
            <div class="row">
                <div class="col-6">
                    <b-form-group
                        id="input-group-tipe"
                        label="Tipe Produk:"
                        label-for="input-tipe"
                    >
                        <b-form-select 
                            id="input-tipe"
                            v-model="form.tipe"
                            :state="validation.tipe"
                            :options="listTipe"
                            class="rounded-xl bg-glass"
                        >
                        </b-form-select>
                        <b-form-invalid-feedback :state="validation.tipe">
                            {{ msg.tipe }}
                        </b-form-invalid-feedback>
                    </b-form-group>
                </div>
                <div class="col-6">
                    <b-form-group
                        id="input-group-penempatan"
                        label="Penempatan Produk:"
                        label-for="input-penempatan"
                    >
                        <b-form-select 
                            id="input-penempatan"
                            v-model="form.penempatan"
                            :state="validation.penempatan"
                            :options="['Indoor','Outdoor','Indoor/Outdoor']"
                            class="rounded-xl bg-glass"
                        >
                        </b-form-select>
                        <b-form-invalid-feedback :state="validation.penempatan">
                            {{ msg.penempatan }}
                        </b-form-invalid-feedback>
                    </b-form-group>
                </div>
            </div>
            <b-form-group
                id="input-group-spek_produk"
                label="Spesifikasi Produk:"
                label-for="input-spek_produk"
            >
                <b-form-textarea
                    id="input-spek_produk"
                    v-model="form.spek_produk"
                    :state="validation.spek_produk"
                    class="rounded-xl bg-glass"
                    placeholder="Tuliskan dimensi dari produk, ex: Tinggi 100cm, tebal 5mm"
                >
                </b-form-textarea>
                <b-form-invalid-feedback :state="validation.spek_produk">
                    {{ msg.spek_produk }}
                </b-form-invalid-feedback>
            </b-form-group>
            <b-form-group
                id="input-group-varian"
                label="Varian:"
                label-for="input-varian"
            >
                <b-form-tags 
                    input-id="input-varian" 
                    tag-pills
                    v-model="form.varian"
                    separator=" "
                    :limit="5"
                    placeholder="Masukkan varian / tipe dipisah dengan spasi."
                    class="rounded-xl bg-glass"
                    duplicate-tag-text="varian duplikat"
                    limit-tags-text="maksimal 5 varian"
                    :state="validation.varian"
                >
                </b-form-tags>
                <b-form-invalid-feedback :state="validation.varian">
                    {{ msg.varian }}
                </b-form-invalid-feedback>
            </b-form-group>
            
            <b-form-group
                id="input-group-deskripsi"
                label="Deskripsi Produk:"
                label-for="input-deskripsi"
            >
                <b-form-textarea
                    id="input-deskripsi"
                    v-model="form.deskripsi"
                    placeholder="Tuliskan kelebihan, manfaat bila di gunakan dan produk tidak boleh terkena apa dan cara pasang nya harus seperti apa"
                    :state="validation.deskripsi"
                    class="rounded-xl bg-glass"
                    style="min-height: 300px;"
                ></b-form-textarea>
                <b-form-invalid-feedback :state="validation.deskripsi">
                    {{ msg.deskripsi }}
                </b-form-invalid-feedback>
            </b-form-group>
            <b-form-group
                id="input-group-katalog"
                label="Upload Katalog Produk (minimal 1)"
                label-for="input-katalog"
            >
                <b-form-file 
                    accept="image/jpeg, image/png, image/jiff"
                    id="input-katalog" 
                    multiple 
                    class="bg-glass"
                    :state="validation.katalog"
                    v-model="form.katalog"
                    @input="uploadPicture"
                ></b-form-file>
                <b-form-invalid-feedback :state="validation.katalog">
                    Format file yang diterima: .png .jpg .jpeg. jfif
                </b-form-invalid-feedback>

                <div class="row mt-3">
                    <div class="col-auto d-flex justify-content-center align-items-center" v-for="(tmp,idx) in tempUrl" :key="idx">
                        <div class="p-3 card h-100">
                            <b-img :src="tmp" fluid width="150" height="150" class="shadow mb-5"></b-img>
                            <b-button variant="dark" pill class="px-5 mt-2 position-absolute" style="bottom: 15px;" @click="removeFile(idx)" size="sm">X remove</b-button>
                        </div>
                    </div>
                </div>
            </b-form-group>
            <b-form-group
                id="input-group-faq"
                label="FAQ (jika diperlukan):"
                label-for="input-faq"
            >
                <b-form-textarea
                    id="input-faq"
                    v-model="form.faq"
                    placeholder="Sertakan satu atau lebih pertanyaan mengenai produk"
                    class="rounded-xl bg-glass"
                    style="min-height: 300px;"
                ></b-form-textarea>
            </b-form-group>
            <b-overlay
                :show="loadingSubmit"
                rounded
                opacity="0.6"
                spinner-small
                spinner-variant="light"
                class="d-inline-block"
            >
                <b-button variant="primary" class="px-5 mb-5" pill @click="editProduct" size="sm" v-if="edit">Edit Product</b-button>
                <b-button variant="primary" class="px-5 mb-5" pill @click="submitProduct" size="sm" v-else>Submit Product</b-button>
            </b-overlay>
        </div> -->
        <b-modal centered content-class="shadow" title="OK" v-model="showAlertModal" hide-footer hide-header no-close-on-backdrop>
            <p class="my-2 text-center" v-if="!edit">
                Produk berhasil ditambahkan!
            </p>
            <p class="my-2 text-center" v-else>
                Produk berhasil diperbarui!
            </p>
            <div class="row">
                <div class="col-md-12 d-flex justify-content-center">
                    <nuxt-link to="/home/profile" class="btn btn-primary rounded-pill px-5 text-center" @click.native="showAlertModal = false">OK</nuxt-link>
                </div>
            </div>
        </b-modal>
    </div>
</template>

<script>
    export default {
        props:["edit","payload"],
        data() {
            return {
                loadingSubmit: false,
                showAlertModal:false,
                tempUrl:[],
                satuan: 'mm',
                form: {
                    title:'',
                    tipe:'',
                    spek_produk:'',
                    penempatan:'',
                    varian:[],
                    deskripsi:'',
                    katalog:[],
                    faq:'',
                },
                validation: {
                    title:null,
                    tipe:null,
                    spek_produk:null,
                    penempatan:null,
                    varian:null,
                    deskripsi:null,
                    katalog:null,
                },
                msg: {
                    title:'',
                    tipe:'',
                    spek_produk:'',
                    penempatan:'',
                    varian:'',
                    deskripsi:'',
                    katalog:'',
                },
                validTags: [],
                invalidTags: [],
                duplicateTags: [],
                listTipe:[
                    { value: '', text: '-- Pilih tipe --', disabled: true },
                    'Flooring',
                    'Roofing',
                    'Skylight',
                    'Facade',
                    'Window',
                    'Door',
                    'Furniture',
                    'Wall',
                    'Material',
                ],
                baseUrl:process.env.BASE_FTP_URL,
                thumbnail: "",
                slide: "",
                editFoto: false,
                showPlacholder: true
            }
        },
        methods: {
            async submitProduct() {
                this.loadingSubmit = true
                for (const key in this.validation) {
                    this.validation[key] = null
                }
                let formData = new FormData();
                for (const key in this.form) {
                    formData.append(key, this.form[key])
                }
                this.form.katalog.forEach(img => {
                    formData.append('gambar',img)
                });
                await this.$axios.post(`/products`, formData, { headers: {
                    'Content-Type': 'multipart/form-data',
                    "auth-token":this.$cookies.get('token')
                }})
                .then(res => {
                    this.showAlertModal = true
                })
                .catch(err => {
                    err.response.data.errors.forEach(row => {
                        this.validation[row.param] = false
                        this.msg[row.param] = row.msg
                    });
                })
                this.loadingSubmit = false
            },
            async editProduct() {
                this.loadingSubmit = true
                for (const key in this.validation) {
                    this.validation[key] = null
                }
                let formData = new FormData();
                for (const key in this.form) {
                    formData.append(key, this.form[key])
                }
                this.form.katalog && this.form.katalog.forEach(img => {
                    formData.append('gambar',img)
                });
                let tmpKatalog = []
                this.tempUrl.forEach(row => {
                    let filename = row.split('/')
                    tmpKatalog.push(filename[filename.length - 1])
                });
                formData.set('katalog', tmpKatalog)
                await this.$axios.put(`/products`, formData, { headers: {
                    'Content-Type': 'multipart/form-data',
                    "auth-token":this.$cookies.get('token')
                }})
                .then(res => {
                    this.showAlertModal = true
                })
                .catch(err => {
                    err.response.data.errors.forEach(row => {
                        this.validation[row.param] = false
                        this.msg[row.param] = row.msg
                    });
                })
                this.loadingSubmit = false
            },
            uploadPicture() {
                // console.log(this.form.katalog.length)
                if (this.form.katalog.length > 0) {
                    this.form.katalog.forEach(row => {
                        this.tempUrl.push(window.URL.createObjectURL(row));
                    });

                    this.showPlacholder = false
                }
            },
            removeFile(idx) {
                this.tempUrl.splice(idx, 1);
                this.form.katalog.splice(idx, 1);
            }
        },
        mounted() {
            if(this.edit) {
                this.form = this.payload
                this.form.katalog && this.form.katalog.forEach(row => {
                   this.tempUrl.push(`${this.baseUrl}/products/${row}`) 
                });

                this.thumbnail = this.payload.thumbnail

                console.log(this.payload)
            }

            this.$emit('fullpage', false);
        }
    }
</script>
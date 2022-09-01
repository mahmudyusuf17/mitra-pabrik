<template>
    <div class="container h-100 py-5">
        <div class="row mb-3">
            <div class="col-12">
                <nuxt-link to="/home/events"><b-icon icon="arrow-left-short"></b-icon> Kembali</nuxt-link>
            </div>
        </div>
        <div class="row">
            <!-- <div class="col-md-3">
                Event contents
                <p v-for="(l,idx) in links" :key="idx"><b-link :href="'#'+l">{{ l }}</b-link></p>
            </div> -->
            <div class="col-md-9">
                <h3>{{ eventData.event_name }}</h3>
                <div v-html="eventData.body && $md.render(eventData.body)" class="text-break"></div>
            </div>
            <div class="col-md-3">
                <div class="rounded-xl p-4">
                    <div class="row mb-2">
                        <div class="col-12 font-weight-bold">Date & Time</div>
                        <div class="col-12">{{$formatIDDate(eventData.starting_date)}}</div>
                    </div>
                    <div class="row mb-2">
                        <div class="col-12 font-weight-bold">Location</div>
                        <div class="col-12">{{ eventData.location }}</div>
                    </div>
                    <div class="row mb-2">
                        <div class="col-12 font-weight-bold">Event By</div>
                        <div class="col-12">{{ eventData.author }}</div>
                    </div>
                    <div class="row mb-2">
                        <div class="col-12 font-weight-bold">Admission</div>
                        <div class="col-12 text-success">{{ eventData.admission }}</div>
                    </div>
                    <div class="row mb-2">
                        <div class="col-12">
                            <b-button variant="primary" block pill size="sm" @click="openAttendModal" v-if="attendanceID">Attend Event</b-button>
                            <b-button variant="primary" block pill size="sm" @click="showRegisterModal = true" v-else>RSVP now</b-button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <b-modal v-model="showAttendanceModal" size="sm" scrollable centered hide-footer hide-header static>
            <div class="text-center">
                <p><b>Attendance QR Code:</b></p>
                <div id="qrcode" class="d-flex justify-content-center align-items-center"></div>
                <p class="m-0 mt-3">{{ $formatIDDate(new Date()) }}</p>
            </div>
        </b-modal>
        <b-modal v-model="showRegisterModal" scrollable size="lg" centered hide-footer hide-header>
            <b-alert variant="secondary" show="">
                Dengan menekan tombol "Register", Saya setuju bahwa Mitrapabrik diizinkan untuk mebagikan informasi saya kepada pembuat event.
            </b-alert>
            <div class="row my-5">
                <div class="col-6">
                    <h3>Personal Information</h3>
                    <span class="font-weight-bold">Email</span>
                    <p>{{ userdata.email }}</p>
                    <span class="font-weight-bold">Nama Lengkap</span>
                    <p>{{ userdata.nama_depan }} {{ userdata.nama_belakang }}</p>
                    <span class="font-weight-bold">No. HP</span>
                    <p>{{ userdata.no_hp }}</p>
                    <span class="font-weight-bold">Kota Domisili</span>
                    <p>{{ userdata.asal_kota }}</p>
                    <span class="font-weight-bold">Anda Sebagai</span>
                    <p>{{ userdata.role }}</p>
                </div>
                <div class="col-6 border-left">
                    <h3>Event Information</h3>
                    <span class="font-weight-bold">Event Name</span>
                    <p>{{ eventData.event_name }}</p>
                    <span class="font-weight-bold">Event By</span>
                    <p class="text-secondary">{{ eventData.author }}</p>
                    <span class="font-weight-bold">Admission</span>
                    <p class="text-success">{{ eventData.admission }}</p>
                    <span class="font-weight-bold">Tanggal Event</span>
                    <p>{{$formatIDDate(eventData.starting_date)}}</p>
                    <span class="font-weight-bold">Lokasi</span>
                    <p>{{ eventData.location }}</p>
                    <b-button variant="primary" class="px-5" pill block size="sm" @click="registerEvent">Register</b-button>
                </div>
            </div>
            <p class="text-secondary">
                Pemberitahuan penting terkait COVID-19: Harap perhatikan bahwa interaksi apa pun dengan masyarakat umum meningkatkan risiko terpapar COVID-19 dan kami tidak dapat menjamin bahwa Anda tidak akan terpapar saat menghadiri acara tersebut. Mitrapabrik tidak bertanggung jawab atas kesehatan dan keselamatan acara ini. Kami mendorong Anda untuk mengikuti kebijakan keselamatan penyelenggara, serta hukum dan batasan setempat.
            </p>
        </b-modal>
        <b-modal centered content-class="shadow" title="OK" v-model="showAjaxModal" hide-footer hide-header>
            <p class="my-2 text-center" v-if="valid">
                Registrasi Berhasil! Terima kasih telah berpartisipasi pada event kami.
            </p>
            <p class="my-2 text-center" v-else>
                {{ msg }}
            </p>
            <div class="row">
                <div class="col-md-12 d-flex justify-content-center">
                    <b-button variant="primary" pill class="px-5" @click="showAjaxModal = false">OK</b-button>
                </div>
            </div>
        </b-modal>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    export default {
        head:{
            script: [{
                src: 'https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js'  
            }]  
        },
        data() {
            return {
                baseBackOfficeUrl:process.env.BASE_BACKOFFICE_URL,
                eventData: {},
                userdata: {},
                attendanceID:'',
                links: [],
                qrcodeObj:null,
                showAttendanceModal:false,
                showRegisterModal:false,
                loading: false,
                showAjaxModal: false,
                valid: true,
                msg: '',
            }
        },
        computed: {
            ...mapGetters({
                'getUserCredentials':'auth/getUserCredentials',
            }),
        },
        methods: {
            showQR() {
                let that = this
                setTimeout(function(){
                    if(!document.getElementById('qrcode').firstChild) {
                        this.qrcodeObj = new QRCode('qrcode', {
                            text: `/events/attend/${that.attendanceID}`,
                            correctLevel : QRCode.CorrectLevel.H
                        });
                    }
                }, 50);
            },
            openAttendModal() {
                this.showQR()
                this.showAttendanceModal = true
            },
            async registerEvent() {
                this.loading = true
                await this.$axios.post(`/events/register/${this.$route.params.id}`, {}, { headers: {
                    "auth-token":this.$cookies.get('token')
                }})
                .then(async res => {
                    console.log(res.data.data)
                    this.showAjaxModal = true
                    this.valid = true
                    let fetchAttendance = await this.$axios.get(`/events/attendance/${this.$route.params.id}`, { params:{}, headers: { 'auth-token': this.$cookies.get('token') } })
                    this.attendanceID = fetchAttendance.data.data[0] && fetchAttendance.data.data[0].id_trans
                }).catch(err => {
                    console.log(err.response)
                    this.showAjaxModal = true
                    this.valid = false
                    this.msg = err.response.data.msg
                })
                this.loading = false
            }
        },
        async mounted() {
            try {
                let fetchUserData = await this.$axios.get(`/user/datadiri`, { params:{}, headers: { 'auth-token': this.$cookies.get('token') } })
                this.userdata = fetchUserData.data.data[0]
                let fetchEvents = await this.$axios.get(`/events/data/${this.$route.params.id}`)
                let fetchAttendance = await this.$axios.get(`/events/attendance/${this.$route.params.id}`, { params:{}, headers: { 'auth-token': this.$cookies.get('token') } })
                this.attendanceID = fetchAttendance.data.data[0] && fetchAttendance.data.data[0].id_trans
                this.eventData = fetchEvents.data.data[0]
            } catch (error) {
                console.log(error)
            }
            let lines = this.eventData.body.split('\n')
            lines.forEach(line => {
                if(line.trim().match(/^(## )/)) {
                    this.links.push(line.replace('##','').trim())
                }
            })
        }
    }
</script>

<style scoped>

</style>
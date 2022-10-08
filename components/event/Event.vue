<template>
    <div class="mp-container" id="event-section">
        <div class="mp-title-section mb-5">
            <h2>Event</h2>
        </div>
        <b-row>
            <b-col cols="12" md="8">
                <b-row>
                    <b-col v-for="(event, index) in eventMitra" :key="event.id_event">
                        <nuxt-link :to="`/home/event/${event.id_event}`" class="mp-link__redirect">
                        <b-card
                            :title="event.event_name"
                            :img-src="`https://mitrapabrik.sgp1.digitaloceanspaces.com/events/`+ event.image"
                            img-alt="Image"
                            img-top
                            tag="article"
                            class="mb-2"
                            style="max-width: 20rem; cursor: pointer;"
                            @click="toEventDetail(event.id_event)"
                        >
                            <!-- <b-card-text>
                                Some quick example text to build on the card title and make up the bulk of the card's content.
                            </b-card-text> -->

                            <div class="mp-events__detail mt-4">
                                <div class="d-flex align-items-center">
                                    <b-icon font-scale="1.5" icon="calendar2-date"></b-icon>
                                    <p class="mb-0 ml-2">Date: <span>{{ $formatIDDate(event.starting_date)}}</span></p>
                                </div>
                                <div class="d-flex align-items-center mb-2 mt-3">
                                    <b-icon font-scale="1.5" icon="geo-alt"></b-icon>
                                    <p class="mb-0 ml-2">Location: <span>{{ event.location }}</span></p>
                                </div>
                                <div class="d-flex align-items-center mb-2">
                                    <b-icon font-scale="1.5" icon="cash-stack"></b-icon>
                                    <p class="mb-0 ml-2">Entry Fee: <span class="text-success">{{ event.admission }}</span></p>
                                </div>
                            </div>

                            <b-button variant="primary" :class="index > 0 ? 'd-none': 'float-right'" >RSVP sekarang</b-button>
                            <a :href="`/home/event/${event.id_event}`" variant="primary" :class="index > 0 ? 'float-right': 'd-none'" >See more..</a>
                        </b-card>
                        </nuxt-link>
                    </b-col>
                    <!-- <b-col>
                        <b-card
                            title="Card Title"
                            img-src="https://picsum.photos/600/300/?image=25"
                            img-alt="Image"
                            img-top
                            tag="article"
                            style="max-width: 20rem;"
                            class="mb-2"
                        >
                            <b-card-text>
                            Lorem ipsum dolor sit amet consectetur elit. 
                            Sapiente omnis eius dolore nemo.
                            <a href="#" class="card-link">show more..</a>
                            </b-card-text>
                        </b-card>
                    </b-col>
                    <b-col>
                        <b-card
                            title="Card Title"
                            img-src="https://picsum.photos/600/300/?image=25"
                            img-alt="Image"
                            img-top
                            tag="article"
                            style="max-width: 20rem;"
                            class="mb-2"
                        >
                            <b-card-text>
                            Lorem ipsum dolor sit amet consectetur elit. 
                            Sapiente omnis eius dolore nemo.
                            <a href="#" class="card-link">show more..</a>
                            </b-card-text>
                        </b-card>
                    </b-col> -->
                </b-row>
            </b-col>
            <b-col cols="12" md="4" class="border-left" v-if="eventRekan.length != 0 ">
                <h3>Event dari rekan <span class="mp-primary-color">mitrapabrik.com</span></h3>
                <b-row>
                    <b-col v-for="event in eventRekan" :key="event.id_event">
                        <!-- <nuxt-link :to="`/home/event/${event.id_event}`" class="mp-link__redirect"> -->
                        <b-card
                            :title="event.event_name"
                            :img-src="`https://mitrapabrik.sgp1.digitaloceanspaces.com/events/`+ event.image"
                            img-alt="Image"
                            img-top
                            tag="article"
                            class="mb-2"
                            style="max-width: 20rem; cursor: pointer;"
                            @click="toEventDetail(event.id_event)"
                        >
                            <div class="mp-events__detail mt-4">
                                <div class="d-flex align-items-center">
                                    <b-icon font-scale="1.5" icon="calendar2-date"></b-icon>
                                    <p class="mb-0 ml-2">Date: <span>{{ $formatIDDate(event.starting_date)}}</span></p>
                                </div>
                                <div class="d-flex align-items-center mb-2 mt-3">
                                    <b-icon font-scale="1.5" icon="geo-alt"></b-icon>
                                    <p class="mb-0 ml-2">Location: <span>{{ event.location }}</span></p>
                                </div>
                                <div class="d-flex align-items-center mb-2">
                                    <b-icon font-scale="1.5" icon="cash-stack"></b-icon>
                                    <p class="mb-0 ml-2">Entry Fee: <span class="text-success">{{ event.admission }}</span></p>
                                </div>
                            </div>

                            <!-- <b-button variant="primary" :class="index > 0 ? 'd-none': 'float-right'" >RSVP sekarang</b-button> -->
                            <a :href="`/home/event/${event.id_event}`" variant="primary" class="float-right" >See more..</a>
                        </b-card>
                        <!-- </nuxt-link> -->
                        <LoginModal :statusModal="modalShow"/>
                    </b-col>
                    <!-- <b-col>
                        <b-card
                            title="Card Title"
                            img-src="https://picsum.photos/600/300/?image=25"
                            img-alt="Image"
                            img-top
                            tag="article"
                            style="max-width: 20rem;"
                            class="mb-2"
                        >
                            <b-card-text>
                            Lorem ipsum dolor sit amet consectetur elit. 
                            Sapiente omnis eius dolore nemo.
                            <a href="#" class="card-link">show more..</a>
                            </b-card-text>
                        </b-card>
                    </b-col> -->
                </b-row>
            </b-col>
        </b-row>
    </div>
</template>
<script>
import { mapGetters } from 'vuex';
import LoginModal from "~/components/auth/LoginModal.vue";

export default {
    name: "Event",
    components:{
        LoginModal
    },

    data() {
        return {
            filterTgl:false,
            listEvents: [],
            defaultListEvents: [],
            eventRekan: [],
            eventMitra: [],
            modalShow: false,
        }
    },

    methods: {
        filterEvents(terlewatkan) {
            this.filterTgl = !this.filterTgl
            if(terlewatkan) this.listEvents = this.defaultListEvents.filter(row => new Date(row.starting_date) <= Date.now())
            else this.listEvents = this.defaultListEvents.filter(row => new Date(row.starting_date) >= Date.now())
        },

        toEventDetail(id){
            if(this.getUserCredentials.nama_depan != null){
                this.$router.push(`/home/event/${id}`)
            }else{
                this.modalShow = !this.modalShow
            }
        }
    },

    async mounted() {
        let fetchEvents = await this.$axios.get(`/events`)
        this.listEvents = fetchEvents.data.data
        this.defaultListEvents = fetchEvents.data.data

        if(this.listEvents != null){
            this.listEvents.forEach(element => {
                if(element.isPartner == 1){
                    this.eventRekan.push(element)
                }else{
                    this.eventMitra.push(element)
                }
            });
        }
    },

    computed: {
        ...mapGetters({
            'getUserCredentials':'auth/getUserCredentials',
        }),
    },
}
</script>
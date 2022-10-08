<template>
    <b-card class="mb-3">  
        <div class="d-flex align-items-center mp-news-detail__sidebar"  @click="toDetail(news.id_artikel)" style="cursor: pointer">
            <img :src="`https://mitrapabrik.sgp1.digitaloceanspaces.com/articles/`+ news.image" alt="image news" class="mp-image-rounded mp-rounded mr-3">
            <div class="mp-news-content">
                <h2 class="mp-fs-24">{{ news.title }}</h2>
                <b-card-text>
                    <div v-html="news.body && $md.render(news.body).substring(0,150)" class="mp-text__elipsis"></div>
                    <div @click="toDetail(news.id_artikel)" style="cursor: pointer" class="mp-primary-color">read more...</div>
                </b-card-text>
            </div>
        </div>
        <LoginModal :statusModal="modalShow"/>
    </b-card>
</template>
<script>
import { mapGetters } from 'vuex';
import LoginModal from "~/components/auth/LoginModal.vue";

export default {
    name:"NewsSidebarCard",
     components:{
        LoginModal
    },

     data(){
        return{
            modalShow: false,
        }
    },

    props:{
        news:{
            default:() => {}
        }
    },

    computed: {
        ...mapGetters({
            'getUserCredentials':'auth/getUserCredentials',
        }),
    },

     methods:{
        toDetail(id){
            if(this.getUserCredentials.nama_depan != null){
                this.$router.push(`/home/artikel/${id}`)
            }else{
                this.modalShow = !this.modalShow
            }
        }
    }
}
</script>
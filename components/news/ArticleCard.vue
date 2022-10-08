<template>
<div class="mp-link__redirect">
    <div class="mp-news-card" @click="toDetail(news.id_artikel)" style="cursor: pointer">
        <b-card :title="news.title">
            <!-- <img src="/no-image-placeholder.png" alt="image news" class="w-100 mb-3 mp-border-radius mp-image-news"> -->
            <b-card-text>
                <img :src="`https://mitrapabrik.sgp1.digitaloceanspaces.com/articles/`+ news.image" class="mr-3">
                <div v-html="news.body && $md.render(news.body)"></div>
                <!-- <p class="mp-paragraf"> -->
                    <!-- {{news.body}} <a href="#" class="card-link">read more...</a> -->
                <!-- </p> -->
            </b-card-text>
        </b-card>
    </div>
    <LoginModal :statusModal="modalShow"/>
</div>
</template>
<script>
import { mapGetters } from 'vuex';
import LoginModal from "~/components/auth/LoginModal.vue";

export default {
    name:"ArticleCard",
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
<template>
    <div class="wrapper">
        <v-head></v-head>
        <v-sidebar></v-sidebar>
        <div class="content-box" :class="{'content-collapse':collapse}">
            <div class="content">
                <transition name="move" mode="out-in">
<!--                    <keep-alive :include="tagsList">-->
                        <router-view></router-view>
<!--                    </keep-alive>-->
                </transition>

                <el-backtop target=".content"></el-backtop>
            </div>
        </div>
    </div>
</template>

<script>
import vHead from './Header.vue';
import vSidebar from './Sidebar.vue';
import bus from './bus';
import { fetchBlogger } from '../../api/blogger';
export default {
    data() {
        return {
            tagsList: [],
            collapse: false,
            blogger: {}
        };
    },
    components: {
        vHead,
        vSidebar,
    },
    created() {
        bus.$on('collapse-content', msg => {
            this.collapse = msg;
        });

        this.getData()
    },
    methods:{
        getData(){
            fetchBlogger().then(res => {
                this.blogger = res.data;
                bus.$emit("blogger",this.blogger)
            })
        }
    }
};
</script>

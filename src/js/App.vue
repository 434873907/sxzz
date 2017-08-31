<template>
    <div id="app">
        <router-view :clientH="clientH"></router-view>
    </div>
</template>
<style>
</style>
<script>
    import MainCmp from "./components/MainCmp.vue";
    import Login from "./components/Login.vue";
    import axiosUtil from "./utils/AxiosUtils.js";
    import {HOST_URL} from "./data/Url";
    export default{
        data: function () {
            return {
                /*clientH: 0,//动态屏幕可见区域高度*/
                isToggleSideBar: false, //侧边栏是否切换成小的
                ss:''
            }
        },
        created: function () {
            console.log("===================version: 2.2=========================");
            let _this = this;
            if (this.isLogin) {//如果已经登录则跳转到个人中心
                 this.$router.push("/main");
            } else {//如果未登录则跳转到登录页面
                 this.$router.push("/login");
                //window.location = HOST_URL;
            }
            /*this.clientH = document.documentElement.clientHeight || document.body.clientHeight;*/
            window.onbeforeunload = function () {// 窗口关闭前储存红点localstorage
                let pushPoint = localStorage.getItem("pushPoint") ? JSON.parse(localStorage.getItem("pushPoint")) : {};
                pushPoint.isGetNewMsg_yqys = _this.$store.state.isGetNewMsg_yqys;

                pushPoint.isGetNewMsg_qkfz = _this.$store.state.isGetNewMsg_qkfz;
                pushPoint.isGetNewMsg_qkfz_dcl = _this.$store.state.isGetNewMsg_qkfz_dcl;
                pushPoint.isGetNewMsg_qkfz_clz = _this.$store.state.isGetNewMsg_qkfz_clz;
                pushPoint.isGetNewMsg_qkfz_ywc = _this.$store.state.isGetNewMsg_qkfz_ywc;
                pushPoint.isGetNewMsg_qkfz_yqx = _this.$store.state.isGetNewMsg_qkfz_yqx;

                pushPoint.pushPointConsultIdArr = _this.$store.state.pushPointConsultIdArr;// 全科分诊处理中，侧边栏红点

                pushPoint.isGetNewMsg_mysp = _this.$store.state.isGetNewMsg_mysp;
                pushPoint.isGetNewMsg_mysp_dcl = _this.$store.state.isGetNewMsg_mysp_clz;
                pushPoint.isGetNewMsg_mysp_dwz = _this.$store.state.isGetNewMsg_mysp_dwz;
                pushPoint.isGetNewMsg_mysp_ywc = _this.$store.state.isGetNewMsg_mysp_ywc;
                pushPoint.isGetNewMsg_mysp_yqx = _this.$store.state.isGetNewMsg_mysp_yqx;
                pushPoint.isGetNewMsg_mysp_bczl = _this.$store.state.isGetNewMsg_mysp_bczl;


                pushPoint.isGetNewMsg_ychz = _this.$store.state.isGetNewMsg_ychz;
                pushPoint.isGetNewMsg_ychz_dcl = _this.$store.state.isGetNewMsg_ychz_dcl;
                pushPoint.isGetNewMsg_ychz_clz = _this.$store.state.isGetNewMsg_ychz_clz;
                pushPoint.isGetNewMsg_ychz_dhz = _this.$store.state.isGetNewMsg_ychz_dhz;
                pushPoint.isGetNewMsg_ychz_ywc = _this.$store.state.isGetNewMsg_ychz_ywc;
                pushPoint.isGetNewMsg_ychz_yqx = _this.$store.state.isGetNewMsg_ychz_yqx;
                pushPoint.isGetNewMsg_ychz_bczl = _this.$store.state.isGetNewMsg_ychz_bczl;
                pushPoint.isGetNewMsg_ychz_yqbc = _this.$store.state.isGetNewMsg_ychz_yqbc;

                localStorage.setItem("pushPoint", JSON.stringify(pushPoint));
            }
        },
        beforeDestroy: function () {// 窗口关闭前储存红点localstorage
        },
        components: {
            MainCmp,
            Login
        },
        computed: {
            clientH: function () {
                return this.$store.state.clientH;
            },
            isLogin: function () {//先判断是否登录来显示页面
                return localStorage.getItem("userInfo") && JSON.parse(localStorage.getItem("userInfo")).isAss;
            }
        },
        methods: {

        }
    }
</script>

<template>
    <div id="main">
        <div class="app-container clearfix">
            <!--侧边栏-->
            <SideBarCmp :clientH="clientH" :isToggle="isToggleSideBar"/>
            <!--头部header-->
            <HeaderCmp @toggleSideBar="toggleSideBar"/>
            <!--路由模块-->
            <router-view
                    :clientH="clientH"
                    :style="{ height: contentH + 'px' }"
                    class="content-bg-color"
                    :class="{ marginL50: isToggleSideBar, 'content-container': !isToggleSideBar }"
            >
            </router-view>
        </div>
    </div>
</template>
<style>

</style>
<script>
    import SideBarCmp from "./common/SideBarCmp.vue";
    import HeaderCmp from "./common/HeaderCmp.vue";
    import { SOCKET_URL } from "../data/Url";
    import { Notification } from "element-ui";
    import pushEvent from "../utils/PushEventUtils.js";
    import axiosUtil from "../utils/AxiosUtils.js";
    export default{

        data: function(){
            return {
               /* clientH: 0,//动态屏幕可见区域高*/
                isToggleSideBar: false,//侧边栏是否切换成小的
            }
        },
        props: ["clientH"],
        components:{
            SideBarCmp,
            HeaderCmp
        },
        computed: {
            contentH: function(){
                return (this.clientH-86)//路由内容部分高度
            }
        },
        created: function () {
            let _this = this;
            //上报推送ID
            let socket = io(SOCKET_URL);
            socket.on('connect', function(){
                if(socket.id){
                    let options = {
                        deviceId: socket.id,
                        token: localStorage.getItem("token"),
                        Service: "nethos.push.deviceid.register"
                    };
                    /*axiosUtil(options, function(){
                    });*/
                }
            });
            socket.on("reconnect", function () {
                if(socket.id){
                    console.log("重新连接");
                }
            });
            socket.on("pushevent", function (data) {
                console.log("收到推送");
                console.log(data);
                pushEvent(_this, data);
            })
        },
        methods: {
            toggleSideBar: function(){//监听更改侧边栏宽度按钮
                this.isToggleSideBar = !this.isToggleSideBar;
            }
        }
    }
</script>

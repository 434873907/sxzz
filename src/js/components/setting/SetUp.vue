<template>
    <div class="set-up">
        <!--头部-->
        <SetUpHeaderCmp/>
        <!--侧边栏-->
        <SetUpSideBarCmp :clientH="clientH"/>
        <!--路由模块-->
        <router-view :clientH="clientH" :style="{ height: contentH + 'px' }"></router-view>
    </div>
</template>
<style>
</style>
<script>
    import SetUpHeaderCmp from "./SetUpHeaderCmp.vue";
    import SetUpSideBarCmp from "./SetUpSideBarCmp.vue"
    export default{
        props: ["clientH"],
        components:{
            SetUpHeaderCmp,
            SetUpSideBarCmp
        },
         computed: {
            contentH: function(){
                return (this.clientH-101)//路由内容部分高度
            }
        },
    }
</script>

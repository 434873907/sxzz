<!--侧边栏-->
<template>
    <div
            class="side-bar fl"
            :style="{ height: clientH + 'px'}"
            :class="{ w50: isToggle }">
        <!--侧边栏顶部信息-->
        <div class="side-bar-top">
            <div class="logo h99">
               <span class="logo-title" :class="{ hidden: isToggle }">双向转诊平台</span>
            </div>
            <div class="side-bar-personal h99" >
                <div class="side-bar-personal-icon" :class="{ hidden: isToggle }">
                    <img class="personal-icon" src="../../../images/doctor-pic.png" >
                    <!--<img class="personal-icon" :src="docAvatar?docAvatar:require('../../../images/doc-default-icon.png')" >-->
                </div>
                <p class="side-bar-personal-info center marginT10" :class="{ hidden: isToggle }">{{docObj.sqyymc}}</p>
                <p class="side-bar-personal-title center marginT10 green-color" :class="{ hidden: isToggle }">{{docObj.sqksmc}}</p>
                <p class="side-bar-personal-title center marginT5 green-color" :class="{ hidden: isToggle }">{{docObj.sqysxm}}</p>
            </div>
        </div>
        <!--侧边栏列表-->
        <div class="side-bar-list">
            <div
                    @click="clickItem('rwzx') "
                    :class="['side-bar-item', 'h49', 'side-bar-icon-rwzx', { 'item-click': clickName=='rwzx' }]">
                <router-link to="/main"  class="side-bar-link">
                    <svg :class="['icon', { 'bg-rwzx': !isToggle }, { 'bg-rwzx-toggle': isToggle }, { 'bg-rwzx-click': clickName=='rwzx' }, 'fl']" aria-hidden="true">
                        <use xlink:href="#icon-icon-test"></use>
                    </svg>
                    <span :class="[{ 'hidden': isToggle }, [ clickName=='rwzx'?'item-title-click': 'side-bar-item-title'], 'fl']">任务中心</span>
                </router-link>
            </div>
            <div v-show="!(docObj.mzzt==0)"
                    @click="clickItem('twzx')"
                    :class="['side-bar-item', 'h49', 'side-bar-icon-rwzx', { 'item-click': clickName=='twzx' }]">
                <router-link to="/main/pictureConsulting" class="side-bar-link">
                    <svg :class="['icon', { 'bg-rwzx': !isToggle }, { 'bg-rwzx-toggle': isToggle }, { 'bg-rwzx-click': clickName=='twzx' }, 'fl']" aria-hidden="true">
                        <use xlink:href="#icon-menzhenbaodao"></use>
                    </svg>
                    <span :class="[{ 'hidden': isToggle }, [ clickName=='twzx'?'item-title-click': 'side-bar-item-title'], 'fl']">门诊转诊</span><el-badge is-dot :hidden="!isGetNewMsg_qkfz"/>
                </router-link>
            </div>
            <div v-show="!(docObj.jczt==0)"
                    @click="clickItem('spwz')"
                    :class="['side-bar-item', 'h49', 'side-bar-icon-rwzx',{ 'item-click': clickName=='spwz' }]">
                <router-link to="/main/videoConsultation" class="side-bar-link">
                    <svg :class="['icon','side-bar-icon-rwzx', { 'bg-rwzx': !isToggle }, { 'bg-rwzx-toggle': isToggle }, { 'bg-rwzx-click': clickName=='spwz' }, 'fl']" aria-hidden="true">
                        <use xlink:href="#icon-jiancha"></use>
                    </svg>
                    <span :class="[{ 'hidden': isToggle }, [ clickName=='spwz'?'item-title-click': 'side-bar-item-title'], 'fl']">检查转诊</span><el-badge is-dot :hidden="!isGetNewMsg_mysp"/>
                </router-link>
            </div>
            <div v-show="!(docObj.zyzt==0)"
                    @click="clickItem('ychz')"
                    :class="['side-bar-item', 'h49', 'side-bar-icon-rwzx',{ 'item-click': clickName=='ychz' }]">
                <router-link to="/main/remoteConsultation" class="side-bar-link">
                    <svg :class="['icon','side-bar-icon-rwzx', { 'bg-rwzx': !isToggle }, { 'bg-rwzx-toggle': isToggle }, { 'bg-rwzx-click': clickName=='ychz' }, 'fl']" aria-hidden="true">
                        <use xlink:href="#icon-zhuyuanhao"></use>
                    </svg>
                    <span :class="[{ 'hidden': isToggle }, [ clickName=='ychz'?'item-title-click': 'side-bar-item-title'], 'fl']">住院转诊</span><el-badge is-dot :hidden="!isGetNewMsg_ychz"/>
                </router-link>
            </div>
            <div v-show="!(docObj.sszt==0)"
                    @click="clickItem('sszz')"
                    :class="['side-bar-item', 'h49', 'side-bar-icon-rwzx',{ 'item-click': clickName=='sszz' }]">
                <router-link to="/main/arrange" class="side-bar-link">
                    <svg :class="['icon','side-bar-icon-rwzx', { 'bg-rwzx': !isToggle }, { 'bg-rwzx-toggle': isToggle }, { 'bg-rwzx-click': clickName=='sszz' }, 'fl']" aria-hidden="true">
                        <use xlink:href="#icon-shoushuyuyue"></use>
                    </svg>
                    <span :class="[{ 'hidden': isToggle }, [ clickName=='sszz'?'item-title-click': 'side-bar-item-title'], 'fl']">日间手术转诊</span><!--<el-badge is-dot :hidden="!isGetNewMsg_sszz"/>-->
                </router-link>
            </div>
            <div v-show="!(docObj.tjzt==0)"
                    @click="clickItem('zztj')"
                    :class="['side-bar-item', 'h49', 'side-bar-icon-rwzx',{ 'item-click': clickName=='zztj' }]">
                <router-link to="/main/transferCount" class="side-bar-link">
                    <svg :class="['icon','side-bar-icon-rwzx', { 'bg-rwzx': !isToggle }, { 'bg-rwzx-toggle': isToggle }, { 'bg-rwzx-click': clickName=='zztj' }, 'fl']" aria-hidden="true">
                        <use xlink:href="#icon-tongji"></use>
                    </svg>
                    <span :class="[{ 'hidden': isToggle }, [ clickName=='zztj'?'item-title-click': 'side-bar-item-title'], 'fl']">转诊统计</span><!--<el-badge is-dot :hidden="!isGetNewMsg_zztj"/>-->
                </router-link>
            </div>
        </div>
        <!--侧边栏提示浏览器版本信息-->
        <div class="side-browser">
          <p>-建议使用谷歌浏览器-</p>
        </div>
    </div>
</template>
<style>
</style>
<script>
    export default{
        props: ["clientH", "isToggle"],
        data: function(){
            return {
//                userInfo: JSON.parse(localStorage.getItem("userInfo")),
//                //userName: JSON.parse(localStorage.getItem("userInfo")).docName,
//                docAvatar: JSON.parse(localStorage.getItem("userInfo")).docAvatar?JSON.parse(localStorage.getItem("userInfo")).docAvatar:require('../../../images/doc-default-icon.png'),
//                show3: true
                docObj:JSON.parse(localStorage.getItem('docObj'))
            }
        },
        mounted(){
                console.log(JSON.parse(localStorage.getItem('docObj')).tjzt,'转诊统计')
        },
        computed: {
            clickName: function(){
                return this.$store.state.clickName;
            },
            isGetNewMsg_qkfz: function() {// 全科红点
                return this.$store.state.isGetNewMsg_qkfz;
            },
            isGetNewMsg_mysp: function() {// 名医视频红点
                return this.$store.state.isGetNewMsg_mysp;
            },
            isGetNewMsg_ychz: function() {// 远程会诊红点
                return this.$store.state.isGetNewMsg_ychz;
            },
        },
        methods: {
            linkToHome: function(){
                this.$router.push("/main");
            },
            clickItem: function(itemName){
                this.$store.dispatch("changeSideItem", itemName);
            }
        },
    }
</script>

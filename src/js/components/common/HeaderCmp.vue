<template>
    <div
            class="header container"
            :class="{ marginL50: isToggle }">
        <!--上头部-->
        <div class="header-wrap clearfix">
            <!--显示侧边栏按钮-->
            <div class="header-show-btn w47 h47 fl">
                <button class="header-show-btn-wrap" @click="toggleSideBar">
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </div>
            <!--右侧菜单栏-->
            <div class="header-content clearfix h47">
                <!--前进后退按钮-->
                <div class="fl marginL10 router-btn-wrap">
                    <button class="router-btn h47" @click="preClick">&lt;</button>
                    <button class="router-btn h47" @click="nextClick">&gt;</button>
                </div>
                <div class="fl marginL10">
                    <img src="../../../images/zb-icon.png" class="marginR10 header-logo" >
                    <img src="../../../images/zdff-icon.png" class="header-logo"/>
                </div>
                <!--搜索按钮-->
                <!--<div class="header-search-wrap clearfix marginL10 fl">
                    <input
                            type="search"
                            class="header-search-input fontSize12 fl"
                            @blur="isFocus=false"
                            placeholder="请输入您要搜索的内容"
                            v-focus="isFocus"
                    >
                    <button class="header-search-btn fl" @click="getFocus"/>
                </div>-->
                <!--右侧菜单-->
                <ul class="header-content-list fr clearfix">
                   <li class="header-content-item">
                       <span class="header-content-link" >
                           <el-dropdown @command="linkTo" trigger="click" >
                               <span class="hover-cursor gray-color" @click="dropDownHandler">
                                   <el-badge :value="allMsgBoxListCounts" class="item" :max="99">
                                       <!--<img src="../../images/icon-msg.png" alt="消息">-->
                                       <svg class="icon fontSize16" aria-hidden="true">
                                           <use xlink:href="#icon-xiaoxi"></use>
                                       </svg>
                                   </el-badge>
                                    消息<i class="el-icon-caret-bottom el-icon--right "></i>
                               </span>
                               <el-dropdown-menu slot="dropdown" class="fontSize12">
                                   <!--<el-dropdown-item>qkfz <el-badge :value="16"/> </el-dropdown-item>
                                   <el-dropdown-item>视频问诊 <el-badge :value="12"/></el-dropdown-item>
                                   <el-dropdown-item>远程会诊 <el-badge :value="6"/> </el-dropdown-item>
                                   <el-dropdown-item>其他消息 <el-badge :value="4"/> </el-dropdown-item>-->
                                    <el-dropdown-item :class="[item.isread?'clicked-item':'']" :command="JSON.stringify(item)" v-for="(item,index) in partMsgBoxList" :key="index">{{ '【'+ item.messageTitle + '】' + item.messageBody }}</el-dropdown-item>
                                    <span v-show="partMsgBoxList.length!=0" class="hover-cursor fr marginR10" @click="showMsgListBox">更多>></span>
                              </el-dropdown-menu>
                           </el-dropdown>
                       </span>
                       <MsgListBoxCmp/>
                   </li>
                    <li class="header-content-item">
                        <router-link class="header-content-link" to="/setUp">
                            <svg class="icon fontSize16" aria-hidden="true">
                                <use xlink:href="#icon-shezhi"></use>
                            </svg>
                            设置
                        </router-link>
                   </li>
                    <li class="header-content-item">
                        <span class="logout-btn header-content-link" @click="logout">
                            <!--<img src="../../images/icon-power.png" alt="退出/登录">-->
                            <svg class="icon fontSize18" aria-hidden="true">
                                <use xlink:href="#icon-tuichu"></use>
                            </svg>
                            退出
                        </span>
                    </li>
                </ul>
            </div>
        </div>
        <!--下头部-日期-->
        <div class="header-date clearfix">
            <div class="fl fontSize14">
            </div>
            <div class="date fl marginL20">
                {{showTime}}
            </div>
            <div class="router fr">
                <a @click="linkToHome" class="router-home">
                    首页 >
                </a>
                <span class="router-other">{{ routerPath }}</span>
            </div>
        </div>
    </div>
</template>
<style>

</style>
<script>
    import { Badge,Dropdown,DropdownMenu,DropdownItem,MessageBox } from "element-ui";
    import axiosUtil from "../../utils/AxiosUtils.js";
    import MsgListBoxCmp from "./MsgListBoxCmp.vue";
    import { formatUnixTime, formatTimeStamp, formatTimeToUnix } from "../../utils/DateFormat.js";
    import { HOST_URL } from "../../data/Url.js";
    import MsgBoxListUtils from "../../utils/MsgBoxListUtils.js"
    import Vue from "vue";
    Vue.use(Badge);
    Vue.use(Dropdown);
    Vue.use(DropdownMenu);
    Vue.use(DropdownItem);
    export default{
        data: function(){
            return {
                isFocus: false,//搜索按钮是否点击
                isToggle: false,//是否点击侧边栏切换按钮
                showTime: "",//动态显示的时间
                timeOut: null,//计时器
            }
        },
        computed: {
        	routerPath: function(){
        		return this.$store.state.routerPath;
        	},
            allMsgBoxListCounts: function() { // 未读消息数
                return this.$store.state.allMsgBoxListCounts;
            },
            partMsgBoxList: function() {
                if(this.$store.state.allMsgBoxList.list){
                    console.log("header中");
                    console.log(this.$store.state.allMsgBoxList.list.slice(0, 10));
                    return this.$store.state.allMsgBoxList.list.slice(0, 10);
                }else {
        	        return [];
                }
            },
            allMsgBoxList: function() {
                return this.$store.state.allMsgBoxList;
            }
        },
        components:{
            MsgListBoxCmp
        },
        directives: {
            focus: {
               update: function(el, binding){
                   if(binding.value){
                        el.focus();
                   }
               }
            }
        },
        created: function() {
            this.changeTime();
            this.$store.dispatch("getAllMsgBoxList");// 获取消息盒子列表内容总数
            this.$store.dispatch("getAllMsgBoxListCounts");// 获取消息盒子未读数
        },
        beforeDestroy: function(){//组件销毁前清除计时器
            if(this.timeOut){
                clearTimeout(this.timeOut);
                this.timeOut = null;
            }
        },
        methods:{
            changeTime: function() {//显示时间
                let _this = this;
                _this.timeOut = setInterval(function () {
                    _this.showTime = (new Date()).pattern("yyyy年MM月dd日 HH:mm:ss EEE");
                }, 1000);
            },
            getFocus: function(){
                this.isFocus = true;
            },
            toggleSideBar: function(){
                this.isToggle = !this.isToggle;
                this.$emit("toggleSideBar");
            },
            preClick: function(){//点击路由后退按钮
                 this.$router.go(-1);
            },
            nextClick: function(){//点击路由前进按钮
                this.$router.go(1);
            },
            logout: function(e){//退出登录
                e.stopPropagation();
                MessageBox.confirm('确认退出登录?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let options = {
                        token: localStorage.getItem("token"),
                        Service: "nethos.pat.logout"
                    };
                    axiosUtil(options, function(){
                        window.location = HOST_URL;
                        localStorage.removeItem("docId");
                        localStorage.removeItem("userInfo");
                        localStorage.removeItem("token");
                        _this.$store.dispatch("changeSideItem", "rwzx");
                    });
                }).catch(() => {

                });
            },
            linkTo: function(itemJSON){//点击消息下拉菜单 跳转
                /*let routerPath = "";
                switch(itemName){
                    case 'twzx':
                        routerPath = "/main/pictureConsulting";
                        break;
                    case 'spwz':
                        routerPath = "/main/videoConsultation";
                        break;
                    case 'ychz':
                        routerPath = "/main/remoteConsultation";
                        break;
                    default:
                        return;
                }
                this.$store.dispatch("changeSideItem", itemName);
                this.$router.push(routerPath);*/
                MsgBoxListUtils(this, itemJSON);
            },
            dropDownHandler: function(ev){// 获取消息盒子下拉列表数据
                this.$store.dispatch("getAllMsgBoxList", 1);
            },
            linkToHome: function (ev) {
                let e = ev || event;
                if(e.preventDefault){
                    e.preventDefault();
                    e.stopPropagation();
                }else {
                    e.cancelBubble = true;//停止冒泡
                    e.returnValue = false;//阻止事件的默认行为
                }
                this.$router.push("/main");
                this.$store.dispatch("changeSideItem", "rwzx");
            },
            showMsgListBox: function(ev) {// 现实消息盒子
                //this.dialogTableVisible = true;
                this.$store.dispatch("isOpenMsgListBox", true);// 打开消息盒子
            },
        }
    }
</script>

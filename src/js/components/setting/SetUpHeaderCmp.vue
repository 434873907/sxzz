<template>
    <div>
        <div class="logo">
            <span class="logo-title" >医助工作站</span>
            <ul class="header-content-list fr clearfix set-content-list">
                <li class="header-content-item ">
                    <span class="header-content-link" >
                       <el-dropdown @command="linkTo" trigger="click">
                           <span class="hover-cursor gray-color">
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
                        <!--<img src="../../images/icon-set.png" alt="设置">-->
                        <svg class="icon fontSize16" aria-hidden="true">
                            <use xlink:href="#icon-shezhi"></use>
                        </svg>
                        设置
                    </router-link>
                </li>
                <li class="header-content-item">
                    <span class="logout-btn header-content-link"  @click="logout">
                        <!--<img src="../../images/icon-power.png" alt="退出/登录">-->
                        <svg class="icon fontSize18" aria-hidden="true">
                            <use xlink:href="#icon-tuichu"></use>
                        </svg>
                        退出
                    </span>
                </li>
            </ul>
        </div>
        <div class="login-title h50 set-header-top">
            <router-link to="/main">&lt;返回</router-link>
        </div>
    </div>
</template>
<style>

</style>
<script>
    import { MessageBox } from 'element-ui';
    import axiosUtil from "../../utils/AxiosUtils.js";
    import MsgListBoxCmp from "../common/MsgListBoxCmp.vue";
    import { formatUnixTime, formatTimeStamp, formatTimeToUnix } from "../../utils/DateFormat.js";
    import { HOST_URL } from "../../data/Url.js";
    import MsgBoxListUtils from "../../utils/MsgBoxListUtils.js";
    export default{
        components:{
            MsgListBoxCmp
        },
        computed: {
            allMsgBoxListCounts: function() { // 未读消息数
                return this.$store.state.allMsgBoxListCounts;
            },
            partMsgBoxList: function() {
                if(this.$store.state.allMsgBoxList.list){
                    return this.$store.state.allMsgBoxList.list.slice(0, 10);
                }else {
        	        return [];
                }
            },
            allMsgBoxList: function() {
                return this.$store.state.allMsgBoxList;
            }
        },
        created: function() {
            this.$store.dispatch("getAllMsgBoxList");// 获取消息盒子列表内容总数
            this.$store.dispatch("getAllMsgBoxListCounts");// 获取消息盒子未读数
        },
        methods: {
            logout: function(){
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
                MsgBoxListUtils(this, itemJSON);
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

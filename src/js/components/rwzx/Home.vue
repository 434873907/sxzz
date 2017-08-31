<template>
    <div class="home">
        <!--首页顶部菜单-->
        <div class="home-top clearfix">
            <div v-show="!(docObj.mzzt==0)" class="home-top-item clearfix">
                <div class="home-top-item-link clearfix" @click="linkToModule('/main/pictureConsulting', 'twzx')">
                    <div class="home-top-item-content home-top-item-twzx fl" >
                        <p class="home-top-item-title">门诊转诊</p>
                        <el-badge :value="listDetail.picConsultNeedHandleCount" class="item" :max="99">
                            <p class="home-top-item-num">待处理 <span>0</span></p>
                        </el-badge>
                    </div>
                    <div class="home-top-item-icon bg-twzx-big fr"></div>
                </div>
            </div>
            <div v-show="!(docObj.jczt==0)" class="home-top-item clearfix">
                <div class="home-top-item-link clearfix" @click="linkToModule('/main/videoConsultation', 'spwz')">
                    <div class="home-top-item-content home-top-item-spwz fl" >
                        <p class="home-top-item-title">检查转诊</p>
                        <el-badge :value="listDetail.videoConsultNeedHandleCount" class="item" :max="99">
                            <p class="home-top-item-num">待处理 <span style="font-size:16px;color:#AD9EED;font-weight:bold;">{{jczz}}</span></p>
                        </el-badge>
                    </div>
                    <div class="home-top-item-icon bg-spwz-big fr"></div>
                </div>
            </div>
            <div v-show="!(docObj.zyzt==0)" class="home-top-item clearflx">
                <div class="home-top-item-link clearfix" @click="linkToModule('/main/remoteConsultation', 'ychz')">
                    <div class="home-top-item-content home-top-item-ychz fl">
                        <p class="home-top-item-title">住院转诊</p>
                        <el-badge :value="listDetail.consultGroupNeedHandleCount" class="item" :max="99">
                            <p class="home-top-item-num">待处理 <span style="font-size:16px;font-weight:bold;color:#FFBF34;">{{zyzz}}</span></p>
                        </el-badge>
                    </div>
                    <div class="home-top-item-icon bg-ychz-big fr"></div>
                </div>
            </div>
            <div v-show="!(docObj.sszt==0)" class="home-top-item clearfix">
                <div class="home-top-item-link clearfix" @click="linkToModule('/main/arrange', 'sszz')">
                    <div class="home-top-item-content home-top-item-spwz fl">
                        <p class="home-top-item-title">日间手术转诊</p>
                        <el-badge :value="listDetail.videoConsultNeedHandleCount" class="item" :max="99">
                            <p class="home-top-item-num">待处理 <span style="font-size:16px;font-weight:bold;color:#34ABFF;">{{rjss}}</span></p>
                        </el-badge>
                    </div>
                    <div class="home-top-item-icon bg-rjzz-big fr"></div>
                </div>
            </div>
        </div>
        <!--首页内容部分-->
        <div class="home-content">
            <!--<HomeTableCmp :propsTableData="contentDataArr" v-loading="!isSuccess"/>-->
            <HomeHistory></HomeHistory>
        </div>
        <!--<FooterCmp :propsTotalCols="contentData.length" @changePage="changePage" :clientH="clientH" :propsPageSize="7"/>-->
    </div>
</template>
<style>

</style>
<script type="text/ecmascript-6">
    import { Badge, Loading, Message } from "element-ui";
    import FooterCmp from "../common/FooterCmp.vue";
    import axiosUtil from "../../utils/AxiosUtils.js";
    import HomeTableCmp from "./HomeTableCmp.vue";
    import HomeHistory from "./HomeHistory.vue";
    import Vue from "vue";
    Vue.use(Badge);
    Vue.use(Loading);
    export default{
        data: function(){
            return {
                currentPage: 1,
                isSuccess: false,//是否加载成功
                listDetail: "",//列表详情
                contentData: [],//需要展示的列表内容
                jczz:"",
                zyzz:"",
                rjss:"",
                docObj:JSON.parse(localStorage.getItem('docObj'))
            }
        },
        props: ["clientH"],
        components:{
            HomeTableCmp,
            FooterCmp,
            HomeHistory
        },
        created: function () {
            this.getData();
            this.$store.dispatch("changeSideItem", "rwzx");
        },
        mounted:function(){
            console.log(this.docObj,1212121)
            let _this=this;
            let options={
                docId:"595d05b0f19b9c898a58cc70",
            }
            axiosUtil("smarthos.sxzz.pending.list",options).then(res=>{
                if(res.succ){
                    console.log("88/888",res);
                        _this.jczz=res.list[0].count;
                        _this.zyzz=res.list[1].count;
                        _this.rjss=res.list[2].count;

                }else{
                    console.log("66/666");
                }
            })
        },
        computed: {
            contentDataArr: function(){
                const totalsCols = this.contentData.length?this.contentData.length:0;
                const start = (this.currentPage - 1) * 7;
                //end如果大于数组总长度则数值改为数组总长度
                const end = (this.currentPage * 7 > totalsCols) ? totalsCols : (this.currentPage * 7);
                return this.contentData.slice(start, end);
            }
        },
        methods: {
            getData: function () {//获取列表信息
                let _this = this;
                _this.isSuccess = false;
                let options = {
                    token: localStorage.getItem("token"),
                    Service: "nethos.consult.info.task.list"
                };
                /*axiosUtil(options, function (data) {
                    _this.isSuccess = true;
                    _this.listDetail = data.obj;
                    _this.contentData = data.obj.consultTaskList;
                }, function () {
                    _this.isSuccess = true;
                })*/
            },
            changePage: function(currentPage){
                this.currentPage = currentPage;
            },
            linkToModule: function (routerName, moduleName) {///点击跳转模块
                this.$store.dispatch("changeSideItem", moduleName);
                this.$router.push(routerName);
            }
        }
    }
</script>

<template>
    <div class="el-message-box__wrapper  invitaion-doctor">
        <div class="el-message-box w600 message-box">
            <div class="el-message-box__header">
               <!-- <div class="el-message-box__title">邀请医生</div>-->
                <i class="el-message-box__close el-icon-close" @click="$emit('hide')"></i>
            </div>
            <div>
                <label class="searchTip fontSize14 marginL15">邀请医生</label>
            </div>
            <!--<div class="clearfix paddingT10 paddingB10">
	            	<p class="fl floatHospital fontSize14 ">医院</p>
	            	<p class="fl floatRoom fontSize14" >科室</p>
	            	<p class="fr floatDoctor fontSize14">医生</p>
            </div>-->
            <div  v-for="(item,index) in list" :key=index class="marginL15 marginB10">
                <label class="fontSize14 jet-gray">医院</label>
                <el-select
                        v-model="item.acceptHosId"
                        size="small"
                        class="launch-input w165 h24"
                        filterable
                        :loading="loading"
                        @change="getHospId(hospId,index)"
                        @visible-change="getHospList"
                        placeholder="请选择医院">
                    <el-option v-for="k in hospList" :label="k.hosName" :value="k.hosId" :key="k.hosId"/>
                </el-select>
                <label class="fontSize14 jet-gray">科室</label>
                <el-select
                        v-model="item.acceptDeptId"
                        size="small"
                        class="launch-input w165 h24"
                        filterable
                        @visible-change="getDeptList(showList,index)"
                        @change="getDeptId(deptId,index)"
                        :loading="loading"
                        placeholder="请选择科室">
                    <el-option v-for="k in deptList" :label="k.deptName" :value="k.deptId" :key="k.deptId"/>
                </el-select>
                <label class="fontSize14 jet-gray">医生</label>
                <el-select
                        v-model="item.acceptDocId"
                        size="small"
                        class="launch-input w112 h24"
                        filterable
                        :loading="loading"
                        @visible-change="getDocList(showList,index)"
                        placeholder="请选择医生">
                    <el-option v-for="k in docList" :label="k.docName" :value="k.docId" :key="k.docId"/>
                </el-select>
            </div>
            <div class="ghost-btn-wrap clearfix">
                <!--<el-button size="small" class="w101 marginB10 marginT10 marginL10 ghost-btn " @click="add">新增医生</el-button>-->
                <el-button size="small" class="w101 marginR20 marginB10 marginT10 ghost-btn fr" @click="saveDocList">保存</el-button>
            </div>
        </div>
    </div>
</template>
<style>
   .msg-box-input{
       resize: none;
   }
</style>
<script>
    import { Message } from "element-ui";
    import axiosUtil from "../../utils/AxiosUtils.js"
    export default{
    	data: function(){
    		return {
    			list:[//医生列表
    				{
    					acceptHosId: "",//增加医生的医院id
    					acceptDeptId: "",//增加医生的科室id
    					acceptDocId: "",//增加医生id
    				}
    			],

                hosList: [],//从服务器获取医院列表
                deptList: [],//从服务器获取获取科室列表
                docList: [],//从服务器获取医生列表
                loading: false,//是否正在从远程获取数据

                hoseNameArr: [/*acceptHosName, acceptDeptName, acceptDocName*/],//从获取当前选中的医生信息（医院名， 科室名， 医生名）
    		}
    	},
        props: {
            title: {
                default: "请选择医生"
            },
            consultId: {
                required: true
            },
            type:{//远程会诊邀请视频类型未remoteVideo, 视频问诊邀请视频为videoAddDoc
                required: true
            }
        },
        computed: {
    	   inviteVoList: function () {//获取已经邀请的医生列表
               return this.$store.state.inviteVoList;
           }
        },
        methods: {
            submit: function(){
                this.$emit('hide');
            },
            add: function(){//增加医生
            	this.list.push({
            		hospital: "",
    				department: "",
    				doctor: ""
            	});
            },
            saveDocList: function(){//提交邀请的医生列表
                let docId = null;
                /*for(let i=0; i< this.list.length; i++){//遍历出获取的医生id列表
                    docList.push(list[i].acceptDocId);
                };*/
                let _this = this;
                docId = this.list[0].acceptDocId;
                let obj = null;//根据类型提交内容
                switch(this.type){//根据type类型调用不同接口
                    case "remoteVideo"://远程会诊要求视频
                        console.log("远程会诊");
                        obj = {
                            consultId: this.consultId,
                            inviteeType: "DOC",
                            inviteeId: docId,
                            token: localStorage.getItem("token"),
                            Service: "nethos.consult.group.invitevideo",
                        };
                        break;
                    case "VideoAddDoc"://视频问诊邀请视频
                        obj = {
                            consultId: this.consultId,
                            inviteeType: "DOC",
                            inviteeId: docId,
                            token: localStorage.getItem("token"),
                            Service: "nethos.consult.info.invitevideo",
                        };
                        break;
                    default:
                        obj = {
                            consultId: this.consultId,
                            inviteeType: "DOC",
                            inviteeId: docId,
                            token: localStorage.getItem("token"),
                            Service: "nethos.consult.group.invitevideo",
                        };
                        break;
                }
                axiosUtil(obj, function(data){
                    let docDetailArr = _this.docList.filter(item => item.docId == docId);
                    _this.inviteVoList.push({
                        "hosName": docDetailArr[0].docHosName,
                        "deptName": docDetailArr[0].docDeptName,
                        "userName": docDetailArr[0].docName
                    });
                    _this.$emit('hide');
                    Message({
                        showClose: true,
                        message: "保存成功",
                        type: "success"
                    });
                });
            },
            getHospList: function(showList){//获取医院列表,参数未显示下拉菜单和隐藏下拉菜单的boolean，下来为true
                if(showList){//当点击出现下拉菜单时 获取列表
                    this.loading = true;
                    let _this = this;
                    let options = {
                        Service: "nethos.hos.list"
                    };
                    axiosUtil(options, function(data){
                        _this.loading = false;
                        _this.hospList = data.list;
                    }, function () {
                        _this.loading = false;
                    });
                }
            },
            getHospId: function(hospId, index){//点击下拉项后，清空医生和科室内容。
                this.list[index].acceptDeptId="";
                this.list[index].acceptDocId = "";
            },
            getDeptList: function(showList, index){//获取科室列表
                if(this.list[index].acceptHosId){//如果医院已经选择完成则可以选择科室
                    this.loading = true;
                    let _this = this;
                    let options = {
                        hosId: _this.list[index].acceptHosId,
                        Service: "nethos.dept.list"
                    };
                    axiosUtil(options, function(data){
                        _this.loading = false;
                        _this.deptList = data.list;
                    }, function () {
                        _this.loading = false;
                    });
                }else{
                    Message({
                        showClose: true,
                        message: "请先选择医院",
                        type: "error"
                    });
                }
            },
            getDeptId: function(deptId, index){//获取选择的科室ID
                this.list[index].acceptDocId = "";
            },
            getDocList: function(showList, index){//获取医生列表
                if(this.list[index].acceptHosId&&this.list[index].acceptDeptId){//如果医院和科室已经选择完成则可以选择科室
                    this.loading = true;
                    let _this = this;
                    let options = {
                        hosId: _this.list[index].acceptHosId,
                        deptId: _this.list[index].acceptDeptId,
                        Service: "nethos.doc.list"
                    };
                    axiosUtil(options, function(data){
                        _this.loading = false;
                        _this.docList = data.list;
                        console.log(data.list);
                    }, function () {
                        _this.loading = false;
                    });
                }else{
                    Message({
                        showClose: true,
                        message: "请先选择医院和科室",
                        type: "error"
                    });
                }
            },
            getDocId: function(docId, index){//获取选择的医生id
                this.list[index].acceptDocId = docId;
            },
        }
    }
</script>

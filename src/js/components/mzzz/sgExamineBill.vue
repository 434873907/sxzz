<template>
    <div>
        <div class=" marginP remote-consultation-wrap content-bg-color" >
    <div class="base-top"  style="width: auto">
        <div style="box-sizing:border-box;padding:0px 20px;width:100%;background: #F9F9F9;border:1px solid #E3E1E2;">
            <p style="line-height: 40px;font-size: 14px;">基本信息</p>
        </div>
        <div class="base-message">
            <div class="base-doc">
                <el-button class="btn" type="primary" style="padding:5px 20px;">读市民卡</el-button>
            </div>
            <div class="base-docs" style="margin-top:10px;">
                <el-form :model="ruleForm"  ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <div class="base-con">
                        <el-form-item label="就诊卡号:"  >
                            <div class="base-idcard" style="width:120px;margin-left:10px;">
                                <el-select v-model="ruleForm.klx" placeholder="请选择卡号">
                                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                                    </el-option>
                                </el-select>
                            </div>
                            <div class="base-idcard" style="margin-left:10px;">
                                <el-input
                                        v-model="ruleForm.kh"
                                        width="200"
                                        size="small"
                                ></el-input>
                            </div>
                        </el-form-item>

                        <el-form-item label="姓名:">

                            <el-input
                                    v-model="ruleForm.yhxm"
                                    style="width:100px;"
                                    size="small"
                            ></el-input>
                        </el-form-item>
                        <el-form-item label="身份证号:"  style="margin-left:150px;" >
                            <el-input
                                    v-model="ruleForm.zjhm"
                                    width="200"
                                    size="small"
                            ></el-input>
                        </el-form-item>
                    </div>
                    <div class="base-con">
                        <el-form-item label="性别:" >
                            <el-radio class="radio" v-model="ruleForm.xb" label="男">男</el-radio>
                            <el-radio class="radio" v-model="ruleForm.xb" label="女">女</el-radio>
                        </el-form-item>
                        <el-form-item label="年龄:" >
                            <el-input
                                    v-model="ruleForm.age"
                                    style="width:100px;"
                                    size="small"
                            ></el-input>
                        </el-form-item>
                        <el-form-item label="患者手机号:"  style="margin-left:80px;">
                            <el-input
                                    v-model="ruleForm.sjhm"
                                    width="100"
                                    size="small"
                            ></el-input>
                        </el-form-item>
                        <el-form-item label="其他联系方式:"  style="margin-left:40px;">
                            <el-input
                                    v-model="ruleForm.lxdh"
                                    width="100"
                                    size="small"
                            ></el-input>
                        </el-form-item>

                    </div>
                    <div class="base-con">
                        <el-form-item label="家庭住址:" >
                            <div class="block">
                                <el-select v-model="ruleForm.provinceId" placeholder="请选择"  @change="getProvincess"  style="width: 150px"  >
                                    <el-option
                                            v-for="item in provinces"
                                            :key="item.id"
                                            :label="item.name"
                                            :value="item.id">
                                    </el-option>
                                </el-select>
                                <el-select v-model="ruleForm.cityId" placeholder="请选择" @change="getEaras"  style="width: 150px">
                                    <el-option
                                            v-for="item in citys"
                                            :key="item.id"
                                            :label="item.name"
                                            :value="item.id">
                                    </el-option>
                                </el-select>
                                <el-select v-model="ruleForm.regionId" placeholder="请选择"  style="width: 150px">
                                    <el-option
                                            v-for="item in earas"
                                            :key="item.id"
                                            :label="item.name"
                                            :value="item.id">
                                    </el-option>
                                </el-select>
                                <el-input
                                        v-model="ruleForm.lxdz"
                                        style="width:200px;"
                                        size="small"
                                        placeholder="街道等详细地址选择填写"
                                ></el-input>
                            </div>
                        </el-form-item>
                        <el-form-item label="医生电话:"  style="margin-left:40px;">
                            <el-input
                                    v-model="ruleForm.sqysdh"
                                    width="100"
                                    size="small"
                            ></el-input>
                        </el-form-item>
                    </div>
                </el-form>
            </div>
        </div>
        <div style="margin-top:10px;box-sizing:border-box;padding:0px 20px;width:100%;background: #F9F9F9;border:1px solid #E3E1E2;">
            <p style="line-height: 40px;font-size: 14px;">病情资料</p>
        </div>
        <div class="base-message">
            <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm" style="position: relative">
                <div class="base-con" style="margin-top:10px;float: left;width: 40%">
                    <span style="font-size: 14px;color: #48576a;position:absolute;left:0;top:0;" >初步诊断:</span>


                    <el-input
                            type="text"
                            style="width:60%;margin-left:70px;"
                            v-model="ruleForm.zdjg"
                            width="200"
                            size="small"
                    ></el-input>

                    <el-button class="btn" type="primary" style="margin-left:20px;padding:5px 10px;" >常用诊断</el-button>

                </div>

                <div class="base-con" style="height:60px;margin-top:10px;">
                    <span style="font-size: 14px;color: #48576a;position:absolute;left:0;top:0;">病情描述:</span>
                    <el-input
                            type="textarea"
                            style="width:70%;margin-left:70px;resize: none;"
                            v-model="ruleForm.bqms"
                            width="200"
                            size="small"
                    ></el-input>
                </div>
                <div  style="margin-top:10px;position:relative;">
                    <span style="font-size: 14px;color: #48576a;position:absolute;left:0;top:0;">病例附件:</span>
                    <div class="add-pic-list" >
                               <span v-show="oldImgList" class="showImg" v-for="(item,index) of oldImgList">
                                <img :src="item.wjdz" alt="">
                               </span>
                    </div>
                    <div class="ghost-btn-wrap">
                                   <!--<span v-show="oldNameList"  class="showText" v-for="(item,index) of oldNameList">-->
                                       <!--{{item.name}}-->
                                   <!--</span>-->
                        <a :href="item.wjdz" v-show="oldNameList"  class="showText" v-for="(item,index) of oldNameList">
                            {{item.name}}
                        </a>
                    </div>
                </div>
            </el-form>
        </div>
        <div v-show="!this.ruleForm.ywlx=='0'&&shzt=='1'" style="margin-top:10px">
            <div class="base-appoint" style="padding: 0">
                <div style="box-sizing:border-box;padding:0px 20px;width:100%;background: #F9F9F9;border:1px solid #E3E1E2;">
                    <p style="line-height: 40px;font-size: 14px;">预约信息</p>
                </div>
                <div class="base-con" style="margin-top:10px;box-sizing: border-box;padding:0px 20px;">
                    <span style="font-size: 14px;color: #48576a;margin-right: 50px"> 预约医院 : {{this.ruleForm.yymc}}</span>

                    <span style="font-size: 14px;color: #48576a;margin-right: 50px"> 检查大类 : {{this.ruleForm.jcmc}}</span>

                    <span style="font-size: 14px;color: #48576a;margin-right: 50px"> 检查项目 : {{this.ruleForm.flmc}}</span>

                </div>
                <div class="base-con" style="box-sizing: border-box;padding:0px 20px;">
                    <span class="demonstration" style="color:#48576A;margin-right: 50px">期望手术日期 : {{this.ruleForm.sqsj}}</span>

                </div>
                <div class="base-con" style="box-sizing: border-box;padding:0px 20px;">
                    <span style="margin-right: 50px;font-size: 14px;color: #48576a;">是否接受调剂 : {{this.ruleForm.dizt==1?'是':'否'}}</span>
                    <span v-show="this.ruleForm.dizt==1" class="demonstration" style="margin-right: 50px;margin-top:5px;margin-left:10px;">接受最晚时间:{{this.ruleForm.djrq}}</span>
                </div>
            </div>
        </div>
        <div v-show="!this.ruleForm.ywlx=='0'&&shzt=='1'&&this.type!='1'" style="margin-top: 30px;margin-bottom: 20px">
            <div class="base-appoint" style="padding: 0">
                <div style="box-sizing:border-box;padding:0px 20px;width:100%;background: #F9F9F9;border:1px solid #E3E1E2;">
                    <p style="line-height: 40px;font-size: 14px;">安排信息</p>
                </div>
                <div style="box-sizing: border-box;padding:10px 20px;">
                    <span style="margin-right: 30px;font-size: 14px;color: #48576a">是否确认安排:</span>
                    <el-radio class="radio" v-model="radio" label="1">是</el-radio>
                    <el-radio class="radio" v-model="radio" label="2" >否</el-radio>
                </div>
                <div v-show="radio=='2'">
                    <div style="overflow: hidden">
                        <el-form label-width="111px">
                            <el-form-item label="请输入驳回理由" style="width: 80%" >
                                <el-input v-model="desc" placeholder="可不填"></el-input>
                            </el-form-item>
                        </el-form>
                    </div>
                    <div style="width: 100%;text-align: center;margin-top: 0px">
                        <el-button type="primary" @click="refuse">保存并退出</el-button>
                    </div>
                </div>
                <div v-show="this.radio=='1'" style="box-sizing:border-box;padding:0px 20px;margin-bottom: 20px;margin-top: 20px">
                    <span style="margin-right: 20px;font-size: 14px;color: #48576a">预约医院</span>
                    <el-select v-model="hosId" placeholder="请选择">
                        <el-option
                                v-for="item in hosList"
                                :label="item.yymc"
                                :value="item.yyid">
                        </el-option>
                    </el-select>
                    <span style="margin-right: 20px;font-size: 14px;color: #48576a;margin-left: 20px">检查大类</span>
                    <el-select v-model="typeId" placeholder="请选择" @change="getProject(typeId)">
                        <el-option
                                v-for="item in typeList"
                                :key="item.jcid"
                                :label="item.jcmc"
                                :value="item.jcid">
                        </el-option>
                    </el-select>
                    <span style="margin-right: 20px;font-size: 14px;color: #48576a;margin-left: 20px">检查项目</span>
                    <el-select v-model="projectId" placeholder="请选择" @change="getProjectId(projectId)">
                        <el-option
                                v-for="item in projectList"
                                :key="item.jcid"
                                :label="item.jcmc"
                                :value="item.jcid">
                        </el-option>
                    </el-select>
                    <div class="base-con" style="margin: 15px 0">
                        <span class="demonstration" style="color:#48576A;">期望手术日期:</span>
                        <el-date-picker
                                v-model="sqyyrq"
                                type="date"
                                placeholder="选择日期"
                                :picker-options="pickerOptions0">
                        </el-date-picker>
                        <el-select v-model="sqyylx" filterable placeholder="上午" style="height:24px;margin-left:5px;">
                            <el-option label="上午" value="0"></el-option>
                            <el-option label="下午" value="1"></el-option>
                        </el-select>
                    </div>
                </div>
                <div v-show="this.radio=='1'" style="width: 100%;text-align: center;margin-top: 20px">
                    <el-button type="primary" @click="SureYuyue">确认安排</el-button>
                </div>
            </div>
        </div>
    </div>

        </div>
    </div>
</template>
<style>
    .showImg{
        display: inline-block;
        width: 60px;
        height: 60px;
        margin-right: 5px;
        position: relative;
    }
    .showImg:hover .showImgSon{
        display: block;
    }
    .showImgSon{
        position: absolute;
        width: 60px;
        height: 60px;
        line-height: 60px;
        text-align: center;
        vertical-align: middle;
        background: black;
        opacity: .7;
        color: white;
        display: none;
        cursor: pointer;
    }
    .showImg  img{
        width: 60px;
        height: 60px;
        margin-right: 10px;
    }
    .showText{
        display: inline-block;
        min-width: 150px;
        height: 30px;
        width: auto;
        line-height: 1px;
        text-align: center;
        border: 1px solid gainsboro;
        border-radius: 5px;
        background: white;
        padding: 15px 40px;
        font-size: 14px;
        color: grey;
        margin-right: 5px;
        position: relative;
        box-sizing: border-box;
    }
    .showText:hover .showTextSon{
        display: block;
    }
    .showTextSon{
        position: absolute;
        display: none;
        top:10px;
        right: 5px;
    }
    .diagnoseList{
        float: left;
        width: 300px;
        border: 1px solid gray;
        margin-top: 13px;
        position: absolute;
        left: 40%;
        top: 0;
        z-index: 888;
        background: white;
    }
    .diagnoseList p{
        border-bottom: 1px solid gray;
        padding: 8px;
    }
    .diagnoseList ul{
        border-bottom: 1px solid lightgrey;
        padding-bottom: 10px;
        max-height: 200px;
        overflow: auto;
    }
    .diagnoseList li{
        padding: 10px 8px 0 8px ;

    }
    .delete{
        display: inline-block;
        float: right;
    }
    .inputDiagnose{
    }
    .btnDiagnose{
        padding: 10px 8px 10px 8px ;
        overflow: hidden;
    }
</style>
<script type="text/ecmascript-6">
    import Vue from "vue";
    import { API_URL } from "../../data/Url.js";
    import { basicParam }from "../../data/basicParam";
    import axiosUtil from "../../utils/AxiosUtils.js"
    import { formatUnixTime } from "../../utils/DateFormat.js";
    import { Form, FormItem,Button, Select, Option, DatePicker,Input, Message, Upload ,MessageBox} from "element-ui";
    Vue.use(Form);
    Vue.use(FormItem);
    Vue.use(Button);
    Vue.use(Input);
    Vue.use(Select);
    Vue.use(Option);
    Vue.use(DatePicker );
    Vue.use(Upload);
    const upLoadFileCountMax = 9;//最大上传数量
    export default{
        data(){
            return{
                pickerOptions0: {
                    pickerOptions0(time) {
                        return time.getTime() < Date.now() - 8.64e7;
                    }},
                sqyyrq:"",
                sqyylx:'',
                type:'',
                jcdd:'',
                desc:"",
                nUMID:"",
                nUMDATE:'',
                nUMTIME:"",
                shzt:JSON.parse(localStorage.getItem('shzt')),
                radio:'',
                currentFirstDate:'',
                index:0,
                disabled:true,
                hosId:'',
                hosList:[{
                    yymc:JSON.parse(localStorage.getItem('docObj')).sqyymc,
                    yyid:""
                }],
                typeId:'',
                typeList:[],
                projectId:'',
                projectList:[],
                options: [{
                    value:0,
                    label: '省医保'
                }, {
                    value: 1,
                    label: '市医保'
                }, {
                    value: 2,
                    label: '市民卡'
                }, {
                    value: 3,
                    label: '就诊卡'
                }],
                oldImgList:[],
                oldNameList:[],
                citys:[],
                provinces:[],
                earas:[],
                ruleForm: {
                    klx: Number,
                    kh: '',
                    yhxm: '',
                    zjhm: '',
                    xb:'',
                    cityId:'',
                    provinceId:'',
                    regionId:'',
                    age:'',
                    sjhm:'',
                    zdjg:"",
                    lxdz:'',
                    lxdh:'',
                    bqms:'',
                    wjidList:[],
                    sqysdh:''
                },
            }
        },

        mounted(){
            this.applyDetail  = this.$route.params.applyDetail;
            this.type = this.$route.params.type
            this.ruleForm = {
                ...this.ruleForm,
                ...this.applyDetail
            }
            console.log(this.ruleForm,9999999999999999888888888);
            this.oldImgList = this.applyDetail.tpwjdzs
            this.oldNameList = this.applyDetail.fjwjdzs
            this.ruleForm.provinceId =parseInt(this.applyDetail.provinceId)
            this.ruleForm.cityId =parseInt(this.applyDetail.cityId)
            this.ruleForm.regionId =parseInt(this.applyDetail.regionId)
            this.getData();
//            this.getHosList();
            this.typeLists();

        },
        methods: {
            //拒接预约
            refuse(){
                axiosUtil('smarthos.sxzz.jczzsl.info',{
                    "jgid": "59411511191ce23575a63218",
                    "yyr": "595d05b0f19b9c898a58cc70",
                    "ddid":this.ruleForm.ddid,
                    "zzzt":this.radio,
                    "qryy":this.desc,
                    "yylx":"1",
                    "jczt":"2",
                    "qrysmc": "陈刚",
                }).then(res=>{
                    if(res.succ){
                        alert('拒绝成功');
                        this.$router.push({
                            name:'videoConsultation'
                        })
                    }else {
                        alert(res.msg)
                    }
                })
            },
            //确认预约
            SureYuyue(){
                MessageBox.confirm( '是否确认安排？', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    closeOnPressEscape:true,
                    type: 'warning'
                }).then(() => {
                    let _this=this;
                    _this.sqyyrq=formatUnixTime(this.sqyyrq).substring(0,10);
                    console.log( _this.sqyyrq,'时间格式')
                    axiosUtil('smarthos.sxzz.jczzsl.info',{
                        "jgid": "59411511191ce23575a63218",
                        "yyr": "595d05b0f19b9c898a58cc70",
                        "ddid":this.ruleForm.ddid,
                        "zzzt":this.radio,
                        "yyrq":this.sqyyrq,
                        "yylx":this.sqyylx,
                        "jczt":"1",
                        "qrksbh": "1",
                        "flid":this.typeId,
                        "jcid":this.projectId
                    }).then(res=>{
                        console.log(res,66666666);
                        if(res.succ){
                            this.$router.push({
                                name:"confrimBill",
                                params:{
                                    zyzzList:res.obj
                                }
                            })
                        }else {
                            alert(res.msg)
                        }
                    })

                })
            },
            //筛选那几个sb id和名字
            filterArr1(arr,id){
                console.log(arr,id,'这个是不是')
                function getObj (item) {
                    return item.dEPTCODE==id;
                }
                return   arr.filter(getObj)
            },
            filterArr2(arr,id){
                function getObj (item) {
                    return item.iTEMCODE==id;
                }
                return   arr.filter(getObj)
            },
            //获取检查项目
            projectLists(id){
                axiosUtil('smarthos.sxzz.jcxmlbsg.info',{
                    "jgid": "59411511191ce23575a63218",
                    "yyid": "59411511191ce23575a63218",
                    "flid":id
                }).then(res=>{
                    if(res.succ){
                        this.projectList = res.list
                    }else {
                        alert(res.msg)
                    }
                })
            },
            getProject(id){
                console.log(id,'检查id')
                this.projectLists(id)
            },
            //获取检查大类
            typeLists(){
                axiosUtil('smarthos.sxzz.jcxmdlsg.info',{
                    "jgid": "59411511191ce23575a63218",
                    "yyid": "59411511191ce23575a63218",
                }).then(res=>{
                    if(res.succ){
                        this.typeList = res.list
                    }else {
                        alert(res.msg)
                    }
                })
            },
            //获取医院
            getHosList(){
                axiosUtil('smarthos.sxzz.hos.list',{
                    "jgid": "59411511191ce23575a63218",
                    "ywlx":1
                }).then(res=>{
                    if(res.succ){
                        this.hosList = res.list
                    }else {
                        alert(res.msg)
                    }
                })
            },
            getValue(value){
                console.log(value,8888)
                this.$set(this.$data.ruleForm,'zdjg',value)
            },
            hideDiagnose(){
                this.$set(this.$data,'showDiagnoseList',false)
            },
            addDiagnose(){
                axiosUtil('smarthos.sxzz.cbzdAdd.info',{
                    "yyid": "59411511191ce23575a63218",
                    "jgid": "59411511191ce23575a63218",
                    "ysid": "595d05b0f19b9c898a58cf48",
                    "zdxx": this.zdxx
                }).then(res=>{
                    console.log(res,66666);
                    if(res.succ){
                        this.getDiagnoseList();
                        this.zdxx=''
                    }else {
                        alert(res.msg)
                    }
                })
            },
            delDiagnose(id){
                console.log(id,212121);
                if(confirm('确认删除？')) {
                    axiosUtil('smarthos.sxzz.cbzdDelete.info',{
                        "yyid": "59411511191ce23575a63218",
                        "jgid": "59411511191ce23575a63218",
                        "zdid":id
                    }).then(res=>{
                        console.log(res,66666);
                        if(res.succ){
                            this.getDiagnoseList()
                        }else {
                            alert(res.msg)
                        }
                    })
                }else {
                    return false;
                }
            },
            getDiagnoseList(){
                this.$set(this.$data,'showDiagnoseList',true)
                axiosUtil('smarthos.sxzz.cbzdSelect.info',{
                    "yyid": "59411511191ce23575a63218",
                    "jgid": "59411511191ce23575a63218",
                    "yyr":"595d05b0f19b9c898a58cf48"
                }).then(res=>{
                    console.log(res,66666);
                    if(res.succ){
                        this.$set(this.$data,'diagnoseList',res.list)
                    }else {
                        alert(res.msg)
                    }
                })
            },
            getData(id){

                axiosUtil('smarthos.sxzz.province.list',{}).then(res=>{
                    if(res.succ){
                        console.log(res,123123123)
                        var list = res.list;
                        this.provinces = list;


                    }else {
                        alert(res.msg)
                    }
                })
            },
            getProvincess(value){
                this.getCity(value)
            },
            getEaras(value){
                this.earasList(value)
            },
            earasList(value,id){
                axiosUtil('smarthos.sxzz.region.list',{
                    cityId:value
                }).then(res=>{
                    if(res.succ){
                        var list = res.list;
                        this.earas = list;

                    }else {
                        alert(res.msg)
                    }
                })
            },
            getCity(value,id){
                axiosUtil('smarthos.sxzz.city.list',{
                    provinceId:value
                }).then(res=>{
                    if(res.succ){
                        var list = res.list;
                        this.citys = list;
                    }else {
                        alert(res.msg)
                    }
                })
            },

        }
    }
</script>
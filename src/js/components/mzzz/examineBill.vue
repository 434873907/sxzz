<template>
<div >
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
        <div style="box-sizing:border-box;margin-top:10px;padding:0px 20px;width:100%;background: #F9F9F9;border:1px solid #E3E1E2;">
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
                        <a :href="item.wjdz"  v-show="oldNameList"  class="showText" v-for="(item,index) of oldNameList">
                            {{item.name}}
                        </a>
                    </div>
                </div>
            </el-form>
        </div>
       <div v-show="!this.ruleForm.ywlx=='0'&&shzt=='1'" style="margin-top: 10px">
           <div class="base-appoint" style="padding: 0">
               <div style="box-sizing:border-box;margin-top:10px;padding:0px 20px;width:100%;background: #F9F9F9;border:1px solid #E3E1E2;">
                   <p style="line-height: 40px;font-size: 14px;">预约信息</p>
               </div>
               <div class="base-con" style="box-sizing: border-box;padding:10px 20px;">
                   <span style="font-size: 14px;color: #48576a;margin-right: 50px"> 预约医院 : {{this.ruleForm.yymc}}</span>
                   <span v-show="ruleForm.flmc" style="font-size: 14px;color: #48576a;margin-right: 50px"> 检查大类 : {{this.ruleForm.flmc}}</span>
                   <span v-show="ruleForm.jcmc" style="font-size: 14px;color: #48576a;margin-right: 50px"> 检查项目 : {{this.ruleForm.jcmc}}</span>
                   <span v-show="ruleForm.qrksmc" style="font-size: 14px;color: #48576a;margin-right: 50px"> 预约科室 : {{this.ruleForm.qrksmc}}</span>
                   <span v-show="!(ruleForm.jcmc||ruleForm.ssmc)" style="font-size: 14px;color: #48576a;margin-right: 50px"> 病情等级 :
                       <span v-show="ruleForm.bqdj==0">
                       一般
                   </span>
                       <span v-show="!ruleForm.bqdj==0">
                           {{this.ruleForm.bqdj=='1'?'急':'危重'}}
                       </span>
                   </span>
                   <span v-show="ruleForm.ssmc" style="font-size: 14px;color: #48576a;margin-right: 50px"> 手术名称 : {{this.ruleForm.ssmc}}</span>
               </div>
               <div class="base-con" style="box-sizing: border-box;padding:10px 20px;">
                   <span  v-show="ruleForm.jcmc" class="demonstration" style="color:#48576A;margin-right: 50px">期望检查日期 : {{this.ruleForm.sqyyrq}}
                    &nbsp;&nbsp;&nbsp;{{this.ruleForm.sqyylx=='0'?'上午':'下午'}}</span>
                   <span v-show="!(ruleForm.jcmc||ruleForm.ssmc)"  class="demonstration" style="color:#48576A;margin-right: 50px">期望住院时间 : {{this.ruleForm.sqyyrq}}
                       &nbsp;&nbsp;&nbsp;{{this.ruleForm.sqyylx=='0'?'上午':'下午'}}</span>
                   <span v-show="ruleForm.ssmc"  class="demonstration" style="color:#48576A;margin-right: 50px">期望手术时间 : {{this.ruleForm.sqyyrq}}
                       &nbsp;&nbsp;&nbsp;{{this.ruleForm.sqyylx=='0'?'上午':'下午'}}</span>

               </div>
               <div class="base-con" style="box-sizing: border-box;padding:10px 20px;">
                   <span style="margin-right: 50px;font-size: 14px;color: #48576a;">是否接受调剂 : {{this.ruleForm.djzt=='1'?'是':'否'}}</span>
                   <span v-show="this.ruleForm.djzt=='1'" class="demonstration" style="margin-right: 50px;margin-top:5px;margin-left:10px;">接受最晚时间:{{this.ruleForm.djrq}}</span>
               </div>
           </div>
       </div>
        <div v-show="!this.ruleForm.ywlx=='0'&&shzt=='1'&&this.type!='1'" style="margin-top: 10px;margin-bottom: 20px">
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

                <div v-show="this.radio=='1'" style="box-sizing:border-box;padding:0px 20px;margin-bottom: 20px;margin-top: 20px;margin-lfet:20px;">
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
                                :key="item.dEPTCODE"
                                :label="item.dEPTNAME"
                                :value="item.dEPTCODE">
                        </el-option>
                    </el-select>
                    <span style="margin-right: 20px;font-size: 14px;color: #48576a;margin-left: 20px">检查项目</span>
                    <el-select v-model="projectId" placeholder="请选择" @change="getProjectId(projectId)">
                        <el-option
                                v-for="item in projectList"
                                :key="item.iTEMCODE"
                                :label="item.iTEMNAME"
                                :value="item.iTEMCODE">
                        </el-option>
                    </el-select>
                </div>
            </div>
        </div>
        <div v-show="this.projectId&&this.radio=='1'">
            <el-button :disabled="disabled" @click="lastDate" type="primary" style="padding:5px 20px;" >上周</el-button>
            <el-button :disabled="!disabled"  type="primary" @click="nextDate" style="padding:5px 20px;" >下周</el-button>
        </div>
        <div v-show="this.projectId&&this.radio=='1'" style="width:100%;">
            <div class="news-table" style="width:100%;">
                <el-table
                        :data="arrangeList"
                        height="280"
                        style="width:100%;"
                        border
                        @cell-click="and"
                >
                    <el-table-column :label="dateList[0].date" prop="monday">
                        <el-table-column
                                :label="dateList[0].week"
                        >
                            <el-table-column
                                    prop="monday.am"
                                    label="上午"
                            >
                                <template scope="scope">
                                    <div>{{scope.row.monday.am=='0'?'':scope.row.monday.am}}</div>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    prop="monday.pm"
                                    label="下午"
                            >
                                <template scope="scope">
                                    <div>{{scope.row.monday.pm=='0'?'':scope.row.monday.pm}}</div>
                                </template>
                            </el-table-column>
                        </el-table-column>
                    </el-table-column>
                    <el-table-column :label="dateList[1].date" props="tuesday">
                        <el-table-column
                                :label="dateList[1].week"
                        >
                            <el-table-column
                                    prop="tuesday.am"
                                    label="上午"
                            >
                                <template scope="scope">
                                    <div>{{scope.row.tuesday.am=='0'?'':scope.row.tuesday.am}}</div>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    prop="tuesday.pm"
                                    label="下午"
                            >
                                <template scope="scope">
                                    <div>{{scope.row.tuesday.pm=='0'?'':scope.row.tuesday.pm}}</div>
                                </template>
                            </el-table-column>
                        </el-table-column>
                    </el-table-column>
                    <el-table-column :label="dateList[2].date" props="wednesday">
                        <el-table-column
                                prop="name"
                                :label="dateList[2].week"
                        >
                            <el-table-column
                                    prop="wednesday.am"
                                    label="上午"
                            >
                                <template scope="scope">
                                    <div>{{scope.row.wednesday.am=='0'?'':scope.row.wednesday.am}}</div>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    prop="wednesday.pm"
                                    label="下午"
                            >
                                <template scope="scope">
                                    <div>{{scope.row.wednesday.pm=='0'?'':scope.row.wednesday.pm}}</div>
                                </template>
                            </el-table-column>
                        </el-table-column>
                    </el-table-column>
                    <el-table-column :label="dateList[3].date" props="thursday">
                        <el-table-column
                                prop="name"
                                :label="dateList[3].week"
                        >
                            <el-table-column
                                    prop="thursday.am"
                                    label="上午"
                            >
                                <template scope="scope">
                                    <div>{{scope.row.thursday.am=='0'?'':scope.row.thursday.am}}</div>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    prop="thursday.pm"
                                    label="下午"
                            >
                                <template scope="scope">
                                    <div>{{scope.row.thursday.pm=='0'?'':scope.row.thursday.pm}}</div>
                                </template>
                            </el-table-column>
                        </el-table-column>
                    </el-table-column>
                    <el-table-column :label="dateList[4].date" props="friday">
                        <el-table-column
                                prop="name"
                                :label="dateList[4].week"
                        >
                            <el-table-column
                                    prop="friday.am"
                                    label="上午"
                                    :data="dateList[4].date"
                            >
                                <template scope="scope">
                                    <div>{{scope.row.friday.am=='0'?'':scope.row.friday.am}}</div>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    prop="friday.pm"
                                    label="下午"
                            >
                                <template scope="scope">
                                    <div>{{scope.row.friday.pm=='0'?'':scope.row.friday.pm}}</div>
                                </template>
                            </el-table-column>
                        </el-table-column>
                    </el-table-column>
                    <el-table-column :label="dateList[5].date" props="saturday">
                        <el-table-column
                                prop="name"
                                :label="dateList[5].week"
                        >
                            <el-table-column
                                    prop="saturday.am"
                                    label="上午"
                            >
                                <template scope="scope">
                                    <div>{{scope.row.saturday.am=='0'?'':scope.row.saturday.am}}</div>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    prop="saturday.pm"
                                    label="下午"
                            >
                                <template scope="scope">
                                    <div>{{scope.row.saturday.pm=='0'?'':scope.row.saturday.pm}}</div>
                                </template>
                            </el-table-column>
                        </el-table-column>
                    </el-table-column>

                    <el-table-column :label="dateList[6].date" props="sunday">
                        <el-table-column
                                prop="name"
                                :label="dateList[6].week"
                        >
                            <el-table-column
                                    prop="sunday.am"
                                    label="上午"
                            >
                                <template scope="scope">
                                    <div>{{scope.row.sunday.am=='0'?'':scope.row.sunday.am}}</div>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    prop="sunday.pm"
                                    label="下午"
                            >
                                <template scope="scope">
                                    <div>{{scope.row.sunday.pm=='0'?'':scope.row.sunday.pm}}</div>
                                </template>
                            </el-table-column>
                        </el-table-column>
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <div style="background: white" v-show="this.tableData.length&&this.radio=='1'" >
            <div style="box-sizing:border-box;padding:0px 20px;width:100%;background: #F9F9F9;border:1px solid #E3E1E2;">
                <p style="line-height: 40px;font-size: 14px;">当前剩余号源数:{{this.tableData.length}}</p>
            </div>
            <!--<div style="height:40px;line-height: 40px;box-sizing: border-box;padding:0px 20px;">-->
                <!--<span >当前剩余号源数:{{this.tableData.length}}</span>-->
            <!--</div>-->
            <div>
                <el-table
                        ref="multipleTable"
                        :data="tableData"
                        @current-change="handleCurrentChange"
                        height="330"
                        style="width:100%;">
                    <el-table-column
                            type="index"
                    >
                    </el-table-column>
                    <el-table-column
                            type="selection"
                    >
                    </el-table-column>
                    <el-table-column
                            prop="nUMNO"
                            label="就诊序号"
                    >
                    </el-table-column>
                    <el-table-column
                            prop="nUMDATE"
                            label="检查时间"
                    >
                    </el-table-column>
                    <el-table-column
                            prop="dEPTCODE"
                            label="检查设备代号"
                    >
                    </el-table-column>
                    <el-table-column
                            prop="aDDRESS"
                            label="检查地点"
                    >
                    </el-table-column>
                </el-table>
            </div>
            <div style="width: 100%;text-align: center;margin-top: 20px">
                <el-button type="primary" @click="SureYuyue">确认预约</el-button>
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
                type:'',
                jcdd:'',
                desc:"",
                nUMID:"",
                nUMDATE:'',
                nUMTIME:"",
                tableData:[],
                deptcode:'',
                ampm:'',
                equipid:'',
                schdate:'',
                shzt:JSON.parse(localStorage.getItem('shzt')),
                radio:'',
                currentFirstDate:'',
                index:0,
                disabled:true,
                dateList:[],
                arrangeList:[],
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
            this.setDate(new Date());
           this.applyDetail  = this.$route.params.applyDetail;
            this.type = this.$route.params.type;
            console.log( this.type,'类型啊')
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
                MessageBox.confirm( '是否确认预约？', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    closeOnPressEscape:true,
                    type: 'warning'
                }).then(() => {
                    let _this=this;
                    axiosUtil('smarthos.sxzz.jczzsl.info',{
                        "jgid": "59411511191ce23575a63218",
                        "yyr": "595d05b0f19b9c898a58cc70",
                        "ddid":this.ruleForm.ddid,
                        "zzzt":this.radio,
                        "yylx":"1",
                        "flid":this.typeId,
                        "jcid":this.projectId,
                        "flmc": this.flmc,
                        "jcmc": this.jcmc,
                        "jczt":"2",
                        "qrysmc": "陈刚",
                        "ksid":this.deptcode,
                        "hyid":this.nUMID,
                        "hyrq":this.nUMDATE,
                        "hysj": this.nUMTIME,
                        "jcdd":this.jcdd
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

                }).catch(() => {
                    console.log("2");
                });
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
            //获取检查号源
            handleCurrentChange(val,old) {
                console.log(val,'好远数据');
                this.nUMID = val.nUMID;
                this.nUMDATE = val.nUMDATE;
                this.nUMTIME = val.nUMTIME;
                this.jcdd = val.aDDRESS;
                this.$refs.multipleTable.toggleRowSelection(old,false);
            },
            //获取号源原始数据
                getMarkNum(id,date){
                    axiosUtil('smarthos.sxzz.jczzsspb.info',{
                        "jgid": "59411511191ce23575a63218",
                        "checkid":id,
                       'date':date
                    }).then(res=>{
                        if(res.succ){
                            var list = res.list;
                            var arr = [];
                            var obj = {};
                            var dayList = [];
                            for(var i=0;i<list.length;i++){
                                var dateObj = {};
                                console.log(list[i])
                                dateObj.am = list[i].nUMREMAIN;
                                dateObj.pm = list[i].pMNUMREMAIN;
                                dateObj.eQUIPID = list[i].eQUIPID;//上午排班编号
                                dateObj.pMEQUIPID = list[i].pMEQUIPID;　　//下午排班编号
                                dateObj.dEPTCODE = list[i].dEPTCODE;//上午科室编号
                                dateObj.pMDEPTCODE = list[i].pMDEPTCODE;//上午科室编号
                                console.log(dateObj)
                                console.log(dayList)
                                dayList.push(dateObj);
                            };
                            obj.monday = dayList[0];
                            obj.tuesday = dayList[1];
                            obj.wednesday = dayList[2];
                            obj.thursday = dayList[3];
                            obj.friday = dayList[4];
                            obj.saturday = dayList[5];
                            obj.sunday = dayList[6];
                            arr.push(obj);
                            console.log(arr,'看看是不是我想要的')
                            this.$set(this.$data,'arrangeList',arr)
                        }else {
                            alert(res.msg)
                        }
                    })
                },
            getProjectId(id){
                this.getMarkNum(id,'')
            },
            //获取号源数据改造
            and(row, column, cell){
                console.log(row,'行')
                this.flmc = this.filterArr1(this.typeList,this.typeId)[0].dEPTNAME;
                this.jcmc = this.filterArr2(this.projectList,this.projectId)[0].iTEMNAME;
                if(column.property.split('.')[1]=='am'){
                    this.$set(this.$data,'ampm',1)
                }else {
                    this.$set(this.$data,'ampm',2)
                }
                switch (column.property){
                    case 'monday.am':
                        this.$set(this.$data,'schdate',this.dateList[0].date);
                        this.$set(this.$data,'deptcode',row.monday.dEPTCODE)
                        this.$set(this.$data,'equipid',row.monday.eQUIPID)
                        break;
                    case 'monday.pm':
                        this.$set(this.$data,'schdate',this.dateList[0].date);
                        this.$set(this.$data,'deptcode',row.monday.pmdeptcode)
                        this.$set(this.$data,'equipid',row.monday.pMEQUIPID)
                        break;
                    case 'tuesday.am':
                        this.$set(this.$data,'schdate',this.dateList[1].date)
                        this.$set(this.$data,'deptcode',row.tuesday.dEPTCODE)
                        this.$set(this.$data,'equipid',row.tuesday.eQUIPID)
                        break;
                    case 'tuesday.pm':
                        this.$set(this.$data,'schdate',this.dateList[1].date)
                        this.$set(this.$data,'deptcode',row.tuesday.pMDEPTCODE)
                        this.$set(this.$data,'equipid',row.tuesday.pMEQUIPID)
                        break;
                    case 'wednesday.am':
                        this.$set(this.$data,'schdate',this.dateList[2].date)
                        this.$set(this.$data,'deptcode',row.wednesday.dEPTCODE)
                        this.$set(this.$data,'equipid',row.wednesday.eQUIPID)
                        break;
                    case 'wednesday.pm':
                        this.$set(this.$data,'schdate',this.dateList[2].date)
                        this.$set(this.$data,'deptcode',row.wednesday.pMDEPTCODE)
                        this.$set(this.$data,'equipid',row.wednesday.pMEQUIPID)
                        break;
                    case 'thursday.am':
                        this.$set(this.$data,'schdate',this.dateList[3].date)
                        this.$set(this.$data,'deptcode',row.thursday.dEPTCODE)
                        this.$set(this.$data,'equipid',row.thursday.eQUIPID)
                        break;
                    case 'thursday.pm':
                        this.$set(this.$data,'schdate',this.dateList[3].date)
                        this.$set(this.$data,'deptcode',row.thursday.pMDEPTCODE)
                        this.$set(this.$data,'equipid',row.thursday.pMEQUIPID)
                        break;
                    case 'friday.am':
                        this.$set(this.$data,'schdate',this.dateList[4].date)
                        this.$set(this.$data,'deptcode',row.friday.dEPTCODE)
                        this.$set(this.$data,'equipid',row.friday.eQUIPID)
                        break;
                    case 'friday.pm':
                        this.$set(this.$data,'schdate',this.dateList[4].date)
                        this.$set(this.$data,'deptcode',row.friday.pMDEPTCODE)
                        this.$set(this.$data,'equipid',row.friday.pMEQUIPID)
                        break;
                    case 'saturday.am':
                        this.$set(this.$data,'schdate',this.dateList[5].date)
                        this.$set(this.$data,'deptcode',row.saturday.dEPTCODE)
                        this.$set(this.$data,'equipid',row.saturday.eQUIPID)
                        break;
                    case 'saturday.pm':
                        this.$set(this.$data,'schdate',this.dateList[5].date)
                        this.$set(this.$data,'deptcode',row.saturday.pMDEPTCODE)
                        this.$set(this.$data,'equipid',row.saturday.pMEQUIPID)
                        break;
                    case 'sunday.am':
                        this.$set(this.$data,'schdate',this.dateList[6].date)
                        this.$set(this.$data,'deptcode',row.sunday.dEPTCODE)
                        this.$set(this.$data,'equipid',row.sunday.eQUIPID)
                        break;
                    case 'sunday.pm':
                        this.$set(this.$data,'schdate',this.dateList[6].date)
                        this.$set(this.$data,'deptcode',row.sunday.pMDEPTCODE)
                        this.$set(this.$data,'equipid',row.sunday.pMEQUIPID)
                        break;
                }
                this.sourceList();
            },
            sourceList(){
                if(this.deptcode){
                    axiosUtil('smarthos.sxzz.jczzsshy.info',{
                        deptcode:this.deptcode,
                        ampm:this.ampm,
                        equipid:this.equipid,
                        schdate:this.schdate,

                    }).then(res=>{
                        if(res.succ){
                            this.$set(this.$data,'tableData',res.list);
                        }
                    })
                }else {
                    alert('号源列表为空！')
                }


            },
            //表格的时间设置
            formatDate(date){
                var year = date.getFullYear()+'-';
                var month = (date.getMonth()+1>9?date.getMonth()+1:'0'+(date.getMonth()+1))+'-';
                var day = (date.getDate()>9?date.getDate():'0'+(date.getDate()))
                var week = ['星期天','星期一','星期二','星期三','星期四','星期五','星期六'][date.getDay()];
                return {
                    date:year+month+day,
                    week:week
                }
            },
            setDate(date){
                console.log(date)
                var week = date.getDay()-1;
//                date = this.addDate(date,week*-1);
                this.currentFirstDate = new Date(date);
                var arr = [];
                for(var i = 0;i<7;i++){
                    arr.push(this.formatDate(i==0 ? date : this.addDate(date,1)))
                };
                console.log(arr,'时间泪白哦')
                this.$set(this.$data,'dateList',arr)
            },
            addDate(date,n){
                date.setDate(date.getDate()+n);
                return date;
            },
            nextDate(){
                if(this.projectId){
                    this.getMarkNum(this.projectId,this.dateList[0].date);
                    this.$set(this.$data,'disabled',false);
                    this.setDate(this.addDate(this.currentFirstDate,7));
                }else {
                    alert('请选择检查项目')
                }
            },
            lastDate(){
                this.getMarkNum(this.projectId,"");
                this.$set(this.$data,'disabled',true);
                    this.setDate(this.addDate(this.currentFirstDate,-7));
            },
            //获取检查项目
            projectLists(id){
                axiosUtil('smarthos.sxzz.jcxmlb.info',{
                    "jgid": "59411511191ce23575a63218",
                    "DEPTCODE":id
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
                axiosUtil('smarthos.sxzz.jcxmdl.info',{
                    "jgid": "59411511191ce23575a63218"
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
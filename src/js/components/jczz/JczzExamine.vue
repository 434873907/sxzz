<template>
    <div>
        <el-form  ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <BaseMessage :applyDetail="applyDetail" :index="index" @getDetail="getDetail"></BaseMessage>
            <div  class=" marginP remote-consultation-wrap content-bg-color">
                <div style="box-sizing:border-box;margin-top:10px;padding:0px 20px;width:100%;background: #F9F9F9;border:1px solid #E3E1E2;">
                    <p style="line-height: 40px;font-size: 14px;">预约信息</p>
                </div>
                <div class="base-appoint" style="">
                    <div class="base-con" style="padding:20px 20px 0px 20px;">
                        <span style="font-size: 14px;color: #48576a;">预约医院:</span>
                        <el-select v-model="somedata.hospital" filterable placeholder="请选择" style="height:24px;margin-left:5px;" @change="selectHospital">
                            <el-option
                                    v-for="item in hospitalList"
                                    :key="item.yyid"
                                    :label="item.yymc"
                                    :value="item.yyid">
                            </el-option>
                        </el-select>
                        <span style="font-size: 14px;color: #48576a;">检查大类:</span>
                        <el-select v-model="somedata.fild"   @change="outcheck"  filterable placeholder="请选择" style="height:24px;margin-left:5px;">
                            <el-option
                                    v-for="item in bigList"
                                    :key="item.jcid"
                                    :label="item.jcmc"
                                    :value="item.jcid"
                            >
                            </el-option>
                        </el-select>
                        <span style="font-size: 14px;color: #48576a;">检查项目:</span>
                        <el-select v-model="somedata.jcid" filterable placeholder="请选择" style="height:24px;margin-left:5px;">
                            <el-option
                                    v-for="item in checkList"
                                    :key="item.jcid"
                                    :label="item.jcmc"
                                    :value="item.jcid"
                            >
                            </el-option>
                        </el-select>
                    </div>
                    <div class="base-con">
                        <span class="demonstration" style="color:#48576A;margin-left:20px;">期望手术日期:</span>
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
                    <div class="base-con">
                        <el-form-item label="是否接受调剂:" prop="tjbz" style="margin-left:20px;">
                            <el-radio class="radio" v-model="tjbz" label="1">是</el-radio>
                            <el-radio class="radio" v-model="tjbz" label="0">否</el-radio>
                        </el-form-item>
                        <span v-show="tjbz=='1'" class="demonstration" style="margin-top:5px;margin-left:10px;">接受最晚时间:</span>
                        <el-date-picker v-show="tjbz=='1'"
                                        v-model="tjrq"
                                        type="date"
                                        style="margin-top:5px;"
                                        placeholder="选择日期"
                                        :picker-options="pickerOptions0">
                        </el-date-picker>
                    </div>
                </div>
            </div>
            <div class="transfer-btn">
                <div style="position:absolute;left:40%;top:20px;">
                    <el-button class="btn " type="primary" style="padding:5px 20px; border-color: #00b2b1;
  background-color: #00b2b1;" @click="goBack">返回</el-button>
                    <el-button  class="btn success1" type="text" style="padding:5px 20px" @click="SendAppoint">确认预约</el-button>
                </div>
            </div>
        </el-form>
    </div>

</template>
<style>
</style>
<script type="text/ecmascript-6">
    import Vue  from  "vue";
    import  'element-ui';
    import axiosUtil from "../../utils/AxiosUtils.js";
    import { Button, Radio, RadioGroup, Select, Option, DatePicker, Input, Message, Loading, Popover, MessageBox } from "element-ui";
    import BaseMessage from  "../common/BaseMessage.vue";
    import { formatUnixTime } from "../../utils/DateFormat.js";
    Vue.use(Button);
    Vue.use(Radio);
    Vue.use(RadioGroup);
    Vue.use(Select);
    Vue.use(Option);
    Vue.use(DatePicker );
    Vue.use(Loading);
    Vue.use(Popover);
    export default{
        data (){
            return {
                index:0,
                pickerOptions0: {
                    pickerOptions0(time) {
                        return time.getTime() < Date.now() - 8.64e7;
                    }},
                index:0,
                somedata:{
                    hospital:'',
                    jcid:'',
                    fild:"",
                    state:'',
                    date:'',
                },
                hospitalList:[],
                bigList:[],
                checkList:[],
                tjbz: '',
                bqdj: '',
                sqyyrq: '',
                sqyylx: '',
                tjrq: '',
                sex:'',
                value5:'',
            }
        },
        components:{
            BaseMessage
        },
        mounted(){
            this.applyDetail = this.$route.params.applyDetail;
            this.getHospital();
        },
        methods: {
            outcheck:function(){
                this.checkText();
            },
            checkBig:function(){
                let _this=this;
                let options={
                    yyid:_this.somedata.hospital
                }
                axiosUtil("smarthos.sxzz.jcxmdlsg.info",options).then(res=>{
                    console.log("200000",res);
                    _this.bigList=res.list;
                })
            },
            checkText:function(){
                let _this=this;
                let options={
                    flid:_this.somedata.fild,
                };
                axiosUtil("smarthos.sxzz.jcxmlbsg.info",options).then(res=>{
                    console.log("200001",res);
                    _this.checkList=res.list;
                })
            },
            getDetail(dataForm){
                var _this = this
                function checkAdult(hos) {
                    return hos.yyid== _this.somedata.hospital
                }
                var hosObj = this.hospitalList.filter(checkAdult);
                var yymc=hosObj[0].yymc;
                this.sqyyrq?this.sqyyrq=formatUnixTime(this.sqyyrq).substring(0,10):this.sqyyrq="";
                this.tjrq?this.tjrq=formatUnixTime(this.tjrq).substring(0,10):this.tjrq='';
                let options={
                    yhid:dataForm.yhid,
                    "yyr": "595d05b0f19b9c898a58cc70",
                    flid:_this.somedata.fild,
                    jcid:_this.somedata.jcid,
                    klx:dataForm.klx,
                    kh: dataForm.kh,
                    yhxm: dataForm.yhxm,
                    zjhm: dataForm.zjhm,
                    xb:dataForm.xb,
                    cityId:dataForm.cityId,
                    provinceId:dataForm.provinceId,
                    regionId:dataForm.regionId,
                    age:dataForm.age,
                    sjhm:dataForm.sjhm,
                    lxdz:dataForm.lxdz,
                    lxdh:dataForm.lxdh,
                    qryymc:yymc,
                    zdjg:dataForm.zdjg,
                    bqms:dataForm.bqms,
                    wjidList:dataForm.wjidList,
                    yyid:this.somedata.hospital,
                    ksid:this.somedata.office,
                    sqyyrq:this.sqyyrq,
                    sqyylx:this.sqyylx,
                    djzt:_this.tjbz,
                    djrq:this.tjrq,
                    sqyymc: "特扬医院",
                    sqysxm: "陈刚",
                    sqysdh: "18358023268",
                    sqksbh: "59193cddca72a7bbbbe86c1c",
                    sqksmc: "骨科",
                };
                MessageBox.confirm('是否确认预约？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    closeOnPressEscape:true,
                    type: 'warning'
                }).then(() => {
                    let _this=this;
                    axiosUtil('smarthos.sxzz.jczzsq.info',options,{
                    }).then(res=>{
                        console.log(res,9999)
                        if(res.succ){
                            console.log("999999",res);
                            _this.$router.push({path:"/main/jczzbox",name:"jczzbox",params:{zyzzList:res.obj}});
                        }else {
                            alert(res.msg)
                        }
                    })
                }).catch(() => {
                    console.log("2");
                });
            },
            open() {
                MessageBox.confirm('浙江大学附属第二医院   呼吸内科   ***介入手术2017-04-24    上午', '是否确认预约？', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    closeOnPressEscape:true,
                    type: 'warning'
                }).then(() => {
                    let _this=this;
                    _this.$router.push("/main/commonBox");
                }).catch(() => {
                    console.log("2");
                });
            },
            goBack(){
                let _this=this;
                _this.$router.go(-1);
            },
            SendAppoint:function(){
                console.log("141414");
                this.index++;
            },
            getHospital(){
                axiosUtil('smarthos.sxzz.hos.list',{
                    "qyid":"0",
                    "ywlx":"0"
                }).then(res=>{
                    console.log(res,9999)
                    if(res.succ){
                        this.$set(this.$data,'hospitalList',res.list)
                        console.log("000000",this.hospitalList);
                    }else {
                        alert(res.msg)
                    }
                })
            },
            selectHospital(id){
                console.log(id,565656);
                this.checkBig();
                this.getOffice(id)
            },
            getOffice(id){
                console.log("1212111");
                axiosUtil('smarthos.sxzz.dept.list',{
                    "yyid":id,
                }).then(res=>{
                    console.log(res,232323)
                    if(res.succ){
                        this.$set(this.$data,'officeList',res.list)
                    }else {
                        alert(res.msg)
                    }
                })
            },

        }
    }
</script>
<template>
    <div>
        <el-form  ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <BaseMessage :index="index" @getDetail="getDetail"></BaseMessage>
            <div  class=" marginP remote-consultation-wrap content-bg-color">
                <div style="box-sizing:border-box;margin-top:10px;padding:0px 20px;width:100%;background: #F9F9F9;border:1px solid #E3E1E2;">
                    <p style="line-height: 40px;font-size: 14px;">预约信息</p>
                </div>
            <div class="base-appoint">
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
                    <span style="font-size: 14px;color: #48576a;">预约科室:</span>
                    <el-select v-model="somedata.office" filterable placeholder="请选择" style="height:24px;margin-left:5px;">
                        <el-option
                                v-for="item in officeList"
                                :key="item.ksid"
                                :label="item.ksmc"
                                :value="item.ksid"
                        >
                        </el-option>
                    </el-select>
                    <span style="font-size: 14px;color: #48576a;">病情等级:</span>
                    <el-select v-model="bqdj" filterable placeholder="请选择" style="height:24px;margin-left:5px;">
                        <el-option label="一般" value="0"></el-option>
                        <el-option label="急" value="1"></el-option>
                        <el-option label="危重" value="2"></el-option>
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
                pickerOptions0: {
                    disabledDate(time) {
                        return time.getTime() < Date.now() - 8.64e7;
                    }},
                index:0,
                somedata:{
                    hospital:'',
                    office:'',
                    state:'',
                    date:'',
                },
                hospitalList:[],
                officeList:[],
                tjbz: '',
                bqdj: '',
                sqyyrq: '',
                sqyylx: '',
                tjrq: '',
                sex:'',
                value5:'',
                zyzzList:''
            }
        },
        components:{
            BaseMessage
        },
        mounted(){
            this.getHospital()
        },
        methods: {
            getDetail(dataForm){
                console.log(dataForm,2222);
                var _this = this;
                function checkAdult(hos) {
                    return hos.yyid== _this.somedata.hospital
                }
                function checkAdults(hos) {
                    return hos.ksid== _this.somedata.office;
                }
                this.sqyyrq?this.sqyyrq=formatUnixTime(this.sqyyrq).substring(0,10):this.sqyyrq="";
                this.tjrq?this.tjrq=formatUnixTime(this.tjrq).substring(0,10):this.tjrq="";
              var hosObj = this.hospitalList.filter(checkAdult);
                var yymc=hosObj[0].yymc;
              var offObj = this.officeList.filter(checkAdults);
                var ksmc=offObj[0].ksmc;
                console.log("11111111",offObj[0].ksmc)
                let options={
                    yhid:dataForm.yhid,
                    "yyr": "595d05b0f19b9c898a58cc70",
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
                    qrksmc:ksmc,
                    zdjg:dataForm.zdjg,
                    bqms:dataForm.bqms,
                    wjidList:dataForm.wjidList,
                    yyid:this.somedata.hospital,
                    ksid:this.somedata.office,
                    bqdj:this.bqdj,
                    sqyyrq:this.sqyyrq,
                    sqyylx:this.sqyylx,
                    tjbz:this.tjbz,
                    tjrq:this.tjrq,
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
                    axiosUtil('smarthos.sxzz.zyzzsq.info',options,{
                    }).then(res=>{
                        console.log(res,9999)
                        if(res.succ){
                            console.log("999999",res);
                            _this.$router.push({path:"/main/remotebox",name:"remotebox",params:{zyzzList:res.obj}});
                        }else {
                            alert(res.msg)
                        }
                    })
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
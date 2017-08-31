<template>
    <div>
        <div class="commonbox-box">
            <p style="text-align: center;"><svg class="icon success">
                <use xlink:href="#icon-zhengque"></use>
            </svg>
            </p>
            <h1 v-show="zyzzList.zzzt==1||zyzzList.zzzt==2">{{zyzzList.zzzt==1?'成功':'失败'}}</h1>
            <h1 v-show="zyzzList.zzzt==3||zyzzList.zzzt==0">{{zyzzList.zzzt==3?'已取消':'待审核'}}</h1>
            <p style="text-align: center;">西湖区西溪街道社区卫生服务中心转诊单</p>

            <div class="commonbox-con">
                <div class="commonbox-news">
                    <div><span>预约号码:</span><span> &nbsp&nbsp{{zyzzList.yyh}}</span></div>
                    <div><span>预约医院:</span><span> &nbsp&nbsp{{zyzzList.yymc}}</span></div>
                    <div><span>预约专家:</span><span> &nbsp&nbsp{{zyzzList.sqysxm}}</span></div>
                    <div><span>申请科室:</span><span> &nbsp&nbsp{{zyzzList.sqksmc}}</span></div>
                    <!--<div><span>门办电话:</span><span> &nbsp&nbsp0571-56005123</span></div>-->
                    <div style="margin-top:20px;"><span>患者姓名:</span><span> &nbsp&nbsp{{zyzzList.yhxm}}</span></div>
                    <div><span>身份证号:</span><span> &nbsp&nbsp{{zyzzList.zjhm}}</span></div>
                    <div><span>联系方式:</span><span> &nbsp&nbsp{{zyzzList.lxdh}}</span></div>
                </div>
                <div class="commonbox-news" style="margin-left:1%;">
                    <div><span>预约科室:</span><span> &nbsp&nbsp{{zyzzList.qrksmc}}</span></div>
                    <div><span>住院时间:</span><span> &nbsp&nbsp{{zyzzList.sqyyrq}}</span></div>
                    <div><span>申请医院:</span><span> &nbsp&nbsp{{zyzzList.sqyymc}}</span></div>
                    <div><span>申请人电话:</span><span> &nbsp&nbsp{{zyzzList.sqysdh}}</span></div>
                    <!--<div><span>门办地址:</span><span> &nbsp&nbsp门诊大楼二楼医患沟通中心</span></div>-->
                    <div style="margin-top:20px;"><span>患者性别:</span><span> &nbsp&nbsp{{zyzzList.xb}}</span></div>
                    <div><span>患者年龄:</span><span> &nbsp&nbsp{{zyzzList.age}}</span></div>
                    <div><span>联系地址:</span><span> &nbsp&nbsp{{zyzzList.lxdz}}</span></div>
                </div>
            </div>
            <div class="commonbox-btn">
                <el-button class="btn commonboxbtn" type="text" style="padding:5px 20px;">打印</el-button>
                <el-button class="btn commonboxbtn" type="text" style="padding:5px 20px;" @click="open">关闭</el-button>
            </div>
        </div>
    </div>
</template>
<style>

</style>
<script>
    import { formatUnixTime } from "../../utils/DateFormat.js";
    import { getLodop } from "../../utils/LodopFuncs";
    import { MessageBox } from "element-ui";
    export default{
        data(){
            return {
                zyzzList:{}
            }
        },
        mounted:function(){
            console.log(this.$route.params.zyzzList,66666)
            return this.zyzzList=this.$route.params.zyzzList;

        },
        methods:{
            open(){
                let _this=this;
                _this.$router.go(-1);
            }
        }
    }
</script>
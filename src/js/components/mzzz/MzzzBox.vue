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
                    <div><span>预约号码:</span><span> {{zyzzList.yyh}}</span></div>
                    <div><span>预约医院:</span><span> {{zyzzList.yymc}}</span></div>
                    <div><span>预约专家:</span><span> {{zyzzList.sqysxm}}</span></div>
                    <div><span>就诊序号:</span><span> {{zyzzList.yyxh}}</span></div>
                    <div><span>申请科室:</span><span> {{zyzzList.sqksmc}}</span></div>
                    <!--<div><span>门办电话:</span><span> {{zyzzList.qryymc}}</span></div>-->
                    <div><span>患者姓名:</span><span> {{zyzzList.yhxm}}</span></div>
                    <div><span>身份证号:</span><span> {{zyzzList.zjhm}}</span></div>
                    <div><span>联系方式:</span><span> {{zyzzList.lxdh}}</span></div>
                </div>
                <div class="commonbox-news" style="margin-left:1%;">
                    <div><span>挂号费用:</span><span> {{zyzzList.zlf}}</span></div>
                    <div><span>预约科室:</span><span> {{zyzzList.qrksmc}}</span></div>
                    <div><span>就诊时间:</span><span> {{zyzzList.yyrq}}</span></div>
                    <div><span>申请医院:</span><span> {{zyzzList.sqyymc}}</span></div>
                    <div><span>申请人电话:</span><span> {{zyzzList.sjhm}}</span></div>
                    <!--<div><span>门办地址:</span><span> {{zyzzList.lxdz}}</span></div>-->
                    <div><span>患者性别:</span><span> {{zyzzList.xb}}</span></div>
                    <div><span>患者年龄:</span><span> {{zyzzList.age}}</span></div>
                    <div><span>联系地址:</span><span> {{zyzzList.lxdz}}</span></div>
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
                zyzzList:[]
            }
        },
        mounted:function(){
            this.zyzzList=this.$route.params.zyzzList;
            console.log("zzzzzz",this.zyzzList);
        },
        methods:{
            open(){
                let _this=this;
                _this.$router.go(-1);
            }
        }
    }
</script>
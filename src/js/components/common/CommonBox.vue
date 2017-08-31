<template>
    <div>
        <div class="commonbox-box">
            <p style="text-align: center;"><svg class="icon success">
                <use xlink:href="#icon-zhengque"></use>
            </svg>
            </p>
            <h1>预约成功</h1>
            <p style="text-align: center;">西湖区西溪街道社区卫生服务中心转诊单</p>
            <div class="commonbox-card">
                <img src="" alt="">
            </div>
            <div class="commonbox-con">
                 <div class="commonbox-news">
                       <div><span>预约号码:</span><span> 2</span></div>
                       <div><span>预约医院:</span><span> 2</span></div>
                       <div><span>预约专家:</span><span> 2</span></div>
                       <div><span>就诊序号:</span><span> 2</span></div>
                       <div><span>申请科室:</span><span> 2</span></div>
                       <div><span>门办电话:</span><span> 2</span></div>
                       <div><span>患者姓名:</span><span> 2</span></div>
                       <div><span>身份证号:</span><span> 2</span></div>
                       <div><span>联系方式:</span><span> 2</span></div>
                 </div>
                 <div class="commonbox-news" style="margin-left:1%;">
                      <div><span>挂号费用:</span><span> 2</span></div>
                      <div><span>预约科室:</span><span> 2</span></div>
                      <div><span>就诊时间:</span><span> 2</span></div>
                      <div><span>申请医院:</span><span> 2</span></div>
                      <div><span>申请人电话:</span><span> 2</span></div>
                      <div><span>门办地址:</span><span> 2</span></div>
                      <div><span>患者性别:</span><span> 2</span></div>
                      <div><span>患者年龄:</span><span> 2</span></div>
                      <div><span>联系地址:</span><span> 2</span></div>
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
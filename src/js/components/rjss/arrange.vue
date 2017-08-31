<template>
<div>
    <div class="deal-content marginP remote-consultation-wrap content-bg-color">
    <AllHeader @getSelect="getSelect"></AllHeader>
    <div class="Header-add" v-show="shzt=='0'">
        <el-button class="btn" type="primary" @click="arranges"><svg class="icon">
            <use xlink:href="#icon-xinzeng"></use>
            </svg> 新增日间手术转诊</el-button>
    </div>
    <div class="arrange-tab">
        <el-tabs v-show="shzt=='0'" v-model="activeName" @tab-click="changeTab">
            <el-tab-pane label="我发起的" name="4"></el-tab-pane>
            <el-tab-pane label="已取消的" name="5"></el-tab-pane>
        </el-tabs>
        <el-tabs v-show="shzt=='1'||shzt=='2'" v-model="activeName" @tab-click="changeTab">
            <el-tab-pane label="待审核" name="0"></el-tab-pane>
            <el-tab-pane label="已审核" name="1"></el-tab-pane>
            <el-tab-pane label="转入" name="2"></el-tab-pane>
            <el-tab-pane label="转出" name="3"></el-tab-pane>
        </el-tabs>
    </div>
    <div v-show="activeName=='4'" class="arrange-table" >
        <el-table
                :data="tableData"
                stripe
                height="400"
                style="width:100%;">
            <el-table-column
                    prop="date"
                    label="操作"

                    width="200">
                <template scope="scope">
                    <el-button
                            size="small"
                            @click="goTransferBill(scope.$index, scope.row)">转诊单</el-button>
                    <el-button
                            size="small"
                            @click="handleEdit(scope.$index, scope.row)">
                        <div v-show="scope.row.zzzt=='1'||scope.row.zzzt=='2'">
                            {{scope.row.zzzt=='1'?'确认单':'重新预约'}}
                        </div>
                        <div v-show="scope.row.zzzt=='0'">
                           撤销
                        </div>
                    </el-button>
                    <el-button
                            size="small"
                            @click="examineBill(scope.$index, scope.row)">查看</el-button>
                </template>
            </el-table-column>
            <el-table-column
                    prop="zzzt"
                    label="预约状态">
                <template scope="scope">
                    <div v-show="scope.row.zzzt=='0'">待审核</div>
                    <div v-show="scope.row.zzzt=='1'||scope.row.zzzt=='2'">{{scope.row.zzzt=='1'?'成功':'失败'}}</div>
                </template>
            </el-table-column>
            <el-table-column
                    prop="yyh"
                    label="预约号">
            </el-table-column>
            <el-table-column
                    prop="sqsj"
                    label="转诊日期">
            </el-table-column>
            <el-table-column
                    width="10px"
            >
            </el-table-column>

            <el-table-column
                    prop="sqyyrq"
                    label="期望手术日期">
            </el-table-column>
            <el-table-column
                    prop="djrq"
                    label="接受最晚时间">
            </el-table-column>

            <el-table-column
                    prop="yhxm"
                    label="姓名">
            </el-table-column>
            <el-table-column
                    prop="xb"
                    label="性别">
            </el-table-column>
            <el-table-column
                    prop="age"
                    label="年龄">
            </el-table-column>
            <el-table-column
                    prop="lxdh"
                    label="联系方式">
            </el-table-column>
            <el-table-column
                    prop="zjhm"
                    label="身份证号">
            </el-table-column>
            <el-table-column
                    prop="sqyymc"
                    label="申请医院">
            </el-table-column>
            <el-table-column
                    prop="sqksmc"
                    label="申请科室">
            </el-table-column>
            <el-table-column
                    prop="sqysxm"
                    label="申请医生">
            </el-table-column>
            <el-table-column
                    prop="yymc"
                    label="预约医院">
            </el-table-column>
            <el-table-column
                    width="10px"
            >
            </el-table-column>
            <el-table-column
                    prop="qrksmc"
                    label="预约科室">
            </el-table-column>
            <el-table-column
                    prop="ssmc"
                    label="手术名称">
            </el-table-column>
        </el-table>
    </div>
    <div v-show="activeName=='5'" class="arrange-table" >
        <el-table
                :data="tableData"
                stripe
                height="400"
                style="width:100%;">
            <el-table-column
                    prop="date"
                    label="操作"
                    width="150">
                <template scope="scope">
                    <el-button
                            size="small"
                            @click="goTransferBill(scope.$index, scope.row)">转诊单</el-button>
                    <el-button
                            size="small"
                            @click="examineBill(scope.$index, scope.row)">查看</el-button>
                </template>
            </el-table-column>
            <el-table-column
                    prop="zzzt"
                    label="预约状态">
                <template scope="scope">
                    <div v-show="scope.row.zzzt=='3'">取消</div>
                </template>
            </el-table-column>
            <el-table-column
                    prop="yyh"
                    label="预约号">
            </el-table-column>
            <el-table-column
                    prop="sqsj"
                    label="转诊日期">
            </el-table-column>
            <el-table-column
                    width="10px"
            >
            </el-table-column>

            <el-table-column
                    prop="sqyyrq"
                    label="期望手术日期">
            </el-table-column>
            <el-table-column
                    prop="djrq"
                    label="接受最晚时间">
            </el-table-column>

            <el-table-column
                    prop="yhxm"
                    label="姓名">
            </el-table-column>
            <el-table-column
                    prop="xb"
                    label="性别">
            </el-table-column>
            <el-table-column
                    prop="age"
                    label="年龄">
            </el-table-column>
            <el-table-column
                    prop="lxdh"
                    label="联系方式">
            </el-table-column>
            <el-table-column
                    prop="zjhm"
                    label="身份证号">
            </el-table-column>
            <el-table-column
                    prop="sqyymc"
                    label="申请医院">
            </el-table-column>
            <el-table-column
                    prop="sqksmc"
                    label="申请科室">
            </el-table-column>
            <el-table-column
                    prop="sqysxm"
                    label="申请医生">
            </el-table-column>
            <el-table-column
                    prop="yymc"
                    label="预约医院">
            </el-table-column>
            <el-table-column
                    width="10px"
            >
            </el-table-column>
            <el-table-column
                    prop="qrksmc"
                    label="预约科室">
            </el-table-column>
            <el-table-column
                    prop="ssmc"
                    label="手术名称">
            </el-table-column>
        </el-table>
    </div>
    <div v-show="activeName==0&&shzt=='1'" class="arrange-table" >
        <el-table
                :data="tableData"
                stripe
                height="400"
                style="width:100%;">
            <el-table-column
                    prop="date"
                    label="操作"
                    width="200">
                <template scope="scope">
                    <el-button
                            size="small"
                            @click="goTransferBill(scope.$index, scope.row)">转诊单</el-button>
                    <el-button
                            size="small"
                            @click="audit(scope.$index, scope.row)">审核</el-button>
                    <el-button
                            size="small"
                            @click="examineBill(scope.$index, scope.row)">查看</el-button>
                </template>
            </el-table-column>
            <el-table-column
                    prop="zzzt"
                    label="预约状态">
                <template scope="scope">
                    <div>待审核</div>
                </template>
            </el-table-column>
            <el-table-column
                    prop="yyh"
                    label="预约号">
            </el-table-column>
            <el-table-column
                    prop="sqsj"
                    label="转诊日期">
            </el-table-column>
            <el-table-column
                    width="10px"
            >
            </el-table-column>

            <el-table-column
                    prop="sqyyrq"
                    label="期望手术日期">
            </el-table-column>
            <el-table-column
                    prop="djrq"
                    label="接受最晚时间">
            </el-table-column>

            <el-table-column
                    prop="yhxm"
                    label="姓名">
            </el-table-column>
            <el-table-column
                    prop="xb"
                    label="性别">
            </el-table-column>
            <el-table-column
                    prop="age"
                    label="年龄">
            </el-table-column>
            <el-table-column
                    prop="lxdh"
                    label="联系方式">
            </el-table-column>
            <el-table-column
                    prop="zjhm"
                    label="身份证号">
            </el-table-column>
            <el-table-column
                    prop="sqyymc"
                    label="申请医院">
            </el-table-column>
            <el-table-column
                    prop="sqksmc"
                    label="申请科室">
            </el-table-column>
            <el-table-column
                    prop="sqysxm"
                    label="申请医生">
            </el-table-column>
            <el-table-column
                    prop="yymc"
                    label="预约医院">
            </el-table-column>
            <el-table-column
                    width="10px"
            >
            </el-table-column>
            <el-table-column
                    prop="qrksmc"
                    label="预约科室">
            </el-table-column>
            <el-table-column
                    prop="ssmc"
                    label="手术名称">
            </el-table-column>
        </el-table>
    </div>
    <div v-show="activeName==1&&shzt=='1'" class="arrange-table" >
        <el-table
                :data="tableData"
                stripe
                height="400"
                style="width:100%;">
            <el-table-column
                    prop="date"
                    label="操作"
                    width="200">
                <template scope="scope">
                    <el-button
                            size="small"
                            @click="goTransferBill(scope.$index, scope.row)">转诊单</el-button>
                    <el-button
                            v-show="scope.row.zzzt=='1'"
                            size="small"
                            @click="handleEdit(scope.$index, scope.row)">确认单</el-button>
                    <el-button
                            size="small"
                            @click="examineBill(scope.$index, scope.row)">查看</el-button>
                </template>
            </el-table-column>
            <el-table-column
                    prop="zzzt"
                    label="预约状态">
                <template scope="scope">
                    <div>{{scope.row.zzzt=='1'?'成功':'失败'}}</div>
                </template>
            </el-table-column>
            <el-table-column
                    prop="yyh"
                    label="预约号">
            </el-table-column>
            <el-table-column
                    prop="sqsj"
                    label="转诊日期">
            </el-table-column>
            <el-table-column
                    width="10px"
            >
            </el-table-column>

            <el-table-column
                    prop="sqyyrq"
                    label="期望手术日期">
            </el-table-column>
            <el-table-column
                    prop="djrq"
                    label="接受最晚时间">
            </el-table-column>

            <el-table-column
                    prop="yhxm"
                    label="姓名">
            </el-table-column>
            <el-table-column
                    prop="xb"
                    label="性别">
            </el-table-column>
            <el-table-column
                    prop="age"
                    label="年龄">
            </el-table-column>
            <el-table-column
                    prop="lxdh"
                    label="联系方式">
            </el-table-column>
            <el-table-column
                    prop="zjhm"
                    label="身份证号">
            </el-table-column>
            <el-table-column
                    prop="sqyymc"
                    label="申请医院">
            </el-table-column>
            <el-table-column
                    prop="sqksmc"
                    label="申请科室">
            </el-table-column>
            <el-table-column
                    prop="sqysxm"
                    label="申请医生">
            </el-table-column>
            <el-table-column
                    prop="yymc"
                    label="预约医院">
            </el-table-column>
            <el-table-column
                    width="10px"
            >
            </el-table-column>
            <el-table-column
                    prop="qrksmc"
                    label="预约科室">
            </el-table-column>
            <el-table-column
                    prop="ssmc"
                    label="手术名称">
            </el-table-column>
        </el-table>
    </div>
    <div v-show="activeName==2&&shzt=='1'" class="arrange-table" >
        <el-table
                :data="tableData"
                stripe
                height="400"
                style="width:100%;">
            <el-table-column
                    prop="date"
                    label="操作"
                    width="150">
                <template scope="scope">
                    <el-button
                            size="small"
                            @click="goTransferBill(scope.$index, scope.row)">转诊单</el-button>
                    <el-button
                            size="small"
                            @click="examineBill(scope.$index, scope.row)">查看</el-button>
                </template>
            </el-table-column>
            <el-table-column
                    prop="zzzt"
                    label="预约状态">
                <template scope="scope">
                    <div>{{scope.row.zzzt=='1'?'成功':'失败'}}</div>
                </template>
            </el-table-column>
            <el-table-column
                    prop="yyh"
                    label="预约号">
            </el-table-column>
            <el-table-column
                    prop="sqsj"
                    label="转诊日期">
            </el-table-column>
            <el-table-column
                    width="10px"
            >
            </el-table-column>

            <el-table-column
                    prop="sqyyrq"
                    label="期望手术日期">
            </el-table-column>
            <el-table-column
                    prop="djrq"
                    label="接受最晚时间">
            </el-table-column>

            <el-table-column
                    prop="yhxm"
                    label="姓名">
            </el-table-column>
            <el-table-column
                    prop="xb"
                    label="性别">
            </el-table-column>
            <el-table-column
                    prop="age"
                    label="年龄">
            </el-table-column>
            <el-table-column
                    prop="lxdh"
                    label="联系方式">
            </el-table-column>
            <el-table-column
                    prop="zjhm"
                    label="身份证号">
            </el-table-column>
            <el-table-column
                    prop="sqyymc"
                    label="申请医院">
            </el-table-column>
            <el-table-column
                    prop="sqksmc"
                    label="申请科室">
            </el-table-column>
            <el-table-column
                    prop="sqysxm"
                    label="申请医生">
            </el-table-column>
            <el-table-column
                    prop="yymc"
                    label="预约医院">
            </el-table-column>
            <el-table-column
                    width="10px"
            >
            </el-table-column>
            <el-table-column
                    prop="qrksmc"
                    label="预约科室">
            </el-table-column>
            <el-table-column
                    prop="ssmc"
                    label="手术名称">
            </el-table-column>
        </el-table>
    </div>
    <div v-show="activeName==3&&shzt=='1'" class="arrange-table" >
        <el-table
                :data="tableData"
                stripe
                height="400"
                style="width:100%;">
            <el-table-column
                    prop="date"
                    label="操作"
                    width="150">
                <template scope="scope">
                    <el-button
                            size="small"
                            @click="goTransferBill(scope.$index, scope.row)">转诊单</el-button>
                    <el-button
                            size="small"
                            @click="examineBill(scope.$index, scope.row)">查看</el-button>
                </template>
            </el-table-column>
            <el-table-column
                    prop="zzzt"
                    label="预约状态">
                <template scope="scope">
                    <div>{{scope.row.zzzt=='1'?'成功':'失败'}}</div>
                </template>
            </el-table-column>
            <el-table-column
                    prop="yyh"
                    label="预约号">
            </el-table-column>
            <el-table-column
                    prop="sqsj"
                    label="转诊日期">
            </el-table-column>
            <el-table-column
                    width="10px"
            >
            </el-table-column>

            <el-table-column
                    prop="sqyyrq"
                    label="期望手术日期">
            </el-table-column>
            <el-table-column
                    prop="djrq"
                    label="接受最晚时间">
            </el-table-column>

            <el-table-column
                    prop="yhxm"
                    label="姓名">
            </el-table-column>
            <el-table-column
                    prop="xb"
                    label="性别">
            </el-table-column>
            <el-table-column
                    prop="age"
                    label="年龄">
            </el-table-column>
            <el-table-column
                    prop="lxdh"
                    label="联系方式">
            </el-table-column>
            <el-table-column
                    prop="zjhm"
                    label="身份证号">
            </el-table-column>
            <el-table-column
                    prop="sqyymc"
                    label="申请医院">
            </el-table-column>
            <el-table-column
                    prop="sqksmc"
                    label="申请科室">
            </el-table-column>
            <el-table-column
                    prop="sqysxm"
                    label="申请医生">
            </el-table-column>
            <el-table-column
                    prop="yymc"
                    label="预约医院">
            </el-table-column>
            <el-table-column
                    width="10px"
            >
            </el-table-column>
            <el-table-column
                    prop="qrksmc"
                    label="预约科室">
            </el-table-column>
            <el-table-column
                    prop="ssmc"
                    label="手术名称">
            </el-table-column>
        </el-table>
    </div>
    <FooterCmp :propsTotalCols="propsTotalCols"  @changePage="changePage1" :clientH="clientH" :propsPageSize="7"/>
    </div>
</div>
</template>
<style>

</style>
<script type="text/ecmascript-6">
    import Vue from "vue";
    import AllHeader from "../common/AllHeader.vue";
    import { Badge, Button,Input,Tabs,TabPane, Loading, Message} from "element-ui";
    import allOrder from "../common/allOrderTable.vue";
    import axiosUtil from "../../utils/AxiosUtils.js";
    import FooterCmp from "../common/FooterCmp.vue";

    Vue.use(Tabs);
    Vue.use(TabPane);
    export default{
        data (){
            return{
                shzt:JSON.parse(localStorage.getItem('shzt')),
                docObj:JSON.parse(localStorage.getItem('docObj')),
                activeName:"",
                tableData: [],
                propsTotalCols:0,
                type:""
            }
        },
        components:{
           AllHeader,
            FooterCmp
        },
        mounted(){
            this.activeName = this.shzt==0?"4":"0";
            this.type = this.shzt=='0'?'4':'0';
            this.getData(1,this.type)
        },
        methods:{
            //筛选
            getSelect(val){
                console.log(val,1414141414);
                this.$set(this.$data,'selectObj',val);
                this.getData(1,this.type,val)
            },
            //审核
            audit(index,row){
                //手工模式
                axiosUtil('smarthos.sxzz.byddid.list',{
                    "jgid": "59411511191ce23575a63218",
                    "yyr": "595d05b0f19b9c898a58cc70",
                    "ywlx": "3",
                    "ddid":row.ddid,
                }).then(res=>{
                    console.log(res,'住院审核')
                    this.$router.push({
                        name:"rjExamineBill",
                        params:{
                            applyDetail:res.obj
                        }
                    })
                });
            },
            goTransferBill(index,row){
                //转诊单
                axiosUtil('smarthos.sxzz.byddid.list',{
                    "jgid": "59411511191ce23575a63218",
                    "yyr": "595d05b0f19b9c898a58cc70",
                    "ywlx": "3",
                    "ddid":row.ddid,
                }).then(res=>{
                    console.log(res,7777)
                    this.$router.push({
                        name:"arrangebox",
                        params:{
                            zyzzList:res.obj
                        }
                    })
                });
            },
            handleEdit(index,row){
                console.log(row.zzzt,'改约111')
                this.$set(this.$data,'ddid',row.ddid);
                if(row.zzzt==0){
                    //取消转诊
                    axiosUtil('smarthos.sxzz.qxzzsq.info',{
                        "jgid": "59411511191ce23575a63218",
                        "yyr": "595d05b0f19b9c898a58cc70",
                        "ysmc":"陈升华",
                        "ddid":row.ddid,
                    }).then(res=>{
                        console.log(res,55555);
                        if(res.succ){
                            alert('撤销成功');
                            this.getData(1,this.type);
                        }else {
                            alert(res.msg)
                        }
                    });
                }else if(row.zzzt==2){
                    //重新预约
                    console.log('改约')
                    axiosUtil('smarthos.sxzz.byddid.list',{
                        "jgid": "59411511191ce23575a63218",
                        "yyr": "595d05b0f19b9c898a58cc70",
                        "ywlx": "3",
                        "ddid":row.ddid,
                    }).then(res=>{
                        console.log(res,66666)
                        this.$router.push({
                            name:"rjChange",
                            params:{
                                applyDetail:res.obj
                            }
                        })
                    });
                }else {
                    //确认单
                    axiosUtil('smarthos.sxzz.byddid.list',{
                        "jgid": "59411511191ce23575a63218",
                        "yyr": "595d05b0f19b9c898a58cc70",
                        "ywlx": "3",
                        "ddid":row.ddid,
                    }).then(res=>{
                        console.log(res,66666)
                        this.$router.push({
                            name:"confrimBill",
                            params:{
                                zyzzList:res.obj,

                            }
                        })
                    });
                }
            },
            examineBill(index,row){
                //查看
                axiosUtil('smarthos.sxzz.byddid.list',{
                    "jgid": "59411511191ce23575a63218",
                    "yyr": "595d05b0f19b9c898a58cc70",
                    "ywlx": "3",
                    "ddid":row.ddid,
                }).then(res=>{
                    console.log(res,66666)
                    this.$router.push({
                        name:"examineBill",
                        params:{
                            applyDetail:res.obj,
                            type:'1'

                        }
                    })
                });
            },
            arranges:function(){
                this.$router.push("arrange/newsTransfer");
            },
            changeTab(val){
                console.log(val.name,6666);
                this.type=val.name?val.name:4;
                this.getData(1,this.type)
            },
            getData(pageNum,type,selectObj){
                let _this=this;
                axiosUtil('smarthos.sxzz.order.list',{
                        ...selectObj,
                    "jgid": "59411511191ce23575a63218",
                    "yyid": "59411511191ce23575a63218",
                    "yyr": "595d05b0f19b9c898a58cc70",
                    "ywlx": "3",
                    "czlx": type,
                    "pageNum":pageNum,
                    "pageSize":"7"
                }).then(res=>{
                    console.log(res,33333);
                if(res.succ){
                    _this.propsTotalCols=res.page.total;
                    this.$set(this.$data,'tableData',res.list)
                }else {
                    alert(res.msg)
                }
            })
            },
            changePage1(pageNum){
                this.getData(pageNum,this.type);
            }
        }
    }
</script>
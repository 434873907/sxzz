<template>
    <div>
        <div class="deal-content marginP remote-consultation-wrap content-bg-color">
        <!--时间选择-->
        <div class="date-boxs">
            <div class="date-box" style="width:180px;">
            <div class="block" >
                <span class="demonstration">转诊模式:</span>
                <el-select v-model="out" placeholder="请选择" style="width:110px;">
                <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                </el-option>
            </el-select>
            </div>
        </div>
            <div class="date-box">
            <div class="block">
                <span class="demonstration">转诊时间:</span>
                <el-date-picker
                        v-model="value6"
                        style="width:210px;"
                        type="daterange"
                        placeholder="选择日期范围">
                </el-date-picker>
            </div>
        </div>


            <div class="date-box" style="width:150px;">
                <el-select v-model="value2"  placeholder="请选择预约医院" style="width:150px;" @change="selectHospital">

                    <el-option
                            v-for="item in hospitalList"
                            :key="item.yyid"
                            :label="item.yymc"
                            :value="item.yyid"
                            >
                    </el-option>
                </el-select>
            </div>

            <div v-show="(activeName=='2'||activeName=='5')" class="date-box" style="width:150px;">

                <el-select v-model="value3" placeholder="请选择预约科室" style="width:100%;">
                    <el-option
                            v-for="item in officeList"
                            :key="item.ksid"
                            :label="item.ksmc"
                            :value="item.ksid">
                    </el-option>
                </el-select>
            </div>
            <div class="date-box">
                <el-button size="small">查询</el-button>
            </div>
            <div class="date-box">
                <el-button class="btn" size="small" type="primary">导出excel</el-button>
            </div>
        </div>
        <div v-if="this.date.length!='0'"  class="hosptial-table">
                <el-tabs v-show="out==1" v-model="activeName"  @tab-click="handleClick" style="background: #E6E6E6;">
                    <el-tab-pane label="按医院" name="1"> </el-tab-pane>
                    <el-tab-pane label="按科室" name="2"> </el-tab-pane>
                    <el-tab-pane label="按业务" name="3"> </el-tab-pane>
                </el-tabs>
                <el-tabs v-show="out==2" v-model="activeName"   style="background: #E6E6E6;" @tab-click="handleClick">
                    <el-tab-pane label="按医院" name="4"> </el-tab-pane>
                    <el-tab-pane label="按科室" name="5"> </el-tab-pane>
                    <el-tab-pane label="按业务" name="6"> </el-tab-pane>
                </el-tabs>
                <!--表格-->
                <el-table v-show="activeName==1"
                        :data="list"
                          height="400"
                        style="width: 100%">
                    <el-table-column
                            prop="date"
                            label="序号"
                            width="50">
                    </el-table-column>
                    <el-table-column
                            prop="yymc"
                            label="医院名称"
                            width="100">
                    </el-table-column>
                    <el-table-column
                            prop="one"
                            :label="date[0].ywrq">
                    </el-table-column>
                    <el-table-column
                            prop="two"
                            :label="date[1].ywrq">
                    </el-table-column>
                    <el-table-column
                            prop="three"
                            :label="date[2].ywrq">
                    </el-table-column>
                    <el-table-column
                            prop="four"
                            :label="date[3].ywrq">
                    </el-table-column>
                    <el-table-column
                        prop="five"
                        :label="date[4].ywrq">
                     </el-table-column>
                    <el-table-column
                            prop="six"
                            :label="date[5].ywrq">
                    </el-table-column>
                    <el-table-column
                            prop="seven"
                            :label="date[6].ywrq">
                    </el-table-column>
                    <el-table-column
                            prop="eight"
                            :label="date[7].ywrq">
                    </el-table-column>
                    <el-table-column
                            prop="nine"
                            :label="date[8].ywrq">
                    </el-table-column>
                    <el-table-column
                            prop="ten"
                            :label="date[9].ywrq">
                    </el-table-column>
                    <el-table-column
                            prop="eleven"
                            :label="date[10].ywrq">
                    </el-table-column>
                    <el-table-column
                            prop="twelve"
                            :label="date[11].ywrq">
                    </el-table-column>
                    <el-table-column
                            prop="total"
                            label="全年">
                    </el-table-column>
                </el-table>
                <el-table v-show="activeName==4"
                        :data="list"
                          height="400"
                        style="width: 100%">
                    <el-table-column
                            prop="date"
                            label="序号"
                            width="50">
                    </el-table-column>
                    <el-table-column
                            prop="yymc"
                            label="医院名称"
                            width="100">
                    </el-table-column>
                    <el-table-column
                            prop="one"
                            :label="date[0].ywrq">
                    </el-table-column>
                    <el-table-column
                            prop="two"
                            :label="date[1].ywrq">
                    </el-table-column>
                    <el-table-column
                            prop="three"
                            :label="date[2].ywrq">
                    </el-table-column>
                    <el-table-column
                            prop="four"
                            :label="date[3].ywrq">
                    </el-table-column>
                    <el-table-column
                        prop="five"
                        :label="date[4].ywrq">
                     </el-table-column>
                    <el-table-column
                            prop="six"
                            :label="date[5].ywrq">
                    </el-table-column>
                    <el-table-column
                            prop="seven"
                            :label="date[6].ywrq">
                    </el-table-column>
                    <el-table-column
                            prop="eight"
                            :label="date[7].ywrq">
                    </el-table-column>
                    <el-table-column
                            prop="nine"
                            :label="date[8].ywrq">
                    </el-table-column>
                    <el-table-column
                            prop="ten"
                            :label="date[9].ywrq">
                    </el-table-column>
                    <el-table-column
                            prop="eleven"
                            :label="date[10].ywrq">
                    </el-table-column>
                    <el-table-column
                            prop="twelve"
                            :label="date[11].ywrq">
                    </el-table-column>
                    <el-table-column
                            prop="total"
                            label="全年">
                    </el-table-column>
                </el-table>
                <el-table v-show="activeName==2"
                        :data="list1"
                          height="400"
                        style="width: 100%">
                    <el-table-column
                            prop="date"
                            label="序号"
                            width="50">
                    </el-table-column>
                    <el-table-column
                            prop="yymc"
                            label="医院名称"
                            width="100">
                    </el-table-column>
                    <el-table-column
                            prop="ksmc"
                            label="科室名称"
                            width="100">
                    </el-table-column>
                    <el-table-column
                            prop="one"
                            :label="date[0].ywrq">
                    </el-table-column>
                    <el-table-column
                            prop="two"
                            :label="date[1].ywrq">
                    </el-table-column>
                    <el-table-column
                            prop="three"
                            :label="date[2].ywrq">
                    </el-table-column>
                    <el-table-column
                            prop="four"
                            :label="date[3].ywrq">
                    </el-table-column>
                    <el-table-column
                        prop="five"
                        :label="date[4].ywrq">
                     </el-table-column>
                    <el-table-column
                            prop="six"
                            :label="date[5].ywrq">
                    </el-table-column>
                    <el-table-column
                            prop="seven"
                            :label="date[6].ywrq">
                    </el-table-column>
                    <el-table-column
                            prop="eight"
                            :label="date[7].ywrq">
                    </el-table-column>
                    <el-table-column
                            prop="nine"
                            :label="date[8].ywrq">
                    </el-table-column>
                    <el-table-column
                            prop="ten"
                            :label="date[9].ywrq">
                    </el-table-column>
                    <el-table-column
                            prop="eleven"
                            :label="date[10].ywrq">
                    </el-table-column>
                    <el-table-column
                            prop="twelve"
                            :label="date[11].ywrq">
                    </el-table-column>
                    <el-table-column
                            prop="total"
                            label="全年">
                    </el-table-column>
                </el-table>
                <el-table v-show="activeName==5"
                        :data="list1"
                          height="400"
                        style="width: 100%">
                    <el-table-column
                            prop="date"
                            label="序号"
                            width="50">
                    </el-table-column>
                    <el-table-column
                            prop="yymc"
                            label="医院名称"
                            width="100">
                    </el-table-column>
                    <el-table-column
                            prop="ksmc"
                            label="科室名称"
                            width="100">
                    </el-table-column>
                    <el-table-column
                            prop="one"
                            :label="date[0].ywrq">
                    </el-table-column>
                    <el-table-column
                            prop="two"
                            :label="date[1].ywrq">
                    </el-table-column>
                    <el-table-column
                            prop="three"
                            :label="date[2].ywrq">
                    </el-table-column>
                    <el-table-column
                            prop="four"
                            :label="date[3].ywrq">
                    </el-table-column>
                    <el-table-column
                        prop="five"
                        :label="date[4].ywrq">
                     </el-table-column>
                    <el-table-column
                            prop="six"
                            :label="date[5].ywrq">
                    </el-table-column>
                    <el-table-column
                            prop="seven"
                            :label="date[6].ywrq">
                    </el-table-column>
                    <el-table-column
                            prop="eight"
                            :label="date[7].ywrq">
                    </el-table-column>
                    <el-table-column
                            prop="nine"
                            :label="date[8].ywrq">
                    </el-table-column>
                    <el-table-column
                            prop="ten"
                            :label="date[9].ywrq">
                    </el-table-column>
                    <el-table-column
                            prop="eleven"
                            :label="date[10].ywrq">
                    </el-table-column>
                    <el-table-column
                            prop="twelve"
                            :label="date[11].ywrq">
                    </el-table-column>
                    <el-table-column
                            prop="total"
                            label="全年">
                    </el-table-column>
                </el-table>
                <el-table v-show="activeName==3"
                        :data="list2"
                          height="400"
                        style="width: 100%">
                    <el-table-column
                            prop="date"
                            label="序号"
                            width="50">
                    </el-table-column>
                    <el-table-column
                            prop="yymc"
                            label="医院名称"
                            width="100">
                    </el-table-column>
                    <el-table-column
                            prop="ywlx"
                            label="业务类型"
                            width="100">
                        <template scope="scope">
                            <div v-show="scope.row.ywlx=='0'||scope.row.ywlx=='1'">{{scope.row.ywlx=='0'?'门诊':'检查'}}</div>
                            <div v-show="scope.row.ywlx=='2'||scope.row.ywlx=='3'">{{scope.row.ywlx=='2'?'住院':'手术'}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="one"
                            :label="date[0].ywrq">
                    </el-table-column>
                    <el-table-column
                            prop="two"
                            :label="date[1].ywrq">
                    </el-table-column>
                    <el-table-column
                            prop="three"
                            :label="date[2].ywrq">
                    </el-table-column>
                    <el-table-column
                            prop="four"
                            :label="date[3].ywrq">
                    </el-table-column>
                    <el-table-column
                        prop="five"
                        :label="date[4].ywrq">
                     </el-table-column>
                    <el-table-column
                            prop="six"
                            :label="date[5].ywrq">
                    </el-table-column>
                    <el-table-column
                            prop="seven"
                            :label="date[6].ywrq">
                    </el-table-column>
                    <el-table-column
                            prop="eight"
                            :label="date[7].ywrq">
                    </el-table-column>
                    <el-table-column
                            prop="nine"
                            :label="date[8].ywrq">
                    </el-table-column>
                    <el-table-column
                            prop="ten"
                            :label="date[9].ywrq">
                    </el-table-column>
                    <el-table-column
                            prop="eleven"
                            :label="date[10].ywrq">
                    </el-table-column>
                    <el-table-column
                            prop="twelve"
                            :label="date[11].ywrq">
                    </el-table-column>
                    <el-table-column
                            prop="total"
                            label="全年">
                    </el-table-column>
                </el-table>
                <el-table v-show="activeName==6"
                        :data="list2"
                          height="400"
                        style="width: 100%">
                    <el-table-column
                            prop="date"
                            label="序号"
                            width="50">
                    </el-table-column>
                    <el-table-column
                            prop="yymc"
                            label="医院名称"
                            width="100">
                    </el-table-column>
                    <el-table-column
                            prop="ywlx"
                            label="业务类型"
                            width="100">
                        <template scope="scope">
                            <div v-show="scope.row.ywlx=='0'||scope.row.ywlx=='1'">{{scope.row.ywlx=='0'?'门诊':'检查'}}</div>
                            <div v-show="scope.row.ywlx=='2'||scope.row.ywlx=='3'">{{scope.row.ywlx=='2'?'住院':'手术'}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="one"
                            :label="date[0].ywrq">
                    </el-table-column>
                    <el-table-column
                            prop="two"
                            :label="date[1].ywrq">
                    </el-table-column>
                    <el-table-column
                            prop="three"
                            :label="date[2].ywrq">
                    </el-table-column>
                    <el-table-column
                            prop="four"
                            :label="date[3].ywrq">
                    </el-table-column>
                    <el-table-column
                        prop="five"
                        :label="date[4].ywrq">
                     </el-table-column>
                    <el-table-column
                            prop="six"
                            :label="date[5].ywrq">
                    </el-table-column>
                    <el-table-column
                            prop="seven"
                            :label="date[6].ywrq">
                    </el-table-column>
                    <el-table-column
                            prop="eight"
                            :label="date[7].ywrq">
                    </el-table-column>
                    <el-table-column
                            prop="nine"
                            :label="date[8].ywrq">
                    </el-table-column>
                    <el-table-column
                            prop="ten"
                            :label="date[9].ywrq">
                    </el-table-column>
                    <el-table-column
                            prop="eleven"
                            :label="date[10].ywrq">
                    </el-table-column>
                    <el-table-column
                            prop="twelve"
                            :label="date[11].ywrq">
                    </el-table-column>
                    <el-table-column
                            prop="total"
                            label="全年">
                    </el-table-column>
                </el-table>
            </div>
        <div v-else style="margin: 50px 100px">
            暂无数据...
        </div>
        <!--<div id="mains">-->
        <!--</div>-->

        </div>

    </div>
</template>
<style scoped>
#mains{
    width: 30%;
    height: 200px;
}
</style>
<script type="text/ecmascript-6">
    import Vue from "vue";
    import axiosUtil from "../../utils/AxiosUtils.js"
    import echarts from 'echarts';
    export default {
        data() {
            return {
                list:[],
                date:[],
                hospitalList:[],
                officeList:[],
                out:'1',
                list1:[],
                list2:[],
                histogramList:[],
                histogramDate:[],
                options:[
                    {
                        label:'转入',
                        value:'1'
                    },{
                        label:'转出',
                        value:'2'
                    }
                ],
                options2: [],
                value2:'',
                value3:'',
                value6:'',
                activeName:'1',
                id:'595d05b0f19b9c898a58cc70'

            }
        },
        mounted(){
            this.getData();
            this.getHospital()
        },
        methods:{
            getHospital(){
                axiosUtil('smarthos.sxzz.hos.list',{
                    "qyid":"0",
                    "ywlx":"0"
                }).then(res=>{
                    console.log(res,9999)
                    if(res.succ){
                        this.$set(this.$data,'hospitalList',res.list)
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
            handleClick(value){
                console.log(value.name,2211111);
                if(value.name==1){
                    this.getData()
                }else if(value.name==2){
                    this.getList()
                }else if(value.name==3){
                    this.getArr()
                }else if(value.name==4){
                    this.getDatas()
                }else if(value.name==5){
                    this.getLists()
                }else if(value.name==6){
                    this.getArrs()
                }

            },
            getData(){
                axiosUtil('smarthos.sxzz.monthcount.list',{
                    "yyid": "11111",
                    "qrysbh": this.id?this.id:'595d05b0f19b9c898a58cc70',
                    "zzms":this.activeName?this.activeName:1
                }).then(res=>{
                    console.log(res,676767)
//                    this.$set(this.$data,'list',res.list);
                    var list = res.list;

                    var arr = [];
                    for(var i=0;i<list.length;i++){
                        var obj = {};
                        obj.date = i;
                        obj.yymc = list[i].yymc;
                        this.date = list[0].list;
                        let nodes=["one","two",'three','four','five','six','seven','eight','nine','ten','eleven','twelve']
                        for(var j=0;j<list[i].list.length;j++){
                            obj[nodes[j]] = list[i].list[j].count;
                        };
                        console.log(obj,2323232)
                        obj.total = parseInt(obj.two) + parseInt(obj.one)+parseInt(obj.three) +parseInt(obj.four) + parseInt(obj.five)+parseInt(obj.six) +parseInt(obj.seven) +parseInt(obj.eight) +parseInt(obj.nine) +parseInt(obj.ten) +parseInt(obj.eleven)+parseInt(obj.twelve)
                        arr.push(obj);
                        console.log(arr,77777)
                    }
                    this.list = arr;

                    console.log(this.date.length,'时间长度')

                })

            },
            getDatas(){
                axiosUtil('smarthos.sxzz.monthcount.list',{
                    "yyid": "11111",
                    "sqysbh": this.id?this.id:'595d05b0f19b9c898a58cc70',
                    "zzms":this.activeName?this.activeName:1
                }).then(res=>{
                    console.log(res,666666)
//                    this.$set(this.$data,'list',res.list);
                    var list = res.list;
                    var arr = [];
                    for(var i=0;i<list.length;i++){
                        var obj = {};
                        obj.date = i;
                        obj.yymc = list[i].yymc;
                        this.date = list[0].list;
                        let nodes=["one","two",'three','four','five','six','seven','eight','nine','ten','eleven','twelve']
                        for(var j=0;j<list[i].list.length;j++){
                            obj[nodes[j]] = list[i].list[j].count;
                        };
                        console.log(obj,2323232)
                        obj.total = parseInt(obj.two) + parseInt(obj.one)+parseInt(obj.three) +parseInt(obj.four) + parseInt(obj.five)+parseInt(obj.six) +parseInt(obj.seven) +parseInt(obj.eight) +parseInt(obj.nine) +parseInt(obj.ten) +parseInt(obj.eleven)+parseInt(obj.twelve)
                        arr.push(obj);
                        console.log(arr,77777)
                    }
                    this.list = arr;



                })

            },
            getList(){
                axiosUtil('smarthos.sxzz.monthcount.list',{
                    "yyid": "11111",
                    "qrysbh": this.value?this.value:'595d05b0f19b9c898a58cc70',
                    "zzms":this.activeName?this.activeName:1
                }).then(res=>{
                    console.log(res,666666)
//                    this.$set(this.$data,'list',res.list);
                    var list = res.list;
                    var arr = [];
                    for(var i=0;i<list.length;i++){
                        var obj = {};
                        obj.date = i;
                        obj.yymc = list[i].yymc;
                        obj.ksmc = list[i].ksmc;
                        this.date = list[0].list;
                        let nodes=["one","two",'three','four','five','six','seven','eight','nine','ten','eleven','twelve']
                        for(var j=0;j<list[i].list.length;j++){
                            obj[nodes[j]] = list[i].list[j].count;
                        };
                        console.log(obj,2323232)
                        obj.total = parseInt(obj.two) + parseInt(obj.one)+parseInt(obj.three) +parseInt(obj.four) + parseInt(obj.five)+parseInt(obj.six) +parseInt(obj.seven) +parseInt(obj.eight) +parseInt(obj.nine) +parseInt(obj.ten) +parseInt(obj.eleven)+parseInt(obj.twelve)
                        arr.push(obj);
                        console.log(arr,77777)
                    }
                    this.list1 = arr;
                    console.log(this.date,99999)

                })

            },
            getLists(){
                axiosUtil('smarthos.sxzz.monthcount.list',{
                    "yyid": "11111",
                    "sqysbh": this.value?this.value:'595d05b0f19b9c898a58cc70',
                    "zzms":this.activeName?this.activeName:1
                }).then(res=>{
                    console.log(res,666666)
//                    this.$set(this.$data,'list',res.list);
                    var list = res.list;
                    var arr = [];
                    for(var i=0;i<list.length;i++){
                        var obj = {};
                        obj.date = i;
                        obj.yymc = list[i].yymc;
                        obj.ksmc = list[i].ksmc;
                        this.date = list[0].list;
                        let nodes=["one","two",'three','four','five','six','seven','eight','nine','ten','eleven','twelve']
                        for(var j=0;j<list[i].list.length;j++){
                            obj[nodes[j]] = list[i].list[j].count;
                        };
                        console.log(obj,2323232)
                        obj.total = parseInt(obj.two) + parseInt(obj.one)+parseInt(obj.three) +parseInt(obj.four) + parseInt(obj.five)+parseInt(obj.six) +parseInt(obj.seven) +parseInt(obj.eight) +parseInt(obj.nine) +parseInt(obj.ten) +parseInt(obj.eleven)+parseInt(obj.twelve)
                        arr.push(obj);
                        console.log(arr,77777)
                    }
                    this.list1 = arr;
                    console.log(this.date,99999)

                })

            },
            getArr(){
                axiosUtil('smarthos.sxzz.monthcount.list',{
                    "yyid": "11111",
                    "qrysbh": this.value?this.value:'595d05b0f19b9c898a58cc70',
                    "zzms":this.activeName?this.activeName:1
                }).then(res=>{
                    console.log(res,666666)
//                    this.$set(this.$data,'list',res.list);
                    var list = res.list;
                    var arr = [];
                    for(var i=0;i<list.length;i++){
                        var obj = {};
                        obj.date = i;
                        obj.yymc = list[i].yymc;
                        obj.ywlx = list[i].ywlx;
                        this.date = list[0].list;
                        let nodes=["one","two",'three','four','five','six','seven','eight','nine','ten','eleven','twelve']
                        for(var j=0;j<list[i].list.length;j++){
                            obj[nodes[j]] = list[i].list[j].count;
                        };
                        console.log(obj,2323232)
                        obj.total = parseInt(obj.two) + parseInt(obj.one)+parseInt(obj.three) +parseInt(obj.four) + parseInt(obj.five)+parseInt(obj.six) +parseInt(obj.seven) +parseInt(obj.eight) +parseInt(obj.nine) +parseInt(obj.ten) +parseInt(obj.eleven)+parseInt(obj.twelve)
                        arr.push(obj);
                        console.log(arr,77777)
                    }
                    this.list2 = arr;
                    console.log(this.date,99999)

                })

            },
            getArrs(){
                axiosUtil('smarthos.sxzz.monthcount.list',{
                    "yyid": "11111",
                    "sqysbh": this.value?this.value:'595d05b0f19b9c898a58cc70',
                    "zzms":this.activeName?this.activeName:1
                }).then(res=>{
                    console.log(res,666666)
//                    this.$set(this.$data,'list',res.list);
                    var list = res.list;
                    var arr = [];
                    for(var i=0;i<list.length;i++){
                        var obj = {};
                        obj.date = i;
                        obj.yymc = list[i].yymc;
                        obj.ywlx = list[i].ywlx;
                        this.date = list[0].list;
                        let nodes=["one","two",'three','four','five','six','seven','eight','nine','ten','eleven','twelve']
                        for(var j=0;j<list[i].list.length;j++){
                            obj[nodes[j]] = list[i].list[j].count;
                        };
                        console.log(obj,2323232)
                        obj.total = parseInt(obj.two) + parseInt(obj.one)+parseInt(obj.three) +parseInt(obj.four) + parseInt(obj.five)+parseInt(obj.six) +parseInt(obj.seven) +parseInt(obj.eight) +parseInt(obj.nine) +parseInt(obj.ten) +parseInt(obj.eleven)+parseInt(obj.twelve)
                        arr.push(obj);
                        console.log(arr,77777)
                    }
                    this.list2 = arr;
                    console.log(this.date,99999)

                })

            },

        }
    }
</script>
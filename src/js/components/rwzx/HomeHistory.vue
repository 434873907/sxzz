<template>
    <div>
        <div class="rwzx-box">
            <div class="rwzx-table">
                <div class="rwzx-title">
                    <p>最近转诊记录</p>
                </div>
                <el-table
                        :data="zzjl"
                        stripe
                        style="width: 100%"
                >
                    <el-table-column
                            prop="sqsj"
                            label="日期"
                            width="100">
                    </el-table-column>
                    <el-table-column
                            prop="yhxm"
                            label="姓名"
                            width="100">
                    </el-table-column>
                    <el-table-column
                            label="预约状态">
                        <template scope="scope">
                            <span style="margin-left: 10px">{{ scope.row.zzzt==0?'预约成功':'预约成功'}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="详情">
                        <template scope="scope">
                            <span style="margin-left: 10px">{{ scope.row.sqyymc }}</span>
                            <span style="margin-left: 10px">{{ scope.row.zdjg }}</span>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="rwzx-table">
                <div class="rwzx-title">
                    <p>最近受理记录</p>
                </div>
                <el-table
                        :data="sljl"
                        stripe
                        style="width: 100%"
                >
                    <el-table-column
                            prop="sqsj"
                            label="日期"
                            width="100">
                    </el-table-column>
                    <el-table-column
                            prop="yhxm"
                            label="姓名"
                            width="60">
                    </el-table-column>
                    <el-table-column
                            prop="ywlx"
                            label="项目"
                            width="60">
                    </el-table-column>
                    <el-table-column
                            prop="address"
                            label="详情">
                        <template scope="scope">
                            <span style="margin-left: 10px">{{ scope.row.sqyymc }}</span>
                            <span style="margin-left: 10px">{{ scope.row.zdjg }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="受理状态"
                            width="100">
                        <template scope="scope">
                            <span style="margin-left: 10px">{{ scope.row.zzzt==0?'成功受理':'成功受理'}}</span>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <div class="rwzx-charts">
            <div class="rwzx-picture">
                <el-tabs v-model="activeName" @tab-click="shiftTo">
                    <el-tab-pane label="转出图" name="first"></el-tab-pane>
                    <el-tab-pane label="转入图" name="second" ></el-tab-pane>
                </el-tabs>
                <div  id="mains" class="rwzx-tj">
                </div>
                <!--<div v-show="activeName == 'second'" style="width:100px;height:100px;background: red;">-->

                <!--</div>-->

            </div>
            <div class="rwzx-picture">
                <el-tabs v-model="activeName" @tab-click="shiftTo">
                    <el-tab-pane label="转出表" name="first"></el-tab-pane>
                    <el-tab-pane label="转入表" name="second"></el-tab-pane>
                </el-tabs>
                <div v-show="activeName1 == 'third'" class="rwzx-tj">
                    <el-table
                            :data="tableArr"
                            style="width: 100%">
                        <el-table-column
                                prop="date"
                                label="日期"
                                width="80">
                        </el-table-column>
                        <el-table-column
                                prop="outpatient"
                                label="门诊"
                        >
                        </el-table-column>
                        <el-table-column
                                prop="inspect"
                                label="检查"
                                width="100">
                        </el-table-column>
                        <el-table-column
                                prop="hospital"
                                label="住院"
                        >
                        </el-table-column>
                        <el-table-column
                                prop="surgery"
                                label="日间手术"
                        >
                        </el-table-column>

                    </el-table>
                </div>
                <div v-show="activeName1 == 'fourth'" style="width:100px;height:100px;background: red;">

                </div>
            </div>
        </div>
    </div>
</template>
<style>
    #mains {
        width: 100%;
        height: 210px;
        background: #ccc;
        margin-top: 20px;
    }
</style>
<script type="text/ecmascript-6">
    import echarts from 'echarts';
    import timeformat from "lmw-time-format";
    import axiosUtil from "../../utils/AxiosUtils.js";
    import Vue from  "vue";
    require('echarts/theme/macarons');
    export default {
        name: '',
        data () {
            return {
                tableArr:[],
                activeName: 'first',
                activeName1: 'third',
                charts: '',
                zzjl: [],
                sljl: [],
                seriesd: [],
                sd: [],
                st: []
            }
        },
        methods: {
            getZr:function(){
              console.log("2222")
            },
            getZc:function(){
                console.log("1111");
                _getDatad();
            },
             async _getData(){
             console.log("lddl");
             let data = await axiosUtil("smarthos.sxzz.newrecord.list", {
             yyid: "59411511191ce23575a63218",
             pageSize: 10,
             pageNum: 1,
             sqysbh: "595d05b0f19b9c898a58cc70",
             zzzt: 0
             });
             this.zzjl = data.list;
             },
             async _getDatas(){
             console.log("lddl");
             let data = await axiosUtil("smarthos.sxzz.newrecord.list", {
             yyid: "59411511191ce23575a63218",
             sqysbh: "595d05b0f19b9c898a58cc70",
             pageSize: 10,
             pageNum: 1,
             zzzt: 1
             });
             this.sljl = data.list;
             },
            shiftTo(value,event){
              console.log(value.name,event,2222);
                if(value.name=='second'){
                    this._getShift()
                }else {
                    this._getDatad();
                }
            },
            async _getShift(){
                console.log("323233434343");
                let data = await axiosUtil("smarthos.sxzz.daycount.list", {
                    yyid: "59411511191ce23575a63218",
                    sqysbh: "595d05b0f19b9c898a58cc70",
                    zzzt: 1
                });
                console.log(data,999999)
                this.seriesd = data.list;
                this._getTime();
            },
            async _getDatad(){
                console.log("lddl");
                let data = await axiosUtil("smarthos.sxzz.daycount.list", {
                    yyid: "59411511191ce23575a63218",
                    sqysbh: "595d05b0f19b9c898a58cc70",

                    zzzt: 1
                });
                console.log(data,888888)
                this.seriesd = data.list;
                this._getTime();
                this._setChat();
            },
            _getTime(){
                console.log("7777",this.seriesd);
                let list = [];
                for (let i = 0; i < 20; i++) {
                    list.push({
                        count: Math.round(Math.random() * 100),
                        ywlx: Math.floor(Math.random() * 4),
                        date: timeformat(new Date().getTime() - (Math.floor(Math.random()*7)+1) * 24 * 3600 * 1000, "%Y-%m-%d")
                    })
                }
                console.log(list,22222222)
                let arr0=[],arr1=[],arr2=[],arr3=[];
                let dateArr = [];
                for (let j = 0; j < 7; j++) {
                    let date=timeformat(new Date().getTime() - (j + 1) * 24 * 3600 * 1000, "%Y-%m-%d")
                    dateArr.push(date)
                    arr0.push(this._getSeries(this.seriesd,0,date))
                    arr1.push(this._getSeries(this.seriesd,1,date))
                    arr2.push(this._getSeries(this.seriesd,2,date))
                    arr3.push(this._getSeries(this.seriesd,3,date))
                }
                console.log("141414",this.seriesd,arr0,arr1,arr2,arr3);
                this.drawPie("", dateArr.reverse(),[arr0.reverse(),arr1.reverse(),arr2.reverse(),arr3.reverse()]);
                return (dateArr);
            },
            _getSeries(list, type, date){
                for (let i = 0; i < list.length; i++) {
                    if(list[i].ywrq==date&&list[i].ywlx==type){
                        console.log(list[i].count,56565656)
                        return list[i].count
                    }
                }
                return 0
            },
            drawPie(domId, xAxisData,series){
                this.charts = echarts.init(document.getElementById("mains"), "macarons");
                this.charts.setOption({
                    title: {
                        text: '柱状图',
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data: ['门诊', '检查', '住院', '日间手术']
                    },
                    calculable: true,
                    xAxis: [
                        {
                            type: 'category',
                            data: xAxisData,
                            axisLabel: {
                                interval: 0
                            }
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value',
                            orient: 'vertical'
                        }
                    ],
                    series: [
                        {
                            name: '门诊',
                            type: 'bar',
                            data: series[0],
                        },
                        {
                            name: '住院',
                            type: 'bar',
                            data: series[1],
                        },
                        {
                            name: '检查',
                            type: 'bar',
                            data: series[2],
                        },
                        {
                            name: '日间手术',
                            type: 'bar',
                            data: series[3],
                        }
                    ]
                })
            },
            async _setChat(){
                var chatArr = [];
                for (let j = 0; j < 7; j++) {
                    let date=timeformat(new Date().getTime() - (j + 1) * 24 * 3600 * 1000, "%Y-%m-%d")
                    var chatObj = {};
                    chatObj.date = date;
                    chatObj.outpatient = this._getSeries(this.seriesd,0,date);
                    chatObj.inspect = this._getSeries(this.seriesd,1,date);
                    chatObj.hospital = this._getSeries(this.seriesd,2,date);
                    chatObj.surgery = this._getSeries(this.seriesd,3,date);
                    console.log(chatObj,55555555)
                    chatArr.push(chatObj)
                }
                this.$set(this.$data,'tableArr',chatArr)
            }
        },
        mounted(){
            //this._getDatad()
            this._getData();
             this._getDatas();
            this._getDatad();
        }
    }
</script>

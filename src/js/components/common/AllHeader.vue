<template>
    <div class="Header-title">
        <div class="date-boxs">
            <div class="date-box">
                <div class="block">
                    <span class="demonstration">转诊时间:</span>
                    <el-date-picker
                            v-model="somedata.date"
                            type="date"
                            placeholder="选择日期">
                    </el-date-picker> ---
                    <el-date-picker
                            v-model="somedata.date1"
                            type="date"
                            placeholder="选择日期">
                    </el-date-picker>
                </div>
            </div>
            <div class="date-box" style="width:180px;">
                <el-select v-model="somedata.cxyyid" placeholder="请选择预约医院" style="width:100%;" @change="selectHospital">
                    <el-option
                            v-for="item in hospitalList"
                            :key="item.yyid"
                            :label="item.yymc"
                            :value="item.yyid"
                           >
                    </el-option>
                </el-select>
            </div>
            <slot name="selOffice">
                <div class="date-box" style="width:180px;">
                    <el-select v-model="somedata.ksid" placeholder="请选择预约科室" style="width:100%;">
                        <el-option
                                v-for="item in officeList"
                                :key="item.ksid"
                                :label="item.ksmc"
                                :value="item.ksid"
                        >
                        </el-option>
                    </el-select>
                </div>
            </slot>

            <div class="date-box" style="width:180px;">
                <el-select v-model="somedata.zzzt" placeholder="请选择预约状态" @change="searchData">
                    <el-option label="待审核" value="0"></el-option>
                    <el-option label="成功" value="1"></el-option>
                    <el-option label="失败" value="2"></el-option>
                    <el-option label="取消" value="3"></el-option>
                </el-select>
            </div>
            <div >
                <el-button style="margin-left: 30px;padding:5px 18px;" size="small" type="primary" @click="searchData">查询</el-button>
            </div>
           <slot name="btn"></slot>
        </div>
    </div>
</template>
<style>

</style>
<script type="text/ecmascript-6">
    import Vue from "vue";
    import axiosUtil from "../../utils/AxiosUtils.js";
    import {formatUnixTime} from '../../utils/DateFormat'
    export default{
       data() {
           return {
               somedata:{
                   cxyyid:'',
                   ksid:'',
                   date:'',
                   zzzt:"",
                   date1:''
               },
               hospitalList:[],
               officeList:[],
               value2:'',
               value3:'',
               activeName:'first',
        }
    },
        mounted(){
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
                        this.$set(this.$data,'hospitalList',res.list);
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
            searchData(){
                console.log(this.somedata,77777);
                console.log(formatUnixTime(this.somedata.date,"yyyy-MM-dd"))
                console.log(formatUnixTime(this.somedata.date1,"yyyy-MM-dd"));
                var val  = {
                        ...this.somedata,
                    starttime:formatUnixTime(this.somedata.date,"yyyy-MM-dd"),
                    endtime:formatUnixTime(this.somedata.date1,"yyyy-MM-dd")
                };
                delete val.date;
                delete val.date1;
               this.$emit("getSelect",val);
            }
        }
}
</script>
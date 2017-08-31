<template>
    <div>
        <el-form   label-width="100px" class="demo-ruleForm">
            <BaseMessage :index="watchNum" @getDetail="getDetail"></BaseMessage>
        </el-form>
        <div  class=" marginP remote-consultation-wrap content-bg-color">
        <div class="news-con">
            <div style="box-sizing:border-box;margin-top:10px;padding:0px 20px;width:100%;background: #F9F9F9;border:1px solid #E3E1E2;">
            <p style="line-height: 40px;font-size: 14px;">预约信息</p>
            </div>
            <div class="base-con" style="padding:20px 20px 0px 20px;">
                <span style="font-size: 14px;color: #48576a;">接诊医院:</span>
                <el-select v-model="somedata.hospital" filterable placeholder="请选择" style="height:24px;margin-left:5px;" @change="selectHospital">
                    <el-option
                            v-for="item in hospitalList"
                            :key="item.yyid"
                            :label="item.yymc"
                            :value="item.yyid"
                    >
                    </el-option>
                </el-select>
                <span style="font-size: 14px;color: #48576a;">接诊科室:</span>
                <el-select v-model="somedata.office" filterable placeholder="请选择" style="height:24px;margin-left:5px;" @change="getDocList">
                    <el-option
                            v-for="item in officeList"
                            :key="item.ksid"
                            :label="item.ksmc"
                            :value="item.ksid"
                    >
                    </el-option>
                </el-select>

            </div>
            <!--<div style="margin-left:20px;">-->
                <!--<el-button :disabled="disabled" @click="lastDate" type="primary" style="padding:5px 20px;" >上周</el-button>-->
                <!--<el-button  type="primary" @click="nextDate" style="padding:5px 20px;" >下周</el-button>-->
            <!--</div>-->
            <div class="news-table" style="width:100%;overflow:hidden;">
                <el-table
                        :data="arrangeList"
                        style="width:100%;overflow:hidden;"
                        height="280"
                        stripe
                        border
                        @cell-click="and"
                >
                    <el-table-column
                            prop="name"
                            style="width:10%;"
                            label="医生">
                        <template scope="scope">
                            <div>{{scope.row.name==''?'普通医生':scope.row.name}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column :label="dateList[0].date" style="width:10%;" prop="monday">
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
                                    label="下午">
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
        <div class="dialog" v-show="dialogVisible">
         <div style="width:100%;height:50px;line-height: 50px;border:1px solid #ccc;color:#848484;box-sizing: border-box;padding:0px 20px;">
             <p>预约信息</p>
         </div>
         <div style="width:90%;margin-left:5%;height:80px;">
             <div class="newsworks">
                 <span>身份证号:</span>
                 <span>{{this.totalObj.zjhm}}</span>
             </div>
             <div class="newsworks">
                 <span>姓名:</span>
                 <span>{{this.totalObj.yhxm}}</span>
             </div>
             <div class="newsworks">
                 <span>就诊时间:</span>
                 <span>{{this.hyrq}} {{this.yylx==1?'下午':'上午'}}</span>
             </div>
             <div class="newsworks" style="width: 50%">
                 <span>预约医院:</span>
                 <span>{{this.yymc}}</span>
             </div>
             <div class="newsworks">
                 <span>预约科室:</span>
                 <span>{{this.ksmc}}</span>
             </div>
             <div class="newsworks">
                 <span>预约医生:</span>
                 <span>{{this.docName}}</span>
             </div>
             <div class="newsworks">
                 <span>挂号费:</span>
                 <span>{{this.zlf}}</span>
             </div>
             <div class="newsworks">
                 <span style="color:red;">当前剩余号源还剩:</span>
                 <span style="color:red;">{{this.tableData.length}}</span>
             </div>
         </div>
         <el-table
                 ref="multipleTable"
                 :data="tableData"
                 @current-change="handleCurrentChange"
                 height="330"
                 style="width:90%;margin-left:5%;">
             <el-table-column
                     type="index"
                    >
             </el-table-column>
             <el-table-column
                     type="selection"
                    >
             </el-table-column>
             <el-table-column
                     prop="hyxh"
                     label="就诊序号"
                    >
             </el-table-column>
             <el-table-column
                     prop="qhsj"
                     label="就诊时间"
                    >
                 <template scope="scope">
                     <div>{{scope.row.qhsj.substring(0,2)+':'+scope.row.qhsj.substring(2.4)}}</div>
                 </template>
             </el-table-column>
         </el-table>
         <div class="btn-con">
         <el-button  class="btn success1" @click="close" type="text" style="padding:5px 50px" >上一步</el-button>
         <el-button class="btn" type="primary" style="padding:5px 50px;" @click="SureYuyue">确认预约</el-button>
         </div>
         </div>
        <div class="BigBox" v-show="dialogVisible1"></div>
        </div>
    </div>
</template>
<style>

</style>
<script type="text/ecmascript-6">
    import Vue from "vue";
//    import  'element-ui';
    import BaseMessage from  "../common/BaseMessage.vue";
    import axiosUtil from "../../utils/AxiosUtils.js"
    import { Button, Radio, RadioGroup, Select, Option, DatePicker, Input, Message, Loading, Popover , Dialog,MessageBox } from "element-ui";

    Vue.use(Button);
    Vue.use(Radio);
    Vue.use(RadioGroup);
    Vue.use(Select);
    Vue.use(Option);
    Vue.use(DatePicker );
    Vue.use(Loading);
    Vue.use(Popover);
    Vue.use(Dialog);
    export default{
        data(){
            return{
                totalObj:{},
                docName:'',
                docId:"",
                yyhyid:'',
                hyDate:'',
                qryymc:"",
                yymc:"",
                ksmc:'',
                watchNum:0,
                tableData:[],
                dialogVisible:false,
                dialogVisible1:false,
                hospitalList:[],
                officeList:[],
                index:0,
                disabled:true,
                currentFirstDate:'',
                dateList:[],
                value8:'',
                value9:'',
                value10:'',
                somedata:{
                    hospital:'',
                    office:''
                },
                arrangeList:[],
                hyrq:'',
                hyxh:'',
                yylx:0,
                pbid:'',
                zlf:''

            }
        },
        components:{
            BaseMessage
        },
        mounted(){

           this.setDate(new Date());
//            this.getData();
            this.getHospital();
        },
        methods:{
            filterArr(arr,id){
                function getObj (item) {
                    return item.yyid==id;
                }
            return   arr.filter(getObj)
            },
            filterArr1(arr,id){
                function getObj (item) {
                    return item.ksid==id;
                }
            return   arr.filter(getObj)
            },
            getDetail(value){
                this.$set(this.$data,'totalObj',value)
            },
            handleCurrentChange(val,old) {
                this.$set(this.$data,'yyhyid',val.yyhyid)
                this.$set(this.$data,'hyDate',val.qhsj);
                this.$set(this.$data,'hyxh',val.hyxh)
                this.$refs.multipleTable.toggleRowSelection(old,false);
            },
            close(){
                this.dialogVisible=false;
                this.dialogVisible1=false;
            },
            SureYuyue(){
//               this.yymc + ',' +this.ksmc +','+this.docName+','
//                        +this.hyrq+','+this.hyxh+','+this.hyDate.substr(0,2)+':'+this.hyDate.substr(2,4)
                MessageBox.confirm( '是否确认预约？', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    closeOnPressEscape:true,
                    type: 'warning'
                }).then(() => {
                    let _this=this;
                    axiosUtil('smarthos.sxzz.mzzzsq.info',{
                        ..._this.totalObj,
                        "jgid": "59411511191ce23575a63218",
                        "yyr": "595d05b0f19b9c898a58cc70",
                        "yyid": this.somedata.hospital,
                        "ksid":this.somedata.office,
                        'qrksmc': this.ksmc,
                        "ysid": this.docId,
                        "ysmc": this.docName,
                        "yypbid": this.pbid,
                        "yylx": this.yylx,
                        "hyid": this.yyhyid,
                        "hyrq": this.hyrq,
                        "hysj":this.hyDate,
                        "hyxh":this.hyxh,
                        "zlf":this.zlf,
                        "sqysxm": "陈刚",
                        "sqksmc": "预防保健科",
                        "sqksbh": "59193cddca72a7bbbbe86c1c",
                        "sqyymc": "特杨医院",
                        "qryymc": this.yymc,
                    }).then(res=>{
                        console.log(res,66666666)
                        _this.$router.push({
                            name:'mzzzbox',
                            params:{
                                zyzzList:res.obj
                            }
                        });
                    })

                }).catch(() => {
                    console.log("2");
                });
                this.dialogVisible=false;
                this.dialogVisible1=false;


            },
            open:function(){
                this.dialogVisible=true;
                this.dialogVisible1=true;
            },
            handleEdit(index, row) {
            },
            getDocList(val){
                this.getData(val)
            },
            getHospital(){
                axiosUtil('smarthos.sxzz.mzhos.list',{
                    "qyid":"0",
                    "ywlx":"0"
                }).then(res=>{
                    if(res.succ){
                        this.$set(this.$data,'hospitalList',res.list)
                    }else {
                        alert(res.msg)
                    }
                });

            },
            selectHospital(id){
                this.getOffice(id);
            },
            getOffice(id){
                axiosUtil('smarthos.sxzz.outdept.list',{
                    "yyid":id,
                }).then(res=>{
                    if(res.succ){
                        this.$set(this.$data,'officeList',res.list)
                    }else {
                        alert(res.msg)
                    }
                })
            },
            getData(val){
                axiosUtil('smarthos.sxzz.outscheme.list',{
                    "jgid": "59411511191ce23575a63218",
                    "yyid": this.somedata.hospital,
                    "ksid": val
                }).then(res=>{
                    if(res.succ){
                        var list = res.list;
                        var arr = [];
                        for(var i=0;i<list.length;i++){
                            var obj = {};
                            obj.name = list[i].ysxm;
                            obj.ysid = list[i].ysid
//                            obj.pbid = list[i].pbid;
                            var dayList = [];
                            for(var j=0;j<list[i].pb.length;j++){
                                var dateObj = {};
                                dateObj.am = list[i].pb[j].swsyhy;
                                dateObj.pm = list[i].pb[j].xwsyhy;
                                dateObj.pbid = list[i].pb[j].pbid;
                                dateObj.pmpbid = list[i].pb[j].pmpbid;
                                dateObj.zlf = list[i].pb[j].ghf;
                                dayList.push(dateObj);
                            }
                            obj.monday = dayList[0];
                            obj.tuesday = dayList[1];
                            obj.wednesday = dayList[2];
                            obj.thursday = dayList[3];
                            obj.friday = dayList[4];
                            obj.saturday = dayList[5];
                            obj.sunday = dayList[6];
                            arr.push(obj)
                        };
                        this.$set(this.$data,'arrangeList',arr)
                    }else{
                       alert(res.msg)
                    }
                })
            },
            formatDate(date){
                var year = date.getFullYear()+'-';
                var month = (date.getMonth()+1>9?date.getMonth()+1:'0'+(date.getMonth()+1))+'-';
                var day = (date.getDate()>9?date.getDate():'0'+(date.getDate()));

                var week = ['星期天','星期一','星期二','星期三','星期四','星期五','星期六'][date.getDay()];
                return {
                    date:year+month+day,
                    week:week
                }
            },
            setDate(date){
                var week = date.getDay()-1;
                this.currentFirstDate = new Date(date);
                var arr = [];
                for(var i = 0;i<7;i++){
                    arr.push(this.formatDate(i==0 ? date : this.addDate(date,1)))
                };
                this.$set(this.$data,'dateList',arr)
            },
            addDate(date,n){
                date.setDate(date.getDate()+n);
                return date;
            },
            nextDate(){
                this.index++
                this.$set(this.$data,'disabled',false);
                this.setDate(this.addDate(this.currentFirstDate,7));
            },
            lastDate(){
                if(this.index==0){
                    this.$set(this.$data,'disabled',true);
                }else {
                    this.index--;
                    this.setDate(this.addDate(this.currentFirstDate,-7));
                }

            },
            test(){

            },
            and(row, column, cell){
                this.yymc = this.filterArr(this.hospitalList,this.somedata.hospital)[0].yymc;
                this.ksmc = this.filterArr1(this.officeList,this.somedata.office)[0].ksmc;
                row.name?this.docName=row.name:this.docName='普通医生';
                this.docId = row.ysid;
                this.$set(this.$data,'pbid',row.pbid)
                if(column.property.split('.')[1]=='am'){
                    this.$set(this.$data,'yylx',0)
                }else {
                    this.$set(this.$data,'yylx',1)
                }
                switch (column.property){
                    case 'monday.am':
                        this.$set(this.$data,'hyrq',this.dateList[0].date);
                        this.$set(this.$data,'pbid',row.monday.pbid)
                        this.$set(this.$data,'zlf',row.monday.zlf)
                    break;
                    case 'monday.pm':
                        this.$set(this.$data,'hyrq',this.dateList[0].date);
                        this.$set(this.$data,'pbid',row.monday.pmpbid)
                        this.$set(this.$data,'zlf',row.monday.zlf)
                    break;
                    case 'tuesday.am':
                        this.$set(this.$data,'hyrq',this.dateList[1].date)
                        this.$set(this.$data,'pbid',row.tuesday.pbid)
                        this.$set(this.$data,'zlf',row.tuesday.zlf)
                    break;
                    case 'tuesday.pm':
                        this.$set(this.$data,'hyrq',this.dateList[1].date)
                        this.$set(this.$data,'pbid',row.tuesday.pmpbid)
                        this.$set(this.$data,'zlf',row.tuesday.zlf)
                    break;
                    case 'wednesday.am':
                        this.$set(this.$data,'hyrq',this.dateList[2].date)
                        this.$set(this.$data,'pbid',row.wednesday.pbid)
                        this.$set(this.$data,'zlf',row.wednesday.zlf)
                    break;
                    case 'wednesday.pm':
                        this.$set(this.$data,'hyrq',this.dateList[2].date)
                        this.$set(this.$data,'pbid',row.wednesday.pmpbid)
                        this.$set(this.$data,'zlf',row.wednesday.zlf)
                    break;
                    case 'thursday.am':
                        this.$set(this.$data,'hyrq',this.dateList[3].date)
                        this.$set(this.$data,'pbid',row.thursday.pbid)
                        this.$set(this.$data,'zlf',row.thursday.zlf)
                    break;
                    case 'thursday.pm':
                        this.$set(this.$data,'hyrq',this.dateList[3].date)
                        this.$set(this.$data,'pbid',row.thursday.pmpbid)
                        this.$set(this.$data,'zlf',row.thursday.zlf)
                    break;
                    case 'friday.am':
                        this.$set(this.$data,'hyrq',this.dateList[4].date)
                        this.$set(this.$data,'pbid',row.friday.pbid)
                        this.$set(this.$data,'zlf',row.friday.zlf)
                    break;
                    case 'friday.pm':
                        this.$set(this.$data,'hyrq',this.dateList[4].date)
                        this.$set(this.$data,'pbid',row.friday.pmpbid)
                        this.$set(this.$data,'zlf',row.friday.zlf)
                    break;
                    case 'saturday.am':
                        this.$set(this.$data,'hyrq',this.dateList[5].date)
                        this.$set(this.$data,'pbid',row.saturday.pbid)
                        this.$set(this.$data,'zlf',row.saturday.zlf)
                    break;
                    case 'saturday.pm':
                        this.$set(this.$data,'hyrq',this.dateList[5].date)
                        this.$set(this.$data,'pbid',row.saturday.pmpbid)
                        this.$set(this.$data,'zlf',row.saturday.zlf)
                    break;
                    case 'sunday.am':
                        this.$set(this.$data,'hyrq',this.dateList[6].date)
                        this.$set(this.$data,'pbid',row.sunday.pbid)
                        this.$set(this.$data,'zlf',row.sunday.zlf)
                    break;
                    case 'sunday.pm':
                        this.$set(this.$data,'hyrq',this.dateList[6].date)
                        this.$set(this.$data,'pbid',row.sunday.pmpbid)
                        this.$set(this.$data,'zlf',row.sunday.zlf)
                    break;
                }
                this.sourceList();
                this.$set(this.$data,'dialogTableVisible',true)
            },
            sourceList(){
                this.watchNum++
                if(this.pbid){
                    axiosUtil('smarthos.sxzz.outorder.list',{
                        "jgid": "59411511191ce23575a63218",
                        "yyid": this.somedata.hospital,
                        "pbid":this.pbid,
                        "hyrq":this.hyrq,
                        "yylx":this.yylx,
                        "yhid":"1",
                        "yyr": "595d05b0f19b9c898a58cc70"
                    }).then(res=>{
                        if(res.succ){
                            this.$set(this.$data,'tableData',res.list);
                            this.open()
                        }
                    })
                }else {
                  alert('号源列表为空！')
                }


            }
        }
    }
</script>
<template>
    <el-table
            :data="propsTableData"
            style="width: 100%"
            class="table-wrap ">
        <el-table-column
                prop="consultTypeName"
                label="类别"
                align="center"
                width="100">
        </el-table-column>
        <el-table-column
                prop="consultInfoNo"
                label="编号"
                align="center"
                width="100">
        </el-table-column>
        <el-table-column
                prop="consulterName"
                label="姓名"
                align="center"
                width="100">
        </el-table-column>
        <el-table-column
                prop="consulterGender"
                label="性别"
                :formatter="sexSelect"
                align="center"
                width="67">
        </el-table-column>
        <el-table-column
                prop="consulterAge"
                label="年龄"
                align="center"
                width="67">
        </el-table-column>
        <el-table-column
                prop="consultContent"
                label="内容"
                align="center"
                show-overflow-tooltip>
        </el-table-column>
        <el-table-column
                prop="createTime"
                label="创建时间"
                :formatter="formatUnix"
                align="center"
                width="60">
        </el-table-column>
        <el-table-column
                prop="operation"
                label=" 操作"
                align="center"
                inline-template
                width="180">
            <div class="table-btn-wrap">
                <el-button
                        size="small"
                        type="primary"
                        @click="linktoDeal($index, row)"
                        class="table-btn operate">
                    处理
                </el-button>
            </div>
        </el-table-column>
    </el-table>
</template>
<style>
</style>

<script>
    import { Table,Button,TableColumn, Tooltip } from "element-ui";
    import { formatUnixTime } from "../../utils/DateFormat.js";
    import axiosUtil from "../../utils/AxiosUtils.js"
    import Vue from "vue";
    Vue.use(Table);
    Vue.use(Button);
    Vue.use(TableColumn);
    Vue.use(Tooltip)
    export default{

        props: ["propsTableData"],
        components:{
        },
        methods:{
            sexSelect: function(row, column){//根据服务器获取到的M或者其他显示男或女
                return (row.consulterGender =="M"?"男":"女");
            },
            formatUnix: function(row, column){//格式化时间格式
                if(row.createTime){
                    return formatUnixTime(row.createTime, "MM-dd HH:mm");
                }
            },
            linktoDeal: function($index, row){
                let _this = this;
                let options = null;
                switch (row.consultTypeName){
                    case "全科分诊":
                        options = {
                            consultId: row.consultId,
                            token: localStorage.getItem("token"),
                            Service: "nethos.consult.info.grab"
                        };
                        axiosUtil(options, function(data){
                            _this.$router.push({ name: "pictureToTreat", params: { consultId: row.consultId }} );
                            _this.$store.dispatch("changeSideItem", "twzx");
                        });
                        break;
                    case "名医视频":
                        options = {
                            consultId: row.consultId,
                            token: localStorage.getItem("token"),
                            Service: "nethos.consult.info.grab"
                        };
                        axiosUtil(options, function(data){
                            _this.$router.push({ name: "videoEntry", params: { consultId: row.consultId }} );
                            _this.$store.dispatch("changeSideItem", "spwz");
                        });
                        break;
                    default:
                        break;
                }
            }
        },
    }
</script>

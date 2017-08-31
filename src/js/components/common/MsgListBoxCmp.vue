<!--全部消息盒子列表-->
<template>
    <el-dialog title="全部消息" size="small" ref="dialog" @close="dialogClose">
       <el-table :data="allMsgBoxList.list" :height="457" class="box-table-wrap">
           <el-table-column :formatter="formatUnix" label="时间" width="100"></el-table-column>
           <el-table-column property="messageTitle" label="类型" width="100"></el-table-column>
           <el-table-column property="messageBody" label="内容" show-overflow-tooltip></el-table-column>
           <el-table-column
                    label=" 操作"
                    align="center"
                    inline-template
                    width="180">
                <div class="table-btn-wrap ghost-btn-wrap">
                    <el-button
                            size="small"
                            @click="linkTo($index, row)"
                            class="table-btn ghost-btn">
                        点击前往
                    </el-button>
                    <span class="table-badge-wrap" style="top: -3px;left: 4px;"><el-badge class="table-badge" v-if="!row.isread" is-dot/></span>
                </div>
            </el-table-column>
       </el-table>
       <el-pagination
                @current-change="CurrentPageChange"
                :page-size="10"
                class="patient-footer marginT10 fl"
                layout="prev, pager, next, jumper"
                :total="allMsgBoxList.paginator?allMsgBoxList.paginator.totalCount:0">
        </el-pagination>
       <div class="ghost-btn-wrap fr">
           <el-button size="small" class="ghost-btn" @click="allReadHandler">全部标为已读</el-button>
       </div>
   </el-dialog>
</template>
<script>
    import { Dialog, Pagination } from "element-ui";
    import { formatUnixTime } from "../../utils/DateFormat.js";
    import axiosUtil from "../../utils/AxiosUtils.js"
    import MsgBoxListUtils from "../../utils/MsgBoxListUtils.js"
    import Vue from "vue";
    Vue.use(Dialog);
    Vue.use(Pagination);
    export default {
        data: function () {
            return {
                //currentPage: 1,// 消息盒子页码
            }
        },
        computed: {
            allMsgBoxList: function() {
                return this.$store.state.allMsgBoxList;
            },
            isOpenMsgListBox: function(){//  是否打开消息盒子
                return this.$store.state.isOpenMsgListBox;
            },
            allMsgBoxListCounts: function() { // 未读消息数
                return this.$store.state.allMsgBoxListCounts;
            },
        },
        watch: {
            "isOpenMsgListBox": function(newVal, oldVal) {// 如果推送已完成，跳转到评论
                if(newVal == true){
                    this.$refs.dialog.open();
                }
            }
        },
        methods: {
            formatUnix: function(row){//格式化时间格式
                if(row.createTime){
                    return formatUnixTime(row.createTime, "MM-dd HH:mm");
                }
            },
            allReadHandler: function(){// 全部标为已读
                let _this = this;
                let options = {
                    token: localStorage.getItem("token"),
                    Service: "nethos.system.messagebox.read.all"
                };
                /*axiosUtil(options, function(data){
                    _this.$refs.dialog.close();
                    _this.$store.dispatch("getAllMsgBoxList");// 获取消息盒子列表内容总数
                    _this.$store.dispatch("getAllMsgBoxListCounts");// 获取消息盒子未读数
                });*/
            },
            CurrentPageChange: function(currentPage) {// 改变当前页码
                this.$store.dispatch("getAllMsgBoxList", currentPage);
            },
            dialogClose: function() {// 关闭对话框回调
                this.$store.dispatch("isOpenMsgListBox", false);// 关闭消息盒子
            },
            linkTo: function($index, row) {// 点击前往
                let itemJSON = JSON.stringify(row);
                MsgBoxListUtils(this, itemJSON);
                this.$refs.dialog.close();
            }
        }
    }
</script>

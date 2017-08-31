<template>
    <div class="pagination">
        <button class="page-first-btn page-btn" @click="toFirstPage"/>
        <button class="page-pre-btn page-btn" @click="toPrePage"/>
        <span class="page-total page-span marginL10">
            共<span>{{ totalPages }}</span>页
        </span>
        <span class="page-current page-span">第<input type="number" class="page-input" v-model="currentPage" />页</span>
        <el-button
                size="small"
                type="primary"
                class="fl marginR10 confirm-btn"
                @click="handleClick">
            确定</el-button>
        <button class="page-next-btn page-btn" @click="toNextPage"/>
        <button class="page-last-btn page-btn" @click="toLastPage"/>
    </div>
</template>
<style>

</style>
<script>
    import { Button, Message } from "element-ui";
    import Vue from "vue";
    Vue.use(Button);
    export default{
        data: function(){
            return {
                currentPage: 1
            }
        },
        props: ["propsTotalCols", "propsPageSize"],// propsTotalCols显示总行数,2.每页显示行数
        computed: {
            totalPages: function(){
                let pages = Math.ceil(this.propsTotalCols / this.propsPageSize);
                return pages==0 ? 1 : pages;
            }
        },
        methods: {
            handleClick: function(el){//点击确认按钮发送改变页码事件
                el.preventDefault();
                if(this.currentPage > this.totalPages || this.currentPage <= 0){
                    Message({
                      showClose: true,
                      message: "输入的页数错误",
                      type: "warning"
                    });
                    return;
                }else {
                    this.$parent.$emit("changePage", this.currentPage);
                }
            },
            toFirstPage: function(el){//第一页按钮
                if(this.currentPage === 1){
                    Message({
                      showClose: true,
                      message: "已到第一页",
                      type: "warning"
                    });
                    return;
                }else {
                    this.currentPage = 1;
                    this.handleClick(el);
                }
            },
            toPrePage: function(el){//前一页
                if(this.currentPage === 1){
                    Message({
                      showClose: true,
                      message: "已到第一页",
                      type: "warning"
                    });
                    return;
                }else {
                    this.currentPage -= 1;
                    this.handleClick(el);
                }
            },
            toNextPage: function(el){//下一页
                if(this.currentPage === this.totalPages){
                    Message({
                      showClose: true,
                      message: "已到最后一页",
                      type: "warning"
                    });
                    return;
                }else {
                    this.currentPage += 1;
                    this.handleClick(el);
                }
            },
            toLastPage: function(el){
                if(this.currentPage === this.totalPages){
                    Message({
                      showClose: true,
                      message: "已到最后一页",
                      type: "warning"
                    });
                    return;
                }else {
                    this.currentPage = this.totalPages;
                    this.handleClick(el);
                }
            }
        }
    }
</script>

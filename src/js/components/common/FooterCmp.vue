<template>
    <div class="footer clearfix" :style="{ 'height': height}">
        <!--<PaginationCmp class="footer-pagination fr" :propsTotalCols="propsTotalCols" :propsPageSize="propsPageSize"/>-->
        <el-pagination
                @current-change="CurrentPageChange"
                :page-size="propsPageSize"
                class="footer-pagination fr"
                layout="prev, pager, next, jumper"
                :total="propsTotalCols">
        </el-pagination>
    </div>
</template>
<style>

</style>
<script>
    //import PaginationCmp from "./PaginationCmp.vue";
    export default{
        computed: {
            height: function(){
                return (this.clientH - this.fixedHeight +　"px") //动态获取列表高度 home.table + home.top + header
            }
        },
        props: {
            propsTotalCols: {
                required: true
            },
            clientH: {
                required: true
            },
            propsPageSize: {
                default: true
            },
            fixedHeight: {//fixedHeight表示除去底部外其他固定高度，默认高度596，设置中的我的收入不一样。用来计算底部高度
                default: 547
            }
        },
        /*components:{
            PaginationCmp
        },*/
        methods: {
            CurrentPageChange: function(pageName) {
                this.$emit("changePage", pageName);
            }
        }
    }
</script>

<template>
    <div>
        <div class="arrange-table" >
            <el-table
                    :data="tableData"
                    style="width:100%;overflow: auto;">
                <el-table-column
                        prop="date"
                        label="操作"
                        inline-template
                        width="100">
                    <div style="width:100%;height:40px;line-height: 24px;display:flex;">
                        <div class="arrange-font" title="转诊单">
                            <svg class="icons f2" >
                                <use xlink:href="#icon-dayinzhuanzhendan"></use>
                            </svg>
                        </div>
                        <div class="arrange-font" title="确认单">
                            <svg class="icons f2">
                                <use xlink:href="#icon-chexiao" ></use>
                            </svg>
                        </div>
                        <div class="arrange-font" title="查看">
                            <svg class="icons f2" >
                                <use xlink:href="#icon-chakan"></use>
                            </svg>
                        </div>
                    </div>
                </el-table-column>
                <el-table-column
                        prop="zzzt"
                        label="预约状态">
                </el-table-column>
                <el-table-column
                        prop="kh"
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

                <slot name="newDate">
                    <el-table-column
                            prop="qrsi"
                            label="就诊日期">
                    </el-table-column>
                    <el-table-column
                            prop="yymc"
                            label="就诊序号">
                    </el-table-column>
                </slot>

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
                <slot name="addTable"></slot>
            </el-table>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    export default{
        components: {

        },
        props:['tableData'],
        data(){
            return {}
        },
        mounted(){

        }
    }
</script>
<style scoped >

</style>

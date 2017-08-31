<template>
    <div class="set-my-info marginL201 clearfix" v-loading="!isSuccess">
        <div class="login-title h50">
            <span></span>
            我的信息
        </div>
        <div class="clearfix set-form-wrap marginT35" v-if="isSuccess">
            <el-form :model="formAlignRight" label-width="120px" class="fl w385">
                <el-form-item label="姓名：" class="form-item">
                    <el-input
                            :value=value1
                            size="small"
                            readonly
                            class="form-input h24 w240"/>
                </el-form-item>
                <el-form-item label="手机号码：" class="form-item">
                    <el-input
                            :value=value2
                            size="small"
                            readonly
                            class="form-input h24 w240"/>
                </el-form-item>
                <el-form-item label="执业机构：" class="form-item">
                    <el-input
                            :value=value3
                            size="small"
                            readonly
                            class="form-input h24 w240"/>
                </el-form-item>
                <el-form-item label="科室：" class="form-item">
                    <el-input
                            :value=value4
                            size="small"
                            readonly
                            class="form-input h24 w240"/>
                </el-form-item>
                <el-form-item label="职称：" class="form-item">
                    <el-input
                            :value=value5
                            size="small"
                            readonly
                            class="form-input h24 w240"/>
                </el-form-item>
                <el-form-item label="性别：" class="form-item">
                    <el-input
                            :value=value6
                            size="small"
                            readonly
                            class="form-input h24 w240"/>
                </el-form-item>
                <!--<el-button type="primary" class="h36 w140 save-btn" @click="modifyMyInfo" :loading="isSuccess">保存</el-button>-->
            </el-form>
        </div>
    </div>
</template>
<script>
    import axiosUtil from "../../utils/AxiosUtils.js";
    import { Loading } from "element-ui";
    import Vue from "vue";
    Vue.use(Loading);
    export default{
        data: function(){
            return{
                value1:'',
                value2:'',
                value3:'',
                value4:'',
                value5:'',
                value6:''
            }
        },
    }
</script>

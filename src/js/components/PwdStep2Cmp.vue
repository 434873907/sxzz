<template>
    <div class="pwd-step">
        <div class="pwd-process clearfix step2-wrap">
            <div class="step1 pwd-proc-item">1.验证手机号码</div>
            <div class="step2 pwd-proc-item">2.输入新密码</div>
            <div class="step3 pwd-proc-item">3.重置密码成功</div>
        </div>
        <div class="pwd-form form-wrap">
            <el-form :model="formAlignRight" :rules="rules" label-width="145px" >
                <el-form-item label="输入新密码：" class="form-item" prop="pwd">
                    <el-input
                            v-model="formAlignRight.pwd1"
                            size="small"
                            class="form-input"
                            placeholder="请输入新的密码"/>
                </el-form-item>
                <el-form-item label="再次输入新密码：" class="form-item" prop="pwd">
                    <el-input
                            v-model="formAlignRight.userName"
                            size="small"
                            class="form-input"
                            placeholder="请再次输入新的密码"/>
                </el-form-item>
                <el-button type="primary" class="register-btn pwd-next" @click="linkTo">
                    下一步
                </el-button>
            </el-form >
        </div>
    </div>
</template>
<style>

</style>
<script>
    import Vue from "vue";
    import VueRouter from "vue-router";
    Vue.use(VueRouter);
    const router = new VueRouter();
    export default{
        data: function(){
            return {
                formAlignRight: {

                    pwd1: '',
                    pwd2: ''
                },
                rules: {
                    pwd: [
                        { required: true, message: '密码不能为空', trigger: 'blur' },
                    ]
                },
            }
        },
        components:{
        },
        methods: {
            linkTo: function(el){
                el.preventDefault();
                router.push("/password/step3");
            }
        }
    }
</script>

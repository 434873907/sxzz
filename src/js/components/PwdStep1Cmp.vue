<template>
    <div class="pwd-step">
        <div class="pwd-process clearfix step1-wrap">
            <div class="step1 pwd-proc-item">1.验证手机号码</div>
            <div class="step2 pwd-proc-item">2.输入新密码</div>
            <div class="step3 pwd-proc-item">3.重置密码成功</div>
        </div>
        <div class="pwd-form form-wrap">
            <el-form :model="formAlignRight" label-width="120px">
                <el-form-item label="手机号码：" class="form-item">
                    <el-input
                            v-model="formAlignRight.userName"
                    size="small"
                    class="form-input"
                    placeholder="请输入注册时的手机号码"/>
                </el-form-item>
                <el-form-item label="验证码：" class="form-item">
                    <el-input
                            v-model="formAlignRight.userName"
                            size="small"
                            class="form-input fl captcha-input"
                            placeholder="请输入验证码"/>
                    <el-button type="primary"  class="captcha-btn fl">获取手机验证码</el-button>
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
    import { Form, FormItem, Input, Button } from "element-ui";
    import Vue from "vue";
    import VueRouter from "vue-router";
    Vue.use(VueRouter);
    Vue.use(Form);
    Vue.use(Input);
    Vue.use(Button);
    Vue.use(FormItem);
    const router = new VueRouter();
    export default{
        data: function(){
            return {
                formAlignRight: {
                    userName: '',
                    password1: '',
                    password2: ''
                },
            }
        },
        components:{
        },
        methods: {
            linkTo: function(el){
                el.preventDefault();
                router.push("/password/step2");
            }
        }
    }
</script>

<template>
    <div class="form-wrap">
        <!--若登录成功显示该跳转内容-->
        <div v-if="isLogin" class="login-ok-wrap">
            <div class="login-ok-content clearfix">
                <span class="icon-ok fl"></span>
                <span class="login-ok-title fl">注册成功，3秒后自动登录</span>
            </div>
            <span class="login-ok-tips">
                如果长时间没有跳转，请点击
                <router-link to="/main" class="link-to-main">登录页面</router-link>
            </span>
        </div>
        <!--若未登录则显示注册内容-->
        <el-form :model="formAlignRight" label-width="120px" v-else="isLogin">
        <h2 class="form-title">账号/密码</h2>
        <el-form-item label="手机号码："  class="form-item">
            <el-input
                    v-model="formAlignRight.userName"
                    size="small"
                    class="form-input"
                    placeholder="请输入正确的手机号码"/>
            <label class="form-tips">*填写正确的手机号，是您以后登录所用的账号</label>
        </el-form-item>
        <el-form-item label="账号密码：" class="form-item">
            <el-input
                    v-model="formAlignRight.password1"
                    size="small"
                    class="form-input"
                    placeholder="请输入您的密码"/>
            <label class="form-tips">*6-20位字符，密码由字母a-z及数字组成</label>
        </el-form-item>
        <el-form-item label="再次输入密码：" class="form-item">
            <el-input
                    v-model="formAlignRight.password2"
                    size="small"
                    class="form-input"
                    placeholder="请再次输入密码"/>
            <label class="form-tips">*6-20位字符，密码由字母a-z及数字组成</label>
        </el-form-item>
        <h2 class="form-title">账户信息</h2>
        <el-form-item label="执业医院：" class="form-item">
            <el-select  placeholder="请选择您的执业医院" size="small" class="form-input">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="科室：" class="form-item">
            <el-select  placeholder="请选择您的执业科室" size="small" class="form-input">
                <el-option label="区域一" value="shanghai"/>
                <el-option label="区域二" value="beijing"/>
            </el-select>
        </el-form-item>
        <el-form-item label="职称：" class="form-item">
            <el-select placeholder="请选择您的职称" size="small" class="form-input">
                <el-option label="区域一" value="shanghai"/>
                <el-option label="区域二" value="beijing"/>
            </el-select>
        </el-form-item>
        <el-form-item label="身份证号：" class="form-item">
            <el-input
                    v-model="formAlignRight.userName"
                    size="small"
                    class="form-input"
                    placeholder="请输入您的身份证号码"/>
        </el-form-item>
        <el-form-item label="验证码：" class="form-item">
            <el-input
                    v-model="formAlignRight.userName"
                    size="small"
                    class="form-input fl captcha-input"
                    placeholder="请输入验证码"/>
            <el-button type="primary"  class="captcha-btn fl">获取手机验证码</el-button>
        </el-form-item>
        <el-form-item>
            <el-checkbox v-model="checked" checked>我已阅读并同意<a>《用户许可协议》</a></el-checkbox>
        </el-form-item>
        <el-button type="primary" class="register-btn" @click="redirect">
            提交注册
        </el-button>
    </el-form >
    </div>
</template>
<style>

</style>
<script>
    import { Form, FormItem, Input, Button, Checkbox, Select, Option } from "element-ui";
    import Vue from "vue";
    import VueRouter from "vue-router";
    Vue.use(VueRouter);
    Vue.use(Form);
    Vue.use(Input);
    Vue.use(Button);
    Vue.use(FormItem);
    Vue.use(Checkbox);
    Vue.use(Select);
    Vue.use(Option);
    const router = new VueRouter();
    export default{
        data: function(){
            return {
                formAlignRight: {
                    userName: '',
                    password1: '',
                    password2: ''
                },
                isLogin: false
            }
        },
        methods: {
            redirect: function(el){
                el.preventDefault();
                this.isLogin = true;
            }
        },
    }
</script>

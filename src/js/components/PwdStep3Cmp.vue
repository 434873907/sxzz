<template>
    <div class="pwd-step">
        <div class="pwd-process clearfix step3-wrap">
            <div class="step1 pwd-proc-item">1.验证手机号码</div>
            <div class="step2 pwd-proc-item">2.输入新密码</div>
            <div class="step3 pwd-proc-item">3.重置密码成功</div>
        </div>
        <div  class="login-ok-wrap pwd-ok-wrap">
            <div class="login-ok-content clearfix">
                <span class="icon-ok fl"></span>
                <span class="login-ok-title fl">密码重置成功，3秒后自动登录</span>
            </div>
                <span class="login-ok-tips">
                    如果长时间没有跳转，请点击
                    <router-link to="/main" class="link-to-main">登录页面</router-link>
                </span>
        </div>
    </div>
</template>
<style>
</style>
<script>
    export default{
        components:{

        },

    }
</script>

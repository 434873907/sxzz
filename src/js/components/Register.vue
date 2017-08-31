<template>
    <div class="register">
        <LoginHeaderCmp title="用户注册"/>
        <!--表单-->
        <RegisterContentCmp/>
    </div>
</template>
<style>

</style>
<script>
    import RegisterContentCmp from "./RegisterContentCmp.vue";
    import LoginHeaderCmp from "./LoginHeaderCmp.vue";
    export default{
        components:{
            LoginHeaderCmp,
            RegisterContentCmp
        },

    }
</script>

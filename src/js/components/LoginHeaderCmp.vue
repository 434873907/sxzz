<template>
    <div>
        <div class="logo">
            <span class="logo-title" >医生工作站</span>
        </div>
        <div class="login-title h50">
            <span></span>
            {{title}}
        </div>
    </div>
</template>
<style>

</style>
<script>
    export default{
        props: ["title"],
        components:{

        }
    }
</script>

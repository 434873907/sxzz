<template>
    <div class="set-side-bar w200 fl">
        <ul class="set-side-list">
            <li class="set-side-item">
                <span class="side-item-title">账户设置</span>
                <ul class="side-item-list marginL25">
                    <li class="side-item">
                        <router-link  to="/setUp" >
                            <span :class="{ 'green-color': clickName=='myInfo' }" @click="clickChange" name="myInfo">我的信息</span>
                        </router-link>
                    </li>
                    <li class="side-item">
                        <router-link to="/setUp/myAvatar" >
                            <span :class="{ 'green-color': clickName=='myPic' }" @click="clickChange" name="myPic">我的头像</span>
                        </router-link>
                    </li>
                </ul>
            </li>
            <li class="set-side-item">
                <span class="side-item-title">账号安全</span>
                <ul class="side-item-list marginL25">
                    <li class="side-item">
                        <router-link to="/setUp/changePwd" >
                            <span :class="{ 'green-color': clickName=='changPwd' }" @click="clickChange" name="changPwd">修改密码</span>
                        </router-link>
                    </li>
                    <li class="side-item">
                        <router-link to="/setUp/bindPhone" >
                            <span :class="{ 'green-color': clickName=='bindPhone' }" @click="clickChange" name="bindPhone">绑定手机</span>
                        </router-link>
                    </li>
                </ul>
            </li>
        </ul>
    </div>
</template>
<style>
</style>
<script>
    export default{
        data: function(){
            return {
                clickName: "myInfo",//侧边栏点击的模块名字，
            }
        },
        components:{

        },
        methods: {
            clickChange: function(el){
                this.clickName = el.target.getAttribute("name");//获取点击的name属性值
            }
        }
    }
</script>

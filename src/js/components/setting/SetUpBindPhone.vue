<template>
    <div class=" marginL201 clearfix" >
        <div class="login-title h50" >
            <span></span>
            绑定手机
        </div>
        <div class="clearfix set-form-wrap marginT35">

            <transition name="slide-fade">
            <el-form v-if="!showNext" label-width="120px" class="fl w480">
                <el-form-item label="旧手机号码：" class="form-item overflow-hidden ">
                    <el-input
                            v-model="oldPhoneNum"
                            readonly
                            size="small"
                            class="form-input"
                            placeholder="请输入旧的手机号码"/>
                </el-form-item>
                <el-form-item label="验证码：" class="form-item overflow-hidden">
                    <div class="blue-btn-wrap clearfix">
                        <el-input
                                v-model.trim="captcha"
                                size="small"
                                class="form-input fl captcha-input"
                                placeholder="请输入验证码"/>
                        <el-button type="primary" size="small" :disabled="isShowConfirmTooltipNext" :class="[isShowConfirmTooltipNext?'gray-btn':'blue-btn', 'fl']" @click="getCaptcha('next')" :loading="isSend">获取手机验证码</el-button>
                        <span v-if="isShowConfirmTooltipNext" class="fontSize12 fl lineH30 marginL10">{{ remTime + '秒后可以重新获取' }}</span>
                    </div>
                    <!--<el-button type="primary" size="small" class="captcha-btn fl" @click="getCaptcha" :loading="isShowConfirmTooltip">获取手机验证码</el-button>-->
                </el-form-item>
                <el-button type="primary" class="h36 w140 marginT35 save-btn" @click="nextStep" :loading="isNext">下一步</el-button>
            </el-form >
            </transition>
            <!--下一步绑定新手机号-->

            <transition name="slide-fade">
            <el-form v-if="showNext" label-width="120px" class="fl w480">
                <el-form-item label="新手机号码：" class="form-item overflow-hidden ">
                    <el-input
                            v-model.number.trim="phoneNum"
                            size="small"
                            class="form-input"
                            placeholder="请输入需要绑定的手机号码"/>
                </el-form-item>
                <el-form-item label="验证码：" class="form-item overflow-hidden">
                    <div class="blue-btn-wrap clearfix">
                        <el-input
                                v-model.trim="newCaptcha"
                                size="small"
                                class="form-input fl captcha-input"
                                placeholder="请输入验证码"/>
                        <el-button type="primary" size="small" :disabled="isShowConfirmTooltip" :class="[isShowConfirmTooltip?'gray-btn':'blue-btn', 'fl']" @click="getCaptcha('save')" :loading="isSend">获取手机验证码</el-button>
                        <span v-if="isShowConfirmTooltip" class="fontSize12 fl lineH30 marginL10">{{ remTime + '秒后可以重新获取' }}</span>
                    </div>
                </el-form-item>
                <el-button type="primary" class="h36 w140 marginT35 save-btn" @click="bindPhone" :loading="isSubmit">保存</el-button>
            </el-form >
            </transition>
            <!--<el-button type="primary" class="h36 w140 marginT60 save-btn">确定</el-button>-->
        </div>
    </div>
</template>
<script>
    import axiosUtil from "../../utils/AxiosUtils.js"
    import { Message } from 'element-ui';
    export default{
        data(){
            return{
                oldPhoneNum: JSON.parse(localStorage.getItem("userInfo")).docMobile?JSON.parse(localStorage.getItem("userInfo")).docMobile:"",
                //oldPhoneNum: "",// 旧手机好
                phoneNum: "",
                isSubmit: false,// 是否保存按钮loading
                isNext: false,// 下一步按钮loading
                showNext: false,// 显示下一步页面
                captcha: "",// 手机验证码
                newCaptcha: "",// 新手机验证码
                cid: "",// 旧手机验证码cid
                newCid: "",// 新手机验证码cid
                isSend: false,// 是否发送验证码（60秒后才能重新发送）
                remTime: 60,// 离下次发送还有多少时间
                isShowConfirmTooltip: false,// 显示60s提示
                isShowConfirmTooltipNext: false,// 显示60s提示
            }
        },
        components:{
        },
        methods:{
            getCaptcha: function(type="next"){// 获取手机验证码
                let _this = this;
                _this.isSend = true;
                _this.isShowConfirmTooltip = false;
                _this.isShowConfirmTooltipNext = false;
                let options = null;
                if(type === "next"){
                    options = {
                        captchaType: "SMS",
                        mobile: _this.oldPhoneNum,
                        token: localStorage.getItem("token"),
                        Service: "nethos.system.captcha.generate"
                    };
                }else if(type === "save"){
                    options = {
                        captchaType: "SMS",
                        mobile: _this.phoneNum,
                        //token: localStorage.getItem("token"),
                        Service: "nethos.system.captcha.generate"
                    };
                }

                axiosUtil(options, function(data){
                    _this.isSend = false;
                    Message({
                        showClose: true,
                        message: "验证码发送成功!",
                        type: "success"
                    });
                    if(type === "next"){
                        _this.cid = data.obj;
                        _this.isShowConfirmTooltipNext = true;
                    }else{
                        _this.newCid = data.obj;
                        _this.isShowConfirmTooltip = true;
                    }
                    (function time(){// 倒计时
                        if(_this.remTime > 0){
                            _this.remTime = --_this.remTime;
                            setTimeout(time, 1000);
                        }else {
                            _this.remTime = 60;
                            if(type === "next"){
                                _this.isShowConfirmTooltipNext = false;
                            }else {
                                _this.isShowConfirmTooltip = false;
                            }
                            return;
                        }
                    })();
                }, function(){
                    _this.isSend = false;
                });
            },
            nextStep: function(){// 下一步
                let _this = this;
                if(!_this.captcha){
                    Message({
                       showClose: true,
                       message: "验证码不能为空！",
                       type: "info"
                    });
                    return;
                }else if(!_this.cid){
                    Message({
                       showClose: true,
                       message: "请重新获取验证码！",
                       type: "info"
                    });
                    return;
                }
                _this.isNext = true;
                let options = {
                    captcha: _this.captcha,
                    mobile: _this.oldPhoneNum,
                    cid: _this.cid,
                    Service: "nethos.system.captcha.checkcaptcha"
                };
                axiosUtil(options, function(){// 手机验证码验证成功
                    _this.isNext = false;
                    _this.showNext = true;// 显示下一步页面
                }, function(){
                    _this.isNext = false;
                })
            },
        	bindPhone:function(){// 保存
                let _this = this;
                if(!_this.phoneNum){
                    Message({
                       showClose: true,
                       message: "请输入需要绑定的手机号",
                       type: "info"
                    });
                    return;
                }
        		this.isSubmit = true;
        		let options = {
                    captcha: _this.newCaptcha,
                    mobile: _this.phoneNum,
                    cid: _this.newCid,
                    Service: "nethos.system.captcha.checkcaptcha"
                };
        		axiosUtil(options, function () {// 手机验证码验证成功
                    let _options = {
                        cid: _this.cid,
                        captcha: _this.captcha,
                        newCid: _this.newCid,
                        newCaptcha: _this.newCaptcha,
                        token:localStorage.getItem("token"),
                        Service: "nethos.doc.mobile.modify",
                    };
                    axiosUtil(_options, function(data){
                        _this.isSubmit = false;
                        let userInfo = JSON.parse(localStorage.getItem("userInfo"));
                        userInfo.docMobile = _this.phoneNum;
                        localStorage.setItem("userInfo", JSON.stringify(userInfo));
                        _this.oldPhoneNum = _this.phoneNum;
                        _this.phoneNum = "";
                        Message({
                           showClose: true,
                           message: "保存成功！",
                           type: "success"
                        });
                    }, function () {
                        _this.showNext = false;// 退回上一步页面
                        _this.isSubmit = false;
                    });
                }, function(){
                    _this.isSubmit = false;
                });
        	}
        }
    }
</script>

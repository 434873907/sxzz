<!--设置修改密码页-->
<template>
    <div class=" marginL201 clearfix">
        <div class="login-title h50">
            <span></span>
            修改密码
        </div>
        <!--验证验证码-->
        <div v-if="!showNext" class="clearfix set-form-wrap marginT35">
            <el-form :model="formAlignRight" label-width="120px" class="fl w480">
                <el-form-item label="手机号码：" class="form-item overflow-hidden ">
                    <el-input
                            v-model="oldPhoneNum"
                            readonly
                            size="small"
                            class="form-input"
                            />
                </el-form-item>
                <el-form-item label="验证码：" class="form-item clearfix marginB15">
                    <div class="clearfix blue-btn-wrap">
                        <el-input
                                v-model.trim="captcha"
                                size="small"
                                class="form-input h24 w101"/>
                        <!--<img class="captcha-img h30 w80 fl" src=""  >-->
                        <el-button type="primary" size="small" :disabled="isSend" :class="[isSend?'gray-btn':'blue-btn', 'fl']" @click="getCaptcha" :loading="isSendCaptcha">获取手机验证码</el-button>
                        <span v-if="isSend" class="fontSize12 fl lineH30 marginL10">{{ remTime + '秒后可以重新获取' }}</span>
                        <!--<span class="captcha-span green-color fl" @click="changeCaptcha">看不清，换一张</span>-->
                    </div>
                    <!--<p class="gray-color tip-p">*请输入右侧图片中的字符</p>-->
                </el-form-item>
                <el-button type="primary" class="h36 w140 save-btn" @click="nextStep" :loading="isNext">下一步</el-button>
            </el-form>
        </div>
        <!--修改密码-->
        <div v-if="showNext" class="clearfix set-form-wrap marginT35">
            <el-form :model="formAlignRight" label-width="120px" class="fl w480">
                <el-form-item label="新密码：" class="form-item marginB15">
                    <div class="clearfix">
                        <el-input
                                type="password"
                                v-model="newPwd"
                                size="small"
                                @blur="confirmPwd"
                                class="form-input h24 w240"/>
                    </div>
                    <p class="gray-color tip-p">*8-20位字符，密码必须包含数字和字母</p>
                    <p class="fee-num tip-p" v-show="isShowFormatTooltip">*密码格式不符合要求</p>
                </el-form-item>
                <el-form-item label="确认新密码：" class="form-item marginB15">
                    <div class="clearfix">
                        <el-input
                                type="password"
                                v-model="confirmNwePwd"
                                size="small"
                                @blur="confirmPwd"
                                class="form-input h24 w240"/>
                    </div>
                    <p class="fee-num tip-p" v-show="isShowConfirmTooltip">*前后两次输入的新密码不一致</p>
                </el-form-item>
                <el-button type="primary" class="h36 w140 save-btn" @click="pwdSubmit" :loading="isSubmit">保存</el-button>
            </el-form>
        </div>
    </div>
</template>
<style>

</style>
<script>
    import axiosUtil from "../../utils/AxiosUtils.js"
    import { Message } from "element-ui";
    import { PWD_REG } from "../../data/RegRule";
    import { HOST_URL } from "../../data/Url.js";
    export default{
        data(){
            return{
                oldPhoneNum: JSON.parse(localStorage.getItem("userInfo")).docMobile?JSON.parse(localStorage.getItem("userInfo")).docMobile:"",
                showNext: false,// 显示下一步页面
                captcha: null,// 验证码
                oldPwd: "",// 旧密码
                newPwd: "",// 新密码
                confirmNwePwd: "",// 再次确认新密码
                isSendCaptcha: false,// 验证码是否发送成功
                isSend: false,// 是否发送验证码（60秒后才能重新发送）
                remTime: 60,// 离下次发送还有多少时间
                isSubmit: false,// 密码是否提交成功
                isNext: false,// 下一步按钮loading
                isShowConfirmTooltip: false,// 是否显示2次输入密码不对提示提示
                isShowFormatTooltip: false,// 是否显示密码格式错误提示
                cid: "",// 验证码的cid
            }
        },
        components:{
        },
        methods: {
            getCaptcha: function(){// 获取手机验证码
                let _this = this;
                _this.isSendCaptcha = true;
                let options = {
                    captchaType: "SMS",
                    mobile: JSON.parse(localStorage.getItem("userInfo")).docMobile,
                    //mobile: "13641984192",
                    token: localStorage.getItem("token"),
                    Service: "nethos.system.captcha.generate"
                };
                axiosUtil(options, function(data){
                    _this.isSendCaptcha = false;
                    Message({
                        showClose: true,
                        message: "验证码发送成功!",
                        type: "success"
                    });
                    _this.cid = data.obj;
                    _this.isSend = true;
                    (function time(){// 倒计时
                        if(_this.remTime > 0){
                            _this.remTime = --_this.remTime;
                            setTimeout(time, 1000);
                        }else {
                            _this.remTime = 60;
                            _this.isSend = false;
                            return;
                        }
                    })();
                }, function(){
                    _this.isSendCaptcha = false;
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
            confirmPwd: function(){// 密码验证
                if(PWD_REG.test(this.newPwd) || this.newPwd==""){// 验证密码格式
                    this.isShowFormatTooltip = false;// 密码格式正确(如果为空则也不显示提示)
                    if(this.newPwd!=""&&this.confirmNwePwd!=""){// 如果2次密码输入的都不为空
                        if(this.newPwd!==this.confirmNwePwd){// 如果两次输入的密码不一致
                            this.isShowConfirmTooltip = true;
                        }else {
                            this.isShowConfirmTooltip = false;
                        }
                    }else {

                        this.isShowConfirmTooltip = false;
                    }
                }else {
                    this.isShowFormatTooltip = true;// 密码格式不正确
                }
            },
            pwdSubmit: function(){// 提交保存密码
                if(this.newPwd!==""&&this.confirmNwePwd!==""){// 密码不为空
                    if(this.newPwd!==this.confirmNwePwd){
                        this.isShowTooltip = false;
                        return;
                    }
                }else {
                    Message({
                        showClose: true,
                        message: "密码不能为空!",
                        type: "info"
                    });
                    return;
                }
                this.confirmPwd();// 密码验证
                if(!this.isShowFormatTooltip&&!this.isShowConfirmTooltip){// 如果密码输入的格式正确并且两次输入的密码一致
                    let _this = this;
                    _this.isSubmit = true;
                    /*加密*/
                    let shaObj = new jsSHA("SHA-512", "TEXT");
                    let newPwd = _this.newPwd;//
                    //let oldPwd = _this.oldPwd;

                    shaObj.update(hex_md5(newPwd) + newPwd);
                    let docNewPassword = shaObj.getHash("HEX");
                    //shaObj.update(hex_md5(oldPwd) + oldPwd);
                    //let docPassword = shaObj.getHash("HEX");

                    let options = {
                        docNewPassword: docNewPassword,// 新密码
                        //docMobile: JSON.parse(localStorage.getItem("userInfo")).docMobile,
                        captcha: _this.captcha,
                        cid: _this.cid,
                        token: localStorage.getItem("token"),
                        Service: "nethos.doc.password.modify.v2"
                    };
                    axiosUtil(options, function(data){
                        _this.isSubmit = false;
                        Message({
                            showClose: true,
                            message: "密码修改成功,将跳转到登录页面!",
                            type: "success"
                        });
                        setTimeout(function(){
                            let options = {
                                token: localStorage.getItem("token"),
                                Service: "nethos.pat.logout"
                            };
                            axiosUtil(options, function(){
                                window.location = HOST_URL + "/html/loginRegister/login/login.html#doc";
                                localStorage.removeItem("docId");
                                localStorage.removeItem("userInfo");
                                localStorage.removeItem("token");
                                _this.$store.dispatch("changeSideItem", "rwzx");
                            });
                        }, 1000);
                    }, function(){
                        _this.isSubmit = false;
                    });
                }else {
                    Message({
                        showClose: true,
                        message: "密码格式错误或者两次输入的密码不一致!",
                        type: "info"
                    });
                }
            }
        }
    }
</script>

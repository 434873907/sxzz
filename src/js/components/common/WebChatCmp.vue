<!--图文咨询聊天组件-->
<template>
    <div class="webchat-wrap">
        <ImageAmplify/>
        <div class="webchat-top h180" v-scroll-bottom="messages" >
            <ul class="session-list" v-if="messages?true:false">
                <!--replierType医生和医助端不一样-->
                <li v-for="item in messages" :class="{self: item.replierId===userId&&item.replierType==='ASS'}">
                    <p  :class="[small?'fontSize12':' ', 'session-time']">
                        <!--replierType医生和医助端不一样-->
                        <span>{{ item.replierId===userId&&item.replierType==="ASS" ? "我" : item.replierName }}</span>
                        <span>{{formatUnix(item.replyTime)}}</span>
                    </p>
                    <div class="text-wrap marginT10 marginB10 clearfix">
                        <div v-if="item.replyContent" :class="[small?'fontSize12':' ', 'text']">
                            {{ item.replyContent }}
                        </div>
                        <!--replierType医生和医助端不一样-->
                        <div v-if="item.attaList.length!=0" v-for="(imgItem,index) in item.attaList" :class="[item.replierId===userId&&item.replierType==='ASS'?'fr':'' ,'w50', 'h50', 'img-wrap' ]">
                            <img :src="imgItem.url" alt="" @click="handleImageAmplify(index, item.attaList, $event)" class="img-item">
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <div class="webchat-bottom h131" >
            <div class="chat-tool-bar h40 blue-btn-wrap">
               <!-- <span class="send-pic-btn fl" ></span>
                <span v-if="isSendPic" class="fl marginL10 lineH40">正在发送图片......</span>-->
                <el-button v-if="!small" :disabled="isEnd||endConsult" type="primary" size="mini" :class="[isEnd||endConsult?'gray-btn':'blue-btn', 'complete-btn', 'w95', 'fontSize12']" @click="linkToRegistrationCmp">预约挂号</el-button>
                <el-button v-if="!small" :disabled="isEnd||endConsult" type="primary" size="mini" :class="[isEnd||endConsult?'gray-btn':'blue-btn', 'complete-btn', 'w95', 'fontSize12']">推荐医生</el-button>
                <el-button v-if="!small" :disabled="isEnd||endConsult" type="primary" size="mini" :class="[isEnd||endConsult?'gray-btn':'blue-btn', 'complete-btn', 'w95', 'fontSize12']" @click="completeConsult" :loading="isComplete">结束分诊</el-button>
            </div>
            <textarea v-model="inputValue" :disabled="isEnd||endConsult" @keyup="onKeydown" class="chat-input h30 clearfix"/>
            <div class="clearfix send-btn-wrap blue-btn-wrap">
                <el-button type="primary" :disabled="isEnd||endConsult" :class="[isEnd||endConsult?'gray-btn':'blue-btn', 'chat-send-btn', 'h30', 'marginR10', 'fr']" @click="sendMsg">
                    发送
                </el-button>
                <el-button type="primary" :disabled="isEnd||endConsult" :class="[isEnd||endConsult?'gray-btn':'blue-btn','chat-send-btn', 'h30', 'marginR10', 'fr']" :loading="isSendPic">
                    发送图片
                    <input type="file" v-if="!isEnd&&!endConsult" class="send-pic-input" accept="image/gif,image/jpg,image/jpeg,image/png" @change="sendPic">
                </el-button>
                <el-select v-model="quickReplyValue" v-if="!small" :disabled="isEnd||endConsult" placeholder="快速回复" @change="selectChange" size="small" class="marginR10 fr">
                    <el-option label="您好！请问有什么问题？" value="您好！请问有什么问题？"/>
                    <el-option label="可以多喝点水，不要感冒" value="可以多喝点水，不要感冒"/>
                    <el-option label="您有期望预约的医生吗？希望安排在什么时候？" value="3、您有期望预约的医生吗？希望安排在什么时候？"/>
                    <el-option label="期望您得到有效诊疗，祝您早日康复。" value="期望您得到有效诊疗，祝您早日康复。"/>
                    <el-option label="感谢您的耐心等待。" value="感谢您的耐心等待。"/>
                    <el-option label="我中心正在为您安排协调相应专科医生，请耐心等待。" value="我中心正在为您安排协调相应专科医生，请耐心等待。"/>
                    <el-option label="您以前身体好吗？" value="您以前身体好吗？"/>
                </el-select>
            </div>
        </div>
    </div>
</template>
<style>

</style>
<script>
    import axiosUtil from "../../utils/AxiosUtils.js"
    import { Message,MessageBox } from "element-ui";
    import { formatUnixTime,formatTimeStamp } from "../../utils/DateFormat.js";
    import ImageAmplify from "./ImageAmplify.vue";
    import {imageAmplify} from "../../utils/ImageAmplify.js";
    export default{
         data: function(){
             return {
                 inputValue: "",//聊天框输入内容
                 quickReplyValue: "",
                 userId: JSON.parse(localStorage.getItem("userInfo")).docId,//当前登录用户id
                 isComplete: false,//是否完成咨询
                 isSendPic: false,//是否发送图片成功
                 //messages: [],//对话列表内容
                 //timeOut: null,//计时器
                 imgSrc: "",//发送图片的src

                 isFirstSend: false,//是否是第一次发送消息，用于判断是否要给给父组件提示
             }
        },
        props: {
            small: {//是否是小聊天窗口
                default: false
            },
            consultId: {//会诊单编号
                required: true
            },
            type: {//区别会诊聊天还是问诊聊天回复：会诊group   问诊info
                required: true,
            },
            consultDetail: {//获取会诊单详情
                default: ""
            }
        },
        directives: {
            scrollBottom: {//有信息更新时滚动到底部
                componentUpdated: function (el) {
                    el.scrollTop = el.scrollHeight - el.clientHeight;
                }
            }
        },
        watch: {
             "$route": "getMsg"
        },
        created: function(){
            /*let _this = this;
            function getMsg(){
                let options = {
                    consultId: _this.consultId,
                    token: localStorage.getItem("token"),
                    Service: "nethos.consult.message.list"
                };
                axiosUtil(options, function(data){
                    //_this.$store.dispatch("sendMessage", data.list);
                    if(data.list.length === 0){//未发送过消息
                        _this.isFirstSend = true;
                    }
                    if(data.list.length !== _this.messages.length){//如果消息没有更新则不重新赋值messages
                        _this.messages = data.list;
                    }
                });
            }
            getMsg();//创建时获取一次，否则如果是取消或完成状态会清除计时器无法获取聊天记录
            _this.timeOut = setInterval(getMsg,500);*/
            this.getMsg();
        },
        beforeDestroy: function(){//组件销毁前清除计时器
            /*if(this.timeOut){
                clearTimeout(this.timeOut);
                console.log("清除计时器");
                this.timeOut = null;
            }*/
            this.$store.dispatch("getPushPointConsultIdArr", "");// 初始化当前正在聊天的id为空，
        },
        components: {
            ImageAmplify,
        },
        computed: {
            messages: function() {//对话列表内容
                return this.$store.state.messageList;
            },
            isMyself: function () {

            },
            consultStatus: function () {//会诊单状态
                if(this.consultDetail){
                    return this.consultDetail.consult.consultStatus;
                }else {
                    return "";
                }
            },
            isEnd: function () {//判断是否结束图文咨询
                let status = this.consultStatus=='CANCEL'||this.consultStatus=='NEEDCOMMENT'||this.consultStatus=='FINSH';
                /*if(status==true){
                    if(this.timeOut){
                        clearTimeout(this.timeOut);
                        console.log("清除计时器");
                        this.timeOut = null;
                    }
                }*/
                return status;
            },
            endConsult: function() {//动态检查患者是否结束
                return this.$store.state.endConsultId==this.consultId;
            }
        },
        methods: {
            formatUnix: function(time){//格式化时间格式
                if(time){
                    return formatUnixTime(time, "MM-dd HH:mm");
                }else{
                    return "";
                }
            },
            handleImageAmplify:function(index=0,imgList=[], ev){//放大图片
            	let e = ev || event;
                let element = e.target || e.srcElement;
                let src = element.src;
                let obj = {
                    imgList: [],
                    index: index
                };
                this.$store.dispatch("getAmplifyImageArr", obj);// 储存需要放大的数组，用于左右按钮切换
              	imageAmplify(src);
            },
            sendMsg: function(){//发送消息
                if(this.inputValue !=""){
                    let _this = this;
                    let content = {
                        replyContent: this.inputValue,
                        consultId: this.consultId,
                        type: this.type
                    };
                    let options = {
                        consultId: content.consultId,
                        replyContent: content.replyContent,
                        token: localStorage.getItem("token"),
                        Service: "nethos.consult." + content.type + ".reply"
                    };
                    axiosUtil(options, function(data){
                        if(_this.isFirstSend){
                            _this.$emit("firstSend");
                            _this.isFirstSend = false;
                        }
                        _this.$store.dispatch("getMsgList", content.consultId);
                    });
                    this.inputValue = "";//清空输入框
                    //this.getMsg();
                }else if(this.inputValue ==""){
                    Message({
                        showClose: true,
                        message: "输入消息不能为空！",
                        type: "info"
                    });
                }
            },
            getMsg: function(){//从服务器获取消息
                /*let _this = this;
                let options = {
                    consultId: _this.consultId,
                    token: localStorage.getItem("token"),
                    Service: "nethos.consult.message.list"
                };
                axiosUtil(options, function(data){
                    console.log("更新msgList");
                    //_this.$store.dispatch("sendMessage", data.list);
                    _this.messages = data.list;
                    if(data.list.length===0){//判断是否是第一次发送
                        _this.isFirstSend = true;
                    }
                });*/
                this.$store.dispatch("removePushPointConsultIdArr", this.consultId);
                this.$store.dispatch("getPushMsgConsultId", this.consultId);// 发送当前回话id，用与和推送时候判断
                this.$store.dispatch("getMsgList", this.consultId);
            },
            onKeydown: function(ev){//按下回车发送消息
                let e = ev || event;
                if(e.keyCode===13 || e.which==13){
                   if(e.preventDefault){
                        e.preventDefault();
                        e.stopPropagation();
                    }else {
                        e.cancelBubble = true;//停止冒泡
                        e.returnValue = false;//阻止事件的默认行为
                    }
                    this.sendMsg();
                }
            },
            selectChange: function(value){//快速回复
                this.inputValue = value;
            },
            sendPic: function(e){//发送图片
                let _this = this;//传递this,确保下方闭包函数this正确
                if(typeof FileReader === 'undefined'){
                    alert( "抱歉，你的浏览器版本过低，请升级浏览器或更换其它浏览器！");
                }
                let file = e.target.files[0];
                if(!/image\/\w+/.test(file.type)){
                    alert("请确保文件为图像类型");
                    return false;
                }
                let fileName = file.name;
                let reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = function(){
                    e.target.value = "";
                    _this.imgSrc = this.result;
                    _this.isSendPic = true;
                    let options = {
                        base64: this.result,
                        originalName: fileName,
                        Service: "nethos.system.atta.upload.image.base64"
                    };
                    axiosUtil(options, function(data){//上传图片
                        let type = _this.type;
                        let _options = {
                            consultId: _this.consultId,
                            attaIdList: [
                                data.obj.attaId,
                            ],
                            token: localStorage.getItem("token"),
                            Service: "nethos.consult." + type + ".reply"
                        };
                        axiosUtil(_options, function(data){//发送图片
                            if(_this.isFirstSend){
                                _this.$emit("firstSend");
                                _this.isFirstSend = false;
                            }
                            _this.$store.dispatch("getMsgList", _this.consultId);
                            _this.isSendPic = false;
                        }, function () {
                            _this.isSendPic = false;
                        });
                    }, function () {
                        _this.isSendPic = false;
                    });
                }

            },
            completeConsult: function(){
                let _this = this;
                MessageBox.confirm('确认结束分诊?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    _this.isComplete = true;
                    let options = {
                        consultId: _this.consultId,
                        token: localStorage.getItem("token"),
                        Service: "nethos.consult.info.complete"
                    };
                    axiosUtil(options, function(data){
                        _this.isComplete = false;
                        Message({
                            showClose: true,
                            message: "提交成功！",
                            type: "success"
                        });
                        _this.$store.dispatch("isGetNewMsg_qkfz_ywc", true);
                        _this.$store.dispatch("getEndConsultId", _this.consultId);//发送已完成会诊单id
                    }, function(){
                        _this.isComplete = false;
                    });
                }).catch(() => {

                });
            },
            linkToRegistrationCmp: function() {// 预约挂号
                this.$router.push({name: "registrationCmp"});
            }
        }

    }
</script>

<template>
    <div class="my-avatar marginL201 clearfix">
        <div class="login-title h50">
            <span></span>
            我的头像
        </div>
        <div class="avatar-content">
            <div class="avatar-upload-wrap">
                <h3 class="marginB20">选择上传方式</h3>
                <div class="avatar-btn-wrap marginB15">
                    <input type="file" value="本地上传" accept="image/gif,image/jpg,image/jpeg,image/png" @change="fileReader" name="fileInput" class="pic-file-input w101 h34 "/>
                    <button class="upload-avatar-btn w101 h34 upload-avatar">本地上传</button>
                    <p class="marginT15">仅支持JPG、GIF、PNG格式，文件小于5M。（使用高质量图片，可生成高清头像）</p>
                </div>
                <el-checkbox v-model="checked" checked>上传原始图片，生成高清头像</el-checkbox>
            </div>
            <div class="clearfix">
                <div class="show-avatar-l fl" >
                    <div class="show-avatar-wrap w300 h300 fontSize12" v-if="!src">
                        <p class="show-wrap-title center  fontSize14 marginT120 marginB10">选择您要上传头像的样式</p>
                        <p class="marginL20 gray-color lineH22">本地照片：选择一张本地的图片编辑后上传为头像</p>
                        <p class="marginL20 gray-color lineH22">拍照上传：通过摄像头拍照编辑后上传为头像</p>
                    </div>
                    <div class="canvas-wrap  w300 h300" v-else>
                        <img ref="originalImg" class="avatar-show-img avatar-center" :src="src" >
                        <!--剪切窗口-->
                        <!--<div class="mask w250 h250" ref="mask">
                            <div class="left-top" id="leftTop" @mousedown="changeSize"></div>
                            <div class="right-top" id="rightTop" @mousedown="changeSize"></div>
                            <div class="right-bottom" id="rightBottom" @mousedown="changeSize"></div>
                            <div class="left-bottom" id="leftBottom" @mousedown="changeSize"></div>
                        </div>-->
                    </div>
                </div>
                <div class="show-avatar-r fl">
                    <div class="w300 h300">
                        <p class="show-wrap-title  fontSize14 h72 lineH22 marginB30">您上传的图片将会自动生成三种尺寸头像，请注意中小尺寸的头像是否清晰。</p>
                        <div class="clearfix">
                            <div class="h260 fl">
                                <div class="w180 h180 circle">
                                    <img :src="src" class="avatar-img-180 avatar-center">
                                </div>
                                <canvas class="canvas" ref="canvas" v-show="false"></canvas>
                                <p class="fontSize14 gray-color center">大尺寸头像，180*180像素</p>
                            </div>
                            <div class="h260 fl marginL50">
                                <div class="w70 marginB15">
                                    <div class="w50 h50 marginL10 circle">
                                        <img :src="src" class="avatar-img-50 avatar-center">
                                    </div>
                                    <p class="fontSize12 gray-color center">中尺寸头像50*50像素(自动生成)</p>
                                </div>
                                <div class="w70">
                                    <div class="w30 h30 marginL20">
                                        <img :src="src" class="avatar-img-20 avatar-center">
                                    </div>
                                    <p class="fontSize12 gray-color center">小尺寸头像30*30像素(自动生成)</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class=" blue-btn-wrap">
                <el-button type="primary" class="avatar-save-btn blue-btn h36 w200 marginT32 marginB30" @click="saveAvatar" :loading="isSubmit">
                    保存
                </el-button>
            </div>
        </div>
    </div>
</template>
<style>
</style>
<script>
    import * as DragUtils from "../../utils/DragUtils.js"
    import axiosUtil from "../../utils/AxiosUtils.js"
    import { Message, Loading } from "element-ui";
    import Vue from "vue";
    Vue.use(Loading);
    export default{
        data(){
            return{
                isSubmit: false,//头像是否保存成功
                checked: true,//+是否上传原图
                src: JSON.parse(localStorage.getItem("userInfo")).docAvatar?JSON.parse(localStorage.getItem("userInfo")).docAvatar:require("../../../images/icon-avatar.png"),//上传头像不同尺寸预览的src地址
                imgSrc: "",//上传头像原图预览地址
                originalName: "",//上传的图片文件名，（接口需要）
                dragLeft: 25,//拖动的offsetLeft
                dragTop: 0,//拖动的offsetTop
                dragWidth: 250,//截取框拖动后的宽度，默认250
                dragHeight: 250,//截取框拖动后的高度，默认250
                isChangeSize: false,//是否正在更改选取框尺寸
            }
        },
        computed: {
            imgUrl: function(){
                return this.imgSrc;
            }
        },

        updated: function(){
             /*使用canvas进行截图*/
            /*if(this.$refs.canvas && this.$refs.originalImg && this.$refs.mask){
                let _this = this;
                let canvas = this.$refs.canvas;
                let originalImg = this.$refs.originalImg;
                let mask = this.$refs.mask;
                let context = canvas.getContext("2d");
                context.fillStyle = "#fff";//画布背景设为白色
                //获取img元素宽高，计算宽高比
                let imgW = originalImg.width;
                let imgH = originalImg.height;
                let scale = imgW / imgH;//宽高比
                //设置canvas宽高
                let maskW = this.dragWidth;
                //let maskH = parseInt(maskW / scale);
                let maskH = this.dragWidth;
                let canvasW = canvas.width = 250;
                let canvasH = canvas.height = 250;

                mask.style.width = maskW + "px";
                mask.style.height = maskH + "px";
                //获取真实图片大小尺寸，canvas根据的是真实尺寸不是originalImg元素的宽高
                let img = new Image();
                img.src = this.imgSrc;
                let realImgH = img.height;
                let realImgW = img.width;
                //计算img元素尺寸和真实图片尺寸比例,用于绘图计算
                let tScaleW = realImgW / imgW;
                let tScaleH = realImgH / imgH;
                //canvas偏移量，用于拖动选取框时候计算
                let maskX = this.dragLeft;
                let maskY = this.dragTop;
                //把图片绘制到canvas，并转为base64格式并压缩0.7，赋值给this.src
                context.drawImage(img, maskX * tScaleW , maskY * tScaleH, maskW * tScaleW, maskH * tScaleH, 0, 0, canvasW, canvasH);
                let newSrc = canvas.toDataURL("image/jpeg", 1);//
                this.src = newSrc;
                /!*拖动选取框*!/
                DragUtils.drag(mask, false, originalImg, function(left, top){
                    mask.style.left = left+'px';//移动mask
                    mask.style.top = top+'px';
                    _this.dragLeft = left;//更新mask所在位置数据
                    _this.dragTop = top;//
                });
            }*/
        },
        methods: {
            fileReader: function(e){//读取上传的图片
                let _this = this;//传递this,确保下方闭包函数this正确
                if(typeof FileReader === 'undefined'){
                   alert( "抱歉，你的浏览器版本过低，请升级浏览器或更换其它浏览器！");
                }
                let file = e.target.files[0];
                if(!/image\/\w+/.test(file.type)){
                    alert("请确保文件为图像类型");
                    return false;
                }
                _this.originalName = file.name;
                let reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = function(e){
                    _this.src = this.result;
                    _this.imgSrc = this.result;
                }
            },
            changeSize: function(e){//更改选取框尺寸
                /*this.isChangeSize = true;
                e.preventDefault();
                e.target.ondragstart=function(){return false};//阻止冒泡
                let mask = this.$refs.mask
                let originalImg = this.$refs.originalImg;
                DragUtils.changeSize(e.target, mask, originalImg);*/

            },
            saveAvatar: function () {//保存头像
                let _this = this;//传递this,确保下方闭包函数this正确
                _this.isSubmit = true;
                let options = {
                    base64: this.src,
                    originalName: _this.originalName,
                    Service: "nethos.system.atta.upload.image.base64"
                };
                axiosUtil(options, function(data){//上传图片
                    let options = {
                        docId: JSON.parse(localStorage.getItem("userInfo")).docId,
                        docAvatar: data.obj.attaId,
                        token: localStorage.getItem("token"),
                        Service: "nethos.doc.info.modify"
                    };
                    axiosUtil(options, function(data){
                        _this.isSubmit = false;
                        let userInfo = JSON.parse(localStorage.getItem("userInfo"));
                        userInfo.docAvatar = data.obj.docAvatar;
                        localStorage.setItem("userInfo", JSON.stringify(userInfo));
                        Message({
                           showClose: true,
                           message: "保存成功！",
                           type: "success"
                        });
                    }, function () {
                        _this.isSubmit = false;
                    });
                }, function(){
                    _this.isSubmit = false;
                });
            }
        },
    }
</script>

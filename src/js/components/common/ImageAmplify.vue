<template>
    <div class="popWhole">
        <div class="popImage" @click="handleCloseImg"></div>
        <img src="" class="popDisplayPicture" @mousewheel="bigImg" ref="wheelImg"/>
        <i class="el-icon-close my-unique-close" @click="handleCloseImg"></i>
        <div class="director-image marginB5" v-if="isShow">
            <span class="director-span hover-cursor" @click="preImg">&lt;</span>
            <span class="director-span marginL20 hover-cursor" @click="nextImg">&gt;</span>
        </div>
    </div>
</template>
<style>

</style>
<script>
    import { closeImg } from "../../utils/ImageAmplify.js";
    import { imageAmplify } from "../../utils/ImageAmplify.js";
    export default{
        data: function(){
            return {
                index: null,
                isShow: true,// 是否显示切换图片按钮
            }
        },
        computed: {
           imageAmplifyObj: function(){// 获取需要放大的图片数组对象(包含当前点击的图片需要)
               return this.$store.state.imageAmplifyObj;
           }
        },
        watch: {
             "imageAmplifyObj": function(){
                 if(this.imageAmplifyObj.imgList.length > 1){
                     this.isShow = true;// 重新初始化, 有图片数组且多于一张则显示切换按钮
                 }else {
                     this.isShow = false;
                 }
                this.index =  this.imageAmplifyObj.index;
             }
        },
        methods: {
            handleCloseImg: function(){//关闭放大图片
                closeImg();
            },
            bigImg: function(e){// 滚轮放大缩小图片
                let ev = e || window.event;
                let o = this.$refs.wheelImg;
                let zoom = parseInt(o.style.zoom, 10) || 100;
                zoom += ev.wheelDelta / 12;
                if (zoom > 0) o.style.zoom = zoom + '%';
                return false;
            },
            preImg: function(){// 前一张图片
                if(this.index === null){// 如果index未初始化
                    this.index = this.imageAmplifyObj.index;
                }
                if(this.index + 1 === 1){// 表示第一张, 不操作
                    console.log("已经是第一张");
                    return;
                }
                this.index -= 1;
                console.log("index: " + this.index);
                let imageSrc = this.imageAmplifyObj.imgList[this.index].url;
                imageAmplify(imageSrc);
            },
            nextImg: function(){// 后一张图片
                if(this.index === null){// 如果index未初始化
                    this.index = this.imageAmplifyObj.index;
                }
                let length = this.imageAmplifyObj.imgList.length;
                if(this.index + 1 >= length ){// 已经是最后一张最后一张
                    console.log("已经是最后一张");
                    return;
                }
                this.index += 1;
                console.log("index: " + this.index);
                let imageSrc = this.imageAmplifyObj.imgList[this.index].url;
                imageAmplify(imageSrc);
            }
        }
    }
</script>

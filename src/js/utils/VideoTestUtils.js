/**
 * Created by Administrator on 2017/5/25.
 */
/**
 * 本地视频环境测试
 * video: video元素
 */
import { Message } from "element-ui";
export function showTestVideo(video){
    console.log("video");
    console.log(video);
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
    navigator.getUserMedia({
        video: true,
        audio: true
    }, function(stream){
        video.src = window.URL.createObjectURL(stream);
        video.play();
    }, function(error){
        Message({
           showClose: true,
           message: error.name || error,
           type: "error"
       });
    })
}

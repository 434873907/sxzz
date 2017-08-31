/**
 * 推送事件处理工具
 */

import { Notification } from "element-ui";
import { formatUnixTime } from "./DateFormat";
import axiosUtil from "./AxiosUtils.js"
export default function pushEvent(vue, recData){
    let currentSideItem = vue.$store.state.clickName;// 当前所在侧边栏
    let data = JSON.parse(recData);
    if(data.type !== "B10") {// 会诊聊天推送不放到消息盒子中
        vue.$store.dispatch("changeMsgBoxListCounts", true);// 消息盒子未读数+1
    }
    switch (data.type){
        /**
         * 助端问诊推送
         */
        case "A1": // 发布问诊推送
            if(data.consultType == "PIC"){// qkfz
                vue.$store.dispatch("isGetNewMsg_qkfz_dcl", true);
                if(currentSideItem != "twzx"){// 当前不在图文咨询模块，则侧边栏亮红点
                    vue.$store.dispatch("isGetNewMsg_qkfz", true);
                }
                Notification.info(
                    {
                        title: data.alertTitle,
                        message: data.alertBody,
                        time: formatUnixTime(data.pushTime,"HH:mm"),
                        onClick: function() {
                            let options = {
                                consultId: data.consultId,
                                token: localStorage.getItem("token"),
                                Service: "nethos.consult.info.grab"
                            };
                            axiosUtil(options, function(){
                                vue.$store.dispatch("getSideBarTitle", "待处理(我的)");// 侧边栏列表 顶部标题
                                vue.$store.dispatch("getCurrentPosition", "qkfz_dcl");//  获取相应侧边栏患者列表
                                vue.$router.push({ name: "pictureToTreat", params: { consultId: data.consultId }});
                            });
                        }
                    }
                );
            }else if(data.consultType == "VIDEO"){// 发布名医视频
                vue.$store.dispatch("isGetNewMsg_mysp_dcl", true);
                if(currentSideItem != "spwz"){
                    vue.$store.dispatch("isGetNewMsg_mysp", true);
                }
                Notification.info(
                    {
                        title: data.alertTitle,
                        message: data.alertBody,
                        time: formatUnixTime(data.pushTime,"HH:mm"),
                        onClick: function() {
                            let options = {
                                consultId: data.consultId,
                                token: localStorage.getItem("token"),
                                Service: "nethos.consult.info.grab"
                            };
                            axiosUtil(options, function(){
                                vue.$store.dispatch("getSideBarTitle", "待处理(我的)");
                                vue.$store.dispatch("getCurrentPosition", "mysp_dcl");
                                vue.$router.push({ name: "videoEntry", params: { consultId: data.consultId }} );
                            });
                        }
                    }
                );
            }
            break;
        case "A3": // 患者补充了资料推送
            if(data.consultType == "VIDEO"){//名医视频补充资料
                if(data.consultTime) {
                    vue.$store.dispatch("isGetNewMsg_mysp_dwz", true);
                }else {
                    vue.$store.dispatch("isGetNewMsg_mysp_clz", true);
                }
                if(currentSideItem != "spwz"){
                    vue.$store.dispatch("isGetNewMsg_mysp", true);
                }
                Notification.info(
                    {
                        title: data.alertTitle,
                        message: data.alertBody,
                        time: formatUnixTime(data.pushTime,"HH:mm"),
                        onClick: function() {
                            if(data.consultId == vue.$route.params.consultId){// 当前页面正好在需要跳转的页面，则重新刷新
                                vue.$store.dispatch("getRefreshConsultId", data.consultId);
                            }
                            if(data.consultTime) {
                                vue.$store.dispatch("getSideBarTitle", "待问诊");
                                vue.$store.dispatch("getCurrentPosition", "mysp_dwz");
                            }else {
                                vue.$store.dispatch("getSideBarTitle", "待处理(我的)");
                                vue.$store.dispatch("getCurrentPosition", "mysp_dcl");
                            }
                            vue.$router.push({ name: "videoEntry", params: { consultId: data.consultId }} );
                        }
                    }
                );
            }
            break;
        case "A4": // 回复问诊
            if(data.consultType == "PIC"){//qkfz
                vue.$store.dispatch("isGetNewMsg_qkfz_clz", true);// 处理中tab加红点
                if(vue.$store.state.pushMsgConsultId == data.consultId){// 用于判断当前聊天窗id是否和推送id一直
                    vue.$store.dispatch("getMsgList", data.consultId);
                }else {// 如果不在当前聊天窗则增加红点
                    vue.$store.dispatch("getPushPointConsultIdArr",data.consultId);
                }
                if(currentSideItem != "twzx"){// 判断侧边栏是否需要红点（如果当前侧边栏和推送一致则不需要）
                    vue.$store.dispatch("isGetNewMsg_qkfz", true);
                }
                /*Notification.info(
                    {
                        title: data.alertTitle,
                        message: data.alertBody,
                        time: formatUnixTime(data.pushTime,"HH:mm"),
                        onClick: function() {
                            vue.$router.push({ name: "pictureToTreat", params: { consultId: data.consultId }});
                        }
                    }
                );*/
            }
            break;
        case "A5": // 完成问诊
            if(data.consultType == "PIC"){// qkfz
                vue.$store.dispatch("isGetNewMsg_qkfz_ywc", true);// 显示红点
                vue.$store.dispatch("getEndConsultId", data.consultId);//发送已完成会诊单id
                if(currentSideItem != "twzx"){
                    vue.$store.dispatch("isGetNewMsg_qkfz", true);
                }
                Notification.info(
                    {
                        title: data.alertTitle,
                        message: data.alertBody,
                        time: formatUnixTime(data.pushTime,"HH:mm"),
                        duration: 4000,
                        onClick: function() {
                            vue.$store.dispatch("getSideBarTitle", "已完成");
                            vue.$store.dispatch("getCurrentPosition", "qkfz_ywc");
                            vue.$router.push({ name: "pictureToTreat", params: { consultId: data.consultId }});
                        }
                    }
                );
            }else if(data.consultType == "VIDEO"){// 名医视频
                vue.$store.dispatch("isGetNewMsg_mysp_ywc", true);
                vue.$store.dispatch("getEndConsultId", data.consultId);//发送已完成会诊单id
                if(currentSideItem != "spwz"){
                    vue.$store.dispatch("isGetNewMsg_mysp", true);
                }
                Notification.info(
                    {
                        title: data.alertTitle,
                        message: data.alertBody,
                        time: formatUnixTime(data.pushTime,"HH:mm"),
                        duration: 4000,
                        onClick: function() {
                            vue.$store.dispatch("getSideBarTitle", "已完成");
                            vue.$store.dispatch("getCurrentPosition", "mysp_ywc");
                            vue.$router.push({ name: "videoAdvisoryOpinion", params: { consultId: data.consultId }} );
                        }
                    }
                );
            }
            break;
        case "A7": // 邀请视频
            if(data.consultType == "VIDEO"){//视频咨询
                vue.$store.dispatch("isGetNewMsg_yqys", true);
                Notification.info(
                    {
                        title: data.alertTitle,
                        message: data.alertBody,
                        time: formatUnixTime(data.pushTime,"HH:mm"),
                        duration: 4000,
                        onClick: function() {
                            console.log(data.alertBody);
                        }
                    }
                );
            }
            break;
        case "A8": // 取消问诊
            if(data.consultType == "PIC"){// qkfz
                vue.$store.dispatch("isGetNewMsg_qkfz_yqx", true);
                vue.$store.dispatch("getEndConsultId", data.consultId);//发送已取消会诊单id, 使聊天界面按钮变灰
                if(currentSideItem != "twzx"){
                    vue.$store.dispatch("isGetNewMsg_qkfz", true);
                }
                Notification.info(
                    {
                        title: data.alertTitle,
                        message: data.alertBody,
                        time: formatUnixTime(data.pushTime,"HH:mm"),
                        duration: 4000,
                        onClick: function() {
                            vue.$store.dispatch("getSideBarTitle", "已取消");
                            vue.$store.dispatch("getCurrentPosition", "qkfz_yqx");
                            vue.$router.push({ name: "pictureToTreat", params: { consultId: data.consultId }});
                        }
                    }
                );
            }else if(data.consultType == "VIDEO"){// 名医视频
                vue.$store.dispatch("isGetNewMsg_mysp_yqx", true);
                if(currentSideItem != "spwz"){
                    vue.$store.dispatch("isGetNewMsg_mysp", true);
                }
                Notification.info(
                    {
                        title: data.alertTitle,
                        message: data.alertBody,
                        time: formatUnixTime(data.pushTime,"HH:mm"),
                        duration: 4000,
                        onClick: function() {
                            vue.$store.dispatch("getSideBarTitle", "已取消");
                            vue.$store.dispatch("getCurrentPosition", "mysp_yqx");
                            vue.$router.push({ name: "videoAdvisoryOpinion", params: { consultId: data.consultId }} );
                        }
                    }
                );
            }
            break;
        case "A11": // 视频问诊开始提醒推送
            Notification.info(
                {
                    title: data.alertTitle,
                    message: data.alertBody,
                    time: formatUnixTime(data.pushTime,"HH:mm"),
                    duration: 4000,
                    onClick: function() {
                        vue.$router.push({ name: "videoEntry", params: { consultId: data.consultId }} );
                    }
                }
            );
            break;
        /**
         * 远程会诊推送
         */
        case "B1": //会诊发布推送
            vue.$store.dispatch("isGetNewMsg_ychz_dcl", true);
            if(currentSideItem != "ychz"){
                vue.$store.dispatch("isGetNewMsg_ychz", true);
            }
            Notification.info(
                {
                    title: data.alertTitle,
                    message: data.alertBody,
                    time: formatUnixTime(data.pushTime,"HH:mm"),
                    onClick: function() {
                        let options = {
                            consultId: data.consultId,
                            token: localStorage.getItem("token"),
                            Service: "nethos.consult.group.ass.grab"
                        };
                        axiosUtil(options, function(){
                            vue.$store.dispatch("getSideBarTitle", "待处理(我的)");
                            vue.$store.dispatch("getCurrentPosition", "ychz_dcl");
                            vue.$router.push({ name: "remoteEntry", params: { consultId: data.consultId }} );
                        });
                    }
                }
            );
            break;
        case "B2": // 取消会诊
            vue.$store.dispatch("isGetNewMsg_ychz_yqx", true);
            if(currentSideItem != "ychz"){
                vue.$store.dispatch("isGetNewMsg_ychz", true);
            }
            Notification.info(
                {
                    title: data.alertTitle,
                    message: data.alertBody,
                    time: formatUnixTime(data.pushTime,"HH:mm"),
                    onClick: function() {
                        vue.$router.push({ name: "remoteReject", params: { consultId: data.consultId }} );
                    }
                }
            );
            break;
        case "B5": //  补充了资料（接收医生/医助接收）
            vue.$store.dispatch("isGetNewMsg_ychz_bczl", true);
            if(currentSideItem != "ychz"){
                vue.$store.dispatch("isGetNewMsg_ychz", true);
            }
            Notification.info(
                {
                    title: data.alertTitle,
                    message: data.alertBody,
                    time: formatUnixTime(data.pushTime,"HH:mm"),
                    onClick: function() {
                        if(data.consultId == vue.$route.params.consultId){// 当前页面正好在需要跳转的页面，则重新刷新
                            vue.$store.dispatch("getRefreshConsultId", data.consultId);
                        }
                        if(data.consultTime){
                            vue.$store.dispatch("getSideBarTitle", "待会诊");
                            vue.$store.dispatch("getCurrentPosition", "ychz_dhz");
                        }else {
                            vue.$store.dispatch("getSideBarTitle", "待处理(我的)");
                            vue.$store.dispatch("getCurrentPosition", "ychz_dcl");
                        }
                        vue.$router.push({ name: "remoteEntry", params: { consultId: data.consultId }} );
                    }
                }
            );
            break;
        case "B6": //  邀请视频
            vue.$store.dispatch("isGetNewMsg_yqys", true);
            Notification.info(
                {
                    title: data.alertTitle,
                    message: data.alertBody,
                    time: formatUnixTime(data.pushTime,"HH:mm"),
                    onClick: function() {
                    }
                }
            );
            break;
        case "B7":// 接收方医生填写问诊建议
        case "B8":// 完成会诊
            vue.$store.dispatch("isGetNewMsg_ychz_ywc", true);
            vue.$store.dispatch("getEndConsultId", data.consultId);//发送已完成会诊单id
            if(currentSideItem != "ychz"){
                vue.$store.dispatch("isGetNewMsg_ychz", true);
            }
            Notification.info(
                {
                    title: data.alertTitle,
                    message: data.alertBody,
                    time: formatUnixTime(data.pushTime,"HH:mm"),
                    onClick: function() {
                        vue.$router.push({ name: "remoteEvaluate", params: { consultId: data.consultId }} );
                    }
                }
            );
            break;
        case "B9":// 开始时间推送
            Notification.info(
                {
                    title: data.alertTitle,
                    message: data.alertBody,
                    time: formatUnixTime(data.pushTime,"HH:mm"),
                    duration: 4000,
                    onClick: function() {
                        vue.$router.push({ name: "remoteEntry", params: { consultId: data.consultId }} );
                    }
                }
            );
            break;
        case "B10":// 会诊聊天推送
            if(vue.$store.state.pushMsgConsultId == data.consultId){// 用于判断当前聊天窗id是否和推送id一直
                vue.$store.dispatch("getMsgList", data.consultId);
            }
            break;
    }
}
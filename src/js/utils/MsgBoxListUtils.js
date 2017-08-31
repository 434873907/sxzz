/**
 * 推送事件处理工具
 */

import { formatUnixTime } from "./DateFormat";
import axiosUtil from "./AxiosUtils.js"
export default function msgBoxListUtils(vue, recData){
    let allData = JSON.parse(recData);
    let data = JSON.parse(allData.messageJson);
    if(!allData.isread){// 未读设为已读
        let options = {
            messageId: allData.messageId,
            token: localStorage.getItem("token"),
            Service: "nethos.system.messagebox.read"
        };
        axiosUtil(options, function(){// 标记为已读
            vue.$store.dispatch("changeMsgBoxListCounts", false);// 消息盒子未读数-1
        });
    }
    switch (data.type){
        /**
         * 助端问诊推送
         */
        case "A1": // 发布问诊推送
            if(data.consultType == "PIC"){// qkfz
                let options = {
                    consultId: data.consultId,
                    token: localStorage.getItem("token"),
                    Service: "nethos.consult.info.grab"
                };
                axiosUtil(options, function(){
                    vue.$store.dispatch("getSideBarTitle", "处理中(我的)");// 侧边栏列表 顶部标题
                    vue.$store.dispatch("getCurrentPosition", "qkfz_dcl");//  获取相应侧边栏患者列表
                    vue.$router.push({ name: "pictureToTreat", params: { consultId: data.consultId }});
                }, function(obj){
                    if(obj.code == "05040002" || obj.code == "05040003"){// 表示已经抢过单了002表示已经抢过并不在进行中状态，003表示进行中
                        vue.$store.dispatch("getSideBarTitle", "处理中(我的)");// 侧边栏列表 顶部标题
                        vue.$store.dispatch("getCurrentPosition", "qkfz_dcl");//  获取相应侧边栏患者列表
                        vue.$router.push({ name: "pictureToTreat", params: { consultId: data.consultId }});
                        return true;
                    }
                });
            }else if(data.consultType == "VIDEO"){// 发布名医视频
                let options = {
                    consultId: data.consultId,
                    token: localStorage.getItem("token"),
                    Service: "nethos.consult.info.grab"
                };
                axiosUtil(options, function(){
                    vue.$store.dispatch("getSideBarTitle", "处理中(我的)");
                    vue.$store.dispatch("getCurrentPosition", "mysp_dcl");
                    vue.$router.push({ name: "videoEntry", params: { consultId: data.consultId }} );
                }, function(obj){// 表示已经抢过单了
                    if(obj.code == "05040002" || obj.code == "05040003") {// 表示已经抢过单了002表示已经抢过并不在进行中状态，003表示进行中
                        vue.$store.dispatch("getSideBarTitle", "处理中(我的)");
                        vue.$store.dispatch("getCurrentPosition", "mysp_dcl");
                        vue.$router.push({ name: "videoEntry", params: { consultId: data.consultId }} );
                        return true;
                    }
                });
            }
            break;
        case "A3": // 患者补充了资料推送
            if(data.consultType == "VIDEO"){//名医视频补充资料
                if(data.consultTime) {
                    vue.$store.dispatch("getSideBarTitle", "待问诊");
                    vue.$store.dispatch("getCurrentPosition", "mysp_dwz");
                }else {
                    vue.$store.dispatch("getSideBarTitle", "处理中(我的)");
                    vue.$store.dispatch("getCurrentPosition", "mysp_dcl");
                }
                vue.$router.push({ name: "videoEntry", params: { consultId: data.consultId }} );
            }
            break;
        case "A4": // 回复问诊
            if(data.consultType == "PIC"){//qkfz
                vue.$router.push({ name: "pictureToTreat", params: { consultId: data.consultId }});
            }else if(data.consultType == "VIDEO"){// 名医视频
                vue.$router.push({ name: "videoEntry", params: { consultId: data.consultId }} );
            }
            break;
        case "A5": // 完成问诊
            if(data.consultType == "PIC"){// qkfz
                vue.$store.dispatch("getSideBarTitle", "已完成");
                vue.$store.dispatch("getCurrentPosition", "qkfz_ywc");
                vue.$router.push({ name: "pictureToTreat", params: { consultId: data.consultId }});
            }else if(data.consultType == "VIDEO"){// 名医视频
                vue.$store.dispatch("getSideBarTitle", "已完成");
                vue.$store.dispatch("getCurrentPosition", "mysp_ywc");
                vue.$router.push({ name: "videoAdvisoryOpinion", params: { consultId: data.consultId }} );
            }
            break;
        case "A7": // 邀请视频
            if(data.consultType == "VIDEO"){//视频咨询

            }
            break;
        case "A8": // 取消问诊
            if(data.consultType == "PIC"){// qkfz
                vue.$store.dispatch("getSideBarTitle", "已取消");
                vue.$store.dispatch("getCurrentPosition", "qkfz_yqx");
                vue.$router.push({ name: "pictureToTreat", params: { consultId: data.consultId }});
            }else if(data.consultType == "VIDEO"){// 名医视频
                vue.$store.dispatch("getSideBarTitle", "已取消");
                vue.$store.dispatch("getCurrentPosition", "mysp_yqx");
                vue.$router.push({ name: "videoAdvisoryOpinion", params: { consultId: data.consultId }} );
            }
            break;
        case "A11":
            vue.$router.push({ name: "videoEntry", params: { consultId: data.consultId }} );
            break;
        /**
         * 远程会诊推送
         */
        case "B1": //会诊发布推送
            let options = {
                consultId: data.consultId,
                token: localStorage.getItem("token"),
                Service: "nethos.consult.group.ass.grab"
            };
            axiosUtil(options, function(){// 第一次点击抢单
                vue.$store.dispatch("getSideBarTitle", "处理中(我的)");
                vue.$store.dispatch("getCurrentPosition", "ychz_dcl");
                vue.$router.push({ name: "remoteEntry", params: { consultId: data.consultId }} );
            }, function(obj){//
                if(obj.code == "05050101" || obj.code == "05050102") {// 表示已经抢过单了,101非进行中， 102进行中
                    vue.$store.dispatch("getSideBarTitle", "处理中(我的)");
                    vue.$store.dispatch("getCurrentPosition", "ychz_dcl");
                    vue.$router.push({ name: "remoteEntry", params: { consultId: data.consultId }} );
                    return true;
                }
            });

            break;
        case "B2": // 取消会诊
            vue.$router.push({ name: "remoteReject", params: { consultId: data.consultId }} );
            break;
        case "B5": //  补充了资料（接收医生/医助接收）
            if(data.consultTime){
                vue.$store.dispatch("getSideBarTitle", "待会诊");
                vue.$store.dispatch("getCurrentPosition", "ychz_dhz");
            }else {
                vue.$store.dispatch("getSideBarTitle", "处理中(我的)");
                vue.$store.dispatch("getCurrentPosition", "ychz_dcl");
            }
            vue.$router.push({ name: "remoteEntry", params: { consultId: data.consultId }} );
            break;
        case "B6": //  邀请视频
            break;
        case "B8":// 完成会诊
            vue.$router.push({ name: "remoteEvaluate", params: { consultId: data.consultId }} );
            break;
        case "B9":// 开始时间推送
        case "B10":// 会诊聊天推送
            vue.$router.push({ name: "remoteEntry", params: { consultId: data.consultId }} );
            break;
    }
}
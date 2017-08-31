import axiosUtil from "../js/utils/AxiosUtils.js";
const actions = {
    /*通用*/
    getCurrentPosition({ commit }, position){// 当前所在位置（待处理、处理中、已完成等详情单中）
        commit("GET_CURRENT_POSITION", position);
    },
    getClientH: function ({ commit }, clientH) {//获取可视区域高度
        commit("GET_CLIENT_HEIGHT", clientH);
    },
    changeSideItem({ commit  }, sideItemName){//点击侧边栏
        commit("CHANGE_SIDE_ITEM", sideItemName);
    },
    getAmplifyImageArr({ commit }, imageObj){// 获取需要放大的图片数组
        commit("GET_AMPLIFY_IMAGE_ARR", imageObj);
    },
    /*对话模块*/
    getMsgList({ commit }, consultId){// 根据consultId获取聊天数据
        let options = {
            pageNo: 1,
            pageSize: 10000,
            consultId: consultId,
            token: localStorage.getItem("token"),
            Service: "nethos.consult.message.list"
        };
        axiosUtil(options, function(data){
            commit("GET_MESSAGE_LIST", data.list);
        });
    },
    getPushMsgConsultId({ commit }, pushMsgConsultId){// 聊天回复推送的consultId
        commit("GET_PUSH_MSG_CONSULT_ID", pushMsgConsultId);
    },
    getPushPointConsultIdArr({ commit }, pushPointConsultId){// 当前推送的会话聊天consultId数组, 用于显示列表中的红点
        commit("GET_PUSH_POINT_CONSULT_ID_ARR", pushPointConsultId);
    },
    removePushPointConsultIdArr({ commit }, removeConsultId){
        commit("REMOVE_PUSH_POINT_CONSULT_ID_ARR", removeConsultId);
    },
    getUserInfo({ commit }, loginInfo){//点击登陆按钮获取用户信息
        commit("GET_USER_INFO", loginInfo);
    },
    getPatientId({ commit }, patientId){//获取点击的患者ID
        commit("GET_PATIENT_ID", patientId);
    },
    /*远程会诊模块*/
    getCurrentConsultList({ commit }, list){//获取当前会诊列表
        commit("GET_CURRENT_CONSULT_LIST", list);
    },
    getCurrentConsult({ commit }, consultId){//获取当前操作的会诊单使子路由能够使用
        commit("GET_CURRENT_CONSULT", consultId);
    },
    getConsultType({ commit }, consultType){//获取发起会诊类型
        commit("GET_CONSULT_TYPE", consultType);
    },
    getInviteDocList({ commit }, inviteVoList){//获取邀请视频医生列表
        commit("GET_INVITE_DOC_LIST", inviteVoList);
    },
    getSideBarTitle({ commit }, title){//获取医助端问会诊侧边栏列表顶部标题
        commit("GET_SIDEBAR_TITLE", title);
    },
    getPrintDetail({ commit }, detail){// 获取需要打印的会诊单详情
        commit("GET_PRINT_DETAIL", detail);
    },
    /*设置*/
    //个人业务设置
    setBusSettingVideoState({ commit }, setting){//是否开通视频问诊
        commit("SET_BUSINESS_SETTING_VIDEO_STATE", setting);
    },
    setBusSettingVideoPrice({ commit }, price){//视频问诊费用
        commit("SET_BUSINESS_SETTING_VIDEO_PRICE", price);
    },
    setBusSettingVideoMove({ commit }, move){//视频问诊开通滑块
        commit("SET_BUSINESS_SETTING_VIDEO_MOVE", move)
    },
    setBusSettingPicState({ commit }, setting){//是否开通图文咨询
        commit("SET_BUSINESS_SETTING_PIC_STATE", setting);
    },
    setBusSettingPicPrice({ commit }, price){//图文咨询费用
        commit("SET_BUSINESS_SETTING_PIC_PRICE", price);
    },
 //绑定手机号修改
    getPhoneNum({ commit },phone){
    	commit("GET_PHONE_NUM",phone)
    },
    setBusSettingPicMove({ commit }, move){//图文咨询开通滑块
        commit("SET_BUSINESS_SETTING_PIC_MOVE", move)
    },
    /**
     * 推送模块
     */
    isOpenMsgListBox: function({ commit }, isOpenMsgListBox) {// 是否打开消息盒子
        commit("IS_OPEN_MSG_LIST_BOX", isOpenMsgListBox);
    },
    getAllMsgBoxList({ commit }, pageNo=1) {// 获取所有消息列表
        let options = {
            pageNo: pageNo,
            pageSize: 10,
            token: localStorage.getItem("token"),
            Service: "nethos.system.messagebox.list"
        };
        /*axiosUtil(options, function(data){
            commit("GET_ALL_MSG_BOX_LIST", data);
        });*/
    },
    getAllMsgBoxListCounts({ commit }) {// 获取所有消息数
        let options = {
            token: localStorage.getItem("token"),
            Service: "nethos.system.messagebox.noread.count"
        };
        /*axiosUtil(options, function(data){//更新总数据
            commit("GET_ALL_MSG_BOX_LIST_COUNTS", data.obj);
        });*/
    },
    changeMsgBoxListCounts: function({ commit }, isAdd) {// 增加消息数, 加1或者减1
        /*setTimeout(function(){
            actions.getAllMsgBoxList({ commit }, 1);//更新消息盒子列表数据
        }, 1000);*/
        //actions.getAllMsgBoxList({ commit }, 1);//更新消息盒子列表数据
        commit("CHANGE_MSG_BOX_LIST_COUNTS", isAdd);
    },
    getEndConsultId: function ({ commit }, endConsultId) {//获取当前结束的问会诊id
        commit("GET_END_CONSULT_ID", endConsultId);
    },
    getRefreshConsultId({ commit }, refreshConsultId){// 获取当前需要刷新的id
        commit("GET_REFRESH_CONSULT_ID", refreshConsultId);
    },
    //图文咨询
    isGetNewMsg_qkfz({ commit }, isGetNewMsg_qkfz){// 图文咨询侧边栏红点
        commit("IS_GET_NEW_MSG_QKFZ", isGetNewMsg_qkfz);
    },
    isGetNewMsg_qkfz_dcl({ commit }, isGetNewMsg_qkfz_dcl){//获取图文咨询是否有新消息
        commit("IS_GET_NEW_MSG_QKFZ_DCL", isGetNewMsg_qkfz_dcl);
    },
    isGetNewMsg_qkfz_clz({ commit }, isGetNewMsg_qkfz_clz){//获取图文咨询是否有新待回复
        commit("IS_GET_NEW_MSG_QKFZ_CLZ", isGetNewMsg_qkfz_clz);
    },
    isGetNewMsg_qkfz_ywc({ commit }, isGetNewMsg_qkfz_ywc){//获取图文咨询已结束是否有新消息
        commit("IS_GET_NEW_MSG_QKFZ_YWC", isGetNewMsg_qkfz_ywc);
    },
    isGetNewMsg_qkfz_yqx({ commit }, isGetNewMsg_qkfz_yqx){//获取图文咨询已取消是否有新消息
        commit("IS_GET_NEW_MSG_QKFZ_YQX", isGetNewMsg_qkfz_yqx);
    },

    //视频问诊
    isGetNewMsg_mysp({ commit }, isGetNewMsg_mysp){// 图文咨询侧边栏红点
        commit("IS_GET_NEW_MSG_MYSP", isGetNewMsg_mysp);
    },
    isGetNewMsg_mysp_dcl({ commit }, isGetNewMsg_mysp_dcl){//获取名医视频待处理
        commit("IS_GET_NEW_MSG_MYSP_DCL", isGetNewMsg_mysp_dcl);
    },
    isGetNewMsg_mysp_clz({ commit }, isGetNewMsg_mysp_clz){//获取名医视频待处理
        commit("IS_GET_NEW_MSG_MYSP_CLZ", isGetNewMsg_mysp_clz);
    },
    isGetNewMsg_mysp_dwz({ commit }, isGetNewMsg_mysp_dwz){//获取名医视待问诊推送
        commit("IS_GET_NEW_MSG_MYSP_DWZ", isGetNewMsg_mysp_dwz);
    },
    isGetNewMsg_mysp_ywc({ commit }, isGetNewMsg_mysp_ywc){//获取名医视完成推送
        commit("IS_GET_NEW_MSG_MYSP_YWC", isGetNewMsg_mysp_ywc);
    },
    isGetNewMsg_mysp_yqx({ commit }, isGetNewMsg_mysp_yqx){//获取名医视取消推送
        commit("IS_GET_NEW_MSG_MYSP_YQX", isGetNewMsg_mysp_yqx);
    },
    isGetNewMsg_mysp_bczl({ commit }, isGetNewMsg_mysp_bczl){//获取名医视取消推送
        commit("IS_GET_NEW_MSG_MYSP_BCZL", isGetNewMsg_mysp_bczl);
    },

    //远程会诊
    isGetNewMsg_ychz({ commit }, isGetNewMsg_ychz){// 图文咨询侧边栏红点
        commit("IS_GET_NEW_MSG_YCHZ", isGetNewMsg_ychz);
    },
    isGetNewMsg_ychz_dcl({ commit }, isGetNewMsg_ychz_dcl){//获取待处理
        commit("IS_GET_NEW_MSG_YCHZ_DCL", isGetNewMsg_ychz_dcl);
    },
    isGetNewMsg_ychz_clz({ commit }, isGetNewMsg_ychz_clz){//获取处理中
        commit("IS_GET_NEW_MSG_YCHZ_CLZ", isGetNewMsg_ychz_clz);
    },
    isGetNewMsg_ychz_dhz({ commit }, isGetNewMsg_ychz_wfq){//获取待会诊
        commit("IS_GET_NEW_MSG_YCHZ_DHZ", isGetNewMsg_ychz_wfq);
    },
    isGetNewMsg_ychz_ywc({ commit }, isGetNewMsg_ychz_ywc){//获取已完成会诊
        commit("IS_GET_NEW_MSG_YCHZ_YWC", isGetNewMsg_ychz_ywc);
    },
    isGetNewMsg_ychz_yqx({ commit }, isGetNewMsg_ychz_yqx){//获取已完成会诊
        commit("IS_GET_NEW_MSG_YCHZ_YQX", isGetNewMsg_ychz_yqx);
    },
    isGetNewMsg_ychz_bczl({ commit }, isGetNewMsg_ychz_bczl){// 补充了资料推送
        commit("IS_GET_NEW_MSG_YCHZ_BCZL", isGetNewMsg_ychz_bczl);
    },
    isGetNewMsg_ychz_yqbc({ commit }, isGetNewMsg_ychz_yqbc){// 要求补充资料推送
        commit("IS_GET_NEW_MSG_YCHZ_YQBC", isGetNewMsg_ychz_yqbc);
    },
};
export default actions;

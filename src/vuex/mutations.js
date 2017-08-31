const mutations = {
    /*通用*/
    GET_CURRENT_POSITION(state, position){// 当前所在位置（待处理、处理中、已完成等详情单中）
        state.currentPosition = position;
    },
    GET_AMPLIFY_IMAGE_ARR(state, imageObj){// 获取需要放大的图片数组
        state.imageAmplifyObj = imageObj;
    },
    /*获取可视区域高度*/
    GET_CLIENT_HEIGHT(state, clientH){
        state.clientH = clientH;
    },
    /*发布文章模块mutations*/
    getArticleTableData(state){
        state.contentData = [];
    },
    deleteArticleTableDataRow(state, payload){//文章发布模块，删除文件
        state.contentData.splice(payload.row, 1);
    },
    /*远程会诊模块*/
    //获取当前选取的会诊列表（我发起的，我收到的，取消，已结束---）
    GET_CURRENT_CONSULT_LIST(state, list){
        state.currentConsultList = list;
    },
    //获取当前会诊单
    GET_CURRENT_CONSULT(state, consult){
        state.currentConsult = consult;
    },
    //获取需要打印的会诊详情
    GET_PRINT_DETAIL(state, detail){
        state.printDetail = detail;
    },
    //获取当前发起会诊类型
    GET_CONSULT_TYPE(state, consoultType){
        state.consultType = consoultType;
    },
    //获取邀请医生列表
    GET_INVITE_DOC_LIST(state, inviteVoList){
        state.inviteVoList = inviteVoList;
    },
    //获取医助端视频问诊和会诊侧边栏顶部标题
    GET_SIDEBAR_TITLE(state, title){
        state.sidebarTitle = title;
    },
    /*登录*/
    GET_USER_INFO(state, loginInfo){
        state.userInfo = loginInfo;
        state.isLogin = true;
    },
    /*患者ID*/
    GET_PATIENT_ID(state, patientId){
       state.currentPatientId = patientId;
    },
    /*设置*/
    //个人业务设置
    SET_BUSINESS_SETTING_VIDEO_STATE(state, setting){//是否开通视频问诊
        state.docVideoConsultStatus = setting;
    },
    SET_BUSINESS_SETTING_VIDEO_PRICE(state, price){//视频问诊费用
        state.docVideoConsultPrice = price;
    },
    SET_BUSINESS_SETTING_VIDEO_MOVE(state, move){//是否开通视频问诊滑块开关
        state.isMoveVideo = move;
    },
    SET_BUSINESS_SETTING_PIC_STATE(state, setting){//是否开通图文咨询
        state.docPicConsultStatus = setting;
    },
    SET_BUSINESS_SETTING_PIC_PRICE(state, price){//图文咨询费用
        state.docPicConsultPrice = price;
    },
    //绑定手机修改
    GET_PHONE_NUM(state,phone){
	 	state.phoneInfo = phone
    },

    SET_BUSINESS_SETTING_PIC_MOVE(state, move){//是否开通图文咨询滑块开关
        state.isMovePic = move;
    },
    //绑定手机号

    /*点击首页侧边栏事件*/
    CHANGE_SIDE_ITEM(state, payload){
        state.clickName = payload;
        switch (payload){
        	case "rwzx":
        	    state.routerPath="任务中心";
        		break;
        	case "twzx":
                state.isGetNewMsg_qkfz = false;// 消除红点
        	    state.routerPath="门诊转诊";
        		break;
        	case "spwz":
                state.isGetNewMsg_mysp = false;// 消除红点
        	    state.routerPath="检查转诊";
        		break;
        	case "ychz":
                state.isGetNewMsg_ychz = false;// 消除红点
        	    state.routerPath="住院转诊";
        		break;
            case "sszz":
                state.isGetNewMsg_sszz = false;// 消除红点
                state.routerPath="日间手术转诊";
                break;
            case "zztj":
                state.isGetNewMsg_zztj = false;// 消除红点
                state.routerPath="转诊统计";
                break;
        	default:
        		break;
        }
    },
    /*回话mutations*/
    GET_MESSAGE_LIST(state, msgList){//获取从服务器消息
        state.messageList = msgList;
    },
    GET_PUSH_MSG_CONSULT_ID(state, pushMsgConsultId){// 聊天回复推送的consultId
        state.pushMsgConsultId = pushMsgConsultId;
    },
    GET_PUSH_POINT_CONSULT_ID_ARR(state, pushPointConsultId){// 当前推送的会话聊天consultId, 用于显示列表中的红点
        if(state.pushPointConsultIdArr.indexOf(pushPointConsultId) === -1){// 判断是否已经在数组中
            state.pushPointConsultIdArr.push(pushPointConsultId);
        }
    },
    REMOVE_PUSH_POINT_CONSULT_ID_ARR(state, removeConsultId){// 左侧聊天列表中点击某项，删除红点
        if(state.pushPointConsultIdArr.indexOf(removeConsultId) !== -1){// 判断是否已经在数组中
            let index = state.pushPointConsultIdArr.indexOf(removeConsultId);
            state.pushPointConsultIdArr.splice(index, 1);
        }
    },
    /**
     * 推送模块
     *
     */
    IS_OPEN_MSG_LIST_BOX: function(state, isOpenMsgListBox) {// 是否打开消息盒子
        state.isOpenMsgListBox = isOpenMsgListBox;
    },
    GET_ALL_MSG_BOX_LIST: function(state, allMsgBoxList) {// 获取消息盒子列表
        state.allMsgBoxList = allMsgBoxList;
    },
    GET_ALL_MSG_BOX_LIST_COUNTS: function(state, allMsgBoxListCounts) {// 获取消息盒子未读数
        state.allMsgBoxListCounts = allMsgBoxListCounts;
    },
    CHANGE_MSG_BOX_LIST_COUNTS: function(state, isAdd) {// 获取消息盒子未读数
        if(isAdd == true){
            state.allMsgBoxListCounts += 1;
        }else {
            state.allMsgBoxListCounts = state.allMsgBoxListCounts > 0 ? (state.allMsgBoxListCounts - 1) : 0;
        }
    },
    GET_END_CONSULT_ID: function(state, endConsultId) {//获取当前结束的id
        state.endConsultId = endConsultId;
    },
    GET_REFRESH_CONSULT_ID(state, refreshConsultId){// 获取当前需要刷新的id
        state.refreshConsultId = refreshConsultId;
    },
    //qkfz
    IS_GET_NEW_MSG_QKFZ(state, isGetNewMsg_qkfz){// 图文咨询侧边栏红点
        state.isGetNewMsg_qkfz = isGetNewMsg_qkfz;

    },
    IS_GET_NEW_MSG_QKFZ_DCL(state, isGetNewMsg_twxz_dcl){//是否获取到新全科分诊
        state.isGetNewMsg_qkfz_dcl = isGetNewMsg_twxz_dcl;
    },
    IS_GET_NEW_MSG_QKFZ_CLZ(state, isGetNewMsg_twxz_clz){//是否获取到新处理中(我的)
        state.isGetNewMsg_qkfz_clz = isGetNewMsg_twxz_clz;
    },
    IS_GET_NEW_MSG_QKFZ_YWC(state, isGetNewMsg_twxz_ywc){//是否获取到全科分诊已结束
        state.isGetNewMsg_qkfz_ywc = isGetNewMsg_twxz_ywc;
    },
    IS_GET_NEW_MSG_QKFZ_YQX(state, isGetNewMsg_twxz_yqx){//是否获取到全科分诊已取消
        state.isGetNewMsg_qkfz_yqx = isGetNewMsg_twxz_yqx;
    },
    //名医视频
    IS_GET_NEW_MSG_MYSP(state, isGetNewMsg_mysp){// 图文咨询侧边栏红点
        state.isGetNewMsg_mysp = isGetNewMsg_mysp;
    },
    IS_GET_NEW_MSG_MYSP_DCL(state, isGetNewMsg_mysp_dcl){//是否获取到新名医视频
        state.isGetNewMsg_mysp_dcl = isGetNewMsg_mysp_dcl;
    },
    IS_GET_NEW_MSG_MYSP_CLZ(state, isGetNewMsg_mysp_clz){//是否获取到新名医视频处理中
        state.isGetNewMsg_mysp_clz = isGetNewMsg_mysp_clz;
    },
    IS_GET_NEW_MSG_MYSP_DWZ(state, isGetNewMsg_mysp_clz){//是否获取到新名医视频待问诊
        state.isGetNewMsg_mysp_clz = isGetNewMsg_mysp_clz;
    },
    IS_GET_NEW_MSG_MYSP_YWC(state, isGetNewMsg_mysp_ywc){//是否获取到名医视频完成视频推送
        state.isGetNewMsg_mysp_ywc = isGetNewMsg_mysp_ywc;
    },
    IS_GET_NEW_MSG_MYSP_YQX(state, isGetNewMsg_mysp_yqx){//是否获取到名医视频取消推送
        state.isGetNewMsg_mysp_yqx = isGetNewMsg_mysp_yqx;
    },
    IS_GET_NEW_MSG_MYSP_BCZL(state, isGetNewMsg_mysp_bczl){//是否获取到名医视频取消推送
        state.isGetNewMsg_mysp_bczl = isGetNewMsg_mysp_bczl;
    },

    //远程会诊
    IS_GET_NEW_MSG_YCHZ(state, isGetNewMsg_ychz){// 图文咨询侧边栏红点
        state.isGetNewMsg_ychz = isGetNewMsg_ychz;
    },
    IS_GET_NEW_MSG_YCHZ_DCL(state, isGetNewMsg_ychz_dcl){//是否获取到新会诊
        state.isGetNewMsg_ychz_dcl = isGetNewMsg_ychz_dcl;
    },
    IS_GET_NEW_MSG_YCHZ_CLZ(state, isGetNewMsg_ychz_clz){//是否获取到新处理中
        state.isGetNewMsg_ychz_clz = isGetNewMsg_ychz_clz;
    },
    IS_GET_NEW_MSG_YCHZ_DHZ(state, isGetNewMsg_ychz_dhz){//是否获取到新待会诊
        state.isGetNewMsg_ychz_dhz = isGetNewMsg_ychz_dhz;
    },
    IS_GET_NEW_MSG_YCHZ_YWC(state, isGetNewMsg_ychz_ywc){//是否获取到新已完成
        state.isGetNewMsg_ychz_ywc = isGetNewMsg_ychz_ywc;
    },
    IS_GET_NEW_MSG_YCHZ_YQX(state, isGetNewMsg_ychz_yqx){//是否获取到新已取消
        state.isGetNewMsg_ychz_yqx = isGetNewMsg_ychz_yqx;
    },
    IS_GET_NEW_MSG_YCHZ_BCZL(state, isGetNewMsg_ychz_bczl){//是否获取到新补充了资料
        state.isGetNewMsg_ychz_bczl = isGetNewMsg_ychz_bczl;
    },
    IS_GET_NEW_MSG_YCHZ_YQBC(state, isGetNewMsg_ychz_yqbc){//是否获取到新要求补充资料
        state.isGetNewMsg_ychz_yqbc = isGetNewMsg_ychz_yqbc;
    },
};
export default mutations;
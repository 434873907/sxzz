const state = {
    clientH: document.documentElement.clientHeight -1 || document.body.clientHeight - 1,//可视区域高度
    contentData: [//文章发布列表
    ],
    clickName: "rwzx",//侧边栏点击的item
    userInfo: {//当前用户
    },
    currentPatientId: "",//当前选中的患者ID
    currentConsultId: "",//当前操作的会诊单
    currentDoctorId: "1",//当前登录医生ID
    currentConsultList: null,//当前的选取的会诊单列表
    currentConsult: null,//当前操作的会诊单详情
    currentPosition: "",// 当前所在位置（判断是否在待处理、处理中、已完成等详情单中）
    phoneInfo:"",//当前绑定的手机号
    routerPath: "rwzx",//header底部路由路径名称
    imageAmplifyObj: {},// 放大图片数组，用于左右按钮切换{ imgList, index },图片列表和当前点中的图片序号
    currentSessionId: "1",//当前登录用户ID
    /*会话数据*/
    messageList: [],//用户聊天内容列表
    pushMsgConsultId: "",// 当前聊天窗id，如果当前id和推送id一致则获取消息列表
    pushPointConsultIdArr: localStorage.getItem("pushPoint") ? (JSON.parse(localStorage.getItem("pushPoint")).pushPointConsultIdArr ? JSON.parse(localStorage.getItem("pushPoint")).pushPointConsultIdArr : []) : [],// 当前推送的会话聊天consultId数组(会有多个聊天推送), 用于显示列表中的红点
    /*设置数据*/
    //业务设置
    docVideoConsultStatus: () => this.userInfo.docVideoConsultStatus,//是否开通视频问诊
    docVideoConsultPrice: () => this.userInfo.docVideoConsultPrice,//视频问诊价格
    docPicConsultStatus: () => this.userInfo.docPicConsultStatus,//是否开通图文咨询
    docPicConsultPrice: () => this.userInfo.docPicConsultPrice,//图文咨询价格
    isMovePic: true,//图文咨询开个是否移动默认再右边为关闭状态
    isMoveVideo: true,//视频问诊开个是否移动默认在右边为关闭状态
    //我的名片
    /**/
    /*远程会诊模块*/
    consultType: "ASS",//发起会诊时候选择会诊类型，ASS医-助-医还是DOC医医
    inviteVoList: [],//邀请医生列表
    sidebarTitle: "待处理(我的)",//医助端侧边栏顶部标题
    printDetail: {},// 打印页面详情

    /**
     * 推送状态
     */
    allMsgBoxList: {},// 获取全部消息列表内容
    allMsgBoxListCounts: 0,// 获取消息列表未读数量
    isOpenMsgListBox: false,// 是否打开消息盒子

    endConsultId: null,// 当前结束的问会诊id
    refreshConsultId: null,// 点击推送的前往按钮，如果刚好在当前页面无需跳转则刷新页面
    isGetNewMsg_yqys: localStorage.getItem("pushPoint") ? JSON.parse(localStorage.getItem("pushPoint")).isGetNewMsg_yqys : false,// 邀请医生视频推送
    /*问诊推送*/
    //全科分诊推送
    isGetNewMsg_qkfz: localStorage.getItem("pushPoint") ? JSON.parse(localStorage.getItem("pushPoint")).isGetNewMsg_qkfz : false,// 图文咨询侧边栏红点
    isGetNewMsg_qkfz_dcl: localStorage.getItem("pushPoint") ? JSON.parse(localStorage.getItem("pushPoint")).isGetNewMsg_qkfz_dcl : false,// 获取新全科分诊待处理
    isGetNewMsg_qkfz_clz: localStorage.getItem("pushPoint") ? JSON.parse(localStorage.getItem("pushPoint")).isGetNewMsg_qkfz_clz : false,// 获取新全科分诊待回复
    isGetNewMsg_qkfz_ywc: localStorage.getItem("pushPoint") ? JSON.parse(localStorage.getItem("pushPoint")).isGetNewMsg_qkfz_ywc : false,// 获取新图文咨询已完成
    isGetNewMsg_qkfz_yqx: localStorage.getItem("pushPoint") ? JSON.parse(localStorage.getItem("pushPoint")).isGetNewMsg_qkfz_yqx : false,// 获取新图文咨询已取消

    //名医视频推送
    isGetNewMsg_mysp: localStorage.getItem("pushPoint") ? JSON.parse(localStorage.getItem("pushPoint")).isGetNewMsg_mysp : false,// 名医视频侧边栏红点
    isGetNewMsg_mysp_dcl: localStorage.getItem("pushPoint") ? JSON.parse(localStorage.getItem("pushPoint")).isGetNewMsg_mysp_dcl : false,// 获得新名医视频 待处理
    isGetNewMsg_mysp_clz: localStorage.getItem("pushPoint") ? JSON.parse(localStorage.getItem("pushPoint")).isGetNewMsg_mysp_clz : false,// 获得新名医视频 处理中
    isGetNewMsg_mysp_dwz: localStorage.getItem("pushPoint") ? JSON.parse(localStorage.getItem("pushPoint")).isGetNewMsg_mysp_dwz : false,// 获得新名医视频 待问诊
    isGetNewMsg_mysp_ywc: localStorage.getItem("pushPoint") ? JSON.parse(localStorage.getItem("pushPoint")).isGetNewMsg_mysp_ywc : false,// 获得新名医视频 已完成推送
    isGetNewMsg_mysp_yqx: localStorage.getItem("pushPoint") ? JSON.parse(localStorage.getItem("pushPoint")).isGetNewMsg_mysp_yqx : false,// 获得新名医视频 已取消推送
    isGetNewMsg_mysp_bczl: localStorage.getItem("pushPoint") ? JSON.parse(localStorage.getItem("pushPoint")).isGetNewMsg_mysp_bczl : false,// 获得新名医视频 补充资料推送

    // 远程会诊
    isGetNewMsg_ychz: localStorage.getItem("pushPoint") ? JSON.parse(localStorage.getItem("pushPoint")).isGetNewMsg_ychz : false,// 远程会诊侧边栏红点
    isGetNewMsg_ychz_dcl: localStorage.getItem("pushPoint") ? JSON.parse(localStorage.getItem("pushPoint")).isGetNewMsg_ychz_dcl : false,// 获得新远程会诊-待处理
    isGetNewMsg_ychz_clz: localStorage.getItem("pushPoint") ? JSON.parse(localStorage.getItem("pushPoint")).isGetNewMsg_ychz_clz : false,// 获得新远程会诊-处理中
    isGetNewMsg_ychz_dhz: localStorage.getItem("pushPoint") ? JSON.parse(localStorage.getItem("pushPoint")).isGetNewMsg_ychz_dhz : false,// 获得新远程会诊-待会诊
    isGetNewMsg_ychz_ywc: localStorage.getItem("pushPoint") ? JSON.parse(localStorage.getItem("pushPoint")).isGetNewMsg_ychz_ywc : false,// 获得新远程会诊-已完成
    isGetNewMsg_ychz_yqx: localStorage.getItem("pushPoint") ? JSON.parse(localStorage.getItem("pushPoint")).isGetNewMsg_ychz_yqx : false,// 获得新远程会诊-已取消
    isGetNewMsg_ychz_bczl: localStorage.getItem("pushPoint") ? JSON.parse(localStorage.getItem("pushPoint")).isGetNewMsg_ychz_bczl : false,// 获得新远程会诊-补充了资料
    isGetNewMsg_ychz_yqbc: localStorage.getItem("pushPoint") ? JSON.parse(localStorage.getItem("pushPoint")).isGetNewMsg_ychz_yqbc : false,// 获得新远程会诊-要求补充资料
};
export default state;
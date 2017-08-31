/*
 * axios封装
 * */
import {Message} from "element-ui";
// import  {PasWord, basicParam} from "../data/basicParam.js";
import {API_URL} from  "../data/Url.js";

export default function axiosUtil(service, options) {
  let randoms = "";
  for (let i = 0; i < 4; i++) {
    randoms += "1234567890".substr(Math.floor(Math.random() * 10), 1);
  }
  var yymm = '';
  var jgid='';
  var sign = '';
  let docStr = localStorage.getItem('docObj');
  if(docStr){
    if(JSON.parse(docStr)){
      yymm = JSON.parse(docStr).yymm;
      jgid = JSON.parse(docStr).jgid;
      sign = hex_md5(hex_md5(yymm)+jgid+randoms)
    }
  }else {
    sign=''
  };
  const basicParam = {//服务器交互基本参数
    "format": "JSON",
    "random": randoms,
    "sign": sign,
  };

      if(JSON.parse(localStorage.getItem('docObj'))){
        options.yyr = JSON.parse(localStorage.getItem('docObj')).yyr;
        options.jgid = JSON.parse(localStorage.getItem('docObj')).jgid;
      }
     return axios({
        //url: "http://api.test.zjwlyy.cn/api/app",
        url: API_URL,
        method: "post",
        data: {service, ...basicParam, ...options}
    }).then(function (res) {
        console.log("res", res);
        if (res.data.succ) {
            return res.data
            //succCallback(res.data);
        } else {
            /*if(errCallback){//发生错误时执行的回掉函数
             errCallback(res.data);
             }
             if(res.data.code == "00000010"){
             localStorage.removeItem("docId");
             localStorage.removeItem("userInfo");
             localStorage.removeItem("token");
             window.location = HOST_URL;
             }*/
            Message({
                showClose: true,
                message: res.data.msg,
                type: "warning"
            });
        }
    }).catch(function (err) {
        console.log(err);
    });
}

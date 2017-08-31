/*
 * axios封装
 * */
import {Message} from "element-ui";
// import  {PasWord, basicParam} from "../data/basicParam.js";
let randoms = ""
for (let i = 0; i < 4; i++) {
  randoms += "1234567890".substr(Math.floor(Math.random() * 10), 1);
}
let sign = hex_md5(hex_md5(randoms)+'abcd'+randoms)
import {API_URL} from  "../data/Url.js";
const basicParam = {//服务器交互基本参数
  "format": "JSON",
  "random": randoms,
  "sign": sign,
};
export default function axiosUtil(service, options) {
  console.log(service, basicParam, options,'基础参数')
  return axios({
    //url: "http://api.test.zjwlyy.cn/api/app",
    url: 'http://test-sxzz-api.hztywl.cn:6060/getUser',
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

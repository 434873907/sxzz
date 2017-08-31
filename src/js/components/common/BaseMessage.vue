<template>
    <div>
    <div class="deal-content marginP remote-consultation-wrap content-bg-color">
       <div class="base-top">
           <div style="box-sizing:border-box;padding:0px 20px;width:100%;background: #F9F9F9;border:1px solid #E3E1E2;">
               <p style="line-height: 40px;font-size: 14px;">基本信息</p>
           </div>
          <div class="base-message">
           <div class="base-doc">
               <el-button class="btn" type="primary" style="padding:5px 20px;">读市民卡</el-button>
           </div>
              <div class="base-docs" style="margin-top:10px;">
                  <el-form :model="ruleForm"  ref="ruleForm" label-width="100px" class="demo-ruleForm">
                         <div class="base-con">
                             <label><span class="fee-num">*</span>就诊卡号:</label>
                                     <el-select v-model="ruleForm.klx"    style="width:150px;"placeholder="请选择卡号">
                                         <el-option label="省医保" value="0"></el-option>
                                         <el-option label="市医保" value="1"></el-option>
                                         <el-option label="市民卡" value="2"></el-option>
                                         <el-option label="就诊卡" value="3"></el-option>
                                     </el-select>
                                     <el-input
                                             v-model="ruleForm.kh"
                                             style="width:200px;"
                                             size="small"
                                     ></el-input>

                             <label style="margin-left:30px;"><span class="fee-num">*</span>姓&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp名:</label>
                                 <el-input
                                         v-model="ruleForm.yhxm"
                                         style="width:100px;"
                                         size="small"
                                 ></el-input>
                             <label style="margin-left:44px;"><span class="fee-num">*</span>身份证号:</label>
                              <el-input
                                      v-model="ruleForm.zjhm"
                                      style="width:160px;"
                                      size="small"
                                      @blur="getUser(ruleForm.zjhm)"
                              ></el-input>
                      </div>
                         <div class="base-con">
                             <label><span class="fee-num">*</span>性&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp别:</label>
                                     <el-radio class="radio" v-model="ruleForm.xb" label="男">男</el-radio>
                                     <el-radio class="radio" v-model="ruleForm.xb" label="女">女</el-radio>
                             <label style="margin-left:118px;"><span class="fee-num"></span>年龄:</label>
                                 <el-input
                                         v-model="ruleForm.age"
                                         style="width:100px;"
                                         size="small"
                                 ></el-input>
                             <label style="margin-left:30px;"><span class="fee-num">*</span>患者手机号:</label>
                                 <el-input
                                         v-model="ruleForm.sjhm"
                                         style="width:100px;"
                                         size="small"
                                 ></el-input>
                             <label style="margin-left:40px;"><span class="fee-num">*</span>其他联系方式:</label>
                                 <el-input
                                         v-model="ruleForm.lxdh"
                                         style="width:120px;"
                                         size="small"
                                 ></el-input>
                         </div>
                         <div class="base-con">
                             <label><span class="fee-num">*</span>家庭住址:</label>
                                     <el-select v-model="ruleForm.provinceId" placeholder="请选择"  @change="getProvincess"  style="width: 114px"  >
                                         <el-option
                                                 v-for="item in provinces"
                                                 :key="item.id"
                                                 :label="item.name"
                                                 :value="item.id">
                                         </el-option>
                                     </el-select>
                                     <el-select v-model="ruleForm.cityId" placeholder="请选择" @change="getEaras"  style="width: 114px">
                                         <el-option
                                                 v-for="item in citys"
                                                 :key="item.id"
                                                 :label="item.name"
                                                 :value="item.id">
                                         </el-option>
                                     </el-select>
                                     <el-select v-model="ruleForm.regionId" placeholder="请选择"  style="width: 114px">
                                         <el-option
                                                 v-for="item in earas"
                                                 :key="item.id"
                                                 :label="item.name"
                                                 :value="item.id">
                                         </el-option>
                                     </el-select>
                                     <el-input
                                             v-model="ruleForm.lxdz"
                                             style="width:200px;"
                                             size="small"
                                             placeholder="街道等详细地址选择填写"
                                     ></el-input>
                             <label style="margin-left:60px;"><span class="fee-num"></span>医生电话:</label>
                                 <el-input
                                         v-model="ruleForm.sqysdh"
                                         style="width:100px;"
                                         size="small"
                                 ></el-input>
                         </div>
                  </el-form>
              </div>
          </div>
           <div style="box-sizing:border-box;margin-top:10px;padding:0px 20px;width:100%;background: #F9F9F9;border:1px solid #E3E1E2;">
               <p style="line-height: 40px;font-size: 14px;">病情资料</p>
           </div>
           <div class="base-message">
               <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm" style="position: relative">
               <div class="base-con" style="margin-top:10px;float: left;width: 40%">
                   <span style="font-size: 14px;color: #48576a;position:absolute;left:0;top:0;" >初步诊断:</span>
                   <!--<span style="font-size: 14px;color: #48576a;">初步诊断:</span>-->
                   <!--<el-select v-model="value8" filterable placeholder="请选择" style="height:24px;margin-left:5px;">-->
                       <!--<el-input>-->
                       <!--</el-input>-->
                   <!--</el-select>-->

                   <el-input
                           type="text"
                           style="width:60%;margin-left:70px;"
                           v-model="ruleForm.zdjg"
                           width="200"
                           size="small"
                   ></el-input>

                   <el-button class="btn" type="primary" style="margin-left:20px;padding:5px 10px;" @click="getDiagnoseList">常用诊断</el-button>

               </div>
                   <div class="diagnoseList" v-show="showDiagnoseList">
                       <p>常用诊断
                           <span class="delete"><el-button @click="hideDiagnose"  type="primary" style="padding:5px 10px;background: white;color: grey;border: none">X</el-button>
                               </span>
                       </p>
                       <ul>
                           <li @click="getValue(item.zdxx)" v-for="item of diagnoseList"><span>{{item.zdxx}}</span><span class="delete"><el-button  type="primary" style="padding:5px 10px;" @click="delDiagnose(item.zdid)">X</el-button></span></li>
                       </ul>
                       <div class="inputDiagnose">
                           <el-input
                                   type="text"
                                   style="margin-top:10px;resize: none;"
                                   v-model="zdxx"
                                   size="small"
                           ></el-input>
                       </div>
                       <div class="btnDiagnose">
                           <div style="float: right">
                               <el-button  type="primary" style="padding:5px 10px;" @click="addDiagnose" >加入常用诊断</el-button>
                           </div>

                       </div>

                   </div>
                   <div class="base-con" style="height:60px;margin-top:10px;">
                       <span style="font-size: 14px;color: #48576a;position:absolute;left:0;top:0;">病情描述:</span>
                           <el-input
                                   type="textarea"
                                   style="width:70%;margin-left:70px;resize: none;"
                                   v-model="ruleForm.bqms"
                                   width="200"
                                   size="small"
                           ></el-input>
                   </div>
                   <div  style="margin-top:10px;position:relative;">
                       <span style="font-size: 14px;color: #48576a;position:absolute;left:0;top:0;">病例附件:</span>
                           <div class="add-pic-list" >
                               <span v-show="oldImgList" class="showImg" v-for="(item,index) of oldImgList">
                                <img :src="item.wjdz" alt="">
                               </span>
                               <span class="showImg" v-for="(item,index) of imgList">
                                   <span class="showImgSon">
                                       <img @click="delImg(index)" style="width: 50%;height: 50%;margin-left: 15px;margin-top: 15px" src="../../../static/img/del.png" alt="">
                                   </span>
                                <img :src="item" alt="">
                               </span>
                               <el-upload
                                       :action="uploadUrl"
                                       list-type="picture-card"
                                       :data="uploadData"
                                       accept="image/gif,image/jpg,image/jpeg,image/png,image/bmp"
                                       :before-upload="beforeUpload"
                                       :on-success="onSuccessimg"
                                       :on-remove="onRemoveImg"
                                       :file-list="imgUploadList">
                                   <i class="el-icon-plus"></i>
                               </el-upload>
                           </div>
                           <div class="ghost-btn-wrap">

                               <el-upload
                                       :action="uploadUrl"
                                       :data="uploadData"
                                       :before-upload="beforeUploadFile"
                                       :on-success="onSuccessFile"
                                       :on-remove="onRemoveFile"
                                       :file-list="fileUploadList">
                                   <span v-show="oldNameList"  class="showText" v-for="(item,index) of oldNameList">
                                       {{item.name}}
                                   </span>
                                   <span @click.stop="getFile(item.wjdz)"  class="showText" v-for="(item,index) of nameList">
                                       <span @click.stop="delText(index)" class="showTextSon">X</span>
                                       {{item}}
                                   </span>
                                   <span v-show="flag" style="font-size: 14px;color: grey">上传中.....</span>
                                   <el-button size="small" type="primary">点击上传</el-button>
                               </el-upload>
                           </div>
                       <p  style="color:#afafaf;font-size: 12px;">仅支持pdf、xls、xlsx、doc、docx、txt格式，文件小于5M。</p>
                   </div>
               </el-form>
           </div>
       </div>
    </div>
    </div>
</template>
<style>
    .showImg{
        display: inline-block;
        width: 60px;
        height: 60px;
        margin-right: 5px;
        position: relative;
    }
    .showImg:hover .showImgSon{
        display: block;
    }
    .showImgSon{
        position: absolute;
        width: 60px;
        height: 60px;
        line-height: 60px;
        text-align: center;
        vertical-align: middle;
        background: black;
        opacity: .7;
        color: white;
        display: none;
        cursor: pointer;
    }
    .showImg  img{
        width: 60px;
        height: 60px;
        margin-right: 10px;
    }
    .showText{
        display: inline-block;
        min-width: 150px;
        height: 30px;
        width: auto;
        line-height: 1px;
        text-align: center;
        border: 1px solid gainsboro;
        border-radius: 5px;
        background: white;
        padding: 15px 40px;
        font-size: 14px;
        color: grey;
        margin-right: 5px;
        position: relative;
        box-sizing: border-box;
    }
    .showText:hover .showTextSon{
        display: block;
    }
    .showTextSon{
        position: absolute;
        display: none;
        top:10px;
        right: 5px;
    }
.diagnoseList{
    float: left;
    width: 300px;
    border: 1px solid gray;
    margin-top: 13px;
    position: absolute;
    left: 40%;
    top: 0;
    z-index: 888;
    background: white;
}
    .diagnoseList p{
        border-bottom: 1px solid gray;
        padding: 8px;
    }
    .diagnoseList ul{
        border-bottom: 1px solid lightgrey;
        padding-bottom: 10px;
        max-height: 200px;
        overflow: auto;
    }
    .diagnoseList li{
        padding: 10px 8px 0 8px ;

    }
    .delete{
        display: inline-block;
        float: right;
    }
    .inputDiagnose{
    }
    .btnDiagnose{
        padding: 10px 8px 10px 8px ;
        overflow: hidden;
    }
</style>
<script type="text/ecmascript-6">
  import Vue from "vue";
  import { API_URL } from "../../data/Url.js";
  import { basicParam }from "../../data/basicParam";
  import axiosUtil from "../../utils/AxiosUtils.js"
  import { Form, FormItem,Button, Select, Option, DatePicker,Input, Message, Upload } from "element-ui";
  Vue.use(Form);
  Vue.use(FormItem);
  Vue.use(Button);
  Vue.use(Input);
  Vue.use(Select);
  Vue.use(Option);
  Vue.use(DatePicker );
  Vue.use(Upload);
  const upLoadFileCountMax = 9;//最大上传数量
  export default{
      data(){
          return{
              flag:false,
              num:'',
              oldImgList:[],
              oldNameList:[],
              imgList:[],
              nameList:[],
              imgIdList:[],
              textIdList:[],
              userDetail:{},
              zdxx:'',
              diagnoseList:[],
              showDiagnoseList:false,
              value1:'',
              value2:"",
              value3:'',
              citys:[],
              provinces:[],
              earas:[],
              fileList1:[],
              fileList2:[],
              imgSrc:'',
              type:'',
              uploadData: {},//up-load组件的data数据
              attaIdList: [],//需要提交的附件列表
              imgUploadList: [],//需上传的图片列表
              fileUploadList: [],//需上传的文件列表
              uploadFileCount: 0,//上传的文件数量，最大为9个
              uploadUrl: API_URL,//上传图片action地址
              selectedOptions: [],
              options: [],
              value8: '',
              ruleForm: {
                  klx: '',
                  kh: '',
                  yhxm: '',
                  zjhm: '',
                  xb:'',
                  cityId:'',
                  provinceId:'',
                  regionId:'',
                  age:'',
                  sjhm:'',
                  zdjg:"",
                  lxdz:'',
                  lxdh:'',
                  bqms:'',
                  wjidList:[],
                  sqysdh:'',
                  yhid:''
              },
          }
      },
      props:['index','applyDetail'],
      watch:{
          index:function(){
              console.log(5656565);
              let _this=this;
              console.log(_this.ruleForm.wjidList,_this.imgIdList,_this.textIdList)
               var arr = _this.ruleForm.wjidList.concat(_this.imgIdList);
              var arr1= arr.concat(_this.textIdList);

              _this.ruleForm.wjidList = arr1;
              console.log("66666666",_this.ruleForm.wjidList);
              _this.$emit("getDetail",_this.ruleForm);
        },
          applyDetail:function () {
              if(this.applyDetail){
                  this.ruleForm = {
                      ...this.ruleForm,
                      ...this.applyDetail
                  }
                  console.log(this.ruleForm,99);
                  this.oldImgList = this.applyDetail.tpwjdzs
                  this.oldNameList = this.applyDetail.fjwjdzs
                  this.ruleForm.provinceId =parseInt(this.applyDetail.provinceId)
                  this.ruleForm.cityId =parseInt(this.applyDetail.cityId)
                  this.ruleForm.regionId =parseInt(this.applyDetail.regionId)
              }
          }
      },
      mounted(){

        this.getData();
          console.log(this.applyDetail,'看看有数据没');
          if(this.applyDetail){
              this.ruleForm = {
                  ...this.ruleForm,
                  ...this.applyDetail
              }
              console.log(this.ruleForm,99);
              this.oldImgList = this.applyDetail.tpwjdzs
              this.oldNameList = this.applyDetail.fjwjdzs
              this.ruleForm.provinceId =parseInt(this.applyDetail.provinceId)
              this.ruleForm.cityId =parseInt(this.applyDetail.cityId)
              this.ruleForm.regionId =parseInt(this.applyDetail.regionId)
          }
      },
      computed:{
          upLoadList:function(){
              return this.imgUploadList.concat(this.fileUploadList);
          }
      },
      methods: {
          //下载文件
          getFile(url){
              console.log(url,'路径')
//                window.location.href=url;
          },
          getValue(value){
              console.log(value,8888)
              this.$set(this.$data.ruleForm,'zdjg',value)
          },
          hideDiagnose(){
              this.$set(this.$data,'showDiagnoseList',false)
          },
          addDiagnose(){
              axiosUtil('smarthos.sxzz.cbzdAdd.info',{
                  "yyid": "59411511191ce23575a63218",
                  "jgid": "59411511191ce23575a63218",
                  "ysid": "595d05b0f19b9c898a58cf48",
                  "zdxx": this.zdxx
              }).then(res=>{
                  console.log(res,66666);
                  if(res.succ){
                      this.getDiagnoseList();
                      this.zdxx=''
                  }else {
                      alert(res.msg)
                  }
              })
          },
          delDiagnose(id){
              console.log(id,212121);
              if(confirm('确认删除？')) {
                  axiosUtil('smarthos.sxzz.cbzdDelete.info',{
                      "yyid": "59411511191ce23575a63218",
                      "jgid": "59411511191ce23575a63218",
                      "zdid":id
                  }).then(res=>{
                      console.log(res,66666);
                      if(res.succ){
                          this.getDiagnoseList()
                      }else {
                          alert(res.msg)
                      }
                  })
              }else {
                  return false;
              }
          },
          getDiagnoseList(){
              this.$set(this.$data,'showDiagnoseList',true)
                  axiosUtil('smarthos.sxzz.cbzdSelect.info',{
                      "yyid": "59411511191ce23575a63218",
                      "jgid": "59411511191ce23575a63218",
                      "yyr":"595d05b0f19b9c898a58cf48"
                  }).then(res=>{
                      console.log(res,66666);
                      if(res.succ){
                          this.$set(this.$data,'diagnoseList',res.list)
                      }else {
                          alert(res.msg)
                      }
                  })
          },
          getUser(id){
              console.log(7878787878878)
              axiosUtil('smarthos.sxzz.user.list',{
                  "yyid": "59411511191ce23575a63218",
                  "sfzh": id
              }).then(res=>{
                  if(res.succ){
                      this.$set(this.$data,'userDetail',res.list[0])
                      this.ruleForm.provinceId =parseInt(res.list[0].provinceId)
                      this.ruleForm.cityId =parseInt(res.list[0].cityId)
                      this.ruleForm.regionId =parseInt(res.list[0].regionId)
                      this.$set(this.$data.ruleForm,'xb',res.list[0].xb)
                      this.$set(this.$data.ruleForm,'yhxm',res.list[0].yhxm)
                      this.$set(this.$data.ruleForm,'sjhm',res.list[0].sjhm)
                      this.$set(this.$data.ruleForm,'lxdh',res.list[0].lxdh)
                      this.$set(this.$data.ruleForm,'klx',res.list[0].klx)
                      this.$set(this.$data.ruleForm,'lxdz',res.list[0].lxdz)
                      this.$set(this.$data.ruleForm,'kh',res.list[0].kh)
                      this.$set(this.$data.ruleForm,'yhid',res.list[0].yhid)
                      this.$set(this.$data.ruleForm,'age',res.list[0].age)

                  }else {
                     alert(res.msg)
                  }
              })
          },
          getData(id){
              axiosUtil('smarthos.sxzz.province.list',{}).then(res=>{
                  if(res.succ){
                      console.log(res,123123123)
                      var list = res.list;
                        this.provinces = list;
                  }else {
                      alert(res.msg)
                  }
              })
          },
          getProvincess(value){
              this.getCity(value)
          },
          getEaras(value){
              this.earasList(value)
          },
          earasList(value,id){
              axiosUtil('smarthos.sxzz.region.list',{
                  cityId:value
              }).then(res=>{
                  if(res.succ){
                      var list = res.list;
                        this.earas = list;

                  }else {
                      alert(res.msg)
                  }
              })
          },
          getCity(value,id){
              axiosUtil('smarthos.sxzz.city.list',{
                  provinceId:value
              }).then(res=>{
                  if(res.succ){
                      var list = res.list;
                      this.citys = list;
                  }else {
                      alert(res.msg)
                  }
              })
          },
          submitForm(formName) {
              this.$refs[formName].validate((valid) => {
                  if (valid) {
                      alert('submit!');
                  } else {
                      console.log('error submit!!');
                      return false;
                  }
              });
          },
          resetForm(formName) {
              this.$refs[formName].resetFields();
          },
          handleRemove(file, fileList) {
              console.log(file, fileList);
          },
          handlePreview(file) {
              console.log(file);
          },
          handleChange(file, fileList) {
              this.fileList2 = fileList.slice(-3);
          },
          beforeUpload: function(file){//上传图片前钩子函数
              console.log('656565')
              let _this = this;//传递this,确保下方闭包函数this正确
              if(typeof FileReader === 'undefined'){
                  alert( "抱歉，你的浏览器版本过低，请升级浏览器或更换其它浏览器！");
              }
              if(!/image\/\w+/.test(file.type)){
                  alert("请确保文件为图像类型");
                  return false;
              }
              console.log(file,88888)
              let name=file.name;
              let type= file.name.replace(/.+\./,"");
              let reader = new FileReader();
              reader.readAsDataURL(file);
              reader.onload = function(){
                  _this.src = this.result;
                  console.log("dfdfdfd", this.result);
                  _this.imgSrc = this.result;
                  let options = {
                      baseString: _this.src,
                      type:type,
                      fileName:name
                  }
                  axiosUtil("smarthos.sxzz.blzlUpdata.info",options).then(function(res){
                      console.log("444444",res);
                      if(res.succ){
                          _this.imgList.push(_this.src);
                          _this.imgIdList.push(res.obj.tid);
                      }
                  })
              }
             return false
          },
          delImg(index){
              if(confirm('确认删除')){
                  this.imgList.splice(index,1)
                  this.imgIdList.splice(index,1);
                  console.log(this.imgIdList,36363663)
              }

          },
          delText(index){
              if(confirm('确认删除')){
                  this.nameList.splice(index,1)
                  this.textIdList.splice(index,1);
                  console.log(this.textIdList,36363663)
              }
          },
          beforeUploadFile: function(file){//上传文件前钩子函数
              let _this = this;
              let maxsize=1024*500;
              console.log("5555",file.size/1024);
              if(file.size/1024>maxsize){
                  Message({
                      showClose: true,
                      message:"附件大小不能大于500mb",
                      type: "error"
                  })
                  return false;
              }else{
                  console.log(file,3333);
                  _this.flag = true;
                  let name = file.name;
                  let type= file.name.replace(/.+\./,"");
                  let reader = new FileReader();
                  reader.readAsDataURL(file);
                  reader.onload = function(){
                      _this.src = this.result;
                      _this.imgSrc = this.result;
                      let options = {
                          baseString: _this.src,
                          type:type,
                          fileName:name
                      }
                      axiosUtil("smarthos.sxzz.blzlUpdata.info",options).then(function(res){
                          console.log("444444",res);
                          if(res.succ){
                              _this.flag = false;
                              _this.nameList.push(name)
                             _this.textIdList.push(res.obj.tid)
                          }
                      })
                  }
                  return false
              }},
          onRemoveImg: function(file, fileList) {//删除上传图片
              this.imgUploadList = fileList;
          },

          onSuccessimg: function(response, file, fileList){//上传图片成功后钩子
              console.log("222223",this.imgUploadList);
              if(response.succ){
                  this.imgUploadList = fileList;
              }else {
                  Message({
                      showClose: true,
                      message: response.msg,
                      type: "error"
                  });
              }
          },
          onSuccessFile: function(response, file, fileList){//上传文件成功后钩子
              console.log(898989898)
              if(response.succ){
                  this.fileUploadList = fileList;
              }else {
                  Message({
                      showClose: true,
                      message: response.msg,
                      type: "error"
                  });
              }
          },
          onRemoveFile: function (file, fileList) {//删除上传文件
              this.fileUploadList = fileList;
          },
      }
  }
</script>
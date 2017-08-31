//根据后缀名进行文件分类（图片和其他类）
/**
 *
 * @param attaList 需要进行分类的源变量
 * @param imgList 图片文件保持变量
 * @param fileList 其他文件保持变量
 */
export default function fileClassification(attaList, imgList, fileList){
    if(attaList&&attaList.length>0){
        for(let i=0; i<attaList.length; i++){
            let fileName = attaList[i].attaFileName;
            let index = fileName.lastIndexOf(".");
            let suffixName = fileName.substring(index + 1);
            switch (suffixName){//图片文件，push到imgList
                case "png":
                case "PNG":
                case "jpg":
                case "bmp":
                case "JPG":
                case "jpeg":
                case "JPEG":
                case "gif":
                case "GIF":
                    if(imgList){
                        imgList.push(attaList[i]);
                    }
                    break;
                default://其他文件，push到fileList
                    if(fileList){
                        fileList.push(attaList[i]);
                    }
                    break;
            }
        }
    }

}
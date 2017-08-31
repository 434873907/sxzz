/*图片放到处理函数*/
export function imageAmplify(src){
    var img = document.querySelector('.popDisplayPicture');
    img.src = src;
    var div = document.querySelector('.popWhole');
    div.style.display = 'block'

}
export function closeImg(){
    var div = document.querySelector('.popWhole');
    div.style.display = 'none';
}
export function drag(dragEl,body,parentEl,callBack){
    var w=window,
        win=body||dragEl,
        parentEl = parentEl,
        oldX,
        oldY,
        _left,
        _top,
        cl,//鼠标mouseup时的Left
        ct,//鼠标mouseup时的Top
        maxRange={//获取最多可移动距离
            x:parentEl.offsetWidth-dragEl.offsetWidth,
            y:parentEl.offsetHeight-dragEl.offsetHeight
        },
        range=range||function(x){return x};
    dragEl.onmousedown=function (e){
        e=e||event;
        oldX=e.clientX;
        oldY=e.clientY;
        _left=win.offsetLeft;
        _top=win.offsetTop;
        this.ondragstart=function(){return false};//阻止冒泡
        document.onmousemove=e_move;
        document.onmouseup=undrag
    };
    function range(x,type){//获取移动值
        return Math.max(0,Math.min(maxRange[type],x));
    }
    function e_move(e){
        e=e||event;
        cl=range(_left+e.clientX-oldX,'x', parentEl);
        ct=range(_top+e.clientY-oldY,'y', parentEl);
        callBack(cl,ct);
        /*清除拖动过程中会选择文本问题*/
        w.getSelection?w.getSelection().removeAllRanges():
            document.selection.empty();
    }
    function undrag(){
        this.onmousemove=null;
    }

}
/*export function changeSize( dragEl, mask, parentEl){
    //计算选取区域相对图片的位置
    var oldLeft,oldTop,oldWidth,oldHeight;
    var pTop,pLeft,pRight,pDown;
    function caculateP(){
        pTop = mask.offsetTop;
        pLeft = mask.offsetLeft;
        pRight = pLeft + mask.clientWidth;
        pDown = pTop + mask.clientHeight;
    }
    var direct = dragEl.getAttribute("id");
    document.onmousemove = moveHandler;
    document.onmouseup = upHandler;
    function moveHandler(e) {//根据点击不同位置执行不同改变尺寸函数
        window.getSelection?window.getSelection().removeAllRanges():document.selection.empty();
        switch (direct) {
            case 'leftTop':
                moveLeft(e);
                moveUp(e);
                break;
            case 'leftBottom':
                moveLeft(e);
                moveDown(e);
                break;
            case 'rightTop':
                moveRight(e);
                moveUp(e);
                break;
            case 'rightBottom':
                moveRight(e);
                moveDown(e);
                break;
            default:
                console.warn('error');
        }
    }
    function upHandler(){
        this.onmousemove=null;
    }
    function moveLeft(e){
        var leftX = e.clientX;
        //获取拖动小方块距离屏幕左侧距离
        oldLeft = (e.target.currentStyle? e.target.currentStyle : window.getComputedStyle(e.target, null)).left;
        oldWidth = mask.offsetWidth;
        var addWidth = getPosition(dragEl).left - leftX;
        mask.style.width = oldWidth + addWidth + "px";
        mask.style.heigth = oldWidth + addWidth + "px";
        mask.style.left = oldLeft - addWidth + "px";

        //检查选择区域是否超过图片大小
        caculateP();
        if(pLeft < 0){
            mask.style.left = 0;
            mask.style.width = oldWidth +'px';
            mask.style.height = oldWidth +'px';
        }
    }
    function moveRight(e){
        var rightX = e.clientX;

        oldWidth = mask.clientWidth;
        var addWidth = rightX - oldWidth - getPosition(mask).left;

        mask.style.width = oldWidth + addWidth + "px";
        mask.style.height = oldWidth + addWidth + "px";

        //设置选择区域不超过图片大小
        caculateP();
        if(pRight > parentEl.clientWidth){
            mask.style.left = parentEl.clientWidth - oldWidth + "px";
            mask.style.width = oldWidth + "px";
            mask.style.height = oldWidth + "px";
        }
    }
    function moveRight(e){
        var rightX = e.clientX;

        oldWidth = mask.clientWidth;
        var addWidth = rightX - oldWidth - getPosition(mask).left;

        mask.style.width = oldWidth + addWidth + "px";
        mask.style.height = oldWidth + addWidth + "px";

        //设置选择区域不超过图片大小
        caculateP();
        if(pRight > parentEl.clientWidth){
            mask.style.left = parentEl.clientWidth - oldWidth + "px";
            mask.style.width = oldWidth + "px";
            mask.style.height = oldWidth + "px";
        }
    }
    function moveUp(e){
        var upY = e.clientY;

        oldTop = (e.target.currentStyle? e.target.currentStyle : window.getComputedStyle(e.target, null)).top;
        oldHeight = mask.clientHeight;
        var addHeight = getPosition(mask).top - upY;

        mask.style.height = oldHeight + addHeight + "px";
        mask.style.width = oldHeight + addHeight + "px";
        mask.style.top = oldTop - addHeight + "px";

        //设置选择区域不超过图片大小
        caculateP();
        if(pTop < 0){
            mask.style.top = 0;
            mask.style.height = oldHeight + "px";
            mask.style.width = oldHeight + "px";
        }
    }
    function moveDown(e){
        var downY = e.clientY;

        oldHeight = mask.clientHeight;
        var addHeight = downY - oldHeight - getPosition(mask).top;

        mask.style.height = oldHeight+addHeight+'px';
        mask.style.width = oldHeight+addHeight+'px';

        //设置选择区域不超过图片大小
        caculateP();
        if(pDown > parentEl.clientHeight){
            mask.style.top = parentEl.clientHeight - oldHeight +'px';
            mask.style.height = oldHeight + 'px';
            mask.style.width = oldHeight + 'px';
        }
    }
    function getPosition(node){//获取距离屏幕左侧距离
        var position = {
            'left':node.offsetLeft,
            'top':node.offsetTop
        };
        //offsetParent是保存影响当前元素定位的父元素，parentNode则不存在这一关系还会存在文本节点。
        var parent = node.offsetParent;
        while(parent){
            position.left += parent.offsetLeft;
            position.top += parent.offsetTop;
            parent = parent.offsetParent;
        }
        return position;
    }
}*/
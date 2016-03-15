window.onload=function(){
	waterfall('picWalls','image-box');
	// 后台给的数据,判断是否加载图片
	// var dataInt ={"data",[{'src':'0.jpg'}]}
	// window.onscroll=function(){
		
	// 	if (checkScrollSlide) {
	// 		//将数据块渲染到当前页面的底部
	// 		var oParent=document.getElementById('picWalls');
	// 		for (var i = 0; i < dataInt.data.length ; i++) {
	// 			var oBox = document.createElement('div');
	// 			oBox.className='image-box';
	// 			oParent.appendChild(oBox);
	// 			var oPic = document.createElement('div');
	// 			oBox.className='pic';
	// 			oBox.appendChild(oPic);
	// 			var oImg = document.createElement('img');
	// 			oImg.src = 'image/'+dataInt.data[i].src;
	// 			oPic.appendChild(oImg);
	// 		}
			// waterfall('picWalls','image-box');
	// 	}
	// };
}
function waterfall(parent,box){
	//将picWalls下的所有class为image-box的元素取出来
	var oParent = document.getElementById(parent);
	var oBoxs = getByClass(oParent,box);
	// console.log(oBoxs.length);
	//计算整个页面显示的咧数（页面宽/box宽）
	var oBoxW = oBoxs[0].offsetWidth;//获取第一个盒子的宽度
	var cols = Math.floor(document.documentElement.clientWidth/oBoxW);
	//设置picwalls的宽
	oParent.style.cssText = 'width:'+ oBoxW *cols +'px;margin:0 auto;';

	var hArr = [];//存放每列高度的数组
	for (var i = 0; i < oBoxs.length; i++) {
		if (i<cols) {
			hArr.push(oBoxs[i].offsetHeight);
		}else{
			var minH = Math.min.apply(null,hArr);//求最小值
			// console.log(minH);
			var index = getMinhIndex(hArr,minH);
			oBoxs[i].style.position = 'absolute';
			oBoxs[i].style.top= minH+'px';
			// oBoxs[i].style.left=oBoxW*index+'px';
			oBoxs[i].style.left = oBoxs[index].offsetLeft+'px';
			hArr[index]+=oBoxs[i].offsetHeight;
		}
	}
	// console.log(hArr);
}
function getByClass(parent,clsName){
	var boxArr = new Array();//用来存储索取到的所有box
	oElements = parent.getElementsByTagName('*');
	for (var i = 0; i < oElements.length; i++) {
		if(oElements[i].className == clsName){
			boxArr.push(oElements[i]);
		}
	}
	return boxArr;
}
function getMinhIndex(arr,val){
	for (var i in arr){
		if(arr[i] == val){
			return i;
		}
	}
}

// 拖动滚动条时加载图片,判断检测是否加载数据块
function checkScrollSlide(){
	var oParent=document.getElementById('picWalls');
	var oBox = getByClass(oParent,'box');
	var lastBoxH = oBoxs[oBoxs.length-1].offsetTop+Math.floor(oBoxs[oBoxs.length-1].offsetHeight);
	var scrollTop=document.body.scrollTop || document.Element.scrollTop;
	var height = document.body.clientHeight ||document.Element.clientHeight;
	return (lastBoxH<scrollTop+height)?true:false;
}


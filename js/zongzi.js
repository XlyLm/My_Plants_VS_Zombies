// var zombie = document.getElementById('js');
//定时器
// var dsq = setInterval(function(){
// 	zombie.style.left = zombie.offsetLeft - 1 + 'px';
// },100);
//延时器
// setTimeout(function(){
// 	alert('宜宾天气37度')
// },5000)
//1.随机数	Math.random()
//2.水平方向都是一致的 x轴 的值都是一样的
//3.不断复制僵尸节点
//4.复制完僵尸后,僵尸开始行走

//创建僵尸函数
function createZom() {
	//获取讲僵尸节点
	var oldZom = document.getElementsByClassName('zombie')[0];
	// 两秒钟出现新僵尸
	var zao = setInterval(function() {
		// 获取更新植物数量
		var plant = document.getElementsByClassName('plant');
		var plants = [...plant];

		var newZom = oldZom.cloneNode(true);
		newZom.style.position = 'absolute';
		newZom.style.left = "1300px";
		newZom.style.opacity = 1;
		newZom.src = "img/1.gif";
		//在y轴方向上是随机的
		newZom.style.top = 100 + parseInt((Math.random() * 5)) * 110 + 'px';
		newZom.setAttribute("name", "jiangshi");
		newZom.setAttribute("xue", 10);
		document.body.appendChild(newZom);
		plants.forEach(value => {
			if (value.offsetTop === (newZom.offsetTop + 10)) {
				shot(value);
			}
		})

		//僵尸保持静止状态-
		//2秒中后,僵尸切换为行走状态
		//每出现的图户自己往前迈步
		setTimeout(function() {
			newZom.src = "img/js.gif";
			newZom.walk = setInterval(function() {
				newZom.style.left = newZom.offsetLeft - 2 + 'px';
				plants.forEach(value => {
					if (value.offsetTop === (newZom.offsetTop + 10)) {
						var oob = document.elementFromPoint(value.offsetLeft+88, value.offsetTop);
						if((oob && oob.getAttribute('name') === "jiangshi")){
							clearInterval(newZom.walk);
						}
					}
				})
				if (newZom.offsetLeft < 100 && newZom.offsetLeft !== 0) {
					clearInterval(newZom.walk);
					clearInterval(zao);
					plants.forEach(value=>{
						clearInterval(value.bulletCreate);
					})
					clearInterval(csyg);
					// alert("Game Over!");
				}
			}, 100);
		}, 2000)
	}, 3000);
	//阳光出现
	appear();
}
createZom();

//zw是传入的植物的对象
//创建子弹的函数，返回值
function createBullet(zw) {
	// 获取子弹对象
	var zd = document.getElementsByClassName('bullet')[0];
	newZd = zd.cloneNode(true);
	newZd.style.position = 'absolute';
	newZd.style.left = zw.offsetLeft + 80 + 'px';
	newZd.style.top = zw.offsetTop + 20 + 'px';
	newZd.style.opacity = 1;
	newZd.setAttribute("name", "zidan");
	document.body.appendChild(newZd);
	return newZd;
}

//拉动植物
function move(zw) {
	// event event里包含了 当前鼠标的 x和 y的坐标系的值
	// 一点击的时候 植物就跟着鼠标移动			
	// 点击一次 相当去复制一个节点
	var newZw = zw.cloneNode(true);
	newZw.style.position = 'absolute';
	newZw.setAttribute("name", "plant");
	document.body.appendChild(newZw);
	// 鼠标的移动事件
	document.onmousemove = function() {
		newZw.style.top = parseInt(event.y / 110) * 110 + 'px';
		newZw.style.left = 310 + parseInt((event.x - 310) / 105) * 105 + 'px';
	}
	//再点击鼠标一次，让植物停留在你点击的位置
	// 鼠标移动事件和 点击事件同时失去效果,
	newZw.onclick = function() {
		if (event.x > 300 && event.y > 110) {
			// 鼠标移动事件失去效果
			document.onmousemove = null;
			//点击事件失去效果
			newZw.oncli = null;
		}
		shot(newZw);
		// else {
		// 	newZw.style.top = parseInt(event.y / 110) * 110 + 'px';
		// 	newZw.style.left = 310 + parseInt((event.x - 310) / 105) * 105 + 'px';
		// }

	}
}

//发射子弹
function shot(zw) {
	clearInterval(zw.bulletCreate);
	zw.bulletCreate = setInterval(function() {
		// 创建子弹
		var newZd = createBullet(zw);
		newZd.bulletfly = setInterval(function() {
			// 子弹移动
			newZd.style.left = newZd.offsetLeft + 10 + 'px';
			var oob = document.elementFromPoint(newZd.offsetLeft - 50, newZd.offsetTop + 30);
			// 击中目标
			if ((newZd.offsetLeft >= 1400) || (oob && oob.getAttribute('name') === "jiangshi")) {
				clearInterval(newZd.bulletfly);
				newZd.src = 'img/za.gif';
				if (newZd.offsetLeft >= 1400) {
					clearInterval(zw.bulletCreate);
				} else if (oob && oob.getAttribute('name') == "jiangshi") {
					var zhi = parseInt(oob.getAttribute("xue"))
					zhi = zhi - 1;
					oob.setAttribute("xue", zhi);
					if (zhi === 0) {
						oob.src = "img/ZombieDie.gif";
						setTimeout(function() {
							document.body.removeChild(oob);
						}, 500)
					}
				}
				setTimeout(function() {
					document.body.removeChild(newZd);
				}, 200)
			}
		}, 100)
	}, 2000);
}

var csyg=0;
//阳光出现下落
function appear() {
	//每个两秒钟，在水平位置出现阳光
	var oldSun = document.getElementsByClassName('sun')[0];
	csyg = setInterval(function() {
		var newSun = oldSun.cloneNode(true);
		newSun.style.left = 150 + parseInt(Math.random() * 1000) + 'px';
		newSun.style.top = 10 + 'px';
		newSun.style.position = 'absolute';
		newSun.style.opacity = 1;
		document.body.appendChild(newSun);
		setTimeout(function() {
			newSun.down = setInterval(function() {
				newSun.style.top = newSun.offsetTop + 10 + 'px';
				if (newSun.offsetTop >= 600) {
					clearTimeout(newSun.down);
					document.body.removeChild(newSun);
				}
			}, 100)
		}, 1000)
	}, 2000);
}

//点击阳光，获得分数
function getGrade(sun) {
	clearInterval(sun.down);
	var grade = document.getElementById('grade').innerText;
	grade++;
	var xCount = parseInt((sun.offsetLeft-20) / 40);
	var yCount = parseInt((sun.offsetTop-10) / 40);
	if(yCount<=0){
		yCount = 1;
	}
	sun.Back = setInterval(function() {
		sun.style.top = sun.offsetTop - yCount + 'px';
		sun.style.left = sun.offsetLeft - xCount + 'px';
		if (sun.offsetLeft <= 20 || sun.offsetTop <= 10) {
			clearInterval(sun.Back);
			document.body.removeChild(sun);
			document.getElementById('grade').innerText = grade;
		}
	}, 20);
}

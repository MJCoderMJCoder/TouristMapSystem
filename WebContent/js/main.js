/**
 * 
 */
 const URI_PREFIX = "http://localhost:8080/TouristMapSystem/";
// const URI_PREFIX = "http://47.97.199.20:8080/TouristMapSystem/";
let canvas2D;
let token = ""; // 访问令牌
let width; // 获取canvas在铺满整个页面情况下的实际宽度
let height; // 获取canvas在铺满整个页面情况下的实际高度
let safeScenics; // 安全景区数组
$(document).ready(function() {
	/**
	 * 禁用右键菜单
	 */
	$(document).bind("contextmenu", function(event) {
		return false;
	});

	// ========================用户手动涂鸦、绘画景点区域开始===============================
	let sensorX = 0; // 用户将要添加的传感器位置的X坐标
	let sensorY = 0; // 用户将要添加的传感器位置的Y坐标
	let textWidth = 33;// 提示文本框的宽度
	let texHeight = 33; // 提示文本框的高度
	let textX = 0; // 存储提示信息的X坐标
	let textY = 0; // 存储提示信息的Y坐标
	let leftTopX = 0; // 存储用户所涂鸦的矩形的左上角X坐标
	let leftTopY = 0; // 存储用户所涂鸦的矩形的左上角Y坐标
	let rightBottomX = 0; // 存储用户所涂鸦的矩形的右下角X坐标
	let rightBottomY = 0; // 存储用户所涂鸦的矩形的右下角Y坐标
	let maxX = 0; // 存储用户鼠标相关操作的最大X坐标
	let maxY = 0; // 存储用户鼠标相关操作的最大Y坐标
	let isMouseDown = false; // 鼠标是否摁下的标志；true为按下。
	let canvas = $("#canvas")[0]; // 获取canvas
	width = $("#canvas").width(); // 获取canvas在铺满整个页面情况下的实际宽度
	height = $("#canvas").height(); // 获取canvas在铺满整个页面情况下的实际高度
	canvas.width = width; // 设置canvas的宽度为铺满整个页面情况下的实际宽度
	canvas.height = height; // 设置canvas的宽度为铺满整个页面情况下的实际宽度
	let offsetLeft = $("#leftNav").width() + canvas.offsetLeft + 7; // 获取canvas距离原点（0,0）的左偏移
	let offsetTop = $("#topBanner").height() + canvas.offsetTop; // 获取canvas距离原点（0,0）的顶部偏移
	canvas2D = canvas.getContext("2d");// 获取canvas2D
	canvas2D.lineWidth = 5; // 定义线条宽度
	canvas2D.strokeStyle = "#FF0000"; // 定义线条颜色
	canvas2D.lineCap = canvas2D.lineJoin = "round"; // 设置线条接头处为圆滑的
	$("#startTest #canvas").mousedown(function(event) {
		$("#hint").hide();
		canvas2D.clearRect(textX - 5, textY - 5, textWidth + 10, texHeight + 10); // 清除无用的信息提示框
		if (event.button == 0) { // (0:代表左键； 2:代表右键)
			isMouseDown = true;
			canvas2D.beginPath();// 创建绘图路径
			// 移动绘图位置到当前鼠标位置
			leftTopX = event.pageX - offsetLeft;
			leftTopY = event.pageY - offsetTop;
			canvas2D.moveTo(leftTopX, leftTopY);
		}
	});
	$("#startTest #canvas").mousemove(function(event) {
		if (isMouseDown) {
			if ((event.pageX - offsetLeft) >= leftTopX && (event.pageY - offsetTop) >= leftTopY) {
				canvas2D.clearRect(textX - 5, textY - 5, textWidth + 10, texHeight + 10);
				textX = 5;
				textY = 5;
				textWidth = -10;
				maxX = Math.max(maxX, event.pageX - offsetLeft - leftTopX);
				maxY = Math.max(maxY, event.pageY - offsetTop - leftTopY);
				// ===============绘制矩形框开===========
				canvas2D.clearRect(leftTopX - 5, leftTopY - 5, maxX + 10, maxY + 10); // 清除多余的矩形框。
				canvas2D.strokeRect(leftTopX, leftTopY, event.pageX - offsetLeft - leftTopX, event.pageY - offsetTop - leftTopY); // 绘制矩形（无填充）。
				rightBottomX = event.pageX - offsetLeft;
				rightBottomY = event.pageY - offsetTop;
				// $("#startTest span").text(
				// leftTopX + "；" + leftTopY +
				// "。"
				// + rightBottomX
				// + "；"
				// + rightBottomY);
				// ===============绘制矩形框结束===========
				// =======从上一个位置到当前位置绘制线条路径开始=========
				// canvas2D.lineTo(event.pageX,
				// event.pageY)
				// canvas2D.stroke();// 渲染路径
				// canvas2D.moveTo(event.pageX,
				// event.pageY);
				// =======从上一个位置到当前位置绘制线条路径结束=========
			} else {
				let text = "橡皮擦。提示：按下鼠标左键后，向右下方拖拽；可选择景区。";
				textWidth = canvas2D.measureText(text).width + 20;
				canvas2D.clearRect(textX - 5, textY - 5, textWidth + 10, texHeight + 10); // 清除无用的信息提示框
				textX = event.pageX - offsetLeft - 5;
				textY = event.pageY - offsetTop - 5;
				canvas2D.fillStyle = "#000000";
				canvas2D.fillRect(textX, textY, textWidth, texHeight); // 信息提示框
				canvas2D.globalCompositeOperation = "source-over";
				canvas2D.font = "14px arial";
				canvas2D.fillStyle = "#FFFFFF";
				canvas2D.fillText(text, textX + 10, textY + 22); // 信息提示框内的文本字段
				rightBottomX=0; 
				rightBottomY=0;
			}
		}else{
			let canvasHint = $("#canvasHint")[0]; // 获取canvas
			canvasHint.width = width; // 设置canvas的宽度为铺满整个页面情况下的实际宽度
			canvasHint.height = height; // 设置canvas的宽度为铺满整个页面情况下的实际宽度
			let canvasHint2D = canvasHint.getContext("2d");// 获取canvas2D
			canvasHint2D.clearRect(0, 0, width, height); // 清除无用的信息提示框
			$("#hint").show();
		}
	});
	$("#hint #canvasHint").mousemove(function(event) {
		let canvasHint = $("#canvasHint")[0]; // 获取canvas
		canvasHint.width = width; // 设置canvas的宽度为铺满整个页面情况下的实际宽度
		canvasHint.height = height; // 设置canvas的宽度为铺满整个页面情况下的实际宽度
		let canvasHint2D = canvasHint.getContext("2d");// 获取canvas2D
		let textHint = "（"+(event.pageX - offsetLeft)+"，"+(event.pageY - offsetTop)+"）";
		textWidth = canvasHint2D.measureText(textHint).width + 90;
		canvasHint2D.clearRect(textX - 5, textY - 5, textWidth + 10, texHeight + 10); // 清除无用的信息提示框
		textX = event.pageX - offsetLeft - 5;
		textY = event.pageY - offsetTop - 5;
		canvasHint2D.fillStyle = "#000000";
		canvasHint2D.fillRect(textX, textY, textWidth, texHeight); // 信息提示框
		canvasHint2D.globalCompositeOperation = "source-over";
		canvasHint2D.font = "14px arial";
		canvasHint2D.fillStyle = "#FFFFFF";
		canvasHint2D.fillText(textHint, textX + 10, textY + 22); // 信息提示框内的文本字段
		rightBottomX=0; 
		rightBottomY=0;
	});
	$("#startTest #canvas").mouseup(function(event) {
		$("#hint").hide();
		canvas2D.clearRect(textX - 5, textY - 5, textWidth + 10, texHeight + 10); // 清除无用的信息提示框
		if (event.button == 0) {
			isMouseDown = false;
			canvas2D.closePath();// 关闭绘图路径
			maxX = 0;
			maxY = 0;
			if (leftTopX < rightBottomX && leftTopY < rightBottomY) {
				$("#entryScenicModal").show();
				$("#entryScenicModal #entryScenicModalHint").text("左上角坐标：（" + leftTopX + "，" + leftTopY + "）；右下角坐标：（" + rightBottomX + "，" + rightBottomY + "）");
			}
		} else if (event.button == 2) {
			// 获取右键点击坐标
			sensorX = event.pageX - offsetLeft;
			sensorY = event.pageY - offsetTop;
			$("#addSensorModalHint").text("");
			$("#addSensorModal").show();
			$("#addSensorModal .btn-outline-secondary").text("（" + sensorX + "，" + sensorY + "）");
		}
	});
	$("#startTest #canvas").mouseleave(function(event) {
		isMouseDown = false;
		canvas2D.clearRect(leftTopX - 5, leftTopY - 5, maxX, maxY);
		maxX = 0;
		maxY = 0;
		canvas2D.closePath();// 关闭绘图路径
	});
	$("#hint #canvasHint").mouseleave(function(event) {
		$("#hint").hide();
	});
	// ========================用户手动涂鸦、绘画景点区域结束===============================

	/**
	 * 初始用户信息的显示
	 */
	if (typeof (Storage) !== "undefined") {
		token = sessionStorage.token;
		$("#userName").text(sessionStorage.userName);
		$("#userPhone").text("手机：" + sessionStorage.userPhone);
		$("#userGender").text("性别：" + sessionStorage.userGender);
		$("#idNo").text("身份证号：" + sessionStorage.idNo);
		$("#userTypeName").text("角色：" + sessionStorage.userTypeName);
	} else {
		token = getCookie("token");
		$("#userName").text(getCookie("userName"));
		$("#userPhone").text("手机：" + getCookie("userPhone"));
		$("#userGender").text("性别：" + getCookie("userGender"));
		$("#idNo").text("身份证号：" + getCookie("idNo"));
		$("#userTypeName").text("角色：" + getCookie("userTypeName"));
	}
	
	/**
	 * 录入景区的模态框的关闭按钮单击响应事件
	 */
	$("#entryScenicModal .modal-header .close").click(function(event) {
		$("#entryScenicModal").hide();
	});

	/**
	 * 添加传感器节点的模态框的关闭按钮单击响应事件
	 */
	$("#addSensorModal .modal-header .close, #addSensorModal .modal-footer .btn-secondary").click(function(event) {
		$("#addSensorModal").hide();
		canvas2D.clearRect(sensorX - 17, sensorY - 45, sensorX+5, sensorY - 5);
	});

	/**
	 * 用户点击将要添加传感器节点【标位置的按钮】单击响应事件
	 */
	$("#addSensorModal .modal-header .modal-title .btn-outline-secondary").click(function(event) {
		canvas2D.drawImage($("#sensorBlue")[0], sensorX - 23, sensorY - 45);
	});

	/**
	 * 录入景区的模态框的提交按钮单击响应事件
	 */
	const URI_ENTRY_SCENIC = URI_PREFIX + "scenic/insert";
	$("#entryScenicModal .modal-footer .btn").click(function(event) {
		let scenicName = $("#scenicName").val();
		let maxCapacity = $("#maxCapacity").val();
		if(scenicName.length <= 0){
			$("#entryScenicModalHint").addClass("text-danger");
			$("#entryScenicModalHint").text("请输入景区名称");
		}else if(!(/^\d+$/.test(maxCapacity+"")) && maxCapacity<0){ // 【/^\d+$/.test(maxCapacity)】 ：判断maxCapacity是否全部为数字
			$("#entryScenicModalHint").addClass("text-danger");
			$("#entryScenicModalHint").text("最大人数须是不小于0的整数");
		}else {
			$.post(URI_ENTRY_SCENIC, {
				token:token,
				scenicName : scenicName,
				maxCapacity : maxCapacity,
				leftTopX : leftTopX / width, // 将来这个X直接乘以width；就是界面显示需要的真实X坐标
				leftTopY : leftTopY / height, // 将来这个Y直接乘以height；就是界面显示需要的真实Y坐标
				rightBottomX : rightBottomX / width, // 将来这个X直接乘以width；就是界面显示需要的真实X坐标
				rightBottomY : rightBottomY / height, // 将来这个Y直接乘以height；就是界面显示需要的真实Y坐标
			}, function(data, status) {
				// 返回的数据示例：
				// {"success":true,"describe":"该景区信息录入成功","data":null}
				if (status === "success") {
					let parseData = JSON.parse(data);
					if (parseData.success) {
						$("#entryScenicModalHint").removeClass("text-danger");
						$("#entryScenicModalHint").text("左上角坐标：（" + leftTopX + "，" + leftTopY + "）；右下角坐标：（" + rightBottomX + "，" + rightBottomY + "）");
						$("#entryScenicModal").hide();
					} else {
						$("#entryScenicModalHint").addClass("text-danger");
						$("#entryScenicModalHint").text(parseData.describe);
					}
				} else {
					$("#entryScenicModalHint").addClass("text-danger");
					$("#entryScenicModalHint").text(status + "服务异常");
				}
			});
		}
	});

	/**
	 * 添加传感器的模态框的提交按钮单击响应事件
	 */
	const URI_ADD_SENSOR = URI_PREFIX + "sensor/insert";
	$("#addSensorModal .modal-footer .btn-dark").click(function(event) {
		$.post(URI_ADD_SENSOR, {
			token : token,
			sensorX : sensorX / width, // 将来这个X直接乘以width；就是界面显示需要的真实X坐标
			sensorY : sensorY / height, // 将来这个Y直接乘以height；就是界面显示需要的真实Y坐标
		}, function(data, status) {
			// 返回的数据示例：
			// {"success":true,"describe":"传感器添加成功","data":null}}
			if (status === "success") {
				let parseData = JSON.parse(data);
				if (parseData.success) {
					$("#addSensorModalHint").text(parseData.describe);
					$("#addSensorModal").hide();
				} else {
					$("#addSensorModalHint").text(parseData.describe);
				}
			} else {
				$("#addSensorModalHint").text(status + "服务异常");
			}
		});
	});
	
	
	/**
	 * 每隔30秒随机增加1到10个游客节点
	 */
	const URI_ADD_USER = URI_PREFIX + "user/insert";
	const URI_ADD_USER_ASSOCIATED = URI_PREFIX + "userassociated/insert";
	const URI_SELECT_USER = URI_PREFIX + "user/select";
	const URI_UPDATE_USER = URI_PREFIX + "user/update";
	const URI_SELECT_SENSOR = URI_PREFIX + "sensor/select";
	const URI_UPDATE_SENSOR = URI_PREFIX + "sensor/update";
	const URI_SELECT_SAFE_SCENIC = URI_PREFIX + "scenic/selectSafe";
	let users = new Array(); // 游客人数
	let userIdArray = new Array(); // 关联用户间的ID数组
	let sensors = new Array(); // 所有传感器信息
	/**
	 * 查询安全（非危险）景区
	 */
	$.post(URI_SELECT_SAFE_SCENIC,{
		token : token
		}, function(data,status){
		if (status === "success") {
			let parseData = JSON.parse(data);
			if (parseData.success) { // 查询安全（非危险）景区成功
				safeScenics = parseData.data;
			} else { // 服务端返回失败
			}
		} else { // jquery请求异常
		}
	});
	let intervalFunction = function(){
		/**
		 * 查询截止当前的所有游客并更新位置信息
		 */
		$.post(URI_SELECT_USER, {
			 token : token,
			 userType : 3
		 }, function(data, status) {
			 // 返回的数据示例：
			 // {"success":true,"describe":"新增游客成功","data":null}}
			 if (status === "success") {
				 let parseData = JSON.parse(data);
				 if (parseData.success) { // 查询截止当前的游客总数成功
					users = parseData.data;
					let date=new Date();
					let m=(date.getMinutes()<10?"0"+date.getMinutes():date.getMinutes()); // 在小于10的数字前加一个‘0’
					let s=(date.getSeconds()<10?"0"+date.getSeconds():date.getSeconds()); // 在小于10的数字前加一个‘0’
					let formatTime = date.getFullYear()+"年"+(date.getMonth()+1)+"月"+date.getDate()+"日  "+date.getHours()+":"+m+":"+s;
					$("#startTest span").text("截止"+formatTime +" 的游客总人数："+users.length+"。 ");
					$("#scenicState .form-inline span").text("当前游客总数："+users.length+"。 ");
					if(users.length>0){
						canvas2D.clearRect(0, 0, width, height);
					}
					for(let i = 0; i<users.length; i++){
						let user = users[i];
						let isSafe = false;
						for(let safeScenicTemp = 0; safeScenicTemp<safeScenics.length; safeScenicTemp++){
							let safeScenic = safeScenics[safeScenicTemp];
							if(user.userX >= safeScenic.leftTopX && user.userY >= safeScenic.leftTopY && user.userX <= safeScenic.rightBottomX && user.userY <= safeScenic.rightBottomY){
								isSafe = true;
								break;
							}
						}
						if(isSafe){
							canvas2D.drawImage($("#userBlue")[0], user.userX*width - 23, user.userY*height - 40);
						} else {
							canvas2D.drawImage($("#userRed")[0], user.userX*width - 23, user.userY*height - 40);
						}
						let userX = ((Math.round(Math.random()*width)%2===0)?user.userX-Math.random():user.userX+Math.random());
						if ((userX*width) <= 0){
							userX = Math.random();
						}
						if ((userX*width) >= width ){
							userX = 1-Math.random();
						}
						let userY = ((Math.round(Math.random()*height)%2===0)?user.userY-Math.random():user.userY+Math.random());
						if ((userY*height) <= 0){
							userY = Math.random();
						}
						if ((userY*height) >= height ){
							userY = 1-Math.random();
						}
						$.post(URI_UPDATE_USER, {
							userId : user.userId,
							userName : user.userName,
							userPhone : user.userPhone,
							userPassword : user.userPassword,
							userGender : user.userGender,
							idNo : user.idNo,
							userType : user.userType,
							userX : userX,
							userY : userY,
							token : user.token,
						 }, function(data, status) {
							// 返回的数据示例：
						    // {"success":true,"describe":"新增游客成功","data":null}}
							if (status === "success") {
								let parseData = JSON.parse(data);
								if (parseData.success) { // 查询截止当前的游客总数成功
								} else { // 服务端返回失败
								}
							} else { // jquery请求异常
							}
						 });
					}
					if(users.length < 100){
						/*
						 * 添加新用户
						 */
						let associatedUserNo = Math.round(Math.random()*10); // 管理的用户数量【0-10】：每次批量新增的用户数，这些用户互相关联
						for(let i=0; i<associatedUserNo; i++){
							let uuid = new Date().getTime() + Math.round(Math.random()*width*height);
							let userX = Math.random()*width;
							if ((userX*width) <= 0){
								userX = Math.random();
							}
							if ((userX*width) >= width ){
								userX = 1-Math.random();
							}
							let userY = Math.random()*height;
							if ((userY*height) <= 0){
								userY = Math.random();
							}
							if ((userY*height) >= height ){
								userY = 1-Math.random();
							}
							$.post(URI_ADD_USER, {
								token : token,
								userName : uuid,
								userPhone : uuid,
								userPassword : uuid,
								userGender : ((uuid%2)===0?"男":"女"),
								idNo : uuid,
								userType : 3,
								userX : userX,
								userY : userY,
							}, function(data, status) {
								// 返回的数据示例：
								// {"success":true,"describe":"新增游客成功","data":null}}
								if (status === "success") {
									let parseData = JSON.parse(data);
									if (parseData.success) { // 游客关联信息添加成功
										userIdArray[userIdArray.length]=parseData.data.userId;
										if(userIdArray.length===associatedUserNo){
											/*
											 * 添加用户间的关联
											 */
											for(let i = 0; i<userIdArray.length; i++){
												 let userselfId = userIdArray[i];
												 for(let j = 0; j<userIdArray.length; j++){
													 let userRelationshipId = userIdArray[j];
													 if(userselfId !== userRelationshipId){
														 $.post(URI_ADD_USER_ASSOCIATED, {
															 token : token,
															 userselfId : userselfId,
															 userRelationshipId : userRelationshipId,
														 }, function(data, status) {
															 // 返回的数据示例：
															 // {"success":true,"describe":"新增游客成功","data":null}}
															 if (status === "success") {
																 let parseData = JSON.parse(data);
																 if (parseData.success) { // 游客间关联添加成功
																 } else { // 服务端返回失败
																 }
															 } else { // jquery请求异常
															 }
														 });	 
													 }
												 }
											}
											userIdArray.splice(0, userIdArray.length);  // 删除起始下标为1，长度为userIdArray.length的值。清空数组
										}
									} else { // 服务端返回失败
									}
								} else { // jquery请求异常
								}
							});	
						}
					}
				 } else { // 服务端返回失败
				 }
			 } else { // jquery请求异常
			}
		});
		
		/**
		 * 查询所有传感器并更新电量信息
		 */
		if(sensors.length>0){
			for (let i = 0; i < sensors.length; i++) {
				 let sensor = sensors[i];
				 let sensorEnergy = Math.random()*100;
				 while (sensorEnergy>=100 || sensorEnergy<=0){
					 sensorEnergy = Math.random()*100;
				 }
				 $.post(URI_UPDATE_SENSOR, {
					token : token,
					sensorId : sensor.sensorId,
					sensorX : sensor.sensorX,
					sensorY : sensor.sensorY,
					sensorEnergy : sensorEnergy,
				  }, function(data, status) {
					// 返回的数据示例：
				    // {"success":true,"describe":"新增游客成功","data":null}}
					if (status === "success") {
						let parseData = JSON.parse(data);
						if (parseData.success) { // 查询截止当前的游客总数成功
						} else { // 服务端返回失败
						}
					} else { // jquery请求异常
					}
				 });
			 }
		} else {
			$.post(URI_SELECT_SENSOR, {
				 token : token,
			 }, function(data, status) {
				 // 返回的数据示例：
				 // {"success":true,"describe":"新增游客成功","data":null}}
				 if (status === "success") {
					 let parseData = JSON.parse(data);
					 if (parseData.success) { // 查询截止当前的游客总数成功
						 sensors = parseData.data;
						 for (let i = 0; i < sensors.length; i++) {
							 let sensor = sensors[i];
							 let sensorEnergy = Math.random()*100;
							 while (sensorEnergy>=100 || sensorEnergy<=0){
								 sensorEnergy = Math.random()*100;
							 }
							 $.post(URI_UPDATE_SENSOR, {
								token : token,
								sensorId : sensor.sensorId,
								sensorX : sensor.sensorX,
								sensorY : sensor.sensorY,
								sensorEnergy : sensorEnergy,
							  }, function(data, status) {
								// 返回的数据示例：
							    // {"success":true,"describe":"新增游客成功","data":null}}
								if (status === "success") {
									let parseData = JSON.parse(data);
									if (parseData.success) { // 查询截止当前的游客总数成功
									} else { // 服务端返回失败
									}
								} else { // jquery请求异常
								}
							 });
						 }
					 } else { // 服务端返回失败
					 }
				 } else { // jquery请求异常
				}
			});
		}
	};
	let interval = setInterval(intervalFunction, 30000);
	
	/**
	 * Bootstrap4 提示框【有问题待解决】
	 */
	$('[data-toggle="tooltip"]').tooltip();
	
	/**
	 * 在关闭页面是释放资源；清除计时器。
	 */
	$(window).bind("beforeunload", function(){
		clearInterval(interval);
	});
	
	/**
	 * 开始监测
	 */
	$("#startTestNav").click(function(event) {
		clearInterval(interval);
		intervalFunction();
		$("#startTest span").text("加载中... ");
		interval = setInterval(intervalFunction, 30000);
	});
	
	/**
	 * 查询景区状态
	 */
	const URI_SELECT_SCENIC = URI_PREFIX + "scenic/select";
	$("#scenicStateNav").click(function(event) {
		clearInterval(interval);
		$.post(URI_SELECT_SCENIC, {
			token : token,
		}, function(data, status) {
			// 返回的数据示例：
			// {"success":true,"describe":"传感器添加成功","data":null}}
			if (status === "success") {
				let parseData = JSON.parse(data);
				if (parseData.success) {
					$("#scenicState .alert").css("display","none");
					let scenics = parseData.data;
					let html = "";
					let sum = 0;
					let date=new Date();
					let m=(date.getMinutes()<10?"0"+date.getMinutes():date.getMinutes()); // 在小于10的数字前加一个‘0’
					let s=(date.getSeconds()<10?"0"+date.getSeconds():date.getSeconds()); // 在小于10的数字前加一个‘0’
					let formatTime = date.getFullYear()+"年"+(date.getMonth()+1)+"月"+date.getDate()+"日  "+date.getHours()+":"+m+":"+s;
					for(let i=0; i<scenics.length; i++){
						let scenic = scenics[i];
						sum +=scenic.currentNumber;
						if(scenic.maxCapacity>0){
							html += "<tr><td>"+scenic.scenicName+"</td><td>"+formatTime+"</td><td>"+scenic.currentNumber+"</td><td>"+Math.round((scenic.currentNumber/scenic.maxCapacity)*100)+"</td></tr>";
						}else{
							html += "<tr><td>"+scenic.scenicName+"</td><td>"+formatTime+"</td><td>"+scenic.currentNumber+"</td><td>禁区-危险</td></tr>";
						}
					}
					if(sum < users.length){
						html += "<tr><td>其他</td><td>"+formatTime+"</td><td>"+(users.length-sum)+"</td><td>禁区-危险</td></tr>";
					}
					$("#scenicState .table-responsive .table tbody").html(html);
				} else {
					$("#scenicState .alert strong").text(parseData.describe);
					$("#scenicState .alert").css("display","block");
				}
			} else {
				$("#scenicState .alert strong").text(status + "服务异常");
				$("#scenicState .alert").css("display","block");
			}
		});
	});
	
	/**
	 * （查询并）显示所有传感器节点
	 */
	$("#dataAdminNav").click(function(event) {
		clearInterval(interval);
		$("#startTest, #queryVisitor, #scenicState").removeClass("active");
		$("#startTest, #queryVisitor, #scenicState").addClass("fade");
		$("#dataAdmin").removeClass("fade");
		$("#dataAdmin").addClass("active");
		let html = "";
		if(sensors.length>0){
			sensors.sort(function(a,b){return a.sensorId-b.sensorId});
			for (let i = 0; i < sensors.length; i++) {
				let sensor = sensors[i];
				let date=new Date(sensor.lastModifyTime);
				let m=(date.getMinutes()<10?"0"+date.getMinutes():date.getMinutes()); // 在小于10的数字前加一个‘0’
				let s=(date.getSeconds()<10?"0"+date.getSeconds():date.getSeconds()); // 在小于10的数字前加一个‘0’
				let formatTime = date.getFullYear()+"年"+(date.getMonth()+1)+"月"+date.getDate()+"日  "+date.getHours()+":"+m+":"+s;
				if(sensor.sensorEnergy >= 75){
					 html += "<tr class='table-primary'><td><a href='#' onclick='selectBySensorId("+sensor.sensorId+")'>"+sensor.sensorId+"</a></td><td>"+formatTime+"</td><td>（"+(sensor.sensorX*width)+"，"+(sensor.sensorY*height)+"）</td><td>"+Math.round(sensor.sensorEnergy)+"</td></tr>";
				}else if(sensor.sensorEnergy >= 50 && sensor.sensorEnergy<=74){
					 html += "<tr class='table-success'><td><a href='#' onclick='selectBySensorId("+sensor.sensorId+")'>"+sensor.sensorId+"</a></td><td>"+formatTime+"</td><td>（"+(sensor.sensorX*width)+"，"+(sensor.sensorY*height)+"）</td><td>"+Math.round(sensor.sensorEnergy)+"</td></tr>";
				}else if(sensor.sensorEnergy >= 25 && sensor.sensorEnergy<=49){
					 html += "<tr class='table-warning'><td><a href='#' onclick='selectBySensorId("+sensor.sensorId+")'>"+sensor.sensorId+"</a></td><td>"+formatTime+"</td><td>（"+(sensor.sensorX*width)+"，"+(sensor.sensorY*height)+"）</td><td>"+Math.round(sensor.sensorEnergy)+"</td></tr>";
				}else if(sensor.sensorEnergy <= 24){
					 html += "<tr class='table-danger'><td><a href='#' onclick='selectBySensorId("+sensor.sensorId+")'>"+sensor.sensorId+"</a></td><td>"+formatTime+"</td><td>（"+(sensor.sensorX*width)+"，"+(sensor.sensorY*height)+"）</td><td>"+Math.round(sensor.sensorEnergy)+"</td></tr>";
				}else{
					 html += "<tr><td><a href='#' onclick='selectBySensorId("+sensor.sensorId+")'>"+sensor.sensorId+"</a></td><td>"+formatTime+"</td><td>（"+(sensor.sensorX*width)+"，"+(sensor.sensorY*height)+"）</td><td>"+Math.round(sensor.sensorEnergy)+"</td></tr>";
				}
			}
			$("#dataAdmin .table-responsive .table tbody").html(html);
		}else{
			/**
			 * 查询所有传感器信息
			 */
			$.post(URI_SELECT_SENSOR, {
				 token : token
			 }, function(data, status) {
				 // 返回的数据示例：
				 // {"success":true,"describe":"新增游客成功","data":null}}
				 if (status === "success") {
					 let parseData = JSON.parse(data);
					 if (parseData.success) { // 查询截止当前的游客总数成功
						 sensors = parseData.data;
						 for (let i = 0; i < sensors.length; i++) {
							let sensor = sensors[i];
							let date=new Date(sensor.lastModifyTime);
							let m=(date.getMinutes()<10?"0"+date.getMinutes():date.getMinutes()); // 在小于10的数字前加一个‘0’
							let s=(date.getSeconds()<10?"0"+date.getSeconds():date.getSeconds()); // 在小于10的数字前加一个‘0’
							let formatTime = date.getFullYear()+"年"+(date.getMonth()+1)+"月"+date.getDate()+"日  "+date.getHours()+":"+m+":"+s;
							if(sensor.sensorEnergy >= 75){
								 html += "<tr class='table-primary'><td><a href='#' onclick='selectBySensorId("+sensor.sensorId+")'>"+sensor.sensorId+"</a></td><td>"+formatTime+"</td><td>（"+(sensor.sensorX*width)+"，"+(sensor.sensorY*height)+"）</td><td>"+Math.round(sensor.sensorEnergy)+"</td></tr>";
							}else if(sensor.sensorEnergy >= 50 && sensor.sensorEnergy<=74){
								 html += "<tr class='table-success'><td><a href='#' onclick='selectBySensorId("+sensor.sensorId+")'>"+sensor.sensorId+"</a></td><td>"+formatTime+"</td><td>（"+(sensor.sensorX*width)+"，"+(sensor.sensorY*height)+"）</td><td>"+Math.round(sensor.sensorEnergy)+"</td></tr>";
							}else if(sensor.sensorEnergy >= 25 && sensor.sensorEnergy<=49){
								 html += "<tr class='table-warning'><td><a href='#' onclick='selectBySensorId("+sensor.sensorId+")'>"+sensor.sensorId+"</a></td><td>"+formatTime+"</td><td>（"+(sensor.sensorX*width)+"，"+(sensor.sensorY*height)+"）</td><td>"+Math.round(sensor.sensorEnergy)+"</td></tr>";
							}else if(sensor.sensorEnergy <= 24){
								 html += "<tr class='table-danger'><td><a href='#' onclick='selectBySensorId("+sensor.sensorId+")'>"+sensor.sensorId+"</a></td><td>"+formatTime+"</td><td>（"+(sensor.sensorX*width)+"，"+(sensor.sensorY*height)+"）</td><td>"+Math.round(sensor.sensorEnergy)+"</td></tr>";
							}else{
								 html += "<tr><td><a href='#' onclick='selectBySensorId("+sensor.sensorId+")'>"+sensor.sensorId+"</a></td><td>"+formatTime+"</td><td>（"+(sensor.sensorX*width)+"，"+(sensor.sensorY*height)+"）</td><td>"+Math.round(sensor.sensorEnergy)+"</td></tr>";
							}
						 }
						 $("#dataAdmin .table-responsive .table tbody").html(html);
					 } else { // 服务端返回失败
					 }
				 } else { // jquery请求异常
				}
			});
		}
	});
	
	/**
	 * 将所有传感器按照能量升序排列
	 */
	$("#dataAdmin .table-responsive .table thead a").click(function(event) {
		sensors.sort(function(a,b){return a.sensorEnergy-b.sensorEnergy});
		let html = "";
		for (let i = 0; i < sensors.length; i++) {
			let sensor = sensors[i];
			let date=new Date(sensor.lastModifyTime);
			let m=(date.getMinutes()<10?"0"+date.getMinutes():date.getMinutes()); // 在小于10的数字前加一个‘0’
			let s=(date.getSeconds()<10?"0"+date.getSeconds():date.getSeconds()); // 在小于10的数字前加一个‘0’
			let formatTime = date.getFullYear()+"年"+(date.getMonth()+1)+"月"+date.getDate()+"日  "+date.getHours()+":"+m+":"+s;
			if(sensor.sensorEnergy >= 75){
				 html += "<tr class='table-primary'><td><a href='#' onclick='selectBySensorId("+sensor.sensorId+")'>"+sensor.sensorId+"</a></td><td>"+formatTime+"</td><td>（"+(sensor.sensorX*width)+"，"+(sensor.sensorY*height)+"）</td><td>"+Math.round(sensor.sensorEnergy)+"</td></tr>";
			}else if(sensor.sensorEnergy >= 50 && sensor.sensorEnergy<=74){
				 html += "<tr class='table-success'><td><a href='#' onclick='selectBySensorId("+sensor.sensorId+")'>"+sensor.sensorId+"</a></td><td>"+formatTime+"</td><td>（"+(sensor.sensorX*width)+"，"+(sensor.sensorY*height)+"）</td><td>"+Math.round(sensor.sensorEnergy)+"</td></tr>";
			}else if(sensor.sensorEnergy >= 25 && sensor.sensorEnergy<=49){
				 html += "<tr class='table-warning'><td><a href='#' onclick='selectBySensorId("+sensor.sensorId+")'>"+sensor.sensorId+"</a></td><td>"+formatTime+"</td><td>（"+(sensor.sensorX*width)+"，"+(sensor.sensorY*height)+"）</td><td>"+Math.round(sensor.sensorEnergy)+"</td></tr>";
			}else if(sensor.sensorEnergy <= 24){
				 html += "<tr class='table-danger'><td><a href='#' onclick='selectBySensorId("+sensor.sensorId+")'>"+sensor.sensorId+"</a></td><td>"+formatTime+"</td><td>（"+(sensor.sensorX*width)+"，"+(sensor.sensorY*height)+"）</td><td>"+Math.round(sensor.sensorEnergy)+"</td></tr>";
			}else{
				 html += "<tr><td><a href='#' onclick='selectBySensorId("+sensor.sensorId+")'>"+sensor.sensorId+"</a></td><td>"+formatTime+"</td><td>（"+(sensor.sensorX*width)+"，"+(sensor.sensorY*height)+"）</td><td>"+Math.round(sensor.sensorEnergy)+"</td></tr>";
			}
		}
		$("#dataAdmin .table-responsive .table tbody").html(html);
	});
	
	
	/**
	 * （查询并）显示所有游客
	 */
	$("#queryVisitorNav").click(function(event) {
		clearInterval(interval);
		$("#startTest, #dataAdmin, #scenicState").removeClass("active");
		$("#startTest, #dataAdmin, #scenicState").addClass("fade");
		$("#queryVisitor").removeClass("fade");
		$("#queryVisitor").addClass("active");
		let html = "";
		/**
		 * 查询所有游客信息
		 */
		$.post(URI_SELECT_USER, {
			 token : token,
			 userType : 3
		 }, function(data, status) {
			 // 返回的数据示例：
			 // {"success":true,"describe":"新增游客成功","data":null}}
			 if (status === "success") {
				 let parseData = JSON.parse(data);
				 if (parseData.success) { // 查询截止当前的游客总数成功
					 users = parseData.data;
					 for (let i = 0; i < users.length; i++) {
							let user = users[i];
							let date=new Date(user.lastModifyTime);
							let m=(date.getMinutes()<10?"0"+date.getMinutes():date.getMinutes()); // 在小于10的数字前加一个‘0’
							let s=(date.getSeconds()<10?"0"+date.getSeconds():date.getSeconds()); // 在小于10的数字前加一个‘0’
							let formatTime = date.getFullYear()+"年"+(date.getMonth()+1)+"月"+date.getDate()+"日  "+date.getHours()+":"+m+":"+s;
							let isSafe = false;
							for(let safeScenicTemp = 0; safeScenicTemp<safeScenics.length; safeScenicTemp++){
								let safeScenic = safeScenics[safeScenicTemp];
								if(user.userX >= safeScenic.leftTopX && user.userY >= safeScenic.leftTopY && user.userX <= safeScenic.rightBottomX && user.userY <= safeScenic.rightBottomY){
									isSafe = true;
									break;
								}
							}
							if(isSafe){
								html += "<tr><td><a href='#' onclick='selectByUserId("+user.userId+")'>"+user.userId+"</a></td><td>（"+(user.userX*width)+"，"+(user.userY*height)+"）</td><td>"+formatTime+"</td><td>安全</td></tr>";
							} else {
								html += "<tr class='table-danger'><td><a href='#' onclick='selectByUserId("+user.userId+")'>"+user.userId+"</a></td><td>（"+(user.userX*width)+"，"+(user.userY*height)+"）</td><td>"+formatTime+"</td><td>危险</td></tr>";
							}
					 }
					 $("#queryVisitor .table-responsive .table tbody").html(html);
				 } else { // 服务端返回失败
				 }
			} else { // jquery请求异常
			}
		});
	});
	
	const URI_DIMSELECT_USER = URI_PREFIX + "user/dimSelect";
	$("#queryVisitor .form-inline .input-group-append").click(function(event) {
		let value = $("#queryVisitor .form-inline .form-control").val();
		/**
		 * 查询所有游客信息
		 */
		$.post(URI_DIMSELECT_USER, {
			 userId : value,
			 userName : value,
			 userPhone : value,
			 userGender : value,
			 idNo : value,
			 userX : value,
			 userY : value,
			 token : token
		}, function(data, status) {
			// 返回的数据示例：
			// {"success":true,"describe":"新增游客成功","data":null}}
			if (status === "success") {
					let parseData = JSON.parse(data);
					if (parseData.success) { // 查询截止当前的游客总数成功
						let usersTemp = parseData.data;
						let html ="";
						for (let i = 0; i < usersTemp.length; i++) {
							let user = usersTemp[i];
							let date=new Date(user.lastModifyTime);
							let m=(date.getMinutes()<10?"0"+date.getMinutes():date.getMinutes()); // 在小于10的数字前加一个‘0’
							let s=(date.getSeconds()<10?"0"+date.getSeconds():date.getSeconds()); // 在小于10的数字前加一个‘0’
							let formatTime = date.getFullYear()+"年"+(date.getMonth()+1)+"月"+date.getDate()+"日  "+date.getHours()+":"+m+":"+s;
							let isSafe = false;
							for(let safeScenicTemp = 0; safeScenicTemp<safeScenics.length; safeScenicTemp++){
								let safeScenic = safeScenics[safeScenicTemp];
								if(user.userX >= safeScenic.leftTopX && user.userY >= safeScenic.leftTopY && user.userX <= safeScenic.rightBottomX && user.userY <= safeScenic.rightBottomY){
									isSafe = true;
									break;
								}
							}
							if(isSafe){
								html += "<tr><td><a href='#' onclick='selectByUserId("+user.userId+")'>"+user.userId+"</a></td><td>（"+(user.userX*width)+"，"+(user.userY*height)+"）</td><td>"+formatTime+"</td><td>安全</td></tr>";
							} else {
								html += "<tr class='table-danger'><td><a href='#' onclick='selectByUserId("+user.userId+")'>"+user.userId+"</a></td><td>（"+(user.userX*width)+"，"+(user.userY*height)+"）</td><td>"+formatTime+"</td><td>危险</td></tr>";
							}
						}
						$("#queryVisitor .table-responsive .table tbody").html(html);
					} else { // 服务端返回失败
					}
				} else { // jquery请求异常
			}
		});
	});
	
	/**
	 * 跟随鼠标进行坐标显示的提示透明背景界面
	 */
	$("#hint").mousedown(function(event) {
		$("#hint").hide();
		canvas2D.clearRect(textX - 5, textY - 5, textWidth + 10, texHeight + 10); // 清除无用的信息提示框
		if (event.button == 0) { // (0:代表左键； 2:代表右键)
			isMouseDown = true;
			canvas2D.beginPath();// 创建绘图路径
			// 移动绘图位置到当前鼠标位置
			leftTopX = event.pageX - offsetLeft;
			leftTopY = event.pageY - offsetTop;
			canvas2D.moveTo(leftTopX, leftTopY);
		}
	});
});

/**
 * 查询某个传感器节点，并显示。
 */
const URI_SELECT_BYID_SENSOR = URI_PREFIX + "sensor/selectById";
let selectBySensorId = function(sensorId){
	 $.post(URI_SELECT_BYID_SENSOR, {
			 token : token,
			 sensorId : sensorId
		 }, function(data, status) {
			 // 返回的数据示例：
			 // {"success":true,"describe":"传感器信息查询成功","data":{"sensorId":12,"sensorX":0.473389,"sensorY":0.441316,"sensorEnergy":73.8336,"lastModifyTime":1546070723000}}
			 if (status === "success") {
				 let parseData = JSON.parse(data);
				 if (parseData.success) { // 查询截止当前的游客总数成功
					 $("#startTest span").text("");
					 canvas2D.clearRect(0, 0, width, height);
					 $("#dataAdmin").removeClass("active");
					 $("#dataAdmin").addClass("fade");
					 $("#startTest").removeClass("fade");
					 $("#startTest").addClass("active");
					 let sensor = parseData.data;
					 if(sensor.sensorEnergy >= 75){
						 canvas2D.drawImage($("#sensorBlue")[0], ((sensor.sensorX)*width - 23), ((sensor.sensorY)*height - 45));
					 }else if(sensor.sensorEnergy >= 50 && sensor.sensorEnergy<=74){
						 canvas2D.drawImage($("#sensorGreen")[0],  ((sensor.sensorX)*width - 23), ((sensor.sensorY)*height - 45));
					 }else if(sensor.sensorEnergy >= 25 && sensor.sensorEnergy<=49){
						 canvas2D.drawImage($("#sensorYellow")[0], ((sensor.sensorX)*width - 23), ((sensor.sensorY)*height - 45));
					 }else if(sensor.sensorEnergy <= 24){
						 canvas2D.drawImage($("#sensorRed")[0],((sensor.sensorX)*width - 23), ((sensor.sensorY)*height - 45));
					 }else{
						 canvas2D.drawImage($("#sensorGreen")[0], ((sensor.sensorX)*width - 23), ((sensor.sensorY)*height - 45));
					 }
				 } else { // 服务端返回失败
				 }
			 } else { // jquery请求异常
			 }
	 });
}

/**
 * 查询某个游客节点，并显示。
 */
const URI_SELECT_BYID_USER = URI_PREFIX + "user/selectById";
const URI_SELECT_ASSOCIATED_USER = URI_PREFIX + "user/selectAssociated";
let selectByUserId = function(userId){
	$.post(URI_SELECT_BYID_USER, {
			 token : token,
			 userId : userId
		 }, function(data, status) {
			 // 返回的数据示例：
			 // {"success":true,"describe":"传感器信息查询成功","data":{"sensorId":12,"sensorX":0.473389,"sensorY":0.441316,"sensorEnergy":73.8336,"lastModifyTime":1546070723000}}
			 if (status === "success") {
				 let parseData = JSON.parse(data);
				 if (parseData.success) { // 查询截止当前的游客总数成功
					$("#startTest span").text("");
					canvas2D.clearRect(0, 0, width, height);
					$("#queryVisitor").removeClass("active");
					$("#queryVisitor").addClass("fade");
					$("#startTest").removeClass("fade");
					$("#startTest").addClass("active");
					let user = parseData.data;
					let isSafe = false;
					for(let safeScenicTemp = 0; safeScenicTemp<safeScenics.length; safeScenicTemp++){
						let safeScenic = safeScenics[safeScenicTemp];
						if(user.userX >= safeScenic.leftTopX && user.userY >= safeScenic.leftTopY && user.userX <= safeScenic.rightBottomX && user.userY <= safeScenic.rightBottomY){
							isSafe = true;
							break;
						}
					}
					if(isSafe){
						canvas2D.drawImage($("#userBlue")[0], user.userX*width - 23, user.userY*height - 40);
					} else {
						canvas2D.drawImage($("#userRed")[0], user.userX*width - 23, user.userY*height - 40);
					}
					$.post(URI_SELECT_ASSOCIATED_USER, {
						 token : token,
						 userselfId : userId
					 }, function(data, status) {
						 // 返回的数据示例：
						 // {"success":true,"describe":"传感器信息查询成功","data":{"sensorId":12,"sensorX":0.473389,"sensorY":0.441316,"sensorEnergy":73.8336,"lastModifyTime":1546070723000}}
						 if (status === "success") {
							 let parseData = JSON.parse(data);
							 if (parseData.success) { // 查询截止当前的游客总数成功
								let usersTemp = parseData.data;
								for (let i = 0; i < usersTemp.length; i++) {
									let user = usersTemp[i];
									let isSafe = false;
									for(let safeScenicTemp = 0; safeScenicTemp<safeScenics.length; safeScenicTemp++){
										let safeScenic = safeScenics[safeScenicTemp];
										if(user.userX >= safeScenic.leftTopX && user.userY >= safeScenic.leftTopY && user.userX <= safeScenic.rightBottomX && user.userY <= safeScenic.rightBottomY){
											isSafe = true;
											break;
										}
									}
									if(isSafe){
										$("#userGreen").attr("title", "（"+user.userX*width+"，"+user.userY*height+"）")
										canvas2D.drawImage($("#userGreen")[0], user.userX*width - 23, user.userY*height - 40);
									} else {
										$("#userRed").attr("title", "（"+user.userX*width+"，"+user.userY*height+"）")
										canvas2D.drawImage($("#userRed")[0], user.userX*width - 23, user.userY*height - 40);
									}
								}
							 } else { // 服务端返回失败
							 }
						 } else { // jquery请求异常
						 }
					});
				} else { // 服务端返回失败
			}
		} else { // jquery请求异常
		}
	});
}
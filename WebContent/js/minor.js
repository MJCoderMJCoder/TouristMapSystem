/**
 * 
 */
const URI_PREFIX = "http://localhost:8080/TouristMapSystem/";
// const URI_PREFIX = "http://47.97.199.20:8080/TouristMapSystem/";
let token = ""; // 访问令牌
let safeScenics; // 安全景区数组
let userId;
$(document).ready(
		function() {
			/**
			 * 禁用右键菜单
			 */
			$(document).bind("contextmenu", function(event) {
				return false;
			});

			// ========================用户手动涂鸦、绘画景点区域开始===============================
			let textWidth = 33;// 提示文本框的宽度
			let texHeight = 33; // 提示文本框的高度
			let textX = 0; // 存储提示信息的X坐标
			let textY = 0; // 存储提示信息的Y坐标
			let canvas = $("#canvas")[0]; // 获取canvas
			let width = $("#canvas").width(); // 获取canvas在铺满整个页面情况下的实际宽度
			let height = $("#canvas").height(); // 获取canvas在铺满整个页面情况下的实际高度
			canvas.width = width; // 设置canvas的宽度为铺满整个页面情况下的实际宽度
			canvas.height = height; // 设置canvas的宽度为铺满整个页面情况下的实际宽度
			let offsetLeft = canvas.offsetLeft + 7; // 获取canvas距离原点（0,0）的左偏移
			let offsetTop = $("#topBanner").height() + canvas.offsetTop; // 获取canvas距离原点（0,0）的顶部偏移
			let canvas2D = canvas.getContext("2d");// 获取canvas2D
			$("#startTest #canvas").mousedown(function(event) {
				// $("#hint").hide();
			});
			$("#startTest #canvas").mousemove(function(event) {
				let canvasHint = $("#canvasHint")[0]; // 获取canvas
				canvasHint.width = width; // 设置canvas的宽度为铺满整个页面情况下的实际宽度
				canvasHint.height = height; // 设置canvas的宽度为铺满整个页面情况下的实际宽度
				let canvasHint2D = canvasHint.getContext("2d");// 获取canvas2D
				canvasHint2D.clearRect(0, 0, width, height); // 清除无用的信息提示框
				$("#hint").show();
			});
			$("#hint #canvasHint").mousemove(function(event) {
				let canvasHint = $("#canvasHint")[0]; // 获取canvas
				canvasHint.width = width; // 设置canvas的宽度为铺满整个页面情况下的实际宽度
				canvasHint.height = height; // 设置canvas的宽度为铺满整个页面情况下的实际宽度
				let canvasHint2D = canvasHint.getContext("2d");// 获取canvas2D
				let textHint = "（" + (event.pageX - offsetLeft) + "，" + (event.pageY - offsetTop) + "）";
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
			});
			$("#startTest #canvas").mouseleave(function(event) {
				// $("#hint").hide();
			});
			$("#hint #canvasHint").mouseleave(function(event) {
				// $("#hint").hide();
			});
			// ========================用户手动涂鸦、绘画景点区域结束===============================

			/**
			 * 初始用户信息的显示
			 */
			if (typeof (Storage) !== "undefined") {
				token = sessionStorage.token;
				userId = sessionStorage.userId;
				$("#userName").text(sessionStorage.userName);
				$("#userPhone").text("手机：" + sessionStorage.userPhone);
				$("#userGender").text("性别：" + sessionStorage.userGender);
				$("#idNo").text("身份证号：" + sessionStorage.idNo);
				$("#userTypeName").text("角色：" + sessionStorage.userTypeName);
			} else {
				token = getCookie("token");
				userId = getCookie("userId");
				$("#userName").text(getCookie("userName"));
				$("#userPhone").text("手机：" + getCookie("userPhone"));
				$("#userGender").text("性别：" + getCookie("userGender"));
				$("#idNo").text("身份证号：" + getCookie("idNo"));
				$("#userTypeName").text("角色：" + getCookie("userTypeName"));
			}

			/**
			 * 每隔30秒随机
			 */
			const URI_SELECT_BYID_USER = URI_PREFIX + "user/selectById";
			const URI_SELECT_ASSOCIATED_USER = URI_PREFIX + "user/selectAssociated";
			const URI_UPDATE_USER = URI_PREFIX + "user/update";
			const URI_SELECT_SAFE_SCENIC = URI_PREFIX + "scenic/selectSafe";
			let users = new Array(); // 游客人数
			let userIdArray = new Array(); // 关联用户间的ID数组
			/**
			 * 查询安全（非危险）景区
			 */
			$.post(URI_SELECT_SAFE_SCENIC, {
				token : token
			}, function(data, status) {
				if (status === "success") {
					let parseData = JSON.parse(data);
					if (parseData.success) { // 查询安全（非危险）景区成功
						safeScenics = parseData.data;
						intervalFunction();
					} else { // 服务端返回失败
					}
				} else { // jquery请求异常
				}
			});
			let intervalFunction = function() {
				/**
				 * 查询某个游客节点，并显示。
				 */
				$.post(URI_SELECT_BYID_USER, {
					token : token,
					userId : userId
				}, function(data, status) {
					// 返回的数据示例：
					// {"success":true,"describe":"传感器信息查询成功","data":{"sensorId":12,"sensorX":0.473389,"sensorY":0.441316,"sensorEnergy":73.8336,"lastModifyTime":1546070723000}}
					if (status === "success") {
						let parseData = JSON.parse(data);
						if (parseData.success) { // 查询截止当前的游客总数成功
							canvas2D.clearRect(0, 0, width, height);
							let user = parseData.data;
							let isSafe = false;
							for (let safeScenicTemp = 0; safeScenicTemp < safeScenics.length; safeScenicTemp++) {
								let safeScenic = safeScenics[safeScenicTemp];
								if (user.userX >= safeScenic.leftTopX && user.userY >= safeScenic.leftTopY && user.userX <= safeScenic.rightBottomX
										&& user.userY <= safeScenic.rightBottomY) {
									isSafe = true;
									break;
								}
							}
							if (isSafe) {
								canvas2D.drawImage($("#userBlue")[0], user.userX * width - 23, user.userY * height - 40);
							} else {
								canvas2D.drawImage($("#userRed")[0], user.userX * width - 23, user.userY * height - 40);
							}

							let userX = ((Math.round(Math.random() * width) % 2 === 0) ? user.userX - Math.random() : user.userX + Math.random());
							while ((userX * width) <= 0) {
								userX = user.userX + Math.random();
							}
							while ((userX * width) >= width) {
								userX = user.userX - Math.random();
							}
							let userY = ((Math.round(Math.random() * height) % 2 === 0) ? user.userY - Math.random() : user.userY + Math.random());
							while ((userY * height) <= 0) {
								userY = user.userY + Math.random();
							}
							while ((userY * height) >= height) {
								userY = user.userY - Math.random();
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
											for (let safeScenicTemp = 0; safeScenicTemp < safeScenics.length; safeScenicTemp++) {
												let safeScenic = safeScenics[safeScenicTemp];
												if (user.userX >= safeScenic.leftTopX && user.userY >= safeScenic.leftTopY && user.userX <= safeScenic.rightBottomX
														&& user.userY <= safeScenic.rightBottomY) {
													isSafe = true;
													break;
												}
											}
											if (isSafe) {
												canvas2D.drawImage($("#userGreen")[0], user.userX * width - 23, user.userY * height - 40);
											} else {
												canvas2D.drawImage($("#userRed")[0], user.userX * width - 23, user.userY * height - 40);
											}
											let userX = ((Math.round(Math.random() * width) % 2 === 0) ? user.userX - Math.random() : user.userX + Math.random());
											while ((userX * width) <= 0) {
												userX = user.userX + Math.random();
											}
											while ((userX * width) >= width) {
												userX = user.userX - Math.random();
											}
											let userY = ((Math.round(Math.random() * height) % 2 === 0) ? user.userY - Math.random() : user.userY + Math.random());
											while ((userY * height) <= 0) {
												userY = user.userY + Math.random();
											}
											while ((userY * height) >= height) {
												userY = user.userY - Math.random();
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
			};
			let interval = setInterval(intervalFunction, 30000);

			/**
			 * Bootstrap4 提示框【有问题待解决】
			 */
			$('[data-toggle="tooltip"]').tooltip();

			/**
			 * 在关闭页面是释放资源；清除计时器。
			 */
			$(window).bind("beforeunload", function() {
				clearInterval(interval);
			});

			/**
			 * 跟随鼠标进行坐标显示的提示透明背景界面
			 */
			$("#hint").mousedown(function(event) {
				// $("#hint").hide();
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

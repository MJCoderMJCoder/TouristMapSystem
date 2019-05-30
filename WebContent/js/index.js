/**
 * 
 */
const URI_PREFIX = "http://localhost:8080/TouristMapSystem/";
// const URI_PREFIX = "http://47.97.199.20:8080/TouristMapSystem/";
$(document).ready(function() {
	/**
	 * 登录
	 */
	const URI_LOGIN = URI_PREFIX + "user/login";
	const URI_MAIN = URI_PREFIX + "html/main.html";
	const URI_MINOR = URI_PREFIX + "html/minor.html";
	$("#login").click(function() {
		let parent = $(this).parent();
		let idNo = parent.find("#idNo").val();
		let userPassword = parent.find("#userPassword").val();
		if (idNo === "") {
			$("#resultHint").text("请输入身份证号");
		} else if (userPassword === "") {
			$("#resultHint").text("请输入密码");
		} else {
			$.post(URI_LOGIN, {
				idNo : idNo,
				userPassword : userPassword,
			}, function(data, status) {
				// 返回的数据示例：
				// {"success":true,"describe":"登录成功","data":{"userId":1,"userName":"纸纷飞","userPhone":"18334706003","userPassword":"6003","userGender":"男","idNo":"598157378","userType":1,"userX":0.0,"userY":0.0,"lastModifyTime":1545888166000,"token":"eyJ0eXAiOiJKV1QiLCJ0eXBlIjoiSldUIiwiYWxnIjoiSFMyNTYiLCJhbGdvcml0aG0iOiJIUzI1NiJ9.eyJ1c2VyUGFzc3dvcmQiOiI2MDAzIiwidXNlclBob25lIjoiMTgzMzQ3MDYwMDMiLCJjdXJyZW50VGltZU1pbGxpcyI6MTU0NTg4ODE3NDQ3MiwidXNlckdlbmRlciI6IueUtyIsInVzZXJUeXBlIjoxLCJ1c2VyTmFtZSI6Iue6uOe6t-mjniIsImlkTm8iOiI1OTgxNTczNzgifQ.ug7A5z882HVgWPvJdVcBG4LeQl8P8vXW2dQt66HDfHs","userType2":{"userTypeId":1,"userTypeName":"超级管理员"},"userAssociateds":null}}
				if (status === "success") {
					let parseData = JSON.parse(data);
					if (parseData.success) {
						$("#resultHint").text("");
						if (typeof (Storage) !== "undefined") {
							sessionStorage.userId = parseData.data.userId;
							sessionStorage.userName = parseData.data.userName;
							sessionStorage.userPhone = parseData.data.userPhone;
							sessionStorage.userGender = parseData.data.userGender;
							sessionStorage.idNo = parseData.data.idNo;
							sessionStorage.token = parseData.data.token;
							sessionStorage.userTypeId = parseData.data.userType2.userTypeId;
							sessionStorage.userTypeName = parseData.data.userType2.userTypeName;
						} else {
							document.cookie = "userId=" + parseData.data.userId;
							document.cookie = "userName=" + parseData.data.userName;
							document.cookie = "userPhone=" + parseData.data.userPhone;
							document.cookie = "userGender=" + parseData.data.userGender;
							document.cookie = "idNo=" + parseData.data.idNo;
							document.cookie = "token=" + parseData.data.token;
							document.cookie = "userTypeId=" + parseData.data.userType2.userTypeId;
							document.cookie = "userTypeName=" + parseData.data.userType2.userTypeName;
						}
						if (parseData.data.userType2.userTypeId > 2) {
							$(location).prop('href', URI_MINOR + "?token=" + parseData.data.token)
						} else {
							$(location).prop('href', URI_MAIN + "?token=" + parseData.data.token)
						}
					} else {
						$("#resultHint").text(parseData.describe);
					}
				} else {
					$("#resultHint").text(status + "服务异常");
				}
			});
		}
	});

	/**
	 * 给账号添加用户上次输入的默认值
	 */
	if (typeof (Storage) !== "undefined") {
		$("#idNo").val(sessionStorage.idNo);
	} else {
		$("#idNo").val(getCookie("idNo"));
	}

	/**
	 * 获取cookie
	 */
	function getCookie(cookieName) {
		let name = cookieName + "=";
		let ca = document.cookie.split(';');
		for (let i = 0; i < ca.length; i++) {
			let c = ca[i].trim();
			if (c.indexOf(name) == 0) {
				return c.substring(name.length, c.length);
			}
		}
		return "";
	}
});

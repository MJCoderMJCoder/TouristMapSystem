/**
 * 
 */
package com.lzf.entity;

import java.sql.Timestamp;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * @author MJCoder
 *
 *         用户表：目前主要有游客和管理员两大类
 */
public class User {
	private int userId; // 用户Id
	private String userName; // 用户姓名
	private String userPhone; // 用户手机号、账号
	private String userPassword; // 用户密码
	private String userGender; // 用户性别
	private String idNo; // 身份证号
	private int userType; // 用户类型Id：外键
	private float userX; // 用户当前所在位置的X坐标
	private float userY; // 用户当前所在位置的Y坐标
	private Timestamp lastModifyTime; // 最新修改/更新的时间；记录时间
	private String token; // 用户登录后的访问令牌：token

	private UserType userType2; // 用户类型实体
	private List<UserAssociated> userAssociateds; // 用户的人脉圈

	public User() {
		super();
		// TODO Auto-generated constructor stub
	}

	public User(int userId, String userName, String userPhone, String userPassword, String userGender, String idNo, int userType, float userX, float userY,
			Timestamp lastModifyTime, String token, UserType userType2, List<UserAssociated> userAssociateds) {
		super();
		this.userId = userId;
		this.userName = userName;
		this.userPhone = userPhone;
		this.userPassword = userPassword;
		this.userGender = userGender;
		this.idNo = idNo;
		this.userType = userType;
		this.userX = userX;
		this.userY = userY;
		this.lastModifyTime = lastModifyTime;
		this.token = token;
		this.userType2 = userType2;
		this.userAssociateds = userAssociateds;
	}

	public int getUserId() {
		return userId;
	}

	public void setUserId(int userId) {
		this.userId = userId;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getUserPhone() {
		return userPhone;
	}

	public void setUserPhone(String userPhone) {
		this.userPhone = userPhone;
	}

	public String getUserPassword() {
		return userPassword;
	}

	public void setUserPassword(String userPassword) {
		this.userPassword = userPassword;
	}

	public String getUserGender() {
		return userGender;
	}

	public void setUserGender(String userGender) {
		this.userGender = userGender;
	}

	public String getIdNo() {
		return idNo;
	}

	public void setIdNo(String idNo) {
		this.idNo = idNo;
	}

	public int getUserType() {
		return userType;
	}

	public void setUserType(int userType) {
		this.userType = userType;
	}

	public float getUserX() {
		return userX;
	}

	public void setUserX(float userX) {
		this.userX = userX;
	}

	public float getUserY() {
		return userY;
	}

	public void setUserY(float userY) {
		this.userY = userY;
	}

	public Timestamp getLastModifyTime() {
		return lastModifyTime;
	}

	public void setLastModifyTime(Timestamp lastModifyTime) {
		this.lastModifyTime = lastModifyTime;
	}

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}

	public UserType getUserType2() {
		return userType2;
	}

	public void setUserType2(UserType userType2) {
		this.userType2 = userType2;
	}

	public List<UserAssociated> getUserAssociateds() {
		return userAssociateds;
	}

	public void setUserAssociateds(List<UserAssociated> userAssociateds) {
		this.userAssociateds = userAssociateds;
	}

	@Override
	public String toString() {
		return "User [userId=" + userId + ", userName=" + userName + ", userPhone=" + userPhone + ", userPassword=" + userPassword + ", userGender=" + userGender + ", idNo=" + idNo
				+ ", userType=" + userType + ", userX=" + userX + ", userY=" + userY + ", lastModifyTime=" + lastModifyTime + ", token=" + token + ", userType2=" + userType2
				+ ", userAssociateds=" + userAssociateds + "]";
	}

}

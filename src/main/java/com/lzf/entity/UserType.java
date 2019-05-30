package com.lzf.entity;

/**
 * @author MJCoder
 *
 *         用户类型表：超级管理员、管理员、游客
 */
public class UserType {
	private int userTypeId; // 用户类型Id
	private String userTypeName; // 用户类型名称：超级管理员、管理员、游客

	public UserType() {
		super();
		// TODO Auto-generated constructor stub
	}

	public UserType(int userTypeId, String userTypeName) {
		super();
		this.userTypeId = userTypeId;
		this.userTypeName = userTypeName;
	}

	public int getUserTypeId() {
		return userTypeId;
	}

	public void setUserTypeId(int userTypeId) {
		this.userTypeId = userTypeId;
	}

	public String getUserTypeName() {
		return userTypeName;
	}

	public void setUserTypeName(String userTypeName) {
		this.userTypeName = userTypeName;
	}

	@Override
	public String toString() {
		return "UserType [userTypeId=" + userTypeId + ", userTypeName=" + userTypeName + "]";
	}
}

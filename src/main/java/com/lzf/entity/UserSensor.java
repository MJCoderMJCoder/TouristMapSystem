/**
 * 
 */
package com.lzf.entity;

/**
 * @author MJCoder
 *
 *         用户和传感器节点之间的信息
 */
public class UserSensor {

	private int userSensorId; // 自动生成的系统ID：主键
	private int userSensorOne; // 定位节点一的系统编号
	private int userSensorTwo; // 定位节点二的系统编号
	private int userSensorThree; // 定位节点三的系统编号
	private float oneDistance; // 用户与定位节点一的距离
	private float twoDistance; // 用户与定位节点二的距离
	private float threeDistance; // 用户与定位节点三的距离
	private int userId; // 用户Id

	public UserSensor() {
		super();
		// TODO Auto-generated constructor stub
	}

	public UserSensor(int userSensorId, int userSensorOne, int userSensorTwo, int userSensorThree, float oneDistance,
			float twoDistance, float threeDistance, int userId) {
		super();
		this.userSensorId = userSensorId;
		this.userSensorOne = userSensorOne;
		this.userSensorTwo = userSensorTwo;
		this.userSensorThree = userSensorThree;
		this.oneDistance = oneDistance;
		this.twoDistance = twoDistance;
		this.threeDistance = threeDistance;
		this.userId = userId;
	}

	public int getUserSensorId() {
		return userSensorId;
	}

	public void setUserSensorId(int userSensorId) {
		this.userSensorId = userSensorId;
	}

	public int getUserSensorOne() {
		return userSensorOne;
	}

	public void setUserSensorOne(int userSensorOne) {
		this.userSensorOne = userSensorOne;
	}

	public int getUserSensorTwo() {
		return userSensorTwo;
	}

	public void setUserSensorTwo(int userSensorTwo) {
		this.userSensorTwo = userSensorTwo;
	}

	public int getUserSensorThree() {
		return userSensorThree;
	}

	public void setUserSensorThree(int userSensorThree) {
		this.userSensorThree = userSensorThree;
	}

	public float getOneDistance() {
		return oneDistance;
	}

	public void setOneDistance(float oneDistance) {
		this.oneDistance = oneDistance;
	}

	public float getTwoDistance() {
		return twoDistance;
	}

	public void setTwoDistance(float twoDistance) {
		this.twoDistance = twoDistance;
	}

	public float getThreeDistance() {
		return threeDistance;
	}

	public void setThreeDistance(float threeDistance) {
		this.threeDistance = threeDistance;
	}

	public int getUserId() {
		return userId;
	}

	public void setUserId(int userId) {
		this.userId = userId;
	}

	@Override
	public String toString() {
		return "UserSensor [userSensorId=" + userSensorId + ", userSensorOne=" + userSensorOne + ", userSensorTwo="
				+ userSensorTwo + ", userSensorThree=" + userSensorThree + ", oneDistance=" + oneDistance
				+ ", twoDistance=" + twoDistance + ", threeDistance=" + threeDistance + ", userId=" + userId + "]";
	}

}

/**
 * 
 */
package com.lzf.entity;

import java.sql.Timestamp;

/**
 * @author MJCoder
 *
 *         景区节点信息
 */
public class Scenic {
	private int scenicId; // 自动生成的系统ID
	private String scenicName; // 景区名称
	private Timestamp lastModifyTime; // 最新修改/更新的时间；记录时间
	private int maxCapacity; // 最大容纳人数
	private float leftTopX; // 景区左上的X坐标
	private float leftTopY; // 景区左上的Y坐标
	private float rightBottomX; // 景区右底的X坐标
	private float rightBottomY; // 景区右底的Y坐标
	private int currentNumber; // 当前人数

	public Scenic() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Scenic(int scenicId, String scenicName, Timestamp lastModifyTime, int maxCapacity, float leftTopX,
			float leftTopY, float rightBottomX, float rightBottomY, int currentNumber) {
		super();
		this.scenicId = scenicId;
		this.scenicName = scenicName;
		this.lastModifyTime = lastModifyTime;
		this.maxCapacity = maxCapacity;
		this.leftTopX = leftTopX;
		this.leftTopY = leftTopY;
		this.rightBottomX = rightBottomX;
		this.rightBottomY = rightBottomY;
		this.currentNumber = currentNumber;
	}

	public int getScenicId() {
		return scenicId;
	}

	public void setScenicId(int scenicId) {
		this.scenicId = scenicId;
	}

	public String getScenicName() {
		return scenicName;
	}

	public void setScenicName(String scenicName) {
		this.scenicName = scenicName;
	}

	public Timestamp getLastModifyTime() {
		return lastModifyTime;
	}

	public void setLastModifyTime(Timestamp lastModifyTime) {
		this.lastModifyTime = lastModifyTime;
	}

	public int getMaxCapacity() {
		return maxCapacity;
	}

	public void setMaxCapacity(int maxCapacity) {
		this.maxCapacity = maxCapacity;
	}

	public float getLeftTopX() {
		return leftTopX;
	}

	public void setLeftTopX(float leftTopX) {
		this.leftTopX = leftTopX;
	}

	public float getLeftTopY() {
		return leftTopY;
	}

	public void setLeftTopY(float leftTopY) {
		this.leftTopY = leftTopY;
	}

	public float getRightBottomX() {
		return rightBottomX;
	}

	public void setRightBottomX(float rightBottomX) {
		this.rightBottomX = rightBottomX;
	}

	public float getRightBottomY() {
		return rightBottomY;
	}

	public void setRightBottomY(float rightBottomY) {
		this.rightBottomY = rightBottomY;
	}

	public int getCurrentNumber() {
		return currentNumber;
	}

	public void setCurrentNumber(int currentNumber) {
		this.currentNumber = currentNumber;
	}

	@Override
	public String toString() {
		return "Scenic [scenicId=" + scenicId + ", scenicName=" + scenicName + ", lastModifyTime=" + lastModifyTime
				+ ", maxCapacity=" + maxCapacity + ", leftTopX=" + leftTopX + ", leftTopY=" + leftTopY
				+ ", rightBottomX=" + rightBottomX + ", rightBottomY=" + rightBottomY + ", currentNumber="
				+ currentNumber + "]";
	}
}

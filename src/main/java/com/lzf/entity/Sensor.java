/**
 * 
 */
package com.lzf.entity;

import java.sql.Timestamp;

/**
 * @author MJCoder
 *
 *         传感器节点信息
 */
public class Sensor {

	private int sensorId; // 自动生成的系统ID：主键、节点ID
	private float sensorX; // 传感器节点X坐标值
	private float sensorY; // 传感器节点Y坐标值
	private float sensorEnergy; // 传感器节点电量：99%
	private Timestamp lastModifyTime; // 最新修改/更新的时间；记录时间

	public Sensor() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Sensor(int sensorId, float sensorX, float sensorY, float sensorEnergy, Timestamp lastModifyTime) {
		super();
		this.sensorId = sensorId;
		this.sensorX = sensorX;
		this.sensorY = sensorY;
		this.sensorEnergy = sensorEnergy;
		this.lastModifyTime = lastModifyTime;
	}

	public int getSensorId() {
		return sensorId;
	}

	public void setSensorId(int sensorId) {
		this.sensorId = sensorId;
	}

	public float getSensorX() {
		return sensorX;
	}

	public void setSensorX(float sensorX) {
		this.sensorX = sensorX;
	}

	public float getSensorY() {
		return sensorY;
	}

	public void setSensorY(float sensorY) {
		this.sensorY = sensorY;
	}

	public float getSensorEnergy() {
		return sensorEnergy;
	}

	public void setSensorEnergy(float sensorEnergy) {
		this.sensorEnergy = sensorEnergy;
	}

	public Timestamp getLastModifyTime() {
		return lastModifyTime;
	}

	public void setLastModifyTime(Timestamp lastModifyTime) {
		this.lastModifyTime = lastModifyTime;
	}

	@Override
	public String toString() {
		return "Sensor [sensorId=" + sensorId + ", sensorX=" + sensorX + ", sensorY=" + sensorY + ", sensorEnergy="
				+ sensorEnergy + ", lastModifyTime=" + lastModifyTime + "]";
	}

}

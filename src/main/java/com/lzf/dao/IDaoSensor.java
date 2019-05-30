/**
 * 
 */
package com.lzf.dao;

import java.util.List;

import com.lzf.entity.Sensor;

/**
 * @author MJCoder
 *
 */
public interface IDaoSensor {
	/**
	 * 添加传感器
	 * 
	 * @param sensor
	 * @return
	 */
	int insert(Sensor sensor);

	/**
	 * 更新传感器
	 * 
	 * @param sensor
	 * @return
	 */
	int update(Sensor sensor);

	/**
	 * 查询所有传感器
	 * 
	 * @return
	 */
	List<Sensor> select();

	/**
	 * 根据id查询具体的某个传感器
	 * 
	 * @return
	 */
	Sensor selectById(int sensorId);
}

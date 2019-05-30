/**
 * 
 */
package com.lzf.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.lzf.dao.IDaoSensor;
import com.lzf.entity.Sensor;
import com.lzf.service.IServiceSensor;

/**
 * @author MJCoder
 *
 */
@Service
public class ServiceSensor implements IServiceSensor {

	@Resource
	private IDaoSensor daoSensor;

	/**
	 * 
	 */
	public ServiceSensor() {
		// TODO Auto-generated constructor stub
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.lzf.service.IServiceSensor#insert(com.lzf.entity.Sensor)
	 */
	@Override
	public int insert(Sensor sensor) {
		int temp = -1;
		try {
			temp = daoSensor.insert(sensor);
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
		} finally {
			return temp;
		}
	}

	@Override
	public int update(Sensor sensor) {
		int temp = -1;
		try {
			temp = daoSensor.update(sensor);
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			return temp;
		}
	}

	@Override
	public List<Sensor> select() {
		return daoSensor.select();
	}

	@Override
	public Sensor selectById(int sensorId) {
		// TODO Auto-generated method stub
		return daoSensor.selectById(sensorId);
	}

}

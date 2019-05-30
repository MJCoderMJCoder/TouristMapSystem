/**
 * 
 */
package com.lzf.web;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.lzf.entity.Sensor;
import com.lzf.service.IServiceSensor;

/**
 * @author MJCoder
 *
 */

@Controller
@RequestMapping("sensor")
public class ControlSensor {

	@Autowired
	private IServiceSensor serviceSensor;

	/**
	 * 
	 */
	public ControlSensor() {
		// TODO Auto-generated constructor stub
	}

	/**
	 * 添加传感器节点
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "insert", method = RequestMethod.POST)
	@ResponseBody
	private Object insert(HttpServletRequest request) {
		float sensorX = Float.parseFloat(request.getParameter("sensorX"));
		float sensorY = Float.parseFloat(request.getParameter("sensorY"));
		int result = serviceSensor.insert(new Sensor(0, sensorX, sensorY, 0, null));
		DtoPackaging dtoPackaging = null;
		if (result <= 0) {
			dtoPackaging = new DtoPackaging(false, "传感器添加失败", null);
		} else {
			dtoPackaging = new DtoPackaging(true, "传感器添加成功", null);
		}
		return dtoPackaging;
	}

	/**
	 * 查询所有传感器
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "select", method = RequestMethod.POST)
	@ResponseBody
	private Object select() {
		List<Sensor> sensors = serviceSensor.select();
		DtoPackaging dtoPackaging = null;
		if (sensors == null) {
			dtoPackaging = new DtoPackaging(false, "传感器信息查询失败", null);
		} else {
			dtoPackaging = new DtoPackaging(true, "传感器信息查询成功", sensors);
		}
		return dtoPackaging;
	}

	/**
	 * 根据id查询具体的某个传感器
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "selectById", method = RequestMethod.POST)
	@ResponseBody
	private Object selectById(HttpServletRequest request) {
		int sensorId = Integer.parseInt(request.getParameter("sensorId"));
		Sensor sensor = serviceSensor.selectById(sensorId);
		DtoPackaging dtoPackaging = null;
		if (sensor == null) {
			dtoPackaging = new DtoPackaging(false, "传感器信息查询失败", null);
		} else {
			dtoPackaging = new DtoPackaging(true, "传感器信息查询成功", sensor);
		}
		return dtoPackaging;
	}

	/**
	 * 更新传感器节点
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "update", method = RequestMethod.POST)
	@ResponseBody
	private Object update(HttpServletRequest request) {
		int sensorId = Integer.parseInt(request.getParameter("sensorId"));
		float sensorX = Float.parseFloat(request.getParameter("sensorX"));
		float sensorY = Float.parseFloat(request.getParameter("sensorY"));
		float sensorEnergy = Float.parseFloat(request.getParameter("sensorEnergy"));
		int result = serviceSensor.update(new Sensor(sensorId, sensorX, sensorY, sensorEnergy, null));
		DtoPackaging dtoPackaging = null;
		if (result <= 0) {
			dtoPackaging = new DtoPackaging(false, "传感器信息更新失败", null);
		} else {
			dtoPackaging = new DtoPackaging(true, "传感器信息更新成功", null);
		}
		return dtoPackaging;
	}
}

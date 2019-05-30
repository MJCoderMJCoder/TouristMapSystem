/**
 * 
 */
package com.lzf.web;

import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.lzf.entity.Scenic;
import com.lzf.service.IServiceScenic;

/**
 * @author MJCoder
 *
 */
@Controller
@RequestMapping("scenic")
public class ControlScenic {

	@Resource
	private IServiceScenic serviceScenic;

	/**
	 * 
	 */
	public ControlScenic() {
		// TODO Auto-generated constructor stub
	}

	/**
	 * 录入景区信息
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "insert", method = RequestMethod.POST)
	@ResponseBody
	private Object insert(HttpServletRequest request) {
		String scenicName = request.getParameter("scenicName");
		int maxCapacity = Integer.parseInt(request.getParameter("maxCapacity"));
		float leftTopX = Float.parseFloat(request.getParameter("leftTopX"));
		float leftTopY = Float.parseFloat(request.getParameter("leftTopY"));
		float rightBottomX = Float.parseFloat(request.getParameter("rightBottomX"));
		float rightBottomY = Float.parseFloat(request.getParameter("rightBottomY"));
		int result = serviceScenic.insert(new Scenic(0, scenicName, null, maxCapacity, leftTopX, leftTopY, rightBottomX, rightBottomY, 0));
		DtoPackaging dtoPackaging = null;
		if (result <= 0) {
			dtoPackaging = new DtoPackaging(false, "该景区信息录入失败", null);
		} else {
			dtoPackaging = new DtoPackaging(true, "该景区信息录入成功", null);
		}
		return dtoPackaging;
	}

	/**
	 * 景区状态信息查询
	 * 
	 * @return
	 */
	@RequestMapping(value = "select", method = RequestMethod.POST)
	@ResponseBody
	private Object select() {
		List<Scenic> scenics = serviceScenic.select();
		DtoPackaging dtoPackaging = null;
		if (scenics == null) {
			dtoPackaging = new DtoPackaging(false, "景区状态信息查询失败", null);
		} else {
			dtoPackaging = new DtoPackaging(true, "景区状态信息查询成功", scenics);
		}
		return dtoPackaging;
	}

	/**
	 * 安全景区信息查询
	 * 
	 * @return
	 */
	@RequestMapping(value = "selectSafe", method = RequestMethod.POST)
	@ResponseBody
	private Object selectSafe() {
		List<Scenic> scenics = serviceScenic.selectSafe();
		DtoPackaging dtoPackaging = null;
		if (scenics == null) {
			dtoPackaging = new DtoPackaging(false, "景区状态信息查询失败", null);
		} else {
			dtoPackaging = new DtoPackaging(true, "景区状态信息查询成功", scenics);
		}
		return dtoPackaging;
	}
}

/**
 * 
 */
package com.lzf.web;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.junit.Test;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.lzf.entity.UserAssociated;
import com.lzf.service.IServiceUserAssociated;
import com.lzf.service.impl.ServiceUserAssociated;

/**
 * @author MJCoder
 *
 */
@Controller
@RequestMapping("userassociated")
public class ControlUserAssociated {

	@Resource
	private IServiceUserAssociated serviceUserAssociated;

	/**
	 * 
	 */
	public ControlUserAssociated() {
		// TODO Auto-generated constructor stub
	}

	/**
	 * 添加游客关联信息
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "insert", method = RequestMethod.POST)
	@ResponseBody
	private Object insert(HttpServletRequest request) {
		int userselfId = Integer.parseInt(request.getParameter("userselfId"));
		int userRelationshipId = Integer.parseInt(request.getParameter("userRelationshipId"));
		int result = serviceUserAssociated.insert(new UserAssociated(0, null, userselfId, userRelationshipId, null));
		DtoPackaging dtoPackaging = null;
		if (result <= 0) {
			dtoPackaging = new DtoPackaging(false, "游客关联信息录入失败", null);
		} else {
			dtoPackaging = new DtoPackaging(true, "游客关联信息录入成功", null);
		}
		return dtoPackaging;
	}
}

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

import com.lzf.entity.User;
import com.lzf.service.IServiceUser;
import com.lzf.util.JWT;

/**
 * @author MJCoder
 *
 */
@Controller
@RequestMapping("user")
public class ControlUser {

	@Autowired
	private IServiceUser serviceUser;

	/**
	 * 
	 */
	public ControlUser() {
		// TODO Auto-generated constructor stub
	}

	/**
	 * 注册/新增游客
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "insert", method = RequestMethod.POST)
	@ResponseBody
	private Object insert(HttpServletRequest request) {
		String userName = request.getParameter("userName");
		String userPhone = request.getParameter("userPhone");
		String userPassword = request.getParameter("userPassword");
		String userGender = request.getParameter("userGender");
		String idNo = request.getParameter("idNo");
		int userType = Integer.parseInt(request.getParameter("userType"));
		float userX = Float.parseFloat(request.getParameter("userX"));
		float userY = Float.parseFloat(request.getParameter("userY"));
		String token = JWT.sign(userName, userPhone, userPassword, userGender, idNo, userType);
		User user = new User(0, userName, userPhone, userPassword, userGender, idNo, userType, userX, userY, null, token, null, null);
		int result = serviceUser.insert(user);
		DtoPackaging dtoPackaging = null;
		if (result <= 0) {
			dtoPackaging = new DtoPackaging(false, "新增游客失败", null);
		} else {
			// User user = serviceUser.login(idNo, userPassword);
			// if (user == null) {
			// user = serviceUser.login(idNo, userPassword);
			// }
			// dtoPackaging = new DtoPackaging(true, "新增游客成功", user);
			dtoPackaging = new DtoPackaging(true, "新增游客成功", user);
		}
		return dtoPackaging;
	}

	/**
	 * 登录
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "login", method = RequestMethod.POST)
	@ResponseBody
	private Object login(HttpServletRequest request) {
		String idNo = request.getParameter("idNo");
		String userPassword = request.getParameter("userPassword");
		DtoPackaging dtoPackaging = null;
		User user = serviceUser.login(idNo, userPassword);
		if (user == null) {
			user = serviceUser.login(idNo, userPassword);
			if (user == null) {
				dtoPackaging = new DtoPackaging(false, "登录失败；请检查您的账号和密码是否正确。", null);
			} else {
				user.setToken(JWT.sign(user.getUserName(), user.getUserPhone(), user.getUserPassword(), user.getUserGender(), user.getIdNo(), user.getUserType()));
				dtoPackaging = new DtoPackaging(true, "登录成功", user);
				serviceUser.update(user);
			}
		} else {
			user.setToken(JWT.sign(user.getUserName(), user.getUserPhone(), user.getUserPassword(), user.getUserGender(), user.getIdNo(), user.getUserType()));
			dtoPackaging = new DtoPackaging(true, "登录成功", user);
			serviceUser.update(user);
		}
		return dtoPackaging;
	}

	/**
	 * 通过ID查询某个具体的游客用户
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "selectById", method = RequestMethod.POST)
	@ResponseBody
	private Object selectById(HttpServletRequest request) {
		int userId = Integer.parseInt(request.getParameter("userId"));
		User user = serviceUser.selectById(userId);
		DtoPackaging dtoPackaging = null;
		if (user == null) {
			dtoPackaging = new DtoPackaging(false, "查询该用户信息失败。", null);
		} else {
			dtoPackaging = new DtoPackaging(true, "查询该用户信息成功。", user);
		}
		return dtoPackaging;
	}

	/**
	 * 查询关联游客用户
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "selectAssociated", method = RequestMethod.POST)
	@ResponseBody
	private Object selectAssociated(HttpServletRequest request) {
		int userselfId = Integer.parseInt(request.getParameter("userselfId"));
		List<User> users = serviceUser.selectAssociated(userselfId);
		DtoPackaging dtoPackaging = null;
		if (users == null) {
			dtoPackaging = new DtoPackaging(false, "查询该用户信息失败。", null);
		} else {
			dtoPackaging = new DtoPackaging(true, "查询该用户信息成功。", users);
		}
		return dtoPackaging;
	}

	/**
	 * 查询某个用户类型对应的所有用户
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "select", method = RequestMethod.POST)
	@ResponseBody
	private Object select(HttpServletRequest request) {
		int userType = Integer.parseInt(request.getParameter("userType"));
		List<User> users = serviceUser.select(userType);
		DtoPackaging dtoPackaging = null;
		if (users == null) {
			dtoPackaging = new DtoPackaging(false, "查询当前类型的所有用户信息失败。", null);
		} else {
			dtoPackaging = new DtoPackaging(true, "查询当前类型的所有用户信息成功。", users);
		}
		return dtoPackaging;
	}

	/**
	 * 模糊查询游客
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "dimSelect", method = RequestMethod.POST)
	@ResponseBody
	private Object dimSelect(HttpServletRequest request) {
		String userId = request.getParameter("userId");
		String userName = request.getParameter("userName");
		String userPhone = request.getParameter("userPhone");
		String userGender = request.getParameter("userGender");
		String idNo = request.getParameter("idNo");
		String userX = request.getParameter("userX");
		String userY = request.getParameter("userY");
		String token = request.getParameter("token");
		List<User> users = serviceUser.dimSelect(userId, userName, userPhone, userGender, idNo, 3, userX, userY, token);
		DtoPackaging dtoPackaging = null;
		if (users == null) {
			dtoPackaging = new DtoPackaging(false, "查询当前类型的所有用户信息失败。", null);
		} else {
			dtoPackaging = new DtoPackaging(true, "查询当前类型的所有用户信息成功。", users);
		}
		return dtoPackaging;
	}

	/**
	 * 更新用户信息
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "update", method = RequestMethod.POST)
	@ResponseBody
	private Object update(HttpServletRequest request) {
		int userId = Integer.parseInt(request.getParameter("userId"));
		String userName = request.getParameter("userName");
		String userPhone = request.getParameter("userPhone");
		String userPassword = request.getParameter("userPassword");
		String userGender = request.getParameter("userGender");
		String idNo = request.getParameter("idNo");
		int userType = Integer.parseInt(request.getParameter("userType"));
		float userX = Float.parseFloat(request.getParameter("userX"));
		float userY = Float.parseFloat(request.getParameter("userY"));
		String token = request.getParameter("token");
		int result = serviceUser.update(new User(userId, userName, userPhone, userPassword, userGender, idNo, userType, userX, userY, null, token, null, null));
		DtoPackaging dtoPackaging = null;
		if (result <= 0) {
			dtoPackaging = new DtoPackaging(false, "更新当前用户信息失败。", null);
		} else {
			dtoPackaging = new DtoPackaging(true, "更新当前用户信息成功。", null);
		}
		return dtoPackaging;
	}
}

/**
 * 
 */
package com.lzf.util;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.servlet.HandlerInterceptor;

import com.alibaba.fastjson.JSONObject;
import com.lzf.web.DtoPackaging;

/**
 * @author MJCoder
 *
 *         token签名令牌拦截器
 */
public class TokenInterceptor implements HandlerInterceptor {

	/**
	 * 
	 */
	public TokenInterceptor() {
		// TODO Auto-generated constructor stub
	}

	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
		request.setCharacterEncoding("UTF-8");
		response.setCharacterEncoding("UTF-8");
		response.setHeader("Content-Type", "text/html;charset=UTF-8");// 这句话是解决乱码的
		String token = request.getParameter("token");
		System.out.println(request.getRequestURI() + "：" + token);
		if (token != null && JWT.verify(token)) { // token验证成功
			if (request.getRequestURI().contains("html")) {
				if (JWT.getClaimInToken(token, "userType") >= 3 && request.getRequestURI().contains("main.html")) {
					response.sendRedirect(request.getContextPath() + "/html/minor.html?token=" + token);
					return false;
				} else {
					return true;
				}
			} else {
				return true;
			}
		} else {
			// 请求转发比较快一点
			// request.getRequestDispatcher("/index.html").forward(request, response);
			// 重定向在sendRedirect()里面是两个请求，两个响应。response.sendRedirect("/TouristMapSystem/index.html");
			response.sendRedirect(request.getContextPath() + "/index.html");
			return false;
		}
	}
}

/**
 * 
 */
package com.lzf.util;

import java.io.UnsupportedEncodingException;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.Claim;
import com.auth0.jwt.interfaces.DecodedJWT;

/**
 * @author MJCoder
 *
 *         基于JWT的token认证工具类。
 * 
 *         JWT：JSON Web Token，其实token就是一段字符串，由三部分组成：Header，Payload，Signature。
 */
public class JWT {
	/**
	 * 设置15分钟过期也是出于安全考虑，防止token被窃取，不过一般选择基于token认证，传输方式都应该选择https，这样别人无法抓取到我们的请求信息。
	 */
	// private static final long EXPIRE_TIME = 30 * 60 * 1000; // 过期事件30分钟

	/**
	 * 这个私钥是非常重要的，加密解密都需要用到它，要设置的足够复杂并且不能被盗取，这里选用的是一串uuid，加密方式是HMAC256。
	 */
	private static final String TOKEN_SECRED = "纸纷飞【手机号：18334706003；QQ：598157378】"; // ，加密解密都需要用到的token私钥。

	/**
	 * 
	 * 
	 * @param idNo
	 *            身份证号
	 * @param userPassword
	 *            密码
	 * @return
	 */
	/**
	 * 生成签名的token令牌
	 * 
	 * @param userName
	 *            姓名
	 * @param userPhone
	 *            手机号
	 * @param userPassword
	 *            密码
	 * @param userGender
	 *            性别
	 * @param idNo
	 *            身份证号
	 * @param userType
	 *            用户类型
	 * @return 加密的token
	 */
	public static String sign(String userName, String userPhone, String userPassword, String userGender, String idNo, int userType) {
		String token = null;
		try {
			// Date expireDate = new Date(System.currentTimeMillis() + EXPIRE_TIME); // 过期时间
			Algorithm algorithm = Algorithm.HMAC256(TOKEN_SECRED);// 私钥及加密算法
			Map<String, Object> header = new HashMap<String, Object>(); // 设置头部信息Header
			header.put("type", "JWT");
			header.put("algorithm", "HS256");
			token = com.auth0.jwt.JWT.create().withHeader(header).withClaim("userName", userName).withClaim("userPhone", userPhone).withClaim("userPassword", userPassword)
					.withClaim("userGender", userGender).withClaim("idNo", idNo).withClaim("userType", userType).withClaim("currentTimeMillis", System.currentTimeMillis())// .withExpiresAt(expireDate)
					.sign(algorithm);
		} catch (IllegalArgumentException | UnsupportedEncodingException e) {
			e.printStackTrace();
		}
		return token;
	}

	/**
	 * 校验token是否正确
	 * 
	 * @param token
	 *            签名令牌
	 * @return true：验证成功；否则验证失败。
	 */
	public static boolean verify(String token) {
		boolean verifyResult = false;
		try {
			Algorithm algorithm = Algorithm.HMAC256(TOKEN_SECRED);
			com.auth0.jwt.JWTVerifier jwtVerifier = com.auth0.jwt.JWT.require(algorithm).build();
			DecodedJWT decodedJWT = jwtVerifier.verify(token);
			verifyResult = true;
		} catch (IllegalArgumentException | UnsupportedEncodingException e) {
			e.printStackTrace();
		} finally {
			return verifyResult;
		}
	}

	/**
	 * 获取token里携带的信息
	 * 
	 * @param token
	 *            签名令牌
	 * @param name
	 *            token里携带的键名
	 * @return token里携带的键名所对应的信息
	 */
	public static int getClaimInToken(String token, String name) {
		DecodedJWT decodedJWT = com.auth0.jwt.JWT.decode(token);
		Claim claim = decodedJWT.getClaim(name);
		return claim.asInt();
	}
}

/**
 * 
 */
package com.lzf.dao;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.lzf.entity.User;

/**
 * *持久层
 * 
 * org.apache.ibatis.annotations.Param 有两个或以上的参数，一定要给方法的参数添加@Param("")注解，不然mybatis识别不了。注解的参数会自动封装成map集合，括号内即为键。
 * 
 * 只有一个参数，可以不用加 @Param注解，当然加了也无所谓。
 * 
 * @author MJCoder
 *
 */
public interface IDaoUser {

	/**
	 * 用户登录
	 * 
	 * @param idNo
	 * @param userPassword
	 * @return
	 */
	User login(@Param(value = "idNo") String idNo, @Param(value = "userPassword") String userPassword);

	/**
	 * 添加用户、注册用户
	 * 
	 * @param user
	 * @return
	 */
	int insert(User user);

	/**
	 * 更新用户信息
	 * 
	 * @param user
	 * @return
	 */
	int update(User user);

	/**
	 * 通过Id查询某个（游客）用户
	 * 
	 * @param userId
	 * @return
	 */
	User selectById(int userId);

	/**
	 * 查询关联（游客）用户
	 * 
	 * @param userId
	 * @return
	 */
	List<User> selectAssociated(int userselfId);

	/**
	 * 查询某个用户类型对应的所有用户
	 * 
	 * @param userType
	 * @return
	 */
	List<User> select(int userType);

	/**
	 * 模糊查询
	 * 
	 * @param userType
	 * @return
	 */
	List<User> dimSelect(@Param(value = "userId") String userId, @Param(value = "userName") String userName, @Param(value = "userPhone") String userPhone,
			@Param(value = "userGender") String userGender, @Param(value = "idNo") String idNo, @Param(value = "userType") int userType, @Param(value = "userX") String userX,
			@Param(value = "userY") String userY, @Param(value = "token") String token);
}

/**
 * 
 */
package com.lzf.service;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.lzf.entity.User;

/**
 * 业务层
 * 
 * @author MJCoder
 *
 */
public interface IServiceUser {

	User login(String idNo, String userPassword);

	int insert(User user);

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
	List<User> dimSelect(String userId, String userName, String userPhone, String userGender, String idNo, int userType, String userX, String userY, String token);
}

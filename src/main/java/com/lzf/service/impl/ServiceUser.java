/**
 * 
 */
package com.lzf.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.lzf.dao.IDaoUser;
import com.lzf.entity.User;
import com.lzf.service.IServiceUser;

/**
 * @author MJCoder
 *
 */
@Service
public class ServiceUser implements IServiceUser {

	// 注入dao@Autowired
	@Resource
	private IDaoUser daoUser;

	/**
	 * 
	 */
	public ServiceUser() {
		// TODO Auto-generated constructor stub
	}

	@Override
	public User login(String idNo, String userPassword) {
		// TODO Auto-generated method stub
		return daoUser.login(idNo, userPassword);
	}

	@Override
	public int insert(User user) {
		// TODO Auto-generated method stub
		int temp = -1;
		try {
			temp = daoUser.insert(user);
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
		} finally {
			return temp;
		}
	}

	@Override
	public int update(User user) {
		// TODO Auto-generated method stub
		int temp = -1;
		try {
			temp = daoUser.update(user);
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
		} finally {
			return temp;
		}
	}

	@Override
	public List<User> select(int userType) {
		return daoUser.select(userType);
	}

	@Override
	public List<User> dimSelect(String userId, String userName, String userPhone, String userGender, String idNo, int userType, String userX, String userY, String token) {
		// TODO Auto-generated method stub
		return daoUser.dimSelect(userId, userName, userPhone, userGender, idNo, userType, userX, userY, token);
	}

	@Override
	public User selectById(int userId) {
		// TODO Auto-generated method stub
		return daoUser.selectById(userId);
	}

	@Override
	public List<User> selectAssociated(int userselfId) {
		// TODO Auto-generated method stub
		return daoUser.selectAssociated(userselfId);
	}

}

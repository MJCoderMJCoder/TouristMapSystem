/**
 * 
 */
package com.lzf.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.lzf.dao.IDaoUserType;
import com.lzf.entity.UserType;
import com.lzf.service.IServiceUserType;

/**
 * @author MJCoder
 *
 */
@Service
public class ServiceUserType implements IServiceUserType {

	@Autowired
	private IDaoUserType daoUserType;

	/**
	 * 
	 */
	public ServiceUserType() {
		// TODO Auto-generated constructor stub
	}

	@Override
	public int insert(UserType userType) {
		// TODO Auto-generated method stub
		int temp = -1;
		try {
			System.out.println(userType);
			temp = daoUserType.insert(userType);
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
		} finally {
			return temp;
		}
	}

	@Override
	public List<UserType> select() {
		// TODO Auto-generated method stub
		return daoUserType.select();
	}

}

/**
 * 
 */
package com.lzf.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.lzf.dao.IDaoUserAssociated;
import com.lzf.entity.UserAssociated;
import com.lzf.service.IServiceUserAssociated;

/**
 * @author MJCoder
 *
 */
@Service
public class ServiceUserAssociated implements IServiceUserAssociated {

	@Autowired
	private IDaoUserAssociated daoUserAssociated;

	/**
	 * 
	 */
	public ServiceUserAssociated() {
		// TODO Auto-generated constructor stub
	}

	@Override
	public int insert(UserAssociated userAssociated) {
		// TODO Auto-generated method stub
		int temp = -1;
		try {
			temp = daoUserAssociated.insert(userAssociated);
		} catch (Exception e) {
			// TODO: handle exception
		} finally {
			return temp;
		}
	}

}

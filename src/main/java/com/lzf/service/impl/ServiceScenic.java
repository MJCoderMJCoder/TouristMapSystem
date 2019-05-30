/**
 * 
 */
package com.lzf.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.lzf.dao.IDaoScenic;
import com.lzf.entity.Scenic;
import com.lzf.service.IServiceScenic;

/**
 * @author MJCoder
 *
 */
@Service
public class ServiceScenic implements IServiceScenic {

	@Resource
	private IDaoScenic daoScenic;

	/**
	 * 
	 */
	public ServiceScenic() {
		// TODO Auto-generated constructor stub
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.lzf.service.IServiceScenic#insert(com.lzf.entity.Scenic)
	 */
	@Override
	public int insert(Scenic scenic) {
		int temp = -1;
		try {
			temp = daoScenic.insert(scenic);
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
		} finally {
			return temp;
		}
	}

	@Override
	public List<Scenic> select() {
		// TODO Auto-generated method stub
		return daoScenic.select();
	}

	@Override
	public List<Scenic> selectSafe() {
		// TODO Auto-generated method stub
		return daoScenic.selectSafe();
	}

}

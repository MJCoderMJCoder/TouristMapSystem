/**
 * 
 */
package com.lzf.dao;

import java.util.List;

import com.lzf.entity.Scenic;

/**
 * @author MJCoder
 *
 */
public interface IDaoScenic {

	/**
	 * 添加景区
	 * 
	 * @param scenic
	 * @return
	 */
	int insert(Scenic scenic);

	/**
	 * 查询景区状态
	 */
	List<Scenic> select();

	/**
	 * 查询安全（非危险：maxCapacity>0）景区
	 */
	List<Scenic> selectSafe();
}

/**
 * 
 */
package com.lzf.dao;

import com.lzf.entity.UserAssociated;

/**
 * @author MJCoder
 *
 */
public interface IDaoUserAssociated {

	/**
	 * 添加游客间的关联信息
	 * 
	 * @param userAssociated
	 * @return
	 */
	int insert(UserAssociated userAssociated);
}

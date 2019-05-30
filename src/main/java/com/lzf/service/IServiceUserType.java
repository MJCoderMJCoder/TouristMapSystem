/**
 * 
 */
package com.lzf.service;

import java.util.List;

import com.lzf.entity.UserType;

/**
 * @author MJCoder
 *
 */
public interface IServiceUserType {

	List<UserType> select();

	int insert(UserType userType);
}

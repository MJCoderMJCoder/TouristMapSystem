/**
 * 
 */
package com.lzf.entity;

import java.sql.Timestamp;

/**
 * @author MJCoder
 *
 *         用户之间的关联
 */
public class UserAssociated {

	private int userAssociatedId; // 自动生成的系统ID：主键
	private String userAssociatedName; // 用户关联名称：userselfId的userAssociatedName是userAssociatedId；纸纷飞的朋友是孔令军
	private int userselfId; // 用户自己（属于主从关系里的：主用户）
	private int userRelationshipId; // 与用户自己有关系的另一个用户（属于主从关系里的：从用户）
	private Timestamp lastModifyTime; // 最新修改/更新的时间；记录时间

	public UserAssociated() {
		super();
		// TODO Auto-generated constructor stub
	}

	public UserAssociated(int userAssociatedId, String userAssociatedName, int userselfId, int userRelationshipId, Timestamp lastModifyTime) {
		super();
		this.userAssociatedId = userAssociatedId;
		this.userAssociatedName = userAssociatedName;
		this.userselfId = userselfId;
		this.userRelationshipId = userRelationshipId;
		this.lastModifyTime = lastModifyTime;
	}

	public int getUserAssociatedId() {
		return userAssociatedId;
	}

	public void setUserAssociatedId(int userAssociatedId) {
		this.userAssociatedId = userAssociatedId;
	}

	public String getUserAssociatedName() {
		return userAssociatedName;
	}

	public void setUserAssociatedName(String userAssociatedName) {
		this.userAssociatedName = userAssociatedName;
	}

	public int getUserselfId() {
		return userselfId;
	}

	public void setUserselfId(int userselfId) {
		this.userselfId = userselfId;
	}

	public int getUserRelationshipId() {
		return userRelationshipId;
	}

	public void setUserRelationshipId(int userRelationshipId) {
		this.userRelationshipId = userRelationshipId;
	}

	public Timestamp getLastModifyTime() {
		return lastModifyTime;
	}

	public void setLastModifyTime(Timestamp lastModifyTime) {
		this.lastModifyTime = lastModifyTime;
	}

	@Override
	public String toString() {
		return "UserAssociated [userAssociatedId=" + userAssociatedId + ", userAssociatedName=" + userAssociatedName + ", userselfId=" + userselfId + ", userRelationshipId="
				+ userRelationshipId + ", lastModifyTime=" + lastModifyTime + "]";
	}
}

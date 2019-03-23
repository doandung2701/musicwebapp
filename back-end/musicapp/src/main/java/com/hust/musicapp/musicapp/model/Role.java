package com.hust.musicapp.musicapp.model;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Set;

@Entity
@Table(name="roles")
@JsonIdentityInfo(
		generator = ObjectIdGenerators.PropertyGenerator.class,
		property = "roleId")
public class Role implements Serializable{
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "role_id")
	private Long roleId;
	
	@Column(name="role_name")
	private String roleName;
	
	@ManyToMany
	@JoinTable(name = "rolesuser", joinColumns = @JoinColumn(name = "role_id"), inverseJoinColumns = @JoinColumn(name = "user_id"))
	@JsonIgnore
	private Set<User> user;
	/**
	 * @return the roleId
	 */
	
	
	public Long getRoleId() {
		return roleId;
	}
	/**
	 * @return the user
	 */
	public Set<User> getUser() {
		return user;
	}
	/**
	 * @param user the user to set
	 */
	public void setUser(Set<User> user) {
		this.user = user;
	}
	/**
	 * @param roleId the roleId to set
	 */
	public void setRoleId(Long roleId) {
		this.roleId = roleId;
	}
	/**
	 * @return the roleName
	 */
	public String getRoleName() {
		return roleName;
	}
	/**
	 * @param roleName the roleName to set
	 */
	public void setRoleName(String roleName) {
		this.roleName = roleName;
	}
	public Role(Long roleId, String roleName) {
		super();
		this.roleName = roleName;
		this.roleId =roleId;
	}
	public Role() {
		super();
	}
	
	
	
}

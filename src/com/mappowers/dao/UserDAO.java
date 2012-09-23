package com.mappowers.dao;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;


import com.mappowers.model.User;



public class UserDAO {

	private Connection conn;
	
	public UserDAO(Connection conn){
		
		this.conn = conn;
		
	}
	
	public User getUser(String id) throws SQLException{
		
		String sql = "select * from user where id='"+id+"'";
		Statement stmt = conn.createStatement();
		ResultSet rs = stmt.executeQuery(sql);
		User user = null;
		
		if(rs.next()){
			
			user = new User();
			user.setId(rs.getInt(1));
			user.setName(rs.getString(2));
			user.setEmail(rs.getString(3));
			user.setPassword(rs.getString(4));
			
		}
		
		return user;
		
	}
	
	public User getUser(String name,String password) throws SQLException{
		
		String sql = "select * from user where name='"+name+"' and password='"+password+"'";
		Statement stmt = conn.createStatement();
		ResultSet rs = stmt.executeQuery(sql);
		User user = null;
		
		if(rs.next()){
			
			user = new User();
			user.setId(rs.getInt(1));
			user.setName(rs.getString(2));
			user.setEmail(rs.getString(3));
			user.setPassword(rs.getString(4));
			
		}
		
		return user;
		
	}
	
}

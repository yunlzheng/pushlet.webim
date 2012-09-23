package com.mappowers.util;

import java.sql.Connection;
import java.sql.DriverManager;

import javax.naming.Context;
import javax.naming.InitialContext;
import javax.sql.DataSource;

public class ConnFactory {

	static String Username = "root";
	static String Password = "111111";
	static String DriverName = "com.mysql.jdbc.Driver";
	static String DatabaseName = "mappowersdb";

	
	/**
	 * 本地数据库连接方法测试使用
	 * */
	public static Connection getConn(){
		

		Connection cn = null;
		
		try {

			Class.forName(DriverName);
			//cn = DriverManager.getConnection("jdbc:sqlserver://202.115.90.241:1433;DatabaseName="+ DatabaseName, Username, Password);
			cn = DriverManager.getConnection("jdbc:mysql://localhost/"+ DatabaseName, Username, Password);
			
		
		} catch (Exception e) {

			e.printStackTrace();

		}
		System.out.println("本地测试连接成功");
		return cn;
		
	}
	


	
	public static void close(Connection cn){
		
		try{
			
			if(cn!=null){
				
				cn.close();
				 System.out.println("Connection is closing....");
			}
		
		}catch(Exception e){
			
			e.printStackTrace();
			
		}
		
	}
	
	public static void main(String[] args){
		
		ConnFactory.getConn();
		
		
	}
	
}

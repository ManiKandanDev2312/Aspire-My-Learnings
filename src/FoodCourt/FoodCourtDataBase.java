package FoodCourt;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;

// this class is for database connectivity for this application
public class FoodCourtDataBase {
	private String databaseUrl;
	private String databaseUser;
	private String databasePassword;
	private String databasePort;
	static Connection connection;
	static PreparedStatement preparedStatement;
	// this block is for set the credentials for the database
	
	FoodCourtDataBase(String databaseUrl,String databaseUser,String databasePassword,String databasePort){
		this.databaseUrl = databaseUrl;
		this.databaseUser = databaseUser;
		this.databasePassword = databasePassword;
		this.databasePort = databasePort;
		
		try {
			connection = DriverManager.getConnection(databaseUrl, databaseUser, databasePassword);
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	// this block is for insert new Customer to the database
	public static boolean insertCustomer(HashMap customerDetails) {
		String Query = "INSERT INTO CUSTOMER VALUES(?,?,?,?,?)";
		int resultRowCount=0;
		try {
			
			preparedStatement = connection.prepareStatement(Query);
			
			preparedStatement.setString(1, customerDetails.get("customerName").toString());
			preparedStatement.setLong(2,(long) customerDetails.get("customerPhoneNumber"));
			preparedStatement.setString(3, customerDetails.get("customerEmail").toString());
			preparedStatement.setString(4, customerDetails.get("customerPassword").toString());
			preparedStatement.setInt(5, (int)customerDetails.get("customerID"));
			
			resultRowCount = preparedStatement.executeUpdate();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		if(resultRowCount==1) 
			return true;
		
		return false;
	}
	
	// this block is for read Customer From the database
	public static HashMap readCustomer(long customerPhoneNumber) {
		
		HashMap customerDetails = new HashMap();
		String Query = "SELECT * FROM CUSTOMER";
		try {
			preparedStatement = connection.prepareStatement(Query);
			ResultSet resultSet=preparedStatement.executeQuery();
			
			while(resultSet.next()) {
				if(resultSet.getLong(2) == customerPhoneNumber) {
					customerDetails.put("customerName", resultSet.getString(1));
					customerDetails.put("customerPhoneNumber", resultSet.getLong(2));
					customerDetails.put("customerEmail", resultSet.getString(3));
					customerDetails.put("customerPassword", resultSet.getString(4));
					customerDetails.put("customerID", resultSet.getInt(5));
				}
			}
				
			
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		
		return customerDetails;
	}
	
	
	// this block is for update the customer password
	public static boolean updateCustomerPassword(long customerPhoneNumber, String customerPassword) {
		
		String Query="UPDATE CUSTOMER SET CUSTOMER_PASSWORD = ? WHERE CUSTOMER_PHONENUMBER= ?";
		int resultRowCount =0;
		
		try {
			HashMap customerDetails = readCustomer(customerPhoneNumber);
			preparedStatement = connection.prepareStatement(Query);
			preparedStatement.setString(1, customerPassword);
			preparedStatement.setLong(2, customerPhoneNumber);
			resultRowCount = preparedStatement.executeUpdate();
		} catch (SQLException sqlException) {
			// TODO Auto-generated catch block
			sqlException.printStackTrace();
		}catch(NullPointerException nullPointerException) {
			System.out.println("INVALID CREDENTIALS TRY AGAIN");
		}
		
		if(resultRowCount == 1)
			return true;
		
		return false;
	}
	
	// this method is for read all the customerDetails
	public static ArrayList readAllCustomer() {
		String Query = " SELECT * FROM CUSTOMER";
		ArrayList customerDetails = new ArrayList();
		HashMap hashMap= new HashMap();
		try {
			preparedStatement = connection.prepareStatement(Query);
			ResultSet resultSet = preparedStatement.executeQuery();
			
			while(resultSet.next()) {
				hashMap.put("customerName", resultSet.getString(1));
				hashMap.put("customerPhoneNumber", resultSet.getLong(2));
				hashMap.put("customerEmail", resultSet.getString(3));
				hashMap.put("customerPassword", resultSet.getString(4));
				hashMap.put("customerID", resultSet.getInt(5));
				customerDetails.add(hashMap);
			}
			
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
	
		
		return customerDetails;
	}
	
	// this method is for read the hotels
	public static ArrayList readHotel() {
		String Query = "SELECT * FROM HOTEL";
		
		ArrayList hotelDetails = new ArrayList();
		try {
			preparedStatement = connection.prepareStatement(Query);
			ResultSet resultSet = preparedStatement.executeQuery();
			while(resultSet.next()) {
				HashMap hotelDetail = new HashMap();
				hotelDetail.put("hotelID", resultSet.getInt(1));
				hotelDetail.put("hotelName", resultSet.getString(2));
				hotelDetails.add(hotelDetail);
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return hotelDetails;
	}
	
	// this method is for read the Dish
		public static ArrayList readDishes(int hotelId) {
			String Query = "SELECT * FROM DISH WHERE HOTEL_ID = ?";
			
			ArrayList dishDetails = new ArrayList();
			try {
				preparedStatement = connection.prepareStatement(Query);
				preparedStatement.setInt(1, hotelId);
				ResultSet resultSet = preparedStatement.executeQuery();
				while(resultSet.next()) {
					HashMap dishDetail = new HashMap();
					dishDetail.put("dishID", resultSet.getInt(1));
					dishDetail.put("hotelID", resultSet.getInt(2));
					dishDetail.put("dishName", resultSet.getString(3));
					dishDetail.put("dishType", resultSet.getString(4));
					dishDetail.put("dishPrice", resultSet.getString(5));
					dishDetails.add(dishDetail);
				}
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			
			return dishDetails;
		}
		
		// this method is for store the details of order
		public static void orderConfirmed(HashMap orderConfirmedDetailsMap) {
			// TODO Auto-generated method stub
			
			String Query = "INSERT INTO ORDERDETAILS VALUE(?,?,?,?,?,?)";
			int resultRowCount=0;
			try {
				
				preparedStatement = connection.prepareStatement(Query);
				
				preparedStatement.setInt(1,(int)orderConfirmedDetailsMap.get("orderId"));
				preparedStatement.setInt(2,(int) orderConfirmedDetailsMap.get("totalOrderCost"));
				preparedStatement.setInt(3,(int) orderConfirmedDetailsMap.get("hotelId"));
				preparedStatement.setInt(4,(int) orderConfirmedDetailsMap.get("customerId"));
				preparedStatement.setString(5,orderConfirmedDetailsMap.get("orderAddress").toString());
				preparedStatement.setString(6,orderConfirmedDetailsMap.get("orderedDishses").toString());
				resultRowCount = preparedStatement.executeUpdate();
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			
			if(resultRowCount ==1)
				System.out.println("data inserted");
			else
				System.out.println("data not inserted");
		}
		
	}
	

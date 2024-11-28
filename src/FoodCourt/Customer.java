package FoodCourt;

import java.util.HashMap;
import java.util.Scanner;

public class Customer {
	
	static Scanner scanner = new Scanner(System.in);
	Customer(){
		FoodCourtFileHandling foodCourtFileHandling = new FoodCourtFileHandling();
		foodCourtFileHandling.readFile();
		displayOptions();
	}
	
	// this method is used to display the options for customer
	
	public static void displayOptions() {
		System.out.println("\t\t\t FOOD COURT");
		System.out.println("SELECT THE OPTION \n LOGIN \n SIGNUP \n FORGOTPASSWORD");
		
		String customerOption = scanner.next().toLowerCase();
		switch(customerOption) {
		case "login":
			logIn();
			break;
		case "signup":
			signUp();
			break;
		case "forgotpassword":
			forgotCustomerPassword();
			break;
		default:
			displayOptions();
		}

	}
	
	// this method is used to signup their new Account
	
		public static void signUp() {
			System.out.println("\t\t\t WELCOME TO FOOD COURT");
			System.out.println("ENTER USERNAME : ");
			String customerName=scanner.next();
			System.out.println("ENTER EMAIL : ");
			String customerEmail=scanner.next();
			System.out.println("ENTER PHONENUMBER : ");
			long customerPhoneNumber=scanner.nextLong();
			System.out.println("ENTER PASSWORD : ");
			String customerPassword=scanner.next();
			
			double customerId=  Math.random()*100000+1;
			
			HashMap customerDetails = new HashMap();
			customerDetails.put("customerName", customerName);
			customerDetails.put("customerPhoneNumber", customerPhoneNumber);
			customerDetails.put("customerEmail", customerEmail);
			customerDetails.put("customerPassword", customerPassword);
			customerDetails.put("customerID", (int) customerId);
			
			if(FoodCourtDataBase.insertCustomer(customerDetails))
				System.out.println("REGISTERED SUCCESSFULLY");

		}
		// this method is used to login their old Account
		public static void logIn() {
			System.out.println("\t\t\t WELCOME BACK TO FOOD COURT");
			System.out.println("ENTER PHONENUMBER : ");
			long customerPhoneNumber=scanner.nextLong();
			System.out.println("ENTER PASSWORD : ");
			String customerPassword=scanner.next();
			
			try {
			HashMap customerDetails = FoodCourtDataBase.readCustomer(customerPhoneNumber);
			
			String checkCustomerPassWord=customerDetails.get("customerPassword").toString();
			if(checkCustomerPassWord.equals(customerPassword)) {
				
				System.out.println("LOGGED IN SUCCESSFULLY");
				Hotel hotel = new Hotel();
				hotel.displayHotels(Integer.parseInt(customerDetails.get("customerID").toString()));
			}
			
			else {
				System.out.println("INVALID CREDENTIALS");
				logIn();
			}
			}catch(NullPointerException nullPointerException) {
				System.out.println("YOU DIDN'T HAVE AN ACCOUNT");
				displayOptions();
			}
			
			
		}
		
		// this method is used change the password of the customer
		public static void forgotCustomerPassword() {
			System.out.println("\t\t\t FORGOT PASSWORD");
			System.out.println("ENTER PHONENUMBER : ");
			long customerPhoneNumber=scanner.nextLong();
			System.out.println("ENTER PASSWORD : ");
			String customerPassword=scanner.next();
			
			if(FoodCourtDataBase.updateCustomerPassword(customerPhoneNumber, customerPassword)) {
				System.out.println("UPDATED SUCCESSFULLY");
				logIn();
			}else {
				forgotCustomerPassword();
			}
		}
}

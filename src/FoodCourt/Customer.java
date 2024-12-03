package FoodCourt;

import java.util.HashMap;
import java.util.Scanner;

// this class is for collect the customerDetails
public class Customer {
	
	static PatternCheck patternCheck = new PatternCheck();
	static Scanner scanner = new Scanner(System.in);
	Customer(){
		FoodCourtFileHandling foodCourtFileHandling = new FoodCourtFileHandling();
		foodCourtFileHandling.readFile();
		displayOptions();
	}
	
	// this method is for display the options for customer
	
	public static void displayOptions() {
		System.out.println("\t\t\t FOOD COURT");
		System.out.println("SELECT THE OPTION \n 1.LOGIN \n 2.SIGNUP \n 3.FORGOTPASSWORD");
		System.out.println("ENTER YOUR OPTION: ");
		
		 
		 try {
			 int customerOption= scanner.nextInt();
			 switch(customerOption) {
			 case 1:
				 logIn();
				 break;
			 case 2:
				 signUp();
				 break;
			 case 3:
				 forgotCustomerPassword();
				 break;
			 default:
				 throw new OptionNotFoundException("option not found");
			 }
		 }catch(OptionNotFoundException optionNotFoundException) {
			 optionNotFoundException.printStackTrace();
		 }finally {
			 displayOptions();
		 }

	}
	
	// this method is for signup their new Account
	
		public static void signUp() {
			int inputValidation = 0;
			System.out.println("\t\t\t WELCOME TO FOOD COURT");
			System.out.println("ENTER USERNAME : ");
			String customerName=scanner.next();
			System.out.println("ENTER EMAIL : ");
			String customerEmail=scanner.next();
			System.out.println("ENTER PHONENUMBER : ");
			long customerPhoneNumber=scanner.nextLong();
			System.out.println("ENTER PASSWORD : ");
			String customerPassword=scanner.next();
			if(patternCheck.userNameCheck(customerName) && patternCheck.userEmailCheck(customerEmail) && patternCheck.userPhoneNumberCheck(customerPhoneNumber) && patternCheck.userPasswordCheck(customerPassword) ) 
				inputValidation = 1;
			
			if(inputValidation == 1) {
			double customerId=  Math.random()*100000+1;
			
			HashMap customerDetails = new HashMap();
			customerDetails.put("customerName", customerName);
			customerDetails.put("customerPhoneNumber", customerPhoneNumber);
			customerDetails.put("customerEmail", customerEmail);
			customerDetails.put("customerPassword", customerPassword);
			customerDetails.put("customerID", (int) customerId);
			
			if(FoodCourtDataBase.insertCustomer(customerDetails))
				System.out.println("REGISTERED SUCCESSFULLY");
			logIn();
			}else {
				System.out.println("ENTER PROPER CREDENTIALS");
				signUp();
			}
			
		}
		// this method is for login their old Account
		public static void logIn() {
			System.out.println("\t\t\t WELCOME BACK TO FOOD COURT");
			System.out.println("ENTER PHONENUMBER : ");
			long customerPhoneNumber=scanner.nextLong();
			System.out.println("ENTER PASSWORD : ");
			String customerPassword=scanner.next();
			int inputValidation=0;
			if( patternCheck.userPhoneNumberCheck(customerPhoneNumber) && patternCheck.userPasswordCheck(customerPassword) ) 
				inputValidation = 1;
			
			if(inputValidation == 1) {
			try {
			HashMap customerDetails = FoodCourtDataBase.readCustomer(customerPhoneNumber);
			String checkCustomerPassWord=customerDetails.get("customerPassword").toString();
			System.out.println(checkCustomerPassWord.equals(customerPassword));
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
			else {
				System.out.println("ENTER PROPER CREDENTIALS");
				logIn();
			}
			
			
		}
		
		// this method is for change the password of the customer
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

package Aspire_Practices_Tasks;

import java.util.Scanner;
/*
 * Author : Manikandan O
 * tittle: ATM
 * created on : 23-11-2024
 * modified on : 25-11-2024
 * 
 * */

public class Customer extends AccountHolder {


	Scanner scanner= new Scanner(System.in);
	public void displayUserNeeds()  {
		System.out.println("Already have an account : Yes / No");
		String result= scanner.next().toLowerCase();
		try {
			switch(result) {
			case "yes":
				Hdfc_Bank hdfc= new Hdfc_Bank();
				hdfc.userCredentials();
				break;
			case "no":
				input();
				break;
			default:
				throw new Exception("give proper input : yes / no");
			}
		}catch(Exception e) {
			displayUserNeeds();
		}
		
		
	}
	public void input() {
		System.out.println("Enter the Number of Customer You need to Add");
		int count = scanner.nextInt();
		
		for(int i=1;i<=count;i++)
			userDetails(count);
	}
	
	public void userDetails(int count) {
		System.out.println("Enter AccountHolderName");
		scanner.nextLine();
		String userName= scanner.nextLine();
		System.out.println("Enter the pin");
		String pin= scanner.next();
		String balanceAmount= "10000000";
		System.out.println("Enter AccountNumber");
		String accountNumber= scanner.next();
		addCustomer(userName, pin, balanceAmount, accountNumber,count);
		
	}


}

package Aspire_Practices_Tasks;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Scanner;

public class Hdfc_Bank implements Bank {
	static Scanner scanner = new Scanner(System.in);
	private long balance;
	HashMap user;
	ArrayList<HashMap> userList;
	int index=-1;
	public void userCredentials() {
		System.out.println("1.Deposit \n 2.withdrawal \n 3.changepin \n 4.balance \n select the Operation:");
		String operation= scanner.next().toLowerCase();
		
		try {
			System.out.println("Enter the pin:");
			int pin = scanner.nextInt();
			switch(operation) {
			case "deposit":
				deposit(pin);
				break;
			case "withdrawal":
				withdrawal(pin);
				break;
			case "balance":
				balance(pin);
				break;
			case "changepin":
				System.out.println("enter your AccountNumber: ");
				long accountNumber= scanner.nextLong();
				System.out.println("Enter the New pin:");
				int newPin= scanner.nextInt();
				pinChange(pin,newPin,accountNumber);
				break;
				default:
					throw new Exception("detail is invalid");
			}
		}catch(Exception e) {
			userCredentials();
		}
	
		
	}
	
	public boolean isValid(int pin) {
		 userList=Abstraction_Task.getUserList();
		Iterator iterator = userList.iterator();
		
		while(iterator.hasNext()) {
			 user=(HashMap) iterator.next();
			 
			 index++;
			 int referPin=Integer.parseInt((String) user.get("Accountpin"));
		
			if(pin == referPin) {
				balance= Long.parseLong((String)user.get("BalanceAmount"));
				return true;
			}	

		}
		return false;
	}

	@Override
	public void deposit(int password) {
		System.out.println("Enter the rupees you need to deposit:");
		long amount= scanner.nextLong();

		if(isValid(password)) {
			user.replace("BalanceAmount", balance+amount);
			userList.set(index,user);
			Abstraction_Task.setUserList(userList);
			Abstraction_Task.display(index);
		}else {
			System.out.println("invalid password");
		}
	}

	@Override
	public void withdrawal(int password) {
		System.out.println("Enter the rupees you need to withdrawal:");
		long amount= scanner.nextLong();
		
		if(balance<=0) {
			System.out.println("insuficient Balance please add Money");
		}
		else if(isValid(password)) {
			user.replace("BalanceAmount", balance-amount);
			userList.set(index,user);
			Abstraction_Task.setUserList(userList);
			Abstraction_Task.display(index);
		}else {
			System.out.println("invalid password");
		}
		
	}

	@Override
	public void balance(int password) {
		if(isValid(password)) {
			System.out.print("Your Balance:"+user.get("BalanceAmount")+"\n");
		}else {
			System.out.println("invalid password");
		}
		
	}

	@Override
	public void pinChange(int oldPin,int newPin,long accountNumber) {
		if(isValid(oldPin) && accountNumber == Long.parseLong((String) user.get("AccountNumber"))) {
			user.replace("Accountpin", newPin);
			userList.set(index,user);
			Abstraction_Task.setUserList(userList);
			Abstraction_Task.display(index);
		}else {
			System.out.println("invalid password");
		}
		
	}


}

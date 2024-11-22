package Aspire_Practices_Tasks;

import java.util.ArrayList;
import java.util.HashMap;

public class Abstraction_Task extends Hdfc_Bank{
	static ArrayList<HashMap> listUsers=new ArrayList<HashMap>();
	int iterateCount=0;
	public void addCustomer(String userName,String pin,String balanceAmount,String accountNumber,int count){
		HashMap<String,String> userDetails = new HashMap<String,String>();
		userDetails.put("AccountHolderName", userName);
		userDetails.put("Accountpin", pin);
		userDetails.put("BalanceAmount", balanceAmount);
		userDetails.put("AccountNumber", accountNumber);
		
		listUsers.add(userDetails);
		iterateCount++;
		System.out.println("Successfully saved\n");
		if(iterateCount == count) {
			Customer customer = new Customer();
			customer.displayUserNeeds();
		}
		
	}
	
	public static  ArrayList getUserList() {
		return listUsers;
	}
	public static void setUserList(ArrayList userlist) {
		listUsers=userlist;
	}
	
	public static void display(int index) {
		System.out.println(Bank.mani);
		Bank.display(listUsers,index);
	}
}

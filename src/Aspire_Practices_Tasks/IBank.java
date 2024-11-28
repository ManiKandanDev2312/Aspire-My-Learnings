package Aspire_Practices_Tasks;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
/*
 * Author : Manikandan O
 * tittle: ATM
 * created on : 23-11-2024
 * modified on : 25-11-2024
 * 
 * */
public interface IBank {
	public void deposit(int password);
	public void withdrawal(int password);
	public void balance(int password);
	public void pinChange(int Oldpin, int newPin,long accountNumber);
	 static void display(ArrayList userDetails,int index) {
		System.out.println(userDetails.get(index));
	}
}

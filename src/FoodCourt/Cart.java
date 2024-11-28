package FoodCourt;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Scanner;

/*
 * Author : Manikandan O
 * tittle: FoodCourt
 * created on : 27-11-2024
 * modified on : 
 * 
 * */

public class Cart {
	Scanner scanner = new Scanner(System.in);
	
	// this method is used to display the cartitems
	public void cartItems(ArrayList orderList,String hotelName,int hotelId,int customerID) {
		System.out.println("\t\t\t CART ITEMS");
		System.out.println("\t\t\t HOTEL NAME : "+hotelName);
		HashMap orderDetails;
		
		Iterator orderIterator = orderList.iterator();
		int orderedCost=0;
		String orderedDishes="";
		while(orderIterator.hasNext()) {
			orderDetails = (HashMap) orderIterator.next();
			System.out.println(""+orderDetails.get("dishName")+"\t X"+orderDetails.get("dishQuantity")+"\t\t\t"+orderDetails.get("dishPrice"));
			orderedCost+= Integer.parseInt( orderDetails.get("dishPrice").toString());
			orderedDishes=orderedDishes+orderDetails.get("dishName").toString();
		}
		
		System.out.println("ENTER CONTINUE TO PAYMENT OR BACK TO GOBACK");
		String orderConfirm=scanner.next().toLowerCase();
		
		switch(orderConfirm) {
		case "continue":
			System.out.println("ENTER ADDRESS TO DELIVER");
			scanner.nextLine();
			String orderAddress = scanner.nextLine();
			Payment payment = new Payment();
			payment.paymentMethod( orderedDishes, hotelName, hotelId,orderedCost,orderAddress,customerID);
			break;
		case "back":
			Hotel hotel = new Hotel();
			hotel.displayDishes(hotelId, hotelName,customerID);
			break;
		default:
			System.out.println("ENTER PROPER INPUT");
			cartItems(orderList,hotelName,hotelId,customerID);
		}
	}
}

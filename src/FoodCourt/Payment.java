package FoodCourt;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Scanner;

// this class is for payment options
public class Payment {
	
	Scanner scanner = new Scanner(System.in);
	// this method is for choose the payment method
	
	public void paymentMethod(String orderedDishes,String hotelName,int hotelId,int orderCost,String orderAddress,int customerID) {
		System.out.println(" PAYMENT METHOD");
		System.out.println("1.UPI");
		System.out.println("2.CASH ON DELIVERY");
		int paymentMethod=scanner.nextInt();
		switch(paymentMethod) {
		case 1:
			orderConfirmed( orderedDishes, hotelName, hotelId, "UPI",orderCost,orderAddress,customerID);
			break;
		case 2:
			orderConfirmed(orderedDishes, hotelName, hotelId, "CASH ON DELIVERY",orderCost,orderAddress,customerID);
			break;
		default:
			System.out.println("ENTER PROPER PAYMENT METHOD");
			paymentMethod(orderedDishes,hotelName,hotelId,orderCost,orderAddress,customerID);
		}
	}
	
	// this method is for confirm the order
	private void orderConfirmed(String orderConfirmedDetails, String hotelName, int hotelId, String paymentMethod, int orderCost,String orderAddress,int customerID) {
		
		System.out.println("\t\t\t TOTAL COST : "+ orderCost);
		System.out.println("ENTER THE COST :");
		int paymentCost=scanner.nextInt();
		if(paymentCost == orderCost) {
		double orderId= Math.random()*100000+1;
		HashMap orderConfirmedDetailsMap= new HashMap();
		orderConfirmedDetailsMap.put("orderId",(int)orderId);
		orderConfirmedDetailsMap.put("totalOrderCost",orderCost);
		orderConfirmedDetailsMap.put("hotelId",hotelId);
		orderConfirmedDetailsMap.put("orderAddress",orderAddress);
		orderConfirmedDetailsMap.put("customerId",customerID);
		orderConfirmedDetailsMap.put("orderedDishses",orderConfirmedDetails);
		
		System.out.println("ENTER CONTINUE OR EXIT");
		String exitCustomer=scanner.next().toLowerCase();
		switch(exitCustomer) {
		case "continue":
			FoodCourtDataBase.orderConfirmed(orderConfirmedDetailsMap);
			Customer.displayOptions();
			break;
		case "exit":
			System.out.println("THANK FOR ORDERING FOOD FROM FOODCOURT");
			FoodCourtDataBase.orderConfirmed(orderConfirmedDetailsMap);
			break;
		default:
			System.out.println("ENTER PROPER DETAIL");
			orderConfirmed( orderConfirmedDetails, hotelName, hotelId, paymentMethod, orderCost, orderAddress, customerID) ;
		}
		}else {
			System.out.println("ENTER FULL AMOUNT");
			orderConfirmed( orderConfirmedDetails, hotelName, hotelId, paymentMethod, orderCost, orderAddress, customerID) ;
		}
			
	}
}

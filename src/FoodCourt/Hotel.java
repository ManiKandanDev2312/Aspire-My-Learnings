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

public class Hotel {
	Scanner scanner = new Scanner(System.in);
	
	// this method is used to display the hotels
	public void displayHotels(int customerID) {
		ArrayList hotelDetails=FoodCourtDataBase.readHotel();
		Iterator iterator = hotelDetails.iterator();
		boolean isHotel=false;
		System.out.println("\t\t HOTELS");
		HashMap hotelDetail;
		while(iterator.hasNext()) {
			hotelDetail=(HashMap)iterator.next();
			System.out.println(hotelDetail.get("hotelName"));
		}
		
		System.out.println("SELECT THE HOTEL YOU WANT :");
		String hotelName = scanner.nextLine().toLowerCase();
		Iterator iteratorHotelId = hotelDetails.iterator();
		while(iteratorHotelId.hasNext()) {
			hotelDetail=(HashMap)iteratorHotelId.next();
			String checkHotelName = hotelDetail.get("hotelName").toString().toLowerCase();
			if(checkHotelName.equals(hotelName)) {
				isHotel=true;
				displayDishes((int)hotelDetail.get("hotelID"),hotelDetail.get("hotelName").toString(),customerID);
			}
		}
		
		if(!isHotel) {
			System.out.println("ENTER PROPER NAME OF HOTEL");
			displayHotels(customerID);
		}
	}
	
	// this method is used to display the dishes
	public void displayDishes(int hotelID,String hotelName,int customerID) {
		
		ArrayList dishDetails = FoodCourtDataBase.readDishes(hotelID);
		Iterator iterator = dishDetails.iterator();
		HashMap dishDetail = null;
		ArrayList orderedDish= new ArrayList();
		boolean isDish=false;
		System.out.println("\t DISHES");
		while(iterator.hasNext()) {
			dishDetail=(HashMap)iterator.next();
			System.out.println(dishDetail.get("dishName")+"\t\t\t"+dishDetail.get("dishType")+"\t\t\t"+dishDetail.get("dishPrice"));
		}
		System.out.println("ENTER THE COUNT OF DISHES :");
		int dishCount = scanner.nextInt();
		for(int i=1;i<=dishCount;i++) {
			System.out.println("SELECT THE DISH :");
			scanner.nextLine();
			String orderedDishName = scanner.nextLine().toLowerCase();
			System.out.println("ENTER THE QUANTITY OF A DISH:");
			int dishQuantity = scanner.nextInt();
			
			int dishPrice=0;
			Iterator checkDishName= dishDetails.iterator();
			while(checkDishName.hasNext()) {
				HashMap orderDishDetail=(HashMap)checkDishName.next();
				String checkDishDetails=orderDishDetail.get("dishName").toString().toLowerCase();
				if(checkDishDetails.equals(orderedDishName)) {
					HashMap orderedDishDetails= new HashMap();
					orderedDishDetails.put("dishName", orderedDishName);
					orderedDishDetails.put("dishQuantity", dishQuantity);
					dishPrice =Integer.parseInt(orderDishDetail.get("dishPrice").toString());
					orderedDishDetails.put("dishPrice", dishPrice*dishQuantity);
					orderedDish.add(orderedDishDetails);
				}
			
			}
			
			
		}
		
		Cart cart = new Cart();
		
		cart.cartItems(orderedDish,hotelName,hotelID,customerID);
	}
}

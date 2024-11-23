package Aspire_Practices_Tasks;

import Aspire_Practices_Tasks.Outter.Inner;


public class Aspire_Tasks {

	public static void main(String[] args) {
//		Customer customer = new Customer();
//		customer.displayUserNeeds();
//		Outter outter = new Outter();
//		Inner inner = new Inner();
//		Parent parent = new Parent();
		
//		Outter.Inner inner= new Inner();
//		parent.;
		
		
//		System.out.println(inner.number);
		
		LinkedList<Integer> linkedlist = new LinkedList<Integer>();
		
		linkedlist.addElementFirst(10);
		linkedlist.addElementFirst(20);
		linkedlist.add(40);
		linkedlist.add(60);
		linkedlist.set(3, 80);
		
		linkedlist.insertElementAtPosition(3, 100);
		
//		linkedlist.remove();
//		linkedlist.removeAtPosition(4);
		System.out.println(linkedlist.searchElement(60));
		
		linkedlist.display();
		System.out.println(linkedlist.length());
	}

}

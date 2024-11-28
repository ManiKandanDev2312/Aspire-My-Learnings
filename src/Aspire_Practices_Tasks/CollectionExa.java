package Aspire_Practices_Tasks;

import java.util.ArrayList;
import java.util.Iterator;

public class CollectionExa {
	
	public void linkedListExa() {
		ArrayList<Integer> list = new ArrayList<Integer>();
		ArrayList<Integer> resultlist = new ArrayList<Integer>();
		
		for(int i=1;i<=10;i++)
			list.add(i);
		
//		Iterator iterator = list.iterator();
		int[] intArray= new int[list.size()];
		for(int i=0;i<list.size();i++)
			intArray[i]=list.get(i);
			
		for(int arrayItem:intArray)
			resultlist.add(arrayItem);
		
//		int input1 =20;
//		
//		Integer input2 = input1;
//		
//		int input3 = (Integer) input2;
	}
}

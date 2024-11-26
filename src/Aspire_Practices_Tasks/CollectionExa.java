package Aspire_Practices_Tasks;

import java.util.ArrayList;
import java.util.Iterator;

public class CollectionExa {
	
	public void linkedListExa() {
		ArrayList<Integer> list = new ArrayList<Integer>();
		
		for(int i=1;i<=10;i++)
			list.add(i);
		
		Iterator iterator = list.iterator();
		
		while(iterator.hasNext())
			System.out.println(iterator.next());
	}
}

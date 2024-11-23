package Aspire_Practices_Tasks;

public class LinkedList<T>{
Node Head = null;
int size =0;
public void addElementFirst(T data) {
	Node node = new Node(data);
	
	if(Head==null) {
		Head=node;
		size++;
	}
		
	else {
		node.next= Head;
		Head=node;
		size++;
	}
		
	
}

public void add(T data) {
	Node node = new Node(data);
	Node current= Head;
	
	while(current.next != null) {
		current = current.next;
	}
	
	current.next=node;
	size++;
}

public void set(int index, T data) {
	Node current = Head;
	int prev=1;
	try {
		if(index > size)
			throw new Exception("invalid index");
		while(prev<index) {
			current= current.next;
			prev++;
		}
	}catch(Exception e) {
		System.out.println(e);
	}
	
	current.data= data;
}

public void insertElementAtPosition(int position,T data) {
	Node node = new Node(data);
	Node current = Head;
	Node prev=null;
	int ind=1;
	
	try {
		if(position > size)
			throw new Exception("ArrayIndexOutOfBounds");
		if(position == 1) {
			addElementFirst(data);
			return;
		}
			
		while(ind < position) {
			prev=current;
			current=current.next;
			ind++;
		}
		
		node.next=current;
		prev.next=node;
		size++;
	}catch(Exception e) {
		System.out.println(e);
	}
	
	
}
public void remove() {
	Node current = Head;
	try {
		
		if(size < 1)
			throw new Exception("list is empty");
		while(current.next.next != null) {
			current=current.next;
		}
		current.next=null;
		size--;
	}catch(Exception e) {
		System.out.println(e);
	}
}

public void removeAtPosition(int position) {
	Node current= Head;
	Node last=null;
	int prev=1;
	try {
		if(position > size)
			throw new Exception("indexOutofBounds");
		while(prev < position) {
			last=current;
			current = current.next;
			prev++;
		}
		last.next=current.next;
		size --;
	}catch(Exception e) {
		System.out.println(e);
	}

}

public int searchElement(T element) {
	Node current = Head;
	int index =1;
	while(current != null) {
		if(current.data == element)
			return index;
		current=current.next;
		index++;
	}
	return -1;
}

public int length() {
	return size;
}

public void display() {
	Node current= Head;
	
	while(current != null) {
		System.out.println(current.data);
		current = current.next;
	}
}

}

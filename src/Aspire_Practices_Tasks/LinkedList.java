package Aspire_Practices_Tasks;

public class LinkedList<T> {
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
	while(prev<index) {
		current= current.next;
		prev++;
	}
	
	current.data= data;
}

public void insertElementAtPosition(int position,T data) {
	Node node = new Node(data);
	Node current = Head;
	Node prev=null;
	int ind=1;
	while(ind < position) {
		prev=current;
		current=current.next;
		ind++;
	}
	
	node.next=current;
	prev.next=node;
	size++;
	
}
public void remove() {
	Node current = Head;
	
	while(current.next.next != null) {
		current=current.next;
	}
	current.next=null;
	size--;
}

public void removeAtPosition(int position) {
	Node current= Head;
	Node last=null;
	int prev=1;
	while(prev < position) {
		last=current;
		current = current.next;
		prev++;
	}
	last.next=current.next;
	size --;
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


import java.util.Scanner;
class Book{
int isbn;
String name;
String author;
double price;
int qty=0;
public void setBookData(int isbn,String name,double price)
{
this.isbn=isbn;
this.name=name;
this.price=price;
}
public void setBookData1(int isbn,String name,double price,int qty)
{
this.isbn=isbn;
this.name=name;
this.price=price;
this.qty=qty;
}
public int getISBN()
{
return isbn;
}
public String getName()
{
return name;
}
public double getPrice()
{
return price;
}
public int getQty()
{
return qty;
}
public String toString(){
return "book is not currently unavailable";
}
}
class Author{
String name;
String email;
public void setAuthor(String aName,String aEmail){
name=aName;
email=aEmail;
}
public String getName()
{
return name;
}
public String getEmail()
{
return email;
}
public String toString()
{
return "Author's book is currently unavailable";
}
}
public class BookDemo{
public static void main(String[] args)
{
Scanner s=new Scanner(System.in);
int isbn,qty;
double price;
String bName,aName,aEmail;
Author obj[]=new Author[5];
Book ob[]=new Book[5];
for(int i=0;i<3;i++){
ob[i]=new Book();
obj[i]=new Author();
System.out.println("Enter Details for Book "+(i+1)+":");
System.out.println("Book ISBN: ");
isbn=s.nextInt();
System.out.println("Book Name: ");
 bName=s.next();
System.out.println("Price: ");
 price=s.nextDouble();
System.out.println("Author Name: ");
 aName=s.next();
System.out.println("Author Email: ");
 aEmail=s.next();
System.out.println("Quantity: ");
qty=s.nextInt();
if(i==2){
 ob[i].setBookData(isbn,bName,price);
 obj[i].setAuthor(aName,aEmail);
 }
else if(i==0){
ob[i].setBookData1(isbn,bName,price,qty);
obj[i].setAuthor(aName,aEmail);
}
else{
ob[i].setBookData(isbn,bName,price);
obj[i].setAuthor(aName,aEmail);
}
}
for(int i=0;i<3;i++){
if(i==2){
System.out.println("\nISBN "+ob[i].getISBN());
System.out.println("Book Name: "+ob[i].getName());
System.out.println("Author of the Book: "+obj[i].getName());
System.out.println("Price: "+ob[i].getPrice());
}
else if(i==0)
{
System.out.println("\nISBN "+ob[i].getISBN());
System.out.println("Book Name: "+ob[i].getName());
System.out.println("Author of the Book: "+obj[i].getName());
System.out.println("Price: "+ob[i].getPrice());
System.out.println("Quantity: "+ob[i].getQty());
}
else
{

System.out.println(ob[i].toString());
}
}
s.close();
}
}


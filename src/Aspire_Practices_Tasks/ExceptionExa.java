package Aspire_Practices_Tasks;

import java.io.File;
import java.io.IOException;

/**
 * 
 * exceptions are two types 
 * 
 * checked exceptions
 * unchecked exceptions
 * 
 * 
 * checked exception
 * IO
 * SQL
 * classnotfound
 * filenotfound
 * 
 * 
 * 
 * 
 * unchecked exception
 * nullpointer
 * arithmetic
 * arrayindexoutofbounds
 * stringindexoutofbounds
 *
 *
 * 
 * **/

public class ExceptionExa {
	public void exception1() {
		try {
			int a=10/0;

		}catch(ArithmeticException e) {
			System.out.println(e);
		}
	}
	
	public void exception2() {
		try {
			String name = null;
			System.out.println(name.length());
		}catch(NullPointerException e) {
			System.out.println(e);
		}
	}
	public void exception3() {
		try {
			String name = "manikandan";
			System.out.println(name.charAt(11));
		}catch(StringIndexOutOfBoundsException e) {
			System.out.println(e);
		}
	}
	
	public void exception4() {
		try {
			int[] array = new int[5];
			System.out.println(array[6]);
		}catch(ArrayIndexOutOfBoundsException e) {
			System.out.println(e);
		}
	}
	
	public void fileCreate() throws IOException {
		File file = new File("C:\\Users\\mani.obulisamy\\eclipse-workspace\\Aspire_Practices\\config.properties");
		
		if(file.createNewFile())
			System.out.println("file created");
	}
}

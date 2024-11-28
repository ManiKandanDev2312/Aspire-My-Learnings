package Aspire_Practices_Tasks;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.util.Properties;
import java.util.Scanner;

public class FileHandling {
	Properties properties = new Properties();
	public void createFile() {
		File file = new File("C:\\Users\\mani.obulisamy\\eclipse-workspace\\Aspire_Practices\\mani.txt");
		
		try {
			if(file.createNewFile())
				System.out.println("file created");
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	public void fileWrite() {
		try {
			FileWriter fileWriter = new FileWriter("C:\\Users\\mani.obulisamy\\eclipse-workspace\\Aspire_Practices\\mani.txt");
			fileWriter.write("Manikandan");
			properties.setProperty("Phone", "6379623737");
			properties.store(fileWriter, "Check");
			fileWriter.close();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

	}
	public void fileRead() {
		try {
			FileReader fileReader = new FileReader("C:\\Users\\mani.obulisamy\\eclipse-workspace\\Aspire_Practices\\mani.txt");
//			Scanner scanner= new Scanner(fileReader);
//			while(scanner.hasNext()) {
//				System.out.println(scanner.next());
//			}
			properties.load(fileReader);
			System.out.println(properties.get("Phone"));

		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

	}
	
	public void deleteFile() {
		File file = new File("C:\\Users\\mani.obulisamy\\eclipse-workspace\\Aspire_Practices\\mani.txt");
		if(file.delete()){
			System.out.println("file deleted");
		}
	}
	
	public void createFileOutputStream() {
		try {
			FileOutputStream fileOutput = new FileOutputStream("C:\\Users\\mani.obulisamy\\eclipse-workspace\\Aspire_Practices\\mani.txt");
			properties.setProperty("Name", "Manikandan");
			properties.setProperty("Phone", "6379623737");
			properties.setProperty("email", "manidhanush2001@gmail.com");
			properties.store(fileOutput,"This file is used for customer details");
			
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
	}
	public void readFileInputStream() {
		try {
			FileInputStream fileInput= new FileInputStream("C:\\Users\\mani.obulisamy\\eclipse-workspace\\Aspire_Practices\\mani.txt");
			properties.load(fileInput);
			
			System.out.println(properties.get("Name"));
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
	}
}

package FoodCourt;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Properties;

public class FoodCourtFileHandling {
	
	
	Properties properties = new Properties();
	// this block is used to create a property file
	
	public void createFile() {
		
		try {
			FileOutputStream fileOutputStream = new FileOutputStream("C:\\Users\\mani.obulisamy\\eclipse-workspace\\Aspire_Practices\\config.properties");
			properties.setProperty("SQLURL", "jdbc:mysql://localhost:3306/FOODCOURT");
			properties.setProperty("PORT", "3306");
			properties.setProperty("USER", "root");
			properties.setProperty("PASSWORD", "Aspire@123");
			properties.store(fileOutputStream, "this file is used to store the database details");
			
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

	}
	
	public void deleteFile() {
		File file = new File("C:\\Users\\mani.obulisamy\\eclipse-workspace\\Aspire_Practices\\config.properties");
		
		if(file.delete())
			System.out.println("file deleted");
	}
	
	public void readFile() {
		try {
			FileInputStream fileInputStream = new FileInputStream("C:\\Users\\mani.obulisamy\\eclipse-workspace\\Aspire_Practices\\config.properties");
			properties.load(fileInputStream);
			
			FoodCourtDataBase foodCourtDataBase = new FoodCourtDataBase(properties.getProperty("SQLURL"),properties.getProperty("USER"),properties.getProperty("PASSWORD"),properties.getProperty("PORT"));
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		
		
	}
	
	
}

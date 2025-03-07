package DriverSetup;

import ExceptionHandling.DriverNotFoundException;

public class DriverManagerFactory {
	
	// this class is used to check the available browsers 
	
	// this methods is used to check the browsers
	public static  DriverManager getDriverType(String driverType) {
		 DriverManager driverManager = null;
		
		try {
		switch(driverType.toLowerCase()) {
		case "chrome":
			 driverManager = new ChromeDriverManager();
			break;
		case "edge":
			 driverManager = new EdgeDriverManager();
			break;
		default:
			driverManager = null;
			throw new DriverNotFoundException("this driver is not Found");
		
		}
		}catch(DriverNotFoundException driverNotFoundException) {
			System.out.println(driverNotFoundException.getMessage());
		}
		
		
		return driverManager;
	}
}

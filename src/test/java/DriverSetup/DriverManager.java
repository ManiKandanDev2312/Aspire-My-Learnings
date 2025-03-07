package DriverSetup;

import org.openqa.selenium.WebDriver;

public abstract class DriverManager {

	//this class is used to manage a driver
	
	protected WebDriver driver;
	protected abstract WebDriver createDriver();
	
	// this method is used to quit the driver
	
	public void driverClose() {
		if(driver != null) {
			driver.quit();
			driver = null;
		}
	}
	
	// this method is used to get the driver
	
	public WebDriver getDriver() {
		
		if(driver == null) {
			driver = createDriver();
		}
		return driver;
	}
}

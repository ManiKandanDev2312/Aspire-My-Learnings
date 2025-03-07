package DriverSetup;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.edge.EdgeDriver;

public class EdgeDriverManager extends DriverManager {
	
	WebDriver driver;
	
	//this method is used to initiate edge driver
	@Override
	protected WebDriver createDriver() {
		return driver = new EdgeDriver(OptionsManager.edgeOptions());
		
	}

}

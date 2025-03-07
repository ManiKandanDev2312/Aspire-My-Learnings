package DriverSetup;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;

public class ChromeDriverManager extends DriverManager {
	
//	WebDriver driver;
	
	// this method is used to Launch the chrome driver

	@Override
	protected WebDriver createDriver() {
		WebDriver driver = new ChromeDriver(OptionsManager.chromeOptions());
		return driver;
	}
	
}

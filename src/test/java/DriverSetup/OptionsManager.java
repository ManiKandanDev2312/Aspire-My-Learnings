package DriverSetup;

import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.edge.EdgeOptions;

public class OptionsManager {
	
	//this method is used to initiate the chrome options
	public static ChromeOptions chromeOptions() {
		ChromeOptions options = new ChromeOptions();
		options.addArguments("--start-maximized");
		
		return options;
	}
	
	//this method is used to initiate the edge options
		public static EdgeOptions edgeOptions() {
			EdgeOptions options = new EdgeOptions();
			options.addArguments("--start-maximized");
			
			return options;
		}

}

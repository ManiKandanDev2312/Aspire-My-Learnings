package Testing;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.openqa.selenium.WebDriver;
import org.testng.annotations.AfterClass;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.Optional;
import org.testng.annotations.Parameters;
import org.testng.annotations.Test;

import Components.FilterOptions;
import DriverSetup.DriverManagerFactory;

public class FilterTesting {
	WebDriver driver;
	Logger logger  = LogManager.getLogger(FilterTesting.class);
	FilterOptions filter;
	
	//this method is used to initiate the driver
	@BeforeClass(groups="sanity")
	@Parameters({"browser"})
	public void driverSetup(@Optional("chrome")String environment) {
		driver = DriverManagerFactory.getDriverType(environment).getDriver();
		driver.get("https://www.swiggy.com");
		filter = new FilterOptions(driver);
		logger.info("Selenium Start the Testing :  "+driver.getCurrentUrl());
	}
	
	//this method is used to check sortBy in filter
	@Test(groups="sanity",priority = 1)
	public void sortBy() {
		filter.sort(1);
	}
	
//	//this method is used to check Delivery Time in filter
//		@Test(groups="sanity",dependsOnMethods ="sortBy")
//		public void deliveryTime() {
//			filter.deliveryTime(0);
//		}
		
	//this method is used to check VegOrNonVeg in filter
		@Test(groups="sanity",priority = 0)
		public void vegOrNonVeg() {
			filter.VegNonVeg(1);
		}
		
	//this method is used to check Ratings in filter
	@Test(groups="sanity",priority = 2)
	public void ratings() {
			filter.Ratings(1);
	}	
	
	//this method is used to check Cuiines in filter
	@Test(groups="sanity",priority = 3)
	public void cuisines() {
		filter.cuisines(3);
	}
	
	//this method is used to check Cuisines in filter
		@Test(groups="sanity",priority = 4)
		public void explore() {
			filter.Explore(0);
		}
		

		@AfterClass(groups = {"sanity"})
		//this is used to quit the driver
		public void driverQuit() {
			if(driver != null) {
				filter.clickApplyButton();
				driver.quit();
			}
			logger.info("driver is quitted here");
		}
}

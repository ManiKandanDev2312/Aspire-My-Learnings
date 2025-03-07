package Testing;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.openqa.selenium.WebDriver;
import org.testng.annotations.AfterClass;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.Optional;
import org.testng.annotations.Parameters;
import org.testng.annotations.Test;

import DriverSetup.DriverManagerFactory;
import Pages.CartPage;
import Pages.HomePage;
import Pages.HotelPage;
import Pages.SearchPage;

public class SmokeTesting2 {
WebDriver driver;
Logger logger  = LogManager.getLogger(SmokeTesting2.class);
	//this method is used to initiate the driver
	@BeforeClass(groups = {"smoke-2"})
	@Parameters({"browser"})
	public void driverSetup(@Optional("chrome")String environment) {
		driver = DriverManagerFactory.getDriverType(environment).getDriver();
		driver.get("https://www.swiggy.com");
		logger.info("Selenium Start the Testing :  "+driver.getCurrentUrl());
	}
	
	// this method is used to test the searchpage
		@Test(groups = {"smoke-2"})
		public void searchPageTest() {
			logger.info("driver is navigate to the search page");
			SearchPage searchPage = new SearchPage(driver);
			logger.info("search page is opened");
			
			
			searchPage.searchBar("burger");
			logger.info("testNG is sent a data to the searchBar");
			logger.info("hotel is selected by given index");
			searchPage.searchedList(1);
			logger.info("searchList is shown depends upon the searchBar data");
			searchPage.clickRestaurants(1);
			logger.info("driver click the restaurants option in the search page");
		}
		
		
		//this method is used to test the hotelpage
			@Test(groups = {"smoke-2"},dependsOnMethods = "searchPageTest")
			public void hotelPageTest() {
				logger.info("hotel page is opened");
				HotelPage hotelPage = new HotelPage(driver);
				logger.info("dish is selected by given index");
				hotelPage.clickDish(3);
				logger.info("selected dish is added to the cart");
			}
			
			//this method is used to test the cartpage
			@Test(groups = {"smoke-2"},dependsOnMethods = "hotelPageTest")
			public void cartPageTest() {
				logger.info("driver is navigate to cart Page");
				CartPage cartPage = new CartPage(driver);
				logger.info("cart page is opened");
				cartPage.quantityAdd(6);
				logger.info("driver increase the quantity of the selected dish");
			}

	@AfterClass(groups = {"smoke-2"})
	//this is used to quit the driver
	public void driverQuit() {
		if(driver != null)
			driver.quit();
		logger.info("driver is quitted here");
	}
}

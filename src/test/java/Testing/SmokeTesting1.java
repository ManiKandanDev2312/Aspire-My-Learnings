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

public class SmokeTesting1 {
	WebDriver driver;
	Logger logger  = LogManager.getLogger(SmokeTesting1.class);
	//this method is used to initiate the driver
	@BeforeClass(groups = {"somke-1"})
	@Parameters({"browser"})
	public void driverSetup(@Optional("chrome")String environment) {
		driver = DriverManagerFactory.getDriverType(environment).getDriver();
		driver.get("https://www.swiggy.com");
		logger.info("Selenium Start the Testing :  "+driver.getCurrentUrl());
	}
	
	//this method is used to test the Homepage
	@Test(groups = {"somke-1"})
	public void HomePageTest() {
		logger.info("driver is navigated to home page");
		HomePage homePage = new HomePage(driver);
		homePage.clickHotel(3);
		logger.info("hotel is selected by given index");
		logger.info("driver is navigated to hotel page");
	}
		
		//this method is used to test the hotelpage
			@Test(groups = {"somke-1"},dependsOnMethods = "HomePageTest")
			public void hotelPageTest() {
				logger.info("hotel page is opened");
				HotelPage hotelPage = new HotelPage(driver);
				hotelPage.clickDish(4);
				logger.info("dish is selected by given index");
				logger.info("selected dish is added to the cart");
			}
			
			//this method is used to test the cartpage
			@Test(groups = {"somke-1"},dependsOnMethods = "hotelPageTest")
			public void cartPageTest() {
				
				CartPage cartPage = new CartPage(driver);
				logger.info("driver is navigate to cart Page");
				logger.info("cart page is opened");
				cartPage.quantityAdd(6);
				logger.info("driver increase the quantity of the selected dish");
			}
	
	@AfterClass(groups = {"somke-1"})
	//this is used to quit the driver
	public void driverQuit() {
		if(driver != null)
			driver.quit();
		logger.info("driver is quitted here");
	}
}

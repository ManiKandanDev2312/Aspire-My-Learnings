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
import NavigationLinks.CartLink;
import NavigationLinks.LoginLink;
import NavigationLinks.OffersLink;
import NavigationLinks.SearchLink;



public class NavigationTest {
	
	WebDriver driver;
	Logger logger  = LogManager.getLogger(NavigationTest.class);
	
	//this method is used to initiate the driver
	@BeforeClass(groups = {"Navigation"})
	@Parameters({"browser"})
	public void driverSetup(@Optional("chrome")String environment) {
		driver = DriverManagerFactory.getDriverType(environment).getDriver();
		driver.get("https://www.swiggy.com");
		logger.info("Selenium Start the Testing :  "+driver.getCurrentUrl());
	}
	
	//this method is used to check the login link in the browser
	@Test(groups = {"Navigation"})
	public void loginLink() {
		logger.info("checking Login form");
		LoginLink link = new LoginLink(driver);
		link.linkClick();
		logger.info("Login form is opened");
		
	}
	
	//this method is used to check the search link in the browser
		@Test(groups = {"Navigation"},dependsOnMethods = "loginLink")
		public void searchLink() {
			logger.info("driver is navigate to the search Page");
			SearchLink link = new SearchLink(driver);
			link.linkClick();
			logger.info("search page is opened");
		}
		
		//this method is used to check the cart link in the browser
		@Test(groups = {"Navigation"},dependsOnMethods = "searchLink")
		public void cartLink() {
			logger.info("driver is navigate to the Cart Page");
			CartLink link = new CartLink(driver);
			link.linkClick();
			logger.info("search page is opened");
			
			logger.info("driver is navigate to the Home Page");
			driver.navigate().to("https://www.swiggy.com/home");
			logger.info("Home page is opened");
		}
		//this method is used to check the cart link in the browser
		@Test(groups = {"Navigation"},dependsOnMethods = "cartLink")
		public void offersLink() {
			logger.info("driver is navigate to the Offers Page");
			OffersLink link = new OffersLink(driver);
			link.linkClick();
			logger.info("Offers page is opened");
		}
	
	
	@AfterClass(groups = {"Navigation"})
	//this is used to quit the driver
	public void driverQuit() {
		if(driver != null)
			driver.quit();
		logger.info("driver is quitted here");
	}
}

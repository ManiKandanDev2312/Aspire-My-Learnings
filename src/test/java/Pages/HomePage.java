package Pages;

import java.util.List;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.openqa.selenium.By;
import org.openqa.selenium.NoSuchElementException;
import org.openqa.selenium.TimeoutException;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;

import Common.AbstractPage;
import DriverSetup.DriverScreenShot;
import NavigationLinks.LoginLink;

public class HomePage extends AbstractPage {

	
	@FindBy(xpath="//div[contains(@class,'row')][1]//a")
	List<WebElement> mindList;
	
	@FindBy(xpath="//div[contains(@data-testid,'top_brands')]//a")
	List<WebElement> topHotelList;
	
	@FindBy(xpath="//div[contains(@class,'fbmIlW')]//a[contains(@class,'gToGxM')]")
	List<WebElement> hotelList;
	
	
	Logger logger  = LogManager.getLogger(HomePage.class);
	protected LoginLink link;
	protected DriverScreenShot screenShot = new DriverScreenShot();
	
	//this constructor is used to initiate the driver,variables
	public HomePage(WebDriver driver) {
		super(driver);
		link = new LoginLink(driver);
		PageFactory.initElements(driver, this);
	}
	
	//this method is used to click TopHotel in HomePage
	public boolean clickTopHotel(int hotelIndex) {
		try {
			if(topHotelList.size() >= 1)
			{
				screenShot.screenShotDOM(driver,"HomePage", "HomePageTopHotelFound");
				link.elementIsClickable(topHotelList.get(hotelIndex)).click();
				return true;
			}else {
				screenShot.screenShotDOM(driver,"HomePage", "HomePageNoTopHotelFound");
				return false;
			}
		} catch (NoSuchElementException noSuchElementException) {
			logger.error("HomePage: " + noSuchElementException.getRawMessage());
			throw noSuchElementException;
		}catch (TimeoutException timeoutException) {
			logger.error("HomePage: " + timeoutException.getRawMessage());
			throw timeoutException;
		}catch (NullPointerException nullPointerException) {
			logger.error("HomePage: " + nullPointerException.getMessage());
			throw nullPointerException;
		}catch (IndexOutOfBoundsException indexOutOfBoundsException) {
			logger.error("HomePage: " + indexOutOfBoundsException.getMessage());
			throw indexOutOfBoundsException;
		}
		
	}
	
	//this method is used to click Hotel in HomePage
	public boolean clickHotel(int hotelIndex) {
		try {
			link.elementIsClickable(hotelList.get(0));
			if(hotelList.size() >= 1)
			{
				screenShot.screenShotDOM(driver,"HomePage", "HomePageHotelFound");
				link.elementIsClickable(hotelList.get(hotelIndex)).click();
				return true;
			}else {
				screenShot.screenShotDOM(driver,"HomePage", "HomePageNoHotelFound");
				return false;
			}
		} catch (NoSuchElementException noSuchElementException) {
			logger.error("HomePage: " + noSuchElementException.getRawMessage());
			throw noSuchElementException;
		}catch (TimeoutException timeoutException) {
			logger.error("HomePage: " + timeoutException.getRawMessage());
			throw timeoutException;
		}catch (NullPointerException nullPointerException) {
			logger.error("HomePage: " + nullPointerException.getMessage());
			throw nullPointerException;
		}catch (IndexOutOfBoundsException indexOutOfBoundsException) {
			logger.error("HomePage: " + indexOutOfBoundsException.getMessage());
			throw indexOutOfBoundsException;
		}
		
		
	}

}

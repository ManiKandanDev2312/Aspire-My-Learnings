package Pages;

import java.util.List;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptException;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.NoSuchElementException;
import org.openqa.selenium.TimeoutException;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;

import Common.AbstractPage;
import Common.AssertionHandling;
import DriverSetup.DriverScreenShot;
import NavigationLinks.CartLink;

public class CartPage extends AbstractPage{
	
	@FindBy(xpath="//div[contains(@class,'_3kHjz')]")
	List<WebElement> userAddress;
	
	@FindBy(xpath="//div[contains(@class,'BbiqG')]")
	WebElement quantityAddButton;
	
	@FindBy(xpath="//div[contains(@class,'_t-T3')]")
	WebElement quantityLessButton;
	
	@FindBy(xpath="//input[contains(@id,'building')]")
	WebElement buildingField;
	
	@FindBy(xpath="//input[contains(@id,'area')]")
	WebElement areaField;

	@FindBy(xpath="//input[contains(@id,'landmark')]")
	WebElement landmarkField;
	
	@FindBy(xpath="//a[contains(@class,'_1kz4H')]")
	WebElement addressButton;
	
	@FindBy(xpath="//div[contains(@class,'_t-T3')]")
	WebElement quantityDecreaseButton;
	
	@FindBy(xpath="//button[contains(@class,'_4dnMB')]")
	WebElement paymentButton;
	
	@FindBy(xpath="//div[contains(@class,'_2h0kv')]")
	WebElement hotelName;
	
	@FindBy(xpath="//div[contains(@class,'_1i2tH')]")
	WebElement dishName;
	
	@FindBy(xpath="//div[contains(@class,'_1wC-f')]")
	WebElement dishQuantity;
	
	Logger logger  = LogManager.getLogger(CartPage.class);
	protected CartLink link;
	protected JavascriptExecutor javascriptExecutor;
	protected DriverScreenShot screenShot = new DriverScreenShot();
	
	// this constructor is used to initiate the driver and the variables
	public CartPage(WebDriver driver) {
		super(driver);
		waitForPageLoaded();
		link = new CartLink(driver);
		PageFactory.initElements(driver, this);
	}
	
	// this method is used change the address in the Cart
	public void changeAddress(String flatNo,String area,String landMark, int buttonIndex) {
		link.linkClick();
		try {
			if(userAddress.size() > 0) {
			if(link.elementIsClickable(userAddress) != null) {
				
				AssertionHandling.hardAssertion( link.elementIsClickable(HotelPage.hotelName).getText(), link.elementIsClickable(hotelName).getText(),"Cart Page Hotel is Doesn't Match");
				AssertionHandling.hardAssertion( HotelPage.dishName, link.elementIsClickable(dishName).getText(),"Cart Page Dish is Doesn't Match");
				
				userAddress.get(userAddress.size()-1).click();
				screenShot.screenShotDOM(driver, "cartPage", "cartPageAddress-1");
				link.elementIsClickable(buildingField).sendKeys(flatNo);
				link.elementIsClickable(areaField).sendKeys(area);
				link.elementIsClickable(landmarkField).sendKeys(landMark);
				screenShot.screenShotDOM(driver, "cartPage", "cartPageAddress-2");
				link.elementIsClickable(driver.findElement(By.xpath("//div[contains(@class,'_1qiSu')]["+buttonIndex+"]"))).click();
				link.elementIsClickable(addressButton).click();	
				screenShot.screenShotDOM(driver, "cartPage", "cartPageAddressAdded");
				link.elementIsClickable(paymentButton).click();	
			}
			}else {
				AssertionHandling.hardAssertion( link.elementIsClickable(HotelPage.hotelName).getText(), link.elementIsClickable(hotelName).getText(),"Cart Page Hotel is Doesn't Match");
				AssertionHandling.hardAssertion( HotelPage.dishName, link.elementIsClickable(dishName).getText(),"Cart Page Dish is Doesn't Match");
				screenShot.screenShotDOM(driver, "cartPage", "cartPageWithoutLogin");
			}
		} catch (NoSuchElementException noSuchElementException) {
			logger.error("CartPage: " + noSuchElementException.getRawMessage());
			throw noSuchElementException;
		}catch (TimeoutException timeoutException) {
			logger.error("CartPage: " + timeoutException.getRawMessage());
			throw timeoutException;
		}catch (NullPointerException nullPointerException) {
			logger.error("CartPage: " + nullPointerException.getMessage());
			throw nullPointerException;
		}catch (IndexOutOfBoundsException indexOutOfBoundsException) {
			logger.error("CartPage: " + indexOutOfBoundsException.getMessage());
			throw indexOutOfBoundsException;
		}catch (AssertionError assertionError) {
			logger.error("CartPage: " + assertionError.getMessage());
			throw assertionError;
		}
			
		
	}
	
	// this method is used to order with old address
	public void oldAddress() {
		link.linkClick();
		try {
			if(userAddress.size() > 0) {
				if(link.elementIsClickable(userAddress) != null) {
					userAddress.get(0).click();
					link.elementIsClickable(paymentButton).click();	
				}
			}
		} catch (NoSuchElementException noSuchElementException) {
			logger.error("CartPage: " + noSuchElementException.getRawMessage());
			throw noSuchElementException;
		}catch (TimeoutException timeoutException) {
			logger.error("CartPage: " + timeoutException.getRawMessage());
			throw timeoutException;
		}catch (NullPointerException nullPointerException) {
			logger.error("CartPage: " + nullPointerException.getMessage());
			throw nullPointerException;
		}catch (IndexOutOfBoundsException indexOutOfBoundsException) {
			logger.error("CartPage: " + indexOutOfBoundsException.getMessage());
			throw indexOutOfBoundsException;
		}
	}
	
	// this method is used to add the quantity to the dish
	public void quantityAdd(int quantity) {
		link.linkClick();
		try {
			
			for(int i=0;i<quantity;i++) {
//				AssertionHandling.hardAssertion( link.elementIsClickable(HotelPage.hotelName).getText(), link.elementIsClickable(hotelName).getText(),"Cart Page Hotel is Doesn't Match");
//				AssertionHandling.hardAssertion( HotelPage.dishName, link.elementIsClickable(dishName).getText(),"Cart Page Dish is Doesn't Match");
				link.elementIsClickable(quantityAddButton).click();
				waitForPageLoaded();
			}
			screenShot.screenShotDOM(driver, "cartPage", "cartPagedishQuantity");
			
		}   catch (NoSuchElementException noSuchElementException) {
			logger.error("CartPage: " + noSuchElementException.getRawMessage());
			throw noSuchElementException;
		}catch (TimeoutException timeoutException) {
			logger.error("CartPage: " + timeoutException.getRawMessage());
			throw timeoutException;
		}catch (NullPointerException nullPointerException) {
			logger.error("CartPage: " + nullPointerException.getMessage());
			throw nullPointerException;
		}catch (IndexOutOfBoundsException indexOutOfBoundsException) {
			logger.error("CartPage: " + indexOutOfBoundsException.getMessage());
			throw indexOutOfBoundsException;
		}catch (AssertionError assertionError) {
			logger.error("CartPage: " + assertionError.getMessage());
			throw assertionError;
		}
	}
	
	// this method is used to minus the quantity of the dish
	public void quantityMinus(int quantity) {
		link.linkClick();
		try {
			
			if(Integer.parseInt(link.elementIsClickable(dishQuantity).getText()) > 0 && Integer.parseInt(link.elementIsClickable(dishQuantity).getText()) >= quantity ) {
			for(int i=0;i<quantity;i++) {
				link.elementIsClickable(quantityAddButton).click();
				waitForPageLoaded();
			}
			screenShot.screenShotDOM(driver, "cartPage", "cartPagedishQuantity");
			}else {
				throw new AssertionError("dish Quantity is outOfBound");
			}
			
		}  catch (NoSuchElementException noSuchElementException) {
			logger.error("CartPage: " + noSuchElementException.getRawMessage());
			throw noSuchElementException;
		}catch (TimeoutException timeoutException) {
			logger.error("CartPage: " + timeoutException.getRawMessage());
			throw timeoutException;
		}catch (NullPointerException nullPointerException) {
			logger.error("CartPage: " + nullPointerException.getMessage());
			throw nullPointerException;
		}catch (IndexOutOfBoundsException indexOutOfBoundsException) {
			logger.error("CartPage: " + indexOutOfBoundsException.getMessage());
			throw indexOutOfBoundsException;
		}
	}
}

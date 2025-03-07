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
import DriverSetup.DriverScreenShot;
import NavigationLinks.LoginLink;

public class HotelPage extends AbstractPage {
	
	
	@FindBy(xpath="//button[contains(@class,' add-button-center-container')]")
	List<WebElement> dishList;
	
	@FindBy(xpath="//div[contains(@class,'_3ZLSD')]")
	WebElement isCustomisablebox;
	
	@FindBy(xpath="//button[contains(@class,'ckZVSs')]")
	WebElement isCustomisablebutton;
	
	@FindBy(xpath="//div[contains(@id,'browse-menu-btn')]")
	WebElement menubutton;
	
	@FindBy(xpath="//span[contains(@class,'custom-checkbox')]")
	List<WebElement> customiseList;
	
	@FindBy(xpath="//div[contains(@class,'dxVbaB')]/div[2]")
	List<WebElement> dishListBox;
	
	@FindBy(xpath="//h1[contains(@class,'gONLwH')]")
	static WebElement hotelName;
	
	@FindBy(xpath="//div[contains(@class,'giirYq')]")
	List<WebElement> dishNameList;
	
	@FindBy(xpath="//div[contains(@class,'ZE4h9')]")
	List<WebElement> dishAddedToCart;
	
	static String dishName;

	Logger logger  = LogManager.getLogger(HotelPage.class);
	protected LoginLink link;
	protected JavascriptExecutor javascriptExecutor;
	DriverScreenShot screenShot = new DriverScreenShot();
	
	//this constructor is used to initiate the driver and the variables
	public HotelPage(WebDriver driver) {
		super(driver);
		waitForPageLoaded();
		link = new LoginLink(driver);
		PageFactory.initElements(driver, this);
	}
	
	// this method is used to click the dish by given index
	public void clickDish(int dishIndex) {
		try {
			
			screenShot.screenShotDOM(driver, "HotelPage", "HotelPage-Opened");
			WebElement menuButton = link.elementIsClickable(menubutton);
			javascriptExecutor = (JavascriptExecutor) driver;
			javascriptExecutor.executeScript("arguments[0].style.display='none'", menuButton);
			
			
			link.elementIsClickable(dishList);
			logger.info("HotelPage : dishList size : "+dishList.size());
			link.elementIsClickable(dishNameList);
			logger.info("HotelPage : dishNameList size : "+dishNameList.size());
			link.elementIsClickable(dishListBox);
			logger.info("HotelPage: dishListBox : "+dishListBox.size());
			dishList.get(dishIndex).click();
			screenShot.screenShotDOM(driver, "HotelPage", "HotelPage-dishSelected");
			logger.info("HotelPage : isCustomisable: "+isCustomisable(dishIndex));
			
			dishName = dishNameList.get(dishIndex).getText();
			if(link.elementIsClickable(dishAddedToCart) != null ) {
				screenShot.screenShotDOM(driver, "HotelPage", "HotelPage-dishAddedtoCart");
				logger.info("HotelPage: dish is Added");
			}
			else if(isCustomisable(dishIndex)) {
				screenShot.screenShotDOM(driver, "HotelPage", "HotelPage-customisableBox");
				if(link.elementIsClickable(isCustomisablebox) != null ) {
					
					link.elementIsClickable(customiseList);
					if(customiseList.size()>0) {
						customiseList.get(1).click();
					}
					
					link.elementIsClickable(isCustomisablebutton).click();
					screenShot.screenShotDOM(driver, "HotelPage", "HotelPage-customisableBoxClicked");
					link.elementIsClickable(dishAddedToCart);
					screenShot.screenShotDOM(driver, "HotelPage", "HotelPage-dishAddedtoCart");
				}
				
			}
				
		}  catch (NoSuchElementException noSuchElementException) {
			logger.error("HotelPage: " + noSuchElementException.getRawMessage());
			throw noSuchElementException;
		}catch (TimeoutException timeoutException) {
			logger.error("HotelPage: " + timeoutException.getRawMessage());
			throw timeoutException;
		}catch (NullPointerException nullPointerException) {
			logger.error("HotelPage: " + nullPointerException.getMessage());
			throw nullPointerException;
		}catch (IndexOutOfBoundsException indexOutOfBoundsException) {
			logger.error("HotelPage: " + indexOutOfBoundsException.getMessage());
			throw indexOutOfBoundsException;
		}catch (JavascriptException javascriptException) {
			logger.error("HotelPage: " + javascriptException.getMessage());
			throw javascriptException;
		}
		
	}
	
	
	// this method is used to check whether the dish is customisable or not
	public boolean isCustomisable(int dishIndex) {
		
		try {
		
		String customisableDishBox=dishListBox.get(dishIndex).getAttribute("class");
		logger.info("HotelPage: customisableDishBox : "+customisableDishBox);
		if(customisableDishBox.contains("pTAip"))
			return true;
		return false;
		}  catch (NoSuchElementException noSuchElementException) {
			logger.error("HotelPage: " + noSuchElementException.getRawMessage());
			throw noSuchElementException;
		}catch (TimeoutException timeoutException) {
			logger.error("HotelPage: " + timeoutException.getRawMessage());
			throw timeoutException;
		}catch (NullPointerException nullPointerException) {
			logger.error("HotelPage: " + nullPointerException.getMessage());
			throw nullPointerException;
		}catch (IndexOutOfBoundsException indexOutOfBoundsException) {
			logger.error("HotelPage: " + indexOutOfBoundsException.getMessage());
			throw indexOutOfBoundsException;
		}
	}
	
	
}

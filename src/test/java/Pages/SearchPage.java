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
import NavigationLinks.SearchLink;

public class SearchPage extends AbstractPage{

	@FindBy(xpath="//input[@class='ssM7E']")
	WebElement searchBar;
	
	@FindBy(xpath="//div[@class='_474KM']")
	WebElement searchButton;
	
	@FindBy(xpath="//button[@class='xN32R']")
	List<WebElement> searchedList;
	
	@FindBy(xpath="//a[contains(@data-testid,'resturant-card-anchor-container')]")
	List<WebElement> hotelList;
	
	@FindBy(xpath="//div[@class='_1tJLU']")
	WebElement noDishFound;
	
	@FindBy(xpath="//span[@data-testid='RESTAURANT-nav-tab-pl']")
	WebElement restaurantButton;
	
	@FindBy(xpath="//span[@data-testid='DISH-nav-tab-pl']")
	WebElement dishButton;
	
	@FindBy(xpath="//button[@data-cy='customize-footer-add-button']")
	WebElement dishAddButton;
	
	@FindBy(xpath="//button[contains(@class,'add-button-center-container')]")
	List<WebElement> dishButtons;
	
	
	Logger logger  = LogManager.getLogger(SearchPage.class);
	protected SearchLink link;

	protected DriverScreenShot screenShot = new DriverScreenShot();
	
	//this constructor is used to initiate the driver,variables
	public SearchPage(WebDriver driver) {
		super(driver);
		link = new SearchLink(driver);
		PageFactory.initElements(driver, this);
	}
	
	
	// this method is used to enter the value in search bar
	public void searchBar(String dishName) {
		link.linkClick();
		
		link.elementIsClickable(searchBar);
			searchBar.sendKeys(dishName);
		
	}
	
	// this method is used to select the search result by given index
	public void searchedList(int hotelIndex) {
		try {
				link.elementIsClickable(searchedList);
			    screenShot.screenShotDOM(driver,"SearchPage", "searchDishFound");
				searchedList.get(hotelIndex).click();
				screenShot.screenShotDOM(driver,"SearchPage", "searchDishClicked");
				if(link.elementIsClickable(noDishFound) != null) 
					screenShot.screenShotDOM(driver,"SearchPage", "search-NoDishFound");

				
		} catch (NoSuchElementException noSuchElementException) {
			logger.error("SearchPage: " + noSuchElementException.getRawMessage());
			throw noSuchElementException;
		}catch (TimeoutException timeoutException) {
			logger.error("SearchPage: " + timeoutException.getRawMessage());
			throw timeoutException;
		}catch (NullPointerException nullPointerException) {
			logger.error("SearchPage: " + nullPointerException.getMessage());
			throw nullPointerException;
		}catch (IndexOutOfBoundsException indexOutOfBoundsException) {
			logger.error("SearchPage: " + indexOutOfBoundsException.getMessage());
			throw indexOutOfBoundsException;
		}
	}
	
	// this method is used to change the search list into restaurants
	public void clickRestaurants(int hotelIndex) {
		try {

			
				link.elementIsClickable(restaurantButton).click();
			
				hotel(hotelIndex);
		} catch (NoSuchElementException noSuchElementException) {
			logger.error("SearchPage: " + noSuchElementException.getRawMessage());
			throw noSuchElementException;
		}catch (TimeoutException timeoutException) {
			logger.error("SearchPage: " + timeoutException.getRawMessage());
			throw timeoutException;
		}catch (NullPointerException nullPointerException) {
			logger.error("SearchPage: " + nullPointerException.getMessage());
			throw nullPointerException;
		}catch (IndexOutOfBoundsException indexOutOfBoundsException) {
			logger.error("SearchPage: " + indexOutOfBoundsException.getMessage());
			throw indexOutOfBoundsException;
		}

	}
	
	// this method is used to select the hotel by given index
	private void hotel(int hotelIndex) {
		try {	
			link.elementIsClickable(hotelList);
			if(hotelList.size() >= 1) {
				screenShot.screenShotDOM(driver,"SearchPage","searchHotelFound");
				hotelList.get(hotelIndex).click();
			}
			else
				screenShot.screenShotDOM(driver,"SearchPage","search-NoHotelFound");
			
		} catch (NoSuchElementException noSuchElementException) {
			logger.error("SearchPage: " + noSuchElementException.getRawMessage());
			throw noSuchElementException;
		}catch (TimeoutException timeoutException) {
			logger.error("SearchPage: " + timeoutException.getRawMessage());
			throw timeoutException;
		}catch (NullPointerException nullPointerException) {
			logger.error("SearchPage: " + nullPointerException.getMessage());
			throw nullPointerException;
		}catch (IndexOutOfBoundsException indexOutOfBoundsException) {
			logger.error("SearchPage: " + indexOutOfBoundsException.getMessage());
			throw indexOutOfBoundsException;
		}
		
	}
	
	// this method is used to change the search list into dishes
	public void clickDishes(int dishIndex) {
		try {

			link.elementIsClickable(dishButton).click();

				hotelDish(dishIndex);
		} catch (NoSuchElementException noSuchElementException) {
			logger.error("SearchPage: " + noSuchElementException.getRawMessage());
			throw noSuchElementException;
		}catch (TimeoutException timeoutException) {
			logger.error("SearchPage: " + timeoutException.getRawMessage());
			throw timeoutException;
		}catch (NullPointerException nullPointerException) {
			logger.error("SearchPage: " + nullPointerException.getMessage());
			throw nullPointerException;
		}catch (IndexOutOfBoundsException indexOutOfBoundsException) {
			logger.error("SearchPage: " + indexOutOfBoundsException.getMessage());
			throw indexOutOfBoundsException;
		}
	}
	
	
	// this method is used to select and click the dish by given index
	private void hotelDish(int dishIndex) {
	try {
		
		link.elementIsClickable(dishButtons);
		
		if(dishButtons.size() >= 1) {
			dishButtons.get(dishIndex).click();
		screenShot.screenShotDOM(driver,"SearchPage", "searchDishFound-1");
		if(link.elementIsClickable(dishAddButton) != null)
			dishAddButton.click();
			screenShot.screenShotDOM(driver,"SearchPage", "searchDishFound-2");
		}
		else
			screenShot.screenShotDOM(driver,"SearchPage", "search-NoDishFound");
		
		
		
	} catch (NoSuchElementException noSuchElementException) {
		logger.error("SearchPage: " + noSuchElementException.getRawMessage());
		throw noSuchElementException;
	}catch (TimeoutException timeoutException) {
		logger.error("SearchPage: " + timeoutException.getRawMessage());
		throw timeoutException;
	}catch (NullPointerException nullPointerException) {
		logger.error("SearchPage: " + nullPointerException.getMessage());
		throw nullPointerException;
	}catch (IndexOutOfBoundsException indexOutOfBoundsException) {
		logger.error("SearchPage: " + indexOutOfBoundsException.getMessage());
		throw indexOutOfBoundsException;
	}
		
	}


}

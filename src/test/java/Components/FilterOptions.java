package Components;

import java.util.List;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.openqa.selenium.NoSuchElementException;
import org.openqa.selenium.TimeoutException;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;

import Common.AbstractComponent;
import Common.AssertionHandling;
import DriverSetup.DriverScreenShot;
import Pages.CartPage;

public class FilterOptions extends AbstractComponent{
	
	@FindBy(xpath="//div[contains(@data-testid,'filter_widget')]/div")
	List<WebElement> filterElements;
	
	@FindBy(xpath="//li[contains(@class,'jRRjXz')]")
	List<WebElement> filterBoxElements;
	
	@FindBy(xpath="//label[contains(@class,'sc-aXZVg')]")
	List<WebElement> filterOptionElements;

	
	@FindBy(xpath="//button[contains(@class,'kjWxKV')]")
	WebElement filterCloseButton;
	
	@FindBy(xpath="//button[contains(@class,'fSoHno')]")
	WebElement ApplyButton;
	
	
	Logger logger  = LogManager.getLogger(FilterOptions.class);
	protected DriverScreenShot screenShot = new DriverScreenShot();
	List<WebElement> filterList;
	
	// this constructor is used to initiate the driver and the variables
	public FilterOptions(WebDriver driver) {
		super(driver);
		PageFactory.initElements(driver, this);
		elementIsClickable(filterElements);
		filterElements.get(0).click();
		
	}
	
	//this method is used to check the filter is present or not
	public int isFilter(String filterName) {
		int index = -1;
		filterList = elementIsClickable(filterBoxElements);
		for(int i=0; i<filterList.size();i++) {
			++index;
			System.out.println(filterList.get(i).getText());
			if(filterName.equalsIgnoreCase(filterList.get(i).getText()))
				break;
		}
		System.out.println(index);
		if(index >= 0 && index <= filterList.size()-1)
			return index;
		else
			return -1;
	}
	
	// this method is used to check the sort by filter
	public void sort(int sortIndex) {
		try {
		int index = isFilter("Sort");
		logger.info("sortBy index is : "+ index);
		if(index >= 0) {
		filterBoxElements.get(index).click();
		logger.info("sortBy is clicked here");
		AssertionHandling.hardAssertion("Sort", filterBoxElements.get(index).getText(), "SortBy: text Doesn't Match");
		elementIsClickable(filterOptionElements);
		}
		
		
		if(filterOptionElements.size()-1 >=  sortIndex) {
			screenShot.screenShotDOM(driver, "FilterOption", "SortBy");
			filterOptionElements.get(sortIndex).click();
			logger.info("sortByOptions is clicked Option : "+ filterOptionElements.get(sortIndex).getText());
		}
		
		} catch (NoSuchElementException noSuchElementException) {
			logger.error("FilterOptions: " + noSuchElementException.getRawMessage());
			throw noSuchElementException;
		}catch (TimeoutException timeoutException) {
			logger.error("FilterOptions: " + timeoutException.getRawMessage());
			throw timeoutException;
		}catch (NullPointerException nullPointerException) {
			logger.error("FilterOptions: " + nullPointerException.getMessage());
			throw nullPointerException;
		}catch (IndexOutOfBoundsException indexOutOfBoundsException) {
			logger.error("FilterOptions: " + indexOutOfBoundsException.getMessage());
			throw indexOutOfBoundsException;
		}catch (AssertionError assertionError) {
			logger.error("FilterOptions: " + assertionError.getMessage());
			throw assertionError;
		}
	}
	
	// this method is used to check the Deliver Time by filter
		public void deliveryTime(int deliveryTimeIndex) {
			
			try {
			int index = isFilter("Delivery Time");
			logger.info("deliveryTime index is : "+ index);
			if(index >= 0) {
			filterBoxElements.get(index).click();
			logger.info("deliveryTime is clicked here");
			AssertionHandling.hardAssertion("Delivery Time", filterBoxElements.get(index).getText(), "deliveryTime: text Doesn't Match");
			elementIsClickable(filterOptionElements);
			}
			
			
			if(filterOptionElements.size()-1 >=  deliveryTimeIndex) {
				screenShot.screenShotDOM(driver, "FilterOption", "deliveryTime");
				filterOptionElements.get(deliveryTimeIndex).click();
				logger.info("deliveryTimeOptions is clicked Option : "+ filterOptionElements.get(deliveryTimeIndex).getText());
			}
			
			
			} catch (NoSuchElementException noSuchElementException) {
				logger.error("FilterOptions: " + noSuchElementException.getRawMessage());
				throw noSuchElementException;
			}catch (TimeoutException timeoutException) {
				logger.error("FilterOptions: " + timeoutException.getRawMessage());
				throw timeoutException;
			}catch (NullPointerException nullPointerException) {
				logger.error("FilterOptions: " + nullPointerException.getMessage());
				throw nullPointerException;
			}catch (IndexOutOfBoundsException indexOutOfBoundsException) {
				logger.error("FilterOptions: " + indexOutOfBoundsException.getMessage());
				throw indexOutOfBoundsException;
			}catch (AssertionError assertionError) {
				logger.error("FilterOptions: " + assertionError.getMessage());
				throw assertionError;
			}
		}
		

		// this method is used to check the Cuisines by filter
			public void cuisines(int cuisinesIndex) {
				
				try {
				int index = isFilter("Cuisines");
				logger.info("cuisines index is : "+ index);
				if(index >= 0) {
				filterBoxElements.get(index).click();
				logger.info("cuisines is clicked here");
				AssertionHandling.hardAssertion("Cuisines", filterBoxElements.get(index).getText(), "deliveryTime: text Doesn't Match");
				elementIsClickable(filterOptionElements);
				}
				
				
				if(filterOptionElements.size()-1 >=  cuisinesIndex) {
					screenShot.screenShotDOM(driver, "FilterOption", "Cuisines");
					filterOptionElements.get(cuisinesIndex).click();
					logger.info("cuisinesOptions is clicked Option : "+ filterOptionElements.get(cuisinesIndex).getText());
				}

				
				} catch (NoSuchElementException noSuchElementException) {
					logger.error("FilterOptions: " + noSuchElementException.getRawMessage());
					throw noSuchElementException;
				}catch (TimeoutException timeoutException) {
					logger.error("FilterOptions: " + timeoutException.getRawMessage());
					throw timeoutException;
				}catch (NullPointerException nullPointerException) {
					logger.error("FilterOptions: " + nullPointerException.getMessage());
					throw nullPointerException;
				}catch (IndexOutOfBoundsException indexOutOfBoundsException) {
					logger.error("FilterOptions: " + indexOutOfBoundsException.getMessage());
					throw indexOutOfBoundsException;
				}catch (AssertionError assertionError) {
					logger.error("FilterOptions: " + assertionError.getMessage());
					throw assertionError;
				}
			}
			

			// this method is used to check the Cuisines by filter
				public void Explore(int exploreIndex) {
					
					try {
					int index = isFilter("Explore");
					logger.info("explore index is : "+ index);
					if(index >= 0) {
					filterBoxElements.get(index).click();
					logger.info("Explore is clicked here");
					AssertionHandling.hardAssertion("Explore", filterBoxElements.get(index).getText(), "deliveryTime: text Doesn't Match");
					elementIsClickable(filterOptionElements);
					}
					
					if(filterOptionElements.size()-1 >=  exploreIndex) {
						screenShot.screenShotDOM(driver, "FilterOption", "Explore");
						filterOptionElements.get(exploreIndex).click();
						logger.info("ExploreOptions is clicked Option : "+ filterOptionElements.get(exploreIndex).getText());
					}
						
					} catch (NoSuchElementException noSuchElementException) {
						logger.error("FilterOptions: " + noSuchElementException.getRawMessage());
						throw noSuchElementException;
					}catch (TimeoutException timeoutException) {
						logger.error("FilterOptions: " + timeoutException.getRawMessage());
						throw timeoutException;
					}catch (NullPointerException nullPointerException) {
						logger.error("FilterOptions: " + nullPointerException.getMessage());
						throw nullPointerException;
					}catch (IndexOutOfBoundsException indexOutOfBoundsException) {
						logger.error("FilterOptions: " + indexOutOfBoundsException.getMessage());
						throw indexOutOfBoundsException;
					}catch (AssertionError assertionError) {
						logger.error("FilterOptions: " + assertionError.getMessage());
						throw assertionError;
					}
				}
				
				// this method is used to check the ratings by filter
				public void Ratings(int ratingsIndex) {
					
					try {
					int index = isFilter("Ratings");
					logger.info("ratings index is : "+ index);
					if(index >= 0) {
					filterBoxElements.get(index).click();
					logger.info("ratings is clicked here");
					AssertionHandling.hardAssertion("Ratings", filterBoxElements.get(index).getText(), "deliveryTime: text Doesn't Match");
					elementIsClickable(filterOptionElements);
					}
					
					if(filterOptionElements.size()-1 >=  ratingsIndex) {
						screenShot.screenShotDOM(driver, "FilterOption", "Ratings");
						filterOptionElements.get(ratingsIndex).click();
						logger.info("RatingsOptions is clicked Option : "+ filterOptionElements.get(ratingsIndex).getText());
					}	
					
					} catch (NoSuchElementException noSuchElementException) {
						logger.error("FilterOptions: " + noSuchElementException.getRawMessage());
						throw noSuchElementException;
					}catch (TimeoutException timeoutException) {
						logger.error("FilterOptions: " + timeoutException.getRawMessage());
						throw timeoutException;
					}catch (NullPointerException nullPointerException) {
						logger.error("FilterOptions: " + nullPointerException.getMessage());
						throw nullPointerException;
					}catch (IndexOutOfBoundsException indexOutOfBoundsException) {
						logger.error("FilterOptions: " + indexOutOfBoundsException.getMessage());
						throw indexOutOfBoundsException;
					}catch (AssertionError assertionError) {
						logger.error("FilterOptions: " + assertionError.getMessage());
						throw assertionError;
					}
				}
				
				// this method is used to check the veg or nonVeg by filter
				public void VegNonVeg(int VegNonVegIndex) {
					
					try {
					int index = isFilter("Veg/Non-Veg");
					logger.info("Veg/nonVeg index is : "+ index);
					if(index >= 0) {
					filterBoxElements.get(index).click();
					logger.info("vegNonVeg is clicked here");
					AssertionHandling.hardAssertion("Veg/Non-Veg", filterBoxElements.get(index).getText(), "deliveryTime: text Doesn't Match");
					elementIsClickable(filterOptionElements);
					}
					if(filterOptionElements.size()-1 >=  VegNonVegIndex) {
						screenShot.screenShotDOM(driver, "FilterOption", "VegNonVeg");
						filterOptionElements.get(VegNonVegIndex).click();
						logger.info("Veg/NonVegOptions is clicked Option : "+ filterOptionElements.get(VegNonVegIndex).getText());
					}
					} catch (NoSuchElementException noSuchElementException) {
						logger.error("FilterOptions: " + noSuchElementException.getRawMessage());
						throw noSuchElementException;
					}catch (TimeoutException timeoutException) {
						logger.error("FilterOptions: " + timeoutException.getRawMessage());
						throw timeoutException;
					}catch (NullPointerException nullPointerException) {
						logger.error("FilterOptions: " + nullPointerException.getMessage());
						throw nullPointerException;
					}catch (IndexOutOfBoundsException indexOutOfBoundsException) {
						logger.error("FilterOptions: " + indexOutOfBoundsException.getMessage());
						throw indexOutOfBoundsException;
					}catch (AssertionError assertionError) {
						logger.error("FilterOptions: " + assertionError.getMessage());
						throw assertionError;
					}
				}
				
				//this method is used to click the apply button in filter
				
				public void clickApplyButton() {
					try {
					elementIsClickable(ApplyButton).click();
					
					}catch (NoSuchElementException noSuchElementException) {
						logger.error("FilterOptions: " + noSuchElementException.getRawMessage());
						throw noSuchElementException;
					}catch (TimeoutException timeoutException) {
						logger.error("FilterOptions: " + timeoutException.getRawMessage());
						throw timeoutException;
					}catch (NullPointerException nullPointerException) {
						logger.error("FilterOptions: " + nullPointerException.getMessage());
						throw nullPointerException;
					}
				}
				
				//this method is used to close the filter Option
				public void closeFilter() {
					
					try {
						
						elementIsClickable(filterCloseButton).click();
					
					} catch (NoSuchElementException noSuchElementException) {
						logger.error("FilterOptions: " + noSuchElementException.getRawMessage());
						throw noSuchElementException;
					}catch (TimeoutException timeoutException) {
						logger.error("FilterOptions: " + timeoutException.getRawMessage());
						throw timeoutException;
					}catch (NullPointerException nullPointerException) {
						logger.error("FilterOptions: " + nullPointerException.getMessage());
						throw nullPointerException;
					}catch (AssertionError assertionError) {
						logger.error("FilterOptions: " + assertionError.getMessage());
						throw assertionError;
					}
				}

}

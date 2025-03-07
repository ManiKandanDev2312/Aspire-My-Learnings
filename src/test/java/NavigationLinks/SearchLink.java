package NavigationLinks;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;

import Common.AbstractComponent;
import Common.AssertionHandling;
import DriverSetup.DriverScreenShot;

public class SearchLink extends AbstractComponent {
	
	@FindBy(xpath="//li[contains(@class,'xNIjm')][5]//a")
	WebElement searchLink;
	DriverScreenShot screenShot = new DriverScreenShot();
	
	Logger logger = LogManager.getFormatterLogger(SearchLink.class);

	// this constructor is used to initiate the variables
	public SearchLink(WebDriver driver) {
		super(driver);
		PageFactory.initElements(driver, this);
	}
	
	//this method is used to click the Search Navigation link 
	public void linkClick() {

		try {
			
		driver.navigate().to(searchLink.getAttribute("href"));

		String checkWebTittle = "Order Food Online from India's Best Food Delivery Service | Swiggy";
		String checkWebUrl = "https://www.swiggy.com/search";
		AssertionHandling.hardAssertion( checkWebTittle, driver.getTitle(),"Search Page Tittle is Doesn't Match");
		AssertionHandling.hardAssertion( checkWebUrl, driver.getCurrentUrl(),"Search Page URL is Doesn't Match");

		screenShot.screenShotDOM(driver, "SearchPage","SearchBar");
		}catch (AssertionError assertionError) {
			logger.error("SearchLink: " + assertionError.getMessage());
			throw assertionError;
		}
	}
}

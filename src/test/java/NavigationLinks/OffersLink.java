package NavigationLinks;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;

import Common.AbstractComponent;
import Common.AssertionHandling;
import DriverSetup.DriverScreenShot;

public class OffersLink extends AbstractComponent {

	@FindBy(xpath="//li[contains(@class,'xNIjm')][4]//a")
	WebElement offersLink;
	DriverScreenShot screenShot = new DriverScreenShot();
	
	// this constructor is used to initiate the variables
	public OffersLink(WebDriver driver) {
		super(driver);
		PageFactory.initElements(driver, this);
	}
	
	//this method is used to click the offers Navigation link 
	public void linkClick() {
		
		
		try {
		
		driver.navigate().to(offersLink.getAttribute("href"));

		String checkWebTittle = "Restaurants With Great Offers Near Me In 2024";
		String checkWebUrl = "https://www.swiggy.com/offers-near-me";
		AssertionHandling.hardAssertion( checkWebTittle, driver.getTitle(),"offers Page Tittle is Doesn't Match");
		AssertionHandling.hardAssertion( checkWebUrl, driver.getCurrentUrl(),"offers Page URL is Doesn't Match");
		
		screenShot.screenShotDOM(driver, "offerPage","offers");
		}catch(AssertionError assertionError) {
			System.out.println("Assertion Failed: "+assertionError.getMessage());
			throw assertionError;
		}
	}
}

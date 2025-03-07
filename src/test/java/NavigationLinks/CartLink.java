package NavigationLinks;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;

import Common.AbstractComponent;
import Common.AssertionHandling;
import DriverSetup.DriverScreenShot;

public class CartLink extends AbstractComponent {
	@FindBy(xpath="//li[contains(@class,'xNIjm')][1]//a")
	WebElement cartLink;
	DriverScreenShot screenShot = new DriverScreenShot();
	
	// this constructor is used to initiate the variables
	public CartLink(WebDriver driver) {
		super(driver);
		PageFactory.initElements(driver, this);
	}
	
	//this method is used to click the cart Navigation link 
	public void linkClick() {
		
		try {
		
		driver.navigate().to(cartLink.getAttribute("href"));

		String checkWebTittle = "Order Food Online from India's Best Food Delivery Service | Swiggy";
		String checkWebUrl = "https://www.swiggy.com/checkout";
		AssertionHandling.hardAssertion( checkWebTittle, driver.getTitle(),"cart Page Tittle is Doesn't Match");
		AssertionHandling.hardAssertion( checkWebUrl, driver.getCurrentUrl(),"cart Page URL is Doesn't Match");
		
		screenShot.screenShotDOM(driver, "cartPage","cartWithoutDish");
		}catch(AssertionError assertionError) {
			System.out.println("Assertion Failed: "+assertionError.getMessage());
			throw assertionError;
		}
	}
}

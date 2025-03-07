package NavigationLinks;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;

import Common.AbstractComponent;
import Common.AssertionHandling;
import DriverSetup.DriverScreenShot;

public class LoginLink extends AbstractComponent {
	
	@FindBy(xpath="//li[contains(@class,'xNIjm')][2]//span[2]")
	WebElement loginLink;
	
	String initialText;
	
	DriverScreenShot screenShot = new DriverScreenShot();
	
	// this constructor is used to initiate the variables
	public LoginLink(WebDriver driver) {
		super(driver);
		PageFactory.initElements(driver,this);
	}
	
	//this method is used to click the Login Navigation link
	public void linkClick() {

		try {
		elementIsClickable(loginLink).click();
		screenShot.screenShotDOM(driver, "LoginPage","LoginForm");
		}catch(AssertionError assertionError) {
			System.out.println("Assertion Failed: "+assertionError.getMessage());
			throw assertionError;
		}
			
	}

}

package Common;

import java.time.Duration;
import java.util.Set;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.support.ui.WebDriverWait;

public abstract class AbstractPage {
	
	protected WebDriver driver;
	protected WebDriverWait driverWait;
	
	//this constructor is used to initiate the driver,waits
	protected AbstractPage(WebDriver driver){
		this.driver = driver;
		driverWait = new WebDriverWait(driver,Duration.ofSeconds(20));
		
	}
	
	//this method is used to wait until the page is get Loaded
	public void waitForPageLoaded() {
		JavascriptExecutor javascriptExecutor = (JavascriptExecutor) driver;
		
		while(!javascriptExecutor.executeScript("return document.readyState").equals("complete")) {
			
			try {
				Thread.sleep(500);
			}catch(Exception e) {
				e.printStackTrace();
			}
		}
	}
	
	//this method is used to close the current page
	public void closeCurrentPage() {
		driver.close();
	}
	
}

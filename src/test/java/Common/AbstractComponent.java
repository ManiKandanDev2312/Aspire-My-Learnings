package Common;

import java.time.Duration;
import java.util.List;
import org.openqa.selenium.TimeoutException;

import org.openqa.selenium.NoSuchElementException;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.openqa.selenium.ElementClickInterceptedException;
import org.openqa.selenium.ElementNotInteractableException;
import org.openqa.selenium.StaleElementReferenceException;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.FluentWait;
import org.openqa.selenium.support.ui.Wait;

public abstract class AbstractComponent {
	
	protected WebDriver driver;
	protected Wait wait;
	Logger logger = LogManager.getLogger(AbstractComponent.class);
	//this constructor is used to initate driver,Waits
	public AbstractComponent(WebDriver driver){
		this.driver = driver;
		
		wait = new FluentWait<>(driver).withTimeout(Duration.ofSeconds(15))
				.pollingEvery(Duration.ofSeconds(2))
				.ignoring(NoSuchElementException.class)
				.ignoring(StaleElementReferenceException.class)
				.ignoring(ElementNotInteractableException.class)
				.ignoring(ElementClickInterceptedException.class);
	}
	
	//this method is used to check the element is clickable or not
	public WebElement elementIsClickable(WebElement element) {
		try {
		return (WebElement) wait.until(ExpectedConditions.elementToBeClickable(element));
		}catch (NoSuchElementException noSuchElementException) {
			logger.info("Waits: "+noSuchElementException.getRawMessage());
			return null;
		}catch (TimeoutException timeoutException) {
			logger.info("Waits: "+timeoutException.getRawMessage());
			return null;
		}
	}
	
	//this method is used to check the elements is visible or not
		public List<WebElement> elementIsClickable(List<WebElement> element) {
			try {
				return  (List<WebElement>) wait.until(ExpectedConditions.visibilityOfAllElements(element));
				}catch (NoSuchElementException noSuchElementException) {
					logger.info("Waits: "+noSuchElementException.getRawMessage());
					return null;
				}catch (TimeoutException timeoutException) {
					logger.info("Waits: "+timeoutException.getRawMessage());
					return null;
				}
			
		}
}

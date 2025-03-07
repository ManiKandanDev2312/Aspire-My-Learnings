package Common;

import org.testng.Assert;
import org.testng.asserts.SoftAssert;

public class AssertionHandling {
	
	static SoftAssert softAssert = new SoftAssert();
	
	//this method is used to check the expected value to the actual value using HardAssertion
	public static void hardAssertion(String expected,String actual,String Message){
		 Assert.assertEquals(actual, expected,Message);
		
	}
	
	//this method is used to check the expected value to the actual value using SoftAssertion
	public static void softAssertion(String expected,String actual,String Message){
		
			softAssert.assertEquals(actual,expected, Message);
			softAssert.assertAll();
	}
}

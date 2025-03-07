package Common;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.testng.ITestContext;
import org.testng.ITestListener;
import org.testng.ITestResult;

import DriverSetup.DriverScreenShot;

public class CustomReportListener implements ITestListener {
	
	Map<String,List<String>> testResults = new LinkedHashMap<String,List<String>>();
	ArrayList<String> testResultList;
	Date date;
	SimpleDateFormat dateFormat = new SimpleDateFormat("HH:mm:ss");
	FileHandling fileHandling = new FileHandling();
	DriverScreenShot screenshot = new DriverScreenShot();
	
	//this method is used to calculate test timings
	public List<String> testTimeCalculation(ITestResult result , ArrayList<String> testResultList) {
		long startTime = result.getStartMillis();
	    date = new Date(startTime);
	    testResultList.add(dateFormat.format(date));
	    
	    long endTime = result.getEndMillis();
	    date = new Date(endTime);
	    testResultList.add(dateFormat.format(date));
	    
	    float timeTaken = (endTime - startTime)/1000;
	    testResultList.add(Float.toString(timeTaken));
	    
	    return testResultList;
	}
	
	// this method is invoked when the suite is start Testing
	public void onStart(ITestContext context) {
		fileHandling.createFile();
	}
	
	// this method is invoked when each Test is gets Started
	public void onTestStart(ITestResult result) {
		   testResults.put(result.getMethod().getMethodName()+" "+result.getTestClass().getName(), new ArrayList<String>());

		  }

	// this method is invoked when each Test is gets success
	public void onTestSuccess(ITestResult result) {
		    testResultList = new ArrayList<String>();
		    
		    testResultList.add("true");
		    
		    testResults.put(result.getMethod().getMethodName()+" "+result.getTestClass().getName(), testTimeCalculation(result,testResultList));
		  }
	
	
	// this method is invoked when each Test is gets Fails
	public void onTestFailure(ITestResult result) {
		testResultList = new ArrayList<String>();
	    
	    testResultList.add("false");
	    
	    testResults.put(result.getMethod().getMethodName()+" "+result.getTestClass().getName(), testTimeCalculation(result,testResultList));
		  }

	// this method is invoked when each Test is gets Skipped
	public void onTestSkipped(ITestResult result) {
		testResultList = new ArrayList<String>();
	    
	    testResultList.add("skip");
	    
	    testResults.put(result.getMethod().getMethodName()+" "+result.getTestClass().getName(), testTimeCalculation(result,testResultList));
		  }

	// this method is invoked when each Test is gets Completed
	public void onFinish(ITestContext context) {
		    fileHandling.evaluateTestCases(testResults);
		    System.out.println(screenshot.getScreenshotsPath());
		  }

}

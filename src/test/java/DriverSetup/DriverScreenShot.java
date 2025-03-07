package DriverSetup;

import java.awt.Dimension;
import java.awt.Rectangle;
import java.awt.Robot;
import java.awt.Toolkit;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import javax.imageio.ImageIO;

import org.apache.commons.io.FileUtils;
import org.openqa.selenium.OutputType;
import org.openqa.selenium.TakesScreenshot;
import org.openqa.selenium.WebDriver;

public class DriverScreenShot {
	
	Map<String,List<String>> screenshotsPath = new LinkedHashMap<>();
	
	//this method is used to take a screenshot only within the dom
	public void screenShotDOM(WebDriver driver,String FolderName,String imageName) {
		File snapShot = ((TakesScreenshot) driver).getScreenshotAs(OutputType.FILE);
		File destination = new File("C:\\Users\\mani.obulisamy\\Documents\\Selenium\\WebsiteTesting\\screenshot\\"+FolderName+"\\"+imageName+".png");
		

			screenshotsPath.putIfAbsent(FolderName, new ArrayList<String>());
			screenshotsPath.get(FolderName).add(destination.getPath());
			
		System.out.println(screenshotsPath);
		
		try {
			FileUtils.copyFile(snapShot, destination);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	//this method is used to take a screenshot with fullscreen
	public void screenShotFullscreen(String FolderName,String imageName) {
		try {
			Robot robot = new Robot();
			Dimension dimension = Toolkit.getDefaultToolkit().getScreenSize();
			Rectangle rectangle = new Rectangle(0,0,dimension.width,dimension.height);
			
			BufferedImage image = robot.createScreenCapture(rectangle);
			File destination = new File("C:\\Users\\mani.obulisamy\\Documents\\Selenium\\WebsiteTesting\\screenshot\\"+FolderName+"\\"+imageName+".png");
			
			ImageIO.write(image, "png", destination);
			
			
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
	}
	
	public Map<String,List<String>> getScreenshotsPath(){
		return screenshotsPath;
	}
}

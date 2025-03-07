package Common;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.util.List;
import java.util.Map;

public class FileHandling {
	
	File file;
	int totalTestcases;
	int totalPassTestCases;
	int totalFailTestcases;
	int totalSkippedTestCases;
	FileWriter fileWriter;
	
	//this method is used to create a File
	public void createFile() {
		file = new File("C:\\Users\\mani.obulisamy\\Documents\\Selenium\\WebsiteTesting\\CustomReport\\customReport.html");
		
		try {
			if(file.createNewFile())
				System.out.println("fileCreated");
			else
				System.out.println("fileNotCreated");
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	//this method is used calculate the number of test cases
	public void evaluateTestCases(Map<String,List<String>> testResults) {
		totalTestcases= testResults.size();
		
		for(String resultKeys: testResults.keySet()) {
			switch(testResults.get(resultKeys).get(0)) {
			case "true":
				++totalPassTestCases;
				break;
			case "false":
				++totalFailTestcases;
				break;
			case "skip":
				++totalSkippedTestCases;
				break;
				
			}
		}
		
		reportUI(testResults);
	}
	
	//this method is used to generate the ui for the report
	public void reportUI(Map<String,List<String>> testResults) {
		
	try {
		fileWriter = new FileWriter("C:\\Users\\mani.obulisamy\\Documents\\Selenium\\WebsiteTesting\\CustomReport\\customReport.html");
		fileWriter.write(Header());
		fileWriter.write(body(testResults));
		fileWriter.close();
	} catch (IOException e) {
		// TODO Auto-generated catch block
		e.printStackTrace();
	}
	}

	private String Header() {
		// TODO Auto-generated method stub
		return "<!DOCTYPE html>\r\n"
				+ "<html lang=\"en\">\r\n"
				+ "<head>\r\n"
				+ "    <title>Testing Document</title>\r\n"
				+ "    <link rel=\"stylesheet\" href=\"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css\" integrity=\"sha512-Evv84Mr4kqVGRNSgIGL/F/aIDqQb7xQ2vcrdIwxfjThSH8CSR7PBEakCr51Ck+w+/U6swU2Im1vVX0SVk9ABhg==\" crossorigin=\"anonymous\" referrerpolicy=\"no-referrer\" />\r\n"
				+ "    <style>\r\n"
				+ "        @import url('https://fonts.googleapis.com/css2?family=Roboto+Flex:opsz,wght@8..144,100..1000&family=Space+Grotesk:wght@300..700&display=swap');\r\n"
				+ "\r\n"
				+ ":root{\r\n"
				+ "    --primary-color: #000957;\r\n"
				+ "    --secondary-color: #344cb76e;\r\n"
				+ "    --tertiary-color: #577ac12f;\r\n"
				+ "    --quaternary-color: #FFEB00;\r\n"
				+ "    --font-color: #fff;\r\n"
				+ "}\r\n"
				+ "\r\n"
				+ "*{\r\n"
				+ "    margin: 0;\r\n"
				+ "    padding: 0;\r\n"
				+ "    box-sizing: border-box;\r\n"
				+ "    font-family: \"Space Grotesk\", serif;\r\n"
				+ "    font-weight: bold;\r\n"
				+ "    \r\n"
				+ "}\r\n"
				+ "\r\n"
				+ ".test-body{\r\n"
				+ "    display: flex;\r\n"
				+ "    /* gap: 20px; */\r\n"
				+ "    background-color: var(--primary-color);\r\n"
				+ "}\r\n"
				+ ".test-inner-body{\r\n"
				+ "    display: flex;\r\n"
				+ "    flex-direction: column;\r\n"
				+ "    gap: 20px;\r\n"
				+ "    padding: 20px 20px;\r\n"
				+ "    height: 100vh;\r\n"
				+ "}\r\n"
				+ ".test-inner-body:nth-child(1){\r\n"
				+ "    background-color: var(--secondary-color);\r\n"
				+ "    width: 22%;\r\n"
				+ "    position: sticky;\r\n"
				+ "    top: 0;\r\n"
				+ "    left: 0;\r\n"
				+ "}\r\n"
				+ ".test-inner-body:nth-child(2){\r\n"
				+ "    width: 78%;\r\n"
				+ "    overflow-y: scroll;\r\n"
				+ "}\r\n"
				+ ".test-inner-body-box{\r\n"
				+ "    display: flex;\r\n"
				+ "    flex-direction: row;\r\n"
				+ "    align-items: center;\r\n"
				+ "    gap: 20px;\r\n"
				+ "\r\n"
				+ "}\r\n"
				+ ".test-inner-body-box p{\r\n"
				+ "    color: var(--font-color);\r\n"
				+ "    font-size: 1.2vw;\r\n"
				+ "}\r\n"
				+ ".test-inner-body-box i{\r\n"
				+ "    color: var(--font-color);\r\n"
				+ "    font-size: 1.2vw;\r\n"
				+ "}\r\n"
				+ "\r\n"
				+ ".test-inner-body-box img{\r\n"
				+ "    width: 70px;\r\n"
				+ "    height: 70px;\r\n"
				+ "    object-fit: cover;\r\n"
				+ "}\r\n"
				+ ".test-inner-body:nth-child(2) .test-inner-body-box:nth-child(1) h1{\r\n"
				+ "    color: var(--font-color);\r\n"
				+ "    font-size: 1.8vw;\r\n"
				+ "    background-color: var(--secondary-color);\r\n"
				+ "    height: 50px;\r\n"
				+ "    width: 100%;\r\n"
				+ "    display: flex;\r\n"
				+ "    align-items: center;\r\n"
				+ "    padding-left: 30px;\r\n"
				+ "}\r\n"
				+ ".test-inner-body:nth-child(2) .test-inputs{\r\n"
				+ "    display: flex;\r\n"
				+ "    flex-direction: row;\r\n"
				+ "    gap: 20px;\r\n"
				+ "    background-color: var(--secondary-color);\r\n"
				+ "    height: 50px;\r\n"
				+ "    width: 100%;\r\n"
				+ "    align-items: center;\r\n"
				+ "    padding-left: 30px;\r\n"
				+ "}\r\n"
				+ "\r\n"
				+ ".test-inner-body:nth-child(2) .test-inputs select{\r\n"
				+ "    background-color: var(--tertiary-color);\r\n"
				+ "    color: var(--font-color);\r\n"
				+ "    width: 300px;\r\n"
				+ "    height: 30px;\r\n"
				+ "    border: none;\r\n"
				+ "    border-radius: 10px;\r\n"
				+ "    padding-left: 20px;\r\n"
				+ "}\r\n"
				+ "\r\n"
				+ ".test-inner-body:nth-child(2) .test-inputs select:focus{\r\n"
				+ "    outline: none;\r\n"
				+ "}\r\n"
				+ "\r\n"
				+ ".test-inner-body:nth-child(2) .test-inner-body-box:nth-child(2) {\r\n"
				+ "    display: flex;\r\n"
				+ "    flex-direction: column;\r\n"
				+ "    /* padding: 0; */\r\n"
				+ "    padding: 30px;\r\n"
				+ "    background-color: var(--secondary-color);\r\n"
				+ "}\r\n"
				+ ".test-summary{\r\n"
				+ "    display: flex;\r\n"
				+ "\r\n"
				+ "    flex-direction: row;\r\n"
				+ "    gap: 20px;\r\n"
				+ "    margin-left: 0px;\r\n"
				+ "}\r\n"
				+ ".test-summary h2{\r\n"
				+ "    color: var(--font-color);\r\n"
				+ "   \r\n"
				+ "}\r\n"
				+ ".test-summary-result{\r\n"
				+ "    margin-left: 50px;\r\n"
				+ "    display: column;\r\n"
				+ "    flex-direction: row;\r\n"
				+ "    align-items: center;\r\n"
				+ "}\r\n"
				+ ".test-summary p{\r\n"
				+ "    display: flex;\r\n"
				+ "    flex-direction: row;\r\n"
				+ "    justify-content: center;\r\n"
				+ "    font-size: 1.5vw;\r\n"
				+ "}\r\n"
				+ ".test-summary h2{\r\n"
				+ "    /* background-color: white; */\r\n"
				+ "    display: flex;\r\n"
				+ "    flex-direction: row;\r\n"
				+ "    justify-content: center;\r\n"
				+ "    font-size: 2vw;\r\n"
				+ "}\r\n"
				+ "\r\n"
				+ ".test-inner-body:nth-child(2) .test-inner-body-box:nth-child(4) {\r\n"
				+ "    /* padding: 0; */\r\n"
				+ "    padding: 30px;\r\n"
				+ "    background-color: var(--secondary-color);\r\n"
				+ "}\r\n"
				+ "\r\n"
				+ "\r\n"
				+ "\r\n"
				+ "table{\r\n"
				+ "    border-collapse: collapse;\r\n"
				+ "    background-color: #000957;\r\n"
				+ "    width: 100%;\r\n"
				+ "    color: var(--font-color);\r\n"
				+ "}\r\n"
				+ "th{\r\n"
				+ "    text-align: left;\r\n"
				+ "    padding-left: 20px;\r\n"
				+ "    background-color: var(--secondary-color);\r\n"
				+ "    /* border: 0.5px solid var(--font-color); */\r\n"
				+ "}\r\n"
				+ "tr{\r\n"
				+ "    height: 40px;\r\n"
				+ "    \r\n"
				+ "}\r\n"
				+ "td{\r\n"
				+ "    background-color: var(--tertiary-color);\r\n"
				+ "    padding-left: 20px;\r\n"
				+ "    /* border: 0.5px solid var(--font-color); */\r\n"
				+ "}\r\n"
				+ "    </style>\r\n"
				+ "</head>\r\n"
				+ "<body>\r\n"
				+ "    <div class=\"test-body\">\r\n"
				+ "        <div class=\"test-inner-body\">\r\n"
				+ "            <div class=\"test-inner-body-box\">\r\n"
				+ "                <div class=\"test-inner-contents\">\r\n"
				+ "                    <img src=\"C:\\Users\\mani.obulisamy\\Desktop\\Testing\\logo.png\" alt=\"Logo\">\r\n"
				+ "                </div>\r\n"
				+ "                <div class=\"test-inner-contents\">\r\n"
				+ "                    <p>Test Report</p>\r\n"
				+ "                </div>\r\n"
				+ "            </div>\r\n"
				+ "            <div class=\"test-inner-body-box\">\r\n"
				+ "                <div class=\"test-inner-contents\">\r\n"
				+ "                    <i class=\"fa-solid fa-chart-line\"></i>\r\n"
				+ "                </div>\r\n"
				+ "                <div class=\"test-inner-contents\">\r\n"
				+ "                    <p>Test Execution Report</p>\r\n"
				+ "                </div>\r\n"
				+ "            </div>\r\n"
				+ "        </div>\r\n"
				+ "        <div class=\"test-inner-body\">\r\n"
				+ "            <div class=\"test-inner-body-box\">\r\n"
				+ "                <h1>Test Execution Report</h1>\r\n"
				+ "            </div>\r\n"
				+ "            <div class=\"test-inner-body-box\">\r\n"
				+ "                <div class=\"test-summary\">\r\n"
				+ "                    <h2>Summary</h2>\r\n"
				+ "                </div>\r\n"
				+ "                <div class=\"test-summary\">\r\n"
				+ "                    <div class=\"test-summary-result\">\r\n"
				+ "                        <div class=\"test-summary-inner-result\">\r\n"
				+ "                            <h2>"+totalPassTestCases+"</h2>\r\n"
				+ "                        </div>\r\n"
				+ "                        <div class=\"test-summary-inner-result\">\r\n"
				+ "                            <p>pass</p>\r\n"
				+ "                        </div>\r\n"
				+ "                    </div>\r\n"
				+ "                    <div class=\"test-summary-result\">\r\n"
				+ "                        <div class=\"test-summary-inner-result\">\r\n"
				+ "                            <h2>"+totalFailTestcases+"</h2>\r\n"
				+ "                        </div>\r\n"
				+ "                        <div class=\"test-summary-inner-result\">\r\n"
				+ "                            <p>fail</p>\r\n"
				+ "                        </div>\r\n"
				+ "                    </div>\r\n"
				+ "                    <div class=\"test-summary-result\">\r\n"
				+ "                        <div class=\"test-summary-inner-result\">\r\n"
				+ "                            <h2>"+totalSkippedTestCases+"</h2>\r\n"
				+ "                        </div>\r\n"
				+ "                        <div class=\"test-summary-inner-result\">\r\n"
				+ "                            <p>skip</p>\r\n"
				+ "                        </div>\r\n"
				+ "                    </div>\r\n"
				+ "                    <div class=\"test-summary-result\">\r\n"
				+ "                        <div class=\"test-summary-inner-result\">\r\n"
				+ "                            <h2>"+totalTestcases+"</h2>\r\n"
				+ "                        </div>\r\n"
				+ "                        <div class=\"test-summary-inner-result\">\r\n"
				+ "                            <p>Total Test Case</p>\r\n"
				+ "                        </div>\r\n"
				+ "                    </div>\r\n"
				+ "                </div>\r\n"
				+ "            </div>\r\n"
				+"<div class=\"test-inner-body-box\">\r\n"
				+ "                <table>\r\n"
				+ "                    <tr >\r\n"
				+ "                        <th>Test Name</th>\r\n"
				+ "                        <th>Test Status</th>\r\n"
				+ "                        <th>Test start Time</th>\r\n"
				+ "                        <th>Test End Time</th>\r\n"
				+ "                        <th>Total Time (in Sec)</th>\r\n"
				+ "                    </tr>"
				;
	}
	
	public String body(Map<String, List<String>> testResults) {
		StringBuilder appendstring = new StringBuilder();
		for(String resultKey: testResults.keySet()) {
			appendstring.append("<tr>\r\n"
					+ "                        <td>"+resultKey+"</td>\r\n"
					+ "                        <td>"+testResults.get(resultKey).get(0)+"</td>\r\n"
					+ "                        <td>"+testResults.get(resultKey).get(1)+"</td>\r\n"
					+ "                        <td>"+testResults.get(resultKey).get(2)+"</td>\r\n"
					+ "                        <td>"+testResults.get(resultKey).get(3)+"</td>\r\n"
					+ "                    </tr>");
		}
		
		appendstring.append("  </table>\r\n"
				+ "            </div>\r\n"
				+ "        </div>\r\n"
				+ "    </div>\r\n"
				+ "</body>\r\n"
				+ "</html>");
		return appendstring.toString();
		
	}
}

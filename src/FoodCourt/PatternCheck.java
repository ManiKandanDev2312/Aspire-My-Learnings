package FoodCourt;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

// this class is for patterncheck for the user inputs
public class PatternCheck {
	private String userNameRegex="^[A-Za-z][A-Za-z0-9_-]{2,19}$";
	private String userEmailRegex="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,6}$";
	private String userPhoneNumberRegex="^\\d{3}[-.\\s]?\\d{3}[-.\\s]?\\d{4}$";
	private String userPasswordRegex="^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$";
	
	private  Pattern userNamePattern = Pattern.compile(userNameRegex);
	private  Pattern userEmailPattern = Pattern.compile(userEmailRegex);
	private  Pattern userPhoneNumberPattern = Pattern.compile(userPhoneNumberRegex);
	private  Pattern userPasswordPattern = Pattern.compile(userPasswordRegex);

	
	// this method is for userName validation
	public  boolean userNameCheck(String userName) {
		Matcher userNameMatcher = userNamePattern.matcher(userName);
		return userNameMatcher.matches();
	}

	// this method is for userEmail validation
	public  boolean userEmailCheck(String userEmail) {
		Matcher userEmailMatcher = userEmailPattern.matcher(userEmail);
		return userEmailMatcher.matches();
	}

	// this method is for userPhoneNumber validation
	public  boolean userPhoneNumberCheck(long userPhoneNumber) {
		Matcher userPhoneNumberMatcher = userPhoneNumberPattern.matcher(Long.toString(userPhoneNumber));
		return userPhoneNumberMatcher.matches();
	}

	// this method is for userPassword validation
	public  boolean userPasswordCheck(String userPassword) {
		Matcher userPasswordMatcher = userPasswordPattern.matcher(userPassword);
		return userPasswordMatcher.matches();
	}
}

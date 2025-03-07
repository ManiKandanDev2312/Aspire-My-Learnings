package ExceptionHandling;

public class DriverNotFoundException extends Exception {
	
	static String Message;
	//this custom Exception is used handle the browser not found
	public DriverNotFoundException(String Message){
		this.Message = Message;
	}
	
	//this method is used to get the exception message
	public  String getMessage() {
		return Message;
	}
}

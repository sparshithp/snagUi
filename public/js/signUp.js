

function checkSignUpForm() {
var form = document.getElementById("signUpForm");
	  	  
	if(form.name.value == "") {
	      alert("Error: Name cannot be blank!");
	      form.name.focus();
	      return false;
	 }
	
	if(form.password.value == "") {
	      alert("Error: password cannot be blank!");
	      form.password.focus();
	      return false;
	 }
	if(form.password.value.length < 6) {
	      alert("Error: password should be atleast 6 characters");
	      form.password.focus();
	      return false;
	 }
	
	if(form.confirmPassword.value == "") {
	      alert("Error: confirmPassword cannot be blank!");
	      form.confirmPassword.focus();
	      return false;
	 }
	
	if(form.email.value == "") {
	      alert("Error: email cannot be blank!");
	      form.email.focus();
	      return false;
	 }
	
	if(form.phone.value == "") {
	      alert("Error: phone cannot be blank!");
	      form.phone.focus();
	      return false;
	 }
	if(form.streetAddress.value == "") {
	      alert("Error: streetAddress cannot be blank!");
	      form.streetAddress.focus();
	      return false;
	 }
	if(form.zip.value == "") {
	      alert("Error: Zipcode cannot be blank!");
	      form.zip.focus();
	      return false;
	 }
	
	
	if(form.password.value  != form.confirmPassword.value){
		alert("Error: password did not match confirm password");
	      form.password.focus();
	      form.confirmPassword.focus();
	      return false;
	}
	  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	  if(!re.test(form.email.value)){
		  alert("Error: Invalid Email Id " + form.email.value);
		  form.email.focus();
	      return false;
	  }
	    
	return true;
	 
	
}



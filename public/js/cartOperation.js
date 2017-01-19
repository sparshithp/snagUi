

function cartTouched() {

	var cUpdate = document.getElementById('cUpdate');
	var resetCart = document.getElementById('resetCart');
	var pOrder = document.getElementById('pOrder');
	
	pOrder.style.display = "none";
	
	$("div#cUpdate").removeClass("cUpdate-btn");
	cUpdate.style.display = "block";
	
	$("div#resetCart").removeClass("cUpdate-btn");
	resetCart.style.display = "block";
	
}


function cartFormCheck() {
     
	var form = document.getElementById("cartForm");
	
	if(form.resetCart.style.display == "block"){
		return true;
	}
	if(form.paymentMode.value == "") {
	      alert("Please Choose the Payment Mode");
	      return false;
	 }
	
	if(form.deliverySlot.value == "") {
	      alert("Please Choose the Delivery Slot");
	      return false;
	 }
	
	return true
} 

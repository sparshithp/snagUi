
function showPressEnter(inp) {
	
	
	var d = document.getElementById(inp.parentElement.id);
	var children = d.childNodes;
	for (var i = 0; i < children.length; i++) {
    	var firstChild = children[i];
    	var id = firstChild.id;
    	if(id == "press"){
    		var pressP = document.getElementById(id);
    		$("div#pressP").removeClass("press-enter-disp");
    		pressP.style.display = "block";
    	}
	}
}

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

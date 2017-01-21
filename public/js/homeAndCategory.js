function varientSelect(selIndex){

	
}

function checkQty(form){

if(form.qty.value > 0){
	return true;
}
alert("Pease select Qty ")
return false;
}


function searchCategory() {
	   
    var input = document.getElementById('catergorySerachInput');
    var filter = input.value.toUpperCase();
    var accordian = document.getElementById("accordian");
    var children = accordian.childNodes;
    console.log(filter);
    for (var i = 0; i < children.length; i++) {
    	var firstChild = children[i];
    	var id = firstChild.id;
        if(id){
	        if (id.toUpperCase().indexOf(filter) > -1) {
	            firstChild.style.display = "";
	        } else {
	            firstChild.style.display = "none";
	        }
	       
	        var childId = id + ":" + "child";
	        var subCategory = document.getElementById(childId);
	        console.log(firstChild);
    
	        if(subCategory){
	        	console.log(subCategory);
    
	        	var lis = subCategory.getElementsByTagName('li');
		        for (var j = 0; j < lis.length; j++) {
		        	
			        var a = lis[j].getElementsByTagName("a")[0];
			        console.log(a);
			        if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
			            firstChild.style.display = "";
			            break;
			        } 
	    		}
	        }
	        
        }
    		
    }
}
    
function searchBrand() {
    var input = document.getElementById('brandSerachInput');
    var filter = input.value.toUpperCase();
    var ul = document.getElementById("brandList");
    var li = ul.getElementsByTagName('li');
	console.log(filter);
	console.log(li);
    var a, i;
    for (i = 0; i < li.length; i++) {
    	
        a = li[i].getElementsByTagName("a")[0];
        console.log(a);
        if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}
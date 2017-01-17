

function editProfileClick() {
    
	var infoDiv = document.getElementById('profile-info-div');
	var editDiv = document.getElementById('profile-edit-div');
	
	infoDiv.style.display = "none";
	
	$("div#profile-edit-div").removeClass("edit-form");
	editDiv.style.display = "block";
	
}


function cancelEditProfileClick() {
    
	var infoDiv = document.getElementById('profile-info-div');
	var editDiv = document.getElementById('profile-edit-div');
	
	infoDiv.style.display = "block";
	editDiv.style.display = "none";
	
}
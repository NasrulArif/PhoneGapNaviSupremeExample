var sellerPhone = document.getElementById("sellerPhone");
var sellerLocationCoor = document.getElementById("info");
var sellerLocationAddr = document.getElementById("address");


function sellerInfoSave(currentUser, currentUserEmail, currentUserID)
{
	alert("I get inside");
	var firebaseRef = firebase.database().ref();
	var name = currentUser;
	var phone = sellerPhone.value;
	var email = currentUserEmail;
	var id = currentUserID;
	var locCoor = sellerLocationCoor.textContent;
	var locAddr = sellerLocationAddr.textContent;
	
	var sellerData = {
		sellerPhone: phone,
		sellerLocationCoor: locCoor,
		sellerLocationAddr: locAddr
	};
	
	
	firebaseRef.child('seller').child(id).update(sellerData);

	alert("DONE");
}
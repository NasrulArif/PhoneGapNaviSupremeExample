$( document ).ready(function() {
	var userid;
	var userEmailAdd;
	var sellerPass = document.getElementById("userPswd");
	var sellerPassConfirm = document.getElementById("usercfPswd");
	var sellerNameValid = document.getElementById("validUsername");
	var sellerPhoneValid = document.getElementById("validPhone");
	var sellerName = document.getElementById("userName");
	var sellerPhone = document.getElementById("userPhone");
	var sellerLocationCoor = document.getElementById("info");
	var sellerLocationAddr = document.getElementById("address");
	var validParPass = document.getElementById("validPass");
	var validParConfPass = document.getElementById("validConfirmPass");
	var sellerEmailValid = document.getElementById("validEmail");
	var sellerEmail = document.getElementById("userEmail");
	var incase = document.getElementById("incase");
	var valid = false;
	var flag;
	var tempNamePlz;
	var productType = document.getElementById("prType");
	var productBrand = document.getElementById("productBrand");
	var productName = document.getElementById("productName");
	var productSize = document.getElementById("productSizes");
	var productColour = document.getElementById("productColours");
	var productPrice = document.getElementById("productPrice");
	var productNego = document.getElementById("productNego");
	var productCond = document.getElementById("productCond");
	var productPromo = document.getElementById("productPromo");
	var loginEmail = document.getElementById("logEmail");
	var loginPswd = document.getElementById("logPswd");
	var userEmail = document.getElementById("userEmail");
	var userPswd = document.getElementById("userPswd");
	var productFlag;
	var validPr = document.getElementById("validProduct");
	
	var config = {
		apiKey: "AIzaSyAQctYhwuCHunLgSu0Dhby2vkVgOmEuEFo",
		authDomain: "navisupreme.firebaseapp.com",
		databaseURL: "https://navisupreme.firebaseio.com",
		projectId: "navisupreme",
		storageBucket: "navisupreme.appspot.com",
		messagingSenderId: "29126167916"
	  };
	  firebase.initializeApp(config);
	  
	
	$(document).ready(function(){
		$("#addProduct").click(function(){
		   
			if(productBrand.value == "" || productName.value == "" || productSize.value == "" || productColour.value == "" || productPrice.value == "" || productPromo.value == "")
			{
				validPr.innerHTML = "Please don't leave blank space, put N/A if no value";
				productFlag = false;
			}
			else
			{
				validPr.innerHTML = "";
				productFlag = true;
			}
			
			if(productFlag == true){
				var firebaseRef = firebase.database().ref();
				var type = productType.value;
				var brand = productBrand.value;
				var name = productName.value;
				var size = productSize.value;
				var color = productColour.value;
				var price = productPrice.value;
				var nego = productNego.value;
				var cond = productCond.value;
				var promo = productPromo.value;
				var rating = 0;
				
				
				var productData = {
					productType: type,
					productName: name,
					productSizes: size,
					productColours: color,
					productPrice: price,
					productNego: nego,
					productCond: cond,
					productPromo: promo,
					productBrand: brand,
					productRating: rating
				};
				
				firebaseRef.child('product').child(tempNamePlz).child(type).child(brand).update(productData);
				alert("Product Successfully Published!");
				productBrand.value = "";
				productName.value = "";
				productSize.value = "";
				productColour.value = "";
				productPrice.value = "";
				productPromo.value = "";
			}
		});
	});
	
	$(document).ready(function(){
		$("#btnSignUpForm").click(function(){
			$("#signUpForm").toggle(500);
		});
	});
	
	$(document).ready(function(){
		$("#btnCloseSignUpForm").click(function(){
			$("#signUpForm").toggle(500);
		});
	});
	
	
	
	$("#btnSubmit").click(function(){
		//VALIDATE EMAIL
		if(sellerEmail.value == "")
		{
			sellerEmailValid.innerHTML = "Do not left email address empty and make sure you entered a correct email format";
			valid = false;
		}
		else
		{
			sellerEmailValid.innerHTML = "";
			valid = true;
		}
		
		//VALIDATE PASSWORD
		if(sellerPass.value == "")
		{
			validParPass.innerHTML = "Do not left password empty";
			valid = false;
		}
		else if(sellerPass.value.length < 6)
		{
			validParPass.innerHTML = "Password must be more than 5 characters";
			valid = false;
		}
		else
		{
			validParPass.innerHTML = "";
			valid = true;
		}
		
		//VALIDATE PASSWORD CONFIRMATION
		if(sellerPassConfirm.value != sellerPass.value)
		{
			validParConfPass.innerHTML = "Your confirmation password is not the same";
			valid = false;
		}
		else
		{
			validParConfPass.innerHTML = "";
			valid = true;
		}
		
		//VALIDATE USERNAME
		if(sellerName.value == "")
		{
			sellerNameValid.innerHTML = "Do not left name empty";
			valid = false;
		}
		else
		{
			sellerNameValid.innerHTML = "";
			valid = true;
		}
		
		//VALIDATE PHONE
		if(sellerPhone.value == "")
		{
			sellerPhoneValid.innerHTML = "Do not left contact number empty";
			valid = false;
		}
		else
		{
			sellerPhoneValid.innerHTML = "";
			valid = true;
		}
		
		
		
		if(valid == true)
		{
			var email = userEmail.value;
			var pass = userPswd.value;
			var promise = firebase.auth().createUserWithEmailAndPassword(email, pass);
			promise.catch(function(e) { console.log(e.message) });
			flag = true;
		}
		else
		{
			incase.innerHTML = "There are some errors in your input, please check. If you still cannot Sign Up even there is no errors, check your email format or your map coordinate";
		}
	});
	
	$("#btnLogin").click(function(){
		var email = loginEmail.value;
		var pass = loginPswd.value;
		var promise = firebase.auth().signInWithEmailAndPassword(email, pass);
		promise.catch(function(e) { alert(e.message) });
	});
	
	$("#btnLogout").click(function(){
		firebase.auth().signOut().then(function() {
		  window.location.href = "#logScreen";
		})
	});
	
	
	
	firebase.auth().onAuthStateChanged(function(firebaseUser){
		if(firebaseUser)
		{
			console.log(firebaseUser);
			window.location.href = "#who";
			userid = firebaseUser.uid;
			userEmailAdd = firebaseUser.email;
			console.log(userid);
			
			if(flag == true)
			{
				var firebaseRef = firebase.database().ref();
				var name = sellerName.value;
				var phone = sellerPhone.value;
				var email = userEmailAdd;
				var id = userid;
				var locCoor = sellerLocationCoor.textContent;
				var locAddr = sellerLocationAddr.textContent;
					
				var sellerData = {
					sellerName: name,
					sellerEmail: email,
					sellerPhone: phone,
					sellerLocationCoor: locCoor,
					sellerLocationAddr: locAddr
				};
					
					
				firebaseRef.child('seller').child(id).update(sellerData);

				alert("Successfully Registered");
				flag = false;
				
				
				document.getElementById("userEmail").value = "";
				document.getElementById("userPswd").value = "";
				document.getElementById("usercfPswd").value = "";
				document.getElementById("userName").value = "";
				document.getElementById("userPhone").value = "";
			}
			
			document.getElementById("logEmail").value = "";
			document.getElementById("logPswd").value = "";
			var getName = firebase.database().ref().child('seller').child(userid);
			getName.once('value').then(function(snap){
				var realname = snap.val();
				document.getElementById("googleUser").innerHTML = "Welcome " + realname.sellerName;
				tempNamePlz = realname.sellerName;
			});
			
		}
		else
		{
			window.location.href = "#logScreen";
		}
	});
	
	
	
});
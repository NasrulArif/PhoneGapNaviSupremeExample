var tempname;
var tempmodel;
var tempbrand;
var nameed;
var need;
function heading (x)
	  {
				document.getElementById("headerCat").innerHTML = x.toUpperCase();
				tempbrand = x;
				document.getElementById('sell').innerHTML = " ";
				var sellerkey = firebase.database().ref().child('product');
				sellerkey.once('value').then(function(datakey){
				datakey.forEach(function(data){
					nameed = data.key;
					var button = $('<a href="#brand" class="ui-btn ui-shadow big" data-transition="pop" style="padding-bottom: 20px; padding-top: 20px;" data-ajax="false" onClick="heading2(this.innerHTML);">' + nameed + '</a>');
					button.appendTo("#sell"); 
			});
		});	
	}
	  
	  var tempname;
	  var tempmodel;
	  function heading2(x){
		document.getElementById("headerSell").innerHTML = document.getElementById("headerCat").innerHTML + " | " + x.toUpperCase();
		tempname = x;
		document.getElementById('brander').innerHTML = " ";
		var brandkey = firebase.database().ref().child('product').child(tempname).child(tempbrand);
			brandkey.once('value').then(function(datakey){
			datakey.forEach(function(data){
				var brand = data.key;
				var button = $('<a href="#productDisplay" class="ui-btn ui-shadow big" data-transition="pop" style="padding-bottom: 20px; padding-top: 20px;" data-ajax="false" onclick="displaying('brand');">' + brand + '</a>');
				
				button.appendTo("#brander"); 
				});
			});
	  }
	  
	  
	  function displaying(brand){
		document.getElementById('detailList').innerHTML = " ";
		var brandkey = firebase.database().ref().child('product').child(tempname).child(tempbrand).child(brand);
			brandkey.once('value').then(function(datakey){
				var diplayer = datakey.val();
				
				document.getElementById("sName").innerHTML = "Seller: " + tempname;
				document.getElementById("sType").innerHTML = "Product Type: " + tempbrand;
				document.getElementById("sBrand").innerHTML = "Product Brand: " + tempmodel;
				document.getElementById("sModel").innerHTML = "Product Model: " + diplayer.productName;
				
				var text = $('<p>' + "Available Sizes: " + diplayer.productSizes + '</p>');
				text.appendTo("#detailList"); 
				var text = $('<p>' + "Available Colours: " + diplayer.productColours + '</p>');
				text.appendTo("#detailList"); 
				var text = $('<p>' + "Price: RM" + diplayer.productPrice + '</p>');
				text.appendTo("#detailList"); 
				var text = $('<p>' + "Price is: " + diplayer.productNego + '</p>');
				text.appendTo("#detailList"); 
				var text = $('<p>' + "Product Condition: " + diplayer.productCond + '</p>');
				text.appendTo("#detailList"); 
				var text = $('<p>' + "Promotion: " + diplayer.productPromo + '</p>');
				text.appendTo("#detailList"); 
				$(function () {
					$(".rateyo-readonly-widg").rateYo({
					  rating: displayer.rating,
					  numStars: 5,
					  precision: 2,
					  minValue: 1,
					  maxValue: 5
					}).on("rateyo.change", function (e, data) {
					
					  console.log(data.rating);
					});
				});
				
				var text = $('<p>' + "Rating: " + diplayer.rating + '</p>');
				text.appendTo("#rateyo-readonly-widg"); 
				
				/*
					productType: type,
					productBrand: brand,
					productSizes: size,
					productColours: color,
					productPrice: price,
					productNego: nego,
					productCond: cond,
					productPromo: promo,
					productRating: rating
				*/
			});
			
			var sellerkey = firebase.database().ref().child('seller');
			sellerkey.once('value').then(function(datakey){
				datakey.forEach(function(data){
					var name = data.val();
					if(name.sellerName == tempname)
					{
						document.getElementById("sPhone").innerHTML = "WhatsApp: " + name.sellerPhone;
					}
				});
			});
			
	  }
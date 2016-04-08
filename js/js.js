$(document).ready(function() {
	$('.popupShadow').hide();
	$('.popupImage').hide();
	
	imagePopup('.product-image, .product-image-enlarge');
	listener();
	var popupFunction; //håller vilken popuptyp som öppnades senast

	function imagePopup(imageClass){
		$(document).on('click', imageClass, function() {
			popupImage('<img src="' + $(imageClass).attr('src') + '" alt="Image not available">');

		});
	}

	function popupImage(content) {
		$('.popupImage').empty().append(content);
		popupFunction = 'popupImage';
		fadeIn('.popupImage', 500);
		fadeIn('.popupShadow', 500);
		
	}

	function fadeIn(element, ms) {
		$(element).hide().fadeIn(ms);
		

	}

	function fadeOut(element, ms) {
		$(element).fadeOut(ms);
		$('.popupShadow').fadeOut(ms);
	}

	function showMenuSmall() {
		$('.menu-small').animate({
			top:0
		}, 200, function() {
			//klar
		});
		fadeOut('.menu-burger', 50);
	}
	function hideMenuSmall() {
		$('.menu-small').animate({
			top:'-600px'
		}, 200, function() {
			//klar
		});
		fadeIn('.menu-burger', 50);
	}


	function listener() { //lyssnar efter saker
		//menu-small
		$('.menu-burger').click(function() {  //show menu
			showMenuSmall();
		});

		$('.menu-small-hide').click(function() {
			hideMenuSmall();
		});

		$(document).on('click', '.menu-link', function() {
			hideMenuSmall();
		});

		$(document).on('click', '.shopping-cart > a', function() {
			alert("HEJ");
		});


		///////// Popup
		function closePopup() { //stänger den popuptyp som har öppnats
			switch (popupFunction) {
				case 'popupImage':
					fadeOut('.popupImage', 500);
					break;
			}
		} //end closePopup

		$('.popupShadow, .popupShadow > span').click(function() {
			closePopup();
		});

		$('body').keypress(function(e) {
			if (e.which == 0) {
				closePopup();
			}
		})
	}


});
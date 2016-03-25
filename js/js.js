$(document).ready(function() {
	$('.popupShadow').hide();
	$('.popupImage').hide();
	imagePopup('.product-image');
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
		
	}

	function fadeIn(element, ms) {
		$(element).hide().fadeIn(ms);
		$('.popupShadow').fadeIn(ms);

	}

	function fadeOut(element, ms) {
		$(element).fadeOut(ms);
		$('.popupShadow').fadeOut(ms);
	}

	function listener() { //lyssnar efter saker

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
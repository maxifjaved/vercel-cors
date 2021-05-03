const urlParams = new URLSearchParams(window.location.search);
const slides = urlParams.get('slides');
const jssorAnimation = urlParams.get('jssorAnimation');
const jssorDelay = urlParams.get('jssorDelay');

let decodedSlides = JSON.parse(atob(slides));

for (const decodedSlide of decodedSlides) {
	const slidesEle = document.querySelector('#slides');
	slidesEle.insertAdjacentHTML('beforeend', `<div><img data-u="image" src="${decodedSlide}" /></div>`);
}
var slideshowTransitions = [
	[{ $Duration: 1000, y: 1, $Opacity: 2, $Easing: $Jease$.$InQuad }],
	[{ $Duration: 1000, y: -1, $Opacity: 2, $Easing: $Jease$.$InQuad }],
	[{ $Duration: 1000, x: 1, $Opacity: 2, $Easing: $Jease$.$InQuad }],
	[{ $Duration: 1000, x: -1, $Opacity: 2, $Easing: $Jease$.$InQuad }],
];


$(document).ready(function ($) {
	console.log(slideshowTransitions[jssorAnimation])
	const options = {
		$AutoPlay: 1,
		$DragOrientation: 1,
		$Idle: (jssorDelay || 1) * 1000,
		$SlideshowOptions: {
			$Class: $JssorSlideshowRunner$,
			$Transitions: slideshowTransitions[jssorAnimation || 0],
			$TransitionsOrder: 1
		},
	};


	const documentHeight = $('#widgetHolder').parent().height();
	const documentWidth = $('#widgetHolder').parent().width();
	// debugger;
	$('#widgetHolder').css({
		'width': `${documentWidth}px`,
		'height': `${documentHeight}px`,
	});
	$('#slides').css({
		'width': `${documentWidth}px`,
		'height': `${documentHeight}px`,
	});


	const jssor_slider1 = new $JssorSlider$('widgetHolder', options);

	function ScaleSlider() {
		var parentWidth = $('#widgetHolder').parent().width();
		if (parentWidth) {
			jssor_slider1.$ScaleWidth(parentWidth);
		}
		var parentHeight = $('#widgetHolder').parent().height();
		if (parentHeight) {
			jssor_slider1.$ScaleHeight(parentHeight);
		}
		else {
			window.setTimeout(ScaleSlider, 30);
		}
	}

	ScaleSlider();
	$(window).bind("load", ScaleSlider);
	$(window).bind("resize", ScaleSlider);
	$(window).bind("orientationchange", ScaleSlider);
});

$(window).scroll(function() {
    var currentScroll = $(this).scrollTop();
    if (currentScroll > 500) {
      $('#headerLogo').removeClass('hidden').addClass('visible');
    } else {
      $('#headerLogo').removeClass('visible').addClass('hidden');
    }
  });

$(document).ready(function() {
	// Loop to insert new slides with data-index values from 7 to 19
	for (var i = 7; i <= 19; i++) {
	  // Create a new li element with your desired HTML structure for the new slide
	  var newSlide = '<li data-index="' + i + '"><div class="item"><img src="img/1x1.jpg" alt=""><div class="item_in"><div class="img" data-bg-img="img/slider/' + i + '.png"></div></div></div><div class="spanDiv"><span class="spanText text-5xl"></span><div></li>';
	  
	  // Insert the new slide after the li element with data-index value i-1
	  $('li[data-index="' + (i-1) + '"]').after(newSlide);
	}
  });

  let nftNames = [
	"COllie Spider",
	"COllie thanos",
	"COllie hunk",
	"COllie shazam",
	"COllie super",
	"COllie falcon",
	"COllie thor",
	"COllie flash",
	"COllie captain",
	"COllie green LANTERN",
	"COllie ant-man",
	"COllie black panther",
	"COllie deadpool",
	"COllie black adam",
	"COllie wonder woman",
	"COllie Queen",
	"COllie iron",
	"COllie King",
	"COllie batman",

  ]

  $(document).ready(function() {
	$('.fn_cs_slider li').each(function(index) {
	  var text = 'Slide ' + (index); // Generate text based on the slide index
	  $(this).find('.spanText').text(nftNames[index].toLowerCase().toUpperCase()); // Insert the text into the spanText element
	});
  });


//   $(document).ready(function() {
// 	$('.slideH').each(function() {
// 	  var imgSrc = $(this).find('img').attr('src');
// 	  $(this).css('background-image', 'url("' + imgSrc + '")');
// 	});
//   });
var MetaPortalFilterArray		= [];
var MetaPortalFilterCondition	= 'and';

function getColor(imgSrc){
const img = new Image();
img.crossOrigin = 'anonymous'; // Set crossOrigin to 'anonymous' to enable CORS
img.src = imgSrc;
img.onload = function() {
  const canvas = document.createElement('canvas');
  canvas.width = img.width;
  canvas.height = img.height;
  const ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0);
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;

  // Create an array to store the color values
  const colors = [];

  // Loop through the pixel data and add the color values to the array
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const color = `rgb(${r},${g},${b})`;
    colors.push(color);
  }

  // Create an object to store the color counts
  const colorCounts = {};

  // Loop through the colors array and count the occurrence of each color
  for (let i = 0; i < colors.length; i++) {
    const color = colors[i];
    if (colorCounts[color]) {
      colorCounts[color]++;
    } else {
      colorCounts[color] = 1;
    }
  }

  // Find the color with the highest count
  let dominantColor;
  let maxCount = 0;
  for (const color in colorCounts) {
    if (colorCounts[color] > maxCount) {
      dominantColor = color;
      maxCount = colorCounts[color];
    }
  }

  return dominantColor // Outputs the CSS color string for the dominant color
};
}

(function($){
  "use strict";
	
  
	var FrenifyMetaPortal = {
		
		init: function(){
			FrenifyMetaPortal.BgImg();
			FrenifyMetaPortal.slider();
			FrenifyMetaPortal.fullSlider();
		},
			
		
		/* since v4.0 */
		fullSlider: function(){
			var section		= $('.fn_cs_full_slider .swiper-container');
			section.each(function(){
				var element				= $(this);
				var transform 			= 'Y';
				var direction 			= 'horizontal';
				var	interleaveOffset 	= 0.5;
				if(direction === 'horizontal'){
					transform 			= 'X';
				}
				var rate				= 1;
				if($('body').hasClass('rtl')){
					rate = -1;
				}
				// Main Slider
				var mainSliderOptions 	= {
					loop: true,
					speed: 1500,
					autoplay:{
						delay: 5000,
						disableOnInteraction: false,
					},
					navigation: {
						nextEl: element.closest('.fn_cs_full_slider').find('.next'),
						prevEl: element.closest('.fn_cs_full_slider').find('.prev'),
					},
					slidesPerView: 1,
					direction: direction,
					loopAdditionalSlides: 10,
					watchSlidesProgress: true,
					on: {
						init: function(){
							this.autoplay.stop();
						},
						imagesReady: function(){
							this.autoplay.start();
						},
						progress: function(){
							var swiper = this;
							for (var i = 0; i < swiper.slides.length; i++) {
								var slideProgress 	= swiper.slides[i].progress,
								innerOffset 		= swiper.width * interleaveOffset,
								innerTranslate 		= slideProgress * innerOffset * rate;
								$(swiper.slides[i]).find(".abs_img").css({transform: "translate"+transform+"(" + innerTranslate + "px)"});
							}
						},
						touchStart: function() {
							var swiper = this;
							for (var i = 0; i < swiper.slides.length; i++) {
								swiper.slides[i].style.transition = "";
							}
						},
						setTransition: function(speed) {
							var swiper = this;
							for (var i = 0; i < swiper.slides.length; i++) {
								swiper.slides[i].style.transition = speed + "ms";
								swiper.slides[i].querySelector(".abs_img").style.transition =
								speed + "ms";
							}
						}
					}
				};
				new Swiper(element, mainSliderOptions);
			});	
		},
		
	

		slider: function(){
			$('.fn_cs_slider').each(function(){
				var slider 			= $(this);
				
				var sliderTop 		= slider.find('.slider_top');
				var sliderBottom 	= slider.find('.slider_content');
				var activeIndex 	= 3;
				var speed			= 6000; // milliseconds
				
				// init slider animation
				var myInterval 		= setInterval(function(){
					activeIndex++;
					activeIndex 	= FrenifyMetaPortal.sliderDo(sliderTop,sliderBottom,activeIndex);
				},speed);
				
				
				// previous navigation button
				slider.find('.slider_nav .prev').off().on('click',function(){

					clearInterval(myInterval);
					activeIndex--;
					activeIndex 	= FrenifyMetaPortal.sliderDo(sliderTop,sliderBottom,activeIndex);
					myInterval 		= setInterval(function(){
						activeIndex++;
						activeIndex = FrenifyMetaPortal.sliderDo(sliderTop,sliderBottom,activeIndex);
					},speed);
					return false;
				});
				
				// next navigation button
				slider.find('.slider_nav .next').off().on('click',function(){
				
					clearInterval(myInterval);
					activeIndex++;
					const imgSrc = $(`li[data-index="${activeIndex}"] .item_in > .img`).data('bg-img');
				

					activeIndex 	= FrenifyMetaPortal.sliderDo(sliderTop,sliderBottom,activeIndex);
					myInterval 		= setInterval(function(){
						activeIndex++;
						activeIndex = FrenifyMetaPortal.sliderDo(sliderTop,sliderBottom,activeIndex);
					},speed);
					return false;
				});
				
				// previous and next item
				slider.find('.slider_top li').on('click',function(e){
					var getClass = $(this).attr('class');
					if(getClass === 'next'){
						e.stopPropagation();
						e.preventDefault();
						activeIndex++;
					}else if(getClass === 'prev'){
						e.stopPropagation();
						e.preventDefault();
						activeIndex--;
					}
					if(getClass === 'next' || getClass === 'prev'){
						clearInterval(myInterval);
						activeIndex 	= FrenifyMetaPortal.sliderDo(sliderTop,sliderBottom,activeIndex);
						myInterval 		= setInterval(function(){
							activeIndex++;
							activeIndex = FrenifyMetaPortal.sliderDo(sliderTop,sliderBottom,activeIndex);
						},speed);
						return false;
					}
				});
			});
				
		},
		
		sliderDo: function(sliderTop,sliderBottom,activeIndex){
			var topLength	= sliderTop.find('li').length;
			let index = activeIndex
			if(index > topLength)
			  index = 1;
			// Find the li element with the specified activeIndex value
			let activeSlide = sliderTop.find('li[data-index="' + index + '"]');
			
			// Extract the HTML content of the active slide
			let activeSlideHTML = activeSlide.html();
			
			// Create a new jQuery object from the activeSlide HTML content
			let activeSlideElement = $(activeSlideHTML);
			
			// Get the value of the 'data-bg-img' attribute using the 'attr' method
			let dataBgImg = activeSlideElement.find('.img').attr('data-bg-img');
			
			if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
				var sliderBg = $('.slider-bg'); // Cache the slider background element
				if (sliderBg.length) { // Check if the slider background element exists
				  // Fade out the current background image
				  sliderBg.fadeOut(100, function() {
					// Change the background image and zoom/fade it back in
					sliderBg.css({
					  'background-image': `url("${dataBgImg}")`,
					  transform: "scale(0)"
					}).hide().fadeIn(500).css({
					  transform: "scale(1)"
					});
				  });
				} else { // Create the slider background element if it doesn't exist
				  $('#slider').css({
					'position': 'relative',
					'z-index': '1'
				  }).prepend('<div class="slider-bg"></div>');
				  $('.slider-bg').css({
					'content': '""',
					'position': 'absolute',
					'top': '0',
					'left': '0',
					'bottom': '0',
					'right': '0',
					'background-image': `url("${dataBgImg}")`,
					'background-size': '80%',
					// 'filter': 'blur(20px)',
					'z-index': '-1',
					'opacity': '1'
				  });
				}
			  }
		  
			// Update the active slide and return the new active index
			if(activeIndex > topLength){activeIndex-=topLength;}
			var indexPrev	= activeIndex - 1;
			var indexPrev2	= activeIndex - 2;
			var indexNext 	= activeIndex + 1;
			var indexNext2 	= activeIndex + 2;
			if(indexPrev > topLength){indexPrev-=topLength;}
			if(indexPrev2 > topLength){indexPrev2-=topLength;}
			if(indexNext > topLength){indexNext-=topLength;}
			if(indexNext2 > topLength){indexNext2-=topLength;}
			if(indexPrev < 1){indexPrev += topLength;}
			if(indexPrev2 < 1){indexPrev2 += topLength;}
			if(activeIndex < 1){activeIndex += topLength;}
			if(indexNext < 1){indexNext += topLength;}
			if(indexNext2 < 1){indexNext2 += topLength;}
			sliderTop.find('li').removeClass('prev prev2 active next next2');
			sliderTop.find('li[data-index="'+indexPrev2+'"]').addClass('prev2');
			sliderTop.find('li[data-index="'+indexPrev+'"]').addClass('prev');
			sliderTop.find('li[data-index="'+activeIndex+'"]').addClass('active');
			sliderTop.find('li[data-index="'+indexNext+'"]').addClass('next');
			sliderTop.find('li[data-index="'+indexNext2+'"]').addClass('next2');
			return activeIndex;
		  },

		
		imgToSVG: function(){
			$('img.fn__svg').each(function(){
				var img 		= $(this);
				var imgClass	= img.attr('class');
				var imgURL		= img.attr('src');

				$.get(imgURL, function(data) {
					var svg 	= $(data).find('svg');
					if(typeof imgClass !== 'undefined') {
						svg 	= svg.attr('class', imgClass+' replaced-svg');
					}
					img.replaceWith(svg);

				}, 'xml');

			});
		},

	  	BgImg: function(){
			var div = $('*[data-bg-img]');
			div.each(function(){
				var element = $(this);
				var attrBg	= element.attr('data-bg-img');
				var dataBg	= element.data('bg-img');
				if(typeof(attrBg) !== 'undefined'){
			
					element.css({backgroundImage:'url('+dataBg+')'});
					
				}
			});
		},
    
  	};
  	

	$(document).ready(function(){
		FrenifyMetaPortal.init();
		$('#slider').css({
			'position': 'relative',
			'z-index': '1'
		  }).prepend('<div class="slider-bg"></div>');
		
		  $('.slider-bg').css({
			'content': '""',
			'position': 'absolute',
			'top': '0',
			'left': '0',
			'bottom': '0',
			'right': '0',
			'background-image': `url("img/slider/1.png")`,
			'background-size': 'cover',
			'filter': 'blur(30px)',
			'z-index': '-1',
			'opacity': '1'
		  });

		
	});
	


	


	
})(jQuery);

var debounce = function(func, wait, immediate) {
	var timeout;
	return function() {
	  var context = this, args = arguments;
	  var later = function() {
		timeout = null;
		if (!immediate) func.apply(context, args);
	  };
	  var callNow = immediate && !timeout;
	  clearTimeout(timeout);
	  timeout = setTimeout(later, wait);
	  if (callNow) func.apply(context, args);
	};
  };
  
  $(window).scroll(debounce(function() {
	var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
	if (!isMobile) {
	  var scrolled = $(this).scrollTop();
	  var zoom = 100 + scrolled/20;
	  var translateY = Math.min(10, scrolled);
	  window.requestAnimationFrame(function() {
		$('.headerBanner').css({
		  'background-size': zoom + '%',
		  'background-position': 'center ' + (100 - zoom/2) + '%'
		});
		$('#headerPhoto').css('transform', 'translateY(' + translateY + 'px)');
	  });
	}
  }, 10));
var canvas;
var context;
var screenH;
var screenW;
var stars = [];
var fps = 50;
var numStars = 2000;

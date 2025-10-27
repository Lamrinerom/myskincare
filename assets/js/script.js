(function($) {
	
	"use strict";
	
	
	//Hide Loading Box (Preloader)
	function handlePreloader() {
		if($('.preloader').length){
			$('.preloader').delay(200).fadeOut(500);
		}
	}
	
	
	//Update Header Style and Scroll to Top
	function headerStyle() {
		if($('.main-header').length){
			var windowpos = $(window).scrollTop();
			var siteHeader = $('.main-header');
			var scrollLink = $('.scroll-to-top');
			if (windowpos >= 200) {
				siteHeader.addClass('fixed-header');
				scrollLink.fadeIn(300);
			} else {
				siteHeader.removeClass('fixed-header');
				scrollLink.fadeOut(300);
			}
		}
	}
	
	headerStyle();
	
	
	//Submenu Dropdown Toggle
	if($('.main-header li.dropdown ul').length){
		$('.main-header li.dropdown').append('<div class="dropdown-btn"><span class="fa fa-angle-down"></span></div>');
		
		//Dropdown Button
		$('.main-header li.dropdown .dropdown-btn').on('click', function() {
			$(this).prev('ul').slideToggle(500);
		});
		
		//Dropdown Menu / Fullscreen Nav
		$('.fullscreen-menu .navigation li.dropdown > a').on('click', function() {
			$(this).next('ul').slideToggle(500);
		});
		
		//Disable dropdown parent link
		$('.navigation li.dropdown > a').on('click', function(e) {
			e.preventDefault();
		});
		
		//Disable dropdown parent link
		$('.main-header .navigation li.dropdown > a,.hidden-bar .side-menu li.dropdown > a').on('click', function(e) {
			e.preventDefault();
		});
	}
	
	
	//Hidden Sidebar
	if ($('.hidden-bar,.fullscreen-menu').length) {
		var hiddenBar = $('.hidden-bar');
		var hiddenBarOpener = $('.nav-toggler');
		var hiddenBarCloser = $('.hidden-bar-closer,.close-menu');
		$('.hidden-bar-wrapper').mCustomScrollbar();
		
		//Show Sidebar
		hiddenBarOpener.on('click', function () {
			$('body').addClass('visible-menu-bar');
			hiddenBar.addClass('visible-sidebar');
		});
		
		//Hide Sidebar
		hiddenBarCloser.on('click', function () {
			$('body').removeClass('visible-menu-bar');
			hiddenBar.removeClass('visible-sidebar');
		});
	}
	
	
	//Event Countdown Timer
	if($('.time-countdown').length){  
		$('.time-countdown').each(function() {
		var $this = $(this), finalDate = $(this).data('countdown');
		$this.countdown(finalDate, function(event) {
			var $this = $(this).html(event.strftime('' + '<div class="counter-column"><span class="count">%D</span>Days</div> ' + '<div class="counter-column"><span class="count">%H</span>Hours</div>  ' + '<div class="counter-column"><span class="count">%M</span>Minutes</div>  ' + '<div class="counter-column"><span class="count">%S</span>Seconds</div>'));
		});
	 });
	}
	
	
	//Make Content Sticky
	//if($('.sticky-box').length){
		//var a = new StickySidebar('.sidebar-page-container .sidebar-side .sidebar .inner', {
			//topSpacing: 80,
			//bottomSpacing: 0,
			//containerSelector: '.sticky-container',
			//innerWrapperSelector: '.sticky-box'
		//});
	//}
	
	
	// Product Carousel Slider
	if ($('.shop-page .image-carousel').length && $('.shop-page .thumbs-carousel').length) {

		var $sync1 = $(".shop-page .image-carousel"),
			$sync2 = $(".shop-page .thumbs-carousel"),
			flag = false,
			duration = 500;

			$sync1
				.owlCarousel({
					loop:true,
					items: 1,
					margin: 0,
					nav: false,
					navText: [ '<span class="icon fa fa-angle-left"></span>', '<span class="icon fa fa-angle-right"></span>' ],
					dots: false,
					autoplay: true,
					autoplayTimeout: 5000
				})
				.on('changed.owl.carousel', function (e) {
					if (!flag) {
						flag = false;
						$sync2.trigger('to.owl.carousel', [e.item.index, duration, true]);
						flag = false;
					}
				});

			$sync2
				.owlCarousel({
					loop:true,
					margin: 20,
					items: 1,
					nav: true,
					navText: [ '<span class="icon fa fa-angle-left"></span>', '<span class="icon fa fa-angle-right"></span>' ],
					dots: false,
					center: false,
					autoplay: true,
					autoplayTimeout: 5000,
					responsive: {
						0:{
				            items:2,
				            autoWidth: false
				        },
				        400:{
				            items:2,
				            autoWidth: false
				        },
				        600:{
				            items:3,
				            autoWidth: false
				        },
				        900:{
				            items:5,
				            autoWidth: false
				        },
				        1000:{
				            items:4,
				            autoWidth: false
				        }
				    },
				})
				
		.on('click', '.owl-item', function () {
			$sync1.trigger('to.owl.carousel', [$(this).index(), duration, true]);
		})
		.on('changed.owl.carousel', function (e) {
			if (!flag) {
				flag = true;		
				$sync1.trigger('to.owl.carousel', [e.item.index, duration, true]);
				flag = false;
			}
		});

	}
	
	
	//Sortable Masonary with Filters
	function sortableMasonry() {
		if($('.sortable-masonry').length){
	
			var winDow = $(window);
			// Needed variables
			var $container=$('.sortable-masonry .items-container');
			var $filter=$('.filter-btns');
	
			$container.isotope({
				filter:'*',
				 masonry: {
					columnWidth : '.masonry-item'
				 },
				animationOptions:{
					duration:500,
					easing:'linear'
				}
			});
			
	
			// Isotope Filter 
			$filter.find('li').on('click', function(){
				var selector = $(this).attr('data-filter');
	
				try {
					$container.isotope({ 
						filter	: selector,
						animationOptions: {
							duration: 500,
							easing	: 'linear',
							queue	: false
						}
					});
				} catch(err) {
	
				}
				return false;
			});
	
	
			winDow.bind('resize', function(){
				var selector = $filter.find('li.active').attr('data-filter');

				$container.isotope({ 
					filter	: selector,
					animationOptions: {
						duration: 500,
						easing	: 'linear',
						queue	: false
					}
				});
			});
	
	
			var filterItemA	= $('.filter-btns li');
	
			filterItemA.on('click', function(){
				var $this = $(this);
				if ( !$this.hasClass('active')) {
					filterItemA.removeClass('active');
					$this.addClass('active');
				}
			});
		}
	}
	
	sortableMasonry();
	
	
	//Jquery Spinner / Quantity Spinner
	if($('.quantity-spinner').length){
		$("input.quantity-spinner").TouchSpin({
		  verticalbuttons: true
		});
	}
	
	
	//Accordion Box
	if($('.accordion-box').length){
		$(".accordion-box").on('click', '.acc-btn', function() {
			
			var outerBox = $(this).parents('.accordion-box');
			var target = $(this).parents('.accordion');
			
			if($(this).hasClass('active')!==true){
				$(outerBox).find('.accordion .acc-btn').removeClass('active');
			}
			
			if ($(this).next('.acc-content').is(':visible')){
				return false;
			}else{
				$(this).addClass('active');
				$(outerBox).children('.accordion').removeClass('active-block');
				$(outerBox).find('.accordion').children('.acc-content').slideUp(300);
				target.addClass('active-block');
				$(this).next('.acc-content').slideDown(300);	
			}
		});	
	}
	
	
	//Bottom Parallax
	function bottomParallax() {
		if($('.bottom-parallax').length){
			var windowpos = $(window).scrollTop();
			var siteFooter = $('.main-footer').height();
			var sitebodyHeight = $('.page-wrapper').height();
			var finalHeight = sitebodyHeight - siteFooter - 580;
			if (windowpos >= finalHeight) {
				$('body').addClass('parallax-visible');
			} else {
				$('body').removeClass('parallax-visible');
			}
		}
	}
	
	bottomParallax();
	
	
	//Gallery Filters
	if($('.filter-list').length){
		$('.filter-list').mixItUp({});
	}
	
	
	//Tabs Box
	if($('.tabs-box').length){
		$('.tabs-box .tab-buttons .tab-btn').on('click', function(e) {
			e.preventDefault();
			var target = $($(this).attr('data-tab'));
			
			if ($(target).is(':visible')){
				return false;
			}else{
				target.parents('.tabs-box').find('.tab-buttons').find('.tab-btn').removeClass('active-btn');
				$(this).addClass('active-btn');
				target.parents('.tabs-box').find('.tabs-content').find('.tab').fadeOut(0);
				target.parents('.tabs-box').find('.tabs-content').find('.tab').removeClass('active-tab');
				$(target).fadeIn(300);
				$(target).addClass('active-tab');
			}
		});
	}
	
	
	//Fact Counter + Text Count
	if($('.count-box').length){
		$('.count-box').appear(function(){
	
			var $t = $(this),
				n = $t.find(".count-text").attr("data-stop"),
				r = parseInt($t.find(".count-text").attr("data-speed"), 10);
				
			if (!$t.hasClass("counted")) {
				$t.addClass("counted");
				$({
					countNum: $t.find(".count-text").text()
				}).animate({
					countNum: n
				}, {
					duration: r,
					easing: "linear",
					step: function() {
						$t.find(".count-text").text(Math.floor(this.countNum));
					},
					complete: function() {
						$t.find(".count-text").text(this.countNum);
					}
				});
			}
			
		},{accY: 0});
	}
	
	
	//Main Slider Carousel
	if ($('.main-slider-carousel').length) {
		$('.main-slider-carousel').owlCarousel({
			animateOut: 'fadeOut',
    		animateIn: 'fadeIn',
			loop:true,
			margin:0,
			nav:true,
			autoHeight: true,
			smartSpeed: 500,
			autoplay: 6000,
			navText: [ '', '' ],
			responsive:{
				0:{
					items:1
				},
				600:{
					items:1
				},
				800:{
					items:1
				},
				1024:{
					items:1
				},
				1200:{
					items:1
				}
			}
		});    		
	}
	
	
	
	// Four Item Carousel
	if ($('.four-item-carousel').length) {
		$('.four-item-carousel').owlCarousel({
			loop:true,
			margin:0,
			nav:true,
			autoHeight: true,
			smartSpeed: 500,
			// autoplay: 5000,
			navText: [ '', '' ],
			responsive:{
				0:{
					items:1
				},
				600:{
					items:1
				},
				800:{
					items:1
				},
				1024:{
					items:2
				},
				1200:{
					items:3
				},
				1400:{
					items:4
				}
			}
		});    		
	}
	// Five Item Carousel
	if ($('.five-item-carousel').length) {
		$('.five-item-carousel').owlCarousel({
			loop:true,
			margin:0,
			nav:true,
			autoHeight: true,
			smartSpeed: 1000,
			autoplay: 5000,
			navText: [ '' ],
			responsive:{
				0:{
					items:0
				},
				600:{
					items:1
				},
				800:{
					items:2
				},
				1024:{
					items:3
				},
				1200:{
					items:4
				},
				1400:{
					items:7
				}
			}
		});    		
	}
	
	if ($('.seven-item-carousel').length) {
		$('.seven-item-carousel').owlCarousel({
			loop:true,
			margin:0,
			nav:true,
			autoHeight: true,
			smartSpeed: 500,
			// autoplay: 5000,
			navText: [ '', '' ],
			animateOut: 'slideOutDown',
			animateIn: 'flipInX',
			responsive:{
				0:{
					items:1
				},
				600:{
					items:2
				},
				800:{
					items:2
				},
				1024:{
					items:3
				},
				1200:{
					items:3
				}
			}
		});    	
	
	}

	if ($('.eight-item-carousel').length) {
		$('.eight-item-carousel').owlCarousel({
			loop:true,
			margin:0,
			nav:true,
			autoHeight: true,
			smartSpeed: 500,
			autoplay: 5000,
			navText: [ '', '' ],
			animateOut: 'slideOutDown',
			animateIn: 'flipInX',
			responsive:{
				0:{
					items:1
				},
				600:{
					items:2
				},
				800:{
					items:3
				},
				1024:{
					items:4
				},
				1200:{
					items:6
				},
				1400:{
					items:7
				}
			}
		});    	
	
	}
	
	// Sponsors Carousel
	if ($('.sponsors-carousel').length) {
		$('.sponsors-carousel').owlCarousel({
			loop:true,
			margin:30,
			nav:true,
			smartSpeed: 500,
			autoplay: 4000,
			navText: [ '<span class="fa fa-angle-left"></span>', '<span class="fa fa-angle-right"></span>' ],
			responsive:{
				0:{
					items:1
				},
				480:{
					items:2
				},
				600:{
					items:4
				},
				800:{
					items:5
				},
				1024:{
					items:5
				}
			}
		});    		
	}
	
	
	//Verticle Carousel
	if($('.verticle-carousel').length){
		$('.verticle-carousel').slick({
        dots: true,
		autoplay: true,
		loop:true,
		autoplaySpeed: 5000,
        infinite: true,
		responsive: true,
        slidesToShow: 3,
		vertical:true,
        slidesToScroll: 1
      });
	}
	
	
	//Single Vertical Carousel
	if($('.single-vertical-carousel').length){
		$('.single-vertical-carousel').slick({
        dots: true,
		autoplay: true,
		loop:true,
		autoplaySpeed: 5000,
        infinite: true,
		responsive: true,
        slidesToShow: 1,
		vertical:true,
        slidesToScroll: 1,
		prevArrow:"<div class='prev-btn'><span class='fa fa-angle-up'></span></div>",
        nextArrow:"<div class='next-btn'><span class='fa fa-angle-down'></span></div>"
      });
	}
	
	
	//LightBox / Fancybox
	if($('.lightbox-image').length) {
		$('.lightbox-image').fancybox({
			openEffect  : 'fade',
			closeEffect : 'fade',
			helpers : {
				media : {}
			}
		});
	}
	
	
	//Contact Form Validation
	if($('#contact-form').length){
		$('#contact-form').validate({
			rules: {
				firstname: {
					required: true
				},
				email: {
					required: true,
					email: true
				},
				phone: {
					required: true
				},
				subject: {
					required: true
				},
				message: {
					required: true
				}
			}
		});
	}
	
	
	// Scroll to a Specific Div
	if($('.scroll-to-target').length){
		$(".scroll-to-target").on('click', function() {
			var target = $(this).attr('data-target');
		   // animate
		   $('html, body').animate({
			   scrollTop: $(target).offset().top
			 }, 1500);
	
		});
	}
	
	
	// Elements Animation
	if($('.wow').length){
		var wow = new WOW(
		  {
			boxClass:     'wow',      // animated element css class (default is wow)
			animateClass: 'animated', // animation css class (default is animated)
			offset:       0,          // distance to the element when triggering the animation (default is 0)
			mobile:       true,       // trigger animations on mobile devices (default is true)
			live:         true       // act on asynchronously loaded content (default is true)
		  }
		);
		wow.init();
	}


/* ==========================================================================
   When document is Scrollig, do
   ========================================================================== */
	
	$(window).on('scroll', function() {
		headerStyle();
		bottomParallax();
	});
	
/* ==========================================================================
   When document is loading, do
   ========================================================================== */
	
	$(window).on('load', function() {
		handlePreloader();
		sortableMasonry();
	});	

})(window.jQuery);

// search bar
// Psuedo-code
// Create a list of keywords within an array for the user to search through for results 

let availableKeywords = 
[   "Blast Freezers",
	"-32°C Blast Freezer BFR 2200",
	"-32°C Blast Freezer BFR 2201",
	"-40°C Blast Freezer BFR 2300",
	"-40°C Blast Freezer BFR 2301",
	"-45°C Blast Freezer BFR 2400",
	"-45°C Blast Freezer BFR 2401",
	"-45°C Blast Freezer BFR 2402",
	"-45°C Blast Freezer BFR 2403",
	"Freeze Dryers",
	"Manifold Freeze Dryer MFDQ 1000",
	"Manifold Freeze Dryer MFDQ 1001",
	"Manifold Freeze Dryer MFDQ 1002",
	"Manifold Freeze Dryer MFDQ 2000",
	"Manifold Freeze Dryer MFDQ 2001",
	"Manifold Freeze Dryer MFDQ 2002",
	"Manifold Top press Freeze Dryer MTPQ 1000",
	"Manifold Top press Freeze Dryer MTPQ 1001",
	"Manifold Top press Freeze Dryer MTPQ 2000",
	"Manifold Top press Freeze Dryer MTPQ 2001",
	"Standard Freeze Dryer SFDQ 1000",
	"Standard Freeze Dryer SFDQ 1001",
	"Standard Freeze Dryer SFDQ 1002",
	"Standard Freeze Dryer SFDQ 2000",
	"Standard Freeze Dryer SFDQ 2001",
	"Standard Freeze Dryer SFDQ 2002",
	"T-type Freeze Dryer TFDQ 1000",
	"T-type Freeze Dryer TFDQ 2000",
	"Top press Freeze Dryer TPDQ 1000",
	"Top press Freeze Dryer TPDQ 1001",
	"Top press Freeze Dryer TPDQ 2000",
	"Top press Freeze Dryer TPDQ 2001",
	"Manifold Freeze Dryer MFDQ 1000","Manifold Freeze Dryer MFDQ 1001","Manifold Freeze Dryer MFDQ 1002",
	"Manifold Freeze Dryer MFDQ 2000","Manifold Freeze Dryer MFDQ 2001","Manifold Freeze Dryer MFDQ 2000",
	"Large scale freeze dryer LFQ 8100","Large scale freeze dryer LFQ 8101","Large scale freeze dryer LFQ 8102","Large scale freeze dryer LFQ 8103","Large scale freeze dryer LFQ 8104",
	"Pilot Scale Freeze Dryer PSFQ 8210","Pilot Scale Freeze Dryer PSFQ 8211","Pilot Scale Freeze Dryer PSFQ 8212",
	"Standard Pilot Freeze Dryer PSFQ 1300","Standard Pilot Freeze Dryer PSFQ 1301",
	"Standard Pilot Freeze Dryer PSFQ 2100","Standard Pilot Freeze Dryer PSFQ 3700","Standard Pilot Freeze Dryer PSFQ 4320","Standard Pilot Freeze Dryer PSFQ 5720",
	"Standard Pilot Freeze Dryer PSFQ 6480","Standard Pilot Freeze Dryer PSFQ 6481","Standard Pilot Freeze Dryer PSFQ 7640","Standard Pilot Freeze Dryer PSFQ 7641",
	"Top press Pilot Freeze Dryer PTPQ 1700","Top press Pilot Freeze Dryer PTPQ 1701","Top press Pilot Freeze Dryer PTPQ 2700","Top press Pilot Freeze Dryer PTPQ 3200",
	"Top press Pilot Freeze Dryer PTPQ 4670","Top press Pilot Freeze Dryer PTPQ 5140",
	"Medical Mobile Coolers",
	"Medical Mobile Cooler MMC 4000","Medical Mobile Cooler MMC 4001","Medical Mobile Cooler MMC 4002",
	"Portable Refrigerators",
	"Portable Refrigerator PRF 1000","Portable Refrigerator PRF 1001","Portable Refrigerator PRF 1002","Portable Refrigerator PRF 1003","Portable Refrigerator PRF 1004","Portable Refrigerator PRF 1005","Portable Refrigerator PRF 1006","Portable Refrigerator PRF 1007","Portable Refrigerator PRF 1008",
	"Solar Freezer",
	"Blood Bank Refrigerator",
	"Cooling- Incubator",
	"Island Freezer",
	"Combined Island Freezer ISF 3000","Combined Island Freezer ISF 3001","Combined Island Freezer ISF 3002",
	"Island Freezer ISF 1000","Island Freezer ISF 1001","Island Freezer ISF 1002",
	"Island Freezer ISF 2000","Island Freezer ISF 2001",
	"Pharmacy Refrigerator",
	"Solar Refrigerators ",
	"Chiller",
	"Air-cooled chiller ACQ 1000","Air-cooled chiller ACQ 1002","Air-cooled chiller ACQ 1003","Air-cooled chiller ACQ 1004","Air-cooled chiller ACQ 1005","Air-cooled chiller ACQ 1006","Air-cooled chiller ACQ 1007","Air-cooled chiller ACQ 1008","Air-cooled chiller ACQ 1009","JAir-cooled chiller ACQ 1010","Air-cooled chiller ACQ 1011","Air-cooled chiller ACQ 1012","Air-cooled chiller ACQ 1013","Air-cooled chiller ACQ 1014","Air-cooled chiller ACQ 1015",
	"Water cooled chiller WCQ 2000","Water cooled chiller WCQ 2001","Water cooled chiller WCQ 2002","Water cooled chiller WCQ 2003","Water cooled chiller WCQ 2004","Water cooled chiller WCQ 2005","Water cooled chiller WCQ 2006","Water cooled chiller WCQ 2007","Water cooled chiller WCQ 2008","Water cooled chiller WCQ 2009","Water cooled chiller WCQ 2010","Water cooled chiller WCQ 2011","Water cooled chiller WCQ 2012","Water cooled chiller WCQ 2013",
	"Combined Refrigerators and Freezers",
	"Combined Refrigerator and Freezer CRF 2000","Combined Refrigerator and Freezer CRF 2001","Combined Refrigerator and Freezer CRF 2002","Combined Refrigerator and Freezer CRF 2003",
	"Combined Refrigerator and Freezer CRF 3000","Combined Refrigerator and Freezer CRF 3001",
	"Combined Refrigerator and Freezer CRF 4000","Combined Refrigerator and Freezer CRF 4001",
	"Ice Makers",
	"Bullet Ice Maker",
	"Bullet ice maker BIQ 1000","Bullet ice maker BIQ 1001","Bullet ice maker BIQ 1002","Bullet ice maker BIQ 1003","Bullet ice maker BIQ 1004",
	"Crescent Ice Maker",
	"Crescent ice maker CIQ 1000","Crescent ice maker CIQ 1001","Crescent ice maker CIQ 1002","Crescent ice maker CIQ 1003",
	"Cube Ice Maker",
	"Cube ice maker CUBQ 1000","Cube ice maker CUBQ 1001","Cube ice maker CUBQ 1002","Cube ice maker CUBQ 1003","Cube ice maker CUBQ 1004","Cube ice maker CUBQ 1005","Cube ice maker CUBQ 1006","Cube ice maker CUBQ 1007",
	"Flake Ice Makers",
	"Flake ice maker SFLQ 1000","Flake ice maker SFLQ 1001","Flake ice maker SFLQ 1002","Flake ice maker SFLQ 1003","Flake ice maker SFLQ 1004","Flake ice maker SFLQ 1005","Flake ice maker SFLQ 1006","Flake ice maker SFLQ 1007","Flake ice maker SFLQ 1008","Flake ice maker SFLQ 1009","Flake ice maker SFLQ 1010","Flake ice maker SFLQ 1011","Flake ice maker SFLQ 1012","Flake ice maker SFLQ 1013",
	"Laboratory Freezers",
	"-105 °C Freezers",
	"-105°C Chest Cryogenic Freezer CRQ 1400","-105°C Chest Cryogenic Freezer CRQ 1401","-105°C Chest Cryogenic Freezer CRQ 1402",
	"-136 °C Freezers",
	"-136°C Chest Cryogenic Freezer CRQ 4440",
	"-152 °C Freezers",
	"-152°C Chest Cryogenic Freezer CRQ 5500","-152°C Chest Cryogenic Freezer CRQ 5501",
	"-164 °C Freezers",
	"-164°C Chest Cryogenic Freezer CRQ 6500",
	"-25 °C Freezers",
	"-25°C Chest Freezer CFQ 1001","-25°C Chest Freezer CFQ 1002","-25°C Chest Freezer CFQ 1003",
	"-25°C Chest Freezer CFQ 2000","-25°C Chest Freezer CFQ 2001","-25°C Chest Freezer CFQ 2002",
	"-25°C Upright Freezer UFQ 1001","-25°C Upright Freezer UFQ 1002","-25°C Upright Freezer UFQ 1003","-25°C Upright Freezer UFQ 1004","-25°C Upright Freezer UFQ 1005",
	"-40 °C Freezers",
	"-40°C Chest Freezer CHQ 3001","-40°C Chest Freezer CHQ 3002","-40°C Chest Freezer CHQ 3003",
	"-40°C Upright Freezer UPQ 3001","-40°C Upright Freezer UPQ 3002","-40°C Upright Freezer UPQ 3003","-40°C Upright Freezer UPQ 3004","-40°C Upright Freezer UPQ 3005","-40°C Upright Freezer UPQ 3006","-40°C Upright Freezer UPQ 3007","-40°C Upright Freezer UPQ 3001 ",
	"-86 °C Freezers",
	"Cascade System Upright",
	"-86°C Cascade System Upright Freezer CUQ 6660","-86°C Cascade System Upright Freezer CUQ 6661","-86°C Cascade System Upright Freezer CUQ 6662","-86°C Cascade System Upright Freezer CUQ 6663","-86°C Cascade System Upright Freezer CUQ 6664",
	"Dual System Upright",
	"-86°C Dual System Upright Freezer DUQ 5550","-86°C Dual System Upright Freezer DUQ 5551","-86°C Dual System Upright Freezer DUQ 5552",
	"Mixed Gas Upright",
	"-86°C Mixed Gas Upright Freezer MUQ 7770","-86°C Mixed Gas Upright Freezer MUQ 7771","-86°C Mixed Gas Upright Freezer MUQ 7772","-86°C Mixed Gas Upright Freezer MUQ 7773","-86°C Mixed Gas Upright Freezer MUQ 7774","-86°C Mixed Gas Upright Freezer MUQ 7775","-86°C Mixed Gas Upright Freezer MUQ 7776","-86°C Mixed Gas Upright Freezer MUQ 7777","-86°C Mixed Gas Upright Freezer MUQ 7778","-86°C Mixed Gas Upright Freezer MUQ 7779",
	"Plasma Freezers",
	"Blood Plasma Chest Freezer BPF 6000","Blood Plasma Upright Freezer BPF 6001 ","Blood Plasma Freezer BPF 7000 ","Blood Plasma Freezer BPF 7001",
	"Refrigerated Circulator",
	"10 L Refrigerated Circulator",
	"Refrigerated Circulator RCQ-2000","Refrigerated Circulator RCQ-2001","Refrigerated Circulator RCQ-2002","Refrigerated Circulator RCQ-2003","Refrigerated Circulator RCQ-2004","Refrigerated Circulator RCQ-2005","Refrigerated Circulator RCQ-2006","Refrigerated Circulator RCQ-2007",
	"100 L Refrigerated Circulator",
	"Refrigerated Circulator RCQ-8000","Refrigerated Circulator RCQ-8001","Refrigerated Circulator RCQ-8002","Refrigerated Circulator RCQ-8003","Refrigerated Circulator RCQ-8004",
	"20 L Refrigerated Circulator",
	"Refrigerated Circulator RCQ-3000","Refrigerated Circulator RCQ-3001","Refrigerated Circulator RCQ-3002","Refrigerated Circulator RCQ-3003","Refrigerated Circulator RCQ-3004","Refrigerated Circulator RCQ-3005",
	"30 L Refrigerated Circulator",
	"Refrigerated Circulator RCQ-4000","Refrigerated Circulator RCQ-4001","Refrigerated Circulator RCQ-4002","Refrigerated Circulator RCQ-4003","Refrigerated Circulator RCQ-4004","Refrigerated Circulator RCQ-4005",
	"40 L Refrigerated Circulator",
	"Refrigerated Circulator RCQ-5000","Refrigerated Circulator RCQ-5001","Refrigerated Circulator RCQ-5002","Refrigerated Circulator RCQ-5003","Refrigerated Circulator RCQ-5004",
	"5 L Refrigerated Circulator",
	"Refrigerated Circulator RCQ-1000","Refrigerated Circulator RCQ-1001","Refrigerated Circulator RCQ-1002","Refrigerated Circulator RCQ-1003","Refrigerated Circulator RCQ-1004","Refrigerated Circulator RCQ-1005","Refrigerated Circulator RCQ-1006","Refrigerated Circulator RCQ-1007",
	];

// Obtain variable elements from HTML of the input search class user's input "search-bar" & "results"
const inputBox = document.querySelector("#search-bar")
const resultsBox = document.querySelector(".results");

// As the user is typing, have the results automatically search the available Keywords array
inputBox.onkeyup = function() {
  let result = [];
  let input = inputBox.value;
  if(input.length) {
    result = availableKeywords.filter((keyword) =>{                                          
		return keyword.toLowerCase().includes(input.toLowerCase());
    });
//     show the function is working through console.log()
    console.log(result)
  }
//   call display of results function
  display(result);
//   removes blank results box
  if(!result.length) {
    resultsBox.innerHTML='';
  }
};

// While the user is typing and search with the .onkeyup() event, display the results on HTML
function display(result) {
  const content = result.map((regions) => {
    return `<li>${regions}</li>`
  });
  resultsBox.innerHTML = `<ul>${content.join('')}</ul>`
}





const imageElement = document.querySelector('.pimg');

// ✅ Use forward slashes and include the first image as current
const images = [
  'assets/image/product/auraskinlabqluta+b3brightingsoap.png',
  'assets/image/product/collagen10000mg4x.png',
  'assets/image/product/creamyhairmask.png',
  'assets/image/product/osufimoisturiser.png',
  'assets/image/product/fairyhoneysoap.png',
  'assets/image/product/l-gluta5berryplusdietarysupplementproduct.png',
  'assets/image/product/vittamincollagenmixplus.png',
  'assets/image/product/yanahairoil.png'
];

let currentIndex = 0;

function changeImage() {
  // Fade out
  imageElement.style.opacity = 0;

  setTimeout(() => {
    // Change to next image
    currentIndex = (currentIndex + 1) % images.length;
    imageElement.src = images[currentIndex];

    // Fade in
    imageElement.style.opacity = 1;
  }, 500);
}

// Smooth transition
imageElement.style.transition = 'opacity 0.6s ease-in-out';

// Change every 4 seconds
setInterval(changeImage, 4000);


// Add to cart description cart functionality
	


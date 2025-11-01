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
			// animateOut: 'slideOutDown',
			// animateIn: 'flipInX',
			animateOut: 'fadeOut',
    		animateIn: 'fadeIn',
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
  imageElement.style.opacity = 0;

  setTimeout(() => {
    currentIndex = (currentIndex + 1) % images.length;
    imageElement.src = images[currentIndex];
    imageElement.style.opacity = 1;
  }, 500);
}

// Smooth transition
// imageElement.style.transition = 'opacity 0.6s ease-in-out';
setInterval(changeImage, 4000);


// ----------------------------------------------------------------------------

let cart = [];

		document.querySelectorAll(".cd_btn").forEach(btn => {
		btn.addEventListener("click", () => {
			const name = btn.dataset.name;
			const price = parseFloat(btn.dataset.price);
			const image = btn.dataset.image;
			const existing = cart.find(item => item.name === name);

			// Add item to cart or update
			if (existing) {
			existing.qty += 1;
			existing.total = existing.qty * existing.price;
			} else {
			cart.push({ name, price, image, qty: 1, total: price });
			}

			updateCart();
			showToast({ name, price, image });

			// Tooltip logic (change text on click)
			const tooltipWrapper = btn.closest("[tooltip]");
			if (tooltipWrapper) {
			tooltipWrapper.setAttribute("tooltip", "Added");

			// Hold for 1 second, then reset
			setTimeout(() => {
				tooltipWrapper.setAttribute("tooltip", "Add to Cart");
			}, 1000);
			}
		});
		});

		function updateCart() {
		const cartItems = document.getElementById("cart-itemss");
		const cartCountElements = document.querySelectorAll(".cart-count");
		const cartTotal = document.getElementById("cart-total");
		cartItems.innerHTML = "";
		let total = 0;

		cart.forEach((item, index) => {
			total += item.total;
			const div = document.createElement("div");
			div.classList.add("cart-item");
			div.innerHTML = `
			<img src="${item.image}" alt="">
			<div class="cart-item-info">
			<h6>${item.name}</h6>
			<p>৳ ${item.price} × ${item.qty} = ৳ ${item.total}</p>
			<div class="qty-btn">
			<button onclick="changeQty(${index}, -1)">-</button>
			<span>${item.qty}</span>
			<button onclick="changeQty(${index}, 1)">+</button>
			<button class="removeoffpro" onclick="removeItem(${index})"></button>
			</div>
			</div>`;
			cartItems.appendChild(div);
		});

		const totalQuantity = cart.reduce((sum, item) => sum + item.qty, 0);
		cartCountElements.forEach(el => el.textContent = totalQuantity);
		cartTotal.textContent = `৳ ${total.toFixed(2)}`;
		}

		function changeQty(index, delta) {
		cart[index].qty += delta;
		if (cart[index].qty <= 0) cart.splice(index, 1);
		else cart[index].total = cart[index].qty * cart[index].price;
		updateCart();
		}

		function removeItem(index) {
		cart.splice(index, 1);
		updateCart();
		}

		function showToast({ name, price, image }) {
		const toastContainer = document.getElementById("toast-container");
		const toast = document.createElement("div");
		toast.style.cssText = `
			background:#fff;
			color:#222;
			border-radius:6px;
			box-shadow:0 2px 16px rgba(0,0,0,0.15);
			padding: 8px 12px;
			margin-bottom:14px;
			display:flex;
			align-items:center;
			min-width:220px;
			max-width:280px;
			font-size:15px;
			animation:toastIn 0.4s;
		`;
		toast.innerHTML = `
			<img src="${image}" alt="" style="width:75px;height:75px;border-radius:5px;object-fit:cover;margin-right:12px;">
			<div>
			<strong style="font-size:15px;">${name}</strong><br>
			<span style="font-size:14px;">৳ ${price}</span>
			</div>
		`;

		toastContainer.appendChild(toast);

		setTimeout(() => {
			toast.remove();
		}, 3500); // Toast hides after 3.5s
		
		document.getElementById('checkout-btn').addEventListener('click', () => {
		// Replace this placeholder action with your actual checkout logic
		alert('Proceeding to checkout...');
		// Example: window.location.href = "/checkout"; // redirect to checkout page
		});
		}

		document.getElementById('checkout-btn').addEventListener('click', function () {
		window.location.href = 'cart.html';
		});

		// ----------------------------------------------------------


		// -----------------------------------------------------scroll text

		const texts = document.querySelectorAll('.scroll-text');
		let index = 0;

		function showNextText() {
		// Hide all texts
		texts.forEach(t => {
			t.style.opacity = 0;
			t.style.animation = 'none';
		});

		// Show current text with animation
		const current = texts[index];
		current.style.opacity = 1;
		current.style.animation = 'moveLeft 20s linear forwards';

		// Move to next text
		index = (index + 1) % texts.length;

		// Repeat after animation ends
		setTimeout(showNextText, 13000);
		}

		showNextText();

		// ---------------------------------------------FAQ
        document.querySelectorAll('.faq-question').forEach(button => {
        button.addEventListener('click', () => {
            const expanded = button.getAttribute('aria-expanded') === 'true';
            button.setAttribute('aria-expanded', String(!expanded));

            const answer = document.getElementById(button.getAttribute('aria-controls'));

            if (!expanded) {
            answer.removeAttribute('hidden');
            setTimeout(() => {
                answer.classList.add('show');
            }, 10);
            } else {
            answer.classList.remove('show');
            answer.addEventListener('transitionend', () => {
                if (!answer.classList.contains('show')) {
                answer.setAttribute('hidden', '');
                }
            }, { once: true });
            }
        });

        // Keyboard accessibility: toggle on Enter or Space keypress
        button.addEventListener('keydown', e => {
            if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            button.click();
            }
        });
        });
// -----------------------------------------------cart

const cartProducts = [
  {
    id: 1,
    image: 'assets/image/product/creamyhairmask.png', // Replace with actual product image path
    name: 'Creamy Hair Mask',
    price: 275,
    quantity: 1
  },
  {
    id: 2,
    image: 'assets/image/product/osufimoisturiser.png', // Replace with actual product image path
    name: 'Osufi Brightning Firming toner',
    price: 475,
    quantity: 1
  }
];

const shippingCharge = 150;

function renderCart() {
  const cartItems = document.getElementById('cart-items');
  cartItems.innerHTML = '';
  let subtotal = 0;
  let itemCount = 0;

  cartProducts.forEach((prod, idx) => {
    const prodSubtotal = prod.price * prod.quantity;
    subtotal += prodSubtotal;
    itemCount += prod.quantity;

    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><img src="${prod.image}" alt="${prod.name}"></td>
      <td>${prod.name}</td>
      <td>৳ ${prod.price}</td>
      <td>
        <input type="number" min="1" class="qty-input" value="${prod.quantity}" onchange="updateQty(${idx}, this.value)">
      </td>
      <td>৳ ${prodSubtotal}</td>
      <td>
        <button class="action-btn" onclick="removeItem(${idx})">Remove</button>
      </td>
    `;
    cartItems.appendChild(tr);
  });

  document.getElementById('summary-items-count').innerText = itemCount;
  document.getElementById('summary-subtotal').innerText = `৳ ${subtotal}`;
  document.getElementById('summary-shipping').innerText = `৳ ${shippingCharge}`;
  document.getElementById('summary-total').innerText = `৳ ${subtotal + shippingCharge}`;
}

function updateQty(idx, value) {
  cartProducts[idx].quantity = Math.max(1, Number(value));
  renderCart();
}

function removeItem(idx) {
  cartProducts.splice(idx, 1);
  renderCart();
}

// Initial render
document.addEventListener('DOMContentLoaded', renderCart);

// Proceed to checkout button behavior--------------shopping cart:
document.getElementById('checkout-btn').onclick = function() {
  alert("Proceeding to checkout...");
};



// ---------------------------------------------------checkout

// Sample order data simulating what you might carry from a cart
const orderItems = [
  { name: "Creamy Hair Mask", qty: 1, price: 275 },
  { name: "Osufi Brightning Firming Toner", qty: 1, price: 475 }
];

const checkshippingCharge = 150;

function formatCurrency(amount) {
  return `৳ ${amount.toFixed(2)}`;
}

function renderOrderSummary() {
  const tbody = document.getElementById('order-summary-body');
  tbody.innerHTML = ''; // Clear previous

  let subtotal = 0;
  orderItems.forEach(item => {
    const subtotalItem = item.qty * item.price;
    subtotal += subtotalItem;
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${item.name}</td>
      <td>${item.qty}</td>
      <td>${formatCurrency(item.price)}</td>
      <td>${formatCurrency(subtotalItem)}</td>
    `;
    tbody.appendChild(row);
  });

  const orderTotalEl = document.getElementById('order-total');
  const shippingEl = document.getElementById('shipping-charge');

  shippingEl.textContent = formatCurrency(checkshippingCharge);
  orderTotalEl.textContent = formatCurrency(subtotal + checkshippingCharge);
}

function handlePaymentOptions() {
  const cardDetailsSection = document.getElementById('card-details');
  const paymentRadioButtons = document.querySelectorAll('input[name="payment"]');

  paymentRadioButtons.forEach(rb => {
    rb.addEventListener('change', () => {
      if (rb.value === 'card') {
        cardDetailsSection.style.display = 'block';
        setCardInputsRequired(true);
      } else {
        cardDetailsSection.style.display = 'none';
        setCardInputsRequired(false);
      }
    });
  });
}

function setCardInputsRequired(required) {
  document.getElementById('cardnumber').required = required;
  document.getElementById('expiry').required = required;
  document.getElementById('cvv').required = required;
}

function setupFormSubmission() {
  const form = document.getElementById('checkout-form');
  form.addEventListener('submit', event => {
    event.preventDefault();

    // Validate or process payment here

    alert('Thank you for your order! Your skincare products will be shipped soon.');
    form.reset();
  });
}

document.addEventListener('DOMContentLoaded', () => {
  renderOrderSummary();
  handlePaymentOptions();
  setupFormSubmission();
});

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('ptc-btn')?.addEventListener('click', () => {
    window.location.href = 'checkout.html';
  });

  document.getElementById('shop-again-btn')?.addEventListener('click', () => {
    window.location.href = 'index.html';
  });

  document.getElementById('back-to-shop-btn')?.addEventListener('click', () =>{
	window.location.href = 'index.html';
  })
});


// ------------------------------------------------enter otp

const otpForm = document.getElementById('otp-form');
const messageDiv = document.createElement('div');
messageDiv.id = 'otp-message';
messageDiv.style.marginTop = '12px';
messageDiv.style.fontWeight = '600';
messageDiv.style.textAlign = 'center';

otpForm.appendChild(messageDiv);

otpForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const otpInput = document.getElementById('otp').value.trim();

  if (!/^\d{6}$/.test(otpInput)) {
    messageDiv.textContent = 'Please enter a valid 6-digit OTP.';
    messageDiv.style.color = 'red';
    return;
  }

  // Simulate OTP Verification success
  messageDiv.textContent = 'OTP Verified successfully! Proceeding...';
  messageDiv.style.color = 'green';

  // Further action or redirect goes here
});

document.getElementById('resend-btn').addEventListener('click', function() {
  messageDiv.textContent = 'A new OTP has been sent to your registered contact.';
  messageDiv.style.color = 'blue';

  // Add actual resend OTP logic here
});

window.addEventListener('load', () => {
  document.getElementById('otp').value = '';
  const messageDiv = document.getElementById('otp-message');
  if (messageDiv) {
    messageDiv.textContent = '';
  }
});


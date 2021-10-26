$( document ).ready(function($) {
	var bwidth=$("body").width();
	if($("#index-slider .sp-slide").length > 0){
	$( '#index-slider' ).sliderPro({
		width: 1920,
		height: 600,
		arrows: false,
		buttons: false,
		waitForLayers: true,
		slideDistance:0,
		thumbnailPointer: true,
		autoplay: true,
		autoScaleLayers: false,
		breakpoints: {
			800:{
				thumbnailWidth: 120,
				thumbnailHeight: 50,
				buttons: false,
			}
		}
	});
	}

	$(".services  .owl-carousel").owlCarousel({
       
        lazyLoad : true,
        navigation : true,
		autoPlay : true,
		buttons: false,
		arrows: false, 
		items :5,
		responsiveClass:true,
    responsive:{
        0:{
            items:1,
           
        },
        600:{
            items:2,
      
        },
        1000:{
            items:5,
 
        }
    }  
      });

if($(".kecheng .owl-carousel .item").length > 0){
	$(".kecheng  .owl-carousel").owlCarousel({
        items :3,
        lazyLoad : true,
        navigation : true,
		autoPlay : true,
		buttons: false,
		arrows: false,
		margin:20,
		responsiveClass:true,
    responsive:{
        0:{
            items:2,
           
        },
        600:{
            items:2,
      
        },
        1000:{
            items:3,
 
        }
    }  

	  });
	}
	  if($(".video-tj .owl-carousel .item").length > 0){
		$(".video-tj  .owl-carousel").owlCarousel({
			items :5,
			lazyLoad : true,
			navigation : true,
			autoPlay : true,
			buttons: false,
			arrows: false,
			margin:20,
			itemsDesktop : [1530,5],
			itemsDesktopSmall : [1360,5],
			itemsTablet : [1024,5],
			itemsTablet : [800,3],
			itemsTabletSmall : false,
			itemsMobile : [470,2],
		  });
		}
	  var scasep=$(".shop-spros").width()*400/534;
$(".case-list img").css({"height" : scasep/3});
if(bwidth >= 800){
	var scasep=$(".shop-spros").width()*400/534;
$(".case-list img").css({"height" : scasep/2});
	}
	if(bwidth >= 470){
	var scasep=$(".shop-spros").width()*400/534;
$(".case-list img").css({"height" : scasep/1});
	}

if($(".shop .owl-carousel .item").length > 0){
	$(".shop  .owl-carousel").owlCarousel({
        items :3,
        lazyLoad : true,
        navigation : true,
		autoPlay : true,
		buttons: false,
		arrows: false,
		itemsDesktop : [1530,3],
		itemsDesktopSmall : [1360,3],
		itemsTablet : [1024,3],
		itemsTablet : [800,2],
		itemsTabletSmall : false,
		itemsMobile : [470,1],
	  });
	}
	  var scasep=$(".shop-spros").width()*400/534;
$(".case-list img").css({"height" : scasep/3});
if(bwidth >= 800){
	var scasep=$(".shop-spros").width()*400/534;
$(".case-list img").css({"height" : scasep/2});
	}
	if(bwidth >= 470){
	var scasep=$(".shop-spros").width()*400/534;
$(".case-list img").css({"height" : scasep/1});
	}

var casep=$(".case-list").width()*400/534;
$(".case-list img").css({"height" : casep});
var shopp=$(".shop-pic").width();
$(".shop-pic img").css({"height" : shopp});
var servep=$(".service-pic").width();
$(".service-pic").css({"height" : servep / 0.6});
});
$(window).resize(function(){
	var casep=$(".case-list").width()*400/534;
$(".case-list img").css({"height" : casep});
var shopp=$(".shop-pic").width();
$(".shop-pic img").css({"height" : shopp});
var servep=$(".service-pic").width();
$(".service-pic").css({"height" : servep / 0.6});
	});
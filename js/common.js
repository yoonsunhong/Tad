$(document).ready(function (){
	var w = $(window).width();
	var areaWid = $(".area").width();
	var h = $(window).height();
	var tabCntWid = $("#tab1 ul li ul li").width();

	if ( w <= 600  ) {
		$(".area").width(w);
		$("#gnb, .opa").css({height:h});
	} if ( w >= 1200) {
		$(".area").width(1200);
		$("#gnb, .opa").css({height:"inherit"});
	} if (  w > 600 && w < 1200 ) {
		$(".area").width(w);
		$("#gnb, .opa").css({height:"inherit"});
	}
	
	$("#slider1, #slider1 .visual, #slider1 .visual > li > a, #mainHeader").height( $("#slider1 .visual > li").css('paddingTop') );

	$(window).on('resize',function (){		
		var w = $(window).width();
		var areaWid = $(".area").width();
		var h = $(window).height();
		var tabCntWid = $("#tab1 ul li ul li").width();

		if ( w <= 600  ) {
			$(".area").width(w);
			$("#gnb, .opa").css({height:h});
		} if ( w >= 1200) {
			$(".area").width(1200);
			$("#gnb, .opa").css({height:"inherit"});
		} if (  w > 600 && w < 1200 ) {
			$(".area").width(w);
			$("#gnb, .opa").css({height:"inherit"});
		}
		
		$("#slider1, #slider1 .visual, #slider1 .visual > li > a, #mainHeader").height( $("#slider1 .visual > li").css('paddingTop') );
	});
	/* 스크롤시 헤더 스타일 변경 */
	$(window).scroll(function(){
		var scrTop = $(document).scrollTop();
		if ( scrTop > 0 ) $(".main_top, .sub_top").addClass("scr_head");
		if ( scrTop == 0 ) $(".main_top, .sub_top").removeClass("scr_head");
	});	

	/* 스크롤시 헤더 스타일 변경 */
	/*
	1) css로 제어
	$(window).scroll(function(){
		var scrTop = $(document).scrollTop();
		console.log(scrTop);
		var $mainTop = $(".main_top");
		var $subTop = $(".sub_top");
		if ( scrTop > 0 ) {
			$mainTop.addClass("scr_head");
			$subTop.addClass("scr_head");
		} if ( scrTop == 0 ) {
			$mainTop.removeClass("scr_head");
			$subTop.removeClass("scr_head");
		}
	});			

	2) animate로 제어
	$(window).scroll(function(){
		var scrTop = $(document).scrollTop();
		var $mainTop = $(".main_top");
		var $subTop = $(".sub_top");
		if ( scrTop == 0 ) {
			$mainTop.animate({height:81});
			$mainTop.children().animate({paddingTop:'35px'}, 400, "easeOutCirc");
			$subTop.removeClass("scr_head");
		} else {
			$mainTop.animate({height:64});
			$mainTop.children().animate({paddingTop:'16px'}, 400, "easeInCirc");
			$subTop.addClass("scr_head");			
		}
	});		
 	*/

	/* 슬라이더 */
	function slider () {
		var $slider = $(".slider")
		var $visual = $(".visual > li");
		var $paging = $(".paging > li");
		var nowNum = 0;		
		var nextNum;			
		var playNext;				
		var total = $(".visual > li").length;

		// 1) paging 버튼
		$paging.children("a").on("click",function  () {
			nextNum = $(this).parent().index();
			clearInterval(playNext);
			$slider.find(".play_stop .play").addClass("on").siblings().removeClass("on");

			if ( nowNum==nextNum ) return false;

			$(this).parent().addClass("on").siblings().removeClass("on");

			if ( nowNum>nextNum ) {		// 이전 버튼
				$visual.eq(nowNum).css("left",0).stop().animate({left:"100%"});
				$visual.eq(nextNum).css("left","-100%").stop().animate({left:0});	
			} else {		// 다음 버튼
				$visual.eq(nowNum).css("left",0).stop().animate({left:"-100%"});
				$visual.eq(nextNum).css("left","100%").stop().animate({left:0});		
			}
			nowNum=nextNum;

			return false;
		});
		// 2) 자동실행
		function timer () {
			playNext = setInterval(function  () {
				nextNum = nowNum+1;
				if ( nextNum==total ) nextNum=0;

				$paging.eq(nextNum).addClass("on").siblings().removeClass("on");

				$visual.eq(nowNum).css("left",0).stop().animate({left:"-100%"});
				$visual.eq(nextNum).css("left","100%").stop().animate({left:0});

				nowNum++;
				if ( nowNum==total ) nowNum=0;
			}, 6000)
		}
		timer();

		// 3) 이전, 다음 버튼을 클릭하는 경우
		$slider.find(".prev_next a").on("click",function  () {
			var num = $(this).index();
			console.log(num);

			if ( num==0 ) { // 이전버튼
				nextNum = nowNum-1;
				if ( nextNum==-1 ) nextNum=total-1;
			} else {	// 다음버튼
				nextNum = nowNum+1;
				if ( nextNum==total ) nextNum=0;
			}
			$paging.eq(nextNum).children().click();

			return false;
		});

		// 4) play, stop 버튼을 클릭하는 경우
		$slider.find(".play_stop a").on("click",function  () {
			var num = $(this).index();
			console.log(num);

			if ( num==0 )		timer();				// play 버튼을 누른 경우
			else clearInterval(playNext);		// stop 버튼을 누른 경우

			$(this).removeClass("on").siblings().addClass("on").focus();
			return false;
		});
	}
	slider();

	/* 탭 */
	$(".tab > ul > li > .tab_btn").on("click focus",function  () {
		$(this).closest(".tab").find("> ul > li").removeClass("on").children(".tab_btn").siblings().hide();		//초기화
		$(this).siblings().show().parent().addClass("on");		//재설정
	});

	/* 팝업 */
	function tabPopup() {
		$("#tab1 ul li ul li a").on("click",function  () {
			$("#popup, #popBg").show();			// 아래에 투명 배경 깔기
			$(".head_top").css({"z-index":1});

			// 팝업 위치
			var popTop = ($(window).height() - $("#popup").height()) / 2 + $(window).scrollTop();
			$("#popup").css({top:popTop});

			$(window).on('resize',function (){		
				var popTop = ($(window).height() - $("#popup").height()) / 2 + $(window).scrollTop();
				$("#popup").css({top:popTop});
			})
			
			// 내용 받기
			var tabImg = $(this).find("img").attr('src');
			var tabImgArr = tabImg.split(".jpg");
			var popImg = tabImgArr[0].replace("_thmb","")+".jpg";
			var tabAlt = $(this).find("img").attr('alt');
			var tabTit = $(this).find("h3").text();
			var tabCnt = $(this).find("p").text();

			// 내용 팝업에 뿌리기
			var $popWrap = $("#popup");
			$popWrap.find("img").attr({'src':popImg, 'alt':tabAlt}).next().find("h3").text(tabTit).next().text(tabCnt);

			return false;
		});

		$("#popup .close").on("click focus",function  () {
			$("#popup, #popBg").hide();
			$(".head_top").css({"z-index":3});
			return false;
		});
	}
	tabPopup();

	/*==========--- 모바일 ---==========*/	
	$(".menu_ico").on("click",function() {
		$("#gnb").animate({left:0}, 400);
		$("#subHeader .sub_top.scr_head").addClass("on");
		$(".opa").animate({opacity:0.7}, 400).show();
		$(".head_top").css({"z-index":3});
		$(this).hide();

		$(window).on('resize',function (){		
			var w = $(window).width();

			if ( w > 600 ) {
				$("#gnb").animate({right:0}, 1000, "easeOutQuart").css('left','');
				$(".opa").hide();
			}
		});

	});

	$("#gnb .close_btn").on("click",function  () {
		$("#gnb").animate({left:"-200px"}, 400);
		$("#subHeader .sub_top.scr_head").removeClass("on");
		$(".opa").animate({opacity:0}, 400).hide();
		$(".head_top").css({"z-index":3});
		$(".menu_ico").show();
		return false;
	});


});
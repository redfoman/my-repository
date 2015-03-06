$(function() {
  $('#ArtGallery_Slider').flexslider({namespace: "ArtGal-", animation:"slide",slideshow: false,slideshowSpeed: 4000,controlNav: false,animationLoop: true});
  $('#PlaGallery_Slider').flexslider({namespace: "ArtGal-", animation:"slide",slideshow: false,slideshowSpeed: 4000,controlNav: false,animationLoop: true, start:function(slider){ 
  	setDefSlideHeight();//
  }, after:  function(slider) { 
	  var cur_slide = slider.currentSlide;
	  if (cur_slide == 0) {
		  $(".ArtGal-prev").css("display","none");
		  $(".ArtGal-next").removeClass("subslide");
		  $(".camIcon").removeClass("subslide");
	  } else {
		  $(".ArtGal-prev").css("display","block");
		  $(".ArtGal-next").addClass("subslide");
		  $(".camIcon").addClass("subslide");
	  }
  }});
  
  $(".req").change(function(){
	if (ValidateStringLength($(this).val())) {
		$(this).css("border-color","#a3afbb");
	}
  });
  $('#main_nav').sidr({
	name: 'sidr-right',
	side: 'right',
	speed: 500
  });
  $('.list_box').bind("click",function(){
	var itemLink = $(this).data("link");
	if (itemLink) {
		location.href = itemLink;
	}
  }).bind('touchstart', function(e) {
	$(this).addClass('list_box_hover');  
  }).bind('touchend',function(e){
	$(this).removeClass('list_box_hover');  
  });
  
  $(".mm_btn").click(function(event){
	  event.preventDefault();
	  $.sidr('close', 'sidr-right');
	  var goUrl = $(this).attr("href");
	  setTimeout(function(){location.href = goUrl;},1000);
  });
  $(".bl_head").click(function(event){
	  var relBloName = $("#"+$(this).data("relation")+"_bl");
	  if (relBloName.length) {
		if (relBloName.is(":hidden")) {
			$("body").animate({scrollTop: relBloName.parent(".bot_bl").offset().top }, 400);
			relBloName.slideDown(1000);
			$(this).children("span").removeClass("w_arr_r").addClass("w_arr_d");
		} else {
			relBloName.slideUp("fast");
			$(this).children("span").removeClass("w_arr_d").addClass("w_arr_r");
		}
	  }
  });
  //////////////////////
  $("#fb_signin_btn").bind("click",function(){
	 FB.login(function(response) {
		checkLoginState();
	 });
  });
  //////SUBS////////////
  $(".SignInBtn").bind("click",function(event){
	  event.preventDefault();
	  $.sidr('close', 'sidr-right');						
	  ShowSPopUpPage("SubSignInBlock");
  });
  $("#SignInForm").submit(function(event) {
		$("#sin_errbox").text(errMsg).slideUp("fast");
		var valid_data = true;
		var errMsg = "";
		$("#SignInForm .req").each(function() {
			if ((!ValidateStringLength($(this).val()))) {
				$(this).css("border-color","#ff0000");
				valid_data = false;
				errMsg = 'Παρακαλώ εισάγετε όλα τα πεδία';
			}
		});
		if (valid_data) {
			return true;			
		} else {
			if (errMsg != "") { $("#sin_errbox").text(errMsg).slideDown("fast"); }
		}
		event.preventDefault();						
  });  
  //sign up
  $(".SignUpBtn").bind("click",function(){
	  ShowSPopUpPage("SubSignUpBlock");
  });
  $("#SignUpForm").submit(function(event) {
		$("#sup_errbox").text(errMsg).slideUp("fast");
		$(".lab_error").css("display","none");
		var valid_data = true;
		var errMsg = "";
		$("#SignUpForm .req").each(function() {
			if ((!ValidateStringLength($(this).val()))) {
				$(this).css("border-color","#ff0000");
				valid_data = false;
				errMsg = 'Παρακαλώ εισάγετε όλα τα πεδία';
			}
		});
		if (valid_data) {
			emailField = $("#SignUpForm #subemail");
			var email = emailField.val();
			if ((email.indexOf('@') == -1) || (email.indexOf('.') == -1)) {
				emailField.css("border-color","#ff0000").after("<span class=\"lab_error\">Μη έγκυρος τύπος email</span>");
				return false;
			} else if (!SignUpCheckEmail(email)) {
				emailField.css("border-color","#ff0000").after("<span class=\"lab_error\">Το email υπάρχει ήδη</span>");
				return false;
			}
			return true;			
		} else {
			if (errMsg != "") {
				$("#sup_errbox").text(errMsg).slideDown("fast");
			}
		}
		event.preventDefault();						
	});  
  
  $("#pla_checkin_btn").click(function(event){
	  //ShowPopUpLoading('Y');
	  LoadDPopUpPage("mobile/mod_tools/places_check_in/index.php?plaid="+$(this).attr("data-id"));
	  event.preventDefault();						
   });
  
  
  $("#latestWizsLoc").click(function(event){
	  //ShowPopUpLoading('Y');
	  LoadDPopUpPage("mobile/pages/section_where_is_everybody/show_wizers_loc.php");
	  event.preventDefault();						
   });

  $("#pla_viewLoc_btn").bind("click",function(){
	  var lat = $(this).data("latitude");
	  var lng = $(this).data("longitude");
	  //show window and after the map
	  $("#s_body").css("display","block");
	  $(".PopUpSBlock").css("display","none");//New
	  $("#ShowMapBlock").css("display","block");//New
	  
	  $("#popup").animate({
		  'left': '0'
	  }, 500, function(){
		  var myLatlng = new google.maps.LatLng(lat,lng);
		  var mapOptions = {
			zoom: 16,
			center: myLatlng
		  }
		  var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
		  var marker = new google.maps.Marker({
			  position: myLatlng,
			  map: map
		  });
		  setTimeout(function(){google.maps.event.trigger(map, 'resize');},500);
	  });			
  });


  $(".qstListBlock").on("click",'.QueAnsBtn',function(event){
	  event.preventDefault();						
	  var act = $(this).attr("data-action");
	  var qstid = $(this).attr("data-qstid");
	  LoadDPopUpPage("mobile/mod_tools/questions_answers/index.php?act="+act+"&qstid="+qstid);
  });
  
  //////QUESTIONS///////
  $('.pop_body').on("click",'.closePopUp', function(event) {
	  ClosePopUp();
	  event.preventDefault();						
  });
  
  $(".geobtn").click(function(event){
	  event.preventDefault();
	  var CurHref = $(this).attr("href");
	  if (Modernizr.geolocation) {
		 navigator.geolocation.getCurrentPosition(function(position){
			ShowPlacesNearMe(position, CurHref); 
		 });
	  } else {
		  alert("no native geolocation support available :(");
	  }
  });
  
  /////////////////////
  $("#FBlogOutBtn").click(function(event){
	  event.preventDefault();
	  var $LOutbtn = $(this);
	  FB.logout(function(){
		  location.replace($LOutbtn.attr("href"));
	  });
  });
  
  //////SUB//////////
  $(".subUpImgBtn").click(function(event){
	  //ShowPopUpLoading('N');
	  LoadDPopUpPage("mobile/mod_tools/sub_photos/index.php?ptype="+$(this).attr("data-ptype"));
   });
  
  $(".showQstAns").click(function(event){
	  var qstid = $(this).data("qstid");
	  var qst_ansblo = $("#qst_"+qstid+"_ans");
	  if (qst_ansblo.is(":hidden")) {
		//$(this).addClass("activeAns");
		qst_ansblo.slideDown("fast");
	  } else {
		qst_ansblo.slideUp("fast");
		//$(this).removeClass("activeAns");
	  }
  });
  
  $(".qstansfield").maxlength({max: 100});
  $(".subqstans").click(function(event){
	  var qstid = $(this).data("qstid");
	  var ans_box = $("#qstans_"+qstid);
	  var answer = ans_box.val();
	  if (!ValidateStringLength(answer)) {
		  alert("Εισάγετε το σχόλιο σας");
		  $("#qstans_"+qstid).css("border-color","#ff0000");
	  } else {
		  jQuery.ajax({ 
			  type: "POST",
			  url: "mobile/pages/section_questions/submit_answer.php",
			  data: "qstid="+qstid+"&qstanswer="+answer,
			  success: function(res){
				  ans_box.val("");
				  if (res != "ERR") {
					 $(res+"").appendTo("#"+qstid+"_answers").show("fast");
					 /*
					 $('body').animate({scrollTop:($("#qst_"+qstid+"_box").first().offset().top) }, 'slow', function(){
					 	$(res+"").prependTo("#"+qstid+"_answers").show("fast");
					 });
					 */
				  } else {
					 alert("Σφάλμα στην αποστολή του σχολίου σας");  
				  }
			  }
		  });
	  }
	  event.preventDefault();
  });
  //////EVENTS/////////
  $('#events_list').on("click",'.eve_list_box', function(event) {
	var itemLink = $(this).data("link");
	if (itemLink) {
		location.href = itemLink;
	}
  });
  
  $(".catfil").click(function(event){
	  var qcat = $(this).attr("data-category");
	  var mnum = $(".eve_selmon").attr("data-list_num");
	  $.bbq.pushState({ modpage:'3', mnum: mnum, qcat:qcat });
	  $('body').animate({scrollTop:($('.EveCalendar').first().offset().top) }, 'slow');
	  event.preventDefault();						
  });	
  $("#calmon_next").click(function(event){
	  var cur_mnum = $(".eve_selmon").attr("data-list_num");
	  var mnum = parseInt(cur_mnum,10)+1;
	  $.bbq.pushState({ modpage:'3', mnum: mnum },2);//just remove ,2 if you want to update with set params
	  $('body').animate({scrollTop:($('.EveCalendar').first().offset().top) }, 'slow');
	  event.preventDefault();
  });
  $("#calmon_prev").click(function(event){
	  var cur_mnum = $(".eve_selmon").attr("data-list_num");
	  var mnum = parseInt(cur_mnum,10)-1;
	  $.bbq.pushState({ modpage:'3', mnum: mnum},2);
	  $('body').animate({scrollTop:($('.EveCalendar').first().offset().top) }, 'slow');
	  event.preventDefault();
  });
  $('#month_events').on("click",'.day_events', function(event) {
	  var sdate = $(this).attr("data-eveday");
	  var mnum = $(".eve_selmon").attr("data-list_num");
	  $(".day_events").removeClass("day_selected");
	  $(this).addClass("day_selected");
	  $.bbq.pushState({ modpage:'3.1', mnum: mnum, sdate:sdate});
	  event.preventDefault();
  });

  $(window).bind('hashchange', function(e){ 
	var queryString = $.param.fragment();
	var modpage = $.bbq.getState("modpage");
	if (queryString != "") {
	  if (modpage.substr(0,1) == '3') {
		var mnum = $.bbq.getState("mnum");
		var totalMum = $(".cal_months").children("ul").children("li").length;
		if ((mnum > totalMum)||(!isInteger(mnum))) { mnum = (totalMum-1); }
		$(".cal_months").children("ul").children("li").css("display","none").removeClass("eve_selmon");
		$("#calMont_"+mnum).css("display","block").addClass("eve_selmon");
		if (mnum == '0') { $("#calmon_prev").addClass("hidden"); } else { $("#calmon_prev").removeClass("hidden"); }
		if (mnum == (totalMum-1)) { $("#calmon_next").addClass("hidden"); } else { $("#calmon_next").removeClass("hidden"); }
		
		var qdate = $("#calMont_"+mnum).attr("data-date");
		if ($.bbq.getState("sdate")) { var qdate = $.bbq.getState("sdate"); }//
		var upQryString = "qdate="+qdate;
		
		var qcat = $.bbq.getState("qcat");
	    $(".catfil").removeClass("selected");
		if (qcat) { 
			upQryString = upQryString + "&qcat="+qcat; 
			$("#catfil_"+qcat).addClass("selected"); 
		}
		//update list
		if (modpage == '3') {
		  UpdateEventsCalendar(upQryString);
		  UpdateListCalendar(upQryString);
		} else if (modpage == '3.1') {
		  $('body').animate({scrollTop:($('.EventsList').first().offset().top) }, 'slow');
		  UpdateListCalendar(upQryString);
		} else if (modpage == '3.2') {
		  var listExtraQryStr = "";
		  if ($.bbq.getState("sevent")) { 
		  	listExtraQryStr = "&sevent="+$.bbq.getState("sevent"); 
		  }			  	
		  UpdateEventsCalendar(upQryString);//new addition
		  UpdateListCalendar(upQryString+listExtraQryStr);
		}
	  }
	}
  });
  
  //search page
  $("#kword").on("keyup",function(){
  	if ($(this).val() != "") {
		$("#skeywords").hide();
	} else {
		$("#skeywords").show();
	}
  });
  $("#SearchForm").submit(function(event) {
	  var valid_data = true;
	  var reqFields = "";
	  $("#SearchForm .req").each(function() {
		  if ((!ValidateStringLength($(this).val()))) {
			  $(this).css("border-color","#ff0000");
			  valid_data = false;
		  }
	  });
	  if (!valid_data) {
		  alert("Εισάγετε το κέιμενο αναζήτησης");
	  } else {
		  var filterParams = "mobile.php?modid=10&contains="+$("#kword").val();
		  location.href = filterParams;
		  
	  }
	  event.preventDefault();						
  });  

  $("#SuggestUsForm").submit(function(event) {
		var valid_data = true;
		var errMsg = "";
		$("#SuggestUsForm .req").each(function() {
			if ((!ValidateStringLength($(this).val()))) {
				$(this).css("border-color","#ff0000");
				valid_data = false;
				errMsg = 'Παρακαλώ εισάγετε όλα τα πεδία';
			}
		});
		if (valid_data) {
			$("#sug_errbox").slideUp("fast");
			$("#actmsg").text("Περιμένετε...").removeClass("hidden");
			var str_params = $(this).serialize();
			
			jQuery.ajax({ 
				type: "POST",
				url: "modules/ws_mod_kat_01/pages/section_bewizer/blocks/suggest_form/send_suggestion.php",
				data: str_params,
				success: function(res){
					if (res == "OK") {	
						$("#SuggestUsForm").slideUp("fast");
						$("#actmsg").text("H αποστολή ολόκληρώθηκε με επιτυχία. Σας ευχαριστούμε.")
					} else {
						$("#actmsg").text("H αποστολή απέτυχε.");	
					}
				}
			});
			//return true;			
		} else {
			if (errMsg != "") {
				$("#sug_errbox").text(errMsg).slideDown("fast");
			}
		}
		event.preventDefault();						
  });  
  
  $(window).trigger('hashchange'); 
  $(window).bind('orientationchange', function(event) { setDefSlideHeight(); });

});

$(document).keyup(function(e) {
  if (e.keyCode == 27) { 
	  ClosePopUp();	
  }	
});


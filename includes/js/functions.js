function trim(str, chars) {
	return ltrim(rtrim(str, chars), chars);
}
 
function ltrim(str, chars) {
	chars = chars || "\\s";
	return str.replace(new RegExp("^[" + chars + "]+", "g"), "");
}
 
function rtrim(str, chars) {
	chars = chars || "\\s";
	return str.replace(new RegExp("[" + chars + "]+$", "g"), "");
}

function ValidateStringSpecialChars(theString) {
	var iChars = "#$^=[]\\\'/{}|\"<>";
	for (var i = 0; i<theString.length; i++) {
	  if (iChars.indexOf(theString.charAt(i)) != -1) {
		return false;
	  }
    }
	return true;
}

function ValidateStringSpecialCharsAndNums(theString) {
	var iChars = "#$^=[]\\\'/{}|\"<>0123456789";
	for (var i = 0; i<theString.length; i++) {
	  if (iChars.indexOf(theString.charAt(i)) != -1) {
		return false;
	  }
    }
	return true;
}

function ValidateStringLength(theString) {
	var theTrimString = trim(theString);
	if (theTrimString.length == '0') {
		return false;	
	} else {
		return true;
	}	
}

function isInteger(s) {
	if (s != '') {
	  var i;
	  for (i = 0; i < s.length; i++){   
		  // Check that current character is number.
		  var c = s.charAt(i);
		  if (((c < "0") || (c > "9"))) return false;
	  }
	  // All characters are numbers.
	  return true;
	}
	return false;
}

function UpdateEventsCalendar(queryString) {
	$("#load_box").css("display","block");
	jQuery.ajax({ 
		type: "GET",
		url: "mobile/pages/section_events/blocks/calendar/up_events.php",
		data: "utoken="+$("#userToken").val()+"&"+queryString,
		success: function(res){
			$("#month_events").html(res);
		}
	});
}

function UpdateListCalendar(queryString) {
	$("#list_load_box").css("display","block");
	jQuery.ajax({ 
		type: "GET",
		url: "mobile/pages/section_events/update_list.php",
		data: queryString,
		success: function(res){
			$("#events_list").html(res);
		}
	});
}

///////////////// POP UP WINDOW /////
function ShowPopUpLoading(showWait) {
  var popUpEl = $("#popup");
  if (popUpEl.css("position") == "absolute") {
		popUpEl.css("top",$(document).scrollTop());	
  }
  popUpEl.css("display","block");
}
function ClosePopUp() {
  $("#popup").animate({
	  'left': '100%'
  }, 250, function(){
	$(".pop_body").css("display","none");
	$("#d_body").html('<p class="wait_msg">Loading...</p>');
	$("#map-canvas").empty();
  });			
}
function LoadDPopUpPage(PagePath) {
  if (PagePath != "") {
	$("#d_body").css("display","block");
	$("#popup").animate({
		'left': '0'
	}, 500, function(){
		$("#d_body").load(PagePath, function(response, status, xres) {
			if (status == "error") { 
			  alert("Error loading page");
			  window.location.replace(window.location.href);
			} else {
				setTimeout(function(){
					$("#plaCheckInIF").contentWindow.focus();				
				}, 100);
			}
		});
	});			
  }
}
function ShowSPopUpPage(BlockId) {
	$("#s_body").css("display","block");
	$(".PopUpSBlock").css("display","none");//hide all static blocks
	$("#"+BlockId).css("display","block");//display selected static block
	
	$("#popup").animate({
		'left': '0'
	}, 500, function(){
		//?
	});			
}
///////////////////////////////////
function SignUpCheckEmail(theValue) {
    var cdate = new Date();
	var retVal = false;
	jQuery.ajax({ 
		type: "POST",
        async: false,
        cache: false,
		url: "modules/ws_mod_kat_01/subscribers/sign_up/check_email.php",
		data: "utoken="+$("#userToken").val()+"&cemail="+theValue+"&d="+cdate.getMilliseconds(),
		success: function(res){
			if (res == "OK") {
				retVal=true;
			}
		}
	});
	return retVal;
}

function SubAccountNotFound() {
	ShowSPopUpPage("SubSignInBlock");
}
////////////////////////////////////
function ShowPlacesNearMe(position, curHref) {
  var latitude = position.coords.latitude;
  var longitude = position.coords.longitude;
  window.location.href = curHref+"&lat="+latitude+"&lng="+longitude;
}
/////////////////////////////////////////
function LoadMoreSubCom() {
	var navBtn = $("#subMoreComBtn");
	var curPageNum = parseInt(navBtn.attr("data-pagenum"),10);
	jQuery.ajax({ 
		type: "GET",
		url: "mobile/pages/section_bewizer/blocks/sub_comments/get_records.php",
		data: "pagenum="+(curPageNum+1),
		success: function(res){
			var resAr = res.split("|");
			if (resAr[0] == 'N') {
				navBtn.addClass("hidden");
			} else {
				navBtn.attr("data-pagenum",(curPageNum+1)+"");
			}
			$("#subcom_list").append(resAr[1]);
		}
	});
}

function LoadMoreSubQst() {
	var navBtn = $("#subMoreQstBtn");
	var curPageNum = parseInt(navBtn.attr("data-pagenum"),10);
	jQuery.ajax({ 
		type: "GET",
		url: "mobile/pages/section_bewizer/blocks/sub_questions/get_records.php",
		data: "pagenum="+(curPageNum+1),
		success: function(res){
			var resAr = res.split("|");
			if (resAr[0] == 'N') {
				navBtn.addClass("hidden");
			} else {
				navBtn.attr("data-pagenum",(curPageNum+1)+"");
			}
			$("#subqst_list").append(resAr[1]);
		}
	});
}

function UpdateSubPhotos(AssetId, AssetSrc) {
	ClosePopUp();
	$("#"+AssetId).attr("src",AssetSrc);
}

function WizGuideDisplay() {
	var $wizPopUp = $("#wizGuide");
	if ($wizPopUp.is(":hidden")) {
		$("#WizGuideBg").css("display","block");
		$wizPopUp.show("slow");
	} else {
		$("#WizGuideBg").css("display","none");
		$wizPopUp.hide("fast");
	}
}


function setDefSlideHeight() {
	setTimeout(function () {
	  var defSlideH = parseInt($(".pla_slide:first").height(),10);
	  var defSlideW= ((990*defSlideH)/448);
	  $(".def_slide").css("height",defSlideH+"px").css("width",defSlideW+"px");
	},500);
}

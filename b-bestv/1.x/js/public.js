define(function(require, exports, module) {
	$.fn.extend({
		select: function() {
			this.on("click", function() {
				var _nj = $(this).attr("nj");
				$(this).parents("p").find("input").val(_nj);
			})
		}
	});

	var wd = document.documentElement.clientWidth;
	var hd = document.documentElement.clientHeight;
	$(".fixed").css({
		width: 400,
		height: 240,
		left: (wd - 400) / 2,
		top: (hd - 240) / 2
	});
	$(".detail").on("click", ".fl a", function() {		
		if (islogin) {
			return true;
		} else {
			$(".fixed").show();
			$(".push").show();
			return false;
		}
	});	
	if(!$(".detail").length){return}
	var time;
	var h = $(".detail").offset().top;
	var h1=732;
	var _winh=$(window).height();
	var _bodyh=$("body").outerHeight();
	$(function() {
		$(".ui-dialog-close").click(function(event) {
			$(".fixed").hide();
			$(".push").hide();
		});
		$(".a1").click(function(event) {
			time = setInterval(function(){runToAsk(h)}, 20);	
		});
		$(".a2").click(function(event) {
			time = setInterval(function(){runToAsk(h1)}, 20);		
		});
		var _username="用户名";
		var _psw="密码";
		$("#userName").focus(function(event) {			
			if($(this).val()==_username){
				 $(this).val("");
			}else{return}
		}).blur(function(event) {
			if(!$(this).val()){ 
				$(this).val(_username);
			}
			else{return}			
		});	
		$("#password2").focus(function(event) {	
			if(!$("#password").val()){
			  $(this).hide();			
			  $("#password").show().focus();}		
		});	
		$("#password").blur(function(event) {
			if($(this).val()){return}
			if(!$(this).val()){$(this).hide();$("#password2").show();}	
		});		
	});
	function runToAsk(hei) {
		var position = document.documentElement.scrollTop || document.body.scrollTop; 
		position += 20;
		window.scrollTo(0, position);
		if (position >= hei) {
			window.scrollTo(0, hei);
			clearInterval(time);
		}
		if(position-20+_winh>=_bodyh){ 
			clearInterval(time);
		}
	}
});
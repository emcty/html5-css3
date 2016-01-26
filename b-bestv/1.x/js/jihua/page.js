/* @grunt-build */
define(function(require,exports,module){ 
	require("../public");
	var app={
		_init:function(){ 
		   $(function(){
		   	app._initEvent();	
			})		  	
		},
		_initEvent:function(){ 
			$(".tabhead").on("click","ul li",function(){ 
				var _index=$(this).index();
				$(this).addClass("add").siblings().removeClass('add');
				$("#bodyshow .tabody").eq(_index).show().siblings('.tabody').hide();
			});
			$(".tabody").on("click",".t a",function(){ 
				var _index=$(this).index();
				$(this).addClass("add").siblings().removeClass('add');				
			});
		}		
	}
	return app;
});


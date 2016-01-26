/* @grunt-build */
define(function(require,exports,module){ 
	require("../public");
	var app={
		_init:function(){ 
			this.$span=$(".container p span");
			this.$grade=$("#grade");
			this.$nianji=$("#nianji");
			this.$subject=$("#subject");
			this._initEvent();			
		},
		_initEvent:function(){ 
			$("#p_nianji span").select();
			$("#p_grade span").select();
			$("#p_subject span").select();
			this.$span.on("click",function(){ 
				$(this).addClass('selected').siblings().removeClass('selected');
			});	
			$("form").submit(function(event) {
				if(app.$grade.val()==""||app.$nianji.val()==""||app.$subject.val()==""){alert("请选择完整!");return false}
				else{return true}
			});	
		}		
	}
	return app;
});

/* @grunt-build */
define(function(require,exports,module){ 
   require('../ejs');
   var	fristnode='<% \n	var kn=knowledges.length;\n   for(var i=0;i<kn;i++){ \n   	sdata=knowledges[i];\n	%>   \n	<div class="one">\n		<p class="p1"><a href="javascript:void(0)" target="_self" class="onea" dataid="<%=sdata.id%>"></a><span value="<%=sdata.id%>"><%=sdata.name%></span></p>	\n	</div>\n	<%}%>';
   var  secondnode='<% var len=knowledges.length;\n	if(len>0){\n%>\n<ul class="two">\n<%\n   for(var i=0;i<len;i++){\n   	var data=knowledges[i];\n%>\n	<li>\n		<% if(data.hasChild == true){%>\n			<p> \n				<a href="javascript:void(0)" target="_self" dataid="<%=data.id%>"></a>\n				<span value="<%=data.id%>"><%=data.name%></span>\n			</p>\n		<%} else{ %>\n			<p> <span class="bg" value="<%=data.id%>"><%=data.name%></span> </p>\n		<%}%>\n	</li>\n<%\n   	}\n%>\n</ul>\n<%\n }\n%> ';
   var tFn = ejs.compile(fristnode);	
   var subItem=ejs.compile(secondnode);	
	var app={
		_init:function(args){
			this.url1 = args.url1;
			this.url2 = args.url2;
		    this._ajax();			
		},
		_initEvent:function(){	
			var me=this;
			var $left=$(".left");
			var $right=$(".right");
			var $show_knowledge=$(".show_knowledge");
			//value值复制
			var handerFn=function(){ 
				$(this).addClass('blue');
				var text=$(this).text();
				var val=$(this).attr("value");					
				if($show_knowledge.find("span[value="+val+"]").length>0){return}			
				$show_knowledge.append("<span value="+val+">"+text+"<a></a></span>");
			};	
			//搜索框得到焦点及失去焦点是否显示默认value		
			var _key="知识点关键字";
			$(".container > .right > .t > input").focus(function(event) {			
				if($(this).val()==_key){
					 $(this).val("");
				}else{return}
			}).blur(function(event) {
				if(!$(this).val()){ 
					$(this).val(_key);
				}
				else{return}			
			});	
			$left.on('click','p a',function() {
				$(this).toggleClass('onea2');				
				var $dom = $(this).parent();
				var id=$(this).attr('dataid');
				if(id=='')return;
				$dom.next("ul").toggle();
				if($dom.attr('isLoad'))return;
				$dom.attr('isLoad',true);
				me._subAjax(id,$dom);				
			})
			//将左侧文字添加到底部
			.on("click","p span",handerFn);
			//将右侧文字添加到底部
			$right.on("click",".find p a",handerFn);
			//底部删除文字后处理
			$show_knowledge.on("click","a",function(){ 
				var $this=$(this),
				$span=$this.parent(),
				val=$span.attr("value");
				var $spans=$this.closest('.show_knowledge').find('span');
				$span.remove();
				$left.find("span[value="+val+"]").removeClass('blue');	
				$right.find("a[value="+val+"]").removeClass('blue');
			});	
			//确认后提交表单
			$(".sure").click(function() {
				var arr=[],
			    $span=$(".show_knowledge a").parent();
				$span.each(function(){ 
					arr.push($(this).attr('value')|0);
			  	})
			  	if(!arr.length){return false}
			  	$('.select').val(arr.join(','));						
			});	
			//分页选中a加class
			$(".page a").click(function(event) {
				$(this).addClass('selected').siblings('a').removeClass('selected');
			});		 
		},
		//初始化加载ajax
		_ajax:function(id){ 
			$.ajax({ 
				url:this.url1,
				dataType:'json',				
				type:'get',
				success:function(data){ 					
					$(".left").empty().append(tFn(data));				
					app._initEvent();
				},
				error:function(){ 
					console.log(arguments);
				}
			});
		},
		//加载子节点ajax
		_subAjax:function(id,$dom){ 
			$.ajax({ 
				url:app.url2,
				dataType:"json",
				type:"get",
				data:{knowledgePId:id},
				success:function(data){ 				
					$dom.after(subItem(data));
				},
				error:function(){ 
					console.log(arguments);
				}
			});
		}		
	}
	return function(args){ 
		$(function(){ 		
			app._init(args);
		});
	};
});


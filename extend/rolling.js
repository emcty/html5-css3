$.fn.extend({ 
	rolling:function(){ 
		var number=11,//一行显示的数量
			totalWidth=1145,//一行所占的宽度
			len=$(this).find("span").length,
			//当前span存在current类名，则自动切换到该元素显示start
		    curr = $(this).find("span.current").index(),
			currpage = Math.max(1, Math.ceil(curr / number)),
			currleft = -totalWidth* (currpage - 1),
			page = Math.ceil(len / number),
			n = currpage - 1,
			$this=$(this);
			$this.css({
				"left": currleft + 'px'
			});
			//end
		if(len<=11){return} //元素不够11个时,左右切换标签不可点
		//向左切换
		$this.parents(".jq-Icon").find("a").eq(0).click(function() {
			if (n <= 0) {
				return
			}
			var _left = -totalWidth * (n - 1);
			$this.css({
				"left": _left + 'px'
			});
			n--;
		});
		//向右切换
		$this.parents(".jq-Icon").find("a").eq(1).click(function() {
			n++;
			var _left = -totalWidth * (n);
			if (n < page) {
				$this.css({
					"left": _left + 'px'
				});
			} else {
				n--;
				return;
			}
		});
	}
});
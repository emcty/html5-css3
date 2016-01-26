	<% 
	var kn=knowledges.length;
   for(var i=0;i<kn;i++){ 
   	sdata=knowledges[i];
	%>   
	<div class="one">
		<p class="p1"><a href="javascript:void(0)" target="_self" class="onea"></a><span value="<%=sdata.id%>"><%=sdata.name%></span></p>	
	</div>
	<%}%>
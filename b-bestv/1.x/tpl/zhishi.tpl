<% var len=knowledges.length;
	if(len>0){
%>
<ul class="two">
<%
   for(var i=0;i<len;i++){
   	var data=knowledges[i];
%>
	<li>
		<% if(data.hasChild == true){%>
			<p> 
				<a href="javascript:void(0)" target="_self" dataid="<%=data.id%>"></a>
				<span value="<%=data.id%>"><%=data.name%></span>
			</p>
		<%} else{ %>
			<p> <span class="bg" value="<%=data.id%>"><%=data.name%></span> </p>
		<%}%>
	</li>
<%
   	}
%>
</ul>
<%
 }
%> 
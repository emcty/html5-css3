(function(){

    var stemplate = '<%var len = data.length;for( var i = 0 ; i < len ; i ++ ){var merge = data[i].merge;%><div class="hc-biao-wrap" <%if(merge){%>style="margin-top:-50px;"<%}%> ><%if(!merge){%><div class="hc-biao-bar"> <%= data[i].title%> </div> <%}%><div id="<%= data[i].idname %>" style="<%= data[i].style %>" class="container"></div> </div> <%}%>'


    var $wrap = $(".hc-biao-target");
    var $dateRange =  $('.date-range');
    var template = _.template(stemplate);
    var settings = {};

    function init(){
        build();
    }

    function build(){
        settingExtendDef();
        initFrame();
        initHc();

    }

    //初始化 图标外层div
    function initFrame(){
        $wrap.html(template({
            data:opts
        }));
    }

    function settingExtendDef(){
        $.each(hc_settings,function(n,setting){
            settings[n] = $.extend({},hc_settings_def,setting);
        })
    }

    //初始化 highcharts 图表
    function initHc(){
        $.each(opts,function(n,key){
            $("#"+key.idname).highcharts(settings[key.idname]);
        })
    }




    init();

})()
Date.prototype.Format = function(fmt) { //author: meizz
    var o = {
        "M+" : this.getMonth()+1,                 //月份
        "d+" : this.getDate(),                    //日
        "h+" : this.getHours(),                   //小时
        "m+" : this.getMinutes(),                 //分
        "s+" : this.getSeconds(),                 //秒
        "q+" : Math.floor((this.getMonth()+3)/3), //季度
        "S"  : this.getMilliseconds()             //毫秒
    };
    if(/(y+)/.test(fmt))
        fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
    for(var k in o)
        if(new RegExp("("+ k +")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
    return fmt;
}


var stemplate = '<%var len = data.length;%><div class="hc-tabs-btn"> <ul> <%for( var i = 0 ; i < len ; i ++ ){%><li <%if(i === 0){%>class="curr"<%}%> ><a href="javascript:;"><%= data[i].short_tit%></a></li> <%}%></ul> </div> <div class="hc-tabs-page"> <ul> <%for( var i = 0 ; i < len ; i ++ ){%><li <%if(i === 0){%>class="curr"<%}%>><div class="title"><%= data[i].title%></div> <div id="<%= data[i].idname%>" class="container"></div> <%if(data[i].merge){%> <div id="<%= data[i+1].idname%>" class="container"></div><%}%></li> <%}%></ul> </div>'

var _this = {
    init:function(){
        this.$wrap = $('.hc-tabs');
        this.$dateRange = $('.date-range');
        this.tempate = _.template(stemplate);
        this.settings = {};
        this.build();
        this.$btn = $('.hc-tabs-btn').find("li");
        this.$page = $('.hc-tabs-page').find('li');
        this.bind();
    },
    bind:function(){
        this.$btn.on("click",this.pageSwitch);
    },
    build:function(){
        //初始化事件选择控件
        var now = new Date();
        var minYear = now.getFullYear()-3;
        this.$dateRange.daterangepicker({
            format:'YYYY.MM.DD',
            "dateLimit": {
                "days": 1095,
            },
            maxDate:now.Format("yyyy/MM/dd"),
            minDate:minYear+now.Format("/MM/dd"),
        },window.fns.onDateChange);
        //初始化表格
        this.initHc();
    },
    pageSwitch:function(){
        var $this = $(this);
        var index = $this.index();
        _this.$btn.removeClass("curr");
        $this.addClass("curr");
        _this.$page.removeClass('curr').eq(index).addClass('curr');
        _this.hcRepaint(index);
    },
    initHc:function(){
        this.settingExtendDef();
        this.$wrap.html(this.tempate({
            data:opts
        }))
        $("#biao1").highcharts(_this.settings["biao1"]);
        /*
        $.each(opts,function(n,key){
            $("#"+key.idname).highcharts(_this.settings[key.idname]);
        })
        */
    },
    hcRepaint:function(index){
        var index = index + 1;
        $("#biao"+index).highcharts(_this.settings["biao"+index]);
        if(index === 6){
            //产品要求再加个饼图
            $("#biao7").highcharts(_this.settings["biao7"]);
        }
    },
    settingExtendDef:function(){
        $.each(hc_settings,function(n,setting){
            _this.settings[n] = $.extend({},hc_settings_def,setting);
        })
    }
}


$(function(){
    _this.init();
})
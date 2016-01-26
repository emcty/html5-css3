/**
 *
 */
(function (global, undefined) {

    var _this = {};

    var gift_type = ["first","second","third","fourth","fifth","prtp","addnew"];
    var gift_count = [1,5,5,5,10,10,1];


    _this.init = function (args) {
        this.args = args;
        this.imgs = args.imgs;
        this.api = args.api;
        this.$win = $(window);
        this.lucky_status = "pending";
        this.$wrap = $(".container");
        this.$prog = $(".prog");
        this.$progVader = $(".prog-vader");
        this.$progText = $(".prog-text");
        this.template = _.template($("#template").html());
        this.template_panel = _.template($("#template-panel").html());
        this.build();
        this.$btnStart = $(".start");
        this.$button = $(".btn-lucky");
        this.$pages = $(".pages>.page");
        this.$btnBack = $(".back");
        this.$luckyList = $(".lucky-list");
        this.resieze();
        this.bind();
    }

    _this.bind = function () {
        this.$btnStart.on("click", function () {
            this.pageTrun(1);
        }.bind(this));
        this.$button.on("click", this.beginLucky.bind(this));
        this.$btnBack.on("click", function () {
            this.ajaxGetWinners && this.ajaxGetWinners.abort();
            clearTimeout(this.timerGetWinners);
            this.startAnimation.stop();
            this.pageTrun(1);
        }.bind(this));
        this.$win.on("resize",this.resieze.bind(this))
    }

    _this.build = function () {

        //加载 图片资源
        var imgs_arr = [];
        $.each(this.imgs, function (i, n) {
            imgs_arr.push(n);
        });
        var resLoaderOpt = {
            resources: imgs_arr,
            onProgress: this.progress.bind(this),
            onComplete: this.loaderCompl.bind(this)
        };
        this.loader = new resLoader(resLoaderOpt);
        this.loader.start();
        this.$wrap.html(this.template(this.imgs));
        //储存已经中奖的用户不然他再中奖了
        localStorage.winners = JSON.stringify({
            winners_id:[]
        });
    };
    _this.resieze = function(){
        //屏幕多大都提供不了..判断一下
        var clientWidth = this.$win.width();
        var clientHeight = this.$win.height();
        var aspectRatio = 1920/1080;

        var width = aspectRatio * clientHeight;
        var height = clientHeight;
        if(width > clientWidth){
            width = clientWidth;
            height = width / aspectRatio;
        };
        this.canvasSize = {
            width:width,
            height:height
        };
        this.$pages.css({
            "width":width +"px",
            "height":height+"px"
        });
    }
    _this.progress = function (current, total) {
        var percent = Math.floor(current / total * 100);
        this.$progVader.css("width", percent + "%");
        this.$progText.text(percent + "%");
    };
    _this.loaderCompl = function () {
        this.$prog.hide();
    };
    _this.beginLucky = function (e) {
        var $target = $(e.currentTarget);
        var type = $target.data("type");
        var typeCode = gift_type.indexOf(type) + 1;
        var count = gift_count[typeCode - 1];
        var board = "";
        this.pageTrun(2);
        this.ajaxGetWinners = null;
        var canvaseWidth = this.canvasSize.width;
        if(canvaseWidth > 1500){
            board = "XXXXL"
        }else if(canvaseWidth > 1300){
            board = "XXXL"
        }else if(canvaseWidth > 1000){
            board = "XXL"
        }else if(canvaseWidth > 750){
            board = "XL"
        }else{
            board = "L"
        }
        this.$luckyList.html(this.template_panel({
            count: count,
            boardSize: board
        }));
        var $animatedBox = this.$luckyList.find(".animated");
        $animatedBox.css("opacity",0).each(function(i,that){
            setTimeout(function(){
                $(that).css("opacity",1).addClass("bounceInDown");
            },i * 130)
        })
        this.$numberid = this.$luckyList.find(".wz");
        this.startAnimation.start();
        this.timerGetWinners = setTimeout(function(){
            this.ajaxGetWinners = this.getWinners(typeCode).done(function (res) {
                _this.startAnimation.stop();
                var nums = res.data;
                $.each(nums,function(i,num){
                    _this.$numberid.eq(i).text(num);
                });
                _this.$luckyList.find(".animated").removeClass("bounceInDown").addClass("swing");
            });
        }.bind(this),3899)
    };
    _this.startAnimation = {
        start:function(){
            _this.animation = setInterval(function(){
                _this.$numberid.text(_this.random(100,600))
            },100);
        },
        stop:function(){
            clearInterval(_this.animation);
        }
    };

    _this.pageTrun = function (index) {
        this.$pages.hide();
        this.$pages.eq(index).show();
    };
    _this.getWinners = function (typeCode) {
        /**
        return $.ajax({
            url: this.api,
            type: "GET",
            dataType:"json",
            data: {
                type: typeCode
            }
        }).fail(function(){
            alert("网络连接异常");
            _this.pageTrun(0);
        })
        */
        var winners = [];
        var random;
        for(var i = 0 ; i < gift_count[typeCode] ; i ++){
            random = this.random(1,3);
            winners.push(random);
            localStorage.winners.push(random);
        };
        var dtd = $.Deferred();
        dtd.resolve({
            "status":0,
            "data":winners
        });
        dtd.abort = function(){}
        return dtd;
    };


    _this.random = function(under,over){
        /**
         * @return number
         */
        switch(arguments.length){
            case 1: return parseInt(Math.random()*under+1);
            case 2: return parseInt(Math.random()*(over-under+1) + under);
            default: return 0;
        }
    }

    /**
     * 入口方法
     * @param args
     */
    global.lucky = function (args) {
        _this.init(args);
    };

})(window)
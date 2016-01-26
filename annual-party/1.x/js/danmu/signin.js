


var flagstop = false;

var _this = {
    init:function(){
        this.$wrap = $('.container');
        this.strTemplate = $('#template').html();
        this.template = _.template(this.strTemplate);
        //this.socket = new WebSocket(options.address);
        this.useridx = 1;
        this.build();
        this.bind();
    },
    bind:function(){
        //this.socket.onopen = this.onOpen;
        //this.socket.onmessage = this.onMsg;
        this.goEasy.subscribe({
            channel: "wechat",
            onConnected:function(){
                $.get("test.php");
            },
            onMessage:this.onMsg
        });
        this.goEasy.subscribe({
            channel: "god",
            onMessage:this.onGodMsg
        });
    },
    build:function(){
        this.$wrap.html(this.template({
            length:108
        }))
        //
        this.$boxes = this.$wrap.find(">div");
        this.randArr = this.randArrFn();
        //
        /**
         this.runtimeItv = setInterval(function(){
            var random;
            if(_this.useridx < 80 ){
                return false;
            }
            random = _this.random(107);
            _this.$boxes.eq(random).attr("class","m-"+_this.random(6));

        },2000)*/
        this.goEasy = new GoEasy({
            appkey: options.appkey
        });
    },
    randArrFn:function(){
        var arr=[];
        for(var i=0;i<108;i++){
            arr[i]=i;
        }
        var result = {};
        for( var i = 1 ; i <= 6 ; i ++ ){
            result["m"+i] = arr.sort(function(){ return 0.5 - Math.random() });
        }
        return result;
    },
    random:function(under,over){
        /**
         * @return number
         */
        switch(arguments.length){
            case 1: return parseInt(Math.random()*under+1);
            case 2: return parseInt(Math.random()*(over-under+1) + under);
            default: return 0;
        }
    }
}

$.extend(_this,{
    onOpen:function(){
        //console.log('socket on open');
    },
    onMsg:function(res){
        var data = JSON.parse(res.content);
        var udata = data;
        if(data.end === "true"){
            _this.truning();
            //clearInterval(_this.runtimeItv)
            flagstop = true;
            return ;
        }
        if(_.isArray(udata)){
            console.log('arr')
            udata.forEach(function(uinfo){
                _this.draw(uinfo);
            })
            return ;
        }

        _this.draw(udata);

    },
    onGodMsg:function(res){
        var content = res.content;
        if(content == "true"){
            clearInterval(_this.enditv);
            _this.truning();
            return;
        }
        clearInterval(_this.enditv);
    },
    draw:function(data){
        var index = _this.useridx = data.index ;
        var mnum = Math.ceil(index / 108);
        var num = index % 108;
        var seat = _this.randArr["m"+mnum][num];
        var $thisbox = _this.$boxes.eq(seat);
        var $thismian = $thisbox.find("p").eq(mnum-1);

        var img = new Image();
        img.src = data.avatar;
        img.onload = function(){
            $thisbox.attr("class","m-"+mnum)
            $thismian.attr("style","background:url("+data.avatar+");background-size:80px 80px;");
            $thismian.find(".name").text(data.name);
        }
    },
    truning:function(){
        if(flagstop){
            return ;
        }
        var jis = 1;
        this.enditv = setInterval(function(){
            for(var i = 0 ; i < 108 ; i ++ ){
                (function(i,jis){
                    setTimeout(function(){
                        _this.$boxes.eq(i).attr("class","m-"+jis)
                    },i*100)
                })(i,jis)
            }
            if(jis >= 6){
                jis = 0;
            }
            jis ++
        },6000)
    }
})


$(function(){
    _this.init();
})

/**
 * 模拟 websokcet 链接建立了 测试用 模拟websocket响应 请删掉哦
 * @constructor
 */

function GoEasy() {}
GoEasy.prototype.subscribe = function (canshu) {
    var jishu = 0;
    setInterval(function () {
        /**
         * @property {number} mode  弹幕类型 1,2,没有3,4,5,6 (上端滚动弹幕 下端滚动弹幕 底部弹幕 顶部弹幕 逆向弹幕)
         * @property {string} text  弹幕文字内容
         * @property {number} size  文字字号 1-5 (90、70、50、30、25)
         * @property {number} color 文字颜色 1-3
         * @property {number} dur 弹幕生存时间
         *
         */
        canshu.onMessage({
            content:{
                "status":0,
                "data":{
                    "mode": random(1,6),
                    "text": "你好啊!",
                    "size": random(1,5),
                    "color":random(1,3),
                    "dur":random(1000,10000)
                }
            }
        })
    }, 111)
}
/**
 * end
 */

function random (min ,max){
    return Math.floor(Math.random()*(max-min+1)+min);
}
$(function(){

    // 在窗体载入完毕后再绑定
    var CM = new CommentManager($('#my-comment-stage')[0]);
    CM.init();
    // 先启用弹幕播放（之后可以停止）
    CM.start();

    var CM_COLORS = [0,0xfff050,0xfffaaa,0xfffab4];
    var CM_FONT_SIZE = [0,90,70,50,30,25];

    var goEasy = new GoEasy({
        appkey: options.appkey
    });

    goEasy.subscribe({
        channel: "",
        onMessage:onMsg
    });



    function onMsg(res){
        var data = res.content.data;
        var someDanmakuAObj = {
            "mode": data.mode ||1,
            "text": data.text,
            "stime":0,
            "size": CM_FONT_SIZE[data.size] || CM_FONT_SIZE[random(1,5)],
            "color": CM_COLORS[data.color] ||CM_COLORS[random(1,3)],
            "dur": data.dur || random(1000,10000)
        };
        CM.send(someDanmakuAObj);
    };



})


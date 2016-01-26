/**
 * 模拟 websokcet 链接建立了 测试用
 * @constructor
 */
function GoEasy() {}
GoEasy.prototype.subscribe = function (canshu) {
    var jishu = 0;
    setInterval(function () {
        canshu.onMessage({
            danmuid: "id" + jishu++,
            text: "弹幕测试发射器哈哈哈"+ jishu
        })
    }, 1500)
}
/**
 * end
 */

/**
 * @param {Function} options.onChange callBack()
 * @returns {Object} danmuList
 */
var DanmuList = function (options) {
    return new DanmuList.fn.init(options);
};
DanmuList.fn = DanmuList.prototype = {
    init:function(options){
        this.list = {};
        this.onChange = options.onChange || function () {};
    },
    add: function (obj) {
        this.list[obj.danmuid] = obj.text;
        this.onChange();
        return this;
    },
    remove: function (key) {
        delete this.list[key];
        return this;
    },
    clearAll:function(){
        this.list = {};
        return this;
    },
    getList: function () {
        return this.list;
    },
    each: function (callback) {
        for (var item in this.list) {
            callback({
                danmuid: item,
                text: this.list[item]
            });
        }
        return this;
    }
};
DanmuList.fn.constructor = DanmuList;
DanmuList.fn.init.prototype = DanmuList.prototype;

var _this = {};
_this.init = function (args) {
    this.args = args;
    this.$danmuList = $(".danmu-list");
    this.$tongg = $(".btns-tongguo");
    this.build();
    this.bind();
};
_this.build = function () {
    this.goEasy = new GoEasy({
        appkey: options.appkey
    });
    this.danmuList = DanmuList({
        onChange: this.danmuListOnChange.bind(this)
    });
};
_this.bind = function () {
    this.goEasy.subscribe({
        channel: "test",
        onMessage: this.onMsg.bind(this)
    });
    this.$danmuList.on("click", ".danmu-btn-del", _this.danmuDelete.bind(this));
    this.$tongg.on("click",_this.tongguo.bind(this));
};
_this.danmuDelete = function (e) {
    var $target = $(e.currentTarget);
    var tsId = $target.parent().data("danmuid");
    this.danmuList.remove(tsId);
    this.refreshView();
};
_this.tongguo = function(){
    var ids = [];
    this.danmuList.each(function(item){
        ids.push(item.danmuid)
    }).clearAll();
    $.ajax({
        dataType:"json",
        data:{
            danmuid:ids.join(",")
        }
    })

    this.refreshView();
}
_this.danmuListOnChange = function () {
    this.refreshView();
};
_this.refreshView = function () {
    var arrHtml = [];
    this.danmuList.each(function (item) {
        arrHtml.push('<li data-danmuid=' + item.danmuid + '>' + item.text + '<a class="danmu-btn-del" href="javascript:;">删掉!</a></li>');
    })
    this.$danmuList.html(arrHtml.join(""));
};
_this.onMsg = function (message) {
    this.danmuList.add(message);
};

_this.init({});
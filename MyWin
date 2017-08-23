
 var InfoType = {

  'SUCCESS-INFO': {
    'classify': 'success-log'
  },

  'FAIL-INFO': {
    'classify': 'fail-logo'
  },

  'WARN-INFO': {
    'classify': 'warn-logo'
  },

  'DEFAULT-INFO': {
    'classify': 'default-logo'
  }

}

/**
 * 示例：
 * var MyWin = require('js/common/MyWin.js');
 * var tempWin = new MyWin();
 * tempWin.setInfoContent('我试试');不带icon的主要信息
 * tempWin.setInfoContent({infoType: 'SUCCESS-INFO', infoText: '成功'});
 * tempWin.updateOptions({title: '信息'});
 * title 左上角标题、hasCloseBtn 右上角是否有X关闭
 * hasInfoIcon 关键信息ICON 默认为❗️ DEFAULT-INFO
 * infoType 提示类型； ❌ 错误类型 FAIL-INFO； ✅ 正确类型 SUCCESS-INFO;
 * okEvent 确定事件 callback函数返回true则关闭此对话框
 * cancelEnent 取消事件
 * okText 确定按钮文案
 * cancelText 取消按钮文案
 *
*/

 function MyWin(options) {

  var defaults = {
    width: 520,
    title: '提示',
    hasCloseBtn: true,
    closeCallBack: function(){},
    info: {
      infoText: '',
      infoType: ''
    },
    otherInfo: '',
    okEvent: function(){ return true; },
    cancelEvent: function(){ return true; },
    okText: '确定',
    cancelText: '',
    buttons: []
  };

  this.options = $.extend({}, defaults, options);

  this.init();
  this.bindEvent();

 }

 MyWin.prototype = {

  constructor: MyWin,

  init: function() {

    this.mask = $('<div class="mywin-cover-panel"></div>').appendTo($('body'));

    this.container = $('<div class="mywin-widget"></div>').appendTo($('body')).width(this.options.width);

    this.header = $('<div class="mywin-widget-header"></div>').appendTo(this.container);

    this.titleElem = $('<span></span>').text(this.options.title).appendTo(this.header);

    if (this.options.hasCloseBtn) {
      this.closeBtn = $('<a class="mywin-close-btn"></a>').appendTo(this.header);
    }

    this.body = $('<div class="mywin-widget-body"></div>').appendTo(this.container);

    this.msgElem = $('<div class="mywin-key-info"></div>').appendTo(this.body);

    if (this.options.info) {
      this.infoLogo = '';
      var infoTypeTmp = this.options.info.infoType;
      var infoTextTmp = this.options.info.infoText;

      this.infoText = $('<span></span>');

      if (infoTextTmp) {
        this.infoText.text(infoTextTmp);
      }

      if (infoTypeTmp) {
        this.infoLogo = $('<i class="mywin-key-logo"></i>')
                          .addClass(InfoType[infoTypeTmp].classify);
      }
      this.msgElem.append(this.infoLogo).append(this.infoText);
    }


    this.otherInfoElem = $('<div></div>').appendTo(this.body);
    if (this.options.otherInfo) {
      this.otherInfoElem.html(this.options.otherInfo);
    }

    this.footer = $('<div class="mywin-widget-oper"></div>').appendTo(this.container);

    if (this.options.okText) {
      this.okBtn = $('<a class="mywin-ok-close"></a>').text(this.options.okText).appendTo(this.footer);
    }

    if (this.options.cancelText) {
      this.cancelBtn = $('<a class="mywin-cancel-btn"></a>').text(this.options.cancelText).appendTo(this.footer);
      if (this.cancelBtn.index() > 0) {
        this.cancelBtn.addClass('mywin-second-btn');
      }
    }

    this._setButtons(this.options);

  },

  bindEvent: function() {

    if (this.closeBtn) {
      this.closeBtn.on('click', this.closeWin.bind(this));
      if (this.options.closeCallBack) {
        this.closeBtn.on('click', this.options.closeCallBack.bind(this));
      }
    }

    this.okBtn && this.okBtn.on('click', this.okDispose.bind(this));

    this.cancelBtn && this.cancelBtn.on('click', this.cancelDispose.bind(this));
  },

  closeWin: function() {
    this.hideWin();
  },

  okDispose: function() {
    var flag = true;
    if ($.isFunction(this.options.okEvent)) {
      flag = this.options.okEvent.apply(this);
    }
    if (flag) {
      this.hideWin();
    }
  },

  cancelDispose: function() {
    if ($.isFunction(this.options.cancelEvent)) {
      this.options.cancelEvent.apply(this);
    }
    this.hideWin();
  },

  setInfoContent: function(infoObj) {

    if (typeof infoObj === 'string') {
      this.infoText.text(infoObj);
      this.infoLogo.remove();
      this.msgElem.append(this.infoText);
    } else if (typeof infoObj === 'object') {
      var infoTypeTmp = infoObj.infoType;
      var infoTextTmp = infoObj.infoText;
      var hasNoInfo = infoObj.hasNoInfo;

      if (hasNoInfo) {
        this.infoLogo && this.infoLogo.remove();
        this.infoText && this.infoText.remove();
        return;
      }

      if (infoTypeTmp) {
        if (!this.infoLogo) {
          this.infoLogo = $('<i class="mywin-key-logo"></i>');
        }
        this.infoLogo.removeClass();
        this.infoLogo.addClass('mywin-key-logo')
                      .addClass(InfoType[infoTypeTmp].classify);
        this.msgElem.append(this.infoLogo);

      } else {
        this.infoLogo && this.infoLogo.remove();
      }

      if (infoTextTmp) {

        if (!this.infoText) {
          this.infoText = $('<span></span>');
        }
        this.infoText.text(infoTextTmp);
        this.msgElem.append(this.infoText);

      } else {
        this.infoText && this.infoText.remove();
      }
    }

  },

  showWin: function() {
    var containerWidth = this.container.width();
    var containerHeight = this.container.height();
    var boderTop = this.container.css('border-top-width');
    var borderBottom = this.container.css('border-bottom-width');
    var boderLeft = this.container.css('border-left-width');
    var borderRight = this.container.css('border-right-width');
    var winHeight = $(window).height();
    var winWidth = $(window).width();

    boderTop = boderTop.replace(/px/i,'');
    borderBottom = borderBottom.replace(/px/i,'');
    boderLeft = boderLeft.replace(/px/i,'');
    borderRight = borderRight.replace(/px/i,'');

    boderTop = parseInt(boderTop, 10);
    borderBottom = parseInt(borderBottom, 10);
    boderLeft = parseInt(boderLeft, 10);
    borderRight = parseInt(borderRight, 10);

    containerWidth += boderLeft + borderRight;
    containerHeight += boderTop + borderBottom;

    var leftTmp = (winWidth/2-containerWidth/2) + 'px';
    var topTmp = (winHeight/2-containerHeight/2) + 'px';

    this.container.css({
      'left': leftTmp,
      'top': topTmp
    });
    this.mask.show();
    this.container.show();
  },

  hideWin: function() {
    this.mask.hide();
    this.container.hide();
  },

  updateOptions: function(options, isExtendOptions) {
    // isExtendOptions 是否继承之前已经更新过的options，
    // 为了解决根据某些条件只更新一部分options信息
    // 如条件一仅更新关键信息，条件二仅更新附属信息，但要复用
    // 条件一的关键信息
    this._reRender(options, isExtendOptions);

    // 不能深度copy，否则当原有buttons有两项时，当要把它更新成一项时，若深度copy
    // 会保留原有的第二项
    this.options = $.extend(this.options, options);

  },

  _setButtons: function(options, isExtendOptions){

    if (!options.buttons){
      if(!isExtendOptions) {
        options.buttons = [];
      } else {
        options.buttons = this.options.buttons;
      }
    }

    if (options.buttons.length == 0) {
      if (options.okText) {
        var obj = {};
        obj.value = options.okText;
        // 重置为默认事件
        obj.callBack = this.options.okEvent;
        if (options.okEvent) {
          obj.callBack = options.okEvent;
        }
        options.buttons.push(obj);
      }

      if (options.cancelText) {
        var objTmp = {};
        objTmp.value = options.cancelText;
        // 重置为默认事件
        objTmp.callBack = this.options.cancelEvent;
        if (options.cancelEvent) {
          objTmp.callBack = options.cancelEvent;
        }
        options.buttons.push(objTmp);
      }
    }

    var buttons = options.buttons;
    var _self = this;
    if (buttons.length > 0) {
      var $footerInnerElem = _self.footer.find('*');
      $footerInnerElem.remove();
    }
    $.each(buttons, function(index, objButton) {
      if (objButton.value) {
        var $tmp = $('<a></a>').text(objButton.value);
        if (objButton.href) {
          $tmp.prop('href', objButton.href);
        }
        if (index > 0) {
          $tmp.addClass('mywin-second-btn');
        }
        _self.footer.append($tmp);

        if (objButton.callBack) {
          $tmp.on('click', function(event){
            event.preventDefault();

            var flag = objButton.callBack.apply(this);
            // 至于回调返回promise对象，则在回调函数里面去写关闭逻辑
            // 若明确指出按钮的回调返回false，则不关闭对话框
            if (flag !== false) {
              _self.hideWin();
            }
          });
        }
      }
    });

  },

  _reRender: function(options, isExtendOptions) {

    if (options.width) {
      this.container.width(options.width);
    }

    if (options.title) {

      this.titleElem.text(options.title);
    }

    // 默认认为含有关闭按钮 除非明确写hasCloseBtn为false 否则不删除关闭按钮
    if (options.hasCloseBtn === false){
      this.closeBtn && this.closeBtn.remove();
    } else {
      if (!this.closeBtn) {
        this.closeBtn = $('<a class="mywin-close-btn"></a>').appendTo(this.header);
      }
      this.closeBtn.off('click', this.closeWin.bind(this));
      if (this.options.closeCallBack) {
        this.closeBtn.off('click', this.options.closeCallBack.bind(this));
      }
      this.closeBtn.on('click', this.closeWin.bind(this));
      if (options.closeCallBack) {
        this.closeBtn.on('click', options.closeCallBack.bind(this));
      }
    }

    // 若更新时没有输入info项，视为info为空
    if (!options.info) {
      if (!isExtendOptions) {
        options.info = {};
        options.info.hasNoInfo = true;
      } else {
        options.info = this.options.info;
      }

    }

    this.setInfoContent(options.info);

    // 没有附属信息且isExtendOptions不为true，视为附属信息为空
    // 即不复用附加信息
    if (options.otherInfo) {
      this.otherInfoElem.html(options.otherInfo);
    } else {
      if (!isExtendOptions) {
        this.otherInfoElem.html('');
      }
    }

    this._setButtons(options, isExtendOptions);

  }

 }

module.exports =  MyWin;

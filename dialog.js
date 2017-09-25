/**
   * Created by dl on 2017/9/20.
   * @todo 带遮罩层的弹窗
   * Class style自定义
	   {
	    容器:cp-dialog-layer,
	    头部:cp-dialog-header,
	    标题:cp-dialog-title,
	    关闭按钮:cp-dialog-close,
	    内容区域:cp-dialog-content,
	    底部:cp-dialog-footer
	   }
   * 使用方式:
	   new Dialog({
		   width,
		   id,
		   skin,
		   title,
		   closeBtn,
		   content,
		   footer
	   })
*/

import EventEmitter from 'events';

const classPrefix = 'cp-dialog';

class Dialog extends EventEmitter{

	constructor(options){
		super();
		this.width = options.width || 520;
		this.id = options.id || '';
		this.skin = options.skin || '';
		this.title = options.title || '';
		this.node = {
			'layer': null,
			'content': options.content || '',
			'footer': options.footer || '',
			'mask': null,
			'closeBtn': options.closeBtn || false
		};
		this._initNode();
		this._initStyle();
		this._initEvent();
	}

	_createLayer(){
		let node = this.node;
		return (
		  `<div class="${classPrefix}-layer ${this.skin}" style="display:none" id="${this.id}">
		     <div class="${classPrefix}-header">
			   	<span class="${classPrefix}-close" style="display:none">&times;</span>
		      <p class="${classPrefix}-title">${this.title}</p>
		     </div>
		     <div class="${classPrefix}-content">${node.content}</div>
		     <div class="${classPrefix}-footer">${node.footer}</div>
		   </div>`
		)
	}

	_createMask(){
		return (
		  `<div class="${classPrefix}-mask" style="display:none">
		   </div>`
		)
	}

	_initNode(){
		let node = this.node;
		let $body = $('body');
		node.layer = $(this._createLayer());
		node.mask = $(this._createMask());
		node.content = $(node.content);
		node.footer = $(node.footer);
		$body
		  .append(node.layer)
		  .append(node.mask);
	}

	_initStyle(){
		let marginTop = -this.node.layer.outerHeight() / 2;
		let marginLeft = -this.width / 2;
		let layerCss = {
			'width': this.width,
			'position': 'fixed',
			'left': '50%',
			'top': '50%',
			'marginTop': marginTop,
			"marginLeft": marginLeft
		};
		this.node.layer.css(layerCss);
	}

	_initEvent(){
		if(this.node.closeBtn){
			this.node.layer.find(`.${classPrefix}-close`)
				.show()
				.on("click",()=>{
					this.hide();
				})
		}
	}

	show(){
		this.node.layer.show();
		this.node.mask.show();
		this.emit("show");
	}

	hide(){
		this.node.layer.hide();
		this.node.mask.hide();
		this.emit("hide");
	}
}

export default  Dialog;

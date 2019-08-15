/**
 * Copyright 2015 Inc. All rights reserved.
 * @desc 设置页面缩放值(适应于制作一屏的页面布局)
 * @author dingei(emcty1227@163.com)
 */
(function(){
  'use strict';
  /**
   * 根节点
   * @type {Element}
   */
  var docEl = document.documentElement,
      width = docEl.clientWidth,
      height = docEl.clientHeight,
      styleContent,
      scalePercent,
      /**
       * 设备独立像素基准值
       */
      dipWidth = 375,
      dipHeight = 667,
      /**
       * 缩放比
       */
      horizontalScale = docEl.clientWidth / dipWidth,
      verticalScale = docEl.clientHeight / dipHeight,
      /**
       * 设置element scale
       */
      setScale = function(){
        scalePercent = Math.min(horizontalScale,verticalScale);
        document.querySelectorAll(".scale-container").forEach(function(item){
          item.style.cssText = "transform: scale("+scalePercent+");-webkit-transform: scale("+scalePercent+");transform-origin:50% 0% 0";
        });
        
      }
  setScale();
})();

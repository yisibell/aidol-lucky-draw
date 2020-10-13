!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):(t="undefined"!=typeof globalThis?globalThis:t||self).AidolLuckyDraw=e()}(this,(function(){"use strict";function t(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function e(t,e){for(var o=0;o<e.length;o++){var i=e[o];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}function o(t,o,i){return o&&e(t.prototype,o),i&&e(t,i),t}function i(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&n(t,e)}function s(t){return(s=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function n(t,e){return(n=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function a(t,e){return!e||"object"!=typeof e&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function r(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}();return function(){var o,i=s(t);if(e){var n=s(this).constructor;o=Reflect.construct(i,arguments,n)}else o=i.apply(this,arguments);return a(this,o)}}function u(t,e,o){return(u="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(t,e,o){var i=function(t,e){for(;!Object.prototype.hasOwnProperty.call(t,e)&&null!==(t=s(t)););return t}(t,e);if(i){var n=Object.getOwnPropertyDescriptor(i,e);return n.get?n.get.call(o):n.value}})(t,e,o||t)}var h=function(){function e(){t(this,e)}return o(e,[{key:"IsPC",value:function(){for(var t=navigator.userAgent,e=!0,o=["Android","iPhone","SymbianOS","Windows Phone","iPad","iPod"],i=0;i<o.length;i++)if(t.indexOf(o[i])>0){e=!1;break}return e}},{key:"easeOut",value:function(t,e,o,i){return(t/=i/2)<1?o/2*t*t+e:-o/2*(--t*(t-2)-1)+e}},{key:"windowToCanvas",value:function(t,e){var o=t.getBoundingClientRect(),i=this.IsPC()?e.clientX||event.clientX:e.changedTouches[0].clientX,s=this.IsPC()?e.clientY||event.clientY:e.changedTouches[0].clientY;return{x:i-o.left,y:s-o.top}}},{key:"drawText",value:function(t,e,o,i,s){for(var n=arguments.length>5&&void 0!==arguments[5]?arguments[5]:20,a=e.split(""),r="",u=[],h=0;h<a.length;h++)t.measureText(r).width<s||(u.push(r),r=""),r+=a[h];u.push(r);for(var l=0;l<u.length;l++)t.fillText(u[l],o,i+(l+1)*n)}},{key:"roundedRect",value:function(t,e,o,i,s,n){i>0?t.moveTo(e+n,o):t.moveTo(e-n,o),t.arcTo(e+i,o,e+i,o+s,n),t.arcTo(e+i,o+s,e,o+s,n),t.arcTo(e,o+s,e,o,n),i>0?t.arcTo(e,o,e+n,o,n):t.arcTo(e,o,e-n,o,n)}}]),e}();return{LuckyWheel:function(e){i(a,e);var n=r(a);function a(e){var o;return t(this,a),(o=n.call(this)).centerX=e.centerX,o.centerY=e.centerY,o.outsideRadius=e.outsideRadius,o.evenColor=e.evenColor||"#FF6766",o.oddColor=e.oddColor||"#FD5757",o.loseColor=e.loseColor||"#F79494",o.textColor=e.textColor||"White",o.arrowColorFrom=e.arrowColorFrom||"#FFFC95",o.arrowColorTo=e.arrowColorTo||"#FF9D37",o.buttonFont=e.buttonFont||"开始抽奖",o.buttonFontColor=e.buttonFontColor||"#88411F",o.buttonColorFrom=e.buttonColorFrom||"#FDC964",o.buttonColorTo=e.buttonColorTo||"#FFCB65",o.awards=e.awards,o.startRadian=e.startRadian||0,o.duration=e.duration||4e3,o.velocity=e.velocity||10,o.finish=e.finish,o.INSIDE_RADIUS=0,o.TEXT_RADIAS=.8*o.outsideRadius,o.FONT_STYLE="bold ".concat(.07*o.outsideRadius,"px Helvetica, Arial"),o.ARROW_RADIUS=o.outsideRadius/3,o.BUTTON_RADIUS=.8*o.ARROW_RADIUS,o.AWARDS_COUNT=o.awards.length,o.AWARD_RADIAN=2*Math.PI/o.AWARDS_COUNT,o._isAnimate=!1,o._spinningTime=0,o._spinTotalTime,o._spinningChange,o._canvasStyle,o}return o(a,[{key:"drawRouletteWheel",value:function(t){var e=this;t.clearRect(0,0,t.canvas.width,t.canvas.height),t.save();var o=this.oddColor.replace("#",""),i=parseInt(o[0]+o[1],16),n=parseInt(o[2]+o[3],16),r=parseInt(o[4]+o[5],16);t.fillStyle="rgba(".concat(i,", ").concat(n,", ").concat(r,", .72)"),t.shadowColor="rgba(0, 0, 0, .24)",t.shadowOffsetX=0,t.shadowOffsetY=5,t.shadowBlur=15,t.arc(this.centerX,this.centerY,this.outsideRadius,0,2*Math.PI,!1),t.fill(),t.restore();for(var h=function(o){t.save(),"losing"===e.awards[o].type?t.fillStyle=e.loseColor:t.fillStyle=o%2==0?e.evenColor:e.oddColor;var i=e.startRadian+e.AWARD_RADIAN*o,s=i+e.AWARD_RADIAN;if(t.beginPath(),t.arc(e.centerX,e.centerY,e.outsideRadius-5,i,s,!1),t.arc(e.centerX,e.centerY,e.INSIDE_RADIUS,s,i,!0),t.fill(),t.restore(),"image"===e.awards[o].type){var n=function(t,e){var o=Math.sin(t.AWARD_RADIAN)*t.outsideRadius/2.5;e.save(),e.translate(t.centerX+Math.cos(i+t.AWARD_RADIAN/2)*t.TEXT_RADIAS,t.centerY+Math.sin(i+t.AWARD_RADIAN/2)*t.TEXT_RADIAS),e.rotate(i+t.AWARD_RADIAN/2+Math.PI/2),e.drawImage(r,-o/2,0,o,o),e.restore()},a=e,r=new Image;r.src=e.awards[o].content,r.complete?n(a,t):r.onload=function(e){n(a,t)}}else if("text"===e.awards[o].type||"losing"===e.awards[o].type){var u=e.awards[o].content;t.save(),t.fillStyle=e.textColor,t.font=e.FONT_STYLE,t.translate(e.centerX+Math.cos(i+e.AWARD_RADIAN/2)*e.TEXT_RADIAS,e.centerY+Math.sin(i+e.AWARD_RADIAN/2)*e.TEXT_RADIAS),t.rotate(i+e.AWARD_RADIAN/2+Math.PI/2),t.fillText(u,-t.measureText(u).width/2,0),t.restore()}},l=0;l<this.AWARDS_COUNT;l++)h(l);var c=this.centerX,d=this.centerY-this.ARROW_RADIUS+5;t.save(),t.fillStyle=this.arrowColorFrom,t.beginPath(),t.moveTo(c,d),t.lineTo(c-15,d),t.lineTo(c,d-30),t.closePath(),t.fill(),t.restore(),t.save(),t.fillStyle=this.arrowColorTo,t.beginPath(),t.moveTo(c,d),t.lineTo(c+15,d),t.lineTo(c,d-30),t.closePath(),t.fill(),t.restore();var _=t.createLinearGradient(this.centerX-this.ARROW_RADIUS,this.centerY-this.ARROW_RADIUS,this.centerX-this.ARROW_RADIUS,this.centerY+this.ARROW_RADIUS);t.save(),_.addColorStop(0,this.arrowColorFrom),_.addColorStop(1,this.arrowColorTo),t.fillStyle=_,t.shadowColor="rgba(0, 0, 0, .12)",t.shadowOffsetX=0,t.shadowOffsetY=5,t.shadowBlur=15,t.beginPath(),t.arc(this.centerX,this.centerY,this.ARROW_RADIUS,0,2*Math.PI,!1),t.fill(),t.restore();var T=t.createLinearGradient(this.centerX-this.BUTTON_RADIUS,this.centerY-this.BUTTON_RADIUS,this.centerX-this.BUTTON_RADIUS,this.centerY+this.BUTTON_RADIUS);t.save(),T.addColorStop(0,this.buttonColorFrom),T.addColorStop(1,this.buttonColorTo),t.fillStyle=T,t.beginPath(),t.arc(this.centerX,this.centerY,this.BUTTON_RADIUS,0,2*Math.PI,!1),t.fill(),t.restore(),t.save(),t.fillStyle=this.buttonFontColor,t.font="bold ".concat(this.BUTTON_RADIUS/2,"px helvetica"),u(s(a.prototype),"drawText",this).call(this,t,this.buttonFont,this.centerX-this.BUTTON_RADIUS/2,this.centerY-this.BUTTON_RADIUS/2-4,.8*this.BUTTON_RADIUS,this.BUTTON_RADIUS/2+4),t.restore()}},{key:"rotateWheel",value:function(t){if(this._spinningTime+=30,this._spinningTime>=this._spinTotalTime)return this._isAnimate=!1,void(this.finish&&this.finish(this.getValue()));var e=(this._spinningChange-u(s(a.prototype),"easeOut",this).call(this,this._spinningTime,0,this._spinningChange,this._spinTotalTime))*(Math.PI/180);this.startRadian+=e,this.drawRouletteWheel(t),window.requestAnimationFrame(this.rotateWheel.bind(this,t))}},{key:"getValue",value:function(){var t=180*this.startRadian/Math.PI+90,e=180*this.AWARD_RADIAN/Math.PI;return Math.floor((360-t%360)/e)}},{key:"luckyDraw",value:function(t){this._isAnimate=!0,this.value="",this._spinningTime=0,this._spinTotalTime=1e3*Math.random()+this.duration,this._spinningChange=100*Math.random()+this.velocity,this.rotateWheel(t)}},{key:"render",value:function(t,e){var o=this;this._canvasStyle=t.getAttribute("style"),this.drawRouletteWheel(e),["touchstart","mousedown"].forEach((function(i){t.addEventListener(i,(function(i){if(!o._isAnimate){var n=u(s(a.prototype),"windowToCanvas",o).call(o,t,i);e.beginPath(),e.arc(o.centerX,o.centerY,o.BUTTON_RADIUS,0,2*Math.PI,!1),e.isPointInPath(n.x,n.y)&&o.luckyDraw(e)}}))})),t.addEventListener("mousemove",(function(i){var n=u(s(a.prototype),"windowToCanvas",o).call(o,t,i);e.beginPath(),e.arc(o.centerX,o.centerY,o.BUTTON_RADIUS,0,2*Math.PI,!1),e.isPointInPath(n.x,n.y)?t.setAttribute("style","cursor: pointer;".concat(o._canvasStyle)):t.setAttribute("style",o._canvasStyle)}))}}]),a}(h),LuckySudoku:function(e){i(a,e);var n=r(a);function a(e){var o;return t(this,a),(o=n.call(this)).awards=e.awards,o.sudokuSize=e.sudokuSize,o.sudokuItemRadius=e.sudokuItemRadius||8,o.sudokuItemUnactiveColor=e.sudokuItemUnactiveColor||"rgb(255, 235, 236)",o.sudokuItemUnactiveTxtColor=e.sudokuItemUnactiveTxtColor||"rgb(48, 44, 43)",o.sudokuItemUnactiveShadowColor=e.sudokuItemUnactiveShadowColor||"rgb(255, 193, 200)",o.sudokuItemActiveColor=e.sudokuItemActiveColor||"rgb(254, 150, 51)",o.sudokuItemActiveTxtColor=e.sudokuItemActiveTxtColor||"rgb(255, 255, 255)",o.sudokuItemActiveShadowColor=e.sudokuItemActiveShadowColor||"rgb(255, 193, 200)",o.buttonColor=e.buttonColor||"rgb(255, 216, 1)",o.buttonTxtColor=e.buttonTxtColor||"rgb(172, 97, 1)",o.buttonShadowColor=e.buttonShadowColor||"rgb(253, 177, 1)",o.duration=e.duration||4e3,o.velocity=e.velocity||300,o.hasButton=e.hasButton||"true",o.finish=e.finish,o.AWARDS_ROW_LENGTH=Math.floor(o.awards.length/4)+1,o.AWARDS_STEP=o.AWARDS_ROW_LENGTH-1,o.AWARDS_LEN=4*o.AWARDS_STEP,o.LETF_TOP_POINT=0,o.RIGHT_TOP_POINT=o.AWARDS_STEP,o.RIGHT_BOTTOM_POINT=2*o.AWARDS_STEP,o.LEFT_BOTTOM_POINT=2*o.AWARDS_STEP+o.AWARDS_STEP,o.SUDOKU_ITEM_MARGIN=o.sudokuSize/o.AWARDS_ROW_LENGTH/6,o.SUDOKU_ITEM_SIZE=o.sudokuSize/o.AWARDS_ROW_LENGTH-o.SUDOKU_ITEM_MARGIN,o.SUDOKU_ITEM_TXT_SIZE="bold ".concat(.12*o.SUDOKU_ITEM_SIZE,"px Helvetica"),o.BUTTON_SIZE=o.sudokuSize-(2*o.SUDOKU_ITEM_SIZE+3*o.SUDOKU_ITEM_MARGIN),o.BUTTON_TXT_SIZE="bold ".concat(.12*o.BUTTON_SIZE,"px Helvetica"),o._positions=[],o._buttonPosition=[],o._isAnimate=!1,o._jumpIndex=Math.floor(Math.random()*o.AWARDS_LEN),o._jumpingTime=0,o._jumpTotalTime,o._jumpChange,o._canvasStyle,o}return o(a,[{key:"drawSudoku",value:function(t){t.clearRect(0,0,t.canvas.width,t.canvas.height);for(var e=this.AWARDS_STEP*this.SUDOKU_ITEM_SIZE+this.AWARDS_STEP*this.SUDOKU_ITEM_MARGIN,o=0;o<this.AWARDS_LEN;o++){if(o>=this.LETF_TOP_POINT&&o<this.RIGHT_TOP_POINT){var i=o,s=i*this.SUDOKU_ITEM_SIZE+i*this.SUDOKU_ITEM_MARGIN;this._positions.push({x:s,y:0}),this.drawSudokuItem(t,s,0,this.SUDOKU_ITEM_SIZE,this.sudokuItemRadius,this.awards[o].type,this.awards[o].content,this.SUDOKU_ITEM_TXT_SIZE,this.sudokuItemUnactiveTxtColor,this.sudokuItemUnactiveColor,this.sudokuItemUnactiveShadowColor)}if(o>=this.RIGHT_TOP_POINT&&o<this.RIGHT_BOTTOM_POINT){var n=Math.abs(this.AWARDS_STEP-o),a=e,r=n*this.SUDOKU_ITEM_SIZE+n*this.SUDOKU_ITEM_MARGIN;this._positions.push({x:a,y:r}),this.drawSudokuItem(t,a,r,this.SUDOKU_ITEM_SIZE,this.sudokuItemRadius,this.awards[o].type,this.awards[o].content,this.SUDOKU_ITEM_TXT_SIZE,this.sudokuItemUnactiveTxtColor,this.sudokuItemUnactiveColor,this.sudokuItemUnactiveShadowColor)}if(o>=this.RIGHT_BOTTOM_POINT&&o<this.LEFT_BOTTOM_POINT){var u=Math.abs(2*this.AWARDS_STEP-o),h=Math.abs(u-this.AWARDS_STEP),l=h*this.SUDOKU_ITEM_SIZE+h*this.SUDOKU_ITEM_MARGIN,c=e;this._positions.push({x:l,y:c}),this.drawSudokuItem(t,l,c,this.SUDOKU_ITEM_SIZE,this.sudokuItemRadius,this.awards[o].type,this.awards[o].content,this.SUDOKU_ITEM_TXT_SIZE,this.sudokuItemUnactiveTxtColor,this.sudokuItemUnactiveColor,this.sudokuItemUnactiveShadowColor)}if(o>=this.LEFT_BOTTOM_POINT){var d=Math.abs(3*this.AWARDS_STEP-o),_=Math.abs(d-this.AWARDS_STEP),T=_*this.SUDOKU_ITEM_SIZE+_*this.SUDOKU_ITEM_MARGIN;this._positions.push({x:0,y:T}),this.drawSudokuItem(t,0,T,this.SUDOKU_ITEM_SIZE,this.sudokuItemRadius,this.awards[o].type,this.awards[o].content,this.SUDOKU_ITEM_TXT_SIZE,this.sudokuItemUnactiveTxtColor,this.sudokuItemUnactiveColor,this.sudokuItemUnactiveShadowColor)}}}},{key:"drawSudokuItem",value:function(t,e,o,i,n,r,h,l,c,d,_){if(t.save(),t.fillStyle=d,t.shadowOffsetX=0,t.shadowOffsetY=4,t.shadowBlur=0,t.shadowColor=_,t.beginPath(),u(s(a.prototype),"roundedRect",this).call(this,t,e,o,i,i,n),t.fill(),t.restore(),h)if("image"===r){var T=function(){t.drawImage(I,e+.2*i/2,o+.2*i/2,.8*i,.8*i)},I=new Image;I.src=h,I.complete?T():I.onload=function(t){T()}}else"text"!==r&&"losing"!==r||(t.save(),t.fillStyle=c,t.font=l,t.translate(e+this.SUDOKU_ITEM_SIZE/2-t.measureText(h).width/2,o+this.SUDOKU_ITEM_SIZE/2+6),t.fillText(h,0,0),t.restore())}},{key:"drawButton",value:function(t){var e=this.SUDOKU_ITEM_SIZE+this.SUDOKU_ITEM_MARGIN,o=this.SUDOKU_ITEM_SIZE+this.SUDOKU_ITEM_MARGIN;t.save(),t.fillStyle=this.buttonColor,t.shadowOffsetX=0,t.shadowOffsetY=4,t.shadowBlur=0,t.shadowColor=this.buttonShadowColor,t.beginPath(),u(s(a.prototype),"roundedRect",this).call(this,t,e,o,this.BUTTON_SIZE,this.BUTTON_SIZE,this.sudokuItemRadius,this.buttonColor,this.buttonShadowColor),t.fill(),t.restore(),t.save(),t.fillStyle=this.buttonTxtColor,t.font=this.BUTTON_TXT_SIZE,t.translate(e+this.BUTTON_SIZE/2-t.measureText("立即抽奖").width/2,o+this.BUTTON_SIZE/2+10),t.fillText("立即抽奖",0,0),t.restore(),this._buttonPosition={x:e,y:o}}},{key:"createButtonPath",value:function(t){t.beginPath(),u(s(a.prototype),"roundedRect",this).call(this,t,this._buttonPosition.x,this._buttonPosition.y,this.BUTTON_SIZE,this.BUTTON_SIZE,this.sudokuItemRadius)}},{key:"sudokuItemMove",value:function(t){if(this._isAnimate=!0,this._jumpIndex<this.AWARDS_LEN-1?this._jumpIndex++:this._jumpIndex>=this.AWARDS_LEN-1&&(this._jumpIndex=0),this._jumpingTime+=100,this._jumpingTime>=this._jumpTotalTime)return this._isAnimate=!1,void(this.finish&&(0!=this._jumpIndex?this.finish(this._jumpIndex-1):0===this._jumpIndex&&this.finish(this.AWARDS_LEN-1)));this.drawSudoku(t),"true"===this.hasButton&&this.drawButton(t),this.drawSudokuItem(t,this._positions[this._jumpIndex].x,this._positions[this._jumpIndex].y,this.SUDOKU_ITEM_SIZE,this.sudokuItemRadius,this.awards[this._jumpIndex].type,this.awards[this._jumpIndex].content,this.SUDOKU_ITEM_TXT_SIZE,this.sudokuItemActiveTxtColor,this.sudokuItemActiveColor,this.sudokuItemActiveShadowColor),setTimeout(this.sudokuItemMove.bind(this,t),50+u(s(a.prototype),"easeOut",this).call(this,this._jumpingTime,0,this._jumpChange,this._jumpTotalTime))}},{key:"luckyDraw",value:function(t){this._jumpingTime=0,this._jumpTotalTime=1e3*Math.random()+this.duration,this._jumpChange=3*Math.random()+this.velocity,this.sudokuItemMove(t)}},{key:"render",value:function(t,e){var o=this;this._canvasStyle=t.getAttribute("style"),this.drawSudoku(e),"true"===this.hasButton&&(this.drawButton(e),["mousedown","touchstart"].forEach((function(i){t.addEventListener(i,(function(i){var n=u(s(a.prototype),"windowToCanvas",o).call(o,t,i);o.createButtonPath(e),e.isPointInPath(n.x,n.y)&&!o._isAnimate&&o.luckyDraw(e)}))})),t.addEventListener("mousemove",(function(i){var n=u(s(a.prototype),"windowToCanvas",o).call(o,t,i);o.createButtonPath(e),e.isPointInPath(n.x,n.y)?t.setAttribute("style","cursor: pointer;".concat(o._canvasStyle)):t.setAttribute("style",o._canvasStyle)})))}}]),a}(h),LuckyScratchCard:function(e){i(a,e);var n=r(a);function a(e){var o;return t(this,a),(o=n.call(this)).style=e.style,o.awardBackgroundImage=e.awardBackgroundImage,o.eraserSize=e.eraserSize||15,o.coverColor=e.coverColor||"#b5b5b5",o._dragging=!1,o}return o(a,[{key:"drawCover",value:function(t){t.save(),t.fillStyle=this.coverColor,t.beginPath(),t.rect(0,0,t.canvas.width,t.canvas.height),t.fill(),t.restore()}},{key:"drawEraser",value:function(t,e){t.save(),t.beginPath(),t.arc(e.x,e.y,this.eraserSize,0,2*Math.PI,!1),t.clip(),t.clearRect(0,0,t.canvas.width,t.canvas.height),t.restore()}},{key:"drawAwardBackgroundImage",value:function(t){t.setAttribute("style","background: url(".concat(this.awardBackgroundImage,") no-repeat center / cover;").concat(this.style))}},{key:"render",value:function(t,e){var o=this;this.drawCover(e),this.drawAwardBackgroundImage(t),["touchstart","mousedown"].forEach((function(i){t.addEventListener(i,(function(i){var n=u(s(a.prototype),"windowToCanvas",o).call(o,t,i);o._dragging=!0,o.drawEraser(e,n)}))})),["touchmove","mousemove"].forEach((function(i){t.addEventListener(i,(function(i){var n;o._dragging&&(n=u(s(a.prototype),"windowToCanvas",o).call(o,t,i),o.drawEraser(e,n))}))})),["touchend","mouseup"].forEach((function(e){t.addEventListener(e,(function(t){o._dragging=!1}))}))}}]),a}(h)}}));

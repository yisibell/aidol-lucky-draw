import Global from 'src/mixin'
import { isHtmlElement } from 'src/utils'

export default class LuckyWheel extends Global {
  constructor(el, options) {
    super();

    this.canvas = isHtmlElement(el) ? el : document.querySelector(el); // canvas 对象
    this.ctx = this.canvas.getContext('2d');  // 2d 上下文

    this.centerX = this.canvas.width / 2;
    this.centerY = this.canvas.height / 2;
    this.outsideRadius = options.outsideRadius || this.centerX - 50; // 转盘半径

    this.evenColor = options.evenColor     || '#FF6766';
    this.oddColor = options.oddColor       || '#FD5757';
    this.loseColor = options.loseColor     || '#F79494'
    this.textColor = options.textColor     || 'White';

    this.arrowColorFrom = options.arrowColorFrom   || '#FFFC95';
    this.arrowColorTo = options.arrowColorTo       || '#FF9D37';
    this.buttonFont = options.buttonFont           || 'START';
    this.buttonFontColor = options.buttonFontColor || '#88411F';
    this.buttonColorFrom = options.buttonColorFrom || '#FDC964';
    this.buttonColorTo = options.buttonColorTo     || '#FFCB65';

    this.startRadian = options.startRadian || 0; // 开始弧度
    this.cylinderNumber = options.cylinderNumber || 6 // 大转盘旋转圈数
    this.duration = options.duration || 5000;    // 旋转持续时间
    this.awards = options.awards; // 奖品列表
    this.finish = options.finish; // 抽奖动画结束后回调函数
    this.fetchAward = options.fetchAward; // 自定义获取奖品
    this.animation = options.animation; // 自定义缓动函数

    // 抽奖开始前钩子函数
    this.beforeStart = options.beforeStart || function(done) { done() };

    this.INSIDE_RADIUS = 0;
    this.TEXT_RADIAS = this.outsideRadius * .8;
    this.FONT_STYLE = `bold ${this.outsideRadius * .07}px Helvetica, Arial`;

    this.ARROW_RADIUS = this.outsideRadius / 3;     // 圆盘指针的半径
    this.BUTTON_RADIUS = this.ARROW_RADIUS * .8;    // 圆盘内部按钮的半径

    this.AWARDS_COUNT = this.awards.length;
    this.AWARD_RADIAN = (Math.PI * 2) / this.AWARDS_COUNT;

    // 私有变量集
    this._isAnimate = false;   // 是否动画中
    this._spinningRadian = this.startRadian // 当前旋转弧度数
    this._spinningTime = 0;    // 当前动画时间
    this._spinTotalTime = 0;   // 动画所需时间
    this._spinningBegin = 0;   // 动画开始弧度
    this._spinningChange = 0;  // 动画峰值
    this._canvasStyle = '';    // canvas style
    this._awardedIndex = 0;    // 当前获奖索引
    
    // 自动初始化
    if (this.canvas && this.ctx) {
      this.render()
    }
  };

  /**
   * 绘制转盘
   */
  draw() {
    const context = this.ctx;

    context.clearRect(0, 0, context.canvas.width, context.canvas.height);

    // ---------- 绘制外表盘
    context.save();
    let rgb = this.oddColor.replace('#', ''),
        r = parseInt(rgb[0] + rgb[1], 16),
        g = parseInt(rgb[2] + rgb[3], 16),
        b = parseInt(rgb[4] + rgb[5], 16);
        
    context.fillStyle = `rgba(${r}, ${g}, ${b}, .72)`;
    context.shadowColor = 'rgba(0, 0, 0, .24)';
    context.shadowOffsetX = 0;
    context.shadowOffsetY = 5;
    context.shadowBlur = 15;
    context.arc(this.centerX, this.centerY, this.outsideRadius, 0, Math.PI * 2, false);
    context.fill();
    context.restore();
    // ----------

    // --------- 绘制表盘中的色块，和对应的文字与图片
    for (let i = 0; i < this.AWARDS_COUNT; i ++) {
        // 绘制色块
        context.save();

        if (this.awards[i].type === 'losing') context.fillStyle = this.loseColor;
        else if (i % 2 === 0) context.fillStyle = this.evenColor;
        else                  context.fillStyle = this.oddColor;

        let _startRadian = this._spinningRadian + this.AWARD_RADIAN * i,
            _endRadian =   _startRadian + this.AWARD_RADIAN;

        context.beginPath();
        context.arc(this.centerX, this.centerY, this.outsideRadius - 5, _startRadian, _endRadian, false);
        context.arc(this.centerX, this.centerY, this.INSIDE_RADIUS, _endRadian, _startRadian, true);
        context.fill();
        context.restore();

        // 绘制图片
        if (this.awards[i].type === 'image') {
            let self = this,                    
                image = new Image();
                image.src = this.awards[i].content;

            function drawImage(self, context) {
                let size = Math.sin(self.AWARD_RADIAN) * self.outsideRadius / 2.5;
                context.save();
                context.translate(
                    self.centerX + Math.cos(_startRadian + self.AWARD_RADIAN / 2) * self.TEXT_RADIAS,
                    self.centerY + Math.sin(_startRadian + self.AWARD_RADIAN / 2) * self.TEXT_RADIAS
                )
                context.rotate(_startRadian + self.AWARD_RADIAN / 2 + Math.PI / 2);
                context.drawImage(
                    image, 
                    - size / 2, 0,
                    size, size
                );
                context.restore();
            }

            // 如果图片未加载，则加载
            // 如果图片已经加载完成，则直接使用
            if (!image.complete) {
                image.onload = function (e) {
                    drawImage(self, context);
                }
            } else {
                drawImage(self, context);
            }

        } 
        // 绘制文字
        else if (this.awards[i].type === 'text' || this.awards[i].type === 'losing') {
            let award = this.awards[i].content;
            context.save();
            context.fillStyle = this.textColor;
            context.font = this.FONT_STYLE;
            context.translate(
                this.centerX + Math.cos(_startRadian + this.AWARD_RADIAN / 2) * this.TEXT_RADIAS,
                this.centerY + Math.sin(_startRadian + this.AWARD_RADIAN / 2) * this.TEXT_RADIAS
            );
            context.rotate(_startRadian + this.AWARD_RADIAN / 2 + Math.PI / 2);
            context.fillText(award, -context.measureText(award).width / 2, 0);
            context.restore();
        }
    }
    // ----------

    // ---------- 绘制按钮指针
    let moveX = this.centerX,
        moveY = this.centerY - this.ARROW_RADIUS + 5;

    context.save();
    context.fillStyle = this.arrowColorFrom;
    context.beginPath();
    context.moveTo(moveX, moveY);
    context.lineTo(moveX - 15, moveY);
    context.lineTo(moveX, moveY - 30);
    context.closePath();
    context.fill();
    context.restore();

    context.save();
    context.fillStyle = this.arrowColorTo;
    context.beginPath();
    context.moveTo(moveX, moveY);
    context.lineTo(moveX + 15, moveY);
    context.lineTo(moveX, moveY - 30);
    context.closePath();
    context.fill();
    context.restore();
    // ----------


    // ---------- 绘制按钮圆盘
    let gradient_1 = context.createLinearGradient(
        this.centerX - this.ARROW_RADIUS, this.centerY - this.ARROW_RADIUS,
        this.centerX - this.ARROW_RADIUS, this.centerY + this.ARROW_RADIUS
    );
    context.save();
    gradient_1.addColorStop(0, this.arrowColorFrom);
    gradient_1.addColorStop(1, this.arrowColorTo);
    context.fillStyle = gradient_1;

    context.shadowColor = 'rgba(0, 0, 0, .12)';
    context.shadowOffsetX = 0;
    context.shadowOffsetY = 5;
    context.shadowBlur = 15;

    context.beginPath();
    context.arc(this.centerX, this.centerY, this.ARROW_RADIUS, 0, Math.PI * 2, false);
    context.fill();
    context.restore();
    // ---------- 

    // ---------- 绘制按钮
    let gradient_2 = context.createLinearGradient(
        this.centerX - this.BUTTON_RADIUS, this.centerY - this.BUTTON_RADIUS,
        this.centerX - this.BUTTON_RADIUS, this.centerY + this.BUTTON_RADIUS
    );
    context.save();
    gradient_2.addColorStop(0, this.buttonColorFrom);
    gradient_2.addColorStop(1, this.buttonColorTo);
    context.fillStyle = gradient_2;
    context.beginPath();
    context.arc(this.centerX, this.centerY, this.BUTTON_RADIUS, 0, Math.PI * 2, false);
    context.fill();
    context.restore();
    // ----------

    // ---------- 绘制按钮文字
    context.save();
    context.fillStyle = this.buttonFontColor;
    context.font = `bold ${this.BUTTON_RADIUS / 2}px helvetica`;
    super.drawText(
      context,
      this.buttonFont, 
      this.centerX - this.BUTTON_RADIUS / 2 - 16,
      this.centerY - this.BUTTON_RADIUS / 2 + 4,
      this.BUTTON_RADIUS + 20,
      this.BUTTON_RADIUS / 2 + 4
    );
    context.restore();
    // ----------
  };

  /**
   * 开始旋转
   */
  rotateWheel() {
    const easeStep = this.easingFunc(this._spinningTime, this._spinningBegin, this._spinningChange, this._spinTotalTime);
    
    this._spinningRadian = easeStep;
    this.draw();
    this._spinningTime += 10;

    if (this._spinningTime <= this._spinTotalTime) {
      window.requestAnimationFrame(this.rotateWheel.bind(this));
    } else {
      this._isAnimate = false;
      if (this.finish) this.finish(this._awardedIndex, this.awards);
    }
  };

  easingFunc(...args) {
    if (this.animation) {
      return this.animation(...args)
    }
    return super.easeOut(...args)
  };

  /**
   * 执行旋转，用于绑定在按钮上
   */
  luckyDraw() {
    this.beforeStart((awardedIndex) => {
      this._isAnimate = true;
      this._spinningTime = 0;
      this._spinTotalTime = this.duration;
     
      if (awardedIndex >= 0) {
        this._awardedIndex = awardedIndex;
      } else if(this.fetchAward) {
        this._awardedIndex = this.fetchAward(this.awards);
      } else {
        throw new Error('if you do not use the beforeStart hook, then fetchAward function is required.');
      }

      if (this._awardedIndex < 0 || this._awardedIndex > this.awards.length - 1) {
        throw new Error('Beyond the scope of awards.');
      }

      this._spinningChange = this.getAwardedEndRadian(this._awardedIndex, this.awards)
      this.rotateWheel();
    })
  };

  /**
   * 获取各奖项初始角度数
   * @author hongwenqing(elenh)
   * @param {Array of Object} awards 奖项列表
   * @param {boolean} initial 是否计算初始角度, 而并非当前角度
   * @return {Array of number} 角度数组
   */
  getEachAwardInitRadian(awards, initial = true) {
    const per_rad = (360 / awards.length)
    const per_rad_half = per_rad / 2

    return awards.reduce((init) => {
      const prev = init[init.length - 1]
      let deg = 0

      if (prev) {
        deg = prev + per_rad
      } else {
        deg = per_rad_half
      }

      init.push(deg)
      
      return init
    }, !initial && this._spinningRadian > 0 ? [this._spinningRadian] : [])
  };

  /**
   * 计算某个指定奖品的旋转所需弧度数
   * @author hongwenqing(elenh)
   * @date 
   * @param {number} index 获奖奖品索引
   * @param {Array of Object} awards 奖品列表
   * @return {number} 弧度数
   */
  getAwardedEndRadian(index, awards) {
    const arrow_deg = 270
    const per_deg_arr = this.getEachAwardInitRadian(awards, false)

    const per_end_deg_arr = per_deg_arr.map(deg => {
      if (deg < arrow_deg) {
        return arrow_deg - deg
      } else if (deg > arrow_deg) {
        return arrow_deg + (90 - (deg - arrow_deg))
      }

      return deg
    })

    return (per_end_deg_arr[index] + 360 * this.cylinderNumber) * (Math.PI / 180)
  };

  /**
   * 更新奖项列表
   */
  updateAwards(awards) {
    this.awards = awards;
    this._spinningRadian = this.startRadian;
    this.draw()
  };

  btnClickListener(e) {
    const context = this.ctx;
    if (!this._isAnimate) {
      let loc = super.windowToCanvas(this.canvas, e);
    
      if (context.isPointInPath(loc.x, loc.y)) {
        this.luckyDraw(context);
      }
    }
  };

  btnMoveListener(e) {
    const context = this.ctx;
    let loc = super.windowToCanvas(this.canvas, e);
     
    if (context.isPointInPath(loc.x, loc.y)) {
      this.canvas.setAttribute('style', `cursor: pointer;${this._canvasStyle}`);
    } else {
      this.canvas.setAttribute('style', this._canvasStyle);
    }
  };

  destroy() {
    ['touchstart', 'mousedown'].forEach(name => {
      this.canvas.removeEventListener(name, this.btnClickListener)
    })

    this.canvas.removeEventListener('mousemove', this.btnMoveListener)
  };

  /**
   * 初始化转盘
   */
  render() {
    this.destroy()
    this._canvasStyle = this.canvas.getAttribute('style') || '';
    this.draw();

    ['touchstart', 'mousedown'].forEach((event) => {
      this.canvas.addEventListener(event, this.btnClickListener.bind(this))
    });

    this.canvas.addEventListener('mousemove', this.btnMoveListener.bind(this));
  }
}
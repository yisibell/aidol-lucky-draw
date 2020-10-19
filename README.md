# aidol-lucky-draw

A lucky draw plugin for web.

# Installation

**NPM**

``` bash
$ npm i @aidol/lucky-draw -S
```

**SCRIPT TAG**

对于非模块化的项目，你可以将 `dist/aidol-lucky-draw.umd.js` 版本下载至本地使用。
她会向全局暴露一个叫做 `AidolLuckyDraw` 的变量。

``` html
<body>
    <script src="/dist/aidol-lucky-draw.umd.js"></script>
    <!-- 例如：使用幸运大转盘插件 -->
    <script>
        const { LuckyWheel } = AidolLuckyDraw;
        new LuckyWheel('#canvas', {
            //...
        }).render()
    </script>
</body>
```

# Usage

## 幸运大转盘

**最简单的使用：**

``` html
<body>

  <canvas id="canvas" width="500" height="500"> Canvas not supported </canvas>

  <script src="../dist/aidol-lucky-draw.umd.js"></script>

  <script>
    const { LuckyWheel } = AidolLuckyDraw;

    new LuckyWheel("#canvas", {
      awards: [
        { type: "text", content: "iphone8" },
        { type: "text", content: "大保健" },
        { type: "text", content: "10元话费" },
        { type: "losing", content: "未中奖" },
        {
            type: "image",
            content:
            "https://img12.360buyimg.com/n7/jfs/t4807/209/1436278963/496606/8e486549/58f0884eNcec87657.jpg",
        },
        { type: "losing", content: "未中奖" },
        { type: "text", content: "10个大嘴巴子" },
        { type: "text", content: "100元话费" },
        ],
        fetchAward: function (awards) {
          console.log(awards); // 奖项列表

          // 你可以在这定义获奖规则
          // 通常，获奖的规则，及概率应该交给后端控制
          // 所以，你可以在这调起一个获取中奖项的接口
          // 插件本身只需要管交互效果

          let index = Number.parseInt(Math.random() * 10);
          if (index > awards.length - 1) {
            index = awards.length - 1
          }
          console.log(index);
          return index; // 需要返回中奖下标索引值
        },
        finish: function (index, awards) {
        switch (awards[index].type) {
            case "text":
            alert("🎉恭喜您中得：" + awards[index].content);
            break;
            case "image":
            alert("🎉恭喜您中得：战争磨坊水冷机箱");
            break;
            case "losing":
            alert("💔很遗憾，您没有中奖~");
            break;
        }
      },
    }).render();
  </script>
</body>
```

<br />

**可配置参数：**

| 属性 | 是否必选 | 类型 | 备注 | 默认值 |
| :-- | :--: | :-- | :-- | :--: |
| outsideRadius | 否 | **number** | 大转盘的半径，这个值乘以二不能大于 `canvas` 画布的宽或者高哟！ | `canvas` 宽度值 - `50` |
| awards | 是 | **Object** | 奖品信息，每组对象代表一个奖项，对象中有两个属性，type 和 content；<br>type 有三个可能的值：<br><br>`text：`将 content 中的值输出为普通文本；<br> `losing：`将 content 中的值输出普通文本，状态为未中奖；<br>`image：`将 content 中的图片地址渲染为图片。| ø |
| evenColor | 否 | **string** | 大转盘第偶数个奖品盘颜色 | `#FF6766` |
| oddColor | 否 | **string** | 大转盘第奇数个奖品盘颜色 | `#FD5757`|
| loseColor | 否 | **string** | 大转盘未中奖表盘颜色 | `#F79494` |
| textColor | 否 | **string** | 大转盘奖品文字颜色 | `White` |
| arrowColorFrom | 否 | *String* | 指针渐变色的第一个颜色 | `#FFFC95` |
| arrowColorTo | 否 | **string** | 指针渐变色的第二个颜色 | `#FF9D37` |
| buttonFont | 否 | **string** | 抽奖按钮的文字 | `START` |
| buttonFontColor | 否 | **string** | 抽奖按钮文字的颜色 | `#88411F` |
| buttonColorFrom | 否 | **string** | 抽奖按钮渐变色的第一个颜色 | `#FDC964` |
| buttonColorTo | 否 | **string** | 抽奖按钮渐变色的第二个颜色 | `#FFCB65` |
| startRadian | 否 | **number** | 大转盘绘制的起始角度 | `0` |
| duration | 否 | **number** | 大转盘旋转的时间，单位，毫秒数 | `5000` |
| finish | 否 | **Function** | 获取奖品信息后的回调，返回一个中奖下标和当前奖项列表 | `undefined` |
| fetchAward | 是 | **Function** | 抓取获奖奖品索引函数，该函数被传入奖品列表参数，需返回一个中奖项下标，插件内部会根据中奖下标执行动画 | `undefined` |
| animation | 否 | **Function** | 自定义大转盘旋转动画缓动函数 | 源码内部使用 `easeOut` 的模式 |


**缓动函数可以参考下面项目：**

<a href="https://github.com/zhangxinxu/Tween" target="_blank"> Tween.js </a>

<br />

## 幸运九宫格

**最简单的使用：**

``` html
<body>
    <canvas id="canvas" width="500px" height="500px">Canvas not supported</canvas>

    <script src="/dist/aidol-lucky-draw.umd.js"></script>
    <script>
        const canvas = document.getElementById('canvas'),
            context = canvas.getContext('2d');

        const { LuckySudoku } = AidolLuckyDraw;

        new LuckySudoku({
            sudokuSize: canvas.width,

            awards: [
                {type: 'text', content: '30元话费'},
                {type: 'text', content: 'iphone8'},
                {type: 'losing', content: '未中奖'},
                {type: 'text', content: 'MackBook Pro'},
                {type: 'image', content: 'https://img12.360buyimg.com/n7/jfs/t4807/209/1436278963/496606/8e486549/58f0884eNcec87657.jpg'},
                {type: 'losing', content: '未中奖'},
                {type: 'image', content: 'https://img11.360buyimg.com/n7/jfs/t3187/325/423764794/213696/f4eb1dbd/57b68142Nbe104228.jpg'},
                {type: 'text', content: '火星一日游'}
            ],
            
            finish: function (index) {
                switch(this.awards[index].type) {
                    case 'text':
                        alert('🎉恭喜您中得：' + this.awards[index].content);
                        break;
                    case 'image':
                        if (index === 4)      alert('🎉恭喜您中得战争磨坊水冷机');
                        else if (index === 6) alert('🎉恭喜您中得魔声耳机');
                        break;
                    case 'losing':
                        alert('💔很遗憾，您没有中奖~');
                        break;
                }
            }

        }).render(canvas, context);
    </script>
</body>
```

<br />

**可配置参数：**

| 属性 | 是否必选 | 类型 | 备注 | 默认值 |
| :-- | :--: | :-- | :-- | :--: |
| sudokuSize | 是 | *Number* | 九宫格的尺寸，一般为 canvas 的尺寸 | ø |
| awards     | 是 | *Object* | 奖品信息，每组对象代表一个奖项，对象中有两个属性，type 和 content；<br>type 有三个可能的值：<br><br>`text：`将 content 中的值输出为普通文本；<br> `losing：`将 content 中的值输出普通文本，状态为未中奖；<br>`image：`将 content 中的图片地址渲染为图片。 | ø |
| sudokuItemRadius | 否 | *Number* | 奖项小方块的圆角大小 | 8 |
| sudokuItemUnactiveColor | 否 | *String* | 奖项方块的颜色 | rgb(255, 235, 236) |
| sudokuItemUnactiveTxtColor | 否 | *String* | 奖项方块文字的颜色 | rgb(48, 44, 43) |
| sudokuItemUnactiveShadowColor | 否 | *String* | 奖项方块阴影的颜色 | rgb(255, 193, 200) |
| sudokuItemActiveColor | 否 | *String* | 跳动方块的颜色 | rgb(254, 150, 51) |
| sudokuItemActiveTxtColor | 否 | *String* | 跳动方块文字的颜色 | rgb(255, 255, 255) |
| sudokuItemActiveShadowColor | 否 | *String* | 跳动方块阴影的颜色 | rgb(255, 193, 200) |
| buttonColor | 否 | *String* | 按钮的颜色 | rgb(255, 216, 1) |
| buttonTxtColor | 否 | *String* | 按钮文字的颜色 | rgb(172, 97, 1) |
| buttonShadowColor | 否 | *String* | 按钮阴影的颜色 | rgb(253, 177, 1) |
| duration | 否 | *Number* | 动画时长 | 4000 |
| velocity | 否 | *Number* | 动画速率变化值（峰值） | 300 |
| hasButton | 否 | *String* | 九宫格是否自带按钮；<br>若设置为 `false`，九宫格没有按钮，需要用户在外部自定义抽奖按钮；<br>抽奖按钮需调用对象的 `luckyDraw()` 方法；<br> | 'true' |
| finish | 否 | *Callback* | 获取奖品信息后的回调，返回一个下标，根据该下标查找抽到什么奖品 | ø

<br>

> 手动调用抽奖的方法

``` javascript
const sudoku = new LuckySudoku({
    // ...
    hasButton: 'false'
    // ...
});

sudoku.render(canvas, context);

button.addEventListener('click', function (e) {
    sudoku.luckyDraw(context);
})
```

<br>

## 幸运刮刮卡

**最简单的使用：**

``` html
<body>
    <canvas id="canvas" width="250" height="50">
        Canvas not supported
    </canvas>

    <script src="/dist/aidol-lucky-draw.umd.js"></script>
    <script>
        const canvas = document.getElementById('canvas'),
            context = canvas.getContext('2d');
        
        const { LuckyScratchCard } = AidolLuckyDraw;

        new LuckyScratchCard({
            awardBackgroundImage: 'http://tse3.mm.bing.net/th?id=OIP.X7zblF16pKGur6refGZsWQEsDg&pid=15.1'
        }).render(canvas, context);
    </script>
</body>
```

<br />

**可配置参数：**

| 属性 | 是否必选 | 类型 | 备注 | 默认值 |
| :-- | :--: | :-- | :-- | :--: |
| awardBackgroundImage | 是 | *String* | canvas 的背景图片，刮开涂层后的奖项 | ø |
| style | 否 | *String* | 控制 canvas 的样式 | ø |
| eraserSize | 否 | *String* | 控制橡皮擦的半径大小，单位 px | 15 |
| coverColor | 否 | *String* | 控制表面涂层的颜色 | #B5B5B5 |
import Taro, { Component } from '@tarojs/taro';
import { View , Button, Canvas } from '@tarojs/components';
import './signature.scss'


// 签名页面

// 使用 Taro.createContext 获取绘图上下文 context
let context = Taro.createCanvasContext('canvas', this);
var isButtonDown = false;
var arrx: Array<number> = [];
var arry: Array<number> = [];
var arrz: Array<number> = [];
var canvasw = 0;
var canvash = 0;

export default class Signature extends Component {
  config = {
    navigationBarTitleText: '用户签字'
  }

  state={}

  canvasStart(event) {
    isButtonDown = true;
    arrz.push(0);
    arrx.push(event.changedTouches[0].x);
    arry.push(event.changedTouches[0].y);
  }

  // 签名中
  canvasMove(event) {
    if(isButtonDown) {
      arrz.push(1);
      arrx.push(event.changedTouches[0].x);
      arry.push(event.changedTouches[0].y);
    }
    let len = arrx.length
    for (var i = 0; i < len; i++) {
      if (arrz[i] == 0) {
        context.moveTo(arrx[i], arry[i])
      } else {
        context.lineTo(arrx[i], arry[i])
      }
    }
    context.clearRect(0, 0, canvasw, canvash);
    context.stroke();
     
    context.draw(true);
  }

  // 签名结束
  canvasEnd(event) {
    console.log(context)
  }

  getImg() {
    if (arrx.length==0){
     Taro.showToast({
      title: '签名内容不能为空！',
      icon: 'none'
     });
     return false;
    };
    let self = this
    // 生成图片 
    Taro.canvasToTempFilePath({
      canvasId: 'canvas',
      fileType: 'jpg',
      success(res) {
        let tempFilePath = res.tempFilePath;

      },
      fail(err) {
        console.log(err)
      }
    })
  }
  // 取消
  clearDraw() {
    arrx = [];
    arry = [];
    arrz = [];
    context.clearRect(0, 0, canvasw, canvash);
    context.draw(true);
  }

  componentDidMount () {
    this.setContext()
    // 获取canvas的宽高
    const query = Taro.createSelectorQuery()
    query.select('#canvas').boundingClientRect(function(res){
      canvasw = res.width
      canvash = res.height
    })
    query.exec()

  } 
  setContext () {
    // 使用 wx.createContext 获取绘图上下文 context
    context.beginPath() 
    context.setStrokeStyle('#000000');
    context.setLineWidth(4);
    context.setLineCap('round');
    context.setLineJoin('round');
  }
  componentWillUnmount () {
    this.clearDraw()
  }
  render() {
    return (
      <View className="signature">
        <View className="canvas-box">
          <Canvas id="canvas" canvasId="canvas" className="canvas" disableScroll={true}  onTouchStart={this.canvasStart.bind(this)} onTouchMove={this.canvasMove.bind(this)} onTouchEnd={this.canvasEnd.bind(this)} onTouchCancel={this.canvasEnd.bind(this)} width="100%;" height="345Px">
          </Canvas>
          
        </View>
        <View>
          <View className="layout-flex flex-content-between buttons">
            <Button className="cancel" onClick={this.clearDraw}>清除</Button>
            <Button className="confirm" onClick={this.getImg}>提交</Button>
          </View>
        </View>
      </View>
    );
  }
}

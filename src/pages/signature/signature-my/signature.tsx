import Taro , { Component, Config } from '@tarojs/taro';
import { View, Button, Canvas } from '@tarojs/components';
import './signature.scss'

let ctx: any = Taro.createCanvasContext('canvas', this);
let startX = 0;
let startY = 0;
let canvasw = 0;
let canvash = 0;

export default class Signature extends Component<any, any> {

  config: Config = {
    navigationBarTitleText: '签字版'
  }
  state = {
    isPaint: false,
    tempFilePath: ''
  }

  initCanvas() {
    ctx = Taro.createCanvasContext('canvas', this);
    ctx.setStrokeStyle('#000000');
    ctx.setLineWidth(4);
    ctx.setLineCap('round');
    ctx.setLineJoin('round');
  }
  canvasStart(e) {
    startX = e.changedTouches[0].x
    startY =  e.changedTouches[0].y
    ctx.beginPath()
  }
  canvasMove(e) {
    if (startX != 0) {
      this.setState({
        isPaint: true
      })
    }
    let x = e.changedTouches[0].x
    let y =  e.changedTouches[0].y
    ctx.moveTo(startX, startY)
    ctx.lineTo(x, y)
    ctx.stroke();
    ctx.draw(true)
    startX = x
    startY = y
  }
  canvasEnd(e) {
    console.log('结束')
  }
  // 取消
  clearDraw() {
    startX = 0;
    startY = 0;
    ctx.clearRect(0, 0, canvasw, canvash);
    ctx.draw(true);
    this.setState({
      isPaint: false,
      tempFilePath: ''
    })
  }

  createImg() {
    if (!this.state.isPaint){
      Taro.showToast({
       title: '签名内容不能为空！',
       icon: 'none'
      });
      return false;
     };
    // 生成图片 
    Taro.canvasToTempFilePath({
      canvasId: 'canvas',
      success: res => {
        this.setState({
          tempFilePath: res.tempFilePath
        })
        // this.uploadToAliyun(res.tempFilePath)
      },
      fail(err) {
        console.log(err)
      }
    })
  }

  // 获取 canvas 的尺寸（宽高）
  getCanvasSize () {
    const query = Taro.createSelectorQuery()
    query.select('#canvas').boundingClientRect(function(res){
      canvasw = res.width
      canvash = res.height
    })
    query.exec()
  }
  // 重新签名
  afreshDraw() {
    this.setState({
      canSign: true
    })
  }

  componentDidMount () {
    this.getCanvasSize()
    this.initCanvas()
  } 
  componentWillUnmount () {
    ctx = null
  } 
  render() {
    return (
      <View className="signature">
        <View className="canvas-box">
          <Canvas 
            id="canvas" 
            canvasId="canvas" 
            className="canvas" 
            disableScroll={true}  
            onTouchStart={this.canvasStart.bind(this)} 
            onTouchMove={this.canvasMove.bind(this)} 
            onTouchEnd={this.canvasEnd.bind(this)} 
            onTouchCancel={this.canvasEnd.bind(this)} 
            width="100%;" 
            height="345Px">
          </Canvas>
        </View>

        <View className="layout-flex buttons">
          <Button className="cancel" onClick={this.clearDraw}>清除</Button>
          <Button className="confirm" onClick={this.createImg.bind(this)}>提交</Button>
        </View>

        <View>图片路径：</View>
        <View className="word-break">{this.state.tempFilePath}</View>
      </View>
    );
  }
}
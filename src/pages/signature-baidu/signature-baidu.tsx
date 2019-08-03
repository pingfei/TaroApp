import Taro , { Component } from '@tarojs/taro';
import { View, Text , Button} from '@tarojs/components';

export default class signature extends Component {

   config = {
       navigationBarTitleText: ''
  }

  state={
    canvasName: 'handWriting',
        ctx: '',
        canvasWidth: 0,
        canvasHeight: 0,
        transparent: 1, // 透明度
        selectColor: 'black',
        lineColor: '#1A1A1A', // 颜色
        lineSize: 1.5,  // 笔记倍数
        lineMin: 0.5,   // 最小笔画半径
        lineMax: 4,     // 最大笔画半径
        pressure: 1,     // 默认压力
        smoothness: 60,  //顺滑度，用60的距离来计算速度
        currentPoint: {},
        currentLine: [],  // 当前线条
        firstTouch: true, // 第一次触发
        radius: 1, //画圆的半径
        cutArea: { top: 0, right: 0, bottom: 0, left: 0 }, //裁剪区域
        bethelPoint: [],  //保存所有线条 生成的贝塞尔点；
        lastPoint: 0,
        chirography: [], //笔迹
        currentChirography: {}, //当前笔迹
        linePrack: [], //划线轨迹 , 生成线条的实际点
  }

  componentWillMount () {}
  componentDidMount () {} 
  componentWillReceiveProps (nextProps,nextContext) {} 
  componentWillUnmount () {} 
  componentDidShow () {} 
  componentDidHide () {} 
  componentDidCatchError () {} 
  componentDidNotFound () {} 
  render() {
    return (
      <view className="wrapper">
        <view className="handBtn">
          <button onClick={this.retDraw.bind(this)} className="delBtn">重写</button>
          <button onClick={this.subCanvas.bind(this)} className="subBtn">完成</button> 
        </view>
        <view className="handCenter">
          <canvas className="handWriting" disable-scroll="true" bindtouchstart="uploadScaleStart" bindtouchmove="uploadScaleMove"
            bindtouchend="uploadScaleEnd" bindtap="mouseDown" canvas-id="handWriting">
          </canvas>
        </view>
        <view className="handRight">
          <view className="handTitle">手写板</view>
        </view>
      </view>
    );
  }
}
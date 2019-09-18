import Taro , { Component } from '@tarojs/taro';
import { View, Button, Canvas } from '@tarojs/components';

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

  render() {
    return (
      <View className="wrapper">
        <View className="handBtn">
          <Button onClick={this.retDraw.bind(this)} className="delBtn">重写</Button>
          <Button onClick={this.subCanvas.bind(this)} className="subBtn">完成</Button> 
        </View>
        <View className="handCenter">
          <Canvas className="handWriting" disable-scroll="true" bindtouchstart="uploadScaleStart" bindtouchmove="uploadScaleMove"
            bindtouchend="uploadScaleEnd" bindtap="mouseDown" canvas-id="handWriting">
          </Canvas>
        </View>
        <View className="handRight">
          <View className="handTitle">手写板</View>
        </View>
      </View>
    );
  }
}
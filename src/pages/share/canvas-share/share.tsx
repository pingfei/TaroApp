import Taro , { Component, Config } from '@tarojs/taro';
import { View, Text , Button, Canvas, Image } from '@tarojs/components';
import './share.scss'
import unsplash from '../../../assets/images/unsplash.jpg'


export default class CanvasShare extends Component {

   config: Config = {
       navigationBarTitleText: ''
  }

  state={}

  componentWillMount () {}
  componentDidMount () {

    let ctx = Taro.createCanvasContext('canvas', this)
    console.log(unsplash)
    ctx.drawImage(unsplash, 0, 0, 345, 300)
    ctx.stroke()
    ctx.draw(true)
  } 
  componentWillReceiveProps (nextProps,nextContext) {} 
  componentWillUnmount () {} 
  componentDidShow () {} 
  componentDidHide () {} 
  componentDidCatchError () {} 
  componentDidNotFound () {} 
  render() {
    return (
      <View>
        <View className="canvas-box">
          <Canvas 
            id="canvas" 
            canvasId="canvas" 
            className="canvas" 
            disableScroll={false}
            width="345"
            height="345"
          ></Canvas>
        </View>
      </View>
    );
  }
}
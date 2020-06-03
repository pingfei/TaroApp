import Taro , { Component, Config } from '@tarojs/taro';
import { View, Canvas } from '@tarojs/components';
import './share.scss'


export default class CanvasShare extends Component<any, any> {
  config: Config = {
    navigationBarTitleText: '分享'
  }

  componentDidMount () {
    this.getImageInfo('https://msp-zsb.oss-cn-hangzhou.aliyuncs.com/order_qrcode.jpg?Expires=1884418484&OSSAccessKeyId=LTAIMjkoirGIqDzm&Signature=%2BvxiyOgE2yqrDg8yBjjkO%2BZLWCk%3D')
    
  } 
  getImageInfo (src) {
    Taro.getImageInfo({
      src: src//服务器返回的图片地址
    }).then(res => {
      this.printCode(res.path)
    }).catch(err => {
      Taro.showToast({
        title: err,
        icon: 'none',
        duration: 2000
      })
    })
  }
  printCode(path) {
    let ctx = Taro.createCanvasContext('canvas', this)
    ctx.drawImage(path, 0, 0, 345, 300)
    ctx.stroke()
    ctx.draw(true)
  }
  
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
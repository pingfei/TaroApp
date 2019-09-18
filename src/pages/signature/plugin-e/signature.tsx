import Taro , { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';
import './signature.scss'

export default class Signature extends Component {

   config = {
    navigationBarTitleText: 'e 签名',
    usingComponents: {
      "digital-signature": "plugin://signaturePlugin/digitalSignature"
    }
  }
  state = {
    isPaint: false
  }


  createImg() {
    // if (!this.state.isPaint){
    //   Taro.showToast({
    //    title: '签名内容不能为空！',
    //    icon: 'none'
    //   });
    //   return false;
    //  };
    // 生成图片 
    Taro.canvasToTempFilePath({
      canvasId: 'canvas',
      success: res => {
        console.log(res.tempFilePath)
        // this.uploadToAliyun(res.tempFilePath)
      },
      fail(err) {
        console.log(err)
      }
    })
  }
  signatureDone() {
    console.log('done')
    let plugin = Taro.requirePlugin("signaturePlugin")
    let res= plugin.getResult()
    console.log(res)
    console.log(res[0])
    console.log(res[0].signature)
  }
  failCallback() {
    console.log('fail')
  }
  
  render() {
    return (
      <View className="signature">
        <digital-signature onComplete={this.signatureDone} onFail={this.failCallback} />
      </View>
    );
  }
}
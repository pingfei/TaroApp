import Taro , { Component, Config } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import './index.scss'


export default class ImageIndex extends Component<any, any> {
  config: Config = {
    navigationBarTitleText: '图像识别'
  }

  // 选择照片
  chooseImg(type) {
    let self = this
    Taro.chooseImage({
      count: 9
    })
    .then((res) => {
      let tempFilePaths = res.tempFilePaths
      tempFilePaths.forEach((tempFilePath) => { 
        Taro.getFileSystemManager().readFile({
          filePath: tempFilePath, //选择图片返回的相对路径
          encoding: 'base64', //编码格式
          success: res => { //成功的回调
            let url = ''
            if (type == 'image') {
              // 图片识别
              url = 'https://aip.baidubce.com/rest/2.0/image-classify/v2/advanced_general?access_token='
            } else if (type == 'text') {
              // 文字识别
              url = 'https://aip.baidubce.com/rest/2.0/ocr/v1/general?access_token='
            }
            self.getAccessToken({
              type: type,
              url,
              data: {image: res.data}
            })
          }
        })
      })
    })
    .catch(err => console.log(err))
  }
  getAccessToken({type, url, data}) {
    let self = this
    Taro.request({  // 获取ip
      // grant_type： 必须参数，固定为client_credentials；
      // client_id： 必须参数，应用的API Key；
      // client_secret： 必须参数，应用的Secret Key；
      url: 'https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=4kAOjPGjeYOeQiYrKHGlo3AD&client_secret=n40W3GIer3fAwgVZBAT44P2TwNrSgoHg',
      method: 'POST',
      success: function (resp) {
        let access_token = resp.data.access_token
        self.identifyHandle({url: url + access_token, data})
      }
    })
  }
  // 图片识别
  identifyHandle({url, data}) {
      Taro.request({  // 获取ip
        url: url,
        header: {
          'content-type': 'application/x-www-form-urlencoded' 
        },
        data: data,
        method: 'POST',
        success: function (e) {
          console.log(e)
        }
      })
  }
  scanCode() {
    Taro.scanCode({}).then(res=>{
      Taro.request({
        url: 'https://nc.cli.im/qrcoderoute/qrcodeRoute?qrcode_route='+res.result.slice(7)+'&password=',
        success: function (e) {
          console.log(e)
        }
      })
    })
  }

  render() {
    return (
      <View className="list">
        <View className="item" onClick={this.chooseImg.bind(this, 'image')}>
          <View className="item-title">
            <Text>图像识别</Text>
          </View>
        </View>

        <View className="item" onClick={this.chooseImg.bind(this, 'text')}>
          <View className="item-title">
            <Text>文字识别</Text>
          </View>
        </View>

        <View className="item" onClick={this.scanCode}>
          <View className="item-title">
            <Text>二维码扫一扫</Text>
          </View>
        </View>

      </View>
    );
  }
}
import Taro , { Component } from '@tarojs/taro';
import { View, Text , Button} from '@tarojs/components';

export default class IndentifyText extends Component {

   config = {
       navigationBarTitleText: '文字识别'
  }

  state={}
  // 选择照片
  chooseImg() {
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
            // 图片识别
            // this.identifyImage(res.data)
            // 图片识别
            this.identifyText(res.data)
          }
        })
      })
    })
    .catch(err => console.log(err))
  }
  // 图片识别
  identifyImage(image) {
    Taro.request({  // 获取ip
      url: 'https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=4kAOjPGjeYOeQiYrKHGlo3AD&client_secret=n40W3GIer3fAwgVZBAT44P2TwNrSgoHg',
      method: 'POST',
      success: function (resp) {
        Taro.request({  // 获取ip
          // url: 'https://aip.baidubce.com/rest/2.0/image-classify/v1/animal?access_token='+access_token,
          url: 'https://aip.baidubce.com/rest/2.0/image-classify/v2/advanced_general?access_token='+resp.data.access_token,
          header: {
            'content-type': 'application/x-www-form-urlencoded' 
          },
          data: {
            image: image
          },
          method: 'POST',
          success: function (e) {
            console.log(e)
          }
        })
      }
    })
  }
  identifyText(image) {
    Taro.request({  // 获取ip
      url: 'https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=4kAOjPGjeYOeQiYrKHGlo3AD&client_secret=n40W3GIer3fAwgVZBAT44P2TwNrSgoHg',
      method: 'POST',
      success: function (resp) {
        Taro.request({  // 获取ip
          // url: 'https://aip.baidubce.com/rest/2.0/image-classify/v1/animal?access_token='+access_token,
          url: 'https://aip.baidubce.com/rest/2.0/ocr/v1/general?access_token='+resp.data.access_token,
          header: {
            'content-type': 'application/x-www-form-urlencoded' 
          },
          data: {
            image: image
          },
          method: 'POST',
          success: function (e) {
            console.log(e)
          }
        })
      }
    })
  }

  render() {
    return (
      <View onClick={this.chooseImg}>
        文字识别
      </View>
    );
  }
}
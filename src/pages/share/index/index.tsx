import Taro , { Component } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import './index.scss'


export default class AuthList extends Component {

   config = {
       navigationBarTitleText: '身份认证'
  }

  state={}

  componentWillMount () {}

  goMap () {
    Taro.navigateTo({
      url: '/pages/map/map'
    })
  }

  goPicker () {
    Taro.navigateTo({
      url: '/pages/time-picker/time-picker'
    })
  }

  goMySign () {
    Taro.navigateTo({
      url: '/pages/signature-my/signature-my'
    })
  }

  goBaiduSignature () {
    Taro.navigateTo({
      url: '/pages/signature-baidu/signature-baidu'
    })
  }
  goBaiduSignature2 () {
    Taro.navigateTo({
      url: '/pages/signature-baidu2/signature'
    })
  }

  render() {
    return (
      <View className="list">
        <View className="item" onClick={this.goMap}>
          <View className="item-title">
            <Text>地图</Text>
          </View>
        </View>

        <View className="item" onClick={this.goPicker}>
          <View className="item-title">
            <Text>时间选择</Text>
          </View>
        </View>

        <View className="item" onClick={this.goPicker}>
          <View className="item-title">
            <Text>二维码分享</Text>
          </View>
        </View>

        <View className="item" onClick={this.goMySign}>
          <View className="item-title">
            <Text>签名 - 我的</Text>
          </View>
        </View>

        <View className="item" onClick={this.goBaiduSignature}>
          <View className="item-title">
            <Text>签名 - 别人的</Text>
          </View>
        </View>
        <View className="item" onClick={this.goBaiduSignature2}>
          <View className="item-title">
            <Text>签名 - 别人的2</Text>
          </View>
        </View>
      </View>
    );
  }
}
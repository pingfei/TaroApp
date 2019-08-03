import Taro , { Component } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import './index.scss'


export default class SignatureIndex extends Component {

   config = {
       navigationBarTitleText: '签名'
  }

  state={}

  componentWillMount () {}

  goSignature (path) {
    Taro.navigateTo({
      url: '/pages/signature/' + path+ '/signature'
    })
  }

  render() {
    return (
      <View className="list">

        <View className="item" onClick={this.goSignature.bind(this, 'signature-my')}>
          <View className="item-title">
            <Text>签名 - 我的</Text>
          </View>
        </View>

        <View className="item" onClick={this.goSignature.bind(this, 'signature-baidu1')}>
          <View className="item-title">
            <Text>签名 - 别人的</Text>
          </View>
        </View>
        <View className="item" onClick={this.goSignature.bind(this, 'signature-baidu2')}>
          <View className="item-title">
            <Text>签名 - 别人的2</Text>
          </View>
        </View>

      </View>
    );
  }
}
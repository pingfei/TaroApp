import Taro , { Component } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import './index.scss'


export default class ShareIndex extends Component {

   config = {
       navigationBarTitleText: '身份认证'
  }

  state={}

  componentWillMount () {}

  goShare (path) {
    Taro.navigateTo({
      url: '/pages/share/' + path + '/share'
    })
  }

  render() {
    return (
      <View className="list">

        <View className="item" onClick={this.goShare.bind(this, 'canvas-share')}>
          <View className="item-title">
            <Text>二维码分享</Text>
          </View>
        </View>

      </View>
    );
  }
}
import Taro , { Component, Config } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import './index.scss'


export default class CodeIndex extends Component<any, any> {
  config: Config = {
    navigationBarTitleText: '倒计时'
  }

  goMap (path) {
    Taro.navigateTo({
      url: '/pages/setInterval/'+path+'/index'
    })
  }
  render() {
    return (
      <View className="list">
        <View className="item" onClick={this.goMap.bind(this, 'more')}>
          <View className="item-title">
            <Text>多个倒计时</Text>
          </View>
        </View>
      </View>
    );
  }
}
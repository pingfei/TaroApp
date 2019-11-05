import Taro , { Component, Config } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import './index.scss'


export default class MapIndex extends Component<any, any> {
  config: Config = {
    navigationBarTitleText: '客服'
  }

  goMap (path) {
    Taro.navigateTo({
      url: '/pages/contact/'+path+'/contact'
    })
  }

  render() {
    return (
      <View className="list">
        <View className="item" onClick={this.goMap.bind(this, 'contact')}>
          <View className="item-title">
            <Text>客服</Text>
          </View>
        </View>


      </View>
    );
  }
}
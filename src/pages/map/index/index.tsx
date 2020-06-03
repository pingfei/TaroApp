import Taro , { Component, Config } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import './index.scss'


export default class MapIndex extends Component<any, any> {
  config: Config = {
    navigationBarTitleText: '地图'
  }

  goMap (path) {
    Taro.navigateTo({
      url: '/pages/map/'+path+'/map'
    })
  }

  render() {
    return (
      <View className="list">
        <View className="item" onClick={this.goMap.bind(this, 'map-time')}>
          <View className="item-title">
            <Text>预计到达时间</Text>
          </View>
        </View>

        <View className="item" onClick={this.goMap.bind(this, 'map-position')}>
          <View className="item-title">
            <Text>定位</Text>
          </View>
        </View>

        <View className="item" onClick={this.goMap.bind(this, 'address')}>
          <View className="item-title">
            <Text>智能地址识别</Text>
          </View>
        </View>

      </View>
    );
  }
}
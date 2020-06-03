import Taro , { Component, Config } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import './index.scss'


export default class MapIndex extends Component<any, any> {
  config: Config = {
    navigationBarTitleText: '动画'
  }

  goMap (path) {
    Taro.navigateTo({
      url: '/pages/animation/'+path+'/animation'
    })
  }

  render() {
    return (
      <View className="list">
        <View className="item" onClick={this.goMap.bind(this, 'animation')}>
          <View className="item-title">
            <Text>动画</Text>
          </View>
        </View>
        <View className="item" onClick={this.goMap.bind(this, 'pull-up')}>
          <View className="item-title">
            <Text>上拉动画</Text>
          </View>
        </View>
        <View className="item" onClick={this.goMap.bind(this, 'scale')}>
          <View className="item-title">
            <Text>从无到有</Text>
          </View>
        </View>


      </View>
    );
  }
}
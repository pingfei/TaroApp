import Taro , { Component } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import './index.scss'


export default class Index extends Component {

   config = {
       navigationBarTitleText: '首页'
  }

  state={}

  componentWillMount () {}

  goIndex (path) {
    Taro.navigateTo({
      url: '/pages/' + path + '/index/index'
    })
  }

  render() {
    return (
      <View className="list">
        <View className="item" onClick={this.goIndex.bind(this, 'map')}>
          <View className="item-title">
            <Text>地图</Text>
          </View>
        </View>

        <View className="item" onClick={this.goIndex.bind(this, 'picker')}>
          <View className="item-title">
            <Text>选择器</Text>
          </View>
        </View>

        <View className="item" onClick={this.goIndex.bind(this, 'share')}>
          <View className="item-title">
            <Text>分享</Text>
          </View>
        </View>

        <View className="item" onClick={this.goIndex.bind(this, 'signature')}>
          <View className="item-title">
            <Text>签名</Text>
          </View>
        </View>

        <View className="item" onClick={this.goIndex.bind(this, 'menu')}>
          <View className="item-title">
            <Text>菜单</Text>
          </View>
        </View>

      </View>
    );
  }
}
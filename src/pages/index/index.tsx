import Taro , { Component, Config } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import './index.scss'


export default class Index extends Component<any, any> {
  config: Config = {
    navigationBarTitleText: '首页'
  }

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
        <View className="item" onClick={this.goIndex.bind(this, 'contact')}>
          <View className="item-title">
            <Text>客服</Text>
          </View>
        </View>
        <View className="item" onClick={this.goIndex.bind(this, 'image')}>
          <View className="item-title">
            <Text>图像识别</Text>
          </View>
        </View>
        <View className="item" onClick={this.goIndex.bind(this, 'animation')}>
          <View className="item-title">
            <Text>动画</Text>
          </View>
        </View>
        <View className="item" onClick={this.goIndex.bind(this, 'code')}>
          <View className="item-title">
            <Text>验证码</Text>
          </View>
        </View>
        <View className="item" onClick={this.goIndex.bind(this, 'setInterval')}>
          <View className="item-title">
            <Text>倒计时</Text>
          </View>
        </View>
        <View className="item" onClick={this.goIndex.bind(this, 'progress')}>
          <View className="item-title">
            <Text>进度条</Text>
          </View>
        </View>

      </View>
    );
  }
}
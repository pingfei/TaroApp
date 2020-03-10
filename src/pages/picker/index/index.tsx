import Taro , { Component, Config } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import './index.scss'

export default class PickerIndex extends Component {
  config: Config = {
    navigationBarTitleText: '选择器'
  }

  goPicker (path) {
    Taro.navigateTo({
      url: '/pages/picker/' + path + '/picker'
    })
  }

  render() {
    return (
      <View className="list">
        <View className="item" onClick={this.goPicker.bind(this, 'year-day-time')}>
          <View className="item-title">
            <Text>年-月-日 时间点</Text>
            <View className="tips">时间点</View>
          </View>
        </View>

        <View className="item" onClick={this.goPicker.bind(this, 'year-day-time2')}>
          <View className="item-title">
            <Text>年-月-日</Text>
            <View className="tips">时间段，间隔半个小时</View>
          </View>
        </View>
        <View className="item" onClick={this.goPicker.bind(this, 'year-day-time3')}>
          <View className="item-title">
            <Text>年-月-日</Text>
            <View className="tips">时间点 当前时间的3小时后,9:00-16:00区间</View>
          </View>
        </View>
      </View>
    );
  }
}
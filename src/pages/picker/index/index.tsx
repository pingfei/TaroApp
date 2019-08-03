import Taro , { Component } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import './index.scss'


export default class PickerIndex extends Component {

   config = {
       navigationBarTitleText: '选择器'
  }

  state={}

  componentWillMount () {}

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
            <Text>年-月-日</Text>
          </View>
        </View>

      </View>
    );
  }
}
import Taro , { Component } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import './index.scss'


export default class AuthList extends Component {

   config = {
       navigationBarTitleText: '身份认证'
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
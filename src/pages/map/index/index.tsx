import Taro , { Component } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import './index.scss'


export default class AuthList extends Component {

   config = {
       navigationBarTitleText: '身份认证'
  }

  state={}

  componentWillMount () {}

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

      </View>
    );
  }
}
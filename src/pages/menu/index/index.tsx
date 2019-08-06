import Taro , { Component } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import './index.scss'


export default class MapIndex extends Component {

   config = {
       navigationBarTitleText: '地图'
  }

  state={}

  componentWillMount () {}

  goMenu (path) {
    Taro.navigateTo({
      url: '/pages/menu/'+path+'/menu'
    })
  }

  render() {
    return (
      <View className="list">
        <View className="item" onClick={this.goMenu.bind(this, 'linkage-menu')}>
          <View className="item-title">
            <Text>联动菜单</Text>
          </View>
        </View>

      </View>
    );
  }
}
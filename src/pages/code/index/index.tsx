import Taro , { Component, Config } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import './index.scss'


export default class CodeIndex extends Component<any, any> {
  config: Config = {
    navigationBarTitleText: '验证码'
  }

  goMap (path) {
    Taro.navigateTo({
      url: '/pages/code/'+path+'/code'
    })
  }
  onRefLoginModal(ref: any) {
    this.setState({
      loginModal: ref
    })
  }
  showCodeModal() {
    this.state.loginModal.showModal()
  }
  render() {
    return (
      <View className="list">
        <View className="item" onClick={this.goMap.bind(this, 'login')}>
          <View className="item-title">
            <Text>登录验证 modal</Text>
          </View>
        </View>
      </View>
    );
  }
}
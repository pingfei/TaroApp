import Taro , { Component, Config } from '@tarojs/taro';
import { View , Button} from '@tarojs/components';

export default class contact extends Component<any, any> {

  config:Config = {
    navigationBarTitleText: '联系我'
  }

  contact(e) {
    console.log(e)
  }
  render() {
    return (
      <View>
        <Button openType="contact" onContact={this.contact}>联系我</Button>
      </View>
    );
  }
}
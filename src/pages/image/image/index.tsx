import Taro , { Component } from '@tarojs/taro';
import { View, Text , Button} from '@tarojs/components';

export default class IndentifyImage extends Component {

   config = {
       navigationBarTitleText: '图片识别'
  }

  state={}

  componentWillMount () {}
  componentDidMount () {} 
  componentWillReceiveProps (nextProps,nextContext) {} 
  componentWillUnmount () {} 
  componentDidShow () {} 
  componentDidHide () {} 
  componentDidCatchError () {} 
  componentDidNotFound () {} 
  render() {
    return (
      <View>
        图片识别
      </View>
    );
  }
}
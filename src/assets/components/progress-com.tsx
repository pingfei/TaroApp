import Taro , { Component } from '@tarojs/taro';
import { View, Text , Button, Progress} from '@tarojs/components';
import './index.scss';

export default class ProgressComp extends Component {

   config = {
       navigationBarTitleText: ''
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
        <Progress className="progress" percent={80} strokeWidth="24rpx" borderRadius="12rpx" backgroundColor="#f1aba9" activeColor="#f91534"></Progress>
      </View>
    );
  }
}
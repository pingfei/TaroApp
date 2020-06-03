import Taro , { Component, Config } from '@tarojs/taro';
import { View, Text, Progress, Input } from '@tarojs/components';
import { AtProgress } from 'taro-ui'
import './index.scss'

import ProgressComp from '../../../assets/components/progress-com'


export default class CodeIndex extends Component<any, any> {
  config: Config = {
    navigationBarTitleText: '倒计时'
  }
  state = {
    percent: 0
  }

  goMap (path) {
    Taro.navigateTo({
      url: '/pages/progress/'+path+'/index'
    })
  }
  inputPercent(e) {
    this.setState({
      percent: +e.detail.value
    })
  }
  render() {
    return (
      <View className="list">

        <Progress className="progress" percent={60} strokeWidth="24rpx" borderRadius="12rpx" backgroundColor="#f1aba9" activeColor="#f91534"></Progress>


        <ProgressComp></ProgressComp>

        <View>
          <View className="progress_out">
            <View className="progress_inner" style={{width: `${this.state.percent}rpx`, transition: `all ${this.state.percent / 255 * 2}s linear;`}}></View>
          </View>
        </View>

        <AtProgress percent={60} color='#f91534'  isHidePercent/>

        <Input onBlur={this.inputPercent}/>
      </View>
    );
  }
}
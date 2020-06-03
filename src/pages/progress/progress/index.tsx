import Taro , { Component } from '@tarojs/taro';
import { View  } from '@tarojs/components';
import './index.scss'

export default class LoginModal extends Component<any, any> {

  config = {
    navigationBarTitleText: '多个倒计时'
  }

  state = {
    arr: [
      {
        id: 1,
        startDate: '2020-05-20 16:53:09',
        endDate: '2020-05-21 09:14:09',
      },
      {
        id: 2,
        startDate: '2020-05-20 16:53:09',
        endDate: '2020-05-24 09:41:22',
      },
    ]
  }

  componentDidMount() {
    let arr: any = this.state.arr
    for (let index in arr) {
      let item: any = arr[index]
      item.time = (new Date(item.endDate).getTime() - new Date().getTime()) / 1000
      
      this.countTime(item, item.time, index)
    }

    this.setState({
      arr
    }, () => {
      let nowTime = new Date()
      for (let index in arr) {
        if (new Date(arr[index].startDate).getTime() >= nowTime.getTime()) {
          
          arr[index].startFlag = false
          arr[index].poor = (new Date(arr[index].startDate).getTime() - new Date().getTime()) / 1000
            this.countTime(arr[index], arr[index].poor, index)
            arr[index].timerId = setInterval(() => {
                this.countTime(arr[index], arr[index].poor, index)
                arr[index].poor--;
            }, 1000)
        }
        //计算结束时间
        if (new Date(arr[index].startDate).getTime() < nowTime.getTime()) {
          arr[index].startFlag = true
          arr[index].poor = (new Date(arr[index].endDate).getTime() - new Date().getTime()) / 1000
            this.countTime(arr[index], arr[index].poor, index)
            arr[index].timerId = setInterval(() => {
                this.countTime(arr[index], arr[index].poor, index)
                arr[index].poor--;
            }, 1000)
        }
      }
    })
  }
  countTime(item, poor: number, index: string) {
    let arr = this.state.arr
    if (item.poor <= 0) {
        clearInterval(arr[index].timerId)
        this.setState({
          arr
        }, () => {
            // this.isStart(this.props.data.arr)
        })

        return
    }
    arr[index].poor = poor

    let hour = Math.floor(poor / 3600)
    poor = poor - hour * 3600
    let min = Math.floor(poor / 60)
    poor = poor - min * 60
    let sec = Math.floor(poor)

    item.time = `${hour < 10 ? '0' + hour : hour} : ${min < 10 ? '0' + min : min} : ${sec < 10 ? '0' + sec : sec}`

    arr[index].time = item.time
    this.setState({
      arr
    })

}


  render() {
    return (
      <View>
        {
          this.state.arr.map((item: any) => <View className="groupon-end-time">{item.time}</View>)
        }
      </View>
      
    );
  }
}
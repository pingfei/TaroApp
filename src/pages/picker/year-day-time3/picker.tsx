import Taro, { Component, Config } from '@tarojs/taro'
import { View, Picker, Text } from '@tarojs/components'
import './picker.scss'

// 范围9：00-16：00，预约时间是当前时间的 3小时后，若时间不足3小时，则显示第二天早上9点
export default class Index extends Component<any, any> {

  state = {
    seriesList: [], // 设备类别
    productSeries: '',
    showMultiArray: [], // 时间选择器显示的时间
    ymdArr: [], // 年月日的数组
    selectDate: ''
  }
  componentDidMount() {
    this.initPickerTime() // 初始化时间选择器的时间
  }
  nowHour: number = new Date().getHours() // 当前的小时数
  nowMinute: number = new Date().getMinutes() // 当前的分钟数
  range: number = 3 // 多少小时后
  startTime: number = 9 // 开始的小时
  endTime: number = 16 // 结束的小时


  // 时间选择器 start ===================
  // 初始化时间选择器的时间
  initPickerTime() {
    let ymdArr = this.pickerDay()
    let YMD = JSON.parse(JSON.stringify(ymdArr))
    let showYMD = YMD.map((item, index) => {
      if (this.nowHour >= this.endTime - this.range) {
        if (index == 0) {
          return '明天'
        } else {
          return item.slice(5)
        }
      } else {
        
        if (index == 0) {
          return '今天'
        } else if (index == 1) {
          return '明天'
        } else {
          return item.slice(5)
        }
      }
    })
    let showHours = this.pickerHour()
    this.setState({
      showMultiArray: [showYMD, showHours],
      ymdArr
    })
  }

  // 月-日
  pickerDay() {
    let ymdArr: Array<string> = []
    let nowTime = new Date()
    // let month = nowTime.getMonth()+1
    // 当前时间点 hour 超过 13点，那么取后一天
    if (this.nowHour >= this.endTime - this.range ) {
      let d = nowTime.getDate()
      nowTime = new Date(nowTime.setDate(d+1))
    }
    for (let i = 0; i <= 28; i++) {
      let day = nowTime.getDate()
      let y = nowTime.getFullYear()
      let m = nowTime.getMonth() + 1
      let d = nowTime.getDate()

      let ymd = y + '/' + m + '/' + d
      ymdArr.push(ymd)
      nowTime.setDate(day + 1)
    }
    return ymdArr
  }

  // 小时
  pickerHour(num = 0) {
    let date = new Date()
    // let hour = date.getHours() + 1
    let hour = date.getHours() + this.range + 1
    let showHours: Array<string> = []
    // 只有当天(num = 0 或 num = undefined)时间点在 30分前(this.nowMinute <= 30)才会执行 生成30分的时间点，
    // 如 8:26，会生成11:30
    if (!num && this.nowMinute <= 30) {
      
      if (hour > this.startTime) {
        if (hour < 10) {
          showHours.push("0" + (hour-1) + ':30')
          
        } else if (hour <= this.endTime) { 
          showHours.push(hour-1 + ':30')
        }
      }
    }
    // 选择器第一列不是第一个，
    // 或 当前小时+4 小于9，则从9 开始遍历
    // 或 当前小时 大于13，则从第二天的9 开始遍历
    if (num || hour <= this.startTime || this.nowHour >= this.endTime - this.range) {
      hour = this.startTime
    }
    for (let i = hour; i <= this.endTime; i++) {
      if (i < 10) {
        showHours.push("0" + i + ':00')
        showHours.push("0" + i + ':30')
      } else {
          showHours.push(i + ':00')
        if (i < this.endTime) {
          showHours.push(i + ':30')
        }
      }
    }
    return showHours
  }

  // 选择器列滚动事件
  columnChange(e) {
    let col = e.detail.column
    let value = e.detail.value
    let showMultiArray: Array<Array<string>> = this.state.showMultiArray
    if (col == 0) {
      showMultiArray[1] = this.pickerHour(value)
      this.setState({
        showMultiArray
      })
    }
  }

  //服务时间选择
  changeDate = e => {
    let showMulti = this.state.showMultiArray

    let ymdArr = this.state.ymdArr
    let showmd = showMulti[0][e.target.value[0]] // 选择的 月-日
    let showh = showMulti[1][e.target.value[1]] // 选择的小时
    let ymd = ymdArr[e.target.value[0]] // 年-月-日

    let year: any = ''
    let date = ymd + " " + showh // 传给后台的时间

    let today = new Date()
    if (showmd != "今天" && showmd != "明天") {
      year = today.getFullYear() + '/'
    }
    let selectDate = year + showmd + " " + showh; // 显示时间
    this.setState({
      date: new Date(date),
      selectDate
    })
  }
  // 时间选择器 end ===================

  changeProductiDate(e) {
    this.props.onChangeProductiDate(e.detail.value)
  }

  render () {
    return (
      <View>
        <View className="info-item">
          <View className="item-title">预约时间</View>
          <Picker
            mode='multiSelector'
            range={this.state.showMultiArray}
            value={[0, 0]}
            onChange={this.changeDate.bind(this)}
            onColumnChange={this.columnChange.bind(this)}
          >
            <View className={this.state.selectDate ? "item-content" : "item-content color999"}>
              {this.state.selectDate ? this.state.selectDate : "请选择 >"}
            </View>
          </Picker>
        </View>
      </View>
    )
  }
}
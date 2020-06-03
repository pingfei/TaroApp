import Taro, { Component, Config } from '@tarojs/taro'
import { View, Picker } from '@tarojs/components'
import './picker.scss'

export default class Index extends Component {

  config: Config = {
    navigationBarTitleText: '时间点'
  }

  state = {
    showMultiArray: [], // 时间选择器显示的时间
    ymdArr: [], // 年月日的数组
    selectDate: '', // 选中的时间
    prevIndex: 0 // 选择前的 第一列的index
  }

// 时间选择器 start ===================
  componentDidShow () {
    this.initPickerTime()
  }
  initPickerTime() {
    let ymdArr = this.pickerDay()
    let YMD = JSON.parse(JSON.stringify(ymdArr))
    YMD[0] = '今天'
    YMD[1] = '明天'
    let showYMD = YMD.map((item, index)=>{
      if (index == 0) {
        return '今天'
      } else if (index == 1) {
        return '明天'
      } else {
        return item.slice(5)
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
    let nowTime = new Date();
    let month = nowTime.getMonth()+1
    for (let i = 0; i <= 28; i++) {
      let day = nowTime.getDate()
      let y = nowTime.getFullYear()
      let m = nowTime.getMonth()+1
      let d = nowTime.getDate()
      
      let ymd = y + '/' + m + '/' + d
      // let ymd =  m + '/' + d
      ymdArr.push(ymd)
      nowTime.setDate(day+1)
    }
    return ymdArr
  }
  // 小时
  pickerHour (num = 0) {
    let date = new Date();
    let hour = date.getHours();
    let showHours: Array<string> = []
    if (num) {
      hour = 0
    }
    for (let i = hour+1; i < 24; i++) {
      if (i < 10) {
        showHours.push("0" + i + "时");
      } else {
        showHours.push(i + "时");
      }
    }
    return showHours
  }
  // 选择器列滚动事件
  columnChange(e) {
    let col = e.detail.column
    let index = e.detail.value
    let arr
    let showMultiArray = this.state.showMultiArray
    if (col == 0) {
      let flag = 0 // 判断是否要初始化 小时列表  0：初始化，非0：不初始化
      let prevIndex = this.state.prevIndex
      
      if (index) { // 当前选择的index； index != 0
        flag = prevIndex / index
      } else { // index == 0
        flag = 0
      }
      if (flag) return
      showMultiArray[1] = this.pickerHour(index)
      this.setState({
        showMultiArray
      })
      this.setState({
        prevIndex: index
      })
    }
  }

  //服务时间选择
  onChangeDate = e => {
    let showMulti = this.state.showMultiArray

    let ymdArr = this.state.ymdArr
    let showmd = showMulti[0][e.target.value[0]] // 选择的 月-日
    let showh = showMulti[1][e.target.value[1]].slice(0, -1) // 选择的小时

    let ymd = ymdArr[e.target.value[0]] // 年-月-日

    let year:any = '';
    let date =  ymd + " " + showh + ':00'; // 传给后台的时间


    let today = new Date()
    if (showmd != "今天" && showmd != "明天") {
      year = today.getFullYear() + '/'
    }
    let selectDate = year + showmd + " " + showh + ':00'; // 显示时间
    this.setState({
      date: new Date(date),
      selectDate: selectDate
    })
  }
  // 时间选择器 end ===================



  render () {
    return (
      <View className='index'>
        <View className="info-item">
          <View className="item-title">预约时间</View>
          <Picker 
            mode='multiSelector' 
            range={this.state.showMultiArray} 
            value={[0, 0]} 
            onChange={this.onChangeDate.bind(this)} 
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

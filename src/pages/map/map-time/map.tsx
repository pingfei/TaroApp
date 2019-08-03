import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, Map, Button, Picker } from '@tarojs/components'
import './map.scss'
import mapIcon from '../../../assets/images/mapicon.png'
const QQMapWX: any = require("../../../utils/qqmap-wx-jssdk.min.js");
let qqmapskd;

export default class Index extends Component {
  constructor () {
    super()
    this.state = {
      markers: [
        {
          iconPath: mapIcon,
          id: 0,
          latitude: 30.277531,
          longitude: 120.045258,
          width: 36,
          height: 44
        }, {
          iconPath: mapIcon,
          id: 0,
          latitude: 30.285509,
          longitude: 120.035362,
          width: 36,
          height: 44,
          callout: {
            content: '预计10分钟后到达',
            color: '#000',
            borderRadius: '5px',
            display: 'ALWAYS',
            padding: '5',
            borderWidth: '1',
            borderColor: 'block'
          }
        }
      ],
      latitude:30.285509,
      longitude: 120.035362,


      showMultiArray: [], // 时间选择器显示的时间
      selectDate: '',
      ymdArr: [], // 年月日的数组
      date: '' // 传给后端的中国标准时间
    }
  }

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: '首页'
  }

  componentWillMount () { }

  componentDidMount () {
    qqmapskd = new QQMapWX({
      key: 'SMZBZ-P5MRG-PDWQY-IMVSQ-EHPI3-LOBAI'
    })
    qqmapskd.geocoder({
      address: '浙江省杭州市余杭区五常街道广福寺',
      success (res) {
        console.log(res)
      }
    })
  }

  componentWillUnmount () { }

  componentDidHide () { }

  goTosignature() {
    Taro.navigateTo({
      url: '/pages/signature/signature'
    })
  }

  changePosition () {
    let markers = this.state.markers
    markers[0].latitude =  31.277531
    this.setState({
      markers
    })
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
      nowTime.setDate(day+1)
      let y = nowTime.getFullYear()
      let m = nowTime.getMonth()+1
      let d = nowTime.getDate()

      let ymd = y + '/' + m + '/' + d
      // let ymd =  m + '/' + d
      ymdArr.push(ymd)
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
    let value = e.detail.value
    let arr
    let showMultiArray = this.state.showMultiArray
    if (col==0) {
      showMultiArray[1] = this.pickerHour(value)
      this.setState({
        showMultiArray
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
        <Map id="map" className="map" markers={this.state.markers} latitude={this.state.latitude} longitude={this.state.longitude}/>
        <Button className='bottom-primary-btn add-btn primary-btn text-size-30' onClick={this.changePosition.bind(this)}>新增</Button>
      </View>
    )
  }
}

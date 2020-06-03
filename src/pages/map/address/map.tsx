import Taro , { Component, Config } from '@tarojs/taro';
import { View , Button, Textarea} from '@tarojs/components';
import './map.scss';

var cityJson = require('./data-city');
var autoAddress = require('./auto');

export default class Address extends Component {

  config: Config = {
    navigationBarTitleText: '智能地址识别'
  }

  state = {
    cityData: cityJson.cityData,
    province: '',
    provinceId: '',
    city: '',
    cityId: '',
    county: '',
    countyId: '',
    name: '',
    mobile: '',
    value: [0, 0, 0],
    address: '',
    selectRegion: '',
    textarea: '浙江省杭州市西湖区翠苑街道文一路888号 物美超市 15812345678 码云'
  }

  componentDidMount () {
    autoAddress.getData();
  } 

  autoAddressHandle() {
    let add = autoAddress.method(this.state.textarea)
    console.log('解析后的地址 add: ', JSON.parse(JSON.stringify(add)))

    let { province, provinceCode, city, cityCode, county, countyCode, name, mobile, address } = add
    console.log()
    this.setState({ province, provinceCode, city, cityCode, county, countyCode, name, mobile, address })

  }

  changeTextarea(e) {
    this.setState({
      textarea: e.detail.value
    })
  }

  // initCityData({ provinceIndex = 0, cityIndex = 0, districtIndex = 0, data = { provinceVO : {}, cityVO: {}, districtVO: {}} }) {
  //   let cityData = JSON.parse(JSON.stringify(cityJson.cityData))


  //   let provinceList: Array<any> = []
  //   let cityList: Array<any> = []
  //   let districtList: Array<any> = []
  //   this.state.cityData.forEach((item, index) => {
  //     let model: any = {}
  //     model.code = item.code
  //     model.name = item.name
  //     if (item.code == data.provinceVO.id) {
  //       cityIndex = index
  //     }
  //     provinceList.push(model)
  //   });
  //   this.state.cityData[provinceIndex].children.forEach((item, index) => {
  //     let model: any = {}
  //     model.code = item.code
  //     model.parentCode = this.state.cityData[provinceIndex].code
  //     model.name = item.name
  //     if (item.code == data.cityVO.id) {
  //       cityIndex = index
  //     }
  //     cityList.push(model)
  //   });
  //   this.state.cityData[provinceIndex].children[cityIndex].children.forEach((item, index) => {
  //     let model: any = {}
  //     model.code = item.code
  //     model.name = item.name
  //     model.parentCode = this.state.cityData[provinceIndex].children[cityIndex].code
  //     if (item.code == data.districtVO.id) {
  //       cityIndex = index
  //     }
  //     districtList.push(model)
  //   });


  //   this.setState({
  //     provinceList: provinceList,
  //     cityList: cityList,
  //     districtList: districtList,
  //   })


  //   this.setState({
  //     cityData
  //   })
  // }

  render() {
    return (
      <View>

        <View className="flex">
          <View>姓名</View>
          <View>{this.state.name}</View>
        </View>

        <View className="flex">
          <View>手机号</View>
          <View>{this.state.mobile}</View>
        </View>

        <View className="flex">
          <View>省</View>
          <View>{this.state.province}</View>
        </View>

        <View className="flex">
          <View>市</View>
          <View>{this.state.city}</View>
        </View>

        <View className="flex">
          <View>区</View>
          <View>{this.state.county}</View>
        </View>

        <View className="flex">
          <View>详细地址</View>
          <View>{this.state.address}</View>
        </View>

        <Textarea className="textarea" value={this.state.textarea} onInput={this.changeTextarea.bind(this)}></Textarea>

        <Button onClick={this.autoAddressHandle.bind(this)}>识别</Button>
      </View>
    );
  }
}
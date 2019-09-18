import Taro , { Component } from '@tarojs/taro';
import { View, Button, Map} from '@tarojs/components';
import './map.scss'
import mapIcon from '../../../assets/images/mapicon.png'
const QQMapWX: any = require("../../../utils/qqmap-wx-jssdk.min.js");
let qqmapskd;

export default class MapPosition extends Component {
  config = {
    navigationBarTitleText: '定位'
  }

  state = {
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
  }

  componentDidMount () {
    this.mapCtx = Taro.createMapContext('map')
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
  moveToLocation() {
    console.log('adf')
    this.mapCtx.moveToLocation({
      latitude: 30.277531,
      longitude: 120.045258
    })
  }
  render() {
    return (
      <View>
        <Map
          id="map" 
          className="map" 
          markers={this.state.markers} 
          latitude={this.state.latitude} 
          longitude={this.state.longitude}
          showLocation={true}
        />
        <Button className='bottom-primary-btn add-btn primary-btn text-size-30' onClick={this.moveToLocation}>定位</Button>
      </View>
    );
  }
}
import Taro, { Component, Config } from '@tarojs/taro'
import Index from './pages/index'

import './app.scss'

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

class App extends Component {

  config: Config = {
    pages: [
      'pages/index/index',
      
      // 地图
      'pages/map/index/index',
      'pages/map/map-time/map',
      'pages/map/map-position/map',

      // 选择器
      'pages/picker/index/index',
      'pages/picker/year-day-time/picker',

      // 分享
      'pages/share/index/index',
      'pages/share/canvas-share/share',

      // 签名
      'pages/signature/index/index',
      'pages/signature/signature-my/signature',
      'pages/signature/plugin-e/signature',
      'pages/signature/signature-baidu1/signature',
      'pages/signature/signature-baidu2/signature',

      // 菜单
      'pages/menu/index/index',
      'pages/menu/linkage-menu/menu',
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    },
    plugins: {
      signaturePlugin: {
        version: '0.1.3',
        provider: 'wxa36f86e29fb562eb'
      }
    }
  }

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    return (
      <Index />
    )
  }
}

Taro.render(<App />, document.getElementById('app'))

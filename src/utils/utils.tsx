import Taro from '@tarojs/taro'
export function request ({url, data, method, header = {}}) {
  Taro.showLoading({
    title: '加载中'
  })
  return new Promise((resolve, reject) => {
    Taro.request({
      data,
      url: url,
      method,
      // header,
      header: {
        'Cookie': 'sessionid=' + Taro.getStorageSync('sessionid') + '; ' + '_united_id=' + Taro.getStorageSync('unitedid') + '; ',
        'Authorization': Taro.getStorageSync('Authorization')
      },
      success (res) {
        Taro.hideLoading()
        resolve(res)
        // resolve(res.data.results)
      },
      fail (err) {
        Taro.hideLoading()
        reject(err)
      },
      complete () {
        Taro.hideLoading()
      }
    })
  })
}



export function request2({url, data, method, header}) {
  return new Promise((resolve, reject) => {
    Taro.request({
      url,
      data,
      method,
      header,
      success (res) {
        resolve(res)
      },
      fail(err) {
        reject(err)
      },
      complete() {
        console.log('complete')
      }
    })
  })
}
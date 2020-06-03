import Taro from '@tarojs/taro'

var addressList:any = []; //地址列表
let address = ''

console.log("正在加载省市区数据...");

const wx_getaddress = () => {
  return new Promise((resolve, reject) => {
    let array:any = [];
    let index = 0;
    let length = 7;
    // console.log('共计' + length + '条数据')
    for (let i = 0; i < length; i++) {
      if (Taro.getStorageSync(i + "")) {
        index++;
        // console.log('第' + index + '条数据在缓存中读取完毕')
        array = [...array, ...JSON.parse(Taro.getStorageSync(i + ""))];
        if (index == length) {
          resolve(array);
        }
      } else {
        setTimeout(() => {
          Taro.request({
            url: "http://wangzc.wang:1337/" + i,
            method: "GET",
            success: function(res) {
              index++;
              Taro.setStorage({
                key: i + "",
                data: JSON.stringify(res.data)
              });
              //  console.log('第' + index + '条数据加载完毕')
              array = [...array, ...res.data];
              if (index == length) {
                resolve(array);
              }
            }
          });
        }, 2000 * i);
      }
    }
  });
};

function getData() {
  wx_getaddress().then(res => {
    addressList = res;
    addressList.forEach(item => {
      formatAddresList(item, 1, "");
    });
    console.log("省市区数据挂载完毕！！");
  });
}

getData();

/**
 * 地址数据处理
 * @param addressList-各级数据对象
 * @param index-对应的省/市/县区/街道
 * @param province-只有直辖市会处理为  北京市北京市
 * @returns <array>
 */
function formatAddresList(addressList, index, province) {
  if (index === 1) {
    //省
    addressList.province = addressList.name;
  }
  if (index === 2) {
    //市
    if (addressList.name == "市辖区") {
      addressList.name = province.name;
    }
    addressList.city = addressList.name;
  }
  if (index === 3) {
    //区或者县
    addressList.county = addressList.name;
  }
  if (index === 4) {
    //街道
    addressList.street = addressList.name;
  }
  if (addressList.children) {
    index++;
    addressList.children.forEach(res => {
      formatAddresList(res, index, addressList);
    });
  }
}


var smartObj: any = {};
/**
 * 解析邮编
 * @param event识别的地址
 * @returns <obj>
 */
function smart(event) {
  smartObj = {}
  tempProvinceArr = []
  matchCity = []
  matchCounty = []
  matchStreet = []
  event = stripscript(event); //过滤特殊字符

  // 解析手机， 并返回 除手机外的地址信息
  address = matchMobile(event)

  _matchAddress()

  console.log('最后 解析出来的 对象：', smartObj)
  if (!smartObj.county && smartObj.city) {
    let child = smartObj.cityObj.children[0]
    smartObj.county = child.county
    smartObj.countyCode = child.code
    smartObj.countyObj = child
  }
  address = ''
  return smartObj
}

////过滤特殊字符
function stripscript(s) {
  s = s.replace(/(\d{3})-(\d{4})-(\d{4})/g, "$1$2$3");
  s = s.replace(/(\d{3}) (\d{4}) (\d{4})/g, "$1$2$3");
  var pattern = new RegExp(
    "[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“’。，、？]"
  );
  var rs = "";
  for (var i = 0; i < s.length; i++) {
    rs = rs + s.substr(i, 1).replace(pattern, " ");
  }
  rs = rs.replace(/[\r\n]/g, "");
  return rs;
}

// 解析手机号
function matchMobile(address) {
  let phoneReg = /(\+?86\-?)?1[0-9]{2}\-?[0-9]{4}\-?[0-9]{4}/g;
  let mobileArr = phoneReg.exec(address)
  let _mobile = ''
  let mobile = ''
  let index

  if (mobileArr) {
    _mobile = mobileArr[0]
    index = mobileArr.index
    let len = _mobile.length
    mobile = _mobile.replace(/(^\+?86)|\-/g, '')
    let addressArr = address.split('')
    addressArr.splice(index, len)
    address = address.replace(_mobile, ' ')
  }

  smartObj.mobile = mobile

  return address
}


// addressArr: ["杭州", "余杭", "五常街道241号杭州测试有限公司", "马云"]
function _matchAddress() {

  if (!smartObj.province) {
    console.log(111)
    _matchProvince()
  }
  if (!smartObj.city) {
    console.log(222)
    _matchCity()
  }
  if (!smartObj.county) {
    console.log(333)
    _matchCounty()
  }
  if (!smartObj.street) {
    console.log(444)
    _matchStreet()
  }
  _matchName()

}

// 解析省
// 临时省 数组
let tempProvinceArr: any[] = []
function _matchProvince() {
  let copyAddress = address.replace(/^\s+/, ' ').split(/\s+/g)[0]
  let subAddress = ''
  let len = copyAddress.length

  for (let endIndex = len; endIndex >= 2 ; endIndex--) {

    // 筛选的关键字
    subAddress = copyAddress.slice(0, endIndex);
    addressList.forEach((item: any) => {
      if (item["province"].indexOf(subAddress) != -1) {
        tempProvinceArr.push({
          province: item.province,
          provinceCode: item.code,
          matchValue: subAddress,
          provinceObj: item
        });

      }
    });
  }

  //统计筛选初略统计出的省份
  tempProvinceArr.forEach(res => {
    res.index = 0;
    tempProvinceArr.forEach(el => {
      if (res.province == el.province) {
        el.index++;
        if (res.matchValue.length > el.matchValue.length) {
          el.matchValue = res.matchValue;
        }
      }
    });
  });
  if (tempProvinceArr.length != 0) {
    let province = tempProvinceArr.reduce((p, v) => (p.index < v.index ? v : p));
    console.log('province: ', province)
    smartObj.province = province.province;
    smartObj.provinceCode = province.provinceCode;
    smartObj.provinceObj = province.provinceObj;
    address = address.replace(province.matchValue, " ")
  }
}
// 解析市
function _matchCity() {
  let copyAddress = address.replace(/^\s+/, '').split(/\s+/g)[0]
  let subAddress = ''
  let len = copyAddress.length
  let matchCity:any = []; //粗略匹配上的市

    for (let endIndex = len; endIndex >= 2; endIndex--) {
      subAddress = copyAddress.slice(0, endIndex);
      if (smartObj.provinceCode) {
        // 有 省份
        matchCity = _matchCityHandle(smartObj.provinceObj, subAddress)
      } else {
        // 没有 省份
        addressList.forEach(province => {
          matchCity = _matchCityHandle(province, subAddress)
        })
      }

    }

  
    //统计筛选初略统计出的市
    matchCity.forEach(res => {
      res.index = 0;
      matchCity.forEach(el => {
        if (res.city == el.city) {
          el.index++;
          if (res.matchValue.length > el.matchValue.length) {
            el.matchValue = res.matchValue;
          }
        }
      });
    });
    if (matchCity.length != 0) {
      let city = matchCity.reduce((p, v) => (p.index < v.index ? v : p));
      smartObj.city = city.city;
      smartObj.cityCode = city.cityCode;
      smartObj.county = city.county;
      smartObj.countyCode = city.countyCode;
      smartObj.cityObj = city.cityObj;
      if (!smartObj.province) {
        smartObj.province = city.province;
        smartObj.provinceCode = city.provinceCode;
      }
      address = address.replace(city.matchValue, " ");
    }
}

let matchCity: any[] = []
function _matchCityHandle(parent: any, key: string) {
  parent.children.forEach(child => {
    if (child["city"].indexOf(key) != -1) {
      matchCity.push({
        city: child.city,
        cityCode: child.code,
        matchValue: key,
        province: parent.province,
        provinceCode: parent.code,
        provinceObj: parent,
        cityObj: child
      });
    }
  });
  return matchCity
}
// 解析区
function _matchCounty() {
  let copyAddress = address.replace(/^\s+/, '').split(/\s+/g)[0]
  let subAddress = ''
  let len = copyAddress.length
  let matchCounty:any = []; //粗略匹配上的区

  for (let endIndex = len; endIndex >= 2; endIndex--) {
    subAddress = copyAddress.slice(0, endIndex);
    if (smartObj.cityCode) {
      // 有 市
      matchCounty = _matchCountyHandle(smartObj.cityObj, subAddress)
    } else if (smartObj.provinceCode) {
      // 没有 市, 有 省份
      smartObj.provinceObj.children.forEach(city => {
        matchCounty = _matchCountyHandle(city, subAddress, city)
      })
    } else {
      // 没有 省份, 没有 市
      addressList.forEach(province => {
        province.children.forEach(city => {
          matchCounty = _matchCountyHandle(city, subAddress, province)
        })
      })
    }

  }


    //统计筛选初略统计出的区县
    matchCounty.forEach(res => {
      res.index = 0;
      matchCounty.forEach(el => {
        if (res.city == el.city) {
          el.index++;
          if (res.matchValue.length > el.matchValue.length) {
            el.matchValue = res.matchValue;
          }
        }
      });
    });
    if (matchCounty.length != 0) {
      let county = matchCounty.reduce((p, v) => (p.index < v.index ? v : p));
      smartObj.county = county.county;
      smartObj.countyObj = county.countyObj;
      smartObj.countyCode = county.countyCode;
      if (!smartObj.province) {
        smartObj.province = county.province;
        smartObj.provinceCode = county.provinceCode;
      }
      if (!smartObj.city) {
        smartObj.city = county.city;
        smartObj.cityCode = county.cityCode;
        smartObj.cityObj = county.cityObj;
      }
      address = address.replace(county.matchValue, " ");
    }
}
let matchCounty: any[] = []
function _matchCountyHandle(parent, key, grandPa = {}) {
  parent.children.forEach(child => {
    if (child["county"].indexOf(key) != -1) {
      let obj = {
        county: child.county,
        countyCode: child.code,
        countyObj: child,
        matchValue: key,
        city: parent.city,
        cityCode: parent.code,
        cityObj: parent,
        province: smartObj.province || grandPa.name,
        provinceObj: smartObj.provinceObj || grandPa,
        provinceCode: smartObj.code || grandPa.code
      }

      matchCounty.push(obj);
    }
  });
  return matchCounty
}


// 解析街道
function _matchStreet() {
  let copyAddress = address.replace(/^\s+/, '').split(/\s+/g)[0]
  let subAddress = ''
  let len = copyAddress.length
  let matchStreet:any = []; //粗略匹配上的街道


  for (let endIndex = len; endIndex >= 2; endIndex--) {
    subAddress = copyAddress.slice(0, endIndex);
    if (smartObj.countyCode) { 
      // 有 区
      matchStreet = _matchStreetHandle(smartObj.countyObj, subAddress)
    } else if (smartObj.cityCode) {
      // 有 市, 没有 区
      smartObj.cityObj.children.forEach(county => {
        matchStreet = _matchStreetHandle(county, subAddress)
      })
    } else if (smartObj.provinceCode) {
        smartObj.provinceObj.children.forEach(city => {
          city.children.forEach(county => {
            matchStreet = _matchStreetHandle(county, subAddress, city)
          })
        })
    }

  }

  //统计筛选初略统计出的区县
  matchStreet.forEach(res => {
    res.index = 0;
    matchStreet.forEach(el => {
      if (res.city == el.city) {
        el.index++;
        if (res.matchValue.length > el.matchValue.length) {
          el.matchValue = res.matchValue;
        }
      }
    });
  });

  if (matchStreet.length != 0) {
    let street = matchStreet.reduce((p, v) => (p.index < v.index ? v : p));
    smartObj.street = street.street;
    smartObj.streetCode = street.streetCode;
    smartObj.streetObj = street.streetObj;
    smartObj.city = street.city;
    smartObj.cityCode = street.cityCode;
    smartObj.cityObj = street.cityObj;
    smartObj.county = street.county;
    smartObj.countyCode = street.countyCode;
    smartObj.countyObj = street.countyObj;
    address = address.replace(street.matchValue, " ");
  }
}

let matchStreet: any = []
function _matchStreetHandle(parent, key, grandPa?: any) {
  parent.children.forEach(child => {
    if (child["street"].indexOf(key) != -1) {
      let obj = {
        street: child.name,
        streetCode: child.code,
        streetObj: child,
        county: parent.name,
        countyCode: parent.code,
        countyObj: parent,
        matchValue: key,
        city: smartObj.city || grandPa.name,
        cityCode: smartObj.cityCode || grandPa.code,
        cityObj: smartObj.cityObj || grandPa,
        province: smartObj.province,
        provinceCode: smartObj.provinceCode
      }
      matchStreet.push(obj);
    }
  });
  return matchStreet
}

function _matchName() {
  address = address.replace(/^\s+|\s+$/g, '')
  let copyAddress = address.split(/\s+/g)
  if (copyAddress.length > 1) {

    copyAddress.sort((a, b) => a.length - b.length)
    smartObj.name = copyAddress[0];
    address = (smartObj.street || '') + address.replace(smartObj.name, " ");
  } else {
    smartObj.name = address
  }
  smartObj.address = address.replace(/\s+/g, ' ')
}


module.exports = {
  method: smart,
  getData: getData
};

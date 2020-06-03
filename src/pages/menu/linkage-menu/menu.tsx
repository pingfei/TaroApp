import Taro, { Component, Config } from '@tarojs/taro'
import { View, Image, ScrollView } from '@tarojs/components'
import './menu.scss'
import menu from './data'

let flag = false; // 用于判断滚动前是否有点击操作
export default class Cat extends Component<any, any> {
  state = {
    catArray: [],
    catParentArray: [],
    catModel: {},
    selectIndex: 0,
    scrollHeight: 0
  }

  config: Config = {
    navigationBarTitleText: '商品分类'
  }

  // 点击左侧类目栏
  leftTap(e) {
    let scrollHeight = 0
    let index = e.currentTarget.dataset.index
    flag = true
    for(var i = 0;i < index; i++) {
      scrollHeight += Math.ceil(menu.cat[i].foods.length/3) * 99 + 60;
    }
    this.setState({
      scrollHeight,
      selectIndex: index
    })
  }
  // 右侧菜单滚动
  scroll(e) {
    let h = e.detail.scrollTop
    let scrollHeight = 0
    let selectIndex = this.state.selectIndex;
    for (var i =0; i<menu.cat.length; ) {
      scrollHeight += Math.ceil(menu.cat[i].foods.length/3) * 99 + 60;
      if (h < scrollHeight) {
        if (flag && selectIndex > i) {
          i = selectIndex
        }
        break
      } else {
        i++
      }
    }
    flag = false
    this.setState({
      selectIndex: i
    })
  }

  render() {
    return (<View className="cat-box">
      <View className="cat-main">

        <ScrollView 
          className="cat-left"
          scrollY={true} 
          scrollIntoView={".chose-cat"}
          scrollTop={this.state.selectIndex * 50} 
          scrollWithAnimation={true}
          >

          {
            menu.cat.map((item, index) => {
              return <View className={`cat-item  ${this.state.selectIndex == index ? "chose-cat" : ""}`} key={item.id} data-index={index} onClick={this.leftTap.bind(this)}>{item.name}</View>
            })
          }
        </ScrollView>

        <ScrollView 
          className="cat-detail-scroll" 
          scrollY={true} 
          scrollIntoView={"yellow"} 
          scrollTop={this.state.scrollHeight} 
          onScroll={this.scroll.bind(this)} 
          scrollWithAnimation={true}
        >
          {
            menu.cat.map((item, index) => {
              return <View className="cat-detail-main" key={item.id} ref={()=>'li'}>
                <View className="cat-title">{item.name}</View>
                <View className="cat-detail-box">
                  {
                    item.foods.map(cat => {
                      return <View className="cat-item" key={cat.id}>
                        <Image className="cat-img" src={cat.coverUrl}></Image>
                        <View className="cat-text">{cat.name}</View>
                      </View>
                    })
                  }
                </View>
              </View>
            })
          }
        </ScrollView>
      </View>
    </View>)
  }
}


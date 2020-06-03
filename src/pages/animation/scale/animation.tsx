import Taro , { Component } from '@tarojs/taro';
import { View, Button, Input } from '@tarojs/components';
import './animation.scss'

export default class InvoiceOpen extends Component<any, any> {
  state = {
    cate: false, // 判断是否显示 动画分类
    define: false, // 判断是否显示 动画的概念
    animationData: {}
  }

  duration: number = 300
  moving: boolean = false
  animation: any = Taro.createAnimation({
    duration: this.duration,
    timingFunction: 'ease'
  })

  showTips() {
    this.animation.opacity(0).scale(0.01).step({
      duration: 32,
      timingFunction: 'step-start',
    })
    this.animation.opacity(1).scale(1).step({
      duration: this.duration,
      timingFunction: 'ease',
    })
    this.setState({
      animationData: this.animation.export()
    },() => {
      setTimeout(() => {
        this.moving = false
      }, this.duration)
    })
  }
  hideTips(cb) {
    this.moving = true
    this.animation.scale(0.01).step({
      duration: this.duration,
      timingFunction: 'ease',
    })
    this.animation.opacity(0).step({
      duration: 32,
      timingFunction: 'step-start',
    })
    this.setState({
      animationData: this.animation.export()
    },() => {
      setTimeout(() => {
        this.moving = false
        cb && cb()
      }, this.duration)
    })
  }
  // 发票须知 显示、隐藏
  showInvoiceTips() {
    this.moving = true
    this.setState({
      cate: true
    }, () =>{
      this.showTips()
    })
  }
  hideInvoiceTips() {
    if (this.moving) return
    this.hideTips(() => {
      this.setState({
        cate: false
      })
    })
      
  }
  // 发票税号说明 显示、隐藏
  showTaxTips() {
    this.moving = true
    this.setState({
      define: true
    }, () =>{
      this.showTips()
    })
  }
  hideTaxTips() {
    if (this.moving) return
    this.hideTips(() => {
      this.setState({
        define: false
      })
    })
  }

  render() {
    return (
      <View>
        <View className="container">
          <Button className="margin50" onClick={this.showTaxTips}>动画的概念</Button>
          <Button onClick={this.showInvoiceTips}>动画分类</Button>
          
          {/* <Input/> */}
        </View>

        {/* 动画分类 */}
        {
          this.state.cate && <View className="tips">
            <View className="box" onClick={e => e.stopPropagation()} animation={this.state.animationData}>
              <View className="title">动画分类</View>
              <View className="content">
                <View>按工艺技术分为：平面手绘动画、立体拍摄动画、虚拟生成动画、真人结合动画；</View>
                <View>按传播媒介分为：影院动画、电视动画、广告动画、科教动画；</View>
                <View>按动画性质分为：商业动画、实验动画。</View>
              </View>
              <Button className="btn" onClick={this.hideInvoiceTips}>我知道了</Button>
            </View>
          </View>
        }

        {/* 动画的概念 */}
        { 
          this.state.define && <View className="tips">
            <View className="box" onClick={e => e.stopPropagation()} animation={this.state.animationData}>
              <View className="title">动画的概念</View>
              <View className="content">
                动画的概念不同于一般意义上的动画片，动画是一种综合艺术，它是集合了绘画、电影、数字媒体、摄影、音乐、文学等众多艺术门类于一身的艺术表现形式。最早发源于19世纪上半叶的英国，兴盛于美国，中国动画起源于20世纪20年代。动画是一门年轻的艺术，它是唯一有确定诞生日期的一门艺术，1892年10月28日埃米尔·雷诺首次在巴黎著名的葛莱凡蜡像馆向观众放映光学影戏，标志着动画的正式诞生，同时埃米尔·雷诺也被誉为“动画之父”。动画艺术经过了100多年的发展，已经有了较为完善的理论体系和产业体系，并以其独特的艺术魅力深受人们的喜爱。
              </View>
              <Button className="btn" onClick={this.hideTaxTips}>我知道了</Button>
            </View>
          </View>
        }
      </View>
    );
  }
}
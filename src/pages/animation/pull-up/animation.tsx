import Taro , { Component } from '@tarojs/taro';
import { View, Text, Button } from '@tarojs/components';
import './animation.scss';

export default class PullUpComponent extends Component<any, any> {
  state = {
    showSection: true,
    showService: false,
    showProblem: false,
    animationData: {}
  }

  duration: number = 400 // 动画执行时间
  animation: any = Taro.createAnimation({
    duration: this.duration,
    timingFunction: 'ease'
  });
  isMoving: boolean = false
  
  stopPropagation(e) {
    e.stopPropagation()
  }
  

  // 请填写您的预约信息 显示
  showSection() {
    if (this.isMoving) {return}
    this.isMoving = true
    this.animation.translateY('-100%').step()

    this.setState({
      showSection: true
    }, () => {
      this.setState({
        animationData: this.animation.export()
      })
      setTimeout(()=>{
        this.isMoving = false
      }, this.duration)
    })
  }

  // 请填写您的预约信息 隐藏
  hideSection(flag?: boolean) {
    if (this.isMoving) return
    this.isMoving = true
    this.animation.translateY('0').step()
    this.setState({
      animationData: this.animation.export()
    }, () => {
      setTimeout(() => {
        this.setState({
          showSection: false
        })
        this.isMoving = false
      }, this.duration)
    })
  }

  showKnList() {
    if (this.isMoving) return
    this.hideBefore()
    this.setState({
      animationData: this.animation.export()
    }, () => {
      setTimeout(() => {
        this.setState({
          showSection: false,
          showService: true
        }, () => {
          this.showAnimation()
        })
      }, this.duration)
    })
  }
  hideKnList() {
    if (this.isMoving) return
    this.hideNow()
    this.setState({
      animationData: this.animation.export()
    }, () => {
      setTimeout(() => {
        this.setState({
          showService: false,
          showSection: true
        }, () => {
          this.animation.translateY('-100%').step({
            delay: this.duration
          })
          this.setState({
            animationData: this.animation.export()
          })
          this.isMoving = false
        })
      }, this.duration)
    })
  }

  showFaultList() {
    if (this.isMoving) return
    this.hideBefore()
    this.setState({
      animationData: this.animation.export()
    }, () => {
      setTimeout(() => {
        this.setState({
          showSection: false,
          showProblem: true
        }, () => {
          this.showAnimation()
        })
      }, this.duration)
    })
  }
  hideFaultList() {
    if (this.isMoving) return
    this.hideNow()
    this.setState({
      animationData: this.animation.export()
    }, () => {
      setTimeout(() => {
        this.setState({
          showProblem: false,
          showSection: true
        }, () => {
          this.animation.translateY('-100%').step({
            delay: this.duration
          })
          this.setState({
            animationData: this.animation.export()
          })
            this.isMoving = false
        })
      }, this.duration)
    })
  }
  

  // 关闭前一个弹窗
  hideBefore() {
    this.isMoving = true
    this.animation.translateY('0').step()
  }
  // 关闭当前弹窗
  hideNow() {
    this.isMoving = true
    this.animation.translateY('0').step({
      duration: this.duration
    })
  }
  // 弹出点击 时要的弹窗
  showAnimation() {
    this.animation.translateY('-100%').step({
      delay: this.duration
    })
    this.setState({
      animationData: this.animation.export()
    })
    this.isMoving = false
  }

  render() {
    let { showSection, showService, showProblem } = this.state
    return (
      <View className="pull-up">
        <Button onClick={this.showSection}>点击</Button>
        {/* 填写信息 */}
        {
          showSection && <View className="common section" onClick={this.stopPropagation} animation={this.state.animationData}>
            <View className="header">
              <Text className="title">填写信息</Text>
              <Text onClick={this.hideSection}>关闭</Text>
            </View>
            <View className="item" onClick={this.showKnList}>
              <Text>选择锁模力</Text>
            </View>

            <View className="item" onClick={this.showFaultList}>
              <Text>故障现象</Text>
            </View>

            <Button onClick={this.hideSection}>提交</Button>
          </View>
        }
        
        {/* 选择锁模力 */}
        {
          showService && <View className="common" onClick={this.stopPropagation} animation={this.state.animationData}>
            <View className="header" onClick={this.hideKnList}>
              <Text className="title">选择锁模力</Text>
              <Text className="iconfont">返回</Text>
            </View>
            <View className="kn-content">内容, 高: 400px</View>
            <Button onClick={this.hideKnList}>确定</Button>
          </View>
        }

        {/* 选择故障现象 */}
        {
          showProblem && <View className="common" onClick={this.stopPropagation} animation={this.state.animationData}>
            <View className="header" onClick={this.hideFaultList}>
              <Text className="iconfont">返回</Text>
              <Text className="title">选择故障现象</Text>
            </View>
            <View className="fault-content">内容, 高: 600px</View>
            <Button onClick={this.hideFaultList}>确定</Button>
          </View>
        }
      </View>
    );
  }
}
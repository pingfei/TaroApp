import Taro , { Component } from '@tarojs/taro';
import { View, Text, Button} from '@tarojs/components';
import './animation.scss'

export default class Animation extends Component {

  config = {
    navigationBarTitleText: ''
  }

  state = {
    animationData: {},
    show: false
  }

  componentWillMount () {}
  componentDidMount () {} 
  componentWillReceiveProps (nextProps,nextContext) {} 
  componentWillUnmount () {} 
  componentDidShow () {} 
  componentDidHide () {} 
  componentDidCatchError () {} 
  componentDidNotFound () {} 

  timer: any = null
  moving: boolean = false
  checkAnim() {
    if (!this.animation) {
      this.animation = Taro.createAnimation({
        duration: 1000,
        timingFunction: 'ease',
        transformOrigin: '50% 50%'
      })
    }
  }
  animation: any = Taro.createAnimation({
    duration: 1000,
    timingFunction: 'ease',
    transformOrigin: '50% 50%'
  })
  move1() {
    this.checkAnim()
    this.animation.translateX(100).step()
    this.animation.translateY(100).step()
    this.setState({
      animationData: this.animation.export()
    }, () => {

    })
  }
  move2() {
    // clearTimeout(this.timer)
    if (this.moving) {return}
    // this.checkAnim()
    this.moving = true
    // this.animation = Taro.createAnimation({
    //   duration: 1000,
    //   timingFunction: 'ease',
    //   transformOrigin: '50% 50%'
    // })
    this.animation.translateY('-100%').step()

    this.setState({
      show: true
    }, () => {
      this.setState({
        animationData: this.animation.export()
      })
      setTimeout(()=>{
        this.moving = false
      },1000)
      // this.animation = null
    })
  }
  move3() {
    if (this.moving) {return}
    // this.checkAnim()
    this.moving = true
    // this.checkAnim()
    this.animation.translateY('0').step()
    this.setState({
      animationData: this.animation.export()
    }, () => {
      this.timer = setTimeout(() => {

        this.setState({
          show: false
        })
        this.moving = false
        this.timer = null
      }, 1000)
    })
  }
  render() {
    return (
      <View className="box">
        <View className="parent">

          {
            this.state.show && <View className="child" animation={this.state.animationData}>asdflasdj fjkhalksd hfklash dfklahsd kfak sjdf hkajh sd</View>
          }
        </View>
        <Button onClick={this.move1}>先向右后向下移动</Button>
        <Button onClick={this.move2}>先向上移动</Button>
        <Button onClick={this.move3}>先向下移动</Button>
      </View>
    );
  }
}
import Taro , { Component } from '@tarojs/taro';
import { View, Text, Button, Input, Textarea } from '@tarojs/components';
import './code.scss'
import { throttle } from '../../../utils/throttle'
import { trim } from '../../../utils/utils'

export default class LoginModal extends Component<any, any> {

  config = {
    navigationBarTitleText: ''
  }

  state = {
    count: 60,
    mobile: '11111111111',
    code: '',
    animationData: [],
    showCode: true,
    showLogin: true,
    animationData2: []
  }
  showModal() {
    this.setState({
      showLogin: true
    })
  }
  hideModal(e?: any) {
    if (e && e.type == 'tap') {
      clearTimeout(this.timer)
    }
    this.setState({
      count: 60,
      mobile: '11111111111',
      code: '',
      animationData: [],
      showCode: true,
      showLogin: false
    })
  }

  
  inputMobile (e) {
    this.setState({
      mobile: trim(e.detail.value)
    })
  }

  shortMsgPost(e) {
    e.stopPropagation()
    if(this.state.count>0 && this.state.count<60){
      Taro.showToast({
        title: '短信发送太频繁，请1分钟后再试',
        icon: 'none',
        duration: 2000
      })
      return
    }
    let checkRes = this.checkMobile();
    if (!checkRes) {
      return false;
    }

    this.setState({
      showCode: true
    }, () => {

      this.changeModal(-1)
    })
  }

  //倒计时
  countNumber(timer: any) {
    this.setState(prev => {
      if (prev.count > 0) {
        return {
          count: --prev.count
        }
      } else {
        clearInterval(timer);
        return {
          count: 60
        }
      }
    })
  }
  // 检验手机
  checkMobile() {
    let alertMsg = (msg) => {
      Taro.showToast({
        title: msg,
        icon: 'none',
        duration: 2000
      })
    }
    let mobile = this.state.mobile
    let mobileReg = /^1\d{10}$/
    if (!mobile) {
      alertMsg('请输入手机号！')
      return false
    }
    if (!mobileReg.test(mobile)) {
      alertMsg('手机号格式不正确！')
      return false
    }
    return true
  }

  inputCode (e) {
    this.setState({
      code: trim(e.detail.value)
    })
  }

  changeModal(directe, e?) {
    e && e.stopPropagation && e.stopPropagation()
    if (e && e.type == 'tap') {
      clearTimeout(this.timer)
    }
    let animation: any = Taro.createAnimation({
      duration: 2000,
      timingFunction: 'ease', 
    });
    let num = directe * 295
    if (!directe) {
      setTimeout(() => {
        this.setState({
          showCode: false
        })
      }, 1000)
    }
    animation.translateX(num).step();
    this.setState({
      animationData: animation.export()
    })
  }
  getCurrentPage() {
    let pages = Taro.getCurrentPages()
    let len = pages.length
    let page = pages[len - 1]
    let route = page.route
    let options = page.options
    let url = '/' + route

    let search = ''
    for (let tmp in options) {
      search += `${tmp}=${options[tmp]}&`
    }
    if (search) {
      url += '?' + search.slice(0, -1)
    }
    return url
  }
  
  checkHasNull () {
    let { code } = this.state
    let alertMsg = (msg) => {
      Taro.showToast({
        title: msg,
        icon: 'none',
        duration: 2000
      })
    }
    let codeReg = /^\d{4}$/
    if (!code) {
      alertMsg('请输入验证码！')
      return false
    }
    if (!codeReg.test(code)) {
      alertMsg('验证码格式不正确！')
      this.setState({
        code: ''
      })
      return false
    }


    return true
  }
  timer: any
  login (e) {
    e.stopPropagation()
    this.timer = setTimeout(() => {
      this.loginHandle()
    }, 500)
  }
  loginHandle() {
    let hasNull = this.checkHasNull()

    if (!hasNull) return

    Taro.showToast({
      title: '发送登录请求',
      icon: 'none',
      duration: 2000
    })
  }
  changeInput() {
    // let animation: any = Taro.createAnimation({
    //   duration: 2000,
    //   timingFunction: 'ease', 
    // });
    // let num = directe * 295
    // if (!directe) {
    //   setTimeout(() => {
    //     this.setState({
    //       showCode: false
    //     })
    //   }, 1000)
    // }
    // animation.translateX(num).step();
    // this.setState({
    //   animationData2: animation.export()
    // })
  }

  render() {
    let { count, mobile, code, showCode } = this.state
    return (
      <View>
        <Button onClick={this.showModal}>登录</Button>
        { 
          this.state.showLogin &&<View className="login-box" onTouchMove={(e) => {e.stopPropagation()}}  onClick={this.hideModal}>
            <View className="login-modal" onClick={(e) => {e.stopPropagation()}}>
              <View className="modal-box" animation={this.state.animationData}>

                <View className="modal input-mobile">
                  <View className="modal-title">
                    <View className="back">
                    </View>
                    <View className="text">快捷登录</View>
                    <View className="close" onClick={this.hideModal}>
                      <Text className="iconfont">关闭</Text>
                    </View>
                  </View>
                  <View className="form">
                    <Input
                      className="input"
                      type="number"
                      placeholderClass="placeholder"
                      placeholder="请输入手机号"
                      onInput={this.inputMobile}
                      value={this.state.mobile}
                    />
                    <Button className="btn new-step" onClick={this.shortMsgPost}>下一步</Button>
                    {/* <Button className="btn new-step" onClick={this.changeModal.bind(this,-1)}>下一步</Button> */}
                  </View>
                  <View className="footer">
                    <Text>首次登录将自动注册，注册则代表您同意</Text>
                    <Text className="agreement">《助塑宝用户协议》</Text>
                  </View>
                </View> 
                {
                  showCode && <View className="modal input-code">
                    <View className="modal-title">
                      <View className="back" onClick={this.changeModal.bind(this, 0)}>
                        <Text className="iconfont">返回</Text>
                      </View>
                      <View className="text">输入验证码</View>
                      <View className="close" onClick={this.hideModal}>
                        <Text className="iconfont">关闭</Text>
                      </View>
                    </View>
                    <View className="text-1">验证码已发送至 {mobile}</View>
                    <View className="text-2">{count}s后重试</View>
                    {/* <View className="form">
                      <View className="code-view">
                        <View className={"code-item " + (code.length == 0 ? 'active' : '')}>{code.slice(0, 1)}</View>
                        <View className={"code-item " + (code.length == 1 ? 'active' : '')}>{code.slice(1, 2)}</View>
                        <View className={"code-item " + (code.length == 2 ? 'active' : '')}>{code.slice(2, 3)}</View>
                        <View className={"code-item " + (code.length == 3 ? 'active' : '')}>{code.slice(3, 4)}</View>
                        <Input 
                          id="input"
                          key='input'
                          type="number"
                          // className={"code code-" + (code.length-1)}
                          className="code"
                          maxLength={4}
                          value={code}
                          onInput={this.inputCode}
                          confirmHold={true}
                          focus={!(code.length == 4)}
                          onBlur={this.login}
                        />
                      </View>
                    </View> */}
                    <View className="form-2">
                      <View className="code-view">
                        <View className={"code-item " + (code.length == 0 ? 'active' : '')}>{code.slice(0, 1)}</View>
                        <View className={"code-item " + (code.length == 1 ? 'active' : '')}>{code.slice(1, 2)}</View>
                        <View className={"code-item " + (code.length == 2 ? 'active' : '')}>{code.slice(2, 3)}</View>
                        <View className={"code-item " + (code.length == 3 ? 'active' : '')}>{code.slice(3, 4)}</View>
                        <Input 
                          id="input"
                          key='input'
                          type="number"
                          // className={"code code-" + (code.length-1)}
                          className="code"
                          maxLength={4}
                          value={code}
                          onInput={this.inputCode}
                          confirmHold={true}
                          focus={!(code.length == 4)}
                          onBlur={this.login}
                          animation={this.state.animationData2}
                        />
                      </View>
                    </View>
                  </View>
                }
                
              </View>
            </View>
          </View>
        }
      </View>
      
    );
  }
}
export function throttle(fn: Function = function () {}, gapTime: number = 1500) {
  let _lastTime = 0
  return function () {
    let _nowTime = + new Date()
    // 1、间隔时间 > gapTime
    // 2、第一次请求，_lastTime == 0
    if (_nowTime - _lastTime > gapTime || !_lastTime) {
      fn.apply(this, arguments)
      _lastTime = _nowTime
    }
  }
}
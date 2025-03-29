# QliPay
QliPay是一个基于支付宝二维码实现的个人Alipay收款库，适用于非商业性的个人简单收款项目  
## 特点
* 无需营业执照
* 无需实名认证
* 前后端皆可用
# 简单示例
测试支付: (候补)
```js
// 请在浏览器进行支付测试
var pay = new Alipay()
pay.on( "ok", function( e, type ){
  // 本事件会在pay后执行
  // 本事件无法检查支付是否成功，我本来想检测referer的，但是不行(实际上检测referer也没大用)
  // type 和 e.type 都是支付标识，表示是通过哪条id进行支付的
  if( type === "*" ){
    // 事实上你应该套个setTimeout，毕竟不走api很难确定是否真的成功了，更何况在前端
    // tip: 另外有些浏览器不会跳转或打开应用()
    // 这个是对应的编码的支付数据
    console.log( e.id )
    window.alert( "支付成功 " )
  }
})
// qrcode 链接请自行获取，如果需要的话我就写一个通过图片获取，不过我比较懒，而且觉得也没什么必要，弄的话还得多整个依赖
// 推荐个工具: https://cli.im/deqr/other
pay.bindUrl( "https://qr.alipay.com/fkx19598mkmott8qy3lwmca"/*, 标识，即上文事件的type，默认为* */ )
// 也可以用后面编码的支付数据(这里我称之为PayId)，调用bindId方法
// 支付宝付款码可以自定义金额的
// tip: bind是同步方法
pay.on( "pay", ( e ) => {
  // 在支付前执行
  return window.confirm( "pay " + e.type + " ?" )
  // tip: 如果要拒绝的支付的话，请使用同步方法
})

// 调用支付
pay.pay( /* 默认为* */)
```
class Alipay {
  // Tip: 本库是基于QRcode的支付宝非官方Api库
  // 仅适用于简单的收付款
  constructor( defaultPay ){
    this.payIds = new Map()
    this.eventMap = new Map()
    if( defaultPay ) this.bindId( defaultPay )
  }
  bindId( id, name = "*" ){
    // 将自己的二维码解码成URL，URL的Path部分就是支付ID
    // 工具推荐: https://cli.im/deqr/other
    // 懒得写解析了，自己弄吧
    this.payIds.set( name, id )
    return id
  }
  bindUrl( url, name = "*" ){
    // 直接传QRCODE的地址用这个
    var {pathname} = new URL( url ), id
    this.payIds.set( name, (id = pathname.slice( 1 )) )
    return id
  }
  pay( name = "*" ){
    // 支付
    if( this.payIds.has( name )){
      if( this.emit( "pay", {type: name} ) !== false ){
        if( typeof module !== "object" ){
          var id = this.payIds.get( name )
          window.location.href = "https://qr.alipay.com/" + id
          this.emit( "ok", {type: name, id}, name )
        } else {
          return "https://qr.alipay.com/" + this.payIds.get( name )
        }
      }
    } else {
      throw "支付ID不存在"
    }
  }
  on( event, callback ){
    // 事件绑定系统
    this.eventMap.set( event, callback )
  }
  emit( event, ...args ){
    // 触发事件
    if( this.eventMap.has( event ) ){
      return this.eventMap.get( event )( ...args )
    }
  }
}

if( typeof module === "object" ) module.exports = Alipay

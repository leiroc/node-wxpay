# node-wxpay
微信支付 for node.js


## Installation
```
npm install node-wxpay
```

## Usage

创建统一支付订单
```js

    var WXPay = require('node-wxpay');
    
    var wxpay = WXPay({
    	appid: 'xxxxxxxx',
    	mch_id: '1234567890',
    	partner_key: 'xxxxxxxxxxxxxxxxx',
    	pfx: fs.readFileSync('./wxpay_cert.p12'),
    });
    
    //原生 扫码支付
    wxpay.createUnifiedOrder({
    	body: '扫码支付测试',
    	out_trade_no: '20140703'+Math.random().toString().substr(2, 10),
    	total_fee: 1,
    	spbill_create_ip: '192.168.2.210',
    	notify_url: 'http://wxpay_notify_url',
    	trade_type: 'NATIVE',
    	product_id: '1234567890'
    }, function(err, result){
    	console.log(result);
    });


```

查询订单
```js

    // 通过微信订单号查
    wxpay.queryOrder({ transaction_id:"xxxxxx" }, function(err, order){
    	console.log(order);
    });
    
    // 通过商户订单号查
    wxpay.queryOrder({ out_trade_no:"xxxxxx" }, function(err, order){
    	console.log(order);
    });
```

关闭订单
```js
    wxpay.closeOrder({ out_trade_no:"xxxxxx"}, function(err, result){
    	console.log(result);
    });
```

### 原生支付 (NATIVE)
**模式一**：提供一个生成支付二维码链接的函数，把url生成二维码给用户扫。
```js
    var url = wxpay.createMerchantPrepayUrl({ product_id: '123456' });
```

商户后台收到微信的回调之后，调用 createUnifiedOrder() 生成预支付交易单，将结果的XML数据返回给微信。

[什么是模式一？](http://pay.weixin.qq.com/wiki/doc/api/native.php?chapter=6_4)

**模式二**：直接调用 createUnifiedOrder() 函数生成预支付交易单，将结果中的 code_url 生成二维码给用户扫。

[什么是模式二？](https://pay.weixin.qq.com/wiki/doc/api/native.php?chapter=6_5)

### 公众号支付 (JS API)

生成JS API支付参数，发给页面
```js

    wxpay.getBrandWCPayRequestParams({
    	openid: '微信用户 openid',
    	body: '公众号支付测试',
        detail: '公众号支付测试',
    	out_trade_no: '20150331'+Math.random().toString().substr(2, 10),
    	total_fee: 1,
    	spbill_create_ip: '192.168.2.210',
    	notify_url: 'http://wxpay_notify_url'
    }, function(err, result){
    	// in express
        res.render('wxpay/jsapi', { payargs:result })
    });
```

网页调用参数（以ejs为例）
```js
    WeixinJSBridge.invoke(
    	"getBrandWCPayRequest", <%-JSON.stringify(payargs)%>, function(res){
    		if(res.err_msg == "get_brand_wcpay_request:ok" ) {
        		// success
        	}
    });
```

### 企业付款给用户

```js
    
    wxpay.createEnterprisePay({
        openid: openid,
        desc: desc,
        partner_trade_no: '' + y + m + d +Math.random().toString().substr(2, 10),
        amount: amount * 100,
        spbill_create_ip: '180.76.133.56'
    }, function(err, result){
       
        console.log('------企业付款-----'+JSON.stringify(result));
    });

```
### 中间件

商户服务端处理微信的回调（express为例）

```js


    // 原生支付回调
    app.use('/wxpay/native/callback', wxpay.useWXCallback(function(msg, req, res, next){
    	// msg: 微信回调发送的数据
    }));
    
    // 支付结果异步通知
    app.use('/wxpay/notify', wxpay.useWXCallback(function(msg, req, res, next){
    	// 处理商户业务逻辑
        
        // res.success() 向微信返回处理成功信息，res.fail()返回失败信息。
        res.success();
    }));

```

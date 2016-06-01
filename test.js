
var WXPay = require('./index');
var fs = require('fs');

var wxpay = WXPay({
	appid: 'wx04369bbf9676b462',
	mch_id: '1234269002',
	partner_key: '6D9MV48soTATXhW3qeOZCS27MuhXuLut',
	pfx: fs.readFileSync('./wxpay_cert.p12'),
});

// var otn = '20140703'+Math.random().toString().substr(2, 10);
// console.log(otn);

// wxpay.createUnifiedOrder({
// 	body: '扫码支付测试',
// 	detail: '这是模式二',
// 	out_trade_no: otn,
// 	total_fee: 1,
// 	spbill_create_ip: '192.168.2.210',
// 	trade_type: 'NATIVE',
// 	notify_url: 'http://weixin.5usport.com/wxpay/notify',
// 	product_id: '1234567890',
// }, function(err, result){
// 	console.log(result);
// });

// var prepayurl = wxpay.createMerchantPrepayUrl({ product_id: '123456' });
// console.log(prepayurl);

// wxpay.queryOrder({ transaction_id:"1000630457201504020042501133" }, function(err, order){
// 	console.log(err, order);
// });

// wxpay.queryOrder({ out_trade_no:"201503313037720683" }, function(err, order){
// 	console.log(err, order);
// });

wxpay.closeOrder({ out_trade_no:"201407030197120828"}, function(err, result){
	console.log(result);
});
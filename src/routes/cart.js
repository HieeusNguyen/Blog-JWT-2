const express = require("express");
const router = express.Router();
const cartControllers = require("../app/controllers/CartController");
const { default: mongoose } = require("mongoose");
const Invoice = require("../app/models/Invoice");
const Cart = require("../app/models/Cart");

router.post("/order", cartControllers.addToCart);
router.get("/order", cartControllers.getCart)
router.get("/checkout", cartControllers.getCheckOut)
router.get("/remove/:id", cartControllers.removeProductFromCart)

router.post('/create_payment_url', function (req, res, next) {
    var ipAddr = req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;

        var env = {
            vnp_TmnCode: "9T702RRZ",
            vnp_HashSecret: "JGMMCG2VW5PU2RJ2IWY73BJL41ZUMM7T",
            vnp_Url: "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html",
            vnp_Api: "https://sandbox.vnpayment.vn/merchant_webapi/api/transaction",
            vnp_ReturnUrl: "http://localhost:3000/cart/vnpay_return",
          };
    var dateFormat = require('dateformat');

    
    var tmnCode = env.vnp_TmnCode;
    var secretKey = env.vnp_HashSecret;
    var vnpUrl = env.vnp_Url;
    var returnUrl = env.vnp_ReturnUrl;

    var date = new Date();

    var createDate = dateFormat(date, 'yyyymmddHHmmss');
    var orderId = dateFormat(date, 'HHmmss');
    var amount = req.body.amount;
    var bankCode = req.body.bankCode;
    
    var orderInfo = req.body.orderDescription;
    var orderType = req.body.orderType;
    var locale = 'vn';

    var currCode = 'VND';
    var vnp_Params = {};
    vnp_Params['vnp_Version'] = '2.1.0';
    vnp_Params['vnp_Command'] = 'pay';
    vnp_Params['vnp_TmnCode'] = tmnCode;
    // vnp_Params['vnp_Merchant'] = ''
    vnp_Params['vnp_Locale'] = locale;
    vnp_Params['vnp_CurrCode'] = currCode;
    vnp_Params['vnp_TxnRef'] = orderId;
    vnp_Params['vnp_OrderInfo'] = orderInfo;
    vnp_Params['vnp_OrderType'] = orderType;
    vnp_Params['vnp_Amount'] = amount * 100;
    vnp_Params['vnp_ReturnUrl'] = returnUrl;
    vnp_Params['vnp_IpAddr'] = ipAddr;
    vnp_Params['vnp_CreateDate'] = createDate;
    if(bankCode !== null && bankCode !== ''){
        vnp_Params['vnp_BankCode'] = bankCode;
    }

    function sortObject(obj) {
        var sorted = {};
        var str = [];
        var key;
        for (key in obj){
            if (obj.hasOwnProperty(key)) {
            str.push(encodeURIComponent(key));
            }
        }
        str.sort();
        for (key = 0; key < str.length; key++) {
            sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
        }
        return sorted;
    }

    vnp_Params = sortObject(vnp_Params);

    const dataInvoice = {
        userId: JSON.parse(req.body.items)[0].userId,
        name: req.body.name,
        items: JSON.parse(req.body.items),
        address: req.body.address,
        email: req.body.email,
        phone: req.body.phone,
        totalAmount: Number(req.body.amount)
    }

    const invoice = new Invoice(dataInvoice);
        invoice.save()
        .then()
        .catch(next);

        Cart.deleteMany({userId: new mongoose.Types.ObjectId(JSON.parse(req.body.items)[0].userId)})
        .then()
        .catch(next)

    var querystring = require('qs');
    var signData = querystring.stringify(vnp_Params, { encode: false });
    var crypto = require("crypto");     
    var hmac = crypto.createHmac("sha512", secretKey);
    var signed = hmac.update(new Buffer(signData, 'utf-8')).digest("hex"); 
    vnp_Params['vnp_SecureHash'] = signed;
    vnpUrl += '?' + querystring.stringify(vnp_Params, { encode: false });

    res.redirect(vnpUrl)
});


 
router.get('/vnpay_return', function (req, res, next) {
    var vnp_Params = req.query;

    var secureHash = vnp_Params['vnp_SecureHash'];

    delete vnp_Params['vnp_SecureHash'];
    delete vnp_Params['vnp_SecureHashType'];

    function sortObject(obj) {
        var sorted = {};
        var str = [];
        var key;
        for (key in obj){
            if (obj.hasOwnProperty(key)) {
            str.push(encodeURIComponent(key));
            }
        }
        str.sort();
        for (key = 0; key < str.length; key++) {
            sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
        }
        return sorted;
    }

    vnp_Params = sortObject(vnp_Params);

    var env = {
        vnp_TmnCode: "9T702RRZ",
        vnp_HashSecret: "JGMMCG2VW5PU2RJ2IWY73BJL41ZUMM7T",
        vnp_Url: "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html",
        vnp_Api: "https://sandbox.vnpayment.vn/merchant_webapi/api/transaction",
        vnp_ReturnUrl: "http://localhost:3000/cart/vnpay_return",
      };
    var tmnCode = env.vnp_TmnCode
    var secretKey = env.vnp_HashSecret

    var querystring = require('qs');
    var signData = querystring.stringify(vnp_Params, { encode: false });
    var crypto = require("crypto");     
    var hmac = crypto.createHmac("sha512", secretKey);
    var signed = hmac.update(new Buffer(signData, 'utf-8')).digest("hex");     

    if(secureHash === signed){

        res.render('cart/success', {code: vnp_Params['vnp_ResponseCode']})
    } else{
        res.render('cart/success', {code: '97'})
    }
});



module.exports = router;

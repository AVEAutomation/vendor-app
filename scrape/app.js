/**
 * Scraper Application File
 */
'use strict';

var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var _ = require('lodash');
var app = express();
var tough = require('tough-cookie');
var Cookie = tough.Cookie;
var FileCookieStore = require('tough-cookie-filestore');
// NOTE - currently the 'cookies.json' file must already exist!
var cookieStore = new FileCookieStore('data/cookies.json');

var j = request.jar(cookieStore);

request = request.defaults({
  jar: true,                 // save cookies to jar
  rejectUnauthorized: false, 
  followAllRedirects: true   // allow redirections
});
var urls = {
  base: 'https://vendorexpress.amazon.com/',
  orders: 'https://vendorexpress.amazon.com/orders'
};

var suffixes = {
  order: 'dfOrders/',
  printLabel: 'dfOrders/printShipmentLabels/'
}
// Assemble headers for requests
var headers = {'Cookie': ''};
// fs.readFile('./data/cookieString.txt', function(err, data) {
//   if (err) {
//     console.log('CookieString.txt read error: ' + err + '\nMake sure the file exists')
//   } else {
//     headers.Cookie = data;
//     // console.log('cookieStr contents: ' + headers.Cookie);
//     request.get({url: urls.orders, headers: headers, jar: j}, scrapeOrders);
//   }
// })

var user = process.env.AVE_ACCOUNT;
var pass = process.env.AVE_ACCOUNT_PW;


// input ids:
// 'ap_email' 'ap_password'


app.get('/scrape', function(req, res){

  // The URL we will scrape from - in our example Anchorman 2.

  

  // The structure of our request call
  // The first parameter is our URL
  // The callback function takes 3 parameters, an error, response status code and the html

  // console.log('requesting orders url, headers: ' + JSON.stringify(headers));
  // request.get({url: urls.orders, headers: headers, jar: j}, scrapeOrders);
  checkForLogin(req, res, urls.orders, scrapeOrders);
});

function setHeaderCookie(response) {
  var cookies = [];
  if (response.headers['set-cookie'] instanceof Array)
    cookies = response.headers['set-cookie'].map(Cookie.parse);
  else
    cookies = [Cookie.parse(response.headers['set-cookie'])];
  cookies.forEach(function(c) {
    var cookieStr = c.toString();
    console.log('setting cookieStr: ' + cookieStr);
    headers.Cookie += cookieStr;
    // j.setCookie(c.domain, c.value);
  });
}

// TODO: complete function
function scrapeShippingLabel(orderId) {
  var url = urls.base + suffixes.printLabel + orderId;

}
// TODO: complete function
function scrapeCustomerData(orderId) {
  var url = urls.base + suffixes.order + orderId;

}


// TODO: give only the cheerio object
function scrapeOrders(error, response, html) {
  // console.log('cookie: ' + JSON.stringify(j.getCookieString(urls.orders)));
  // console.log('cookie: ' + JSON.stringify(j.getCookieString()));

  if (!error) {
    var $ = cheerio.load(html);
    var orderRows = $('.mt-row');
    var orders = [];

    orderRows.each(function(e){
      var rowId = $(this).attr('id');
      console.log('row id: ' + rowId);
      var order = {};
      $(this).children('.mt-cell').each(function(c) {
        var column = $(this).data('column');
        // console.log('column: ' + column);
        order[column] = $(this).text().trim();
      })
      orders.push(order);
    });
    if (orders.length) {
      console.log('orders: ' + JSON.stringify(orders));
    } else {
      console.log('no orders scraped, response headers: ' + JSON.stringify(response.headers))
    }
    // TODO: if next page exists, go there. 
  } else {
    console.log('error: ' + error);
  }
}

function checkForLogin(req, res, url, cb) {
  function reqUrl(error, response, html){

      // First we'll check to make sure no errors occurred when making the request

      if(!error){
          console.log('response headers: ' + JSON.stringify(response.headers));

          var $ = cheerio.load(html);
          var form = $('form[name=signIn]');
          var json = {}, cookies = [];
          var action = form.attr('action'), formArr = form.serializeArray();
          
          if (formArr) {
            // TODO: perform login func
            // TODO: ensure all future requests pass the cookies set from login

            var keys = _.chain(formArr)
              .sortBy('name')
              .map(function(o) {
                return o.name;
              })
              .value();
            var vals = _.chain(formArr)
              .sortBy('name')
              .map(function(o) {
                return o.value;
              })
              .value();

            

            json = _.zipObject(keys, vals);
            json.email = user;
            json.password = pass;
            console.log('posting following formData: ' + JSON.stringify(json));
            // TODO: for val in response.headers.set-cookie, setCookie(val.Domain)(val.)
            // below taken from npm page for cookie
            setHeaderCookie(response);
            // console.log('pre-login cookie: ' + JSON.stringify(j.getCookies()));
              
            // Post this to action, with username and password fields
            request.post({url: action, headers: headers, formData: json, jar: j}, function(err, response, html){
              // console.log('post-login response headers: ' + JSON.stringify(response.headers));
              setHeaderCookie(response);
              console.log('post-login header: ' + JSON.stringify(headers));
              // headers.Cookie = response.headers.cookie;
              request.post({url: action, headers: headers, formData: json, jar: j}, function(err, response) {
                request({url: url, headers: headers, jar: j}, cb);
                res.send(response);
              })
              
            }, function(err) {
              res.send({'error': err});
            });
            // 
          } else {
            cb(error, response, html);
          }
          
          // res.status(200).end();
      } else {

        console.log('error response, headers: ' + JSON.stringify(response.headers));
        res.send(response);
      }
  }
  request({url: url, jar: j}, reqUrl);
}

app.listen('8081')

console.log('Scraping magic happens on port 8081');

exports = module.exports = app;
/**
 * utils
 *
 * @author isunkui
 * @date 2017/2/28
 */
'use strict';

export const crypto = {};

/**
 * 产生随机字符串
 *
 * @param {Integer} size 生成的长度
 * @param {String} chars 自定义生成字符串的内容
 * @return {String} 生成好的随机字符串
 */
crypto.randomString = function randomString(size, chars) {
  size = size || 6;
  chars = chars || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const max = chars.length;
  let ret = '';
  for (let i = 0; i < size; i++) {
    ret += chars.charAt(Math.floor(Math.random() * max));
  }
  return ret;
};

/**
 * 产生随机数字字符串
 *
 * @param {Integer} size 生成的长度
 * @return {String} 生成好的随机字符串
 */
crypto.randomNumber = function randomNumber(size) {
  return crypto.randomString(size, '0123456789');
};

/**
 * 产生随机字母字符串
 *
 * @param {Integer} size 生成的长度
 * @return {String} 生成好的随机字符串
 */
crypto.randomLetter = function randomLetter(size) {
  return crypto.randomString(size, 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz');
};

export const string = {};

/**
 * 向左填充自定义字符
 * @param {String} str 需要填充的字符串
 * @param {Number} len 填充后的总长度
 * @param {String} ch 填充字符
 * @return {string} 格式化好的字符串
 */
string.leftpad = (str, len, ch) => {
  str = String(str);
  var i = -1;
  if (!ch && ch !== 0) ch = ' ';
  len = len - str.length;
  while (++i < len) {
    str = ch + str;
  }
  return str;
};

string.ellipsis = (str, len = 6) => {
  str = String(str);
  if (str.length > len) {
    return str.substr(0, len) + '...';
  }
  return str;
};

export const date = {};

/**
 * 将毫秒值转换成字符串
 * @param {Number} ms 毫秒值
 * @return {String} 格式化后的字符串
 */
date.ms2HHMMSS = (ms) => {
  let hours = parseInt(ms / 1000 / 60 / 60, 10);
  let minutes = parseInt(ms / 1000 / 60 % 60, 10);
  let seconds = parseInt(ms / 1000 % 60, 10);
  return `${string.leftpad(hours, 2, 0)} : ${string.leftpad(minutes, 2, 0)} : ${string.leftpad(seconds, 2, 0)}`;
};

/**
 * 将毫秒值转换成分钟
 * @param {Number} ms 毫秒值
 * @return {String} 格式化后的字符串
 */
date.ms2Minutes = (ms) => {
  let minutes = Math.ceil(ms / 1000 / 60 % 60);
  return `${minutes}分钟`;
};

/**
 * 格式化Date
 * @param {Date|Number} date 要格式化的日期或时间戳
 * @param {String} fmt 格式化的模板
 * @return {String} 返回格式化好的值
 */
date.format = (date, fmt = 'YYYY-MM-DD hh:mm:ss') => {
  return date.toString(date, fmt);
};

/**
 * 将毫秒值转换成日期字符串
 * @param {Number|Date} timestamp 时间戳或日期
 * @param {String} fmt 格式化
 * @return {String} 格式化后的字符
 *
 *  (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
 *  (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
 */
date.toString = (timestamp, fmt = 'YYYY-MM-DD') => {
  if (!timestamp) return '-';
  let date;
  if (timestamp instanceof Date) {
    timestamp = timestamp.getTime();
  } else {
    timestamp = parseInt(timestamp, 10);
  }
  date = new Date(timestamp);
  let o = {
    'M+': date.getMonth() + 1, // 月份
    'D+': date.getDate(), // 日
    'h+': date.getHours(), // 小时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
    'S': date.getMilliseconds() // 毫秒
  };
  if (/(Y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
    }
  }
  return fmt;
};

date.before = (n) => {
  var now = new Date();
  now.setDate(now.getDate() - n);
  return now;
};

export const number = {};

number.gem2Money = (gem = 0) => {
  return number.parse(gem / 1000, 2);
}

/**
 * 将数字转换成百分比字符串
 * @param {Number} num 要转换的数值
 * @param {Number} digits 保留小数位
 * @return {String} 返回转换好的百分比字符
 */
number.percentage = function(num, digits) {
  let result;
  if (digits === null || digits === undefined) {
    digits = 2;
  }
  digits = parseInt(digits, 10);
  num = number.parse(num, digits + 2);
  if (num === null || num === '' || isNaN(num)) {
    result = '0%';
  } else {
    result = Math.round(num * Math.pow(10, digits) * 100) / Math.pow(10, digits) + '%';
  }
  return result;
};

/**
 * 解析成数字，添加小数位
 * @param {Number} val 要转换的数值
 * @param {Number} digits 保留小数位
 * @return {Number} 返回四舍五入后的数值
 */
number.parse = (val, digits) => {
  val = val || 0;
  if (digits === null || digits === undefined) {
    digits = 2;
  }
  return isFinite(val) ? Math.floor(val * Math.pow(10, digits)) / Math.pow(10, digits) : 0;
};

export const object = {};

object.parse = (val) => {
  return JSON.parse(val);
};

export const page = {};

/**
 * 设置页面为单页，不能滑动
 */
page.single = () => {
  document.body.addEventListener('touchmove', function (event) {
    event.preventDefault();
  }, false);
};

/**
 * 修改页面的标题
 * @param title
 */
page.modPageTitle = (title) => {
  // 修复ios下，不能触发修改页面标题的问题
  // 以下代码可以解决以上问题，不依赖jq
  setTimeout(() => {
    // 利用iframe的onload事件刷新页面
    document.title = title;
    var iframe = document.createElement('iframe');
    iframe.src = '/favicon.ico';
    iframe.style.visibility = 'hidden';
    iframe.style.width = '1px';
    iframe.style.height = '1px';
    iframe.onload = function () {
      setTimeout(() => {
        document.body.removeChild(iframe);
      }, 0);
    };
    document.body.appendChild(iframe);
  }, 0);
};

page.infos = () => {
  const UA = window.navigator.userAgent.toLowerCase();
  const isAndroid = UA.indexOf('android') > 0;
  const isIOS = /iphone|ipad|ipod|ios/.test(UA);
  const isWechat = UA.indexOf('micromessenger') !== -1;
  const isQq = UA.indexOf('qq') > -1;
  const isMobile = UA.match(/android/i) ||
    UA.match(/webos/i) ||
    UA.match(/iphone/i) ||
    UA.match(/ipad/i) ||
    UA.match(/ipod/i) ||
    UA.match(/blackberry/i) ||
    UA.match(/windows phone/i);
  return {
    UA,
    isAndroid,
    isIOS,
    isWechat,
    isQq,
    isMobile
  };
};

export const app = {};
app.clientType = (() => {
  let info = page.infos()
  return info.isAndroid ? 2 : 1
})()

export const filters = {};

const insertFlg = (str, flg, sn) => {
  var newstr = '';
  let first = true;
  for (var i = 0; i < str.length; i += sn) {
    var tmp = str.substring(i, i + sn);
    // newstr = newstr + tmp + flg
    if (first) {
      newstr = tmp + flg;
      first = false;
    } else {
      newstr = newstr + tmp;
    }
  }
  return newstr;
};

filters.cdnImg = (url, picSize) => {
  if (Number.isInteger(picSize)) {
    picSize = `h_${picSize},w_${picSize}`
  } else if (!picSize) {
    picSize = 'h_80,w_80'
  }
  if (!url) {
    return 'http://avatar.doufan.tv/default/avatar_default.jpg';
  }
  if (!url.includes('doufan.tv')) return url;
  var index = url.indexOf('?timestamp=');
  if (index === -1) {
    index = url.indexOf('?t=');
  }

  let fmt = `?x-oss-process=image/resize,m_fill,${picSize}`;

  if (index === -1) {
    return url + fmt;
  } else {
    return url.substr(0, index) + fmt;
  }
};

filters.time = (timestamp, fmt = 'YYYY-MM-DD hh:mm') => {
  return date.toString(timestamp, fmt);
};

filters.leftpad = string.leftpad;

filters.percentage = number.percentage;

export default {
  crypto,
  string,
  date,
  number,
  object,
  page,
  app,
  filters
}

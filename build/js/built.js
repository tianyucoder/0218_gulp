(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var _module = require("./module1");

var _module2 = require("./module2");

console.log((0, _module.add)(1, 2));
console.log((0, _module.mul)(1, 2));
console.log(_module2.name, _module2.age);
setTimeout(function () {}, 200);
},{"./module1":2,"./module2":3}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.add = add;
exports.mul = mul;

function add(x, y) {
  return x + y;
}

function mul(x, y) {
  return x * y;
} // 统一暴露
},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.age = exports.name = void 0;
// 分别暴露
var name = 'jack';
exports.name = name;
var age = 18;
exports.age = age;
},{}]},{},[1])
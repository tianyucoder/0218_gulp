"use strict";

var _module = require("./module1");

var _module2 = require("./module2");

console.log((0, _module.add)(1, 2));
console.log((0, _module.mul)(1, 2));
console.log(_module2.name, _module2.age);
setTimeout(function () {}, 200);
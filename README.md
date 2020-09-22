# 项目编辑

```json
// package.json常用script
"test":"",
"start": "pm2 start",
"build": "",
"server:dev":"gulp",
"server:prod": "cross-env NODE_ENV=production gulp",
"server:lint": "cross-env NODE_ENV=lint gulp",
"client:dev":"webpack --mode=devlopment", // 客户端的开发环境
"client:prod": "webpack --mode=production", // 客户端的生产环境
"docs": "jsdoc ./src/nodeuii/**/*.js -d ./docs/jsdocs",
"start:dev": "cross-env NODE_ENV=develop supervisor ./dist/app.js"
```

## webpack 面试点

1. 使用 webpack 遇到过什么问题
2. webpack 优化经验
3. webpack 源码
4. webpack 经验

## 技术栈

- koa
- nodejs
- typeScript
- 面向切面
- 后台模板 swig
- gulp

## RegExp.\$1

RegExp 是 JavaScript 的内置对象之一，为正则表达式。
`RegExp.$1`是 RegExp 的一个属性，**指的是正则表达式匹配的第一个子匹配（以括号为标志）字符串，**以此类推，`RegExp.$2`,`RegExp.$3`...可以有 99 个匹配

```js
var r = /^(\d{4})-(\d{1,2})-(\d{1,2})$/;
r.exec("1985-10-15");
s1 = RegExp.$1; // 1985
s2 = RegExp.$2; // 10
s3 = RegExp.$3; // 15
```

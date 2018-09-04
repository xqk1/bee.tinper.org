## ac-input-locale

多语言 Input 组件


```
$ ynpm install @yonyou/ac-input-locale --save-dev

引入

import AcInputLocale from '@yonyou/ac-input-locale';

样式引入

import '@yonyou/ac-input-locale/dist/index.css';
```

## 在线示例
[https://tinper-acs.github.io/ac-input-locale/](https://tinper-acs.github.io/ac-input-locale/)

## 效果

<img src="https://raw.githubusercontent.com/fridaydream/blogpic/master/ac-input-locale2.gif" width="90%">

<img src="http://upload-images.jianshu.io/upload_images/8194969-aee1bf72ef11bf74?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240" width="90%">

## API

|参数|说明|类型|返回值|
|:--|:---:|:--:|---:|
|className|容器样式|string| --- |
|onSave|点击确定的钩子函数|fun|object |
|onCancel|点击取消的钩子函数|fun|Object |
|locale|系统语言|string |'zh-cn/en/tw'/ |
|localeList|语言列表|Array| ---|



#### 开发调试

```sh
$ cd @yonyou/ac-input-locale
$ npm install
$ npm run dev
```
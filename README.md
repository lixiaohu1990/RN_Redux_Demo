# A Simple Demo For Redux

## 工程配置
### 添加依赖 :
```
"dependencies": {
    "react-native": "0.21.0",
    "react-redux": "4.4.0",
    "redux": "3.3.1",
    "redux-thunk": "1.0.3"
  }
```

```
npm install --save redux 
```
```
npm install --save react-redux 
```
```
npm install --save redux-thunk
```

## Redux
### Redux是什么？
### 为什么要用Redux？
### Redux使用三大原则
### Redux核心概念
#### Action
* Action是把数据从应用传到store的有效载荷，它是store数据的唯一来源。

* Action本质上是JavaScript普通对象，内部必须使用一个字符串类型的 `type`字段来表示将要执行的动作，除了`type`字段外，action对象的结构完全由自己决定。
* Action创建函数，就是生成action的方法，只是简单的返回一个action

* 实践：

``` js
actionTypes.js

export const INCREMENT = 'INCREMENT';
export const DECREMENT = 'DECREMENT';
```

``` js
counterActions.js

import * as types from './actionTypes';

//Action创建函数
export function increment() {
  return {
    type: types.INCREMENT
  };
}

export function decrement() {
  return {
    type: types.DECREMENT
  };
}
```

#### Reducer
Reducer 就是一个纯函数，接收旧的 state 和 action，返回新的 state。

永远不要在reducer 里做以下操作：

* 修改传入参数
* 执行有副作用的操作，如API请求和路由跳转
* 调用非纯函数，如`Date.now() `或 `Math.random()`
 
#### Store
## Redux实战

## 代码架构标准
*   Component只保留视图和布局相关的代码，以及Action的调用。
*   业务逻辑基本都放到Action中去处理，并返回相应的数据给Reducer。
*   由Reducer根据Action的type去修改Store中的State，最终再反映到视图上。
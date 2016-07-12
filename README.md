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
Redux是由Flux进化而来（官方文档上说Redux可以看作是Flux思想的一种实现），吸取了Flux中的精华的设计思想，例如单向数据流。Flux和Redux都不允许直接修改数据，而是需要通过action。但Redux只有一个Store，并且没有Dispacher。

### 为什么要用Redux？
* Component臃肿：任何一个Component都会包含自身props，state相关的代码，视图相关的代码，布局样式相关的代码，以及这个Component所需要处理的所有业务逻辑的代码。我们没有一个明确的标准来规定什么代码应该放在什么地方

* state管理混乱：React Native框架本身是根据state来渲染视图的，在Component中除了render方法中的任意地方都可以设置和修改state的值。我们对state的管理分散在各个业务逻辑方法中，各个方法都对state中的值进行管理，这样做除了维护state的成本很大之外，还很容易出现对state修改错误的情况。

* Redux 试图让 state 的变化变得可预测
### Redux使用三大原则
* 单一数据源：整个应用的 state 被储存在一棵 object tree 中，并且这个 object tree 只存在于唯一一个 store 中

* State 是只读的：惟一改变 state 的方法就是触发 action，action 是一个用于描述已发生事件的普通对象
* 使用纯函数来执行修改：为了描述 action 如何改变 state tree ，需要编写 reducers

### Redux核心概念
#### Action
* Action是把数据从应用传到store的有效载荷，它是store数据的唯一来源。

* Action本质上是JavaScript普通对象，内部必须使用一个字符串类型的 `type`字段来表示将要执行的动作，除了`type`字段外，action对象的结构完全由自己决定。
* Action创建函数，就是生成action的方法，只是简单的返回一个action


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
 
 ``` js
 export default function counter(state = initialState, action = {}){
    switch (action.type){
        case types.INCREMENT:
            return {
                ...state,
                count:state.count + 1
            };
        case types.DECREMENT:
            return {
                ...state,
                count:state.count -1
            };
        default:
            return state;
    }
}
 ```
#### Store
Store 就是把 Reducer 和 action 联系到一起的对象,Store本质上是一个对象，它以树的形式保存了整个应用的State。并提供了一些方法。例如getState( ) 和 dispatch( )。Redux应用只有惟一一个Store。
Store通过createStore方法来创建，根据整个应用的根Reducer的初始State。

``` js
const store = createStore(reducer);
```
## Redux实战
### 1. 添加相关文件目录
``` js
├── app                 #开发目录
|   |
|   ├──actions          #actionTypes，actions的文件
|   |
|   ├──components       #内部组件
|   |   
|   ├──containers       #容器组件
|   |   
|   ├──reducers         #reducers文件
|      
├── node_modules        #包文件夹
├── .gitignore     
├── index.js            #入口文件    
└── package.json
```
### 2. 实现 `Actions`
* actionTypes:

``` js
export const INCREMENT = 'INCREMENT';
export const DECREMENT = 'DECREMENT';
```

* actions

``` js
import * as types from './actionTypes';

//Action本质上是JavaScript普通对象,必须使用一个字符串类型的 type 字段来表示将要执行的动作

//这是Action创建函数,只是简单的放回一个Action
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

### 3. 实现 `Reducers`
``` js
import * as types from '../actions/actionTypes';

const initialState = {
  count: 0
};

export default function counter(state = initialState, action = {}) {
  switch (action.type) {
    case types.INCREMENT:
      return {
        ...state,
        count: state.count + 1
      };
    case types.DECREMENT:
      return {
        ...state,
        count: state.count - 1
      };
    default:
      return state;
  }
}
```
### 4. 实现容器组件，并使用 `connect()`连接 Redux 
``` js
'use strict';

import React, { Component } from 'react-native';
import {bindActionCreators} from 'redux';
import Counter from '../components/counter';
import * as counterActions from '../actions/counterActions';
import { connect } from 'react-redux';

// @connect(state => ({
//   state: state.counter
// }))
class CounterApp extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { state, actions } = this.props;
    return (
      <Counter
        counter={state.count}
        {...actions} />
    );
  }
}

// 不要注入dispatch和全局state,这要会导致每次action都触发整个app重新渲染,所有性能优化都将无用
// 最好是在多个组件上使用connect(),每个组件只监听它所关联的部分state

// 注入state,并把所有action creator作为actions属性也注入组件中
export default connect(state => ({
    state: state.counter
  }),
  (dispatch) => ({
    actions: bindActionCreators(counterActions, dispatch)
  })
)(CounterApp);
```
### 5. 根组件，并注入`Redux Store`
``` js
import React, { Component } from 'react-native';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import * as reducers from '../reducers';
import CounterApp from './counterApp';

// 使用支持异步的middleware比如 redux-thunk或 redux-promise 能让我们实现异步的数据流
// applyMiddleware( ) 来增强 createStore( )
const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const reducer = combineReducers(reducers);
const store = createStoreWithMiddleware(reducer);

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <CounterApp />
      </Provider>
    );
  }
}
```

## 代码架构标准
*   Component只保留视图和布局相关的代码，以及Action的调用。

*   业务逻辑基本都放到Action中去处理，并返回相应的数据给Reducer。

*   由Reducer根据Action的type去修改Store中的State，最终再反映到视图上。

* 在应用中，只有最顶层组件是对 Redux 可知（例如路由处理）这是很好的。所有它们的子组件都应该是“笨拙”的，并且是通过 props 获取数据。

* 容器组件使用 connect() 方法连接 Redux

* 在根组件中注入 `Redux Store`
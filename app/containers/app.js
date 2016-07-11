'use strict'

import React, { Component } from 'react';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux'
import thunk from 'redux-thunk';

import * as reducers from '../reducers';
import CounterApp from './counterApp';

// 使用支持异步的middleware比如 redux-thunk或 redux-promise 能让我们实现异步的数据流
// 调用 applyMiddleware，使用 middleware 增强 createStore：

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

// 像原生 createStore 一样使用
const reducer = combineReducers(reducers);
const store = createStoreWithMiddleware(reducer);

export default class App extends Component {
    render(){
        return(
            <Provider store={store}>
                <CounterApp/>
            </Provider>
        );
    }
}
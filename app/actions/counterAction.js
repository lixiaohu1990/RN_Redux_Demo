import * as types from './actionTypes';

//Action本质上是JavaScript普通对象,必须使用一个字符串类型的 type 字段来表示将要执行的动作

//这是Action创建函数,只是简单的返回一个Action

export function increment(){
    return {
      type: types.INCREMENT,
    };
}

export function decrement(){
    return {
      type: types.DECREMENT,  
    };
}
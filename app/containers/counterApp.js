'use strict';

import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import Counter from '../component/counter';
import * as counterActions from '../actions/counterAction';
import {connect} from 'react-redux';
class CounterApp extends Component{
    constructor(props){
        super(props);
    }

    render(){
        const {state, actions} = this.props;
        return(
            <Counter
                counter = {state.count}
                {...actions}
            />
        );
    }
}

export default connect(
    (state) => ({
        state: state.counter
    }),
    (dispatch) => ({
        actions: bindActionCreators(counterActions, dispatch)
    })
)(CounterApp)
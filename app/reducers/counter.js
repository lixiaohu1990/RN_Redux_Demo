import * as types from '../actions/actionTypes';

const initialState = {
  count:0,
};

export default function counter(state = initialState, action = {}){
    console.log('111111');
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
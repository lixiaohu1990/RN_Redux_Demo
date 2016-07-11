import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity
} from 'react-native';

const styles = StyleSheet.create({
    button: {
        width: 100,
        height: 30,
        padding: 10,
        backgroundColor: 'lightgray',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 3
    }
});

export default class counter extends Component{
    constructor(props){
        super(props);
    }
    // 从props中获取increment,decrement action,以及计数 counter
    render(){
        const {increment, decrement, counter} = this.props;
        return (
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>{counter}</Text>
                <TouchableOpacity onPress={increment} style={styles.button}>
                    <Text>up</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={decrement} style={styles.button}>
                    <Text>down</Text>
                </TouchableOpacity>
            </View>
        );
    }
}
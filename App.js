/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View
} from 'react-native';

import GSHttpUtil from './src/GSHttpUtil';

const instructions = Platform.select({
    ios: '使用Promise,\n' +
    '包括封装请求及异步处理',
    android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

var GS_URL = 'http://gc.ditu.aliyun.com/regeocoding?l=39.938133,116.395739&type=001';//阿里云根据经纬度获取地区名接口 JSON格式


let data0 = {'status': true, 'result': 'ok'}
var promise = new Promise((resolve, reject) => {

    //这里是异步处理方法，最终得到data结果
    //然后根据data的status属性决定处理结果是否正确
    if (data0.status == true) {
        resolve(data0);
    } else {
        reject(error())
    }
});

var promise1 = new Promise.resolve();

var promise2 = new Promise.resolve(1);

var promise3 = new Promise.resolve();

type Props = {};
export default class App extends Component<Props> {


    dataRequest() {
        GSHttpUtil.get(GS_URL)
            .then((data) => {

                //正确请求的业务逻辑
                console.log('请求成功111--' + JSON.stringify(data))
                alert('请求成功-' + JSON.stringify(data))
            })
            .catch((error) => {

                //处理请求失败业务逻辑
                console.log('请求失败111' + JSON.stringify(error))
            })
            .done();
    }

    promiseTest() {

        promise.then((data00) => {

            //这里处理resolve回调方法
            alert(data00.result)
        }).catch((error) => {

            //这里处理reject回调方法
            alert('error' + JSON.stringify(error))
        })
    }

    taskA() {
        console.log('Task A');
    }

    taskB() {
        console.log('Task B');
    }

    onRejected(error) {
        console.log('Catch Error: A or B', error);
    }

    finalTask() {
        console.log('Final Task');
    }

    promise1Test() {

        promise1
            .then(this.taskA)
            .then(this.taskB)
            .catch(this.onRejected)
            .then(this.finalTask)
    }

    doubleUp(value) {
        return value * 2;
    }

    increment(value) {
        return value + 1;
    }

    output (value) {
        console.log('value:' + value);
        return value
    }

    promise2Test() {
        promise2
            .then(this.doubleUp)
            .then(this.increment)
            .then(this.output)
            .then((data22) => {

                //这里处理resolve回调方法
                return data22 * 2
            })
            .then((data22) => {
                alert(data22)
            })
            .catch(function (error) {
                // promise chain中出现异常的时候会被调用
                console.error('promise2' + error)
            });
    }

    promise3Test(){
        promise3
            .then(()=>{
                fetch(GS_URL)
                    .then((response) => response.json())
                    .then((responseData) => {
                        console.log(responseData + '-1111')
                    })
                    .catch((error) => {
                        console.log(error + '-2222')
                    })
            })
            .then(this.requestData)
            .catch(function (error) {
                // promise chain中出现异常的时候会被调用
                console.error('promise2' + error)
            })
    }
    requestData(){
        fetch(GS_URL)
            .then((response) => response.json())
            .then((responseData) => {
                console.log(responseData + '-1111')
            })
            .catch((error) => {
                console.log(error + '-2222')
            })
    }

    render() {
        return (
            <View style={styles.container}>
                <Text
                    style={styles.welcome}
                    onPress={this.dataRequest.bind(this)}
                >
                    点击网络请求!
                </Text>
                <Text
                    style={styles.welcome}
                    onPress={this.promiseTest.bind(this)}
                >
                    点击简单的Promise
                </Text>
                <Text
                    style={styles.welcome}
                    onPress={this.promise1Test.bind(this)}
                >
                    点击连续的Promise
                </Text>
                <Text
                    style={styles.welcome}
                    onPress={this.promise2Test.bind(this)}
                >
                    点击连续的Promise实例
                </Text>
                <Text
                    style={styles.welcome}
                    onPress={this.promise3Test.bind(this)}
                >
                    点击连续连续请求数据
                </Text>
                <Text style={styles.instructions}>
                    {instructions}
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});

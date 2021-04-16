import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Dimensions,
  ImageBackground,
  Image,
  TouchableHighlight,
  ProgressBarAndroid
} from 'react-native';
const {width,height} = Dimensions.get("window");
export default class ReadyPlay extends Component {
    render() {
        let progress = parseFloat(this.props.buffer)/100;
        return (
            <View style={styles.root}>
                <Image style={styles.readyBg} source={require('../img/readyBG.jpg')} />
                <ProgressBarAndroid color="#C0FF3E" styleAttr="Horizontal" indeterminate={false} progress={progress} />
                <View style={styles.tip}>
                    <Text style={styles.tipTxt}>加载中...</Text>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    root: {
        width,
        height
    },
    readyBg: {
        width,
        height: height-100
    },
    tip: {
        height: 60,
        alignItems: "center",
        justifyContent: "center"
    },
    tipTxt: {
        color: "#fff",
        fontSize: 20
    }
});
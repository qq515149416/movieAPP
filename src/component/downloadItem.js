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
export default class DownloadItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            progress: 0,
            buffer: 0,
            downloadSpeed: 0,
            seeds: 0
        }
    }
     /**
    * 渲染
    */ 
    render() {
        let progress = parseFloat(this.props.progress)/100;
        return (
            <View style={styles.root}>
                <ProgressBarAndroid color="#C0FF3E" styleAttr="Horizontal" indeterminate={false} progress={progress} />
                <View style={styles.txtPosition}>
                    <Text style={styles.txtColor}>
                        下载速度: {(this.props.downloadSpeed/1000).toFixed(2)}KB
                    </Text>
                    <Text style={styles.txtColor}>
                        下载进度: {(progress*100).toFixed(2)}%
                    </Text>
                    {/* <Text style={styles.txtColor}>
                        缓存: {this.props.buffer}
                    </Text> */}
                    <Text style={styles.txtColor}>
                        连接数: {this.props.seeds}个
                    </Text>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    root: {
        marginVertical: 10
    },
    txtPosition: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    txtColor: {
        color: "#fff"
    }
});
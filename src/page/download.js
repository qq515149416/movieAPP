import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  Dimensions,
  ImageBackground,
  Image,
  TouchableHighlight
} from 'react-native';
import TorrentStreamer from 'react-native-torrent-streamer';
import DownloadItem from "../component/downloadItem.js";
import ReadyPlay from "../component/readyPlay.js";

const {width,height} = Dimensions.get("window");
export default class Download extends Component {
    constructor(props) {
        super(props);
        this.state = {
            progress: 0,
            buffer: 0,
            downloadSpeed: 0,
            seeds: 0,
            loading: false,
            fileurl: "",
            type: ""
        }
    }
    componentWillMount() {
        const {navigate,goBack,state} = this.props.navigation;
        this.statusfn = TorrentStreamer.addEventListener('status', this.onStatus.bind(this));
        this.errorfn = TorrentStreamer.addEventListener('error', this.onError);
        this.readyfn = TorrentStreamer.addEventListener('ready', this.onReady.bind(this));
        this.stopfn = TorrentStreamer.addEventListener('stop', this.onStop.bind(this));
        switch(state.params.type) {
            case "download":
                if(state.params.url) {
                    this.setState({
                        type: "download"
                    });
                    this.download(state.params.url);
                }
            break;
            case "open":
                if(state.params.url) {
                    this.setState({
                        type: "open"
                    });
                    this.openflie(state.params.url);
                }
            break;
        }
    }
    onError = (e) => {
        console.log(e);
    }
    onReady = (data) => {
        global.fileurl[this.props.navigation.state.params.aid] = data.url;
        this.setState({
            fileurl: data.url,
            loading: false
        });
        TorrentStreamer.open(data.url, 'video/mp4');
        console.log(data);
    }
    onStop = (data) => {
    console.log('stop');
    }
    onStatus = ({progress, buffer, downloadSpeed, seeds}) => {
    // alert("状态开始");
        console.log(progress,buffer,downloadSpeed,seeds);
        this.setState({
            progress: progress,
            buffer: buffer,
            downloadSpeed: downloadSpeed,
            seeds: seeds
        });
    }
    download = (url) => {
        this.setState({
            loading: true
          });
          if(url) {
            TorrentStreamer.stop();
            TorrentStreamer.start(url);
          }else {
            alert("播放地址错误,URL："+url);
          }
    }
    openflie = (url) => {
        if(this.state.fileurl||global.fileurl[this.props.navigation.state.params.aid]) {
            TorrentStreamer.open((this.state.fileurl || global.fileurl[this.props.navigation.state.params.aid]), 'video/mp4');
        }else {
            this.download(url);
        }
    }
    playVideo = () => {
        if(this.state.fileurl||global.fileurl[this.props.navigation.state.params.aid]) {
            TorrentStreamer.open((this.state.fileurl || global.fileurl[this.props.navigation.state.params.aid]), 'video/mp4');
        }else {
            alert("你还没有下载电影，请返回首页下载你想看的电影吧！");
        }
    }
    onBackButtonPressAndroid = () => {
        console.log("removeEvent");
        
        TorrentStreamer.removeEventListener('status', this.statusfn);
        TorrentStreamer.removeEventListener('error', this.errorfn);
        TorrentStreamer.removeEventListener('ready', this.readyfn);
        TorrentStreamer.removeEventListener('stop', this.stopfn);
        // if (this.isSelectionModeEnabled()) {
        //     this.disableSelectionMode();
        //     return true;
        // } else {
        //     return false;
        // }
    }
    componentWillUnmount() {
        console.log("removeEvent");
        TorrentStreamer.removeEventListener('status', this.statusfn);
        TorrentStreamer.removeEventListener('error', this.errorfn);
        TorrentStreamer.removeEventListener('ready', this.readyfn);
        TorrentStreamer.removeEventListener('stop', this.stopfn);
    }
     /**
    * 渲染
    */ 
    render() {
        const {progress,buffer,downloadSpeed,seeds,loading,type} = this.state;
        return (
            <View style={styles.root}>
                {
                    (buffer!=100&&type=="open") ?(
                        <ReadyPlay buffer={buffer} />
                ) : (
                    <View style={styles.root}>
                    <View style={styles.head}>
                    <TouchableHighlight style={styles.back} onPress={()=>{this.props.navigation.goBack()}}>
                        <Image style={styles.return} source={require("../img/return.png")} />   
                    </TouchableHighlight>
                    <Text style={styles.headTitle}>
                        下载中心
                    </Text>
                </View>
                <DownloadItem progress={progress} buffer={buffer} downloadSpeed={downloadSpeed} seeds={seeds} />
                <TouchableHighlight onPress={this.playVideo.bind(this)} style={styles.playVideoBtn}>
                    <View style={styles.playVideo}>
                        <Text style={styles.playTxt}>立即播放</Text>
                    </View>
                </TouchableHighlight>
                </View>
                
            )
                }
                
            </View>
        )
    }
}
const styles = StyleSheet.create({
    root: {
        width,
        height,
        backgroundColor: "rgba(0,0,0,0.9)"
    },
    playVideoBtn: {
        position: "absolute",
        left: 0,
        bottom: 30
    },
    playVideo: {
        width,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#6495ED",
        borderRadius: 50
    },
    playTxt: {
        color: "#fff",
        fontSize: 20
    },
    headTitle: {
        color: "#fff",
        fontSize: 18,
        left: 5,
        top: 3
    },
    head: {
        height: 50,
        justifyContent: "center",
        paddingLeft: 50
    },
    return: {
        width: 40,
        height: 40
    },
    back: {
        position: "absolute",
        left: 5,
        top: 10
    }
});
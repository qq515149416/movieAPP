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
  TouchableHighlight,
  ScrollView,
  Picker
} from 'react-native';
const {width,height} = Dimensions.get("window");
export default class Article extends Component {
  constructor(props) {
    super(props);
    this.state = {
      progress: 0,
      buffer: 0,
      downloadSpeed: 0,
      seeds: 0,
      backdropUrl: "",
      backdropIndex: 0,
      fileurl: "",
      loading: false
    }
  }
  componentWillMount() {
    let self = this;
    let {state} = this.props.navigation;
    this.setState({
      backdropUrl: state.params.url.length?state.params.url[0].backdropUrl:null
    });
    this.picker_item = state.params.url.map((item,index)=>{
      return (
        <Picker.Item key={"线路"+(index+1)} label={"线路"+(index+1)} value={item.backdropUrl} />
      );
    });
  }
  parseDate = (date) => {
    var time = new Date(date * 1000);
    return this._add0(time.getHours()) + ":"+ this._add0(time.getMinutes());
  }
  _add0 = (num) => {
    return Number(num)>=10?num:"0"+num;
  }
  download = (url) => {
    // alert("开始下载"+url);
    this.props.navigation.navigate("Download",{
      url,
      type: "download",
      aid: this.props.navigation.state.params.id
    });
  }
  openflie = (url) => {
    this.props.navigation.navigate("Download",{
      url,
      type: "open",
      aid: this.props.navigation.state.params.id
    });
  }
  
  onValueChange = (value,index) => {
    this.setState({
      backdropUrl: value
    });
  }
   /**
    * 渲染
    */ 
  render() {
    const {navigate,goBack,state} = this.props.navigation;
    const {progress,buffer,downloadSpeed,seeds,posTop,cheight,loading} = this.state;
    let {backdropUrl} = this.state;
    let point = Math.floor(state.params.rating/10*5);
    let star = [];
    for(let i = 0;i<point;i++) {
      star.push(<Image key={i} style={styles.star} source={require("../img/collection_fill.png")} />);
    }
    for(let i =0;i<5-point;i++) {
      star.push(<Image key={point+i} style={styles.star} source={require("../img/collection.png")} />);
    }
    return (
        <ScrollView overScrollMode={loading?"never":"auto"} style={styles.container}>
          <View style={styles.container}>
            <ImageBackground source={{uri: state.params.posterMedium}} style={styles.topBg}>
              <View style={styles.topBgSub}>
                <View style={styles.head}>
                  <TouchableHighlight onPress={()=>{goBack()}}>
                    <Image style={styles.return} source={require("../img/return.png")} />
                  </TouchableHighlight>
                  <Image style={styles.collect} source={require("../img/collect.png")} />
                </View>
                <View style={styles.body}>
                  <View style={styles.starContainer}>
                    <View style={styles.starContainer}>
                      {star}
                    </View>
                    <View style={styles.score}>
                      <Text style={styles.score_text}>
                        {state.params.rating}
                      </Text>
                      <Text style={styles.score_text}>
                        /10
                      </Text>
                    </View>
                  </View>
                  <View>
                    <Text style={styles.title}>
                      {state.params.title}
                    </Text>
                  </View>
                  <View style={styles.rowBox}>
                    <Image style={styles.icon} source={require("../img/calendar.png")} />
                    <Text style={styles.iconText}>{state.params.year}</Text>
                    <Image style={styles.icon} source={require("../img/time.png")} />
                    <Text style={styles.iconText}>60分钟</Text>
                  </View>
                </View>
              </View>            
            </ImageBackground>
            <View style={[styles.bodyContent,{bottom: posTop}]}>
              <ImageBackground source={require("../img/keji.jpg")} style={styles.bodyContentChild}>
                <View>
                  <Text style={styles.bodyContentText}>
                    {state.params.description}
                  </Text>

                  <Picker style={styles.selectPicker} selectedValue={backdropUrl} prompt="请选择下载线路" onValueChange={(val,idx)=>{this.onValueChange(val,idx)}}>
                    {
                      this.picker_item
                    }
                  </Picker>
                </View>
                
              </ImageBackground>
                <TouchableHighlight onPress={()=>{this.openflie(backdropUrl)}} style={styles.playBox}>
                  <Image style={styles.playIcon} source={require("../img/play.png")} />
                </TouchableHighlight>
                <TouchableHighlight style={styles.downloadBox} onPress={()=>{this.download(backdropUrl)}}>
                    <Image style={styles.downloadIcon} source={require("../img/download.png")} />
                </TouchableHighlight>
            </View>
          </View>
          {
            loading?null:(<View style={{height: 120}}></View>)
          }
          
          {
            loading ? (
              <ActivityIndicator style={styles.loading} size="large" />
            )
            :
            null
          }
        </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
    container: {
      height
    },
    topBg: {
      width,
      height: 400
    },
    topBgSub: {
      width,
      height: 400,
      backgroundColor: "rgba(0,0,0,0.3)",
      flexDirection: "column",
      justifyContent: "space-between"
    },
    head: {
      flexDirection: "row",
      width,
      justifyContent: "space-between",
      paddingHorizontal: 10,
      paddingVertical: 10
    },
    body: {
      paddingLeft: 20,
      paddingBottom: 36,
      paddingRight: 70
    },
    bodyContent: {
      height: height/2,
      overflow: "visible",
      position: "absolute",
      top: (height/2)+60,
      left: 0,
      paddingVertical: 20,
    },
    bodyContentChild: {
      paddingHorizontal: 20,
      paddingTop: 30,
      paddingBottom: 20,
      backgroundColor: "rgba(0,0,0,0.5)",
      height: (height/2)+200,
      width: width
    },
    playBox: {
      position: "absolute",
      top: 0,
      right: 20,
      width: 50,
      height: 50,
      borderRadius: 30,
      backgroundColor: "#FFC125",
      overflow: "visible",
      zIndex: 99,
      justifyContent: "center",
      alignItems: "center"
    },
    playIcon: {
      width: 30,
      height: 30
    },
    downloadIcon: {
      width: 30,
      height: 30
    },
    downloadBox: {
      position: "absolute",
      top: 0,
      right: 30+30+30,
      width: 50,
      height: 50,
      borderRadius: 30,
      backgroundColor: "#FFC125",
      overflow: "visible",
      zIndex: 99,
      justifyContent: "center",
      alignItems: "center"
    },
    bodyContentText: {
      color: "#fff"
    },
    rowBox: {
      flexDirection: "row"
    },
    icon: {
      width: 20,
      height: 20
    },
    iconText: {
      color: "#fff"
    },
    return: {
      width: 30,
      height: 30
    },
    collect: {
      width: 30,
      height: 30
    },
    starContainer: {
      flexDirection: "row"
    },
    star: {
      width: 20,
      height: 20
    },
    score: {
      flexDirection: "row"
    },
    score_text: {
      color: "#fff"
    },
    title: {
      fontSize: 20,
      fontWeight: "bold",
      color: "#fff",
      lineHeight: 32
    },
    selectPicker: {
      color: "#fff",
      backgroundColor: "rgba(0,0,0,.7)",
      borderRadius: 4,
      marginTop: 10
    },
    loading: {
      width,
      height,
      backgroundColor: "rgba(0,0,0,0.5)",
      position: "absolute",
      top: 0,
      left: 0,
      zIndex: 100
    }
});
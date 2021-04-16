import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  Dimensions,
  DrawerLayoutAndroid,
  ImageBackground,
  TouchableHighlight,
  Image
} from 'react-native';
import MovieItem from "../component/movieItem.js";
import Head from "../component/head.js";
import md5 from "react-native-md5";
const {width,height} = Dimensions.get("window");
global.fileurl = {};
export default class Home extends Component {
  /**
   * 
   * 初始化配置
   */
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      indexData: [],
      loading: false,
      page: 1,
      count: 12,
      refreshing: false
    };
    this.getDataed = false;
  }
  /**
   * 
   * @param {*接口地址} url 
   * @param {*获取请求结果的回调} callbrak 
   */
  ajax(url,callbrak) {
    let ajax = fetch(url).then((response)=>{
      return response.text();
    }).then((responseText)=>{
      try {
        let result = JSON.parse(responseText);
        console.log(result,url);
        if(callbrak) {
          callbrak(result);
        }else {
          return result;
        }
      }catch(e) {
        if(callbrak) {
          callbrak([]);
        }else {
          return [];
        }
      }
      
     
      
    });
    return ajax;
  }
  /**
   * 获取资源
   */ 
  componentDidMount() {
    let {count} = this.state;

    this.setState({
      loading: true
    });
    this.ajax("http://mv918.com/?api=list&id=1&token=2956486c175b34bfcca6973bf51b8d2a",(data)=>{
      let ajaxs = [];
      data.forEach((item,index)=>{
        if(index<count) {
          ajaxs.push(this.ajax("http://mv918.com/?api=post&id="+item.id+"&token="+md5.hex_md5(item.id+"abcd")));
        }
      });
      Promise.all(ajaxs).then((result)=>{
        result.forEach((e,index)=>{
          e.id = data[index].id;
        })
        this.setState({
          data: result,
          loading: false,
          indexData: data
        });
      });
    });
  }
  getData(page) {
    if(!this.getDataed) {
      this.setState({
        page
      });
      let {indexData,count,data} = this.state;
      let ajaxs = [];
      indexData.forEach((item,index)=>{
        if((count*page<index)&&(index<count*page+count)) {
          // console.log(index,page,"true");
          ajaxs.push(this.ajax("http://mv918.com/?api=post&id="+item.id+"&token="+md5.hex_md5(item.id+"abcd")));
        }else {
          // console.log(count*(page-1)<index);
          // console.log("page:"+page,"count:"+count,"index:"+index);
          // console.log(count*page+count);
          // console.log(count*page+index);
          // console.log("======================================");
        }
      });
      this.getDataed = true;
      this.setState({
        refreshing: true
      });
      Promise.all(ajaxs).then((result)=>{
        this.getDataed = false;
        this.setState({
          refreshing: false
        });
        result.forEach((e,index)=>{
          e.id = md5.hex_md5((Math.random()*10000000)+"");
        });
        console.log(result);
        this.setState({
          data: data.concat(result)
        });
      });
    }
  }
  showDownload = () => {
    this.props.navigation.navigate("Download",{
      type: "show"
    });
  }
  toPage = (page,data) => {
    this.props.navigation.navigate(page,data);
  }
  showSide = () => {
    this.drawer.openDrawer();
  }
  /**
   * 渲染
   */ 
  render() {
    let {data,loading,page,refreshing,progress,buffer,downloadSpeed,seeds} = this.state;
    let navigationView = (
      <ImageBackground source={require("../img/timg.jpg")} style={styles.sideRoot}>
        <View style={styles.sideSub}>
          <View style={styles.sideHead}>
            <View style={styles.avatarBorder}>
              <Image style={styles.avatar} source={require("../img/Avatar.png")}></Image>
            </View>
            <View style={styles.layoutTitleRoot}>
              <Text style={styles.layoutTitle}>
                MOVIELITEM
              </Text>
            </View>
          </View>
          <TouchableHighlight onPress={this.showDownload.bind(this)}>
            <View style={styles.layoutDownloadItem}>
              <Text style={styles.layoutDownloadTxt}>
                下载中心
              </Text>
            </View>
          
          </TouchableHighlight>
        </View>
        
      </ImageBackground>
    );
    return (
      <DrawerLayoutAndroid
      ref={(drawer) => { this.drawer = drawer; }}
      drawerWidth={300}
      drawerPosition={DrawerLayoutAndroid.positions.Left}
      renderNavigationView={() => navigationView}>
        <View style={[styles.root,{height: height}]}>
          {
            loading
            ?
            <ActivityIndicator style={styles.loading} size="large" />
            :(
              <View>
              <Head showSide={this.showSide.bind(this)} />
              <FlatList 
              refreshing={refreshing}
              keyExtractor={(item)=>item.id}
              horizontal={false}
              numColumns={3}
              data={data}
              onEndReached={()=>{page++;this.getData(page);}}
              renderItem={({item,index}) => <MovieItem toevent={this.toPage} data={item} year={item.year} rating={item.rating} haibao={item.posterMedium} style={styles.movie} index={index%3} /> }
            />
            </View>
            )
          }
        </View>
      </DrawerLayoutAndroid>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
    backgroundColor: "rgba(0,0,0,0.9)"
  },
  layoutDownloadItem: {
    height: 50,
    paddingTop: 12,
    paddingLeft: 20,
    marginVertical: 10,
    backgroundColor: "rgba(65,105,225,0.5)"
  },
  layoutDownloadTxt: {
    color: "#fff",
    fontSize: 18
  },
  layoutTitle: {
    color: "#fff",
    fontSize: 25
  },
  layoutTitleRoot: {
    marginTop: 60,
    left: -10
  },
  movie: {
    height: 160
  },
  loading: {
    width: width,
    marginTop: 0
  },
  sideRoot: {
    height,
  },
  sideSub: {
    backgroundColor: "rgba(0,191,255,0.5)",
    height
  },
  sideHead: {
    backgroundColor: "#000",
    height: 150,
    flexDirection: "row",
    justifyContent: "space-around"
  },
  avatarBorder: {
    width: 110,
    height: 110,
    backgroundColor: "#fff",
    borderRadius: 110,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 100
  }
});
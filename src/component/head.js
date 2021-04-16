import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  Dimensions,
  Image,
  TouchableHighlight,
  TextInput
} from 'react-native';
import md5 from "react-native-md5";
const {width,height} = Dimensions.get("window");
export default class Head extends Component {
    /**
     * 渲染
     */ 
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.menuAndLogo}>
                    <TouchableHighlight onPress={()=>{this.props.showSide()}}>
                        <View style={styles.menu}>
                            <Image style={styles.menuIcon} source={require("../img/menu.png")} />
                        </View>
                    </TouchableHighlight>
                    
                    <View>
                        <Text style={styles.logoText}>movieItem</Text>
                    </View>
                </View>
                <View style={styles.search}>
                    <Image style={styles.searchIcon} source={require("../img/search.png")} />
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: "#000",
        flexDirection: "row",
        justifyContent: "space-between",
        height: 50
    },
    menu: {
        width: 50,
        height: 50,
        justifyContent: "center",
        alignItems: "center"
    },
    logoText: {
        color: "#fff",
        fontSize: 30,
        lineHeight: 42
    },
    menuAndLogo: {
        flexDirection: "row"
    },
    menuIcon: {
        width: 25,
        height: 25
    },
    search: {
        width: 50,
        height: 50,
        justifyContent: "center",
        alignItems: "center"
    },
    searchIcon: {
        width: 25,
        height: 25
    }
});
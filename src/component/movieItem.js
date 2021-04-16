import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableHighlight
} from 'react-native';
const {width,height} = Dimensions.get("window");
const styles = StyleSheet.create({
    movieItem: {
        width: width/3-1,
        height: 160,
        paddingTop: 1,
        paddingRight: 1,
        marginRight: 1
    },
    image: {
        width: width/3-1,
        height: 159
    },
    inlineView: {
        width: width/3,
        position: "absolute",
        bottom: 0,
        left: 0,
        flexDirection: "row",
        justifyContent: "space-between"
    },
    text: {
        color: "rgba(255,255,255,.7)",
        marginHorizontal: 4
    },
    icon: {
        width: 16,
        height: 16,
        position: "relative",
        top: 2,
        left: 2
    }
});
export default class MovieItem extends Component {
    clickfn = () => {
        this.props.toevent("Detail",this.props.data);
    }
    componentDidMount() {
        
    }
    render() {
        return (
            <TouchableHighlight onPress={this.clickfn.bind(this)}>
                <View style={this.props.index==2?{
                    width: width/3,
                    height: 160,
                    paddingTop: 1
                }:styles.movieItem}>
                    <Image style={this.props.index==2?{
                        width: width/3,
                        height: 159
                    }:styles.image} source={{uri:this.props.haibao}} />
                    <View style={styles.inlineView}>
                        <View style={{flexDirection: "row"}}>
                            <Image style={styles.icon} source={require("../img/collection.png")} />
                            <Text style={styles.text}>{this.props.rating}</Text>
                        </View>
                        <View>
                            <Text style={styles.text}>{this.props.year}</Text>
                        </View>
                    </View>
                </View>
            </TouchableHighlight>
        )
    }
}
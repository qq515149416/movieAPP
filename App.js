/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import {
  StackNavigator,
} from 'react-navigation';
import Home from "./src/page/home.js";
import Article from "./src/page/article.js";
import Download from "./src/page/download.js";
const App = StackNavigator({
  Main: {
    screen: Home,
    navigationOptions: {
      header: null
    }
  },
  Detail: {
    screen: Article,
    navigationOptions: {
      header: null
    }
  },
  Download: {
    screen: Download,
    navigationOptions: {
      header: null
    }
  }
});
export default App;
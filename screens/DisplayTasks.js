import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  Image,
  TouchableOpacity,
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import { FlatList } from 'react-native-gesture-handler';
import firebase from 'firebase';
import AppHeader from '../components/AppHeader';
import Ionicons from 'react-native-vector-icons/Ionicons';
import TaskDisplay from "./TaskDisplay"

let customFonts = {
  'Bubblegum-Sans': require("../assets/BubblegumSans-Regular.ttf"),
};

export default class DisplayTasks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontsLoaded: false,
      tasks: [],
     
    };
  }

  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  deleteTask = (task) => {
    console.log('trigger');

    
  };

  keyExtractor = (item, index) => index.toString();

  renderItem = ({ item: task }) => {
    return <TaskDisplay task={task} navigation={this.props.navigation} />;
  };



  componentDidMount() {
    this._loadFontsAsync();
    this.fetchTasks();
  }

  todo = () => {
    this.props.navigation.navigate('Task');
  };

  fetchTasks = () => {
    firebase
      .database()
      .ref('/')
      .on(
        'value',
        (snapshot) => {
          let tasks = [];
          if (snapshot.val()) {
            Object.keys(snapshot.val()).forEach(function (key) {
              tasks.push({
                key: key,
                value: snapshot.val()[key],
              });
            });
          }
          this.setState({ tasks: tasks });
          this.props.setUpdateToFalse();
        },
        function (errorObject) {
          console.log('The read failed: ' + errorObject.code);
        }
      );
  };

  render() {
    if (!this.state.fontsLoaded) {
      return <AppLoading />;
    } else {
      return (
        <View>
          <SafeAreaView style={styles.droidSafeArea} />
          <AppHeader />
          {!this.state.tasks[0] ? (
            <View style={styles.noTasks}>
              <Text
                style={{
                  marginTop: '50%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  fontSize: 40,
                }}>
                You are free today!
              </Text>
            </View>
          ) : (
            <View style={styles.taskContainer}>
              <FlatList
                keyExtractor={this.keyExtractor}
                data={this.state.tasks}
                renderItem={this.renderItem}
              />
            </View>
          )}
          <View style={{ flex: 0.08 }} />
          <TouchableOpacity onPress={this.todo}>
            <Image
              source={require('../assets/plus-removebg-preview.png')}
              style={{
                width: 90,
                height: 90,
                marginTop: '80%',
                marginLeft: '70%',
              }}
            />
          </TouchableOpacity>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#15193c',
  },
  droidSafeArea: {
    marginTop:
      Platform.OS === 'android' ? StatusBar.currentHeight : RFValue(35),
  },

  taskContainer: {
    flex: 0.85,
  },
  noTasks: {
    flex: 0.85,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

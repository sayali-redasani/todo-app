import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { RFValue } from 'react-native-responsive-fontsize';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import firebase from 'firebase';

let customFonts = {
  'Bubblegum-Sans': require('../assets/BubblegumSans-Regular.ttf'),
};

export default class TaskDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontsLoaded: false,
      task_id: this.props.task.key,
      task_data: this.props.task.value,
    };
  }

  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
    this._loadFontsAsync();
  }

  deletetask=(task)=>{
   // firebase.database().ref("/tasks/").child(task.title).remove();
  }

  render() {
    let task = this.state.task_data;
    if (!this.state.fontsLoaded) {
      return <AppLoading />;
    } else {
      return (
        <TouchableOpacity
          style={styles.container}
          onPress={() =>
            this.props.navigation.navigate('IndividualTask', {
              task: this.props.task,
            })
          }>
          <SafeAreaView style={styles.droidSafeArea} />
          <View style={styles.cardContainerLight}>
            <View style={styles.titleContainer}>
              <View style={styles.titleTextContainer}>
              
                <Text style={styles.storyTitleTextLight}>{task.title}
                <TouchableOpacity onPress={this.deletetask(task)} style={{marginLeft: "70%"}}>
                 <Ionicons
                  name={"close-outline"}
                  size={RFValue(30)}
                  style={{marginLeft: "80%"}}
              
                />
                </TouchableOpacity>
                </Text>


                <Text style={styles.descriptionTextLight}>
                  {this.props.task.description}
                </Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      );
    }
  }
}

const styles = StyleSheet.create({
  droidSafeArea: {
    marginTop:
      Platform.OS === 'android' ? StatusBar.currentHeight : RFValue(35),
  },
  cardContainerLight: {
    margin: RFValue(13),
    backgroundColor: 'white',
    borderRadius: RFValue(20),
    shadowColor: 'rgb(0, 0, 0)',
    shadowOffset: {
      width: 3,
      height: 3,
    },
    shadowOpacity: RFValue(0.5),
    shadowRadius: RFValue(5),
    elevation: RFValue(2),
  },
  
  titleContainer: {
    paddingLeft: RFValue(20),
    justifyContent: 'center',
  },
  titleTextContainer: {
    flex: 0.8,
  },
  storyTitleTextLight: {
    fontFamily: 'Bubblegum-Sans',
    fontSize: RFValue(25),
    color: 'black',
  },

  descriptionTextLight: {
    fontFamily: 'Bubblegum-Sans',
    fontSize: RFValue(13),
    color: 'black',
  },


});

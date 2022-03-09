import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Button,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import firebase from 'firebase';

let customFonts = {
  'Bubblegum-Sans': require('../assets/BubblegumSans-Regular.ttf'),
};

class Task extends React.Component {
  constructor() {
    super();
    this.state = {
      title: '',
      description: '',
      fontsLoaded: false,
      count: 0,
    };
  }

  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
    this._loadFontsAsync();
  }

  async addTask() {
    if (this.state.title && this.state.description) {
      console.log(this.state.count + 'hello');
      let taskData = {
        title: this.state.title,
        description: this.state.description,
      };

      await firebase
        .database()
         .ref(
          "/" 
        ).push(taskData)
        .then(this.props.navigation.navigate('DisplayTasks'));
      this.setState({
        count: this.state.count + 1,
      });
    } else {
      Alert.alert('Enter the required details.');
    }
  }

  render() {
    if (!this.state.fontsLoaded) {
      return <AppLoading />;
    } else {
      return (
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.textContainer}>
          <View style={{ marginHorizontal: RFValue(10), marginTop: 100 }}>
            <TextInput
              style={[styles.inputFont, { fontSize: 40 }]}
              onChangeText={(title) => this.setState({ title })}
              placeholder={'Title'}
              placeholderTextColor="white"
            />

            <TextInput
              style={[
                styles.inputFont,
                styles.inputFontExtra,
                styles.inputTextBig,
                { height: 100 },
              ]}
              onChangeText={(description) => this.setState({ description })}
              placeholder={'Description'}
              multiline={true}
              numberOfLines={4}
              placeholderTextColor="white"
            />
          </View>
          <View style={styles.submitButton}>
            <Button
              onPress={() => {
                this.addTask();
              }}
              title="Add"
              color="#841584"
            />
          </View>
        </KeyboardAvoidingView>
      );
    }
  }
}

const styles = StyleSheet.create({
  textContainer: {
    flex: 1,
    backgroundColor: 'lightpink',
  },
  inputBox: {
    marginTop: 400,
    width: '80%',
    alignSelf: 'center',
    height: 80,
    textAlign: 'center',
    borderWidth: 4,
    outline: 'none',
  },
  inputFont: {
    height: RFValue(40),
    borderColor: 'white',
    borderWidth: RFValue(1),
    borderRadius: RFValue(10),
    paddingLeft: RFValue(10),
    color: 'white',
    fontFamily: 'Bubblegum-Sans',
  },
  inputFontExtra: {
    marginTop: RFValue(15),
  },
  inputTextBig: {
    textAlignVertical: 'top',
    padding: RFValue(5),
  },
  submitButton: {
    marginTop: RFValue(20),
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Task;

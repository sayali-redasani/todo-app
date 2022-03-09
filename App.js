import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DisplayTasks from './screens/DisplayTasks';
import Task from './screens/task';
import IndividualTask from "./screens/IndividualTask"

import firebase from "firebase"
import { firebaseConfig } from "./config";

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();
}

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="DisplayTasks" component={DisplayTasks} />
        <Stack.Screen name="Task" component={Task} />
         <Stack.Screen name="IndividualTask" component={IndividualTask} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

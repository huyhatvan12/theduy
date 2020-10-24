/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import HomeView from './lib/views/HomeView';
import CreateNoteView from './lib/views/CreateNoteView';

const createScreen = screen =>
  <Stack.Screen 
    name={screen.name}
    options={screen.options}
    component={screen.component}/>

const Stack = createStackNavigator();

class App extends React.Component {
  constructor (props) {
    super(props);
  }

  render = () => (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
          {createScreen({
            name: 'Home',
            component: HomeView,
            options: {
              title: 'Note App'
            }
          })}
        {createScreen({
          name: 'CreateNote',
          component: CreateNoteView,
          options: {
            headerShown: null
          }
        })}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

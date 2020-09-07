import 'react-native-gesture-handler';
import React, { FC } from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import AddEntryScreen from './screens/AddEntry';
import ListScreen from './screens/List';

export type RootStackParamList = {
  List: undefined;
  Add: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const App: FC = () => {
  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" />
      <Stack.Navigator
        initialRouteName="List"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#4A5568',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}>
        <Stack.Screen
          name="List"
          component={ListScreen}
          options={{ title: 'My List' }}
        />
        <Stack.Screen
          name="Add"
          component={AddEntryScreen}
          options={{ title: 'Add An Entry' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

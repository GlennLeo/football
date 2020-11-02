import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Dashboard} from '../Screens';

const Stack = createStackNavigator();

export const AuthNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Dashboard" component={Dashboard} />
    </Stack.Navigator>
  );
};

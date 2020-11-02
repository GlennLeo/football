import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Signin, Signup} from '../Screens';

const Stack = createStackNavigator();

export const UnAuthNavigator = () => {
  return (
    <Stack.Navigator headerMode="none" initialRouteName="Signin">
      <Stack.Screen name="Signin" component={Signin} />
      <Stack.Screen name="Signup" component={Signup} />
    </Stack.Navigator>
  );
};

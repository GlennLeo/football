import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Login, Signup} from '../Screens';

const UnAuthStack = createStackNavigator();
const UnAuthNavigator = () => {
  return (
    <UnAuthStack.Navigator headerMode="none">
      <UnAuthStack.Screen name="Login" component={Login} />
      <UnAuthStack.Screen name="Signup" component={Signup} />
    </UnAuthStack.Navigator>
  );
};

export default UnAuthNavigator;

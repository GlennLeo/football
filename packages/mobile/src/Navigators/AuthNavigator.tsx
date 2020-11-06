import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Account, Dashboard, Team} from '../Screens';

const Tab = createBottomTabNavigator();

const AuthNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Dashboard" component={Dashboard} />
      <Tab.Screen name="Team" component={Team} />
      <Tab.Screen name="Account" component={Account} />
    </Tab.Navigator>
  );
};

export default AuthNavigator;

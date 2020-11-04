import {createStackNavigator} from '@react-navigation/stack';
import React, {useContext} from 'react';
import {AuthContext} from '../Contexts';
import AuthNavigator from './AuthNavigator';
import UnAuthNavigator from './UnAuthNavigator';

const Stack = createStackNavigator();

export const ApplicationNavigator = () => {
  const {token} = useContext(AuthContext);

  return (
    <Stack.Navigator headerMode="none">
      {token ? (
        <Stack.Screen name="AuthNavigator" component={AuthNavigator} />
      ) : (
        <Stack.Screen name="UnAuthNavigator" component={UnAuthNavigator} />
      )}
    </Stack.Navigator>
  );
};

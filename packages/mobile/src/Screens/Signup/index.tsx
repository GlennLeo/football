import React from 'react';
import {View} from 'react-native';
import {Input, Text} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

export const Signup = () => {
  return (
    <View>
      <Text h1>Signup</Text>
      <Input
        placeholder="email@address.com"
        leftIcon={{type: 'font-awesome', name: 'email'}}
      />
      <Input
        placeholder="Password"
        leftIcon={{type: 'font-awesome', name: 'password'}}
        secureTextEntry={true}
      />
    </View>
  );
};

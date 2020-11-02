import React from 'react';
import {View} from 'react-native';
import {Input, Text} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {SafeAreaView} from 'react-native-safe-area-context';

export const Signin = () => {
  return (
    <SafeAreaView>
      <Text h1>Signin</Text>
      <View>
        <Input placeholder="email@address.com" />
        <Input placeholder="Password" secureTextEntry={true} />
      </View>
    </SafeAreaView>
  );
};

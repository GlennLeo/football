import React, {useContext} from 'react';
import {Button, Text} from 'react-native-elements';
import {SafeAreaView} from 'react-native-safe-area-context';
import RNSInfo from 'react-native-sensitive-info';
import {AuthContext} from '../../Contexts';

export const Account = () => {
  const {setToken} = useContext(AuthContext);
  return (
    <SafeAreaView>
      <Text h1>Account</Text>

      <Button
        onPress={() => {
          RNSInfo.deleteItem('token', {});
          setToken('');
        }}
        title="Logout"
      />
    </SafeAreaView>
  );
};

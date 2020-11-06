import React, {useContext, useEffect} from 'react';
import {Button, Text} from 'react-native-elements';
import {SafeAreaView} from 'react-native-safe-area-context';
import RNSInfo from 'react-native-sensitive-info';
import {AuthContext, UserContext} from '../../Contexts';

export const Dashboard = () => {
  const {setToken} = useContext(AuthContext);
  const {user} = useContext(UserContext);
  useEffect(() => {
    console.log(user);
  }, []);
  return (
    <SafeAreaView>
      <Text h1>Dashboard</Text>
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

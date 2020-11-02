import React, {useEffect, useState} from 'react';
import RNSInfo from 'react-native-sensitive-info';
import {AuthNavigator} from './AuthNavigator';
import {UnAuthNavigator} from './UnAuthNavigator';

export const ApplicationNavigator = () => {
  const [token, setToken] = useState('');
  const getToken = async () => {
    const token = await RNSInfo.getItem('token', {});
    token && setToken(token);
  };
  useEffect(() => {
    getToken();
  }, [token]);

  if (!token) return <UnAuthNavigator />;
  return <AuthNavigator />;
};

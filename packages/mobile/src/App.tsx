import React, {useEffect, useMemo, useState} from 'react';
import {Text} from 'react-native';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {ThemeProvider} from 'react-native-elements';
import SplashScreen from 'react-native-splash-screen';
import {ApolloProvider} from '@apollo/client';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import FlashMessage from 'react-native-flash-message';
import RNSInfo from 'react-native-sensitive-info';
import {ApplicationNavigator} from './Navigators';
import {client} from './Libs';
import {AuthContext} from './Contexts';

declare const global: {HermesInternal: null | {}};

const App = () => {
  const [token, setToken] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const userValue = useMemo(() => ({token, setToken}), [token, setToken]);

  const getToken = async () => {
    const currentToken = await RNSInfo.getItem('token', {});
    currentToken && setToken(currentToken);
    setIsLoading(false);
  };

  useEffect(() => {
    getToken();
  }, [token]);

  useEffect(() => {
    if (!isLoading) {
      SplashScreen.hide();
    }
  }, [isLoading]);

  if (isLoading) return <Text>Loading</Text>;
  return (
    <ApolloProvider client={client}>
      <AuthContext.Provider value={userValue}>
        <SafeAreaProvider>
          <NavigationContainer>
            <ThemeProvider>
              <ApplicationNavigator />
              <FlashMessage position="top" />
            </ThemeProvider>
          </NavigationContainer>
        </SafeAreaProvider>
      </AuthContext.Provider>
    </ApolloProvider>
  );
};

export default App;

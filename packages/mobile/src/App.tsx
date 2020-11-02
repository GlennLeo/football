import React, {useEffect} from 'react';
import {SafeAreaView} from 'react-native';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {ThemeProvider} from 'react-native-elements';
import SplashScreen from 'react-native-splash-screen';
import {ApolloProvider} from '@apollo/client';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {ApplicationNavigator} from './Navigators';
import {client} from './Libs';

declare const global: {HermesInternal: null | {}};

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  return (
    <ApolloProvider client={client}>
      <SafeAreaProvider>
        <NavigationContainer>
          <ThemeProvider>
            <ApplicationNavigator />
          </ThemeProvider>
        </NavigationContainer>
      </SafeAreaProvider>
    </ApolloProvider>
  );
};

export default App;

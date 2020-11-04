import React, {useContext, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Input, Text} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useMutation} from '@apollo/client';
import {useForm} from 'react-hook-form';
import RNSInfo from 'react-native-sensitive-info';
import {showMessage} from 'react-native-flash-message';
import {UserMutations} from '../../Libs';
import {Colors, Layouts, Paddings} from '../../Styles';
import {AuthContext} from '../../Contexts';

export const Login = () => {
  const [login, {data, loading, error}] = useMutation(UserMutations.LOGIN);
  const {register, handleSubmit, setValue} = useForm();
  const {setToken} = useContext(AuthContext);

  const onSubmit = (values: any) => {
    login({variables: {email: values.email, password: values.password}});
  };

  useEffect(() => {
    register('email');
    register('password');
  }, [register]);

  useEffect(() => {
    const storeToken = async () => {
      if (data?.login?.token) {
        await RNSInfo.setItem('token', data.login.token, {});
        setToken(data.login.token);
      }
      if (error) {
        showMessage({
          message: error.message,
          type: 'danger',
        });
      }
    };
    storeToken();
  }, [loading, data, error]);

  return (
    <SafeAreaView style={styles.container}>
      <Text h1 h1Style={styles.h1}>
        Login
      </Text>
      <View>
        <Input
          label="Email"
          placeholder="email@address.com"
          style={styles.input}
          labelStyle={styles.inputLabel}
          onChangeText={(text) => setValue('email', text)}
        />
        <Input
          label="Password"
          placeholder="Password"
          secureTextEntry={true}
          style={styles.input}
          labelStyle={styles.inputLabel}
          onChangeText={(text) => setValue('password', text)}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Login"
          type="solid"
          buttonStyle={styles.buttonStyle}
          titleStyle={styles.buttonTextStyle}
          onPress={handleSubmit(onSubmit)}
          loading={loading}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    ...Layouts.verticalCenter,
    backgroundColor: Colors.primary,
    flex: 1,
    padding: Paddings.base,
  },
  h1: {
    color: Colors.white,
  },
  inputContainer: {
    marginTop: 24,
  },
  input: {
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.5)',
    color: Colors.white,
    padding: Paddings.input,
  },
  inputLabel: {
    color: Colors.white,
  },
  buttonContainer: {
    ...Layouts.horizontalCenter,
  },
  buttonStyle: {
    borderRadius: 24,
    padding: Paddings.input,
    width: 200,
    borderColor: Colors.white,
    backgroundColor: Colors.white,
  },
  buttonTextStyle: {
    color: Colors.primary,
  },
});

import React, {useContext, useEffect} from 'react';
import {Text} from 'react-native-elements';
import {SafeAreaView} from 'react-native-safe-area-context';
import {UserContext} from '../../Contexts';

export const Dashboard = () => {
  const {user} = useContext(UserContext);
  useEffect(() => {
    console.log(user);
  }, []);

  return (
    <SafeAreaView>
      <Text h1>Dashboard</Text>
      {user?.teams.length === 0 ? (
        <Text h3>You haven't joined any teams yet!</Text>
      ) : (
        user.teams.map((team: any) => <Text h2>{team.name}</Text>)
      )}
    </SafeAreaView>
  );
};

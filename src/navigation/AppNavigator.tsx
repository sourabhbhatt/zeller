import {View, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer, InitialState} from '@react-navigation/native';

import Loader from '../components/Loader';
import UserScreen from '../screens/UserScreen';
import HomeScreen from '../screens/HomeScreen';
import {AppResources} from '../utils/resources';
import {getItem, setItem} from '../utils/storage';
import UserDetailsScreen from '../screens/UserDetailsScreen';

export type RootStackParamList = {
  Home: undefined;
  Users: undefined;
  UserDetails: undefined;
};
const Stack = createStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  const [isReady, setIsReady] = useState(false);
  const [initialState, setInitialState] = useState<InitialState | null>(null);

  useEffect(() => {
    const restoreState = async () => {
      try {
        const savedState = getItem<InitialState>(AppResources.persistenceKey);
        if (savedState && typeof savedState === 'object' && savedState.routes) {
          setInitialState(savedState);
        }
      } catch (error) {
        console.error('Failed to restore navigation state', error);
      }
      setIsReady(true);
    };

    restoreState();
  }, []);

  if (!isReady) {
    return (
      <View style={styles.loaderContainer}>
        <Loader visible={true} size="small" message="Loading App State..." />
      </View>
    );
  }

  return (
    <NavigationContainer
      initialState={initialState ?? {routes: [], index: 0}}
      onStateChange={state => setItem(AppResources.persistenceKey, state)}>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Users" component={UserScreen} />
        <Stack.Screen name="UserDetails" component={UserDetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

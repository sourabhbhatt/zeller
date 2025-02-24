import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {
  NavigationContainer,
  InitialState,
  DefaultTheme,
} from '@react-navigation/native';

import Loader from '../components/Loader';
import UserScreen from '../screens/UserScreen';
import HomeScreen from '../screens/HomeScreen';
import {AppResources} from '../utils/resources';
import {getItem, setItem} from '../utils/storage';

const Stack = createStackNavigator();

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
      onStateChange={state => setItem(AppResources.persistenceKey, state)}
      theme={DefaultTheme} // Ensures consistent theme
    >
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Users" component={UserScreen} />
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

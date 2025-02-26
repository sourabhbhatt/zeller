import React, {memo} from 'react';
import {ApolloProvider} from '@apollo/client';
import {
  StatusBar,
  SafeAreaView,
  StyleSheet,
  View,
  Platform,
} from 'react-native';
import {Provider} from 'react-redux';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import store from './src/redux/store';
import Colors from './src/assets/colors';
import client from './src/graphql/apolloClient';
import AppNavigator from './src/navigation/AppNavigator';
import ErrorBoundary from './src/components/ErrorBoundary';
import {UserProvider} from './src/context/UserContext';

const App = () => {
  return (
    <View style={styles.container} testID="app-root">
      <ErrorBoundary ENV="dev">
        <Provider store={store}>
          <ApolloProvider client={client}>
            <UserProvider>
              <SafeAreaProvider>
                <SafeAreaView style={styles.safeAreaTop} />
                <View style={styles.container} testID="app-container">
                  <StatusBar
                    barStyle="light-content"
                    backgroundColor={Colors.headerAndStatusBar || 'transparent'}
                    translucent
                  />
                  <AppNavigator />
                </View>
              </SafeAreaProvider>
            </UserProvider>
          </ApolloProvider>
        </Provider>
      </ErrorBoundary>
    </View>
  );
};

export default memo(App);

const styles = StyleSheet.create({
  safeAreaTop: {
    flex: 0,
    backgroundColor: Colors.headerAndStatusBar || 'transparent',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight || 0 : 0,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.background || '#fff',
  },
});

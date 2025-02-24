import React, {FC, memo, useCallback} from 'react';
import {StyleSheet, Text, View} from 'react-native';

import Button from '../components/Button';
import {AppResources} from '../utils/resources';
import Colors from '../assets/colors';
import FONTS from '../assets/fonts';

interface HomeScreenProps {
navigation: any;
}

const HomeScreen: FC<HomeScreenProps> = ({navigation}) => {
  const handleNavigationPress = useCallback(
    (screen = 'Users') => {
      navigation.navigate(screen);
    },
    [navigation],
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{AppResources?.appName}</Text>
      <Button
        variant={'outline'}
        rightIcon="arrow-right"
        iconColor={Colors.text}
        textStyle={styles.btnText}
        onPress={() => handleNavigationPress('Users')}
        title={`Click here to check my work`}
      />
    </View>
  );
};

export default memo(HomeScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 10,
    justifyContent: 'center',
    backgroundColor: Colors.headerAndStatusBar,
  },
  title: {
    fontSize: 30,
    marginBottom: 10,
    fontFamily: FONTS.BOLD,
    fontStyle: 'italic',
    color: Colors.text,
  },
  btnText: {
    fontSize: 13,
    color: Colors.text,
    fontFamily: FONTS.SEMIBOLD,
    textTransform: 'uppercase',
  },
  btnBug: {
    borderColor: Colors.error,
  },
  btnTextBug: {
    fontSize: 13,
    color: Colors.error,
    fontFamily: FONTS.SEMIBOLD,
    textTransform: 'uppercase',
  },
});

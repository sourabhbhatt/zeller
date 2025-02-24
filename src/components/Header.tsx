import React, {FC} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';

import Colors from '../assets/colors';

interface HeaderProps {
  title?: string;
  showBackButton?: boolean;
  onBackPress?: () => void;
  rightComponent?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

const Header: FC<HeaderProps> = ({
  title = 'Header',
  showBackButton = true,
  onBackPress,
  rightComponent,
  style,
  textStyle,
}) => {
  const navigation = useNavigation();

  const handleBackPress = () => {
    if (onBackPress) {
      onBackPress();
    } else if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  return (
    <View style={[styles.container, style]}>
      {showBackButton ? (
        <TouchableOpacity
          onPress={handleBackPress}
          style={styles.backButton}
          testID="header-back-button">
          <Icon name="arrow-left" size={24} color={Colors.text} />
        </TouchableOpacity>
      ) : (
        <View style={styles.backButtonPlaceholder} />
      )}
      <Text style={[styles.title, textStyle]} numberOfLines={1}>
        {title}
      </Text>
      <View style={styles.rightContainer}>{rightComponent}</View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: Colors.headerAndStatusBar,
  },
  backButton: {
    paddingRight: 10,
  },
  backButtonPlaceholder: {
    width: 34,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
    flex: 1,
  },
  rightContainer: {
    width: 34,
    alignItems: 'flex-end',
  },
});

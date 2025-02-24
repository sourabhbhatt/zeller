import React, {FC, memo} from 'react';
import {
  View,
  ActivityIndicator,
  Modal,
  StyleSheet,
  Text,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';
import Colors from '../assets/colors';

interface LoaderProps {
  visible?: boolean;
  size?: 'small' | 'large';
  color?: string;
  overlay?: boolean;
  message?: string;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

const Loader: FC<LoaderProps> = ({
  visible = false,
  size = 'large',
  color = Colors.loader,
  overlay = false,
  message = '',
  style,
  textStyle,
}) => {
  if (!visible) return null;

  return overlay ? (
    <Modal transparent animationType="fade" visible={visible}>
      <View style={styles.overlay}>
        <View style={styles.loaderContainer}>
          <ActivityIndicator
            size={size}
            color={color}
            testID="activity-indicator"
            accessibilityRole="progressbar"
          />
          {message ? (
            <Text style={[styles.message, textStyle]}>{message}</Text>
          ) : null}
        </View>
      </View>
    </Modal>
  ) : (
    <View style={[styles.inlineContainer, style]}>
      <ActivityIndicator
        size={size}
        color={color}
        testID="activity-indicator"
        accessibilityRole="progressbar"
      />
      {message ? (
        <Text style={[styles.message, textStyle]}>{message}</Text>
      ) : null}
    </View>
  );
};

export default memo(Loader);

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  loaderContainer: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  inlineContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  message: {
    marginTop: 8,
    fontSize: 16,
    color: Colors.textSecondary,
    fontStyle: 'italic',
  },
});

import React, {FC} from 'react';
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import Colors from '../assets/colors';

interface ButtonProps {
  title: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  disabled?: boolean;
  loading?: boolean;
  variant?: 'primary' | 'secondary' | 'outline';
  rightIcon?: string;
  iconSize?: number;
  iconColor?: string;
}

const Button: FC<ButtonProps> = ({
  title,
  onPress,
  style,
  textStyle,
  disabled = false,
  loading = false,
  variant = 'primary',
  rightIcon,
  iconSize = 20,
  iconColor,
  ...rest
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        styles[variant],
        disabled && styles.disabled,
        style,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
      accessibilityRole="button"
      {...rest}>
      {loading ? (
        <ActivityIndicator
          testID="activity-indicator"
          color={variant === 'outline' ? Colors.loader : Colors.white}
        />
      ) : (
        <View style={styles.content}>
          <Text
            style={[
              styles.text,
              variant === 'outline' && styles.textOutline,
              textStyle,
            ]}>
            {title}
          </Text>
          {rightIcon && (
            <Icon
              testID="button-right-icon"
              name={rightIcon}
              size={iconSize}
              color={
                iconColor || (variant === 'outline' ? Colors.primary : '#fff')
              }
              style={styles.icon}
            />
          )}
        </View>
      )}
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    marginVertical: 5,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  primary: {
    backgroundColor: Colors.primary,
  },
  secondary: {
    backgroundColor: Colors.secondary,
  },
  outline: {
    borderWidth: 1,
    borderColor: Colors.primary,
    backgroundColor: 'transparent',
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  textOutline: {
    color: Colors.primary,
  },
  disabled: {
    backgroundColor: Colors.border,
    opacity: 0.6,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginLeft: 8,
  },
});

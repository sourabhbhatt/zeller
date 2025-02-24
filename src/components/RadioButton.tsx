import React from 'react';
import {TouchableOpacity, View, Text, StyleSheet} from 'react-native';

import Colors from '../assets/colors';

interface RadioButtonProps {
  label: string;
  selected: boolean;
  onPress: () => void;
}

const RadioButton: React.FC<RadioButtonProps> = ({
  label,
  selected,
  onPress,
}) => {
  return (
    <TouchableOpacity
      testID={`radio-button-${label}`}
      style={[styles.container, selected && styles.selectedContainer]}
      onPress={onPress}
      accessibilityRole="radio"
      accessibilityState={{selected}}
      activeOpacity={0.7}>
      <View
        style={[
          styles.radioOuterCircle,
          selected && styles.selectedOuterCircle,
        ]}>
        {selected && (
          <View
            style={styles.radioInnerCircle}
            testID={`radio-inner-circle-${label}-${selected}`}
          />
        )}
      </View>
      <Text
        testID={`radio-label-${label}`}
        style={[styles.label, selected && styles.selectedLabel]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default RadioButton;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  selectedContainer: {
    backgroundColor: Colors.bgColor,
  },
  radioOuterCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  selectedOuterCircle: {
    borderColor: Colors.primary,
  },
  radioInnerCircle: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: Colors.primary,
  },
  label: {
    fontSize: 18,
    fontWeight: '500',
    color: Colors.text,
  },
  selectedLabel: {
    color: Colors.primary,
  },
});

import React from 'react';
import {
  ColorSchemeName,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';

interface KeyProps {
  keyData: any;
  onPress: () => void;
  onPressIn: (() => void) | undefined;
  onPressOut: (() => void) | undefined;
  isDisabled: boolean;
  colorScheme: ColorSchemeName;
}

export const Key = ({
  keyData,
  onPress,
  onPressIn,
  onPressOut,
  isDisabled,
  colorScheme,
}: KeyProps) => {
  return (
    <TouchableOpacity
      style={[
        styles.key,
        colorScheme === 'dark' ? styles.darkKey : styles.lightKey,
        isDisabled && styles.disabledKey,
      ]}
      disabled={isDisabled}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      onPress={onPress}
    >
      <Text
        style={[
          styles.keyText,
          colorScheme === 'dark' ? styles.darkText : styles.lightText,
          isDisabled && styles.disabledText,
        ]}
      >
        {!isDisabled ? keyData.label : ''}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  darkText: {color: '#FFFFFF'},
  lightText: {color: '#000000'},
  key: {
    width: Dimensions.get('window').width / 4 - 10,
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 40,
  },
  darkKey: {backgroundColor: '#313630'},
  lightKey: {backgroundColor: '#F5F5F5'},
  keyText: {fontSize: 25, fontWeight: 'regular'},
  disabledKey: {backgroundColor: '#A0A0A0'},
  disabledText: {color: '#7D7D7D'},
});

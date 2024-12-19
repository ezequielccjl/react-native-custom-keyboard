import React from 'react';
import {ColorSchemeName, Dimensions, StyleSheet, View} from 'react-native';
import {Key} from './Key';

interface KeyboardProps {
  rows: any[][];
  handleKeyPress: (value: string) => void;
  handleDeletePressIn: () => void;
  handleDeletePressOut: () => void;
  handleCloseKeyboard: () => void;
  positive: boolean;
  integer: boolean;
  colorScheme: ColorSchemeName;
}

export const Keyboard = ({
  rows,
  handleKeyPress,
  handleDeletePressIn,
  handleDeletePressOut,
  handleCloseKeyboard,
  positive,
  integer,
  colorScheme,
}: KeyboardProps) => {
  return (
    <View
      style={[
        styles.keyboard,
        colorScheme === 'dark' ? styles.darkKeyboard : styles.lightKeyboard,
      ]}
    >
      {rows.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map((key, keyIndex) => {
            const isDisabled =
              (positive && key.value === '-') ||
              (integer && (key.value === ',' || key.value === '.'));

            return (
              <Key
                key={keyIndex}
                keyData={key}
                isDisabled={isDisabled}
                colorScheme={colorScheme}
                onPress={() => {
                  if (!key.isDelete && !key.isExit) {
                    handleKeyPress(key.value);
                  } else if (key.isExit) {
                    handleCloseKeyboard();
                  }
                }}
                onPressIn={key.isDelete ? handleDeletePressIn : undefined}
                onPressOut={key.isDelete ? handleDeletePressOut : undefined}
              />
            );
          })}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  keyboard: {padding: 5},
  darkKeyboard: {backgroundColor: '#1C211B'},
  lightKeyboard: {backgroundColor: '#DDDDDD'},
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
});

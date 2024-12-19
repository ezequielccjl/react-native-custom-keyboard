import React, { useMemo, useRef, useState } from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';
import { Keyboard } from './Keyboard';
import { keys } from './arrayKeys';

const InputCustomKeyboard = ({ positive = false, integer = false }) => {
  const [inputValue, setInputValue] = useState('');
  const [isKeyboardVisible, setKeyboardVisible] = useState(true);
  const colorScheme = useColorScheme();
  const deleteIntervalRef = useRef<number | undefined>(undefined);

  const handleKeyPress = (value: string) => {
    setInputValue((prev) => {
      if (value === 'del') return prev.slice(0, -1);
      let newValue = prev;
      if (value === '-') {
        if (prev.length === 0) {
          newValue = '-';
        }
        return newValue;
      }
      if (value === '.' || value === ',') {
        if (prev.includes(value)) return prev;
      }
      newValue = prev + value;
      const regex = /^-?\d*(?:[.,]?\d*)$/;
      return regex.test(newValue) ? newValue : prev;
    });
  };

  const handleDeletePressIn = () => {
    deleteIntervalRef.current = setInterval(() => {
      setInputValue((prev) => prev.slice(0, -1));
    }, 50) as unknown as number;
  };

  const handleDeletePressOut = () => {
    if (deleteIntervalRef.current !== undefined) {
      clearInterval(deleteIntervalRef.current);
      deleteIntervalRef.current = undefined;
    }
  };

  const splitIntoRows = (keys: any[], columns: number) => {
    const rows = [];
    for (let i = 0; i < keys.length; i += columns) {
      rows.push(keys.slice(i, i + columns));
    }
    return rows;
  };

  const rows = useMemo(() => {
    return splitIntoRows(keys(colorScheme), 4);
  }, [colorScheme]);

  return (
    <View
      style={[
        styles.container,
        colorScheme === 'dark' ? styles.darkBackground : styles.lightBackground,
      ]}
    >
      <Text
        style={[
          styles.title,
          colorScheme === 'dark' ? styles.darkText : styles.lightText,
        ]}
      >
        Teclado Customizado
      </Text>

      <TouchableOpacity
        style={[
          styles.inputWrapper,
          colorScheme === 'dark' ? styles.darkInput : styles.lightInput,
        ]}
        onPress={() => setKeyboardVisible(true)}
      >
        <Text
          style={[colorScheme === 'dark' ? styles.darkText : styles.lightText]}
        >
          {inputValue || 'Toca para escribir'}
        </Text>
      </TouchableOpacity>

      <Modal
        animationType='slide'
        transparent={true}
        visible={isKeyboardVisible}
        onRequestClose={() => setKeyboardVisible(false)}
      >
        <View style={styles.modalContainer}>
          <Keyboard
            rows={rows}
            handleKeyPress={handleKeyPress}
            handleDeletePressIn={handleDeletePressIn}
            handleDeletePressOut={handleDeletePressOut}
            handleCloseKeyboard={() => setKeyboardVisible(false)}
            positive={positive}
            integer={integer}
            colorScheme={colorScheme}
          />
        </View>
      </Modal>
    </View>
  );
};

export default InputCustomKeyboard;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  darkBackground: { backgroundColor: '#1C211B' },
  lightBackground: { backgroundColor: '#FFFFFF' },
  title: { fontSize: 24, marginBottom: 20, fontWeight: 'bold' },
  darkText: { color: '#FFFFFF' },
  lightText: { color: '#000000' },
  inputWrapper: {
    width: '80%',
    height: 50,
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  darkInput: { backgroundColor: '#313630', borderColor: '#394B3D' },
  lightInput: { backgroundColor: '#EEEEEE', borderColor: '#CCCCCC' },
  modalContainer: { flex: 1, justifyContent: 'flex-end' },
});

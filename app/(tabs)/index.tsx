import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import React, { useEffect, useState, useRef } from 'react';
import {
  Dimensions,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  useColorScheme,
} from 'react-native';

const HomeScreen = ({ positive = true, integer = false }) => {
  const [inputValue, setInputValue] = useState('');
  const [isKeyboardVisible, setKeyboardVisible] = useState(true);
  const colorScheme = useColorScheme();
  const deleteIntervalRef = useRef<number | undefined>(undefined);

  const handleKeyPress = (value) => {
    if (value === 'del') {
      setInputValue((prev) => prev.slice(0, -1));
    } else {
      setInputValue((prev) => prev + value);
    }
  };

  // Maneja el inicio del borrado continuo
  const handleDeletePressIn = () => {
    deleteIntervalRef.current = setInterval(() => {
      setInputValue((prev) => prev.slice(0, -1)); // Borra el último carácter continuamente
    }, 50) as unknown as number; // Ajusta la velocidad del borrado (50 ms)
  };

  // Maneja el fin del borrado continuo
  const handleDeletePressOut = () => {
    if (deleteIntervalRef.current !== undefined) {
      clearInterval(deleteIntervalRef.current); // Limpia el intervalo
      deleteIntervalRef.current = undefined; // Restablece el valor
    }
  };

  const splitIntoRows = (keys, columns) => {
    const rows = [];
    for (let i = 0; i < keys.length; i += columns) {
      rows.push(keys.slice(i, i + columns));
    }
    return rows;
  };

  const keys = [
    { label: '1', value: '1' },
    { label: '2', value: '2' },
    { label: '3', value: '3' },
    {
      label: (
        <AntDesign
          name='minus'
          size={24}
          color={colorScheme === 'dark' ? 'white' : 'black'}
        />
      ),
      value: '-',
    },
    { label: '4', value: '4' },
    { label: '5', value: '5' },
    { label: '6', value: '6' },
    {
      label: (
        <MaterialCommunityIcons
          name='keyboard-space'
          size={24}
          color={colorScheme === 'dark' ? 'white' : 'black'}
        />
      ),
      value: ' ',
    },
    { label: '7', value: '7' },
    { label: '8', value: '8' },
    { label: '9', value: '9' },
    {
      label: (
        <Feather
          name='delete'
          size={25}
          color={colorScheme === 'dark' ? 'white' : 'black'}
        />
      ),
      value: 'del',
      isDelete: true,
    },
    { label: ',', value: ',' },
    { label: '0', value: '0' },
    { label: '.', value: '.' },
    {
      label: (
        <MaterialCommunityIcons
          name='arrow-collapse-right'
          size={24}
          color={colorScheme === 'dark' ? 'white' : 'black'}
        />
      ),
      value: '',
    },
  ];

  const rows = splitIntoRows(keys, 4);

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
          <View
            style={[
              styles.keyboard,
              colorScheme === 'dark'
                ? styles.darkKeyboard
                : styles.lightKeyboard,
            ]}
          >
            {rows.map((row, rowIndex) => (
              <View key={rowIndex} style={styles.row}>
                {row.map((key, keyIndex: number) => {
                  const lastRow = keyIndex === row.length - 1;
                  const isDisabled =
                    (positive && key.value === '-') ||
                    (integer && (key.value === ',' || key.value === '.'));

                  return (
                    <TouchableOpacity
                      key={keyIndex}
                      style={[
                        styles.key,
                        colorScheme === 'dark'
                          ? styles.darkKey
                          : styles.lightKey,
                        lastRow && colorScheme === 'dark'
                          ? styles.lastKeyDark
                          : lastRow && colorScheme !== 'dark' && styles.lastKey,
                        //isDisabled && styles.disabledKey,
                      ]}
                      disabled={isDisabled}
                      onPressIn={key.isDelete ? handleDeletePressIn : undefined}
                      onPressOut={
                        key.isDelete ? handleDeletePressOut : undefined
                      }
                      onPress={() => !key.isDelete && handleKeyPress(key.value)}
                    >
                      <Text
                        style={[
                          styles.keyText,
                          colorScheme === 'dark'
                            ? styles.darkText
                            : styles.lightText,
                        ]}
                      >
                        {!isDisabled ? key.label : ''}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            ))}
            <TouchableWithoutFeedback onPress={() => setKeyboardVisible(false)}>
              <AntDesign
                name='down'
                size={20}
                color={colorScheme === 'dark' ? 'white' : 'black'}
                style={styles.closeIcon}
              />
            </TouchableWithoutFeedback>
          </View>
        </View>
      </Modal>
    </View>
  );
};

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
  keyboard: { padding: 5 },
  darkKeyboard: { backgroundColor: '#1C211B' },
  lightKeyboard: { backgroundColor: '#DDDDDD' },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  key: {
    width: Dimensions.get('window').width / 4 - 10,
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 40,
  },
  darkKey: { backgroundColor: '#313630' },
  lightKey: { backgroundColor: '#F5F5F5' },
  keyText: { fontSize: 25, fontWeight: 'regular' },
  disabledKey: { backgroundColor: '#A0A0A0' },
  disabledText: { color: '#7D7D7D' },
  closeIcon: { marginLeft: 10, padding: 5 },
  lastKeyDark: {
    backgroundColor: '#394B3D',
  },
  lastKey: {
    backgroundColor: '#C9C9CB',
  },
});

export default HomeScreen;

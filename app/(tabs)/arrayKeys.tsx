import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import React from 'react';
import {ColorSchemeName} from 'react-native';

export const keys = (colorScheme: ColorSchemeName) => [
  {label: '1', value: '1'},
  {label: '2', value: '2'},
  {label: '3', value: '3'},
  {
    label: '',
    value: '',
  },
  {label: '4', value: '4'},
  {label: '5', value: '5'},
  {label: '6', value: '6'},
  {
    label: (
      <AntDesign
        name="minus"
        size={24}
        color={colorScheme === 'dark' ? 'white' : 'black'}
      />
    ),
    value: '-',
  },
  {label: '7', value: '7'},
  {label: '8', value: '8'},
  {label: '9', value: '9'},
  {
    label: (
      <Feather
        name="delete"
        size={25}
        color={colorScheme === 'dark' ? 'white' : 'black'}
      />
    ),
    value: 'del',
    isDelete: true,
  },
  {label: ',', value: ','},
  {label: '0', value: '0'},
  {label: '.', value: '.'},
  {
    label: (
      <MaterialCommunityIcons
        name="arrow-collapse-right"
        size={24}
        color={colorScheme === 'dark' ? 'white' : 'black'}
      />
    ),
    value: '',
    isExit: true,
  },
];

import {Pressable, StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import {COLOR} from '../../utils/colors';

const RadioButtonComponent = ({isSelected}: {isSelected: boolean}) => {
  return (
    <View style={styles.radioContainer}>
      <View style={[isSelected ? styles.radioInner : null]} />
    </View>
  );
};

export default RadioButtonComponent;

const styles = StyleSheet.create({
  radioContainer: {
    height: 12,
    width: 12,
    borderRadius: 12,
    borderColor: COLOR.white,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioInner: {
    backgroundColor: COLOR.white,
    height: 6,
    width: 6,
    borderRadius: 6,
  },
});

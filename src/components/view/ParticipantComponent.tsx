import {Image, Keyboard, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {COLOR} from '../../utils/colors';
import RadioButtonComponent from '../fields/RadioButtonComponent';
import {participation} from '../../entities/entryObjects';

const ParticipantComponent = ({
  handleRadioSelect,
  value,
}: {
  handleRadioSelect: (text: any) => void;
  value: any;
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>
      Which type of home would you like to support?
      </Text>
      <Pressable
        onPress={() => {
          handleRadioSelect(Object.keys(participation).at(0)?.toString());
          Keyboard.dismiss();
        }}>
        <Image
          source={require('../../assets/images/startImage1.png')}
          style={styles.participantImage}
        />
        <View style={styles.radioContainer}>
          <RadioButtonComponent
            isSelected={Object.keys(participation).at(0)?.toString() === value}
          />
          <Text style={styles.textInside}>Child Care Home</Text>
        </View>
      </Pressable>

      <Pressable
        onPress={() => {
          handleRadioSelect(Object.keys(participation).at(1)?.toString());
          Keyboard.dismiss();
        }}>
        <Image
          source={require('../../assets/images/startImage2.png')}
          style={styles.participantImage}
        />
        <View style={styles.radioContainer}>
          <RadioButtonComponent
            isSelected={Object.keys(participation).at(1)?.toString() === value}
          />
          <Text style={styles.textInside}>Old Age Home</Text>
        </View>
      </Pressable>
    </View>
  );
};

export default ParticipantComponent;

const styles = StyleSheet.create({
  container: {
    height: 207,
    backgroundColor: COLOR.tabBackground,
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    position: 'relative',
  },
  participantImage: {
    height: 140,
    width: 140,
    marginTop: 10,
  },
  headerText: {
    position: 'absolute',
    top: 8,
    width: '90%',
    fontSize: 12,
    color: COLOR.white,
  },
  textInside: {
    fontSize: 12,
    color: COLOR.white,
    textAlign: 'center',
  },
  radioContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    columnGap: 6,
    marginBottom: 10,
  },
});

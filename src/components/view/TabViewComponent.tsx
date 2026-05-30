import {Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {COLOR} from '../../utils/colors';

const TabViewComponent = ({
  tabText,
  tabHeight,
  radius,
  initialText,
  onTabChange,
}: {
  tabText: string[];
  tabHeight: number;
  radius: number;
  initialText: any;
  onTabChange: React.Dispatch<React.SetStateAction<any>>;
}) => {
  const [selectedText, setSelectedText] = useState(initialText);
  const handlePress = (selectText: string) => {
    setSelectedText(selectText);
    onTabChange(selectText);
  };
  return (
    <View
      style={[{height: tabHeight, borderRadius: radius}, styles.tabContainer]}>
      {tabText &&
        tabText?.map((text: string, index: number) => {
          return (
            <Pressable
              key={index}
              style={[
                selectedText === text
                  ? styles.buttonStyle
                  : styles.tranparentBtn,
              ]}
              onPress={() => handlePress(text)}>
              <Text style={styles.buttonText}>{text}</Text>
            </Pressable>
          );
        })}
    </View>
  );
};

export default TabViewComponent;

const styles = StyleSheet.create({
  tabContainer: {
    backgroundColor: COLOR.tabBackground,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  buttonStyle: {
    backgroundColor: '#000',
    height: 40,
    flexGrow: 1,
    gap: 5,
    borderRadius: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  tranparentBtn: {
    height: 40,
    flexGrow: 1,
    gap: 5,
    borderRadius: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },
});

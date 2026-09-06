import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const BadgeView = (props: any) => {
  const {icon, titleText, textStyle, style} = props ?? {};
  return (
    <View style={style}>
      {icon}
      <Text style={textStyle}>{titleText}</Text>
    </View>
  );
};

export default BadgeView;

import {Image, StyleSheet, Text, View, Dimensions} from 'react-native';
import React from 'react';
import ContainerProvider from '../components/providers/ContainerProvider';
import ImageBackgroundProvider from '../components/providers/BackgroundGradiantProvider';
import {COLOR} from '../utils/colors';
import CustomButtonField from '../components/fields/CustomButtonField';
import {theme} from '../utils/theme';
import {useNavigation} from '@react-navigation/native';

// Get screen width and height for responsiveness
const {width, height} = Dimensions.get('window');

const WelcomeScreen = () => {
  const navigation = useNavigation<any>();

  return (
    <ContainerProvider>
      <ImageBackgroundProvider style={styles.welcomeContainer}>
        <View style={styles.topSection}>
          <Text style={styles.welcomeMainText}>Welcome to Family365</Text>
          {/* Responsive Image */}
          <Image
            source={require('../assets/images/whitelogo.png')}
            style={styles.logo}
          />
          <Text style={styles.welcomeText}>AN INITIATIVE </Text>
          <Text style={styles.welcomeText}>BY</Text>
          <Text style={styles.welcomeText1}>INSPIRATIONS</Text>
          <Text style={styles.welcomeText2}>PUBLIC CHARITABLE TRUST</Text>
        </View>

        <View style={styles.bottomSection}>
          <View style={styles.textArangement}>
            <Text style={styles.bottomText}>•</Text>
            <Text style={styles.bottomText}>
              Aims at connecting charitable families to support old aged homes &
              orphanages with benevolence
            </Text>
          </View>

          <CustomButtonField
            buttonText="Get Started"
            textStyle={styles.btnText}
            style={styles.btnStyle}
            onPress={() => navigation.navigate('startScreen')}
            opacity={0.6}
            textColor={theme.white}
          />
        </View>
      </ImageBackgroundProvider>
    </ContainerProvider>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  welcomeContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  topSection: {
    width: '100%',
    flex: 0.8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomSection: {
    flex: 0.2,
    width: '100%',
    backgroundColor: COLOR.white,
    borderTopLeftRadius: width * 0.08, // Responsive radius
    borderTopRightRadius: width * 0.08,
    justifyContent: 'center',
    paddingHorizontal: width * 0.05,
    paddingVertical: height * 0.03,
  },
  welcomeMainText: {
    fontSize: width * 0.05, // Responsive font size
    color: COLOR.white,
    fontWeight: '700',
  },
  welcomeText: {
    marginTop: height * 0.025,
    fontSize: width * 0.045,
    fontWeight: '600',
    color: COLOR.white,
    marginVertical: height * 0.0001,
  },
  welcomeText1: {
    fontSize: width * 0.08,
    fontWeight: '600',
    color: COLOR.white,
    marginTop: height * 0.01,
    letterSpacing: 2,
  },
  welcomeText2: {
    fontSize: width * 0.045,
    fontWeight: '600',
    color: COLOR.white,
    marginBottom: height * 0.01,
    marginTop: 4,
  },
  textArangement: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: width * 0.03,
    paddingVertical: height * 0.01,
    columnGap: width * 0.015,
  },
  bottomText: {
    fontSize: width * 0.036,
    color: COLOR.black,
    fontWeight: '500',
  },
  // Responsive Button
  btnStyle: {
    backgroundColor: COLOR.black,
    height: height * 0.05,
    width: width * 0.32,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: width * 0.15,
    marginLeft: 'auto',
    marginTop: height * 0.02,
  },
  btnText: {
    fontSize: width * 0.035,
    fontWeight: '500',
  },
  // Responsive Logo
  logo: {
    width: width * 0.6, // Adjust based on screen width
    height: height * 0.2, // Adjust based on screen height
    resizeMode: 'contain',
  },
});

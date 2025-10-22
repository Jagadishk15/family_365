import React, {useEffect, useMemo, useState} from 'react';
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  TouchableOpacity,
  ImageBackground,
  Image,
  Platform,
  Linking,
} from 'react-native';
import {COLOR} from '../../utils/colors';
import GradiantProvider from '../providers/GradiantProvider';
import {
  CancelIcon,
  HeadPhoneIcon,
  StartIcon,
  WhiteHeartIcon,
} from '../../assets/svg';
import CustomButtonField from '../fields/CustomButtonField';
import AddNumberOfDaysView from './AddNumberOfDaysView';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import SliderButton from './SliderButtonView';

const MealProviderModal = ({
  modalVisible,
  setModalVisible,
  clearTime,
  data,
  setNumberOfMember,
  setTotalAmount,
  onSwipe,
  localInput,
  setLocalInput,
}: any) => {
  useMemo(() => {
    setTotalAmount(
      setNumberOfMember(
        Number(data?.at(0)?.data?.mealAmountPerDay) *
          Number(localInput?.length),
      ),
    );
  }, [localInput]);

  const _footer_view = () => {
    return (
      <GradiantProvider
        colors={['#6255FA', '#3B31B3']}
        style={styles.footerSection}>
        <View style={styles.innerContainerForFooter}>
          <WhiteHeartIcon />
          <Text style={styles.footerText}>World is One Family</Text>
          <TouchableOpacity
            style={styles.provideMealButton}
            onPress={() => setModalVisible(!modalVisible)}>
            <Text style={styles.provideButtonText}>Provide a Meal</Text>
          </TouchableOpacity>
        </View>
      </GradiantProvider>
    );
  };

  const dialCall = (number: number) => {
    let phoneUrl = '';

    if (Platform.OS === 'android') {
      phoneUrl = `tel:+${number}`;
    } else {
      // iOS supports telprompt for a smoother experience
      phoneUrl = `telprompt:+${number}`;
    }

    Linking.canOpenURL(phoneUrl)
      .then(supported => {
        if (!supported) {
          Alert.alert('Error', 'Phone dialer is not available');
        } else {
          return Linking.openURL(phoneUrl);
        }
      })
      .catch(err => console.error('An error occurred', err));
  };

  const _firstSection = () => {
    return (
      <>
        <GradiantProvider
          style={styles.firstSection}
          colors={['#ED4264', '#CBAD6D']}>
          <View style={styles.innerContainer}>
            <View style={styles.firstTextContainer}>
              <Text style={styles.headerText}>
                Your contribution provides healthy meals for a day.
              </Text>
              <CustomButtonField
                buttonText={`Full days meal at ₹${
                  data?.at(0)?.data?.mealAmountPerDay
                } for 20 members`}
                style={styles.firstButton}
                onPress={() => {}}
                textColor={COLOR.darkGoldenBrown}
                opacity={1}
              />
              {/* <View style={styles.firstRatingContainer}>
                <Text style={styles.firstText}>
                  <StartIcon /> 4.8
                </Text>
                <Text style={styles.firstText}>100+ Sponsors</Text>
              </View> */}
            </View>
            <View style={styles.boyImage}>
              <Image source={require('../../assets/images/banner.png')} />
            </View>
          </View>
        </GradiantProvider>
      </>
    );
  };

  const _secondSection = () => {
    return (
      <AddNumberOfDaysView
        localInput={localInput}
        setLocalInput={setLocalInput}
        style={styles.secondSection}
        amountPerMember={Number(data?.at(0)?.data?.mealAmountPerDay)}
      />
    );
  };

  const _sliderButton = () => {
    return (
      <SliderButton
        setModalVisible={setModalVisible}
        clearTime={clearTime}
        onSwipe={onSwipe}
      />
    );
  };
  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        style={{flexGrow: 1}}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View
          style={[styles.backdrop, {backgroundColor: 'rgba(0, 0, 0, 0.3)'}]}>
          <View style={styles.modalContent}>
            <View style={styles.TopCancelSection}>
              <Pressable style={[{opacity: 0}, styles.helpButton]}>
                <Text>Help</Text>
                <HeadPhoneIcon />
              </Pressable>
              <Pressable onPress={() => setModalVisible(!modalVisible)}>
                <CancelIcon style={styles.cancelIcon} />
              </Pressable>
              <Pressable
                style={styles.helpButton}
                onPress={() => dialCall(919445939151)}>
                <Text>Help</Text>
                <HeadPhoneIcon />
              </Pressable>
            </View>
            <KeyboardAwareScrollView contentContainerStyle={{flexGrow: 1}}>
              <ImageBackground
                imageStyle={{
                  borderTopLeftRadius: 20,
                  borderTopRightRadius: 20,
                  flexGrow: 1,
                }}
                style={styles.modalView}
                source={require('../../assets/images/modalBG.png')}>
                {_firstSection()}
                {_secondSection()}
                {_sliderButton()}
              </ImageBackground>
            </KeyboardAwareScrollView>
          </View>
        </View>
      </Modal>

      {_footer_view()}
    </>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,

    justifyContent: 'flex-end',
  },
  modalContent: {
    width: '100%',
    height: 600,
  },
  modalView: {
    alignItems: 'center',
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    color: COLOR.black,
  },
  footerSection: {
    height: 80,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  innerContainerForFooter: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    flex: 1,
    width: '100%',
    paddingHorizontal: 15,
  },
  provideMealButton: {
    height: 40,
    backgroundColor: COLOR.white,
    borderRadius: 20,
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  provideButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: COLOR.black,
  },
  footerText: {
    fontWeight: '600',
    fontSize: 16,
    color: COLOR.white,
  },
  TopCancelSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 15,
    marginBottom: 8,
  },
  helpButton: {
    height: 40,
    backgroundColor: COLOR.white,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
    borderRadius: 20,
    columnGap: 5,
  },
  cancelIcon: {backgroundColor: '#fff', borderRadius: 50},

  ///first section
  firstSection: {
    height: 140,
    width: '93%',
    marginVertical: 18,
    borderRadius: 20,
  },
  innerContainer: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  boyImage: {alignSelf: 'flex-end'},
  firstTextContainer: {
    flex: 1,
  },
  headerText: {
    fontSize: 14,
    left: 13,
    top: 15,
    fontWeight: 700,
    color: COLOR.white,
  },
  firstButton: {
    top: 23,
    left: 13,
    height: 40,
    backgroundColor: COLOR.white,
    borderRadius: 50,
    justifyContent: 'center',
    width: '80%',
  },
  firstRatingContainer: {
    top: 30,
    left: 18,
    flexDirection: 'row',
    width: '60%',
    justifyContent: 'space-between',
  },
  firstText: {
    color: COLOR.white,
    fontWeight: 600,
  },

  //second section
  secondSection: {
    width: '93%',
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});

export default MealProviderModal;

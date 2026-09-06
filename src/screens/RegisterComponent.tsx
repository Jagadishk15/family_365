import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import ContainerProvider from '../components/providers/ContainerProvider';
import ImageBackgroundProvider from '../components/providers/BackgroundGradiantProvider';
import {theme} from '../utils/theme';
import {useTranslation} from 'react-i18next';
import TextInputComponent from '../components/fields/TextInputComponent';
import PhoneNumberField from '../components/fields/PhoneNumberField';
import TextFieldDropdown from '../components/fields/TextFieldDropdown';
import ButtonFieldComponent from '../components/fields/ButtonFieldComponent';
import KeyboardAvoidingProvider from '../components/providers/KeyboardAvoidingProvider';
import {useNavigation} from '@react-navigation/native';
import {handleRegisterErrorValidate} from '../utils/helpers';
import {useToaster} from '../components/providers/ToasterProvider';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../redux/store';
import {registerForm} from '../redux/slices/authSlice';
import axios from 'axios';
import {COLOR} from '../utils/colors';
// import { allCountry } from '../entities/mockdata';

const RegisterComponent = () => {
  const {t} = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const areaPinCode = useSelector((state: RootState) => state.orphanageDetails);
  const {showToast} = useToaster();
  const [hoveredIndex, setHoveredIndex] = useState<any | null>(null);
  const navigation = useNavigation<any>();
  const [fullName, setFullName] = useState<string>();
  const [phoneNumber, setPhoneNumber] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [gender, setGender] = useState<string>();
  const [address1, setAddress1] = useState<string>();
  const [address2, setAddress2] = useState<string>();
  const [city, setCity] = useState<string>();
  const [state, setState] = useState<string>();
  const [pinCode, setPincode] = useState<string>();
  const [country, setCountry] = useState<string>('India');
  // Function to fetch City & State using Pincode API.
  // Primary: India Post API (richest data — gives District + State). Backup:
  // Zippopotam, used when the primary is unreachable (it has periodically had
  // an expired SSL cert, which makes the HTTPS request throw). If both fail we
  // do NOT block the user — City/State are editable so they can type manually.
  const fetchLocationDetails = async (pincode: string) => {
    // 1) Primary lookup — India Post (api.postalpincode.in)
    try {
      const response = await axios.get(
        `https://api.postalpincode.in/pincode/${pincode}`,
        {timeout: 10000},
      );
      if (
        response.data?.[0]?.Status === 'Success' &&
        response.data[0].PostOffice?.length
      ) {
        const postOfficeDetails = response.data[0].PostOffice[0];
        setState(postOfficeDetails.State);
        setCity(postOfficeDetails.District);
        setCountry(postOfficeDetails.Country);
        return;
      }
      if (response.data?.[0]?.Status === 'Error') {
        showToast({message: 'Invalid Pincode', duration: 3000, status: 'error'});
        setState('');
        setCity('');
        setCountry('');
        return;
      }
      // Any other shape (e.g. "No records found") → try the backup below.
    } catch (error) {
      // Network/SSL failure on the primary — fall through to the backup.
    }

    // 2) Backup lookup — Zippopotam (valid cert, returns state + locality)
    try {
      const res = await axios.get(`https://api.zippopotam.us/in/${pincode}`, {
        timeout: 10000,
      });
      const place = res.data?.places?.[0];
      if (place) {
        setState(place.state);
        setCity(place['place name']);
        setCountry(res.data.country || 'India');
        return;
      }
      showToast({message: 'Invalid Pincode', duration: 3000, status: 'error'});
    } catch (error) {
      // Both lookups failed — let the user fill City & State manually rather
      // than leaving them stuck on a read-only form.
      showToast({
        message: 'Could not auto-fill from pincode. Please enter City & State.',
        duration: 3000,
        status: 'error',
      });
    }
  };
  useEffect(() => {
    if (areaPinCode?.pincode) {
      setPincode(areaPinCode?.pincode?.toString());
      fetchLocationDetails(areaPinCode?.pincode?.toString());
    }
  }, [areaPinCode]);

  const handleRegister = () => {
    const error = handleRegisterErrorValidate({
      country,
      pinCode,
      state,
      city,
      address2,
      address1,
      gender,
      email,
      phoneNumber,
      fullName,
    });
    if (error) {
      return showToast(error);
    } else {
      dispatch(
        registerForm({
          country,
          pinCode,
          state,
          city,
          address2,
          address1,
          gender,
          email,
          phoneNumber,
          fullName,
        }),
      );
      navigation.navigate('identityVerificationScreen');
    }
  };

  // useEffect(() => {
  //   setPincode(areaPinCode?.pincode?.toString());
  // }, []);

  useEffect(() => {
    if (hoveredIndex) {
      setGender(hoveredIndex);
    }
  }, [hoveredIndex]);
  return (
    <ContainerProvider>
      <KeyboardAvoidingProvider>
        <ImageBackgroundProvider style={styles.innerContainer}>
          <View style={styles.logoSection}>
            <Image
              source={require('../assets/images/whitelogo.png')}
              style={styles.logoImage}
            />
          </View>

          <View style={styles.bottomSection}>
            <View style={[styles.fromSection, {backgroundColor: theme.white}]}>
              <View style={styles.formTopHeaderContainer}>
                <Text style={styles.fromTopHeader}>Registration</Text>
              </View>

              <View style={styles.inputContainer}>
                <TextInputComponent
                  radius={16}
                  height={40}
                  textColor={theme.black}
                  backgroundColor={theme.white}
                  placeholder={'Full Name'}
                  placeholderTextColor={theme.black}
                  onChange={setFullName}
                  value={fullName}
                />
                <PhoneNumberField
                  radius={16}
                  height={40}
                  textColor={theme.black}
                  backgroundColor={theme.white}
                  placeholder={'Phone Number'}
                  placeholderTextColor={theme.black}
                  onChange={setPhoneNumber}
                  value={phoneNumber}
                />
                <TextInputComponent
                  radius={16}
                  height={40}
                  textColor={theme.black}
                  backgroundColor={theme.white}
                  placeholder={'Email'}
                  placeholderTextColor={theme.black}
                  onChange={setEmail}
                  value={email}
                />
                <View style={{backgroundColor: 'white', borderRadius: 10}}>
                  <TextFieldDropdown
                    radius={16}
                    height={40}
                    borderWidth={0.1}
                    textColor={theme.black}
                    backgroundColor={theme.white}
                    placeholder={'Gender'}
                    placeholderTextColor={theme.black}
                    dropDownValues={['Male', 'Female']}
                    onChange={setGender}
                    value={gender}
                    borderColor="#e9e9e9" // 🔹 Custom border color
                    borderWidth={2} // 🔹 Custom border width
                    borderRadius={20} // 🔹 Custom border radius
                    //  width={380} // 🔹 Custom width

                    hoveredIndex={hoveredIndex}
                    setHoveredIndex={setHoveredIndex}
                  />
                </View>
                {/* <TextFieldDropdown
                  radius={16}
                  height={40}
                  textColor={theme.black}
                  backgroundColor={theme.white}
                  placeholder={'Gender'}
                  placeholderTextColor={theme.black}
                  dropDownValues={['male', 'female', 'others']}
                  onChange={setGender}
                  value={gender}
                  hoveredIndex={hoveredIndex}
                  setHoveredIndex={setHoveredIndex}
                /> */}
                <TextInputComponent
                  radius={16}
                  height={40}
                  textColor={theme.black}
                  backgroundColor={theme.white}
                  placeholder={'Address1'}
                  placeholderTextColor={theme.black}
                  onChange={setAddress1}
                  value={address1}
                />
                <TextInputComponent
                  radius={16}
                  height={40}
                  textColor={theme.black}
                  backgroundColor={theme.white}
                  placeholder={'Address2'}
                  placeholderTextColor={theme.black}
                  onChange={setAddress2}
                  value={address2}
                />
                <View style={styles.rowContainer}>
                  <TextInputComponent
                    radius={16}
                    height={40}
                    width={140}
                    textColor={theme.black}
                    backgroundColor={theme.white}
                    placeholder={'City'}
                    placeholderTextColor={theme.black}
                    onChange={setCity}
                    value={city}
                  />
                  <TextInputComponent
                    radius={16}
                    height={40}
                    width={150}
                    textColor={theme.black}
                    backgroundColor={theme.white}
                    placeholder={'State'}
                    placeholderTextColor={theme.black}
                    onChange={setState}
                    value={state}
                  />
                </View>

                {/* <TextInputComponent
                  radius={16}
                  height={40}
                  textColor={theme.black}
                  backgroundColor={theme.white}
                  placeholder={'Country'}
                  placeholderTextColor={theme.black}
                  onChange={setCountry}
                  value={country}
                /> */}
                {/* <TextFieldDropdown
                  radius={16}
                  height={40}
                  textColor={theme.black}
                  backgroundColor={theme.white}
                  placeholder={'Country'}
                  placeholderTextColor={theme.black}
                  dropDownValues={allCountry}
                  onChange={setCountry}
                  value={country}
                /> */}
                <TextInputComponent
                  radius={16}
                  height={40}
                  textColor={theme.black}
                  backgroundColor={'#f0f0f0'} // 🔹 Light gray background to indicate disabled state
                  placeholder={'Pincode'}
                  placeholderTextColor={theme.black}
                  type="number"
                  onChange={setPincode}
                  value={pinCode}
                  editable={false}
                  // style={{ opacity: 0.5 }}
                />
              </View>
            </View>
          </View>

          <View style={styles.buttonSection}>
            <ButtonFieldComponent onPress={handleRegister} />
          </View>
        </ImageBackgroundProvider>
      </KeyboardAvoidingProvider>
    </ContainerProvider>
  );
};

export default RegisterComponent;

const styles = StyleSheet.create({
  innerContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    rowGap: 30,
    alignItems: 'center',
    paddingVertical: 20,
    resizeMode: 'cover',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10, // adjust spacing as needed
  },
  logoSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  bottomSection: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  fromSection: {
    width: 350,
    borderRadius: 20,
    paddingBottom: 30,
  },
  logoImage: {
    width: 160,
    height: 86,
  },
  formTopHeaderContainer: {
    justifyContent: 'center',
  },
  fromTopHeader: {
    textAlign: 'center',
    fontSize: 17,
    fontWeight: '600',
    marginVertical: 23,
  },
  inputContainer: {
    width: 300,
    alignSelf: 'center',
    rowGap: 10,
  },
  buttonSection: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: 315,
  },
});

import {
  Image,
  Keyboard,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Linking,
  Pressable,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import ImageBackgroundProvider from '../components/providers/BackgroundGradiantProvider';
import ContainerProvider from '../components/providers/ContainerProvider';
import TabViewComponent from '../components/view/TabViewComponent';
import TextInputComponent from '../components/fields/TextInputComponent';
import {theme} from '../utils/theme';
import ParticipantComponent from '../components/view/ParticipantComponent';
import ButtonFieldComponent from '../components/fields/ButtonFieldComponent';
import {COLOR} from '../utils/colors';
import KeyboardAvoidingProvider from '../components/providers/KeyboardAvoidingProvider';
import {AuthText, participation} from '../entities/entryObjects';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import {useAuthState} from '../context/AuthContext';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../redux/store';
import {
  orphanageDetails,
  resetState,
  setGlobalPinCode,
} from '../redux/slices/dataSlice';
import API_INSTANCE from '../config/apiClient';
import {useToaster} from '../components/providers/ToasterProvider';
import {handleErrorValidate} from '../utils/helpers';

const StartScreen = () => {
  const {showToast} = useToaster();
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation<any>();

  const [selectedTabText, setSelectedTabText] = useState<string>(
    AuthText.signup,
  );
  const [selectedParticipation, setSelectedRadioText] = useState<string>();
  const [areaPincode, setAreaPincode] = useState<string>();
  const [userName, setUserName] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [loading, setLoading] = useState(false);
  const {setUser} = useAuthState() ?? {};
  const [userError, setUserError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showContactModal, setShowContactModal] = useState(false);

  const handleRadioSelect = (text: any) => {
    setSelectedRadioText(text);
  };

  const handleUserNameChange = (value: string) => {
    // Remove non-digit characters
    const numericValue = value.replace(/\D/g, '');
    setUserName(numericValue);

    // Real-time validation: Show error if length is not exactly 10
    if (numericValue.length > 10) {
      setUserError('Mobile number must be exactly 10 digits');
    } else {
      setUserError('');
    }
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);

    if (value.length > 15) {
      setPasswordError('Password should not be greater than 15 characters');
    } else {
      setPasswordError('');
    }
  };

  const handleLogin = async () => {
    Keyboard.dismiss();
    try {
      const error = handleErrorValidate({userName, password});
      if (error) {
        return showToast(error);
      }
      setLoading(true);
      const response: any = await API_INSTANCE.post(`auth/login`, {
        userName: userName,
        password: password,
      });
      if (response?.data?.data) {
        const loginRes: any = await API_INSTANCE.get(
          `v1/family-member/fetch-member-details-by-mobilenumber?mobileNumber=${userName}`,
        );
        if (loginRes?.data?.data) {
          setUser(loginRes?.data?.data);
        }
      } else {
        showToast({
          message: response?.data?.message,
          duration: 5000,
          status: 'error',
          slideFrom: 'right',
        });
        setLoading(false);
      }
    } catch (error: any) {
      showToast({
        message:
          error?.response?.data?.description ?? error?.response?.data?.message,
        duration: 5000,
        status: 'error',
        slideFrom: 'right',
      });
      setLoading(false);
    }
  };
  const HandleParticipate = async () => {
    const error = handleErrorValidate({areaPincode, selectedParticipation});
    if (error) {
      return showToast(error);
    }
    dispatch(setGlobalPinCode(areaPincode));
    setLoading(true);
    try {
      dispatch(resetState());
      const response: any = await API_INSTANCE.get(
        `/auth/filter-orphanage-by-algorithm?pincode=${areaPincode}&type=${selectedParticipation}`,
      );

      if (response?.data) {
        dispatch(orphanageDetails(response?.data));
        setLoading(false);
        navigation.navigate('orphanageDetailsScreen');
      }
    } catch (error: any) {
      setLoading(false);
      console.log(
        'Error in HandleParticipate:',
        error?.response?.data?.message,
      );
      if (
        error?.response?.data?.message ===
        'No Matching Orphanage found , please contact administrator'
      ) {
        // Show modal popup with Contact Now option
        setShowContactModal(true);
      } else {
        showToast({
          message: error?.response?.data?.message,
          duration: 5000,
          status: 'error',
          slideFrom: 'right',
        });
      }
    }
  };

  const handleContactNow = () => {
    // Implement your contact logic here.
    // For example, navigate to a Contact screen:
    // navigation.navigate('ContactScreen');
    // Hide the modal after pressing the button.
    setShowContactModal(false);
    Linking.openURL(`tel:+${919445939151}`);
  };

  useEffect(() => {
    dispatch(resetState());
  }, [dispatch]);

  const _signup_section = () => {
    return (
      <>
        <View style={styles.inputSection}>
          <Text style={styles.inputAboveText}>
            Explore home around you nearby
          </Text>
          <TextInputComponent
            radius={16}
            height={50}
            value={areaPincode}
            onChange={setAreaPincode}
            textColor={theme.black}
            backgroundColor={theme.white}
            placeholder="Enter your location pincode"
            placeholderTextColor={theme.black}
            type="number"
          />
          <Text style={styles.inputAboveText}>Choose Your Family</Text>
          <View style={styles.participentSection}>
            <ParticipantComponent
              value={selectedParticipation}
              handleRadioSelect={handleRadioSelect}
            />
          </View>
        </View>
        <View style={styles.btnSection}>
          <TouchableOpacity
            style={styles.btnContainer}
            onPress={HandleParticipate}>
            <Text style={styles.btnText}>Show Nearby Home</Text>
          </TouchableOpacity>
          {/* <ButtonFieldComponent onPress={HandleParticipate} /> */}
        </View>
      </>
    );
  };

  const _login_section = () => {
    return (
      <>
        <View style={styles.loginContainer}>
          <TextInputComponent
            backgroundColor={theme.white}
            height={50}
            radius={16}
            placeholder="Mobile Number"
            placeholderTextColor={theme.black}
            textColor={theme.black}
            value={userName}
            onChange={handleUserNameChange}
            type="number"
          />
          {userError ? <Text style={{color: 'red'}}>{userError}</Text> : null}
          <TextInputComponent
            backgroundColor={theme.white}
            height={50}
            radius={16}
            placeholder="Enter your password"
            placeholderTextColor={theme.black}
            textColor={theme.black}
            value={password}
            onChange={handlePasswordChange}
            type="password"
          />
          {passwordError ? (
            <Text style={{color: 'red'}}>{passwordError}</Text>
          ) : null}
          <Text style={styles.agreeText}>
            By continuing, I agree to the Terms of Use & Privacy Policy
          </Text>
          <View style={styles.loginBtn}>
            <ButtonFieldComponent onPress={() => handleLogin()} />
          </View>
          <Text style={styles.forgetPassword}>Forgot password? Get help</Text>
        </View>
      </>
    );
  };

  return (
    <ContainerProvider loading={loading}>
      <KeyboardAvoidingProvider>
        <ImageBackgroundProvider style={{flex: 1, paddingHorizontal: 16}}>
          <View style={styles.logoSection}>
            <Image
              source={require('../assets/images/whitelogo.png')}
              style={styles.logoImage}
            />
          </View>
          <View style={styles.tabSection}>
            <TabViewComponent
              tabText={Object.values(AuthText)}
              tabHeight={50}
              radius={50}
              onTabChange={setSelectedTabText}
              initialText={selectedTabText}
            />
            {AuthText.signup === selectedTabText
              ? _signup_section()
              : _login_section()}
          </View>

          {/* Modal Popup for Contact Now */}
          <Modal
            transparent
            visible={showContactModal}
            animationType="slide"
            onRequestClose={() => setShowContactModal(false)}>
            <Pressable
              style={styles.modalOverlay}
              onPress={() => setShowContactModal(false)}>
              <Pressable style={styles.modalContainer} onPress={() => {}}>
                <Text style={styles.modalMessage}>
                  Based on your pincode and selected home type (Child Care or
                  Old Age),{'\n\n'}
                  No suitable homes are available nearby. Please explore other
                  options. {'\n\n'}
                  For assistance, click 'Call Us' to contact support
                </Text>
                <TouchableOpacity
                  style={styles.contactButton}
                  onPress={handleContactNow}>
                  <Text style={styles.contactButtonText}>Connect Now</Text>
                </TouchableOpacity>
              </Pressable>
            </Pressable>
          </Modal>
        </ImageBackgroundProvider>
      </KeyboardAvoidingProvider>
    </ContainerProvider>
  );
};

export default StartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  btnContainer: {
    height: 47,
    width: 182,
    borderRadius: 50,
    backgroundColor: COLOR.black,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    color: COLOR.white,
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '600',
  },
  logoSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 200,
  },
  logoImage: {
    width: 150,
    height: 80,
  },
  tabSection: {
    flex: 1,
  },
  inputSection: {
    flex: 1,
    marginTop: 30,
    rowGap: 25,
  },
  participentSection: {
    flex: 1,
  },
  btnSection: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginVertical: 10,
  },
  loginBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  inputAboveText: {
    color: COLOR.white,
    fontSize: 14,
  },
  agreeText: {
    color: COLOR.white,
    fontSize: 12,
    marginBottom: 16,
    textAlign: 'center',
  },
  forgetPassword: {
    color: COLOR.white,
    fontSize: 12,
    textAlign: 'center',
    flex: 20,
  },
  loginContainer: {
    minHeight: 300,
    rowGap: 18,
    marginTop: 30,
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)', // Semi-transparent background
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 20,
    alignItems: 'center',
  },
  modalMessage: {
    marginBottom: 20,
    textAlign: 'center',
    fontSize: 16,
    color: '#000',
  },
  contactButton: {
    backgroundColor: COLOR.black,
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 5,
    marginBottom: 10,
    width: '100%',
    alignItems: 'center',
  },
  contactButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  closeButton: {
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#007BFF',
    width: '100%',
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#007BFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

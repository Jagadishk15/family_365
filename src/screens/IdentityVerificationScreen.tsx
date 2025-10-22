import {
  Image,
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import ContainerProvider from '../components/providers/ContainerProvider';
import ImageBackgroundProvider from '../components/providers/BackgroundGradiantProvider';
import KeyboardAvoidingProvider from '../components/providers/KeyboardAvoidingProvider';
import {COLOR} from '../utils/colors';
import TextInputComponent from '../components/fields/TextInputComponent';
import {theme} from '../utils/theme';
import RadioButtonComponent from '../components/fields/RadioButtonComponent';
import CustomButtonField from '../components/fields/CustomButtonField';
import {useNavigation} from '@react-navigation/native';
import {useToaster} from '../components/providers/ToasterProvider';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../redux/store';
import TextFieldDropdown from '../components/fields/TextFieldDropdown';
import CustomModal from '../components/modal/CustommodalComponent';

// type errorType = {
//   message: string;
//   duration: number;
//   status: 'error' | 'success' | 'warning';
//   slideFrom: 'right' | 'left';
// };
const IdentityVerificationScreen = () => {
  const {showToast} = useToaster();
  const navigation = useNavigation<any>();
  const dispatch = useDispatch<AppDispatch>();
  const registerData = useSelector((state: RootState) => state.authSlice);
  const {OrphanageDetails} = useSelector(
    (state: RootState) => state.orphanageDetails,
  );
  const {registerForm, memberData}: any = registerData ?? {};
  const [isModalVisible, setModalVisible] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [consentText, setConsentText] = useState<string[]>([
    'Agree',
    'Do Not Agree',
  ]);
  const [selectedConsentText, setSelectedConsentText] = useState<string>();

  // State variables for Aadhar and PAN
  const [aadhar, setAadhar] = useState<string>('');
  const [aadharName, setAadharName] = useState<string>('');
  const [pan, setPan] = useState<string>('');
  const [blood, setBlood] = useState<string>('');
  const [profession, setProfession] = useState<string>();
  const [loading, setLoading] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<any | null>(null);
  useEffect(() => {
    if (hoveredIndex) {
      setBlood(hoveredIndex);
    }
  }, [hoveredIndex]);
  //   const IdProofApiCall = async () => {
  //     try {
  //       // Create a new FormData object
  //       console.log(JSON.stringify(imageData1));

  //       // Send the request using POST method
  //       const proofResponse = await axios.post(
  //         `
  // https://dev.family365.org:8443/api/v1/family-member/update-proof?aadharNo=qe2345345345&panNo=234234242343&memberId=${2}`,
  //         imageData1,
  //         {
  //           headers: {
  //             'Content-Type': 'multipart/form-data',
  //           },
  //         },
  //       );

  //       console.log('ID Proof Response:', proofResponse?.data);
  //       // navigation.navigate('identityVerificationScreen');
  //     } catch (error: any) {
  //       console.log('Error:', error.response?.data || error.message);
  //     }
  //   };
  const validation = (org: any) => {
    for (const [key, value] of Object.entries(org)) {
      if (!value || value?.trim() === '') {
        const payload = {
          message: `Enter ${key} detail`,
          duration: 3000,
          status: 'error',
          slideFrom: 'right',
        };
        return payload;
      }
    }
    return true;
  };

  const onProceed = async () => {
    // setLoading(true);
    // const error = handleIdentityVFinalidation({
    //   // aadhar,
    //   pan,
    //   blood,
    //   profession,
    //   // selectedConsentText,
    // });
    setIsVisible(false);
    const error: any = validation({
      pan,
      blood,
      // selectedConsentText,
    });

    if (error?.message) {
      setLoading(false);
      return showToast(error);
    } else {
      // dispatch(
      //   registerForm({
      //     aadhar,
      //     pan,
      //     blood,
      //     profession,
      //   }),
      // );
      navigation.navigate('paymentVerificationScreen', {
        dataNew: {
          aadhar,
          pan,
          blood,
          profession,
        },
      });
      //       let payload: any = {
      //         firstName: registerForm?.fullName,
      //         lastName: registerForm?.fullName?.slice(0, 4),
      //         middleName: '',
      //         userId: '',
      //         memberId: 0,
      //         mobileNumber: registerForm?.phoneNumber,
      //         addressLine1: registerForm?.address1,
      //         addressLine2: registerForm?.address2,
      //         city: registerForm?.city,
      //         state: registerForm?.state,
      //         pincode: registerForm?.pinCode,
      //         country: registerForm?.country,
      //         gender: registerForm?.gender,
      //         emailId: registerForm?.email,
      //         idNumber1: aadhar,
      //         // idType1: '',
      //         idNumber2: pan,
      //         profession,
      //         bloodGroup: blood,
      //         // idType2: '',
      //         dateOfBirth: '1994-04-22',
      //         memberShipRegisteredDate: OrphanageDetails?.at(0)?.data?.regDate,
      //         interestIn: OrphanageDetails?.at(0)?.data?.type,
      //         memberOrphanageAssociationId: 0,
      //         sharePIData: true,
      //         paymentRefId: registerForm?.transactionId,

      //         totalAmountPaid:
      //           Number(memberData?.length) *
      //           Number(OrphanageDetails?.at(0)?.data?.mealAmountPerDay),
      //         groupBooking: memberData?.length > 1,
      //       };
      //       try {
      //         if (payload) {
      //           console.log(`auth/signup/member?orphanageId=${Number(
      //             OrphanageDetails?.at(0)?.data?.orphanageId,
      //           )}&quantity=${Number(memberData?.length)}`)
      //           console.log(`pay ${JSON.stringify(payload)}`)
      //           const response: any
      //            =
      //            await API_INSTANCE.post(
      //             `auth/signup/member?orphanageId=${Number(
      //               OrphanageDetails?.at(0)?.data?.orphanageId,
      //             )}&quantity=${Number(memberData?.length)}`,
      //             payload,
      //           );
      //           if (response?.data) {
      //             // await API_INSTANCE.post(
      //             //   `auth/member-booking?orphanageId=${Number(
      //             //     OrphanageDetails?.at(0)?.data?.orphanageId,
      //             //   )}&quantity=${Number(memberData?.length)}`,
      //             //   payload,
      //             // );
      //             let formattedPayload = [];
      //             for(let index = 0; index < memberData?.length; index += 1){
      //               const [day, month, year] = memberData[index]?.bookingDate.split('/');
      // const monthMap = {
      //   Jan: '01',
      //   Feb: '02',
      //   Mar: '03',
      //   Apr: '04',
      //   May: '05',
      //   Jun: '06',
      //   Jul: '07',
      //   Aug: '08',
      //   Sep: '09',
      //   Oct: '10',
      //   Nov: '11',
      //   Dec: '12',
      // };
      // const formattedDate = `${year}-${monthMap[month]}-${day}`;
      // const [dayD, monthD, yearD] = memberData[index]?.memberNameBookedDob.split('/');
      // const formattedDateDob = `${yearD}-${monthMap[monthD]}-${dayD}`;

      //               const res =  {
      //                 "memberId": response?.data?.data.memberId,
      //                 "totalPaymentMade": OrphanageDetails?.at(0)?.data?.mealAmountPerDay,
      //                 "bookingDate": formattedDate,
      //                 "orphanageId": OrphanageDetails?.at(0)?.data?.orphanageId,
      //                 "memberNameBooked": memberData[index]?.memberNameBooked,
      //                 "memberNameBookedDob": formattedDateDob,
      //                 "memberNameBookedDescription": memberData[index]?.memberBookedDescription
      //               };
      //               formattedPayload.push(res);
      //             }
      //             console.log('formatt', formattedPayload)
      //             await API_INSTANCE.post(
      //              `auth/member-booking`,
      //              formattedPayload,
      //            );
      //             const userWithOrphanageId = {
      //               ...response?.data?.data, // Spread existing user data
      //               orphanageId: OrphanageDetails?.at(0)?.data?.orphanageId, // Add orphanageId to the user object
      //             };
      //             console.log(JSON.stringify(userWithOrphanageId));
      //             setLoading(false);
      //             navigation.navigate('paymentScreen', {
      //               user: userWithOrphanageId
      //             });
      //           }
      //         }
      //       } catch (error: any) {
      //         console.log(error?.response?.data)
      //         setLoading(false);
      //         showToast({
      //           message: error?.response?.data?.message,
      //           duration: 5000,
      //           status: 'error',
      //           slideFrom: 'right',
      //         });
      //       }
    }
  };
  const handleIdChange = (text: string, type: string) => {
    if (type === 'aadhar') {
      setAadhar(text);
    } else if (type === 'pan') {
      setPan(text);
    } else if (type === 'blood') {
      setBlood(text);
    } else if (type === 'profession') {
      setProfession(text);
    }
  };

  const _identityUploadSection = () => {
    return (
      <View style={styles.idContainer}>
        <Text style={styles.idText}>Identity Verification</Text>

        <TextInputComponent
          backgroundColor={theme.white}
          height={50}
          radius={10}
          type="text"
          placeholder="Aadhar Number (Optional)"
          placeholderTextColor={COLOR.darkGray}
          textColor={COLOR.black}
          onChange={(text: any) => handleIdChange(text, 'aadhar')}
          value={aadhar}
          inputName="aadhar"
        />
        <TextInputComponent
          backgroundColor={theme.white}
          height={50}
          radius={10}
          type="text"
          placeholder="PAN Number (Mandatory)"
          placeholderTextColor={COLOR.darkGray}
          textColor={COLOR.black}
          onChange={(text: any) => handleIdChange(text, 'pan')}
          value={pan}
          inputName="pan"
        />
      </View>
    );
  };

  const _identityGroupSection = () => {
    return (
      <View style={styles.idContainer}>
        <Text style={styles.idText}>Verification</Text>
        <View style={{backgroundColor: 'white', borderRadius: 10}}>
          <TextFieldDropdown
            radius={16}
            placeholder={'Blood group'}
            dropDownValues={['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']}
            value={blood}
            height={60}
            placeholderTextColor={theme.black}
            backgroundColor={theme.white}
            borderColor="white" // 🔹 Custom border color
            borderWidth={2} // 🔹 Custom border width
            borderRadius={10} // 🔹 Custom border radius
            width={350} // 🔹 Custom width
            onChange={setBlood}
            textColor={theme.black}
            hoveredIndex={hoveredIndex}
            setHoveredIndex={setHoveredIndex}
          />
        </View>
        <View style={{marginTop: 15}}>
          <TextInputComponent
            backgroundColor={theme.white}
            height={50}
            radius={10}
            type="text"
            placeholder="Profession (Optional)"
            placeholderTextColor={COLOR.darkGray}
            textColor={COLOR.black}
            onChange={(text: any) => handleIdChange(text, 'profession')}
            value={profession}
            inputName="profession"
          />
        </View>
      </View>
    );
  };

  const _your_Consent = () => {
    return (
      <View style={{width: '100%'}}>
        <Text style={styles.consentHeader}>Terms & Conditions</Text>
        <View style={styles.consentTextContainer}>
          <Text style={styles.consentSubHeader}>
            By proceeding forward, you acknowledge that you have read and agreed
            to the Terms and Conditions.
          </Text>
          {/* <View style={styles.boxContainer}>
            <Pressable
              style={{flex: 1, alignItems: 'center'}}
              onPress={() => {
                setSelectedConsentText('Agree');
                Keyboard.dismiss();
              }}>
              <View style={styles.leftBox}>
                <Image
                  source={require('../assets/images/agree.png')}
                  width={40}
                  height={40}
                />
              </View>
              <View style={styles.radioContainer}>
                <RadioButtonComponent
                  isSelected={consentText?.at(0) === selectedConsentText}
                />
                <Text style={styles.radioText}>{consentText?.at(0)}</Text>
              </View>
            </Pressable>
            <Pressable
              style={{flex: 1, alignItems: 'center'}}
              onPress={() => {
                setSelectedConsentText('Do Not Agree');
                Keyboard.dismiss();
              }}>
              <View style={styles.rightBox}>
                <Image
                  source={require('../assets/images/ignoree.png')}
                  width={40}
                  height={40}
                />
              </View>
              <View style={styles.radioContainer}>
                <RadioButtonComponent
                  isSelected={consentText?.at(1) === selectedConsentText}
                />
                <Text style={styles.radioText}>{consentText?.at(1)}</Text>
              </View>
            </Pressable>
          </View> */}
          <TouchableOpacity
            style={{alignSelf: 'flex-end'}}
            onPress={() => {
              if (isVisible) return;
              setIsVisible(true);
            }}>
            <Text style={{fontSize: 14, color: COLOR.white, fontWeight: '600'}}>
              Read More...
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const _buttonSection = () => {
    return (
      <CustomButtonField
        buttonText="Continue"
        textColor={theme.white}
        style={styles.button}
        opacity={0.1}
        textStyle={styles.buttonText}
        onPress={onProceed}
      />
    );
  };

  return (
    <ContainerProvider
      loading={loading}
      isModalVisible={isModalVisible}
      setModalVisible={setModalVisible}>
      <KeyboardAvoidingProvider>
        <ImageBackgroundProvider style={styles.innerContainer}>
          <View style={styles.logoSection}>
            <Image
              source={require('../assets/images/whitelogo.png')}
              style={styles.logoImage}
            />
          </View>
          {_identityUploadSection()}
          {/* {_noteSection()} */}
          {_identityGroupSection()}
          {_your_Consent()}
          {_buttonSection()}
          <View>
            <CustomModal
              visible={isVisible}
              onAccept={onProceed}
              onDecline={() => setIsVisible(false)}
            />
          </View>
        </ImageBackgroundProvider>
      </KeyboardAvoidingProvider>
    </ContainerProvider>
  );
};

export default IdentityVerificationScreen;

const styles = StyleSheet.create({
  innerContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    rowGap: 6,
    alignItems: 'center',
    paddingVertical: 20,
    resizeMode: 'cover',
    paddingHorizontal: 16,
  },
  logoSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 120,
  },
  logoImage: {
    width: 160,
    height: 86,
  },

  // ID Section styles
  idContainer: {
    width: '100%',
    minHeight: 180,
  },
  idText: {
    fontSize: 14,
    fontWeight: 600,
    color: COLOR.white,
    textAlign: 'left',
    marginBottom: 16,
  },

  // Note section styles
  noteContainer: {
    backgroundColor: '#7E4FF0',
    borderRadius: 10,
    padding: 10,
    elevation: 5,
    width: '100%',
  },
  textContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    columnGap: 5,
    width: '100%',
  },
  noteHeading: {
    fontSize: 13,
    fontWeight: '500',
    color: '#fff',
    marginBottom: 5,
    marginLeft: 10,
  },
  noteText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#fff',
    marginBottom: 5,
    lineHeight: 20,
  },
  noteContent: {
    marginHorizontal: 10,
  },

  // Consent section styles
  consentHeader: {
    fontSize: 14,
    fontWeight: 700,
    color: COLOR.white,
    textAlign: 'left',
    marginVertical: 12,
  },
  consentSubHeader: {
    fontSize: 14,
    fontWeight: 600,
    color: COLOR.white,
    textAlign: 'left',
    lineHeight: 20,
    marginBottom: 12,
  },
  consentTextContainer: {
    backgroundColor: '#7E4FF0',
    borderRadius: 10,
    padding: 20,
    elevation: 5,
    minHeight: 100,
    height: 120,
    width: '100%',
  },
  boxContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  leftBox: {
    width: 90,
    height: 90,
    backgroundColor: COLOR.white,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightBox: {
    width: 90,
    height: 90,
    backgroundColor: COLOR.white,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
    gap: 6,
  },
  radioText: {
    fontSize: 14,
    color: COLOR.white,
  },

  // Button styles
  button: {
    backgroundColor: COLOR.black,
    height: 47,
    width: 110,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: 600,
  },
});

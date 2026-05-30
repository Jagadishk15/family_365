import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import ContainerProvider from '../components/providers/ContainerProvider';
import ImageBackgroundProvider from '../components/providers/BackgroundGradiantProvider';
import KeyboardAvoidingProvider from '../components/providers/KeyboardAvoidingProvider';
import {COLOR} from '../utils/colors';
import TextInputComponent from '../components/fields/TextInputComponent';
import {theme} from '../utils/theme';
import CustomButtonField from '../components/fields/CustomButtonField';
import {useNavigation} from '@react-navigation/native';
import {useToaster} from '../components/providers/ToasterProvider';
import {RootState} from '../redux/store';
import {useSelector} from 'react-redux';
import API_INSTANCE from '../config/apiClient';

const PaymentVerificationScreen = ({route}: any) => {
  const {showToast} = useToaster();
  const navigation = useNavigation<any>();
  const registerData = useSelector((state: RootState) => state.authSlice);
  const {OrphanageDetails}: any = useSelector(
    (state: RootState) => state.orphanageDetails,
  );

  const {dataNew} = route.params;
  const {registerForm, memberData}: any = registerData ?? {};
  // console.log('registerForm', registerForm?.orphanageId);
  // console.log('OrphanageDetails', OrphanageDetails);
  // console.log('memberData', memberData);
  // console.log('orphanage id', OrphanageDetails?.at(0)?.data?.orphanageId);
  // console.log('email', registerForm?.email);
  // console.log('email', registerForm?.fullName);
  // console.log('email', registerForm?.phoneNumber);
  const [isModalVisible, setModalVisible] = useState<boolean>(false);
  const [transactionId, setTransactionId] = useState<string>();

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<any>({
    amount: '',
    productInfo: '',
    firstName: registerForm?.fullName,
    email: registerForm?.email,
    phone: registerForm?.phoneNumber?.toString(),
    orphangeId: OrphanageDetails?.at(0)?.data?.orphanageId?.toString(),
  });
  const [digitalPaymentId, setDigitalPaymentId] = useState<string>();

  useEffect(() => {
    if (OrphanageDetails?.length > 0) {
      setDigitalPaymentId(OrphanageDetails[0]?.data?.digitalPaymentId);
    }
  }, [OrphanageDetails]);

  const onProceed = async () => {
    try {
      console.log('formData', formData.totalAmount);
      if (formData?.amount && formData?.productInfo) {
        setLoading(true);
        const payloadForAPI = {
          ...formData,
          amount: formData?.totalAmount, // Send totalAmount as amount to API
        };
        const response = await API_INSTANCE.post(
          '/v2/payment/create-order',
          payloadForAPI,
        );
        navigation.navigate('paymentSummaryScreen', {
          amount: formData?.totalAmount,
          dataNew: dataNew,
          paymentDetails: response?.data?.data,
        });
      } else {
        showToast({
          message: 'please fill all fields',
          duration: 5000,
          status: 'error',
          slideFrom: 'right',
        });
      }
    } catch (error: any) {
      setLoading(false);
      console.log(error);
      console.log(error?.response?.data?.message);
      console.log(error?.data?.response?.message);
    } finally {
      setLoading(false);
    }
  };
  // const onProceed = async () => {
  //   // setLoading(true);
  //   const error = false;
  //   console.log(error);

  //   if (error) {
  //     setLoading(false);
  //     return showToast(error);
  //   } else {
  //     let payload: any = {
  //       firstName: registerForm?.fullName,
  //       lastName: registerForm?.fullName?.slice(0, 4),
  //       middleName: '',
  //       userId: '',
  //       memberId: 0,
  //       mobileNumber: registerForm?.phoneNumber,
  //       addressLine1: registerForm?.address1,
  //       addressLine2: registerForm?.address2,
  //       city: registerForm?.city,
  //       state: registerForm?.state,
  //       pincode: registerForm?.pinCode,
  //       country: registerForm?.country,
  //       gender: registerForm?.gender,
  //       emailId: registerForm?.email,
  //       idNumber1: dataNew?.aadhar,
  //       // idType1: '',
  //       idNumber2: dataNew?.pan,
  //       profession: dataNew?.profession,
  //       bloodGroup: dataNew?.blood,
  //       // idType2: '',
  //       dateOfBirth: '1994-04-22',
  //       memberShipRegisteredDate: OrphanageDetails?.at(0)?.data?.regDate,
  //       interestIn: OrphanageDetails?.at(0)?.data?.type,
  //       memberOrphanageAssociationId: 0,
  //       sharePIData: true,
  //       paymentRefId: transactionId || '',

  //       totalAmountPaid:
  //         Number(memberData?.length) *
  //         Number(OrphanageDetails?.at(0)?.data?.mealAmountPerDay),
  //       groupBooking: memberData?.length > 1,
  //     };
  //     console.log(payload);
  //     try {
  //       if (payload) {
  //         console.log(
  //           `auth/signup/member?orphanageId=${Number(
  //             OrphanageDetails?.at(0)?.data?.orphanageId,
  //           )}&quantity=${Number(memberData?.length)}`,
  //         );
  //         console.log(`pay ${JSON.stringify(payload)}`);
  //         const response: any = await API_INSTANCE.post(
  //           `auth/signup/member?orphanageId=${Number(
  //             OrphanageDetails?.at(0)?.data?.orphanageId,
  //           )}&quantity=${Number(memberData?.length)}`,
  //           payload,
  //         );
  //         if (response?.data) {
  //           // await API_INSTANCE.post(
  //           //   `auth/member-booking?orphanageId=${Number(
  //           //     OrphanageDetails?.at(0)?.data?.orphanageId,
  //           //   )}&quantity=${Number(memberData?.length)}`,
  //           //   payload,
  //           // );
  //           let formattedPayload = [];
  //           for (let index = 0; index < memberData?.length; index += 1) {
  //             const [day, month, year] =
  //               memberData[index]?.bookingDate.split('/');
  //             const monthMap = {
  //               Jan: '01',
  //               Feb: '02',
  //               Mar: '03',
  //               Apr: '04',
  //               May: '05',
  //               Jun: '06',
  //               Jul: '07',
  //               Aug: '08',
  //               Sep: '09',
  //               Oct: '10',
  //               Nov: '11',
  //               Dec: '12',
  //             };
  //             const formattedDate = `${year}-${monthMap[month]}-${day}`;
  //             const [dayD, monthD, yearD] =
  //               memberData[index]?.memberNameBookedDob.split('/');
  //             const formattedDateDob = `${yearD}-${monthMap[monthD]}-${dayD}`;

  //             const res = {
  //               memberId: response?.data?.data.memberId,
  //               totalPaymentMade:
  //                 OrphanageDetails?.at(0)?.data?.mealAmountPerDay,
  //               bookingDate: formattedDateDob,
  //               orphanageId: OrphanageDetails?.at(0)?.data?.orphanageId,
  //               memberNameBooked: memberData[index]?.memberNameBooked,
  //               memberNameBookedDob: formattedDateDob,
  //               memberNameBookedDescription:
  //                 memberData[index]?.memberBookedDescription,
  //             };
  //             formattedPayload.push(res);
  //           }
  //           // console.log('formatt', formattedPayload);
  //           await API_INSTANCE.post(`auth/member-booking`, formattedPayload);
  //           const userWithOrphanageId = {
  //             ...response?.data?.data, // Spread existing user data
  //             orphanageId: OrphanageDetails?.at(0)?.data?.orphanageId, // Add orphanageId to the user object
  //           };
  //           console.log(JSON.stringify(userWithOrphanageId));
  //           setLoading(false);
  //           navigation.navigate('paymentScreen', {
  //             user: userWithOrphanageId,
  //           });
  //         }
  //       }
  //     } catch (error: any) {
  //       console.log(error?.response?.data);
  //       setLoading(false);
  //       showToast({
  //         message: error?.response?.data?.message,
  //         duration: 5000,
  //         status: 'error',
  //         slideFrom: 'right',
  //       });
  //     }
  //   }
  // };

  const costPerMember = OrphanageDetails?.at(0)?.data?.mealAmountPerDay ?? 0;
  const numberOfMembers = memberData?.length ?? 1;
  const totalCost = costPerMember * numberOfMembers;

  useEffect(() => {
    setFormData((prv: any) => ({
      ...prv,
      amount: costPerMember?.toString(),
      productInfo: 'family365',
      totalAmount: totalCost?.toString(),
    }));
  }, [OrphanageDetails, totalCost]);

  const _receiptSection = () => {
    return (
      <View style={styles.receiptContainer}>
        <Text style={styles.receiptHeading}>Meal Support Summary</Text>
        <View style={styles.receiptRow}>
          <Text style={styles.receiptLabel}>
            Per Day Cost {'\n'}{' '}
            <Text style={{fontSize: 10}}>
              (Breakfast, Lunch, Dinner included)
            </Text>
          </Text>
          <Text style={styles.receiptValue}>{'₹' + ' ' + costPerMember}</Text>
        </View>
        <View style={styles.receiptRow}>
          <Text style={styles.receiptLabel}>Number of Donors</Text>
          <Text style={styles.receiptValue}>{numberOfMembers}</Text>
        </View>
        <View style={styles.receiptRow}>
          <Text style={styles.receiptLabel}>Total</Text>
          <Text
            style={{
              fontSize: 14,
              // marginBottom: 10,
              color: COLOR.white,
              fontWeight: 'bold',
            }}>
            {'₹' + ' ' + totalCost}
          </Text>
        </View>
      </View>
    );
  };

  const _identityGroupSection = () => {
    // Copy to Clipboard Function
    // const handleCopy = (text: string | undefined) => {
    //   Clipboard.setString(text ?? ''); // Copies text to clipboard
    //   Alert.alert('Copied', `${text} copied to clipboard`);
    // };

    return (
      <View style={styles.idContainer}>
        <Text style={styles.idText}>
          {`You’re One Step Away from ${'\n'} Feeding ${
            OrphanageDetails?.at(0)?.data?.strength
          } People`}
        </Text>
        {_receiptSection()}
        {/* <Text style={styles.idTextT}>UPI ID</Text> */}
        {/* Profession Section */}
        {/* <View style={{marginBottom: 15}}>
          <TextInputComponent
            backgroundColor={theme.white}
            radius={16}
            height={50}
            placeholder="Amount"
            placeholderTextColor={theme.black}
            textColor={theme.black}
            type="number"
            onChange={Am => setFormData({...formData, amount: Am})}
            value={formData.amount}
          />
        </View>
        <View style={{marginBottom: 10}}>
          <TextInputComponent
            backgroundColor={theme.white}
            radius={16}
            height={50}
            placeholder="Product Info"
            placeholderTextColor={theme.black}
            textColor={theme.black}
            onChange={pIfo => setFormData({...formData, productInfo: pIfo})}
            value={formData.productInfo}
          />
        </View> */}
      </View>
    );
  };

  const _buttonSection = () => {
    return (
      <CustomButtonField
        buttonText="Proceed To Pay"
        textColor={theme.white}
        style={styles.button}
        opacity={0.1}
        onPress={onProceed}
        textStyle={styles.buttonText}
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
          {_identityGroupSection()}
          {_buttonSection()}
        </ImageBackgroundProvider>
      </KeyboardAvoidingProvider>
    </ContainerProvider>
  );
};

export default PaymentVerificationScreen;

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
  idContainer: {
    padding: 16,
  },
  // idText: {
  //   fontSize: 18,
  //   fontWeight: 'bold',
  //   marginBottom: 10,
  //   color: COLOR.black,
  // },
  idText: {
    fontSize: 18,
    fontWeight: 600,
    color: COLOR.white,
    textAlign: 'center',
    marginBottom: 26,
    lineHeight: 35,
  },
  receiptContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  receiptHeading: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLOR.white,
    marginBottom: 8,
    textAlign: 'center',
  },
  receiptRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 8,
  },
  receiptLabel: {
    fontSize: 14,
    color: COLOR.white,
    fontWeight: '600',
  },
  receiptValue: {
    fontSize: 14,
    color: COLOR.white,
    fontWeight: '600',
  },
  idTextT: {
    fontSize: 14,
    fontWeight: 600,
    color: COLOR.white,
    textAlign: 'left',
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  input: {
    backgroundColor: theme.white,
    borderColor: COLOR.darkGray,
    borderWidth: 1,
    borderRadius: 10,
    height: 50,
    paddingHorizontal: 10,
    color: COLOR.black,
  },
  copyButton: {
    marginLeft: 10,
    backgroundColor: COLOR.seaGreen,
    borderRadius: 10,
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
  },
  copyText: {
    color: theme.white,
    fontSize: 14,
    fontWeight: 'bold',
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
    fontWeight: 600,
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
    minHeight: 180,
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
    width: 210,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    // marginLeft: 'auto',
    marginTop: 30,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: 600,
  },
});

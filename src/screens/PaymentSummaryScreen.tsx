import {Alert, Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import ContainerProvider from '../components/providers/ContainerProvider';
import ImageBackgroundProvider from '../components/providers/BackgroundGradiantProvider';
import CustomButtonField from '../components/fields/CustomButtonField';
import {theme} from '../utils/theme';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/store';
import {useAuthState} from '../context/AuthContext';
import API_INSTANCE from '../config/apiClient';
import {useToaster} from '../components/providers/ToasterProvider';
import RazorpayCheckout from 'react-native-razorpay';
import moment from 'moment';
import {COLOR} from '../utils/colors';

const PaymentSummaryScreen = () => {
  const [options, setOption] = useState<any>({
    key: '',
    amount: '',
    currency: 'INR',
    description: 'Family365',
    image: 'https://family365.org/wp-content/uploads/2025/07/ins-logo.png',
    order_id: '',
    handler: function (response: any) {
      Alert.alert(response.razorpay_payment_id);
      Alert.alert(response.razorpay_order_id);
      Alert.alert(response.razorpay_signature);
    },
    prefill: {
      name: '',
      email: '',
      contact: '',
    },
    notes: {
      address: '',
    },
    theme: {
      color: '#3399cc',
    },
  });
  const [options_to_payload, setOption_to_payload] = useState<any>({
    key: '',
    amount: '',
    currency: 'INR',
    description: 'Family365',
    image: 'https://family365.org/wp-content/uploads/2025/07/ins-logo.png',
    order_id: '',
    handler: function (response: any) {
      Alert.alert(response.razorpay_payment_id);
      Alert.alert(response.razorpay_order_id);
      Alert.alert(response.razorpay_signature);
    },
    prefill: {
      name: '',
      email: '',
      contact: '',
    },
    notes: {
      address: '',
    },
    theme: {
      color: '#3399cc',
    },
  });
  const route = useRoute();
  const {user, setUser}: any = useAuthState() ?? {};
  const {showToast} = useToaster();
  const navigation = useNavigation<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const [localUserState, setLocalUserState] = useState<any>();
  const [isModalVisible, setModalVisible] = useState<boolean>(false);
  const registerData = useSelector((state: RootState) => state.authSlice);
  const {registerForm, memberData}: any = registerData ?? {};
  const {OrphanageDetails} = useSelector(
    (state: RootState) => state.orphanageDetails,
  );
  const {amount}: any = route.params;
  const {dataNew}: any = route.params;
  const {paymentDetails}: any = route.params;

  const verifyPayment = async (res: any) => {
    let response_payload = JSON.parse(res);
    let payload = {
      checkoutOrderId: response_payload?.razorpay_order_id,
      razorpayPymntId: response_payload?.razorpay_payment_id,
      pymntSignature: response_payload?.razorpay_signature,
    };

    try {
      const response: any = await API_INSTANCE.post(
        `/v2/payment/verify-payment`,
        payload,
      );
      if (response?.data) {
        onProceed();
      }
    } catch (error: any) {
      console.log('verify payment', error.response);
      showToast({
        message: 'payment faild',
        duration: 5000,
        status: 'error',
        slideFrom: 'right',
      });
    }
  };

  const handlePayPress = () => {
    if (loading) return;
    setLoading(true);
    RazorpayCheckout.open(options_to_payload)
      .then(data => {
        let res = JSON.stringify(data);
        verifyPayment(res);
        setLoading(false);
        // handle success
        // console.log('Success', JSON.stringify(data));
      })
      .catch(error => {
        // handle failure
        setLoading(false);
        console.log(`Error: ${error.code} | ${error.description}`);
      });
  };
  useEffect(() => {
    const {
      key,
      razorAmountFormat,
      orphangeId,
      orderId,
      firstName,
      email,
      phone,
      inspirationGST,
      inspritationAmount,
      inspritationShare,
      razorpayAmount,
      razorpayGST,
      razorpayShare,
    } = paymentDetails;

    setOption((prv: any) => ({
      'Donation Amount':
        '₹' + ' ' + OrphanageDetails?.at(0)?.data?.mealAmountPerDay,
      'Donated To': 'Inspirations Public Charitable Trust',
      'Platform Fee \n (incl. GST)': '₹' + ' ' + inspritationAmount / 100,
      'Payment Gateway Charges \n (incl. GST)':
        '₹' + ' ' + razorpayAmount / 100,
      'Total Payable': '₹' + ' ' + razorAmountFormat / 100,
      key: key,
      amount: razorAmountFormat,
      order_id: orderId,
      prefill: {
        name: firstName,
        email: email,
        contact: phone,
      },
      'inspiration GST': inspirationGST + ' ' + '%',
      'inspritation Share': inspritationShare + ' ' + '%',
      'razorpay GST': razorpayGST + ' ' + '%',
      'razorpay Share': razorpayShare + ' ' + '%',
      ...prv,
    }));
    setOption_to_payload((prv: any) => ({
      ...prv,
      key: key,
      amount: razorAmountFormat,
      order_id: orderId,
      prefill: {
        name: firstName,
        email: email,
        contact: phone,
      },
    }));
    // dispatch(memberData())
  }, [paymentDetails]);
  console.log(options);
  const onProceed = async () => {
    // setLoading(true);
    const error = false;
    console.log(error);

    if (error) {
      setLoading(false);
      // return showToast(error);
    } else {
      let payload: any = {
        firstName: registerForm?.fullName,
        lastName: registerForm?.fullName?.slice(0, 4),
        middleName: '',
        mobileNumber: registerForm?.phoneNumber,
        addressLine1: registerForm?.address1,
        addressLine2: registerForm?.address2,
        city: registerForm?.city,
        state: registerForm?.state,
        pincode: registerForm?.pinCode,
        country: registerForm?.country,
        gender: registerForm?.gender,
        emailId: registerForm?.email,
        idNumber1: dataNew?.aadhar,
        // idType1: '',
        idNumber2: dataNew?.pan,
        profession: dataNew?.profession,
        bloodGroup: dataNew?.blood,
        // idType2: '',
        dateOfBirth: '1994-04-22',
        memberShipRegisteredDate: OrphanageDetails?.at(0)?.data?.regDate,
        interestIn: OrphanageDetails?.at(0)?.data?.type,
        sharePIData: true,
        paymentRefId: paymentDetails?.paymentId?.toString(),
        totalAmountPaid:
          Number(memberData?.length) *
          Number(OrphanageDetails?.at(0)?.data?.mealAmountPerDay),
        groupBooking: memberData?.length > 1,
      };

      try {
        if (payload) {
          // console.log(
          //   `auth/signup/member?orphanageId=${Number(
          //     OrphanageDetails?.at(0)?.data?.orphanageId,
          //   )}&quantity=${Number(memberData?.length)}`,
          // );
          // console.log(`pay ${JSON.stringify(payload)}`);
          const response: any = await API_INSTANCE.post(
            `auth/signup/member?orphanageId=${Number(
              OrphanageDetails?.at(0)?.data?.orphanageId,
            )}&quantity=${Number(memberData?.length)}`,
            payload,
          );

          if (response?.data) {
            let memberModify: any[] = memberData;
            let cal_payment = Number(amount) / Number(memberData?.length);
            memberModify = memberData?.map((md: any, i: number) => ({
              ...md,
              totalPaymentMade: cal_payment?.toString(),
              memberId: response?.data?.data?.memberId?.toString(),
              orphanageId: Number(OrphanageDetails?.at(0)?.data?.orphanageId),
              memberNameBookedDob: moment(
                md?.memberNameBookedDob,
                'DD/MMM/YYYY',
              ).format('YYYY-MM-DD'),
              bookingDate: moment(md?.bookingDate, 'DD/MMM/YYYY').format(
                'YYYY-MM-DD',
              ),
            }));
            const member_booking_response = await API_INSTANCE.post(
              `auth/member-booking`,
              memberModify,
            );
            if (member_booking_response?.data?.success) {
              setUser(response?.data?.data);
            }

            // let formattedPayload = [];
            // for (let index = 0; index < memberData?.length; index += 1) {
            //   const [day, month, year] =
            //     memberData[index]?.bookingDate.split('/');
            //   const monthMap: any = {
            //     Jan: '01',
            //     Feb: '02',
            //     Mar: '03',
            //     Apr: '04',
            //     May: '05',
            //     Jun: '06',
            //     Jul: '07',
            //     Aug: '08',
            //     Sep: '09',
            //     Oct: '10',
            //     Nov: '11',
            //     Dec: '12',
            //   };
            //   const formattedDate = `${year}-${monthMap[month]}-${day}`;
            //   const [dayD, monthD, yearD] =
            //     memberData[index]?.memberNameBookedDob.split('/');
            //   const formattedDateDob = `${yearD}-${monthMap[monthD]}-${dayD}`;

            //   const res = {
            //     memberId: response?.data?.data.memberId,
            //     totalPaymentMade:
            //       OrphanageDetails?.at(0)?.data?.mealAmountPerDay,
            //     bookingDate: formattedDateDob,
            //     orphanageId: OrphanageDetails?.at(0)?.data?.orphanageId,
            //     memberNameBooked: memberData[index]?.memberNameBooked,
            //     memberNameBookedDob: formattedDateDob,
            //     memberNameBookedDescription:
            //       memberData[index]?.memberBookedDescription,
            //   };
            //   formattedPayload.push(res);
            // }
            // console.log('formatt', formattedPayload);
            // await API_INSTANCE.post(`auth/member-booking`, formattedPayload);
            // const userWithOrphanageId = {
            //   ...response?.data?.data, // Spread existing user data
            //   orphanageId: OrphanageDetails?.at(0)?.data?.orphanageId, // Add orphanageId to the user object
            // };
            // setLoading(false);
            // navigation.navigate('paymentScreen', {
            //   user: userWithOrphanageId,
            // });
          }
        }
      } catch (error: any) {
        console.log('signup -----', error?.response);
        setLoading(false);
        showToast({
          message: error?.response?.data?.message,
          duration: 5000,
          status: 'error',
          slideFrom: 'right',
        });
      }
    }
  };

  const renderSummary = () => {
    return (
      <View style={styles.summaryContainer}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: '500',
            textAlign: 'center',
            marginVertical: 15,
            color: theme.white,
          }}>
          Donation Summary
        </Text>
        {Object.entries(options)
          .filter(
            ([key, value]: any) =>
              key != 'key' &&
              key != 'image' &&
              key != 'handler' &&
              key != 'amount' &&
              key != 'theme' &&
              key != 'notes' &&
              key != 'currency' &&
              key != 'description' &&
              key != 'order_id' &&
              key != 'prefill' &&
              key != 'razorpay Share' &&
              key != 'razorpay GST' &&
              key != 'inspritation Share' &&
              key != 'inspiration GST' &&
              key != 'theme',
          )
          .map(([key, value]: any) => (
            <View key={key} style={styles.rowContainer}>
              <View style={styles.keyContainer}>
                <Text style={styles.keyText}>{key}</Text>
              </View>
              <View style={styles.valueContainer}>
                {typeof value === 'object' ? (
                  Object.entries(value).map(([subKey, subValue]: any) => (
                    <View key={subKey} style={styles.nestedRow}>
                      <Text style={styles.nestedKeyText}>{subKey}:</Text>
                      <Text style={styles.nestedValueText}>{subValue}</Text>
                    </View>
                  ))
                ) : (
                  <Text style={styles.valueText}>
                    {key === 'amount' ? '₹' + ' ' + amount : value}
                  </Text>
                )}
              </View>
            </View>
          ))}
      </View>
    );
  };

  return (
    <ContainerProvider
      loading={loading}
      isModalVisible={isModalVisible}
      setModalVisible={setModalVisible}>
      <ImageBackgroundProvider style={styles.innerContainer}>
        <View style={styles.logoSection}>
          <Image
            source={require('../assets/images/whitelogo.png')}
            style={styles.logoImage}
          />
        </View>
        <ScrollView style={styles.bodySection}>{renderSummary()}</ScrollView>
        <View
          style={{
            width: '100%',
            alignItems: 'center',
            paddingHorizontal: 20,
            marginVertical: 20,
          }}>
          <CustomButtonField
            buttonText="Confirm & Pay"
            onPress={handlePayPress}
            style={{
              backgroundColor: COLOR.seaGreen,
              borderRadius: 8,
              marginBottom: 60,
            }}
            textColor={theme.white}
            textStyle={{
              fontSize: 17,
              fontWeight: '700',
              textTransform: 'capitalize',
              letterSpacing: 0.3,
              paddingVertical: 10,
              paddingHorizontal: 20,
              borderRadius: 12,
              color: theme.white,
            }}
            opacity={1}
          />
        </View>
      </ImageBackgroundProvider>
    </ContainerProvider>
  );
};

export default PaymentSummaryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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
  bodySection: {
    flex: 1,
    width: '90%',
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingBottom: 100,
    marginBottom: 40, // white container height
    marginTop: 50, // white container height
  },
  summaryContainer: {
    width: '100%',
  },
  rowContainer: {
    flexDirection: 'row',
    paddingVertical: 8,
    // borderBottomWidth: 1,
    // borderBottomColor: '#',
  },
  keyContainer: {
    flex: 3,
    justifyContent: 'center',
  },
  valueContainer: {
    flex: 3,
    justifyContent: 'center',
  },
  keyText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: theme.white,
    textTransform: 'capitalize',
  },
  valueText: {
    fontSize: 15,
    color: theme.white,
    marginLeft: 20,
    textTransform: 'capitalize',
    textAlign: 'right',
  },
  nestedRow: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  nestedKeyText: {
    fontSize: 14,
    color: '#666',
    marginRight: 8,
  },
  nestedValueText: {
    fontSize: 14,
    color: '#888',
    flex: 1,
  },
});

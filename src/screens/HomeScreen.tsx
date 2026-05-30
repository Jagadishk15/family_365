import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState, useCallback} from 'react';
import {useNavigation} from '@react-navigation/native';
import ContainerProvider from '../components/providers/ContainerProvider';
import GradiantProvider from '../components/providers/GradiantProvider';
import {COLOR} from '../utils/colors';
import CustomButtonField from '../components/fields/CustomButtonField';
import {theme} from '../utils/theme';
import ImageSlider from '../components/view/ImageSliderView';
import BadgeView from '../components/view/BadgeView';
import {GroupIcon, HeandHeartIcon, LocationIcon} from '../assets/svg';
import AvatarViewComponent from '../components/view/AvatarViewComponent';
import {useAuthState} from '../context/AuthContext';
import API_INSTANCE from '../config/apiClient';
import {useTabBarVisibility} from '../context/TabBarVisibilityContext';
import {resetState} from '../redux/slices/dataSlice';
import {useDispatch} from 'react-redux';
import {useToaster} from '../components/providers/ToasterProvider';
import type {AppDispatch} from '../redux/store';

const data = [
  require('../assets/images/act-1.png'),
  require('../assets/images/act-2.png'),
];

const data1 = [
  require('../assets/images/bookImage.png'),
  require('../assets/images/dressImage.png'),
];

const HomeScreen = () => {
  const {user, setUser} = useAuthState() ?? {};
  const {showToast} = useToaster();
  const [orphanageDetails, setOrphanageDetails] = useState<any>({});
  const tabBarContext = useTabBarVisibility() as any;
  const setTabBarVisible = tabBarContext?.setTabBarVisible || (() => {});
  const navigation = useNavigation<any>();
  const dispatch = useDispatch<AppDispatch>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // console.log('memberDetails', memberDetails)

  const fetchMemberDetails = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await API_INSTANCE.get(
        `v1/family-member/fetch-member-details-by-mobilenumber?mobileNumber=${user?.mobileNumber}`,
      );
      const memberData = response?.data?.data;
      const interestType = memberData?.interestIn || 'CHILD_CARE';
      const userPincode = memberData?.pincode;
      
      const response1 = await API_INSTANCE.get(
        'v1/admin/filter-orphanage-by-algorithm',
        {
          params: {
            pincode: userPincode,
            type: interestType,
          },
        },
      );
      setOrphanageDetails(response1?.data?.data || {});
      setUser({
        ...memberData,
        orphanageId: response1?.data?.data?.orphanageId,
        mobileNo: response1?.data?.data?.mobileNo,
      });
      
      if ((memberData as any)?.regStatus === 'pending') {
        showToast({
          message: 'Payment is being verified, please wait...',
          duration: 5000,
          status: 'warning',
          slideFrom: 'right',
        });
      }
      // if (user?.regStatus === 'pending') {
      //   showToast({
      //     message: 'Payment is being verified, please wait...',
      //     duration: 5000,
      //     status: 'warning',
      //     slideFrom: 'right',
      //   });
      // }
      // setOrphanageDetails(response1?.data?.data);
      // const orphanageId = response1?.data?.data?.orphanageId;
      // const response2 = await API_INSTANCE.get(
      //   `v1/storage/fetch-logo-for-orphanage`,
      //   {
      //     params: {orphanageId},
      //     responseType: 'arraybuffer', // Ensure binary data is fetched
      //   },
      // );

      // // Convert binary data to Base64
      // const base64Image = `data:image/png;base64,${Buffer.from(
      //   response2.data,
      //   'binary',
      // ).toString('base64')}`;
      // setLogoUri(base64Image);
    } catch (err: any) {
      console.error('Error fetching member details:', err);
      setError('Failed to load member details');
    } finally {
      setIsLoading(false);
    }
  }, [user?.mobileNumber, setUser, setOrphanageDetails, showToast]);

  useEffect(() => {
    if (user?.mobileNumber) {
      fetchMemberDetails();
    }
  }, [user?.mobileNumber, fetchMemberDetails]);

  // Show loading or error message if applicable
  if (isLoading) {
    return (
      <ContainerProvider>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLOR.seaGreen} />
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      </ContainerProvider>
    );
  }

  if (error) {
    return (
      <ContainerProvider>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      </ContainerProvider>
    );
  }

  // Check registration status
  if ((user as any)?.regStatus === 'pending') {
    setTabBarVisible(false);
    return (
      <ContainerProvider
        headerProps={{type: 2, headerTitle: `Hello, ${user?.firstName}`}}>
        <View style={styles.pendingContainer}>
          <Image
            source={require('../assets/images/waiting.png')}
            style={styles.logoImage}
          />
          <Text style={styles.pendingText}>
            Your payment is currently being verified. This may take a moment.
            You will receive an email notification once the verification process
            is complete.
          </Text>
          <CustomButtonField
            buttonText="Check Verification Status"
            onPress={fetchMemberDetails}
            style={styles.checkButton}
            textColor={theme.white}
            textStyle={styles.checkButtonText}
            opacity={0.8}
          />
        </View>
        <View
          style={styles.pendingFooterContainer}>
          <Pressable
            onPress={() => {
              dispatch(resetState());
              setUser(null);
            }}
            style={styles.pendingLogoutButton}>
            <Text style={styles.pendingLogoutText}>Logout</Text>
          </Pressable>
          <Text style={styles.pendingFooterText}>Family365</Text>
        </View>
      </ContainerProvider>
    );
  } else {
    setTabBarVisible(true);
  }

  // Render the main screen if registration status is not pending
  const _firstSection = () => {
    return (
      <GradiantProvider
        style={styles.cardContainer}
        colors={['#FFBD59', '#F6B2AF']}>
        <View style={styles.content}>
          <Text style={styles.title}>
            365 Days Of{' '}
            <Image
              source={require('../assets/images/banana.png')}
              style={styles.firstSecImage}
            />{' '}
            {'Food\n365 Days of Happiness'}
          </Text>
          <Text style={styles.description}>
            World is One Family
            {/* Pledge a day's meal. Together, as a family, we can provide 365 days
            of nourishment. */}
          </Text>
          {/* <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Sponsor Now</Text>
          </TouchableOpacity> */}
        </View>
        <Image
          source={require('../assets/images/banner.png')}
          style={styles.image}
        />
      </GradiantProvider>
    );
  };

  return (
    <ContainerProvider
      headerProps={{type: 2, headerTitle: `Hello, ${user?.firstName}`}}>
      <ScrollView style={styles.mainScrollView}>
        <View style={styles.innerMainContainer}>
          {/* firstSection */}
          <View style={styles.firstSecContainer}>{_firstSection()}</View>
          {/* ///section two */}
          <View style={styles.secTwoContainer}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => navigation.navigate('activitiesScreen')}
              style={styles.sectionTwoInnerContainer}>
              {/* <View style={styles.sectionTwoInnerContainer}> */}
              <ImageSlider
                data={data}
                containerWidth={168}
                containerHeight={155}
                imageContainerStyle={styles.imageSliderContainer}
                imageStyle={styles.imageSliderImage}
              />

              {/* <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  alignItems: 'flex-start',
                  columnGap: 20,
                  paddingTop: 10,
                  position: 'absolute',
                  height: '100%',
                }}> */}
              {/* <CustomButtonField
                  buttonText="Activities >"
                  onPress={() => {navigation.navigate('activitiesScreen', {orphanageDetails})}}
                  style={[styles.ActivitiesBtn, {width: 100}]}
                  textColor={theme.white}
                  textStyle={styles.btnText}
                  opacity={0.8}
                /> */}
              {/* <CalenderColorIcon /> */}
              {/* </View> */}
              {/* <Text style={styles.sec2BtnSec}>
                Independence Day Celebration at Bright Future Home
              </Text> */}
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => navigation.navigate('sponserScreen')}
              style={styles.blueSection}>
              {/* <View style={styles.blueSection}> */}
              <CustomButtonField
                buttonText="Sponsors"
                onPress={() => {
                  navigation.navigate('sponserScreen');
                }}
                style={[styles.ActivitiesBtn, {width: 90, marginLeft: 8}] as any}
                textColor={theme.white}
                textStyle={styles.btnText}
                opacity={0.8}
              />
              <Text style={styles.blueSectionText}>
                "Together, We Are {'\n'}Making a Positive Impact"
              </Text>
              <BadgeView
                icon={<HeandHeartIcon />}
                titleText={'A Big Thank You!'}
                style={styles.blueBadgeContainer}
                textStyle={styles.blueBadgeText}
              />
            </TouchableOpacity>
          </View>

          {/* third section */}
          <View style={styles.thirdSectionContainer}>
            <View style={styles.thirdSectionInner}>
              <ScrollView
                style={styles.thirdSectionScroll}
                contentContainerStyle={styles.thirdSectionScrollContent}>
                <CustomButtonField
                  buttonText="Home Details"
                  onPress={() => {
                    navigation.navigate('orphanageScreen', {
                      OrphanageDetails: [orphanageDetails],
                    });
                  }}
                  style={[styles.ActivitiesBtn, {width: 120, marginLeft: 8}] as any}
                  textColor={theme.white}
                  textStyle={styles.btnText}
                  opacity={0.8}
                />
                <BadgeView
                  icon={
                    <View style={styles.badgeIconView}>
                      {/* <Image
        source={
          logoUri
            ? { uri: logoUri }
            : require('../assets/images/section1.png')
        }
        style={styles.section1Image}
      /> */}
                    </View>
                  }
                  titleText={orphanageDetails?.name}
                  style={styles.thirdSectionBadge}
                  textStyle={styles.badgeTextGreen}
                />

                <View
                  style={styles.addressContainer}>
                  <View style={styles.addressRow}>
                    <LocationIcon />
                    <Text style={styles.addressText}>
                      {orphanageDetails?.addressLine1}{' '}
                      {orphanageDetails?.addressLine2}{' '}
                      {orphanageDetails?.addressLine3} {orphanageDetails?.city}{' '}
                      {orphanageDetails?.district} {orphanageDetails?.state}{' '}
                      {orphanageDetails?.pincode}
                    </Text>
                  </View>

                  <View style={styles.addressRow}>
                    <GroupIcon />
                    <Text style={styles.addressText}>
                      Supported: 38
                    </Text>
                  </View>

                  {/* <View style={{flexDirection: 'row', columnGap: 3}}>
                  <FlagIcon />
                  <Text
                    style={{
                      textAlign: 'left',
                      lineHeight: 16,
                      color: COLOR.black,
                      fontSize: 13,
                      width: '95%',
                    }}>
                    <Text
                      style={{
                        fontSize: 13,
                        fontWeight: 700,
                        color: COLOR.black,
                      }}>
                      Mission:
                    </Text>{' '}
                   {orphanageDetails?.mission}
                  </Text>
                </View> */}

                  {/* <CustomButtonField
                  buttonText="More Details"
                  onPress={() => {}}
                  opacity={0.8}
                  style={{
                    height: 35,
                    borderRadius: 20,
                    backgroundColor: COLOR.black,
                    justifyContent: 'center',
                    width: 110,
                    marginLeft: 'auto',
                    marginTop: 16,
                  }}
                  textColor={theme.white}
                /> */}
                </View>
              </ScrollView>
            </View>

            {/* "right" */}
            <View style={styles.rightSectionContainer}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => navigation.navigate('needScreen')}
                style={styles.needsSection}>
                {/* <View
                style={{
                  backgroundColor: '#F4C4F3',
                  flex: 0.6,
                  borderRadius: 20,
                  justifyContent: 'center',
                  rowGap: 12,
                  alignItems: 'center',
                }}> */}
                <CustomButtonField
                  buttonText="Needs"
                  onPress={() => {
                    navigation.navigate('needScreen');
                  }}
                  style={[
                    styles.ActivitiesBtn,
                    {
                      width: 80,
                      marginTop: 10,
                      marginRight: 'auto',
                      marginLeft: 10,
                    },
                  ] as any}
                  textColor={theme.white}
                  textStyle={styles.btnText}
                  opacity={0.8}
                />

                <Text
                  style={styles.needsText}>
                  "No matter the size, every contribution brings hope"
                  {/* The list of requirements : */}
                </Text>
                <ImageSlider
                  data={data1}
                  containerWidth={150}
                  containerHeight={45}
                  imageContainerStyle={styles.needsImageContainer}
                  imageStyle={styles.needsImageStyle}
                />
              </TouchableOpacity>

              {/* bottom  */}
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => navigation.navigate('galleryScreen')}
                style={styles.yellowContainer}>
                <CustomButtonField
                  buttonText="Gallery"
                  onPress={() => {
                    navigation.navigate('galleryScreen');
                  }}
                  style={[
                    styles.ActivitiesBtn,
                    {width: 80, marginLeft: 8, marginTop: 8},
                  ] as any}
                  textColor={theme.white}
                  textStyle={styles.btnText}
                  opacity={0.8}
                />
                <View style={styles.container}>
                  {/* First Avatar with no negative margin */}
                  <View style={[styles.avatarWrapper, styles.firstAvatar]}>
                    <AvatarViewComponent
                      imageData="https://imageuploadtestingbob.s3.us-east-2.amazonaws.com/dev/alpino/g1.png"
                      imageStyle={styles.avatarImage}
                    />
                  </View>
                  {/* Subsequent avatars */}
                  <View style={styles.avatarWrapper}>
                    <AvatarViewComponent
                      imageData="https://imageuploadtestingbob.s3.us-east-2.amazonaws.com/dev/alpino/g2.png"
                      imageStyle={styles.avatarImage}
                    />
                  </View>
                  <View style={styles.avatarWrapper}>
                    <AvatarViewComponent
                      imageData="https://imageuploadtestingbob.s3.us-east-2.amazonaws.com/dev/alpino/g3.png"
                      imageStyle={styles.avatarImage}
                    />
                  </View>
                  {/* "+24 Img" Text */}
                  <View style={styles.moreWrapper}>
                    <Text style={styles.moreText}>+24 Img</Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </ContainerProvider>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  innerMainContainer: {
    flex: 1,
    marginHorizontal: 16,
    rowGap: 16,
    marginVertical: 16,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
    paddingHorizontal: 16,
  },
  errorText: {
    fontSize: 16,
    color: COLOR.black,
    textAlign: 'center' as const,
    fontWeight: '600' as const,
  },
  container: {
    flexDirection: 'row',
    // alignItems: 'center',
    paddingLeft: 1,
    paddingBottom: 40,
  },
  avatarWrapper: {
    // For overlapping effect, except for the first avatar
    marginLeft: -20,
  },
  avatarImage: {
    width: 80,
    height: 80,
    borderRadius: 40, // half of width/height for a circle
    resizeMode: 'cover',
    // borderWidth: 2,   // Optional: Add a border to better see the overlapping effect
    // borderColor: '#fff',
  },
  moreWrapper: {
    // Ensure the text appears after the avatars.
    marginLeft: 20,
    // backgroundColor: '#fff', // optional background for contrast
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    paddingTop: 30,
    position: 'relative',
    zIndex: 1,
  },
  moreText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#000',
  },
  pendingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  logoImage: {
    width: 130,
    height: 130,
  },
  pendingText: {
    fontSize: 16,
    color: COLOR.black,
    textAlign: 'center',
    fontWeight: '600',
    marginTop: 20,
  },

  logoSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 240,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLOR.white, // Replace with your background color
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: COLOR.darkGray, // Replace with your preferred text color
  },
  ///first section
  firstSecContainer: {flex: 1, minHeight: '4%'},
  cardContainer: {
    flexDirection: 'row',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  content: {
    flex: 1,
    paddingLeft: 16,
    paddingVertical: 14,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  checkButton: {
    backgroundColor: COLOR.black,
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginTop: 50,
  },

  checkButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.white,
  },
  description: {
    fontSize: 16,
    fontWeight: 600,
    color: '#555',
    marginTop: 25,
  },
  button: {
    backgroundColor: '#000',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignSelf: 'flex-start',
    marginTop: 6,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '600',
  },
  image: {
    // height: '100%',
    // maxHeight: 0,
    // borderRadius: 10,
    paddingTop: 10,
  },
  firstSecImage: {
    height: 20,
    width: 30,
  },

  ///common btn
  //active btn
  ActivitiesBtn: {
    backgroundColor: 'backgroundColor: "rgba(0, 0, 0, 0.3)"',
    height: 35,
    justifyContent: 'center',
    borderRadius: 20,
    position: 'relative',
    alignItems: 'center',
  },
  btnText: {
    fontSize: 14,
    fontWeight: 700,
    color: '#FFFFFF',
    position: 'absolute',
    opacity: 2,
  },
  section1Image: {
    width: 30,
    height: 30,
    borderRadius: 10,
    marginRight: 10,
  },

  //section2
  secTwoContainer: {
    flex: 1,
    flexDirection: 'row',
    columnGap: 16,
    borderRadius: 20,
  },
  sectionTwoInnerContainer: {
    flex: 1,
    borderRadius: 20,
    marginLeft: 4,
  },
  sec2BtnSec: {
    position: 'absolute',
    color: '#fff',
    bottom: 10,
    marginHorizontal: 10,
    fontSize: 13,
    fontWeight: 500,
    textAlign: 'left',
    letterSpacing: 0.5,
  },

  //blue sec
  blueSection: {
    backgroundColor: '#72C6EF',
    flex: 1,
    borderRadius: 20,
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    paddingVertical: 6,
    minHeight: 143,
  },
  blueSectionText: {
    color: COLOR.black,
    fontSize: 13,
    fontWeight: 400,
    marginHorizontal: 5,
    marginLeft: 10,
    lineHeight: 17,
  },
  blueBadgeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLOR.white,
    borderRadius: 20,
    paddingHorizontal: 8,
    height: 35,
    marginLeft: 8,
  },
  blueBadgeText: {color: COLOR.black, fontSize: 11, fontWeight: 500},

  ///third section
  thirdSectionContainer: {
    flex: 2,
    flexDirection: 'row',
    columnGap: 16,
    height: 320,
  },
  thirdSectionInner: {
    backgroundColor: '#5DD2AE',
    flex: 1,
    borderRadius: 20,
    justifyContent: 'center',
    rowGap: 8,
  },
  badgeTextGreen: {
    color: COLOR.black,
    fontSize: 12,
    fontWeight: '500',
    paddingLeft: 10,
    maxWidth: 120, // ✅ Restrict max width
    overflow: 'hidden', // ✅ Prevent text overflow

  },
  thirdSectionBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLOR.white,
    borderRadius: 20,
    // paddingHorizontal: 8,
    height: 35,
    marginHorizontal: 8,
    width: 160, // ✅ Ensure the badge has enough space
  },

  yellowContainer: {
    backgroundColor: '#FFD194',
    flex: 0.4,
    borderRadius: 20,
    justifyContent: 'space-around',
  },
  
  // Pending status styles
  pendingFooterContainer: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pendingLogoutButton: {
    height: 30,
    borderWidth: 1,
    borderColor: COLOR.black,
    paddingHorizontal: 20,
    justifyContent: 'center',
    marginBottom: 10,
    borderRadius: 16,
  },
  pendingLogoutText: {
    color: COLOR.black,
    fontSize: 14,
  },
  pendingFooterText: {
    color: COLOR.black,
    fontSize: 14,
  },
  
  // Main scroll view
  mainScrollView: {
    flex: 1,
    height: '100%',
  },
  
  // Image slider styles
  imageSliderContainer: {
    flex: 1,
    width: 168,
    height: 155,
    borderRadius: 20,
  },
  imageSliderImage: {
    width: 168,
    height: 155,
    borderRadius: 20,
  },
  
  // Third section scroll
  thirdSectionScroll: {
    flex: 1,
  },
  thirdSectionScrollContent: {
    paddingHorizontal: 1,
    paddingVertical: 10,
    rowGap: 16,
  },
  
  // Badge icon view
  badgeIconView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  // Address section
  addressContainer: {
    left: 10,
    width: '80%',
    rowGap: 4,
  },
  addressRow: {
    flexDirection: 'row',
    columnGap: 3,
  },
  addressText: {
    color: COLOR.black,
    fontSize: 13,
  },
  
  // Right section (needs and gallery)
  rightSectionContainer: {
    flex: 1,
    rowGap: 16,
  },
  needsSection: {
    backgroundColor: '#F4C4F3',
    flex: 0.6,
    borderRadius: 20,
    justifyContent: 'center',
    rowGap: 12,
    alignItems: 'center',
  },
  needsText: {
    width: 150,
    fontSize: 13,
    fontWeight: '400',
  },
  needsImageContainer: {
    flex: 1,
    width: 150,
    height: 45,
    borderRadius: 20,
  },
  needsImageStyle: {
    width: 150,
    height: 45,
    borderRadius: 20,
  },
  
  // Avatar first item
  firstAvatar: {
    marginLeft: 0,
  },
});

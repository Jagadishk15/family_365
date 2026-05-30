import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import ContainerProvider from '../components/providers/ContainerProvider';
import HeaderView from '../components/view/HeaderView';
import {COLOR} from '../utils/colors';
import GradiantProvider from '../components/providers/GradiantProvider';
import CustomButtonField from '../components/fields/CustomButtonField';
import {theme} from '../utils/theme';
import {useAuthState} from '../context/AuthContext';
import {
  NotificationIcon,
  ProfileAnswerIcon,
  ProfileDonationHistoryIcon,
  ProfileIssueIcon,
  ProfileLocationIcon,
  RightArrowIcon,
} from '../assets/svg';
import {AppDispatch} from '../redux/store';
import {useDispatch} from 'react-redux';
import {resetState} from '../redux/slices/dataSlice';
import {useToaster} from '../components/providers/ToasterProvider';

// --- Import the navigation hook
import {useNavigation} from '@react-navigation/native';
import type {StackNavigationProp} from '@react-navigation/stack';
import API_INSTANCE from '../config/apiClient';

// Example stack param list; adjust to match your navigation setup
type RootStackParamList = {
  Profile: undefined;
  Gallery: undefined;
  personalDetailsScreen: undefined;
  faqScreen: undefined;
  raiseIssueScreen: undefined;
  sponserScreen: undefined;
  // add others as needed
};

// Type for navigation hook, referencing our stack params
type ProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Profile'
>;

const profileListData = [
  {
    icon: <ProfileLocationIcon />,
    title: 'Personal detail',
  },
  {
    icon: <NotificationIcon width={20} height={20} />,
    title: 'Notification',
  },
  {
    icon: <ProfileDonationHistoryIcon />,
    title: 'Donation History',
  },
  // {
  //   icon: <ProfileDOwnloadIcon />,
  //   title: 'Download Receipt',
  // },
  {
    icon: <ProfileAnswerIcon />,
    title: 'Frequently Asked Questions',
  },
  {
    icon: <ProfileIssueIcon />,
    title: 'Raise an Issue',
  },
];

const ProfileScreen = () => {
  const {showToast} = useToaster();
  const {user, setUser} = useAuthState() ?? {};
  const dispatch = useDispatch<AppDispatch>();
  const [sponsors, setSponsors] = useState<string>(''); // To store API response
  const [_error, setError] = useState<string | null>(null); // Error state

  const formatDate = (dateStr: string) => {
    const dateObj = new Date(dateStr);
    return dateObj.toLocaleDateString('en-US', {
      month: 'long',
      day: '2-digit',
      year: 'numeric',
    });
  };

  function getUpcomingBookingDate(bookings: any[]) {
    // Get today's date with time set to 00:00:00
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    // Filter for future bookings (including today)
    const futureBookings = bookings.filter((booking: any) => {
      const bookingDate = new Date(booking.bookingDate);
      const bookingDateOnly = new Date(
        bookingDate.getFullYear(),
        bookingDate.getMonth(),
        bookingDate.getDate(),
      );
      return bookingDateOnly >= today;
    });

    if (futureBookings.length > 0) {
      // Find the earliest future booking date
      const upcomingBooking = futureBookings.reduce((earliest: any, current: any) => {
        const earliestDate = new Date(earliest.bookingDate);
        const currentDate = new Date(current.bookingDate);
        return earliestDate <= currentDate ? earliest : current;
      });
      return upcomingBooking.bookingDate;
    } else {
      // If no future bookings, then check for past bookings
      const pastBookings = bookings.filter((booking: any) => {
        const bookingDate = new Date(booking.bookingDate);
        const bookingDateOnly = new Date(
          bookingDate.getFullYear(),
          bookingDate.getMonth(),
          bookingDate.getDate(),
        );
        return bookingDateOnly < today;
      });

      if (pastBookings.length > 0) {
        // Find the most recent past booking date
        const recentBooking = pastBookings.reduce((latest: any, current: any) => {
          const latestDate = new Date(latest.bookingDate);
          const currentDate = new Date(current.bookingDate);
          return latestDate >= currentDate ? latest : current;
        });
        return recentBooking.bookingDate;
      } else {
        return null;
      }
    }
  }

  const fetchSponsors = async () => {
    try {
      const response = await API_INSTANCE.get(
        `v1/family-member/fetch-all-bookings-orphanage?orphangeId=${user?.orphanageId}`,
      );
      const result = await response.data;

      if (result.data) {
        const bookingDate = getUpcomingBookingDate(result?.data);
        if (bookingDate) {
          setSponsors(formatDate(bookingDate));
        } else {
          setSponsors('No sponsored meal');
        }
      } else {
        throw new Error('Failed to fetch sponsor data');
      }
    } catch (err) {
      console.error(err);
      setError('No sponsor data available for today');
    } finally {
      // setLoading(false);
    }
  };

  useEffect(() => {
    fetchSponsors();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Get navigation
  const navigation = useNavigation<ProfileScreenNavigationProp>();

  const handleListItemPress = (title: string) => {
    // If the user taps on "Notification", navigate to Notification
    // if (title === 'Notification') {
    //   navigation.navigate('notificationScreen');
    // }
    if (title === 'Personal detail') {
      navigation.navigate('personalDetailsScreen');
    }
    if (title === 'Frequently Asked Questions') {
      // show
      // showToast({
      //   message: 'Page is being developed',
      //   duration: 5000,
      //   status: 'success',
      //   slideFrom: 'right',
      // });
      navigation.navigate('faqScreen');
    }
    if (title === 'Raise an Issue') {
      // show
      // showToast({
      //   message: 'Page is being developed',
      //   duration: 5000,
      //   status: 'success',
      //   slideFrom: 'right',
      // });
      navigation.navigate('raiseIssueScreen');
    }
    if (title === 'Donation History') {
      // show
      showToast({
        message: 'Page is being developed',
        duration: 5000,
        status: 'success',
        slideFrom: 'right',
      });
    }
    if (title === 'Notification') {
      // show
      showToast({
        message: 'Page is being developed',
        duration: 5000,
        status: 'success',
        slideFrom: 'right',
      });
    }
    // You can add more conditions here if you want to navigate
    // to other screens based on the title
  };

  const _nameSection = () => {
    return (
      <View style={styles.nameContainer}>
        <Text style={styles.nameText}>
          {user?.firstName ?? 'Family365 user'}
        </Text>
      </View>
    );
  };

  const _profileList = (item: any, index: number) => {
    return (
      <Pressable
        key={index}
        onPress={() => handleListItemPress(item.title)} // Attach press handler
        style={styles.profileListItem}>
        <View style={styles.profileLeft}>
          <View style={styles.listIconOuter}>{item?.icon}</View>
          <Text style={styles.listText}>{item?.title}</Text>
        </View>
        <View style={styles.profileRight}>
          <RightArrowIcon />
        </View>
      </Pressable>
    );
  };

  const _imageSection = () => {
    return (
      <GradiantProvider
        colors={['#E88B44', '#F2BD7F']}
        style={styles.imageSectionGradient}>
        <Image
          source={require('../assets/images/food.png')}
          style={styles.foodImage}
        />
        <View
          style={styles.imageSectionContent}>
          <Text style={styles.sponsorshipTitle}>
            Date of Meal Sponsorship{' '}
          </Text>
          <CustomButtonField
            style={styles.sponsorButton}
            buttonText={sponsors}
            opacity={1}
            textColor={theme.white}
            onPress={() => {
              navigation.navigate('sponserScreen');
            }}
            textStyle={styles.sponsorButtonText}
          />
        </View>
      </GradiantProvider>
    );
  };

  const _formSection = () => {
    return (
      <View style={styles.formSection}>
        {profileListData?.map((item, index) => {
          return (
            <View key={index}>
              {_profileList(item, index)}
              <View
                style={styles.divider}
              />
            </View>
          );
        })}
      </View>
    );
  };

  return (
    <ContainerProvider>
      <HeaderView type={4} headerTitle="Profile" />
      <View style={styles.mainContainer}>
        {/* Name Section */}
        <View
          style={styles.nameSectionContainer}>
          {_nameSection()}
        </View>

        {/* Image Section */}
        <View style={styles.imageSectionContainer}>
          {_imageSection()}
        </View>

        {/* Form Section */}
        <View style={styles.formSectionContainer}>
          <ScrollView contentContainerStyle={styles.scrollContent}>
            {_formSection()}
          </ScrollView>
        </View>

        {/* Footer Section */}
        <View
          style={styles.footerContainer}>
          <Pressable
            onPress={() => {
              dispatch(resetState());
              setUser(null);
            }}
            style={styles.logoutButton}>
            <Text style={styles.logoutText}>Logout</Text>
          </Pressable>
          <Text style={styles.footerText}>Family365</Text>
        </View>
      </View>
    </ContainerProvider>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  nameContainer: {
    flex: 1,
    marginTop: 50,
  },
  nameText: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '700',
    color: COLOR.black,
  },
  profileListItem: {
    flexDirection: 'row',
    marginTop: 16,
    marginBottom: 12,
  },
  listIconOuter: {
    height: 40,
    width: 40,
    backgroundColor: COLOR.silverLight,
    borderRadius: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listText: {
    fontSize: 18,
    color: COLOR.black,
    fontWeight: '600',
  },
  profileLeft: {
    flex: 0.8,
    flexDirection: 'row',
    columnGap: 18,
    alignItems: 'center',
    paddingLeft: 12,
  },
  profileRight: {
    flex: 0.1,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  imageSectionGradient: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    borderRadius: 30,
    minHeight: 40,
    maxHeight: 120,
  },
  foodImage: {
    height: 100,
    width: 100,
  },
  imageSectionContent: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    rowGap: 10,
  },
  sponsorshipTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLOR.white,
  },
  sponsorButton: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderRadius: 30,
    paddingLeft: 8,
    paddingRight: 8,
  },
  sponsorButtonText: {
    fontSize: 14,
  },
  formSection: {
    flex: 3,
  },
  divider: {
    borderBottomColor: COLOR.silverLight,
    borderBottomWidth: 1,
  },
  mainContainer: {
    flex: 1,
  },
  nameSectionContainer: {
    flex: 0.3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageSectionContainer: {
    flex: 0.4,
    paddingHorizontal: 16,
  },
  formSectionContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  scrollContent: {
    paddingBottom: 16,
  },
  footerContainer: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoutButton: {
    height: 30,
    borderWidth: 1,
    borderColor: COLOR.black,
    paddingHorizontal: 20,
    justifyContent: 'center',
    marginBottom: 10,
    borderRadius: 16,
  },
  logoutText: {
    color: COLOR.black,
    fontSize: 14,
  },
  footerText: {
    color: COLOR.black,
    fontSize: 14,
  },
});

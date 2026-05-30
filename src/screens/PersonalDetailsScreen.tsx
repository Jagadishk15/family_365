import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import ContainerProvider from '../components/providers/ContainerProvider';
import HeaderView from '../components/view/HeaderView';
import {COLOR} from '../utils/colors';
import {useAuthState} from '../context/AuthContext';
import API_INSTANCE from '../config/apiClient';
import {useToaster} from '../components/providers/ToasterProvider';

interface PersonalDetails {
  firstName: string;
  lastName: string;
  middleName: string;
  userId: string | null;
  memberId: number;
  mobileNumber: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  validity: string;
  bloodGroup: string;
  regStatus: string;
  profession: string | null;
  pincode: string;
  country: string;
  gender: string;
  family365Id: string | null;
  emailId: string;
  idNumber1: string;
  idType1: string;
  idNumber2: string;
  idType2: string;
  dateOfBirth: string;
  memberShipRegisteredDate: string;
  interestIn: string;
  memberOrphanageAssociationId: string | null;
  sharePIData: boolean;
  paymentRefId: string;
  totalAmountPaid: number;
  groupBooking: boolean;
}

const PersonalDetailsScreen = () => {
  const {showToast} = useToaster();
  const {user} = useAuthState() ?? {};
  const [details, setDetails] = useState<PersonalDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const formatDate = (dateStr: string) => {
    if (!dateStr) {
      return 'N/A';
    }
    const dateObj = new Date(dateStr);
    return dateObj.toLocaleDateString('en-US', {
      month: 'long',
      day: '2-digit',
      year: 'numeric',
    });
  };

  const fetchPersonalDetails = async () => {
    try {
      const response = await API_INSTANCE.get(
        `v1/family-member/fetch-member-details-by-mobilenumber?mobileNumber=${user?.mobileNumber}`,
      );
      const result = await response.data;

      if (result.success && result.data) {
        setDetails(result.data);
      } else {
        throw new Error('Failed to fetch personal details');
      }
    } catch (err) {
      console.error(err);
      showToast({
        message: 'Failed to load personal details',
        duration: 3000,
        status: 'error',
        slideFrom: 'right',
      });
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchPersonalDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchPersonalDetails();
  };

  const renderDetailRow = (label: string, value: string | number | null | undefined) => {
    return (
      <View style={styles.detailRow}>
        <Text style={styles.labelText}>{label}</Text>
        <Text style={styles.valueText}>{value || 'N/A'}</Text>
      </View>
    );
  };

  const renderSection = (title: string, children: React.ReactNode) => {
    return (
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>{title}</Text>
        <View style={styles.sectionContent}>{children}</View>
      </View>
    );
  };

  if (loading) {
    return (
      <ContainerProvider>
        <HeaderView type={3} headerTitle="Personal Details" />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLOR.lavenderPurple} />
        </View>
      </ContainerProvider>
    );
  }

  return (
    <ContainerProvider>
      <HeaderView type={3} headerTitle="Personal Details" />
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View style={styles.container}>
          {/* Basic Information */}
          {renderSection(
            'Basic Information',
            <>
              {renderDetailRow('First Name', details?.firstName)}
              {renderDetailRow('Middle Name', details?.middleName)}
              {renderDetailRow('Last Name', details?.lastName)}
              {renderDetailRow('Gender', details?.gender)}
              {renderDetailRow('Date of Birth', formatDate(details?.dateOfBirth || ''))}
              {renderDetailRow('Blood Group', details?.bloodGroup)}
            </>,
          )}

          {/* Contact Information */}
          {renderSection(
            'Contact Information',
            <>
              {renderDetailRow('Mobile Number', details?.mobileNumber)}
              {renderDetailRow('Email ID', details?.emailId)}
            </>,
          )}

          {/* Address Information */}
          {renderSection(
            'Address',
            <>
              {renderDetailRow('Address Line 1', details?.addressLine1)}
              {renderDetailRow('Address Line 2', details?.addressLine2)}
              {renderDetailRow('City', details?.city)}
              {renderDetailRow('State', details?.state)}
              {renderDetailRow('Pincode', details?.pincode)}
              {renderDetailRow('Country', details?.country)}
            </>,
          )}

          {/* Membership Information */}
          {renderSection(
            'Membership Details',
            <>
              {/* {renderDetailRow('Member ID', details?.memberId?.toString())}
              {renderDetailRow('Family365 ID', details?.family365Id)} */}
              {renderDetailRow(
                'Registration Date',
                formatDate(details?.memberShipRegisteredDate || ''),
              )}
              {renderDetailRow('Validity', formatDate(details?.validity || ''))}
              {renderDetailRow(
                'Registration Status',
                details?.regStatus === 'true' ? 'Active' : 'Inactive',
              )}
              {renderDetailRow('Interest In', details?.interestIn?.replace(/_/g, ' '))}
            </>,
          )}

          {/* ID Proof Information */}
          {/* {renderSection(
            'ID Proof',
            <>
              {renderDetailRow('ID Type 1', details?.idType1)}
              {renderDetailRow('ID Number 1', details?.idNumber1)}
              {renderDetailRow('ID Type 2', details?.idType2)}
              {renderDetailRow('ID Number 2', details?.idNumber2)}
            </>,
          )} */}

          {/* Payment Information */}
          {renderSection(
            'Payment Details',
            <>
              {renderDetailRow('Payment Reference ID', details?.paymentRefId)}
              {renderDetailRow('Total Amount Paid', `₹${details?.totalAmountPaid}`)}
              {renderDetailRow(
                'Group Booking',
                details?.groupBooking ? 'Yes' : 'No',
              )}
            </>,
          )}

          {/* Other Information */}
          {/* {renderSection(
            'Other Details',
            <>
              {renderDetailRow('Profession', details?.profession)}
              {renderDetailRow(
                'Share PI Data',
                details?.sharePIData ? 'Yes' : 'No',
              )}
            </>,
          )} */}
        </View>
      </ScrollView>
    </ContainerProvider>
  );
};

export default PersonalDetailsScreen;

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  container: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionContainer: {
    marginBottom: 24,
    backgroundColor: COLOR.white,
    borderRadius: 16,
    padding: 16,
    shadowColor: COLOR.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLOR.lavenderPurple,
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLOR.tabBackground,
    paddingBottom: 8,
  },
  sectionContent: {
    gap: 12,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingVertical: 8,
  },
  labelText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLOR.darkGray,
    flex: 1,
  },
  valueText: {
    fontSize: 14,
    fontWeight: '400',
    color: COLOR.black,
    flex: 1.5,
    textAlign: 'right',
  },
});

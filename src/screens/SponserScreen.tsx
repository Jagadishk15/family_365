import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Dimensions,
  Pressable,
  FlatList,
  ActivityIndicator,
  Image,
  ScrollView as RNScrollView,
} from 'react-native';
import ContainerProvider from '../components/providers/ContainerProvider';
import CustomButtonField from '../components/fields/CustomButtonField';
import HeaderView from '../components/view/HeaderView';
import GradiantProvider from '../components/providers/GradiantProvider';
import {meals} from '../entities/mockdata';
import {theme} from '../utils/theme';
import {
  AddMemberIcon,
  ChildrenHomeIcon,
  ClockIcon,
  FoodIcon,
  UserIcon,
} from '../assets/svg';
import {useAuthState} from '../context/AuthContext';
import API_INSTANCE from '../config/apiClient';

// Get screen dimensions and define a scaling function
const {width} = Dimensions.get('window');
const guidelineBaseWidth = 375;
const scale = size => (width / guidelineBaseWidth) * size;

const SponserScreen = () => {
  const {user} = useAuthState() ?? {};
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState(today);
  const [sponsors, setSponsors] = useState([]); // API response
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch sponsor data from API
  const fetchSponsors = async () => {
    try {
      const response = await API_INSTANCE.get(
        `v1/family-member/fetch-all-bookings-orphanage?orphangeId=${user?.orphanageId}`,
      );
      const result = await response.data;

      if (result.data) {
        setSponsors(result.data);
      } else {
        throw new Error('Failed to fetch sponsor data');
      }
    } catch (err) {
      console.error(err);
      setError('No sponsor data available for today');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSponsors();
  }, []);

  // Generate dates up to the end of the current year (for safety, max 365 days)
  const generateDates = () => {
    const dates = [];
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();

    for (let i = 0; i < 365; i++) {
      const date = new Date(currentDate);
      date.setDate(currentDate.getDate() + i);
      if (date.getFullYear() > currentYear) break;
      dates.push(date);
    }

    return dates;
  };

  const dates = generateDates();

  const getMonthName = date => {
    return date.toLocaleDateString('en-US', {month: 'long', year: 'numeric'});
  };

  const _meal_section = () => {
    return (
      <GradiantProvider
        style={styles.fourthSection}
        colors={['#B7D4FF', '#B7D4FF']}>
        {meals.map((meal, index) => (
          <View key={index} style={styles.mealContainer}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>{meal?.title}</Text>
            </View>
            <View style={styles.list}>
              <Text style={styles.time}>{meal?.time}</Text>
              <View style={styles.dottedLine} />
              {meal.items.map((item, idx) => (
                <Text key={idx} style={styles.item}>
                  • {item}
                </Text>
              ))}
            </View>
          </View>
        ))}
      </GradiantProvider>
    );
  };

  const MealScheduleScreen = () => {
    return (
      <View style={styles.container}>
        {/* Dynamic Month Display */}
        <View style={styles.monthContainer}>
          <Text style={styles.monthText}>{getMonthName(selectedDate)}</Text>
        </View>

        {/* Horizontal Date Picker */}
        <View style={styles.horizontalPicker}>
          <FlatList
            data={dates}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => item.toDateString()}
            renderItem={({item}) => {
              const isSelected =
                item.toDateString() === selectedDate.toDateString();
              return (
                <Pressable
                  onPress={() => setSelectedDate(item)}
                  style={[
                    styles.dateItem,
                    isSelected && styles.activeDateItem,
                  ]}>
                  <Text
                    style={[styles.dateText, isSelected && styles.activeText]}>
                    {item.getDate()}
                  </Text>
                  <Text
                    style={[styles.dayText, isSelected && styles.activeText]}>
                    {item.toLocaleDateString('en-US', {weekday: 'short'})}
                  </Text>
                </Pressable>
              );
            }}
          />
        </View>

        <View>
          {loading ? (
            <ActivityIndicator
              size="large"
              color="#0000ff"
              style={styles.activityIndicator}
            />
          ) : error ? (
            <Text style={styles.errorText}>{error}</Text>
          ) : (
            <>
              <View style={styles.todaySponsorCard}>
                <CustomButtonField
                  buttonText={`Today Sponsors`}
                  onPress={() => {}}
                  style={styles.todaySponsorButton}
                  textColor={theme.white}
                  opacity={1}
                />
                {/* Filtered Sponsors List */}
                {sponsors.filter(
                  sponsor =>
                    sponsor.bookingDate ===
                    selectedDate.toISOString().split('T')[0],
                ).length > 0 ? (
                  sponsors
                    .filter(
                      sponsor =>
                        sponsor.bookingDate ===
                        selectedDate.toISOString().split('T')[0],
                    )
                    .map((sponsor, i) => (
                      <View key={i} style={styles.sponsorRow}>
                        {/* Sponsor Info */}
                        <View style={styles.sponsorInfo}>
                          <View style={styles.sponsorInfoRow}>
                            <Text style={styles.sponsorText}>
                              Name: {sponsor.memberNameBooked}
                            </Text>
                          </View>
                          {/* Booking Date */}
                          <View style={styles.sponsorInfoRow}>
                            <Text style={styles.sponsorText}>
                              Date: {sponsor.bookingDate}
                            </Text>
                          </View>
                        </View>

                        {/* Description */}
                        <View style={styles.sponsorDesc}>
                          <RNScrollView
                            style={styles.descScroll}
                            contentContainerStyle={{paddingBottom: scale(5)}}
                            nestedScrollEnabled={true}>
                            <Text style={styles.descText}>
                              Reason: {sponsor.memberNameBookedDescription}
                            </Text>
                          </RNScrollView>
                        </View>
                      </View>
                    ))
                ) : (
                  <View>
                    <Image
                      source={require('../assets/images/nospon.png')}
                      style={styles.sponImage}
                    />
                    <Text style={styles.noSponsorText}>
                      "No Sponsor for Food Today, But We Appreciate Your
                      Support!"
                    </Text>
                  </View>
                )}
              </View>

              {/* Impact Story Section */}
              <View
                style={[
                  styles.card,
                  {backgroundColor: '#F2BD7F', marginTop: scale(6)},
                ]}>
                <CustomButtonField
                  buttonText={`Impact Story`}
                  onPress={() => {}}
                  style={styles.impactButton}
                  textColor={theme.white}
                  opacity={1}
                />
                <View style={styles.impactContent}>
                  <Image
                    source={require('../assets/images/script.png')}
                    style={styles.impactImage}
                  />
                  <View style={styles.impactTextContainer}>
                    <Text style={styles.quoteText}>
                      "Food served to God doesn't reach a man, but the food
                      served to a hungry man reaches God.."
                    </Text>
                  </View>
                </View>
              </View>
            </>
          )}
        </View>

        <View>
          <CustomButtonField
            buttonText={`List of Sponsors`}
            onPress={() => {}}
            style={styles.listSponsorButton}
            textColor={theme.white}
            opacity={1}
          />
          {/* Sponsors List */}
          {sponsors.map((sponsor, i) => (
            <View key={i} style={styles.listSponsorCard}>
              <View style={styles.listSponsorRow}>
                {/* Sponsor Info */}
                <View style={styles.listSponsorInfo}>
                  <Text style={styles.sponsorText}>
                    Name: {sponsor.memberNameBooked}
                  </Text>
                  <Text style={styles.sponsorText}>
                    Date: {sponsor.bookingDate}
                  </Text>
                </View>

                {/* Description */}
                <View style={styles.listSponsorDesc}>
                  <RNScrollView
                    style={styles.descScroll}
                    contentContainerStyle={{paddingBottom: scale(5)}}
                    nestedScrollEnabled={true}>
                    <Text style={styles.descText}>
                      Reason: {sponsor.memberNameBookedDescription}
                    </Text>
                  </RNScrollView>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Uncomment below to display the meal section */}
        {/* {_meal_section()} */}
      </View>
    );
  };

  return (
    <ContainerProvider>
      <HeaderView type={3} headerTitle="Sponsors" />
      <ScrollView style={{width: width}}>{MealScheduleScreen()}</ScrollView>
    </ContainerProvider>
  );
};

export default SponserScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: scale(16),
  },
  card: {
    borderRadius: scale(12),
    padding: scale(16),
    marginBottom: scale(16),
    flex: 1,
  },
  errorText: {
    color: 'red',
    fontSize: scale(16),
    textAlign: 'center',
  },
  text: {
    fontSize: scale(14),
    marginBottom: scale(4),
  },
  monthContainer: {
    alignItems: 'center',
    marginBottom: scale(16),
    backgroundColor: '#333',
    width: width * 0.4,
    alignSelf: 'center',
    borderRadius: scale(20),
    paddingVertical: scale(10),
  },
  monthText: {
    fontSize: scale(14),
    fontWeight: 'bold',
    color: theme.white,
  },
  horizontalPicker: {
    marginBottom: scale(16),
    paddingVertical: scale(8),
  },
  dateItem: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: scale(8),
    borderRadius: scale(20),
    marginHorizontal: scale(8),
    backgroundColor: '#f5f5f5',
  },
  activeDateItem: {
    backgroundColor: '#333',
  },
  dateText: {
    fontSize: scale(16),
    fontWeight: 'bold',
    color: theme.black,
  },
  dayText: {
    fontSize: scale(12),
    color: theme.black,
  },
  activeText: {
    color: theme.white,
  },
  fourthSection: {
    marginVertical: scale(15),
    borderRadius: scale(20),
    backgroundColor: '#f8ebfb',
    padding: scale(10),
    flexDirection: 'row',
    flex: 1,
  },
  mealContainer: {
    borderRadius: scale(10),
    flexGrow: 1,
    marginHorizontal: scale(2),
    marginVertical: scale(2),
  },
  title: {
    fontSize: scale(16),
    fontWeight: '500',
    marginBottom: scale(1),
    textAlignVertical: 'center',
  },
  time: {
    fontSize: scale(16),
    fontWeight: 'bold',
    color: 'gray',
    marginBottom: scale(5),
  },
  quoteText: {
    fontSize: scale(13),
    fontWeight: '400',
    paddingBottom: scale(1),
  },
  list: {
    alignItems: 'flex-start',
    backgroundColor: 'white',
    padding: scale(10),
    minHeight: scale(220),
    borderRadius: scale(15),
  },
  item: {
    fontSize: scale(14),
    marginVertical: scale(2),
  },
  dottedLine: {
    width: scale(70),
    height: scale(1),
    borderTopColor: '#717171',
    borderTopWidth: scale(1),
    borderStyle: 'dotted',
    marginVertical: scale(2),
  },
  titleContainer: {
    flexDirection: 'row',
    columnGap: scale(5),
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: scale(5),
  },
  activityIndicator: {
    marginVertical: scale(20),
  },
  todaySponsorCard: {
    marginBottom: scale(10),
    backgroundColor: 'rgba(240,240,240,0.95)',
    borderRadius: scale(15),
    borderWidth: scale(1),
    borderColor: 'rgba(0,0,0,0.1)',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: scale(8),
    elevation: scale(3),
    overflow: 'hidden',
    paddingBottom: scale(10),
  },
  todaySponsorButton: {
    height: scale(40),
    backgroundColor: '#333',
    justifyContent: 'center',
    borderRadius: scale(15),
    margin: scale(10),
    width: scale(160),
    alignSelf: 'center',
    shadowRadius: scale(8),
  },
  sponsorRow: {
    flexDirection: 'row',
    paddingHorizontal: scale(10),
    paddingVertical: scale(10),
  },
  sponsorInfo: {
    flex: 1,
    backgroundColor: '#96D1CB',
    borderRadius: scale(15),
    marginRight: scale(8),
    padding: 6,
    justifyContent: 'center',
  },
  sponsorInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: scale(8),
  },
  sponsorText: {
    color: theme.black,
    marginLeft: scale(15),
    fontSize: scale(12),
    paddingVertical: scale(2),
  },
  sponsorDesc: {
    flex: 1,
    backgroundColor: 'rgba(213,99,217,0.2)',
    borderRadius: scale(10),
    padding: scale(8),
    marginLeft: scale(8),
  },
  descScroll: {
    maxHeight: scale(60),
  },
  descText: {
    fontSize: scale(13),
    color: 'rgba(0,0,0,0.8)',
    lineHeight: scale(18),
  },
  noSponsorText: {
    textAlign: 'center',
    marginVertical: scale(10),
    fontSize: scale(14),
    color: theme.black,
  },
  impactButton: {
    height: scale(30),
    backgroundColor: 'rgba(0,0,0,0.2)',
    justifyContent: 'center',
    borderRadius: scale(30),
    width: scale(110),
    marginLeft: scale(-6),
    marginBottom: scale(8),
  },
  impactContent: {
    backgroundColor: theme.white,
    borderRadius: scale(12),
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: scale(2),
    height: scale(100),
    padding: scale(8),
  },
  impactImage: {
    width: scale(80),
    height: scale(80),
    resizeMode: 'cover',
  },
  sponImage: {
    width: scale(120),
    height: scale(120),
    resizeMode: 'cover',
    alignContent: 'center',
    alignSelf: 'center',
  },
  impactTextContainer: {
    flex: 1,
    paddingLeft: scale(10),
  },
  listSponsorButton: {
    height: scale(40),
    backgroundColor: '#333',
    justifyContent: 'center',
    borderRadius: scale(15),
    margin: scale(10),
    width: scale(160),
    alignSelf: 'center',
    shadowRadius: scale(8),
  },
  listSponsorCard: {
    marginBottom: scale(10),
    backgroundColor: 'rgba(240,240,240,0.95)',
    borderRadius: scale(15),
    borderWidth: scale(1),
    borderColor: 'rgba(0,0,0,0.1)',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: scale(8),
    elevation: scale(3),
    overflow: 'hidden',
    paddingVertical: scale(10),
  },
  listSponsorRow: {
    flexDirection: 'row',
    paddingHorizontal: scale(10),
    paddingVertical: scale(10),
  },
  listSponsorInfo: {
    flex: 1,
    backgroundColor: '#96D1CB',
    borderRadius: scale(15),
    marginRight: scale(8),
    padding: 8,
    justifyContent: 'center',
  },
  listSponsorDesc: {
    flex: 1,
    backgroundColor: 'rgba(213,99,217,0.2)',
    borderRadius: scale(10),
    padding: scale(8),
    marginLeft: scale(8),
  },
});

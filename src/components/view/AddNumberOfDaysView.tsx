import {Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import {COLOR} from '../../utils/colors';
import {CalenderIcon} from '../../assets/svg';
import {theme} from '../../utils/theme';
import moment from 'moment';
import {AppDispatch, RootState} from '../../redux/store';
import {useDispatch, useSelector} from 'react-redux';

import DatePicker from 'react-native-date-picker';
export type TInputParams = {
  memberId: string;
  totalPaymentMade: string | undefined;
  bookingDate: string;
  memberNameBooked: string;
  memberNameBookedProof: string;
  memberNameBookedDob: string;
  memberBookedDescription: string;
  isVisible: boolean;
  isDescriptionError?: boolean;
  isDobError?: boolean;
  isNameError?: boolean;
};

const AddNumberOfDaysView = ({
  style,
  amountPerMember,
  localInput,
  setLocalInput,
}: {
  style: any;
  amountPerMember: number;
  localInput: TInputParams[];
  setLocalInput: React.Dispatch<React.SetStateAction<TInputParams[]>>;
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const {OrphanageDetails} = useSelector(
    (state: RootState) => state.orphanageDetails,
  );

  const handleIncrement = (length: number) => {
    if (length >= 5) return;
    setLocalInput([
      ...localInput,
      {
        isVisible: false,
        memberId: '',
        totalPaymentMade: amountPerMember.toString(),
        bookingDate: moment(Date.now()).format('DD/MMM/YYYY'),
        memberNameBooked: '',
        memberNameBookedProof: '',
        memberNameBookedDob: '',
        memberBookedDescription: '',
      },
    ]);
  };

  const handleDecrement = () => {
    if (localInput.length > 1) {
      setLocalInput(localInput.slice(0, localInput.length - 1));
    }
  };

  const DatePickerComponent = ({index}: {index: number}) => {
    const [date, setDate] = useState(new Date());

    const currentYear = new Date().getFullYear();
    const minDate = new Date(); // ✅ Today’s date (No past dates)
    const maxDate = new Date(currentYear + 1, 11, 31); // ✅ December 31st of this year

    return (
      <>
        {localInput?.at(index)?.memberNameBookedDob && (
          <Pressable style={styles.dateInput}>
            {localInput?.at(index)?.memberNameBookedDob ? (
              <Text style={styles.dateText}>
                {localInput?.at(index)?.memberNameBookedDob}
              </Text>
            ) : (
              <Text style={styles.dateText}>DD/MMM/YYYY</Text>
            )}
          </Pressable>
        )}
        <DatePicker
          modal
          mode="date"
          open={localInput?.at(index)?.isVisible}
          date={date}
          minimumDate={minDate} // ✅ Prevents past dates
          maximumDate={maxDate} // ✅ Only allows dates within this year
          onConfirm={(date: any) => {
            setLocalInput((prevState: TInputParams[]) => {
              return prevState.map((itm, idx) => {
                if (idx === index) {
                  return {
                    ...itm,
                    isVisible: false,
                    memberNameBookedDob:
                      date && moment(date).format('DD/MMM/YYYY'),
                  };
                }
                return itm;
              });
            });
          }}
          onCancel={() =>
            setLocalInput((prevState: TInputParams[]) => {
              return prevState.map((itm, idx) => {
                if (idx === index) {
                  return {
                    ...itm,
                    isVisible: false,
                  };
                }
                return itm;
              });
            })
          }
        />
      </>
    );
  };
  const renderPreferences = () => {
    return localInput?.map((_, index) => (
      <View key={index} style={[styles.PreferenceContainer]}>
        <View style={styles.topSection}>
          <Text style={styles.preferenceText}>Select Your Preference</Text>

          <DatePickerComponent index={index} />

          <View style={styles.dayDisplay}>
            <Text style={styles.dayDisplayText}>{`Day ${index + 1}`}</Text>
          </View>
        </View>
        <View style={styles.horizontalScreen} />
        <View style={styles.bottomSection}>
          <Pressable
            style={[
              styles.bottomLeft,
              {
                borderWidth: localInput?.at(index)?.isDobError ? 1 : 0,
                borderColor: localInput?.at(index)?.isDobError
                  ? COLOR.bgRed
                  : 'transparent',
                backgroundColor: localInput?.at(index)?.isDobError
                  ? COLOR.lightRed
                  : COLOR.white,
              },
            ]}
            onPress={() => {
              setLocalInput((prevState: TInputParams[]) => {
                return prevState.map((itm, idx) => {
                  if (idx === index) {
                    return {
                      ...itm,
                      isVisible: true,
                    };
                  }
                  return itm;
                });
              });
            }}>
            <CalenderIcon />
            <Text style={styles.calenderText}>Date</Text>
          </Pressable>
          <View style={[styles.bottomRight]}>
            <TextInput
              placeholder="Reason for Your Donation"
              placeholderTextColor={theme.black}
              value={localInput?.at(index)?.memberBookedDescription}
              onChangeText={text => {
                setLocalInput((prv: TInputParams[]) => {
                  return prv?.map((itm, idx) => {
                    if (idx === index) {
                      return {
                        ...itm,
                        memberBookedDescription: text,
                      };
                    }
                    return itm;
                  });
                });
              }}
              style={[
                styles.bottomRight,
                {
                  flex: 1,
                  paddingHorizontal: 8,
                  fontSize: 13,
                  color: theme.black,
                  fontWeight: 500,
                },
                {
                  borderWidth: localInput?.at(index)?.isDescriptionError
                    ? 1
                    : 0,
                  borderColor: localInput?.at(index)?.isDescriptionError
                    ? COLOR.bgRed
                    : 'transparent',
                  backgroundColor: localInput?.at(index)?.isDescriptionError
                    ? COLOR.lightRed
                    : 'transparent',
                },
              ]}
            />
          </View>
        </View>
        {/* <View style={styles.horizontalScreen} /> */}
        <View style={styles.bottomSection}>
          <View style={[styles.bottomRight1]}>
            <Text
              style={[
                styles.bottomRight,
                {
                  flex: 1,
                  paddingHorizontal: 20,
                  paddingVertical: 5,
                  fontSize: 15,
                  color: theme.white,
                  fontWeight: 500,
                  borderWidth: 0,
                  borderColor: 'transparent',
                  backgroundColor: 'transparent',
                },
              ]}>
              Name
            </Text>
          </View>
          <View style={[styles.bottomRight]}>
            <TextInput
              placeholder="Donor Name"
              placeholderTextColor={theme.black}
              value={localInput?.at(index)?.memberNameBooked}
              onChangeText={text => {
                setLocalInput((prv: TInputParams[]) => {
                  return prv?.map((itm, idx) => {
                    if (idx === index) {
                      return {
                        ...itm,
                        memberNameBooked: text,
                      };
                    }
                    return itm;
                  });
                });
              }}
              style={[
                styles.bottomRight,
                {
                  flex: 1,
                  paddingHorizontal: 8,
                  fontSize: 13,
                  color: theme.black,
                  fontWeight: 500,
                },
                {
                  borderWidth: localInput?.at(index)?.isNameError ? 1 : 0,
                  borderColor: localInput?.at(index)?.isNameError
                    ? COLOR.bgRed
                    : 'transparent',
                  backgroundColor: localInput?.at(index)?.isNameError
                    ? COLOR.lightRed
                    : 'transparent',
                },
              ]}
            />
          </View>
        </View>
      </View>
    ));
  };

  return (
    <>
      <View style={[style, styles.container]}>
        <Text style={styles.mainText}>Add Number of Days</Text>
        <View style={styles.addRemove}>
          <Pressable
            style={[
              {
                backgroundColor:
                  localInput?.length > 1
                    ? theme.white
                    : 'rgba(255, 255, 255, 0.2)',
              },
              styles.decrement,
            ]}
            onPress={handleDecrement}>
            <Text
              style={[
                {
                  color: localInput?.length > 1 ? theme.black : theme.white,
                },
                styles.dec,
              ]}>
              -
            </Text>
          </Pressable>
          <View style={styles.display}>
            <Text style={styles.displayText}>{localInput.length}</Text>
          </View>
          <Pressable
            style={styles.increment}
            onPress={() => handleIncrement(localInput.length)}>
            <Text style={styles.inc}>+</Text>
          </Pressable>
        </View>
      </View>
      {renderPreferences()}
    </>
  );
};

export default AddNumberOfDaysView;

const styles = StyleSheet.create({
  container: {
    height: 60,
    backgroundColor: COLOR.lavenderPurple,
    width: '93%',
  },
  decrement: {
    height: 40,
    width: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  increment: {
    height: 40,
    width: 40,
    backgroundColor: COLOR.white,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  addRemove: {
    flexDirection: 'row',
    columnGap: 10,
  },
  display: {
    height: 40,
    width: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  displayText: {
    textAlign: 'center',
    fontSize: 16,
    color: COLOR.white,
  },
  dec: {
    textAlign: 'center',
    fontSize: 30,
  },
  inc: {
    textAlign: 'center',
    fontSize: 17,
  },
  mainText: {
    fontSize: 14,
    color: COLOR.white,
    fontWeight: 600,
  },

  // Select Your Preference
  PreferenceContainer: {
    height: 170,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    width: '93%',
    marginTop: 18,
    borderRadius: 20,
  },
  horizontalScreen: {
    borderWidth: 0.9,
    borderColor: COLOR.softLavender,
  },
  topSection: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '90%',
    marginHorizontal: 'auto',
  },
  bottomSection: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '90%',
    marginHorizontal: 'auto',
  },
  dayDisplay: {
    height: 40,
    width: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  dayDisplayText: {
    color: COLOR.white,
  },
  preferenceText: {
    fontSize: 14,
    color: COLOR.white,
    fontWeight: 600,
  },
  bottomLeft: {
    height: 40,
    flex: 0.3,
    backgroundColor: COLOR.white,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    columnGap: 5,
  },
  bottomRight: {
    height: 40,
    flex: 0.6,
    backgroundColor: COLOR.white,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  bottomRight1: {
    height: 40,
    flex: 0.3,
    // backgroundColor: COLOR.bgBlue,
    // borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  bottomRightText: {
    fontSize: 13,
    color: COLOR.black,
    fontWeight: 600,
    textAlign: 'left',
    paddingHorizontal: 10,
  },
  calenderText: {
    fontSize: 13,
    color: COLOR.black,
    fontWeight: 600,
  },

  //date fields
  dateInput: {
    height: 40,
    fontSize: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  dateText: {
    fontSize: 12,
    color: COLOR.white,
  },
});

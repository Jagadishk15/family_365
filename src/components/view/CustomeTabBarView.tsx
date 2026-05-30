import {
  View,
  Platform,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {COLOR} from '../../utils/colors';
import {
  HomeInActiveIcon,
  ActivityTabActiveIcon,
  ActivityTabIcon,
  CalenderTabActiveIcon,
  CalenderTabIcon,
  ProfileTabActiveNewIcon,
  ProfileTabNewIcon,
} from '../../assets/svg';
import {
  HomeIcon
} from '../../assets/svg/HomeIcon';

const CustomTabBar = ({state, descriptors, navigation}: any) => {
  const {colors} = useTheme();
  const insets = useSafeAreaInsets();

  const MENU_DATA = [
    {
      icon: (focused: boolean) =>
        focused ? <HomeIcon /> : <HomeInActiveIcon />,
      onPress: () => {},
    },
    {
      icon: (focused: boolean) =>
        focused ? <CalenderTabActiveIcon /> : <CalenderTabIcon />,
      onPress: () => {},
    },
    {
      icon: (focused: boolean) =>
        focused ? <ActivityTabActiveIcon /> : <ActivityTabIcon />,
      onPress: () => {},
    },
    {
      icon: (focused: boolean) =>
        focused ? <ProfileTabActiveNewIcon /> : <ProfileTabNewIcon />,
      onPress: () => {},
    },
    // {
    //   icon: (focused: boolean) =>
    //     focused ? (
    //       <Image
    //         source={require('../../assets/images/profileActive.png')}
    //         style={{height: 40, width: 40}}
    //       />
    //     ) : (
    //       <Image
    //         source={require('../../assets/images/profileInactive.png')}
    //         style={{height: 40, width: 40}}
    //       />
    //     ),
    //   onPress: () => {},
    // },
  ];

  return (
    <View style={[styles.tabContainer, {paddingBottom: insets.bottom}]}>
      {state.routes.map((route: any, index: any) => {
        const {icon} = MENU_DATA[index] || {}; // Safe access
        const focused = state.index === index;
        const {options} = descriptors[route.key];

        return (
          <TouchableOpacity
            key={route.key}
            style={styles.tabInnerContainer}
            onPress={() => navigation.navigate(route.name)}
            accessible
            accessibilityLabel={options.tabBarLabel || route.name}
            accessibilityState={{selected: focused}}
          >
            {icon ? (
              icon(focused)
            ) : (
              <Text style={styles.missingIcon}>Icon Missing</Text>
            )}
            <Text numberOfLines={1} style={[styles.tabText, focused && styles.focusedTabText]}>
              {focused ? options.tabBarLabel : null}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default CustomTabBar;

const styles = StyleSheet.create({
  tabContainer: {
    height: 70,
    backgroundColor: COLOR.black,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: Platform.OS === 'ios' ? 10 : 8,
  },
  tabInnerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
    borderRadius: 10,
  },
  tabText: {
    color: COLOR.white,
    fontSize: 12,
    marginLeft: 8,
  },
  focusedTabText: {
    fontWeight: 'bold',
    color: COLOR.white, // Highlight color for focused tab
  },
  missingIcon: {
    color: 'red',
    fontSize: 10,
  },
});

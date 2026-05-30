// // import plugins
// import React from 'react';
// import {createStackNavigator} from '@react-navigation/stack';
// import BottomTabNavigator from './BottomTabNavigator';
// import GalleryScreen from '../screens/GalleryScreen';
// import SponserScreen from '../screens/SponserScreen';

// // import utils

// // interface
// export type MainNavigatorParamList = {
//   bottomTabNavigator: undefined;
//   galleryScreen: undefined;
//   sponserScreen: undefined;
// };

// // global values
// const Stack = createStackNavigator<MainNavigatorParamList>();

// // navigator
// const MainNavigator = () => {
//   return (
//     <Stack.Navigator
//       initialRouteName="bottomTabNavigator"
//       screenOptions={{headerShown: false}}>
//       <Stack.Screen
//         name="bottomTabNavigator"
//         component={BottomTabNavigator}
//       />
//       <Stack.Screen name="galleryScreen" component={GalleryScreen} />
//       <Stack.Screen name="sponserScreen" component={SponserScreen} />
//     </Stack.Navigator>
//   );
// };

// // export
// export default MainNavigator;

// import plugins
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import BottomTabNavigator from './BottomTabNavigator';
import GalleryScreen from '../screens/GalleryScreen';
import SponserScreen from '../screens/SponserScreen';
import NeedScreen from '../screens/NeedScreen';
import NotificationScreen from '../screens/NotificationScreen';
import ActivitiesScreen from '../screens/ActivityScreen';
import {TabBarVisibilityProvider} from '../context/TabBarVisibilityContext'; // Import Context
import OrphanageScreen from '../screens/OrphanageScreen';
import FAQScreen from '../screens/FAQScreen';
import RaiseIssueScreen from '../screens/RaiseIssueScreen';
import PersonalDetailsScreen from '../screens/PersonalDetailsScreen';

// interface
export type MainNavigatorParamList = {
  bottomTabNavigator: undefined;
  galleryScreen: undefined;
  sponserScreen: undefined;
  needScreen: undefined;
  activitiesScreen: undefined;
  notificationScreen: undefined;
  orphanageScreen: undefined;
  faqScreen: undefined;
  raiseIssueScreen: undefined;
  personalDetailsScreen: undefined;
};

// global values
const Stack = createStackNavigator<MainNavigatorParamList>();

// navigator
const MainNavigator = () => {
  return (
    <TabBarVisibilityProvider>
      <Stack.Navigator
        initialRouteName="bottomTabNavigator"
        screenOptions={{headerShown: false}}>
        <Stack.Screen
          name="bottomTabNavigator"
          component={BottomTabNavigator}
        />
        <Stack.Screen name="galleryScreen" component={GalleryScreen} />
        <Stack.Screen name="sponserScreen" component={SponserScreen} />
        <Stack.Screen
          name="notificationScreen"
          component={NotificationScreen}
        />
        <Stack.Screen name="faqScreen" component={FAQScreen} />
        <Stack.Screen name="needScreen" component={NeedScreen} />
        <Stack.Screen name="orphanageScreen" component={OrphanageScreen} />
        <Stack.Screen name="raiseIssueScreen" component={RaiseIssueScreen} />
        <Stack.Screen name="activitiesScreen" component={ActivitiesScreen} />
        <Stack.Screen
          name="personalDetailsScreen"
          component={PersonalDetailsScreen}
        />
      </Stack.Navigator>
    </TabBarVisibilityProvider>
  );
};

// export
export default MainNavigator;

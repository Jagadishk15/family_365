import React, {useEffect} from 'react';
import {LayoutChangeEvent, StyleSheet, View, Text} from 'react-native';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
  Pressable,
} from 'react-native-gesture-handler';
import {ForwordIcon} from '../../assets/svg';
import {useNavigation} from '@react-navigation/native';

const SLIDER_HEIGHT = 50;
const SLIDER_PADDING = 5;
const BUTTON_SIZE = SLIDER_HEIGHT - SLIDER_PADDING * 1.7;

export default function SliderButton({
  setModalVisible,
  clearTime,
  onSwipe,
}: {
  setModalVisible: any;
  clearTime: any;
  onSwipe: () => void;
}) {
  const offset = useSharedValue<number>(0);
  const width = useSharedValue<number>(0);
  const navigation = useNavigation<any>();
  const onLayout = (event: LayoutChangeEvent) => {
    width.value = event.nativeEvent.layout.width;
  };

  const style = useAnimatedStyle(() => ({
    transform: [{translateX: offset.value}],
  }));

  const OFFSET = 10;
  const TIME = 250;

  useEffect(() => {
    offset.value = withSequence(
      // start from -OFFSET
      withTiming(-OFFSET, {duration: TIME / 2}),
      // shake between -OFFSET and OFFSET 5 times
      withRepeat(withTiming(OFFSET, {duration: TIME}), 5, true),
      // go back to 0 at the end
      withTiming(0, {duration: TIME / 2}),
    );
  }, []);

  const pan = Gesture.Pan()
    .onUpdate(event => {
      'worklet';
      const newOffset = offset.value + event.translationX;
      // Restrict the button's movement to the bounds
      offset.value = Math.max(
        0,
        Math.min(newOffset, width.value - BUTTON_SIZE),
      );
    })
    .onEnd(() => {
      'worklet';
      // Check if the button has reached the end
      if (offset.value >= width.value - BUTTON_SIZE) {
        // runOnJS only accepts plain JS functions — passing a native host
        // function like clearTimeout here trips a JSI assertion and crashes
        // (SIGABRT). onSwipe already closes the modal, and `clearTime` was
        // always undefined, so there is no timer to clear.
        runOnJS(onSwipe)();
        offset.value = withTiming(0); // Reset the slider
      }
    });

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{translateX: offset.value}],
  }));

  return (
    <GestureHandlerRootView style={styles.container}>
      <Pressable style={styles.trackWrapper}>
        <View style={styles.track} onLayout={onLayout}>
          <Text style={styles.label}>Slide to Proceed</Text>
          <GestureDetector gesture={pan}>
            <Animated.View style={[styles.button, animatedStyles, style]}>
              <ForwordIcon />
            </Animated.View>
          </GestureDetector>
        </View>
      </Pressable>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginVertical: 18,
  },
  trackWrapper: {
    width: '90%',
    height: SLIDER_HEIGHT,
    justifyContent: 'center',
  },
  track: {
    width: '100%',
    height: SLIDER_HEIGHT,
    backgroundColor: 'white',
    borderRadius: SLIDER_HEIGHT / 2,
    padding: SLIDER_PADDING,
    justifyContent: 'center',
    overflow: 'hidden',
  },
  label: {
    position: 'absolute',
    alignSelf: 'center',
    fontSize: 16,
    color: 'black',
    fontWeight: '600',
  },
  button: {
    height: BUTTON_SIZE,
    width: BUTTON_SIZE,
    borderRadius: BUTTON_SIZE / 2,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Font from 'expo-font';

import MainScreen from './screens/MainScreen';
import MenuScreen from './screens/MenuScreen';
import MemoScreen from './screens/MemoScreen';
import PINScreen1 from './screens/PINScreens/PINScreen1';
import PINScreen2 from './screens/PINScreens/PINScreen2';
import PINScreen3 from './screens/PINScreens/PINScreen3';
import PINScreen4 from './screens/PINScreens/PINScreen4';

const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        backBehavior="history">
        <Stack.Screen name="MainScreen" component={MainScreen} />
        <Stack.Screen name="MenuScreen" component={MenuScreen} />
        <Stack.Screen name="MemoScreen" component={MemoScreen} />
        <Stack.Screen name="PINScreen1" component={PINScreen1} />
        <Stack.Screen name="PINScreen2" component={PINScreen2} />
        <Stack.Screen name="PINScreen3" component={PINScreen3} />
        <Stack.Screen name="PINScreen4" component={PINScreen4} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

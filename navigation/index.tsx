import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Pomo from '../screens/pomo';

export type RootStackParamList = {
  Pomo: undefined;
  Details: { name: string };
};

const Stack = createStackNavigator<RootStackParamList>();

export default function RootStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Pomo">
        <Stack.Screen name="Pomo" component={Pomo} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

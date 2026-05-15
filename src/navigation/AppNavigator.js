import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'

import HomeScreen from '../screens/HomeScreen'
import LearnScreen from '../screens/LearnScreen'
import DailyScreen from '../screens/DailyScreen'
import PremiumScreen from '../screens/PremiumScreen'

const Tab = createBottomTabNavigator()

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Learn" component={LearnScreen} />
        <Tab.Screen name="Daily" component={DailyScreen} />
        <Tab.Screen name="Premium" component={PremiumScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}
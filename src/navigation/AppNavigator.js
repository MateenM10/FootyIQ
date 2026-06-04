import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons'

import HomeScreen from '../screens/HomeScreen'
import LearnNavigator from './LearnNavigator'
import DailyScreen from '../screens/DailyScreen'
import PremiumScreen from '../screens/PremiumScreen'
import WatchNavigator from './WatchNavigator'
import colors from '../theme/colors'
import typography from '../theme/typography'

const Tab = createBottomTabNavigator()

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarStyle: {
            backgroundColor: colors.surface,
            borderTopColor: colors.border,
            borderTopWidth: 1,
            height: 85,
            paddingBottom: 28,
            paddingTop: 10,
          },
          tabBarActiveTintColor: colors.accent,
          tabBarInactiveTintColor: colors.muted,
          tabBarLabelStyle: {
            fontSize: typography.sizes.xs,
            fontWeight: typography.weights.medium,
          },
          tabBarHideOnKeyboard: true,
          lazy: true,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName

            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline'
            } else if (route.name === 'Learn') {
              iconName = focused ? 'book' : 'book-outline'
            } else if (route.name === 'Daily') {
              iconName = focused ? 'flash' : 'flash-outline'
            } else if (route.name === 'Watch') {
              iconName = focused ? 'tv' : 'tv-outline'
            } else if (route.name === 'Premium') {
              iconName = focused ? 'star' : 'star-outline'
            }

            return <Ionicons name={iconName} size={22} color={color} />
          },
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Learn" component={LearnNavigator} />
        <Tab.Screen name="Daily" component={DailyScreen} />
        <Tab.Screen name="Watch" component={WatchNavigator} />
        <Tab.Screen name="Premium" component={PremiumScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}
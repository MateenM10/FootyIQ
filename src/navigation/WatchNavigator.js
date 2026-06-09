import { createNativeStackNavigator } from '@react-navigation/native-stack'
import WatchScreen from '../screens/WatchScreen'
import FixtureGuideScreen from '../screens/FixtureGuideScreen'
import colors from '../theme/colors'
import typography from '../theme/typography'

const Stack = createNativeStackNavigator()

export default function WatchNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.black,
        },
        headerTintColor: colors.white,
        headerShadowVisible: false,
        headerBackTitleVisible: false,
        headerTitleStyle: {
          fontWeight: typography.weights.bold,
          fontSize: typography.sizes.md,
          color: colors.white,
        },
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen
        name="WatchList"
        component={WatchScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="FixtureGuide"
        component={FixtureGuideScreen}
        options={({ route }) => ({
          title: route.params.fixture.homeTeam + ' vs ' + route.params.fixture.awayTeam,
        })}
      />
    </Stack.Navigator>
  )
}
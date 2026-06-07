import { createNativeStackNavigator } from '@react-navigation/native-stack'
import WatchScreen from '../screens/WatchScreen'
import MatchGuideScreen from '../screens/MatchGuideScreen'
import FixtureGuideScreen from '../screens/FixtureGuideScreen'
import colors from '../theme/colors'

const Stack = createNativeStackNavigator()

export default function WatchNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.surface,
        },
        headerTintColor: colors.white,
        headerShadowVisible: false,
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen
        name="WatchList"
        component={WatchScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MatchGuide"
        component={MatchGuideScreen}
        options={({ route }) => ({
          title: route.params.match.homeTeam + ' vs ' + route.params.match.awayTeam,
        })}
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
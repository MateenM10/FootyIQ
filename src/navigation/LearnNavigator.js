import { createNativeStackNavigator } from '@react-navigation/native-stack'
import LearnScreen from '../screens/LearnScreen'
import LessonScreen from '../screens/LessonScreen'
import colors from '../theme/colors'

const Stack = createNativeStackNavigator()

export default function LearnNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.surface,
        },
        headerTintColor: colors.white,
        headerBackTitle: 'Back',
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen
        name="LearnList"
        component={LearnScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Lesson"
        component={LessonScreen}
        options={({ route }) => ({
          title: route.params.lesson.title,
        })}
      />
    </Stack.Navigator>
  )
}
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import LearnScreen from '../screens/LearnScreen'
import LessonScreen from '../screens/LessonScreen'
import LessonQuizScreen from '../screens/LessonQuizScreen'
import colors from '../theme/colors'
import typography from '../theme/typography'

const Stack = createNativeStackNavigator()

export default function LearnNavigator() {
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
      <Stack.Screen
        name="LessonQuiz"
        component={LessonQuizScreen}
        options={{
          title: 'Quick Quiz',
          headerBackVisible: false,
          animation: 'slide_from_bottom',
        }}
      />
    </Stack.Navigator>
  )
}
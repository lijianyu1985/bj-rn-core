import React from 'react'
import {
  PersonalContainer,
  TodoContainer,
  TodoEditContainer,
} from '@/Containers'
import { createStackNavigator } from '@react-navigation/stack'

const Stack = createStackNavigator()

// @refresh reset
const PersonalNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ headerShown: false }}
        name="PersonalMain"
        component={PersonalContainer}
      />
      <Stack.Screen name="Todo" component={TodoContainer} />
      <Stack.Screen name="TodoEdit" component={TodoEditContainer} />
    </Stack.Navigator>
  )
}

export default PersonalNavigator

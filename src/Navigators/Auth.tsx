import React from 'react'
import LoginContainer from '@/Containers/LoginContainer'
import { createStackNavigator } from '@react-navigation/stack'

const Stack = createStackNavigator()

// @refresh reset
const AuthNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginContainer} />
    </Stack.Navigator>
  )
}

export default AuthNavigator

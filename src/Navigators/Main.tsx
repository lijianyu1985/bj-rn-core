import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { ErrorContainer, HomeContainer } from '@/Containers'
import AntDesignIcons from 'react-native-vector-icons/AntDesign'
import { checkPermission } from './utils'
import { createStackNavigator } from '@react-navigation/stack'
import PersonalNavigator from './PersonalNavigator'

const Stack = createStackNavigator()

const Tab = createBottomTabNavigator()

const ErrorScreen = (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Error" component={ErrorContainer} />
  </Stack.Navigator>
)

export const screens = [
  {
    name: 'Home',
    label: 'Home',
    icon: 'home',
    component: HomeContainer,
  },
  {
    name: 'Personal',
    label: 'Personal',
    icon: 'user',
    component: PersonalNavigator,
  },
]

// @refresh reset
const MainNavigator = () => {
  const mainScreens = checkPermission(screens)
  if (mainScreens && mainScreens.length) {
    return (
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        {mainScreens.map(x => (
          <Tab.Screen
            key={x.name}
            name={x.name}
            options={{
              tabBarLabel: x.label,
              tabBarIcon: ({ color, size }) => (
                <AntDesignIcons name={x.icon} color={color} size={size} />
              ),
            }}
            component={x.component}
          />
        ))}
      </Tab.Navigator>
    )
  }
  return ErrorScreen
}

export default MainNavigator

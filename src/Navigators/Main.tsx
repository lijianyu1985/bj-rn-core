import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { HomeContainer } from '@/Containers'
import PersonalContainer from '@/Containers/PersonalContainer'
import AntDesignIcons from 'react-native-vector-icons/AntDesign'
import TodoContainer from '@/Containers/TodoContainer'

const Tab = createBottomTabNavigator()

// @refresh reset
const MainNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="Home"
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <AntDesignIcons name="home" color={color} size={size} />
          ),
        }}
        component={HomeContainer}
      />
      <Tab.Screen
        name="Personal"
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <AntDesignIcons name="user" color={color} size={size} />
          ),
        }}
        component={PersonalContainer}
      />
      {/* <Tab.Screen
        name="Todo"
        options={{
          tabBarLabel: 'Todo',
          tabBarIcon: ({ color, size }) => (
            <AntDesignIcons name="user" color={color} size={size} />
          ),
        }}
        component={TodoContainer}
      /> */}
    </Tab.Navigator>
  )
}

export default MainNavigator

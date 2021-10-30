import React from 'react'
import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import { useDispatch } from 'react-redux'
import { Brand } from '@/Components'
import { useTheme } from '@/Hooks'
import { clearAuth } from '@/Store/Auth'
import { navigateAndSimpleReset } from '@/Navigators/utils'

const PersonalContainer = () => {
  const { Common, Fonts, Gutters, Layout } = useTheme()

  const dispatch = useDispatch()

  const onLogout = () => {
    dispatch(clearAuth())
    navigateAndSimpleReset('Auth')
  }

  return (
    <ScrollView
      style={Layout.fill}
      contentContainerStyle={[Layout.colCenter, Gutters.smallHPadding]}
    >
      <View style={[[Layout.colCenter, Gutters.smallHPadding]]}>
        <Brand />

        <TouchableOpacity
          style={[Common.button.outline, Gutters.regularBMargin]}
          onPress={() => onLogout()}
        >
          <Text style={Fonts.textRegular}>Logout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

export default PersonalContainer

import React from 'react'
import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import { useDispatch } from 'react-redux'
import { Brand } from '@/Components'
import { useTheme } from '@/Hooks'
import { clearAuth } from '@/Store/Auth'
import { navigateAndSimpleReset } from '@/Navigators/utils'
import { Button } from 'react-native-elements'

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
        <View
          style={[
            Layout.row,
            Layout.rowHCenter,
            Gutters.smallHPadding,
            Gutters.largeVMargin,
          ]}
        >
          <Button
            containerStyle={[Layout.fill]}
            buttonStyle={[Layout.fill]}
            title="Logout"
            onPress={() => onLogout()}
          />
        </View>
      </View>
    </ScrollView>
  )
}

export default PersonalContainer

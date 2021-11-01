import React from 'react'
import { Text, ScrollView, View } from 'react-native'
import { useTheme } from '@/Hooks'
import { useDispatch } from 'react-redux'
import { clearAuth } from '@/Store/Auth'
import { navigateAndSimpleReset } from '@/Navigators/utils'
import { Button } from 'react-native-ui-lib'

const Container = () => {
  const { Fonts, Gutters, Layout } = useTheme()

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
        <Text style={Fonts.textRegular}>You meet Error</Text>
      </View>
      <View style={[[Layout.colCenter, Gutters.smallHPadding]]}>
        <Text style={Fonts.textRegular}>Please contact administrator:</Text>
        <Text style={Fonts.textRegular}>15652001167</Text>
        <View
          style={[
            Layout.row,
            Layout.rowHCenter,
            Gutters.smallHPadding,
            Gutters.largeVMargin,
          ]}
        >
          <Button
            style={[Layout.fill]}
            label="Logout"
            onPress={() => onLogout()}
          />
        </View>
      </View>
    </ScrollView>
  )
}

export default Container

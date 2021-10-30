import React, { useState, useEffect } from 'react'
import {
  View,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native'
import { Brand } from '@/Components'
import { useTheme } from '@/Hooks'
import { useLazyLoginQuery } from '@/Services/modules/auth'
import { useDispatch } from 'react-redux'
import { setAuth } from '@/Store/Auth'
import { navigateAndSimpleReset } from '@/Navigators/utils'

const Container = () => {
  const { Common, Gutters, Fonts, Layout } = useTheme()
  const [username, setUsername] = useState('admin')
  const [password, setPassword] = useState('Li@12345678')

  const [login, { data, isLoading }] = useLazyLoginQuery()

  const dispatch = useDispatch()

  const onLogin = () => {
    login({ username, password })
  }

  useEffect(() => {
    if (data && data.accessToken) {
      dispatch(setAuth({ accessToken: data.accessToken }))
      navigateAndSimpleReset('Main')
    }
  }, [data, dispatch])

  return (
    <ScrollView
      style={Layout.fill}
      contentContainerStyle={[Layout.colCenter, Gutters.smallHPadding]}
    >
      <View style={[[Layout.colCenter, Gutters.smallHPadding]]}>
        <Brand />
        <Text style={Fonts.textRegular}>Login</Text>
        <View
          style={[
            Layout.row,
            Layout.rowHCenter,
            Gutters.smallHPadding,
            Gutters.largeVMargin,
            Common.backgroundPrimary,
          ]}
        >
          <TextInput
            onChangeText={setUsername}
            editable={!isLoading}
            value={username}
            selectTextOnFocus
            style={[Layout.fill, Common.textInput]}
          />
        </View>
        <View
          style={[
            Layout.row,
            Layout.rowHCenter,
            Gutters.smallHPadding,
            Gutters.largeVMargin,
            Common.backgroundPrimary,
          ]}
        >
          <TextInput
            onChangeText={setPassword}
            editable={!isLoading}
            value={password}
            selectTextOnFocus
            style={[Layout.fill, Common.textInput]}
          />
        </View>

        <TouchableOpacity
          style={[Common.button.outline, Gutters.regularBMargin]}
          onPress={() => onLogin()}
        >
          <Text style={Fonts.textRegular}>Login</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

export default Container

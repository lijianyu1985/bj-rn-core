import React, { useState, useEffect } from 'react'
import { View, ScrollView, Text } from 'react-native'
import { useTheme } from '@/Hooks'
import { useLoginMutation } from '@/Services/modules/auth'
import { useDispatch } from 'react-redux'
import { setAuth } from '@/Store/Auth'
import { navigateAndSimpleReset } from '@/Navigators/utils'
import Icon from 'react-native-vector-icons/AntDesign'
import { Input } from 'react-native-elements'
import { Button } from 'react-native-elements'

const Container = () => {
  const { Common, Gutters, Fonts, Layout } = useTheme()
  const [username, setUsername] = useState('admin')
  const [password, setPassword] = useState('Li@12345678')

  const [login, { data, isLoading }] = useLoginMutation()

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
      <View
        style={[
          [Layout.colCenter, Gutters.smallHPadding, { marginTop: '20%' }],
        ]}
      >
        <View
          style={[
            Layout.row,
            Layout.rowHCenter,
            Gutters.smallHPadding,
            Gutters.largeVMargin,
          ]}
        >
          <Input
            placeholder="Username"
            autoCompleteType={undefined}
            onChangeText={setUsername}
            editable={!isLoading}
            value={username}
            selectTextOnFocus
            style={[Layout.fill]}
            leftIcon={<Icon name="user" size={24} color="black" />}
          />
        </View>

        <View
          style={[
            Layout.row,
            Layout.rowHCenter,
            Gutters.smallHPadding,
            Gutters.largeVMargin,
          ]}
        >
          <Input
            placeholder="Password"
            secureTextEntry={true}
            autoCompleteType={undefined}
            onChangeText={setPassword}
            editable={!isLoading}
            value={password}
            selectTextOnFocus
            style={[Layout.fill]}
            leftIcon={<Icon name="lock" size={24} color="black" />}
          />
        </View>

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
            title="Login"
            onPress={() => onLogin()}
          />
        </View>
      </View>
    </ScrollView>
  )
}

export default Container

import React, { useState, useEffect } from 'react'
import { View, ScrollView } from 'react-native'
import { useTheme } from '@/Hooks'
import { useLoginMutation } from '@/Services/modules/auth'
import { useDispatch } from 'react-redux'
import { setAuth } from '@/Store/Auth'
import { navigateAndSimpleReset } from '@/Navigators/utils'
import Icon from 'react-native-vector-icons/AntDesign'
import { Button, TextField } from 'react-native-ui-lib'
import { Brand } from '@/Components'

const Container = () => {
  const { Gutters, Layout } = useTheme()
  const [username, setUsername] = useState('admin')
  const [password, setPassword] = useState('Li@12345678')

  const [login, { data, isLoading }] = useLoginMutation()

  const dispatch = useDispatch()

  const onLogin = () => {
    login({ username, password })
  }

  useEffect(() => {
    if (data && data.accessToken) {
      dispatch(
        setAuth({
          accessToken: data.accessToken,
          currentAuthority: data.currentAuthority,
        }),
      )
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
        <View
          style={[
            Layout.row,
            Layout.rowHCenter,
            Gutters.smallHPadding,
            Gutters.largeVMargin,
          ]}
        >
          <TextField
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
          <TextField
            placeholder="Password"
            secureTextEntry={true}
            autoCompleteType={undefined}
            onChangeText={setPassword}
            editable={!isLoading}
            value={password}
            selectTextOnFocus
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
            style={[Layout.fill]}
            label="Login"
            onPress={() => onLogin()}
          />
        </View>
      </View>
    </ScrollView>
  )
}

export default Container

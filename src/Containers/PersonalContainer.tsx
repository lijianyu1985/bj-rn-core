import React, { useEffect, useState } from 'react'
import { View, TouchableOpacity, ScrollView } from 'react-native'
import { useDispatch } from 'react-redux'
import { useTheme } from '@/Hooks'
import { clearAuth } from '@/Store/Auth'
import { navigate, navigateAndSimpleReset } from '@/Navigators/utils'
import { Avatar, ListItem } from 'react-native-elements'
import Icon from 'react-native-vector-icons/AntDesign'
import { launchImageLibrary } from 'react-native-image-picker'
import { useUploadMutation } from '@/Services/modules/file'
import { Config } from '@/Config'
import {
  useLazyGetQuery,
  useUpdateAvatarUrlMutation,
} from '@/Services/modules/profile'

const PersonalContainer = () => {
  const { Gutters, Layout, Colors } = useTheme()

  const [avatarUri, setAvatarUri] = useState('')
  const dispatch = useDispatch()

  const onLogout = () => {
    dispatch(clearAuth())
    navigateAndSimpleReset('Auth')
  }

  const onAvatar = () => {
    launchImageLibrary({} as any, res => {
      if (res && res.assets && res.assets.length) {
        const file = res.assets[0]
        const formData = new FormData()
        formData.append('file', {
          uri: file.uri,
          name: file.fileName,
          type: file.type,
        })
        upload(formData)
      }
    })
  }

  const [upload, { data }] = useUploadMutation()

  const [updateAvatarUrl, { data: updatedProfile }] =
    useUpdateAvatarUrlMutation()

  useEffect(() => {
    if (data) {
      const url = `${Config.API_URL}file/download?filename=${encodeURIComponent(
        data?.filename,
      )}`
      updateAvatarUrl({ avatarUrl: url })
    }
  }, [data, updateAvatarUrl])

  useEffect(() => {
    if (updatedProfile) {
      setAvatarUri(updatedProfile.avatarUrl)
    }
  }, [updatedProfile])

  const [profile, setProfile] = useState({})
  const [get, { data: profileData }] = useLazyGetQuery()

  useEffect(() => {
    get()
  }, [get])

  useEffect(() => {
    if (profileData) {
      setProfile(profileData)
      setAvatarUri(profileData.avatarUrl)
    }
  }, [profileData])

  return (
    <ScrollView style={Layout.fill} contentContainerStyle={[Layout.colCenter]}>
      <View style={[[Layout.colCenter, Gutters.smallHPadding]]}>
        <Avatar
          size="large"
          rounded
          source={
            avatarUri
              ? {
                  uri: avatarUri,
                }
              : undefined
          }
          title="HW"
          containerStyle={{ marginTop: 30, backgroundColor: 'lightgray' }}
          onPress={onAvatar}
        >
          <Avatar.Accessory
            onPress={onAvatar}
            iconProps={{
              name: 'edit',
              selectionColor: 'red',
            }}
            size={20}
          />
        </Avatar>
      </View>
      <View style={[{ marginTop: 30 }]}>
        <ListItem
          containerStyle={[
            Layout.fullWidth,
            { backgroundColor: Colors.transparent },
          ]}
          style={[Layout.fullWidth]}
          topDivider
          bottomDivider
          onPress={() => {
            navigate('Todo')
          }}
          Component={TouchableOpacity}
          hasTVPreferredFocus={undefined}
          tvParallaxProperties={undefined}
        >
          <Icon name="checkcircleo" />
          <ListItem.Content>
            <ListItem.Title>Todo</ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>

        <ListItem
          containerStyle={[
            Layout.fullWidth,
            { backgroundColor: Colors.transparent },
          ]}
          style={[Layout.fullWidth]}
          bottomDivider
          onPress={onLogout}
          Component={TouchableOpacity}
          hasTVPreferredFocus={undefined}
          tvParallaxProperties={undefined}
        >
          <Icon name="logout" />
          <ListItem.Content>
            <ListItem.Title>Logout</ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>
      </View>
    </ScrollView>
  )
}

export default PersonalContainer

import React, { useEffect } from 'react'
import { ActivityIndicator, View, Text } from 'react-native'
import { useTranslation } from 'react-i18next'
import { useTheme } from '@/Hooks'
import { Brand } from '@/Components'
import { navigateAndSimpleReset } from '@/Navigators/utils'
import { useLazyVerifyTokenQuery } from '@/Services/modules/auth'
import { clearAuth } from '@/Store/Auth'
import { store } from '@/Store'
import { useDispatch } from 'react-redux'

const StartupContainer = () => {
  const { Layout, Gutters, Fonts } = useTheme()

  const { t } = useTranslation()

  const [verifyToken, { data, error }] = useLazyVerifyTokenQuery()

  const dispatch = useDispatch()

  useEffect(() => {
    const auth = store.getState().auth
    if (auth && auth.accessToken) {
      verifyToken()
    } else {
      setTimeout(() => {
        navigateAndSimpleReset('Auth')
      }, 100)
    }
  }, [verifyToken])

  // const init = async () => {
  //   // await new Promise(resolve =>
  //   //   setTimeout(() => {
  //   //     resolve(true)
  //   //   }, 2000),
  //   // )
  //   // await setDefaultTheme({ theme: 'default', darkMode: null })
  //   //验证已经登陆而且token有效则跳转Main，否则跳转Auth
  //   navigateAndSimpleReset('Main')
  // }
  useEffect(() => {
    if (data === true) {
      navigateAndSimpleReset('Main')
    }
    if (data === false) {
      // logout and redirect to login
      dispatch(clearAuth())
      navigateAndSimpleReset('Auth')
    }
  }, [data, dispatch])
  useEffect(() => {
    if (error) {
      //TODO: go to a error page
      dispatch(clearAuth())
      navigateAndSimpleReset('Auth')
    }
  }, [error, dispatch])

  return (
    <View style={[Layout.fill, Layout.colCenter]}>
      <Brand />
      <ActivityIndicator size={'large'} style={[Gutters.largeVMargin]} />
      <Text style={Fonts.textCenter}>{t('welcome')}</Text>
    </View>
  )
}

export default StartupContainer

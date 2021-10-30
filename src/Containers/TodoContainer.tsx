import React, { useState, useEffect } from 'react'
import { View, ActivityIndicator, Text, ScrollView } from 'react-native'
import { useTranslation } from 'react-i18next'
import { Brand } from '@/Components'
import { useTheme } from '@/Hooks'
import { useLazyFindQuery } from '@/Services/modules/todos'

const PersonalContainer = () => {
  const { t } = useTranslation()
  const { Fonts, Gutters, Layout } = useTheme()

  const [find, { data, isSuccess, isLoading, isFetching, error }] =
    useLazyFindQuery()

  useEffect(() => {
    find()
  }, [find])

  return (
    <ScrollView
      style={Layout.fill}
      contentContainerStyle={[Layout.colCenter, Gutters.smallHPadding]}
    >
      <View style={[[Layout.colCenter, Gutters.smallHPadding]]}>
        <Brand />
        {(isLoading || isFetching) && <ActivityIndicator />}
        {!isSuccess ? (
          <Text style={Fonts.textRegular}>{JSON.stringify(error)}</Text>
        ) : (
          <Text style={Fonts.textRegular}>
            {t('example.helloUser', { name: 'data?.name' })}
          </Text>
        )}
        {(data || []).map((x: any) => (
          <Text key={x._id} style={Fonts.textRegular}>
            {x.name}
          </Text>
        ))}
      </View>
    </ScrollView>
  )
}

export default PersonalContainer

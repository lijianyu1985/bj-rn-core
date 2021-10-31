import React from 'react'
import { Text, ScrollView, View } from 'react-native'
import { useTheme } from '@/Hooks'
import { Brand } from '@/Components'

const Container = () => {
  const { Fonts, Gutters, Layout } = useTheme()

  return (
    <ScrollView
      style={Layout.fill}
      contentContainerStyle={[Layout.colCenter, Gutters.smallHPadding]}
    >
      <View style={[[Layout.colCenter, Gutters.smallHPadding]]}>
        <Brand />
        <Text style={Fonts.textRegular}>Hello World</Text>
      </View>
    </ScrollView>
  )
}

export default Container

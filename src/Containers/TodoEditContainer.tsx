import React, { useState, useEffect } from 'react'
import { View, ScrollView } from 'react-native'
import { useTheme } from '@/Hooks'
import { useUpdateMutation, useCreateMutation } from '@/Services/modules/todo'
import { goBack } from '@/Navigators/utils'
import { Button, TextField } from 'react-native-ui-lib'

const TodoEditContainer = ({ route: { params } }) => {
  const { Gutters, Layout } = useTheme()
  const [update, { data: updateData }] = useUpdateMutation()
  const [create, { data: createData }] = useCreateMutation()
  const [name, setName] = useState(params && params.name)

  const onSave = () => {
    if (params && params.id) {
      update({ id: params && params.id, name })
    } else {
      create({ name })
    }
  }

  useEffect(() => {
    if (updateData || createData) {
      goBack({ needRefresh: true })
    }
  }, [updateData, createData])

  return (
    <ScrollView
      style={Layout.fill}
      contentContainerStyle={[Layout.colCenter, Gutters.smallHPadding]}
    >
      <View style={[[Layout.colCenter, Gutters.smallHPadding]]}>
        <View style={[Layout.row, Layout.rowHCenter, Gutters.largeVMargin]}>
          <TextField
            placeholder="Name"
            autoCompleteType={undefined}
            onChangeText={setName}
            value={name}
            selectTextOnFocus
            style={[Layout.fill]}
          />
        </View>
        <View style={[Layout.row, Layout.rowHCenter]}>
          <Button style={[Layout.fill]} label="Save" onPress={() => onSave()} />
        </View>
      </View>
    </ScrollView>
  )
}

export default TodoEditContainer

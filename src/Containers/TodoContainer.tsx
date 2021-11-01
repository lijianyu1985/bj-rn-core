import React, { useEffect } from 'react'
import {
  View,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
} from 'react-native'
import { useTheme } from '@/Hooks'
import { useLazyFindQuery } from '@/Services/modules/todo'
import { navigate } from '@/Navigators/utils'
import { Button, ListItem } from 'react-native-ui-lib'
import Icon from 'react-native-vector-icons/AntDesign'

const TodoContainer = ({ route: { params } }) => {
  const { Colors, Gutters, Layout } = useTheme()
  const [find, { data, isLoading, isFetching, isSuccess }] = useLazyFindQuery()

  useEffect(() => {
    find()
  }, [find])

  useEffect(() => {
    if (params && params.needRefresh) {
      find()
    }
  }, [find, params])

  return (
    <ScrollView
      style={Layout.fill}
      contentContainerStyle={[Layout.colCenter, Gutters.smallHPadding]}
    >
      <View style={[[Layout.colCenter, Gutters.smallHPadding]]}>
        <View style={[Layout.row, Layout.rowHCenter]}>
          <Button
            style={[Layout.fill]}
            label="Create"
            onPress={() => navigate('TodoEdit')}
          />
        </View>
        {(isLoading || isFetching) && <ActivityIndicator />}
        {/* {isSuccess &&
          (data || []).map(item => (
            <ListItem
              key={item.id}
              containerStyle={[
                Layout.fullWidth,
                { backgroundColor: Colors.transparent },
              ]}
              style={[Layout.fullWidth]}
              topDivider
              bottomDivider
              Component={TouchableOpacity}
              onPress={() => {
                navigate('TodoEdit', item)
              }}
              hasTVPreferredFocus={undefined}
              tvParallaxProperties={undefined}
            >
              <Icon name="checkcircleo" />
              <ListItem.Content>
                <ListItem.Title>{item.name}</ListItem.Title>
              </ListItem.Content>
              <ListItem.Chevron />
            </ListItem>
          ))} */}
      </View>
    </ScrollView>
  )
}

export default TodoContainer

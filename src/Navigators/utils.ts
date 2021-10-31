/**
 * Used to navigating without the navigation prop
 * @see https://reactnavigation.org/docs/navigating-without-navigation-prop/
 *
 * You can add other navigation functions that you need and export them
 */
import {
  CommonActions,
  createNavigationContainerRef,
} from '@react-navigation/native'
import { store } from '@/Store'
import { ComponentType } from 'react'

type RootStackParamList = {
  Startup: undefined
  Home: undefined
  Personal: undefined
  PersonalMain: undefined
  Todo: undefined
  TodoEdit: undefined
}

export const navigationRef = createNavigationContainerRef<RootStackParamList>()

export function navigate(name: keyof RootStackParamList, params?: any) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params)
  }
}

export function goBack(params?: any) {
  if (navigationRef.isReady()) {
    navigationRef.goBack()
    navigationRef.current?.setParams(params)
  }
}

export function navigateAndReset(routes = [], index = 0) {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(
      CommonActions.reset({
        index,
        routes,
      }),
    )
  }
}

export function navigateAndSimpleReset(name: string, index = 0) {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(
      CommonActions.reset({
        index,
        routes: [{ name }],
      }),
    )
  }
}

export function checkPermission(screens: ScreenConfigModel[]) {
  const auth = store.getState().auth
  return screens.filter(
    x =>
      auth.currentAuthority &&
      (auth.currentAuthority?.includes('*') ||
        auth.currentAuthority?.includes(x.name)),
  )
}

export type ScreenConfigModel = {
  name: string
  label: string
  icon: string
  component: ComponentType<any> | undefined
  authority?: boolean
}

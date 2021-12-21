/* eslint-disable no-nested-ternary */
import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import Iap from '../components/Iap'
import ROUTES from '../constants/navigation'
import {
  AddSubstractEx,
  CountingEx,
  LevelScreen,
  MainScreen,
  CreativeEx,
  FindRandEx,
  FinishScreen
} from '../screens'

const { Navigator, Screen } = createStackNavigator()

const Navigation = () => {
  return (
    <Navigator initialRouteName={ROUTES.mainScreen}>
      <Screen
        name={ROUTES.mainScreen}
        component={MainScreen}
        options={{ headerShown: false }}
      />
      <Screen
        name={ROUTES.levelScreen}
        component={LevelScreen}
        options={{ headerShown: false }}
      />
      <Screen
        name={ROUTES.countingEx}
        component={CountingEx}
        options={{ headerShown: false }}
      />
      <Screen
        name={ROUTES.addSubstractEx}
        component={AddSubstractEx}
        options={{ headerShown: false }}
      />
      <Screen
        name={ROUTES.creativeEx}
        component={CreativeEx}
        options={{ headerShown: false }}
      />
      <Screen
        name={ROUTES.findRandEx}
        component={FindRandEx}
        options={{ headerShown: false }}
      />
      <Screen
        name={ROUTES.finishScreen}
        component={FinishScreen}
        options={{ headerShown: false }}
      />
      <Screen
        name={ROUTES.Iap}
        component={Iap}
        options={{ headerShown: false }}
      />
    </Navigator>
  )
}

export default Navigation

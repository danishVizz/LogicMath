import NetInfo from '@react-native-community/netinfo'
import React, { useEffect, useState } from 'react'
import {
  Alert,
  BackHandler,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native'
import { getAvailablePurchases, requestPurchase } from 'react-native-iap'
import { endIap, getItems, rnIapInit } from '../constants/data'
import ROUTES from '../constants/navigation'

const smiley = require('../../assets/smile.png')
const finishBg = require('../../assets/congartsGIF.gif')

const FinishScreen = ({ navigation, route }) => {
  const cNumber = route.params.level
  const [shouldShow, setShouldShow] = useState()
  const [isConnecAvail, setConnectionAvail] = useState()
  useEffect(() => {
    checkinternetconnection()
    ShowIap()
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick)
    return () => {
      endIap()
      BackHandler.removeEventListener(
        'hardwareBackPress',
        handleBackButtonClick
      )
    }
  }, [])
  const { id } = route.params

  const checkinternetconnection = () => {
    NetInfo.fetch().then(state => {
      const connection = state.isConnected
      setConnectionAvail(connection)
    })
  }
  const handleBackButtonClick = () => {
    goBackToPrev()
    return true
  }
  const NavigateTo = async () => {
    checkinternetconnection()
    if (isConnecAvail) {
      // await initConnection()
      //   .then(async connection => {
      //     const item = await getItems()
      //     if (item.length > 0) requestPurchase(item[0].productId)
      //     console.log('IAP result', connection)
      //   })
      //   .catch(error => {
      //     console.warn(`IAP ERROR ${error.code}`, error.message)
      //   })
      const item = await getItems()
      if (item.length > 0) requestPurchase(item[0].productId)
    } else {
      Alert.alert('Warning', 'Please check your internet connection')
    }
  }
  const ShowIap = async () => {
    await rnIapInit()
    const purchases = await getAvailablePurchases()
    if (purchases.length === 0) {
      setShouldShow(true)
    } else {
      setShouldShow(false)
    }
  }
  const getText = () => {
    switch (id) {
      case '1':
        return 'You completed all preparation for a good start with Numbers!'
      case '2':
        return `You completed Number ${cNumber}`
      case '3':
        return `You completed Number ${cNumber}`
      case '4':
        if (cNumber === 9) {
          return `You completed all preparation for a good start with Math!`
        }
        return `You completed Number ${cNumber}`

      default:
        return ''
    }
  }
  const playNext = () => {
    if (cNumber === 9) {
      navigation.replace(ROUTES.mainScreen)
      return
    }
    if (shouldShow === false) {
      switch (id) {
        case '1':
          navigation.replace(ROUTES.mainScreen)
          break
        case '2':
          navigation.replace(ROUTES.addSubstractEx, { level: cNumber + 1, id })
          break
        case '3':
          navigation.replace(ROUTES.creativeEx, { level: cNumber + 1, id })
          break
        case '4':
          navigation.replace(ROUTES.findRandEx, { level: cNumber + 1, id })
          break
        default:
          break
      }
    } else {
      navigation.replace(ROUTES.mainScreen)
    }
  }
  const goBackToPrev = () => {
    switch (id) {
      case '1':
        navigation.replace(ROUTES.mainScreen)
        break
      case '2':
        navigation.replace(ROUTES.addSubstractEx, { level: cNumber, id })
        break
      case '3':
        navigation.replace(ROUTES.creativeEx, { level: cNumber, id })
        break
      case '4':
        navigation.replace(ROUTES.findRandEx, { level: cNumber, id })
        break
      default:
        break
    }
  }
  return (
    <>
      <Image
        source={finishBg}
        style={{
          width: '100%',
          height: '100%',
          opacity: 0.7,
          backgroundColor: 'black',
          position: 'absolute'
        }}
      />
      <ScrollView>
        <View
          style={{
            flex: 1,
            marginTop: 60,
            zIndex: 1,
            justifyContent: 'center'
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
            <Image
              source={smiley}
              style={{ margin: 10, height: 100, width: 100 }}
            />
          </View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 10
            }}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                marginTop: 15,
                color: 'red'
              }}>
              Congratulations!
            </Text>
            <Text
              style={{
                fontSize: 20,
                marginTop: 15,
                paddingHorizontal: 20,
                color: '#FFF',
                textAlign: 'center'
              }}>
              {getText()}
            </Text>
            <Text style={{ fontSize: 20, marginTop: 30, color: '#FFF' }}>
              Like it?
            </Text>
            <View>
              {shouldShow ? (
                <View>
                  <Text
                    style={{
                      fontSize: 20,
                      marginTop: 30,
                      color: '#FFF',
                      textAlign: 'center'
                    }}>
                    {id === '4' && cNumber === 9
                      ? 'Want to Play Again?'
                      : 'Want to Continue'}
                  </Text>
                  <Pressable style={styles.button} onPress={() => NavigateTo()}>
                    <Text style={styles.text}>Purchase Now</Text>
                  </Pressable>
                  <Text style={{ fontSize: 20, marginTop: 30, color: '#FFF' }}>
                    Continue without Purchase
                  </Text>
                </View>
              ) : null}
            </View>
            <Pressable style={styles.button2} onPress={() => playNext()}>
              <Text style={styles.text}>
                {cNumber === 9 ? 'Finish' : 'Next'}
              </Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </>
  )
}
export default FinishScreen

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    elevation: 3,
    backgroundColor: '#FF6700',
    marginTop: 20
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: '#FFF'
  },
  button2: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    elevation: 3,
    backgroundColor: '#FF6700',
    marginTop: 20
  }
})

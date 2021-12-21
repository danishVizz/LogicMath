import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
  ImageBackground,
  BackHandler,
  TouchableOpacity,
  Image
} from 'react-native'
import NumClick from '../../components/NumClick'
import ROUTES from '../../constants/navigation'

const practiceBg = require('../../../assets/bgforkids2.jpg')
const Backward = require('../../../assets/backward.png')
const Close = require('../../../assets/closeapp.png')

const FindRandEx = ({ navigation, route }) => {
  const correctans = route.params.level
  const [arr, setArr] = useState([])
  const { level } = route.params
  const { id } = route.params
  const cNumber = route.params.level
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick)
    NavigateToLevel(level)
    return () => {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        handleBackButtonClick
      )
    }
  }, [])

  const NavigateToLevel = ans => {
    const NumTab = []
    for (let i = 0; i < 18; i += 1) {
      const loopEnd = Math.floor(Math.random() * ans)
      NumTab.push({ val: loopEnd, key: i, correct: '' })
    }
    for (let i = 0; i < 7; i += 1) {
      NumTab.push({ val: ans, key: i, correct: '' })
    }
    const random = NumTab.map(value => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value)
    setArr(random)
  }

  const btnClick = (number, i) => {
    const updatedArr = arr.map((item, ind) => {
      const newItem = item
      if (i === ind) {
        if (number === correctans) {
          newItem.correct = 'yes'
        } else {
          newItem.correct = 'no'
        }
      }
      return newItem
    })
    const count = updatedArr.filter(e => e.correct === 'yes').length
    if (count === 7) {
      navigation.replace(ROUTES.finishScreen, { level, id })
      return
    }
    setArr(updatedArr)
  }
  const handleBackButtonClick = () => {
    if (cNumber !== 1) {
      navigation.replace(ROUTES.findRandEx, { level: cNumber - 1, id })
      return true
    }
    return true
  }
  const onPress = () => {
    if (cNumber === 1) {
      navigation.replace(ROUTES.mainScreen)
      return true
    }
    navigation.replace(ROUTES.findRandEx, { level: cNumber - 1, id })
    return true
  }

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={practiceBg}
        resizeMode="cover"
        style={styles.image}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
          }}>
          {cNumber === 1 ? null : (
            <View
              style={{
                position: 'absolute',
                top: '53%',
                left: '3%'
              }}>
              <TouchableOpacity onPress={() => onPress()}>
                <Image style={{ width: 30, height: 30 }} source={Backward} />
              </TouchableOpacity>
              <TouchableOpacity
                style={{ marginTop: 20 }}
                onPress={() => navigation.replace(ROUTES.mainScreen)}>
                <Image style={{ width: 35, height: 35 }} source={Close} />
              </TouchableOpacity>
            </View>
          )}
          <View
            style={{
              position: 'absolute',
              top: '30%',
              left: '40%'
            }}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                color: 'black'
              }}>
              Level {cNumber}
            </Text>
          </View>
          <Text
            style={{
              fontSize: 24,
              fontWeight: 'bold',
              marginBottom: '38%',
              color: 'black'
            }}>
            Find Number {correctans}
          </Text>
          <View style={styles.bottomView}>
            <FlatList
              numColumns={5}
              data={arr}
              renderItem={({ item, index }) => (
                <NumClick
                  key={index}
                  level={level}
                  onPress={() => btnClick(item.val, index)}
                  item={item}
                />
              )}
            />
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  )
}
export default FindRandEx

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  image: {
    flex: 1,
    justifyContent: 'center'
  },
  bottomView: {
    position: 'absolute',
    bottom: '23%'
  },
  button2: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    elevation: 3,
    backgroundColor: 'red',
    marginTop: 20,
    position: 'absolute',
    bottom: '5%',
    right: '5%'
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: '#FFF'
  }
})

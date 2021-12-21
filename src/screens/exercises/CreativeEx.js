/* eslint-disable eqeqeq */
import React, { useEffect, useState } from 'react'
import {
  FlatList,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  View,
  BackHandler,
  Text,
  Image,
  TouchableOpacity
} from 'react-native'
import OptionClick from '../../components/OptionClick'
import Practice from '../../components/Practice'
import { colorsByIndex, ex3Logic, optionsLogic } from '../../constants/data'
import ROUTES from '../../constants/navigation'

const practiceBg = require('../../../assets/bgforkids2.jpg')
const Backward = require('../../../assets/backward.png')
const Close = require('../../../assets/closeapp.png')

const CreativeEx = ({ navigation, route }) => {
  const [exIndex, setIndex] = useState(0)
  const [options, setOptions] = useState([])
  const [ex, setEx] = useState([])
  const { level } = route.params
  const { id } = route.params
  const cNumber = route.params.level
  useEffect(() => {
    const newArray = ex3Logic(level)
    newArray.push(...getRandomNumbers())
    setEx(newArray)
    setOptions(optionsLogic(level))
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick)
    return () => {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        handleBackButtonClick
      )
    }
  }, [])
  const getRandomNumbers = () => {
    return ex3Logic(level)
      .map(value => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value)
  }
  const btnClick = (number, i) => {
    if (exIndex == ex.length - 1) {
      if (number == ex[exIndex].ans) {
        navigation.replace(ROUTES.finishScreen, { level, id })
        return
      }
    }

    setTimeout(() => {
      if (number == ex[exIndex].ans) {
        const newindex = exIndex + 1
        setIndex(newindex)
      }
      const newArr = options.map(item => {
        const newItem = item
        newItem.show = false

        return newItem
      })
      setOptions(newArr)
    }, 1000)

    const updatedArr = options.map((item, index) => {
      const newItem = item
      if (i == index) {
        newItem.show = true
        if (number == ex[exIndex].ans) {
          newItem.correct = true
        } else {
          newItem.correct = false
        }
      } else {
        newItem.show = false
      }
      return newItem
    })
    setOptions(updatedArr)
    if (number == ex[exIndex].ans) {
      ex.map((item, index) => {
        const newItem = item
        if (index == exIndex) {
          const key = getKeyByValue(item, '?')
          newItem[key] = number
        }
        return newItem
      })
      setEx(ex)
    }
  }

  const getKeyByValue = (object, value) => {
    return Object.keys(object).find(key => object[key] == value)
  }
  const handleBackButtonClick = () => {
    if (cNumber !== 1) {
      navigation.replace(ROUTES.creativeEx, { level: cNumber - 1, id })
      return true
    }
    return true
  }
  const onPress = () => {
    if (cNumber === 1) {
      navigation.replace(ROUTES.mainScreen)
      return true
    }
    navigation.replace(ROUTES.creativeEx, { level: cNumber - 1, id })
    return true
  }

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={practiceBg}
        resizeMode="cover"
        style={styles.image}>
        <View style={styles.viewOne}>
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
              left: '42%',
              flexDirection: 'row'
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
          <View style={styles.boxView}>
            <View style={styles.viewTwo}>
              <Practice
                text={ex[exIndex]?.firstVal}
                color={colorsByIndex[ex[exIndex]?.firstVal]}
              />
              <View style={styles.viewThree} />
            </View>

            <View style={styles.viewFour}>
              <Practice
                text={ex[exIndex]?.scndVal}
                color={colorsByIndex[ex[exIndex]?.scndVal]}
              />
              <View
                style={{ height: 60, backgroundColor: '#87CEEB', width: 10 }}
              />
              <Practice
                text={ex[exIndex]?.thirdVal}
                color={colorsByIndex[ex[exIndex]?.thirdVal]}
              />
            </View>
          </View>
          <View style={styles.viewFive}>
            <View style={styles.viewSix}>
              <View style={{ justifyContent: 'center' }}>
                <FlatList
                  numColumns={5}
                  data={options}
                  renderItem={({ item, index }) => (
                    <OptionClick
                      index={index}
                      onPress={() => btnClick(item.name, index)}
                      item={item}
                    />
                  )}
                />
              </View>
            </View>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  )
}
export default CreativeEx

const styles = StyleSheet.create({
  viewOne: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  viewTwo: {
    alignItems: 'center',
    flexDirection: 'column'
  },
  viewThree: {
    height: 10,
    backgroundColor: '#87CEEB',
    width: 100,
    paddingRight: 20
  },
  boxView: {
    alignItems: 'center',
    marginBottom: '20%'
  },
  viewFour: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  viewFive: {
    alignItems: 'flex-end',
    flexDirection: 'row',
    position: 'absolute',
    bottom: '20%'
  },
  viewSix: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    flex: 1,
    justifyContent: 'center'
  },
  container: {
    flex: 1,
    marginTop: 20
  }
})

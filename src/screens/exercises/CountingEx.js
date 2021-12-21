/* eslint-disable eqeqeq */
/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react'
import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  BackHandler
} from 'react-native'
import ImgBalls from '../../components/ImgBalls'
import OptionClick from '../../components/OptionClick'
import { ballsData, Ex1Level1, getRandomBalls } from '../../constants/data'
import ROUTES from '../../constants/navigation'

const practiceBg = require('../../../assets/newfootballbg.jpg')
const Ballimg = require('../../../assets/ball.png')

const CountingEx = ({ navigation, route }) => {
  const [Balls, setBalls] = useState([])
  const [options, setOptions] = useState(Ex1Level1)
  const [bIndex, setIndex] = useState(0)
  const { id } = route.params
  useEffect(() => {
    ballsData.push(...getRandomBalls())
    setBalls(ballsData)
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => true
    )
    return () => backHandler.remove()
  }, [])

  const btnClick = (number, i) => {
    if (bIndex === 19) {
      if (number == Balls[bIndex].length) {
        navigation.replace(ROUTES.finishScreen, { id })
        return
      }
    }
    setTimeout(
      () => {
        if (number == Balls[bIndex].length) {
          const newIndex = bIndex + 1
          setIndex(newIndex)
        }
        const newArr = options.map(item => {
          const newItem = item
          newItem.show = false
          return newItem
        })
        setOptions(newArr)
      },
      number == Balls[bIndex].length ? 1 : 1000
    )

    const updatedArr = options.map((item, ind) => {
      const newItems = item
      if (i == ind) {
        newItems.show = true
        if (ind == Balls[bIndex].length) {
          newItems.correct = true
        } else {
          newItems.correct = false
        }
      } else {
        newItems.show = false
      }
      return newItems
    })
    setOptions(updatedArr)
  }

  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.image} source={practiceBg} resizeMode="stretch" />
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 30
        }}>
        <Text style={styles.textstyle}>Let’s Play!</Text>
        <Text style={styles.textstyle}>How many Balls do you see?</Text>
      </View>
      <View
        style={{
          marginTop: 10,
          flexDirection: 'row',
          justifyContent: 'flex-end',
          alignItems: 'center',
          marginRight: '13%'
        }}>
        <Image style={{ height: 40, width: 40 }} source={Ballimg} />
        <Text style={{ fontSize: 30, fontWeight: 'bold', marginLeft: 15 }}>
          ?
        </Text>
      </View>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          padding: 20
        }}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
            paddingBottom: 80
          }}>
          <FlatList
            numColumns={5}
            data={Balls[bIndex]}
            renderItem={({ item }) => <ImgBalls item={item} />}
            keyExtractor={item => `${item}`}
          />
        </View>
        <View style={styles.viewFive}>
          <View style={{ justifyContent: 'center' }}>
            <FlatList
              numColumns={5}
              data={options}
              renderItem={({ item, index }) => (
                <OptionClick
                  key={index}
                  isWhite
                  onPress={() => btnClick(item.name, index)}
                  item={item}
                />
              )}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default CountingEx

const styles = StyleSheet.create({
  viewFive: {
    position: 'absolute',
    flexDirection: 'row',
    bottom: '5%'
  },
  image: {
    width: '100%',
    height: '100%',
    position: 'absolute'
  },
  container: {
    flex: 1,
    marginTop: 20
  },
  textstyle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'green'
  }
})

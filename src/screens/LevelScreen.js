import React, { useEffect } from 'react'
import {
  FlatList,
  ImageBackground,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View
} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { requestPurchase } from 'react-native-iap'
import {
  level1,
  ballsImg,
  endIap,
  rnIapInit,
  getAvailablePurchases,
  getItems
} from '../constants/data'
import ROUTES from '../constants/navigation'
import BallsImgCm from '../components/BallsImgCm'

const levelBg = require('../../assets/kidlevel3.jpg')

const LevelScreen = ({ route, navigation }) => {
  useEffect(() => {
    rnIapInit()
    return () => {
      endIap()
    }
  }, [])
  const { id } = route.params
  const NavigateTo = async index => {
    const isPurchase = await isPurchased(index)
    switch (id) {
      case '1':
        navigation.navigate(ROUTES.countingEx, { level: index, id })
        break
      case '2':
        if (isPurchase) {
          navigation.navigate(ROUTES.addSubstractEx, {
            level: index + 1,
            id
          })
        }
        break
      case '3':
        if (isPurchase) {
          navigation.navigate(ROUTES.creativeEx, { level: index + 1, id })
        }
        break
      case '4':
        if (isPurchase) {
          navigation.navigate(ROUTES.findRandEx, { level: index + 1, id })
        }
        break
      default:
        break
    }
  }

  const isPurchased = async index => {
    if (index === 0) return true
    const purchases = await getAvailablePurchases()
    if (purchases.length === 0) {
      const item = await getItems()
      if (item.length > 0) requestPurchase(item[0].productId)
    } else {
      return true
    }
    return false
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        hidden={false}
        backgroundColor="#FF6700"
        translucent
      />

      <ImageBackground source={levelBg} resizeMode="cover" style={styles.image}>
        <View style={styles.container}>
          <View>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={level1}
              initialNumToRender={2}
              renderItem={({ item, index }) => {
                return (
                  <TouchableOpacity onPress={() => NavigateTo(index, id)}>
                    <View style={styles.levelContainer}>
                      <Text
                        style={{
                          marginTop: 0,
                          fontSize: 24,
                          fontFamily: 'monospace',
                          fontWeight: 'bold'
                        }}>
                        {item.name}
                      </Text>

                      <FlatList
                        style={{
                          alignItems: 'center'
                        }}
                        numColumns={3}
                        data={ballsImg[item.key - 1]}
                        renderItem={() => <BallsImgCm />}
                        keyExtractor={item2 => `${item2}`}
                      />
                    </View>
                  </TouchableOpacity>
                )
              }}
            />
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  )
}

export default LevelScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    opacity: 0.9
  },
  item: {
    marginTop: 24,
    padding: 30,
    fontSize: 24,
    backgroundColor: '#FFB347',
    borderRadius: 20,
    elevation: 5,
    fontFamily: 'monospace',
    marginVertical: 8,
    marginHorizontal: 16
  },
  img: {
    height: 50,
    width: 50
  },
  image: {
    flex: 1,
    justifyContent: 'center'
  },
  levelContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
    padding: 20,
    fontSize: 24,
    backgroundColor: '#FF6700',
    borderRadius: 20,
    fontFamily: 'monospace',
    marginVertical: 8,
    marginHorizontal: 16,
    alignItems: 'center',
    height: 90
  }
})

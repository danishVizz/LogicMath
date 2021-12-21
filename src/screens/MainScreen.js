import React, { useEffect } from 'react'
import {
  FlatList,
  ImageBackground,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  BackHandler
} from 'react-native'
import BallsImgCm from '../components/BallsImgCm'
import { ballsImg, exercises } from '../constants/data'
import ROUTES from '../constants/navigation'

const exBgImage = require('../../assets/kidlevel3.jpg')

const MainScreen = ({ navigation }) => {
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick)
    return () => {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        handleBackButtonClick
      )
    }
  }, [])
  const levelToPlay = id => {
    switch (id) {
      case '1':
        navigation.navigate(ROUTES.countingEx, { id })
        break
      case '2':
        navigation.navigate(ROUTES.addSubstractEx, { level: 1, id })
        break
      case '3':
        navigation.navigate(ROUTES.creativeEx, { level: 1, id })
        break
      case '4':
        navigation.navigate(ROUTES.findRandEx, { level: 1, id })
        break
      default:
        break
    }
  }
  const handleBackButtonClick = () => {
    BackHandler.exitApp()
    // return true
  }
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        hidden={false}
        backgroundColor="#FF6700"
        translucent
      />

      <ImageBackground
        source={exBgImage}
        resizeMode="cover"
        style={styles.image}>
        <View style={styles.container}>
          <View>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={exercises}
              renderItem={({ item }) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      levelToPlay(item.key)
                    }}>
                    <View style={styles.exContainer}>
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
                        numColumns={2}
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

export default MainScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    opacity: 0.9,
    justifyContent: 'center'
  },
  item: {
    marginTop: 24,
    padding: 30,
    fontSize: 24,
    backgroundColor: '#FF6700',
    borderRadius: 20,
    elevation: 5,
    fontFamily: 'monospace',
    marginVertical: 8,
    marginHorizontal: 16
  },
  image: {
    flex: 1,
    justifyContent: 'center'
  },
  img: {
    height: 50,
    width: 50
  },
  exContainer: {
    flex: 1,
    flexDirection: 'row',
    height: 80,
    justifyContent: 'space-between',
    marginTop: 24,
    padding: 20,
    fontSize: 24,
    backgroundColor: '#FF6700',
    borderRadius: 20,
    fontFamily: 'monospace',
    marginVertical: 8,
    marginHorizontal: 16,
    alignItems: 'center'
  }
})

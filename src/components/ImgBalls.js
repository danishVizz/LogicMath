import React from 'react'
import { View, Image } from 'react-native'

const Ballimg = require('../../assets/ball.png')

const ImgBalls = () => {
  return (
    <View style={{ margin: 5 }}>
      <Image source={Ballimg} style={{ height: 50, width: 50 }} />
    </View>
  )
}
export default ImgBalls

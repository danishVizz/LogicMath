import React from 'react'
import { View, Image } from 'react-native'

const Ballimg = require('../../assets/ball.png')

const BallsImgCm = () => {
  return (
    <View style={{ marginLeft: 6, marginBottom: 6 }}>
      <Image source={Ballimg} style={{ height: 20, width: 20 }} />
    </View>
  )
}
export default BallsImgCm
  
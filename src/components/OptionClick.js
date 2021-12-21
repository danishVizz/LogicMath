/* eslint-disable no-nested-ternary */
import React from 'react'
import { Image, Text, TouchableOpacity, View, StyleSheet } from 'react-native'

const tick = require('../../assets/tick.png')
const cross = require('../../assets/close.png')

const OptionClick = ({ item, onPress, index, isWhite = false }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        alignItems: 'center',
        marginLeft: 10
      }}>
      <View
        style={[
          styles.optionclick,
          {
            backgroundColor: item.bgColor
          },
          index === 0 && {
            borderColor: 'black',
            borderWidth: 1
          }
        ]}>
        <Text
          style={{
            fontSize: 23,
            fontWeight: 'bold'
          }}>
          {item.name}
        </Text>
      </View>
      <Image
        source={item.correct ? tick : cross}
        style={[
          styles.img,
          {
            width: !item.show ? 0 : 20,
            tintColor: item.correct ? (isWhite ? 'white' : 'green') : 'red'
          }
        ]}
      />
    </TouchableOpacity>
  )
}
export default OptionClick

const styles = StyleSheet.create({
  optionclick: {
    width: 38,
    height: 38,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#D3D3D3',
    borderRadius: 5
  },
  img: { height: 25, width: 25, marginTop: 5 }
})

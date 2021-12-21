/* eslint-disable no-nested-ternary */
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { colorsByIndex } from '../constants/data'

const NumClick = ({ item, onPress, level }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        alignItems: 'center'
      }}>
      <View
        style={[
          styles.numclick,
          {
            backgroundColor:
              item.correct === 'yes'
                ? colorsByIndex[level]
                : item.correct === 'no'
                ? '#fff'
                : '#3d3a3a'
          }
        ]}>
        <Text style={styles.numText}>{item.val}</Text>
      </View>
    </TouchableOpacity>
  )
}
export default NumClick

const styles = StyleSheet.create({
  numclick: {
    height: 45,
    width: 45,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    borderWidth: 0.5,
    flexDirection: 'row',
    borderColor: 'grey'
  },
  numText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 16,
    color: 'white'
  },
  numText1: {
    fontSize: 20,
    fontWeight: 'bold',
    backgroundColor: '#458B00'
  },
  numText2: {
    fontSize: 20,
    fontWeight: 'bold',
    backgroundColor: '#ff0000'
  }
})

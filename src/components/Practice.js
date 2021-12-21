import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const Practice = ({ text, color, textColor = 'white' }) => {
  return (
    <View
      style={[
        styles.container,
        { backgroundColor: color, borderWidth: text === '0' ? 1 : 0 }
      ]}>
      <Text
        style={{
          fontSize: 35,
          fontWeight: 'bold',
          color: text === '0' || text === '?' ? 'black' : textColor
        }}>
        {text}
      </Text>
    </View>
  )
}
export default Practice

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0096FF',
    width: 45,
    height: 45,
    alignItems: 'center',
    borderRadius: 4,
    justifyContent: 'center',
    margin: 3
  },
  tContainer: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white'
  }
})

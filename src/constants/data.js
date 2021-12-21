/* eslint-disable no-empty */
/* eslint-disable no-nested-ternary */
import { Platform } from 'react-native'
import RNIap, {
  purchaseErrorListener,
  purchaseUpdatedListener,
  finishTransaction,
  initConnection
} from 'react-native-iap'
import {
  eightColor,
  fiveColor,
  fourColor,
  nineColor,
  oneColor,
  sevenColor,
  sixColor,
  threeColor,
  twoColor,
  zeroColor
} from './colors'

let purchaseUpdateSubscription
let purchaseErrorSubscription
const productIds = Platform.select({
  ios: ['com.math.subs'],
  android: ['com.math.subs']
})

export const exercises = [
  { name: 'Exercise  1', key: '1' },
  { name: 'Exercise  2', key: '2' },
  { name: 'Exercise  3', key: '3' },
  { name: 'Exercise  4', key: '4' }
]

export const optionData = [
  { name: '0', key: '1', show: false, correct: false, bgColor: zeroColor },
  { name: '1', key: '2', show: false, correct: true, bgColor: oneColor }
]

export const ex2Logic = lev => {
  const array = []
  const level = lev
  const n = level + 1
  /// Plus Logic ///
  for (let i = 0; i < 3; i += 1) {
    let newb = n
    for (let j = 0; j < n; j += 1) {
      newb -= 1
      const sturc = {
        firstVal: i === 2 ? '?' : j,
        scndVal: i === 1 ? '?' : newb,
        thirdVal: i === 0 ? '?' : level,
        op: '+',
        ans: i === 0 ? j + newb : i === 1 ? level - j : level - newb
      }
      array.push({
        firstVal: `${sturc.firstVal}`,
        scndVal: `${sturc.scndVal}`,
        thirdVal: `${sturc.thirdVal}`,
        op: '+',
        ans: `${sturc.ans}`
      })
    }
  }

  /// Minus Logic ////////////////
  for (let i = 0; i < 3; i += 1) {
    let newb = n
    for (let j = 0; j < n; j += 1) {
      newb -= 1
      const sturc = {
        firstVal: i === 2 ? '?' : level,
        scndVal: i === 1 ? '?' : i === 0 ? j : newb,
        thirdVal: i === 0 ? '?' : i === 1 ? newb : j,
        op: '-',
        ans: i === 0 ? level - j : i === 1 ? level - newb : newb + j
      }
      array.push({
        firstVal: `${sturc.firstVal}`,
        scndVal: `${sturc.scndVal}`,
        thirdVal: `${sturc.thirdVal}`,
        op: '-',
        ans: `${sturc.ans}`
      })
    }
  }

  return array
}

export const ex3Logic = lev => {
  const array = []
  const level = lev
  const n = level > 3 ? level + 1 : 3
  for (let i = 0; i < 2; i += 1) {
    let newb = n
    for (let j = 0; j < n; j += 1) {
      newb -= 1
      const sturc = {
        firstVal: level === 1 && j === 0 ? 0 : level,
        scndVal:
          i === 1 ? '?' : level === 1 && j > 1 ? 1 : level === 1 ? 0 : newb,
        thirdVal: i === 0 ? '?' : level === 1 && j > 1 ? 1 : level === 1 ? 0 : j
      }
      array.push({
        firstVal: `${sturc.firstVal}`,
        scndVal: `${sturc.scndVal}`,
        thirdVal: `${sturc.thirdVal}`,
        ans: `${sturc.firstVal - (i === 0 ? sturc.scndVal : sturc.thirdVal)}`
      })
    }
  }
  return array
}

export const optionsLogic = levs => {
  const optionArr = []
  for (let i = 0; i <= levs; i += 1) {
    optionArr.push({
      name: `${i}`,
      key: `${i}`,
      show: false,
      correct: false,
      bgColor: colorsByIndex[i]
    })
  }
  return optionArr
}

export const creativeData = [
  { firstVal: '0', scndVal: '0', thirdVal: '?', ans: '0' },
  { firstVal: '1', scndVal: '0', thirdVal: '?', ans: '1' },
  { firstVal: '1', scndVal: '1', thirdVal: '?', ans: '0' },
  { firstVal: '0', scndVal: '?', thirdVal: '0', ans: '0' },
  { firstVal: '1', scndVal: '?', thirdVal: '0', ans: '1' },
  { firstVal: '1', scndVal: '?', thirdVal: '1', ans: '0' }
]

export const level1 = [
  { name: 'Level  1', key: '1' },
  { name: 'Level  2', key: '2' },
  { name: 'Level  3', key: '3' },
  { name: 'Level  4', key: '4' },
  { name: 'Level  5', key: '5' },
  { name: 'Level  6', key: '6' },
  { name: 'Level  7', key: '7' },
  { name: 'Level  8', key: '8' },
  { name: 'Level  9', key: '9' }
]

export const Ex1Level1 = [
  { name: '0', key: '1', show: false, correct: false, bgColor: zeroColor },
  { name: '1', key: '2', show: false, correct: true, bgColor: oneColor },
  { name: '2', key: '3', show: false, correct: false, bgColor: twoColor },
  { name: '3', key: '4', show: false, correct: true, bgColor: threeColor },
  { name: '4', key: '5', show: false, correct: false, bgColor: fourColor },
  { name: '5', key: '6', show: false, correct: true, bgColor: fiveColor },
  { name: '6', key: '7', show: false, correct: false, bgColor: sixColor },
  { name: '7', key: '8', show: false, correct: true, bgColor: sevenColor },
  { name: '8', key: '9', show: false, correct: false, bgColor: eightColor },
  { name: '9', key: '10', show: false, correct: true, bgColor: nineColor }
]

export const ballsData = [
  [],
  [1],
  [1, 2],
  [1, 2, 3],
  [1, 2, 3, 4],
  [1, 2, 3, 4, 5],
  [1, 2, 3, 4, 5, 6],
  [1, 2, 3, 4, 5, 6, 7],
  [1, 2, 3, 4, 5, 6, 7, 8],
  [1, 2, 3, 4, 5, 6, 7, 8, 9]
]

export const ballsImg = [
  [1],
  [1, 2],
  [1, 2, 3],
  [1, 2, 3, 4],
  [1, 2, 3, 4, 5],
  [1, 2, 3, 4, 5, 6],
  [1, 2, 3, 4, 5, 6, 7],
  [1, 2, 3, 4, 5, 6, 7, 8],
  [1, 2, 3, 4, 5, 6, 7, 8, 9]
]

export const getRandomBalls = () => {
  return ballsData
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)
}
export const colorsByIndex = {
  0: zeroColor,
  1: oneColor,
  2: twoColor,
  3: threeColor,
  4: fourColor,
  5: fiveColor,
  6: sixColor,
  7: sevenColor,
  8: eightColor,
  9: nineColor,
  '?': 'white'
}

export const Ex2Level1 = [
  { firstVal: '0', scndVal: '1', thirdVal: '?', op: '+', ans: '1' },
  { firstVal: '1', scndVal: '0', thirdVal: '?', op: '+', ans: '1' },
  { firstVal: '0', scndVal: '?', thirdVal: '1', op: '+', ans: '1' },
  { firstVal: '1', scndVal: '?', thirdVal: '1', op: '+', ans: '0' },
  { firstVal: '?', scndVal: '1', thirdVal: '1', op: '+', ans: '0' },
  { firstVal: '?', scndVal: '0', thirdVal: '1', op: '+', ans: '1' },
  { firstVal: '1', scndVal: '0', thirdVal: '?', op: '-', ans: '1' },
  { firstVal: '1', scndVal: '1', thirdVal: '?', op: '-', ans: '0' },
  { firstVal: '1', scndVal: '?', thirdVal: '1', op: '-', ans: '0' },
  { firstVal: '1', scndVal: '?', thirdVal: '1', op: '-', ans: '0' },
  { firstVal: '?', scndVal: '1', thirdVal: '0', op: '-', ans: '1' },
  { firstVal: '?', scndVal: '0', thirdVal: '1', op: '-', ans: '1' }
]

export const Ex2Level2 = [
  { firstVal: '0', scndVal: '2', thirdVal: '?', op: '+', ans: '1' },
  { firstVal: '1', scndVal: '1', thirdVal: '?', op: '+', ans: '1' },
  { firstVal: '0', scndVal: '?', thirdVal: '1', op: '+', ans: '1' },
  { firstVal: '1', scndVal: '?', thirdVal: '1', op: '+', ans: '0' },
  { firstVal: '?', scndVal: '1', thirdVal: '1', op: '+', ans: '0' },
  { firstVal: '?', scndVal: '0', thirdVal: '1', op: '+', ans: '1' },
  { firstVal: '1', scndVal: '0', thirdVal: '?', op: '-', ans: '1' },
  { firstVal: '1', scndVal: '1', thirdVal: '?', op: '-', ans: '0' },
  { firstVal: '1', scndVal: '?', thirdVal: '1', op: '-', ans: '0' },
  { firstVal: '1', scndVal: '?', thirdVal: '1', op: '-', ans: '0' },
  { firstVal: '?', scndVal: '1', thirdVal: '0', op: '-', ans: '1' },
  { firstVal: '?', scndVal: '0', thirdVal: '1', op: '-', ans: '1' }
]

export const rnIapInit = async () => {
  try {
    await RNIap.initConnection()
    if (Platform.OS === 'android') {
      await RNIap.flushFailedPurchasesCachedAsPendingAndroid()
    } else {
      await RNIap.clearTransactionIOS()
    }
  } catch (err) {}
  purchaseUpdateSubscription = purchaseUpdatedListener(async purchase => {
    const receipt1 = purchase.transactionReceipt
      ? purchase.transactionReceipt
      : purchase.originalJson

    if (receipt1) {
      try {
        await finishTransaction(purchase)
      } catch (ackErr) {}
    }
  })
  purchaseErrorSubscription = purchaseErrorListener(() => {})
}

export const getItems = async () => {
  try {
    const newProducts = await RNIap.getProducts(productIds)
    return newProducts
  } catch (err) {
    return []
  }
}

export const getAvailablePurchases = async () => {
  try {
    const purchases = await RNIap.getAvailablePurchases()
    return purchases
  } catch (err) {
    return []
  }
}

export const requestPurchase = async sku => {
  try {
    RNIap.requestPurchase(sku)
  } catch (err) {}
}

export const endIap = () => {
  if (purchaseUpdateSubscription) {
    purchaseUpdateSubscription.remove()
    purchaseUpdateSubscription = null
  }
  if (purchaseErrorSubscription) {
    purchaseErrorSubscription.remove()
    purchaseErrorSubscription = null
  }
  RNIap.endConnection()
}

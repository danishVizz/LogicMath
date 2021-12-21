import React, { useEffect, useState } from 'react'
import {
  Alert,
  Button,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native'
import RNIap, {
  purchaseErrorListener,
  purchaseUpdatedListener,
  finishTransaction
} from 'react-native-iap'

const Iap = () => {
  useEffect(() => {
    init()
    return () => {
      endIap()
    }
  }, [])

  const [products, setProducts] = useState([])
  const [receipt, setReceipt] = useState('')
  const [availableItemsMessage, setAvailableItem] = useState('')
  let purchaseUpdateSubscription
  let purchaseErrorSubscription
  const productIds = Platform.select({
    ios: ['com.math.subs'],
    android: ['com.math.subs']
  })
  const init = async () => {
    rnIapInit()
  }

  const rnIapInit = async () => {
    try {
      await RNIap.initConnection()
      if (Platform.OS === 'android') {
        await RNIap.flushFailedPurchasesCachedAsPendingAndroid()
      } else {
        await RNIap.clearTransactionIOS()
      }
    } catch (err) {
      console.warn(err.code, err.message)
    }
    purchaseUpdateSubscription = purchaseUpdatedListener(async purchase => {
      console.info('purchase', purchase)
      const receipt1 = purchase.transactionReceipt
        ? purchase.transactionReceipt
        : purchase.originalJson
      console.info(receipt1)
      if (receipt1) {
        try {
          const ackResult = await finishTransaction(purchase)
          console.info('ackResult', ackResult)
        } catch (ackErr) {
          console.warn('ackErr', ackErr)
        }
        setReceipt(receipt1)
        goNext(receipt1)
      }
    })

    purchaseErrorSubscription = purchaseErrorListener(error => {
      console.log('purchaseErrorListener', error)
      Alert.alert('purchase error', JSON.stringify(error))
    })
  }

  const goNext = rec => {
    Alert.alert('Receipt', rec)
  }

  const getItems = async () => {
    console.log('getting')
    try {
      const newProducts = await RNIap.getProducts(productIds)
      console.log('Products', newProducts)
      setProducts(newProducts)
    } catch (err) {
      console.warn(err.code, err.message)
    }
  }

  const getAvailablePurchases = async () => {
    try {
      const purchases = await RNIap.getAvailablePurchases()
      console.info('Available purchases :: ', purchases)
      if (purchases && purchases.length > 0) {
        // this.setState({
        //   availableItemsMessage: `Got ${purchases.length} items.`,
        //   receipt: purchases[0].transactionReceipt
        // })
        setAvailableItem(`Got ${purchases.length} items.`)
        setReceipt(purchases[0].transactionReceipt)
      }
    } catch (err) {
      console.warn(err.code, err.message)
      Alert.alert(err.message)
    }
  }

  // Version 3 apis
  const requestPurchase = async sku => {
    try {
      RNIap.requestPurchase(sku)
    } catch (err) {
      console.warn(err.code, err.message)
    }
  }

  const endIap = () => {
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
  const receipt100 = receipt.substring(0, 100)
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTxt}>react-native-iap V3</Text>
      </View>
      <View style={styles.content}>
        <ScrollView style={{ alignSelf: 'stretch' }}>
          <View style={{ height: 50 }} />
          <Button
            onPress={getAvailablePurchases}
            activeOpacity={0.5}
            style={styles.btn}
            title="Get available purchases"
            textStyle={styles.txt}
          />

          <Text style={{ margin: 5, fontSize: 15, alignSelf: 'center' }}>
            {availableItemsMessage}
          </Text>

          <Text style={{ margin: 5, fontSize: 9, alignSelf: 'center' }}>
            {receipt100}
          </Text>

          <Button
            onPress={() => getItems()}
            activeOpacity={0.5}
            style={styles.btn}
            title={` Get Products`}
            textStyle={styles.txt}
          />
          {products.map((product, i) => {
            return (
              <View
                key={i}
                style={{
                  flexDirection: 'column'
                }}>
                <Text
                  style={{
                    marginTop: 20,
                    fontSize: 12,
                    color: 'black',
                    minHeight: 100,
                    alignSelf: 'center',
                    paddingHorizontal: 20
                  }}>
                  {JSON.stringify(product)}
                </Text>
                <Button
                  onPress={() => requestPurchase(product.productId)}
                  activeOpacity={0.5}
                  style={styles.btn}
                  title="request purchase"
                  textStyle={styles.txt}
                />
              </View>
            )
          })}
        </ScrollView>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Platform.select({
      ios: 0,
      android: 24
    }),
    paddingTop: Platform.select({
      ios: 0,
      android: 24
    }),
    backgroundColor: 'white'
  },
  header: {
    flex: 20,
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center'
  },
  headerTxt: {
    fontSize: 26,
    color: 'green'
  },
  content: {
    flex: 80,
    flexDirection: 'column',
    justifyContent: 'center',
    alignSelf: 'stretch',
    alignItems: 'center'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  btn: {
    height: 48,
    width: 240,
    alignSelf: 'center',
    backgroundColor: '#00c40f',
    borderRadius: 0,
    borderWidth: 0
  },
  txt: {
    fontSize: 16,
    color: 'white'
  }
})

export default Iap

import AsyncStorage from '@react-native-async-storage/async-storage'
import * as SplashScreen from 'expo-splash-screen'
import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import { persistReducer, persistStore } from 'redux-persist'
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'
import thunk from 'redux-thunk'
import rootReducer from './reducers'

// eslint-disable-next-line no-undef
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  stateReconciler: autoMergeLevel2
}

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers(rootReducer)
)

export const store = createStore(
  persistedReducer,
  composeEnhancers(applyMiddleware(thunk))
)

const hideSplash = async () => {
  await SplashScreen.hideAsync()
}

export const persistor = persistStore(store, null, async () => {
  await SplashScreen.preventAutoHideAsync()
  setTimeout(() => hideSplash(), 500)
})

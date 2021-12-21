# Redux Implementation
This app uses redux with [redux-thunk](https://github.com/reduxjs/redux-thunk) for global state management. Data stored in redux should be needed in several different components. Any data that is only necessary within a single component can be stored in tradional react state using hooks.

## Folder Structure
The root folder contains the configuration for the global store in store.js.

#### /actions
All defined actions and action creators are stored in the actions folder. There should be one action file per reducer. Actions should be defined as constants using SCREAMING_SNAKE_CASE at the top of the file. The value of each actions should be in the following syntax domain/actionName. For example, appState/changeActive. Action creator functions should be defined below the actions. Action creator functions can either return a traditional action object or a thunk function, which takes dispatch and state as parameters.

#### /reducers
Reducers functions are stored in the reducers folder and exported as a single object from reducers/index.js. Reducers should be split into manageable objects with a single functional focus. For example, if we create a reducers for the checkout flow it should not contain data for the PLP flow. Our reducer functions should contain a switch case statement on action.type. Any complex logic that needs to be executed in order to set the state properly should ideally be defined in a util function either above the reducer function in the same file or in a file in the utils folder if the logic needs to be reused. New reducers should be exported as default from the file they are in, imported into index.js, and added to the exported object.

## Current State Objects
- **appState:** any needed data relating to the app as a whole should be stored here (platform, active/background, tokens, etc)

## Debugging
The best way to debug redux inside react native is using [React Native Debugger](https://github.com/jhen0409/react-native-debugger), which combines the chrome remote debugger with react native devtools and redux devtools in one view. The codebase is already configured to support this, but you will need to download and install the latest release for your environment from [their release page](https://github.com/jhen0409/react-native-debugger/releases).

Run the app and then open the debugger either directly by clicking on it or using shell with the following command
```
open "rndebugger://set-debugger-loc?host=localhost&port=8081"
```

Once open, go to the react native debugging menu in the simulator and enable remote debugging. The debugger should connect and you can inspect the redux states, react components, network and console.

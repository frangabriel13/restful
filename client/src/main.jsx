import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
// import store from './redux/store'
import { BrowserRouter as Router } from 'react-router-dom'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from './redux/store'

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <Provider store={store}>
//     <Router basename='/'>
//       <App />
//     </Router>
//   </Provider>,
// )
ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Router basename='/'>
        <App />
      </Router>
    </PersistGate>
  </Provider>
);

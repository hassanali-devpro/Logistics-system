import { Provider } from 'react-redux'
import { Bounce, ToastContainer } from 'react-toastify'
import { ThemeProvider } from '@mui/material'

import { Component } from './components/Component/Component'
import { ModalContextProvider, ModalRoot } from './shared/components'
import { theme } from './shared/theme'
import store from './wms-store/store'

import 'react-toastify/dist/ReactToastify.min.css'
import 'react-phone-number-input/style.css'
import './App.css'

function App() {
  return (
    <div className="font-outfit">
      <ModalContextProvider>
        <ThemeProvider theme={theme}>
          <Provider store={store}>
            <ToastContainer
              position="bottom-right"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
              transition={Bounce}
            />
            <Component />
            <ModalRoot />
          </Provider>
        </ThemeProvider>
      </ModalContextProvider>
    </div>
  )
}

export default App

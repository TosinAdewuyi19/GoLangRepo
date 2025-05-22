import { Provider } from 'react'
import { createRoot } from 'react-dom/client'
import './static/index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>,
)


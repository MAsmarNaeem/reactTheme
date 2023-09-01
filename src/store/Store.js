import { configureStore } from '@reduxjs/toolkit'

import valueUpdation from './Subtype'

const store = configureStore({
  reducer: {
    valueUpdation,
  },
})

export default store

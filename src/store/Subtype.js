import { createSlice } from '@reduxjs/toolkit'

const propertySlice = createSlice({
  name: 'property',
  initialState: {
    usersList: [],
  },
  reducers: {
    setUsersList: (state, action) => {
      state.usersList = action.payload
      console.log('state is getting ', state)
    },
    updateUser: (state, action) => {
      const updatedUser = action.payload
      const userIndex = state.usersList.findIndex((user) => user.id === updatedUser.id)
      if (userIndex !== -1) {
        state.usersList[userIndex] = updatedUser
      }
    },
  },
})

export const { setUsersList, updateUser } = propertySlice.actions
export default propertySlice.reducer

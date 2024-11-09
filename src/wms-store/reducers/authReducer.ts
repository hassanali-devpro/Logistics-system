import { createSlice } from '@reduxjs/toolkit'

import { USER_STATUSES } from '../../components/UsersPage/constants'
import { ResponseType } from '../../shared/constants'
import { initialState } from '../initialState'
import { authService } from '../services/authService'
import { userService } from '../services/userService'

const updateUserProfiles = (state: any, user: any) => {
  // update user profiles
  const existingProfile = state.userProfiles[user._id]

  if (existingProfile) {
    state.userProfiles[user._id] = { ...state.userProfiles[user._id], ...user }
  } else {
    state.userProfiles[user._id] = user
  }

  // update users list
  const userIndex = state.users.findIndex((u: any) => u._id === user._id)

  if (userIndex > -1) {
    state.users[userIndex] = { ...state.users[userIndex], ...user }
  } else {
    state.users.push(user)
  }
}

export const authSlice = createSlice({
  name: 'auth',
  initialState: initialState.auth,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(authService.endpoints.login.matchFulfilled, (state, action) => {
      if (['success', 'info'].includes(action.payload?.type as ResponseType)) {
        const { authToken, ...rest } = action.payload.data
        state.currentUser = { ...rest }
        state.userProfiles[action.payload.data._id] = action.payload.data
        localStorage.setItem('authToken', authToken)
        localStorage.setItem('currentUserKey', action.payload.data._id)
      }
    })

    builder.addMatcher(authService.endpoints.logout.matchFulfilled, (state, action) => {
      if ((action.payload?.type as ResponseType) === 'success') {
        localStorage.removeItem('authToken')
        localStorage.removeItem('currentUserKey')
        state.currentUser = {}
        state.userProfiles = {}
      }
    })

    builder.addMatcher(authService.endpoints.updateUserInfo.matchFulfilled, (state, action) => {
      if ((action.payload?.type as ResponseType) === 'success') {
        state.currentUser = {
          ...state.currentUser,
          ...action.payload.data
        }

        updateUserProfiles(state, action.payload.data)
      }
    })

    builder.addMatcher(authService.endpoints.getUserProfile.matchFulfilled, (state, action) => {
      if (['success', 'info'].includes(action.payload?.type as ResponseType) && action.payload?.data?.email) {
        if (action.payload?.data?._id === localStorage.getItem('currentUserKey')) {
          state.currentUser = action.payload.data
        }

        updateUserProfiles(state, action.payload.data)
      }
      if (
        action.payload?.status === 2 &&
        action.payload?.data?._id === localStorage.getItem('currentUserKey') &&
        window.location.pathname !== '/profile-edit'
      ) {
        window.location.href = '/profile-edit'
      }
    })

    builder.addMatcher(authService.endpoints.updateUserProfile.matchFulfilled, (state, action) => {
      if ((action.payload?.type as ResponseType) === 'success') {
        if (action.payload?.data?._id === localStorage.getItem('currentUserKey')) {
          state.currentUser = { ...state.currentUser, ...action.payload.data }
        }

        updateUserProfiles(state, action.payload.data)
      }
    })

    builder.addMatcher(authService.endpoints.updateProfileImage.matchFulfilled, (state, action) => {
      if ((action.payload?.type as ResponseType) === 'success') {
        if (action.payload?.data?._id === localStorage.getItem('currentUserKey')) {
          state.currentUser = { ...state.currentUser, image: action.payload.data.image }
        }

        updateUserProfiles(state, action.payload.data)
      }
    })

    builder.addMatcher(authService.endpoints.updateEmergencyContact.matchFulfilled, (state, action) => {
      if ((action.payload?.type as ResponseType) === 'success') {
        if (action.payload?.data?._id === localStorage.getItem('currentUserKey')) {
          state.currentUser = {
            ...state.currentUser,
            emergencyContact: {
              ...action.payload.data.emergencyContact
            }
          }
        }

        updateUserProfiles(state, {
          ...state.currentUser,
          emergencyContact: {
            ...action.payload.data.emergencyContact
          }
        })
      }
    })

    builder.addMatcher(authService.endpoints.updateUserStatus.matchFulfilled, (state, action) => {
      if ((action.payload?.type as ResponseType) === 'success') {
        if (action.payload?.data?._id === localStorage.getItem('currentUserKey')) {
          state.currentUser = {
            ...state.currentUser,
            ...action.payload.data
          }
        }

        updateUserProfiles(state, action.payload.data)
      }
    })

    builder.addMatcher(userService.endpoints.resendInvite.matchFulfilled, (state, action) => {
      if ((action.payload?.type as ResponseType) === 'success') {
        const apiUserkeyArg = action.meta.arg.originalArgs
        if (apiUserkeyArg === localStorage.getItem('currentUserKey')) {
          state.currentUser = {
            ...state.currentUser,
            status: USER_STATUSES.INVITATION_SENT
          }
        }

        updateUserProfiles(state, { _id: apiUserkeyArg, status: USER_STATUSES.INVITATION_SENT })
      }
    })

    builder.addMatcher(userService.endpoints.getUsers.matchFulfilled, (state, action) => {
      if (['success', 'info'].includes(action.payload?.type as ResponseType) && action.payload?.data?.users) {
        state.users = action.payload.data.users
        sessionStorage.setItem('totalItems', action.payload.data.totalItems)
      }
    })
  }
})

export default authSlice.reducer

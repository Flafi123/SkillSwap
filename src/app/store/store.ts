import { configureStore, combineReducers } from '@reduxjs/toolkit'
import skillSlice from '../../entities/Skill/model/skillSlice'
import userSlice from '../../entities/user/model/userSlice'

import {
  type TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook,
} from 'react-redux'

export const rootReducer = combineReducers({
  user: userSlice,
  skill: skillSlice,
})

const store = configureStore({
  reducer: rootReducer,
  devTools: import.meta.env.MODE !== 'production',
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

//в компонентах вызываются только кастомные хуки, не базовые редакс
export const useAppDispatch: () => AppDispatch = () => dispatchHook()
export const useAppSelector: TypedUseSelectorHook<RootState> = selectorHook

export default store

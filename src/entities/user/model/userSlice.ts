import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit'
import { getUsersApi, registerUserApi, updateUserApi } from '../../../api/usersApi'
import type { TUser, TRegisterData } from '../../../shared/utils/types'

//Флоу данных для пользователей на главной странице:
//Компонент UserList получает из стора данные(использует useAppSelector)(можно пока что для визуализации брать всех юзеров
//потом будете брать уже отфильтрованных)
//записывает их в переменную. Возвращает что-то типо следующего:
// users.map((elem,key)=> {
//<li key={key}>
// <UserCard user={elem}/>
// </li>
//})

export type userState = {
  allUsers: TUser[]
  //это поле поможет вам собрать все данные по регистрации
  //получить их через useAppSelector и передать в registerUser
  draftUser: Partial<TRegisterData>
  //получаем его, чтобы заполнять автоматически данные в профиле
  profileUser: TUser | null
  isLoadingUsers: boolean
  isLoadingRegister: boolean
  isLoadingUpdate: boolean
  errorUsers: string | null
  errorRegister: string | null
  errorUpdate: string | null
}

const initialState: userState = {
  allUsers: [],
  draftUser: {},
  profileUser: null,
  isLoadingUsers: false,
  isLoadingRegister: false,
  isLoadingUpdate: false,
  errorUsers: null,
  errorRegister: null,
  errorUpdate: null,
}

//обязательно запускается при инициализации приложения!!!
export const getAllUsers = createAsyncThunk<TUser[]>('user/getAllUsers', async () => {
  const data = await getUsersApi()
  return data
})

//вызвать обязательно через диспатч по нажатию самой последней кнопки 3-го шага регистрации
export const registerUser = createAsyncThunk<TUser, TRegisterData>(
  'user/registerUser',
  async (userData) => {
    return registerUserApi(userData)
  },
)

//вызывать при изменении полей на странице профиля(не регистрации)
//пример, изменение имени в профиле: dispatch(updateUser({ name: `${что пользователь ввел}` }))
export const updateUser = createAsyncThunk<TUser, Partial<TUser>>(
  'user/updateUser',
  async (userData) => {
    const data = await updateUserApi(userData)
    return data
  },
)

//логин и логаут должны быть здесь
//

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    //вызывать при заполнении любого окошка формы регистрации(если это не записывать в стор, состояние между шагами не сохранится)
    updateDraftUser(state, action: PayloadAction<Partial<TRegisterData>>) {
      state.draftUser = { ...state.draftUser, ...action.payload }
    },
    //вызывается при завершении регистрации успешно (все три шага)
    resetDraftUser(state) {
      state.draftUser = {}
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllUsers.pending, (state) => {
        state.isLoadingUsers = true
        state.errorUsers = null
      })
      .addCase(getAllUsers.fulfilled, (state, action: PayloadAction<TUser[]>) => {
        state.allUsers = action.payload
        state.isLoadingUsers = false
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.errorUsers = action.error.message || 'Не удалось загрузить пользователей'
        state.isLoadingUsers = false
      })
      .addCase(registerUser.pending, (state) => {
        state.isLoadingRegister = true
        state.errorRegister = null
      })
      .addCase(registerUser.fulfilled, (state, action: PayloadAction<TUser>) => {
        state.profileUser = action.payload
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.errorRegister = action.error.message || 'Не удалось зарегистрировать пользователя'
        state.isLoadingRegister = false
      })
      .addCase(updateUser.pending, (state) => {
        state.isLoadingUpdate = true
        state.errorUpdate = null
      })
      .addCase(updateUser.fulfilled, (state, action: PayloadAction<TUser>) => {
        state.profileUser = action.payload
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.errorUpdate = action.error.message || 'Не удалось обновить данные о пользователе'
        state.isLoadingUpdate = false
      })

    // .addCase(loginUser.fulfilled, (state, action) => {
    //   state.profileUser = action.payload
    // })
    // .addCase(logoutUser.fulfilled, (state) => {
    //   state.profileUser = null
    // })
  },
})

export const { updateDraftUser, resetDraftUser } = userSlice.actions
export default userSlice.reducer

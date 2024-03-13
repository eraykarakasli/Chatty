import { createSlice } from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

const initialState = {
  user: null,
  error: null,
  login: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserValue: (state, action) => {
      state.user = action.payload;
      state.error = null;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setLogin: (state, action) => {
      state.login = action.payload;
    },
  },
});

const userPersistConfig = {
  key: 'user',
  storage: storage,
  whitelist: ['user', 'login', 'error'], 
};


const persistedUserReducer = persistReducer(userPersistConfig, userSlice.reducer);

export const { setUserValue, setError, setLogin } = userSlice.actions;

export const registerUserAsync = (userData) => async (dispatch) => {
  try {
    const user = await registerUser(userData);
    dispatch(setUserValue(user));
    dispatch(setError(false));
  } catch (error) {
    dispatch(setError(true));
  }
};

export const loginUserAsync = (userData) => async (dispatch) => {
  try {
    const user = await loginUserService(userData);
    if (user) {
      localStorage.setItem('token', user.token);
      dispatch(setUserValue(user));
      dispatch(setError(false));
      dispatch(setLogin(true));
    } else {
      dispatch(setError(true, 'Bilgileriniz doğrulanamadı.'));
      dispatch(setLogin(false));
    }
  } catch (error) {
    console.error('Sunucu tarafında bir hata oluştu:', error);
    dispatch(setError(true, 'Giriş sırasında bir hata oluştu.'));
    dispatch(setLogin(false));
  }
};

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem('token');
  dispatch(setUserValue(null));
  dispatch(setLogin(false));
};




export default persistedUserReducer;

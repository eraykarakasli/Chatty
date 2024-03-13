import { configureStore } from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage'; // LocalStorage için
import { persistReducer, persistStore } from 'redux-persist';
import { combineReducers } from 'redux';
import counterSlice from "./features/counterSlice";
import navbarSlice from "./features/navbarSlice";
import userDummySlice from "./features/userDummySlice";
import recentUserSlice from "./features/recentUserSlice";
import profilePopSlice from "./features/profilePopSlice";
import categoryFilterSlice from "./features/categoryFilterSlice";
import themeSlice from "./features/themeSlice";
import fullNavbarSlice from "./features/fullNavbar";
import quickMessageSlice from "./features/quickMessageSlice";
import userSlice from "./userSlice";
import serverSlice from "./providerRedux/serverSlice";
import messagesSlice from "./providerRedux/messagesSlice";
import temporarySlice from "./features/temporarySlice";
import fileSlice from "./providerRedux/fileSlice";
import portSlice from "./providerRedux/portSlice";


const rootReducer = combineReducers({
  counter: counterSlice,
    navbar: navbarSlice,
    users: userDummySlice,
    recentUser: recentUserSlice,
    profilePop: profilePopSlice,
    filterCategory: categoryFilterSlice,
    theme: themeSlice,
    fullnavbar: fullNavbarSlice,
    quickMessage: quickMessageSlice,
    user: userSlice,
    server: serverSlice,
    messages: messagesSlice,
    temporary: temporarySlice,
    file: fileSlice,
    port: portSlice
});


// Persist konfigürasyonu
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['server', 'theme'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

export const persistor = persistStore(store);

// export const store = configureStore({
//   reducer: {
//     counter: counterSlice,
//     navbar: navbarSlice,
//     users: userDummySlice,
//     recentUser: recentUserSlice,
//     profilePop: profilePopSlice,
//     filterCategory: categoryFilterSlice,
//     theme: themeSlice,
//     fullnavbar: fullNavbarSlice,
//     quickMessage: quickMessageSlice,
//     user: userSlice,
//     server: serverSlice,
//   },
// });




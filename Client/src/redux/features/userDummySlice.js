// userSlice.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  {
    id:1,
    name: "Muhammed Abduleziz",
    surname: "Doe",
    image: "https://res.cloudinary.com/demo/image/twitter/1330457336.jpg",
    online: true,
    message: "hey! there I'm available",
    status: "rated",
    category: "IT",
  },
  {
    id: 2,
    name: "Eray",
    surname: "Doe",
    image: "https://res.cloudinary.com/demo/image/twitter/1330457336.jpg",
    online: true,
    message: "hey! there I'm available",
    status: "rated",
    category: "IT",
  },
  {
    id: 3,
    name: "Ahmet",
    surname: "Doe",
    image: "https://res.cloudinary.com/demo/image/twitter/1330457336.jpg",
    online: true,
    message: "hey! there I'm available",
    status: "rated",
    category: "Software",
  },
  {
    id: 4,
    name: "Semih",
    surname: "Doe",
    image: "https://res.cloudinary.com/demo/image/twitter/1330457336.jpg",
    online: true,
    message: "hey! there I'm available",
    status: "rated",
    category: "Software",
  },
  {
    id: 5,
    name: "Mustafa",
    surname: "Doe",
    image: "https://res.cloudinary.com/demo/image/twitter/1330457336.jpg",
    online: false,
    message: "hey! there I'm available",
    status: "rated",
    category: "Software",
  },
  {
    id: 6,
    name: "Melisa",
    surname: "Doe",
    image: "https://res.cloudinary.com/demo/image/twitter/1330457336.jpg",
    online: false,
    message: "hey! there I'm available",
    status: "rated",
    category: "CyberSecurity"
  },
  {
    id: 7,
    name: "Jhon",
    surname: "Doe",
    image: "https://res.cloudinary.com/demo/image/twitter/1330457336.jpg",
    online: false,
    message: "hey! there I'm available",
    status: "completed",
    category: "CyberSecurity"
  },
  {
    id: 8,
    name: "Jhon",
    surname: "Doe",
    image: "https://res.cloudinary.com/demo/image/twitter/1330457336.jpg",
    online: false,
    message: "hey! there I'm available",
    status: "completed",
    category: "Software",
  },
  {
    id: 9,
    name: "Mustafa",
    surname: "Doe",
    image: "https://res.cloudinary.com/demo/image/twitter/1330457336.jpg",
    online: false,
    message: "hey! there I'm available",
    status: "transferred",
    category: "Software",
  },
  {
    id: 10,
    name: "Melisa",
    surname: "Doe",
    image: "https://res.cloudinary.com/demo/image/twitter/1330457336.jpg",
    online: false,
    message: "hey! there I'm available",
    status: "transferred",
    category: "CyberSecurity"
  },
  {
    id: 11,
    name: "Jhon",
    surname: "Doe",
    image: "https://res.cloudinary.com/demo/image/twitter/1330457336.jpg",
    online: false,
    message: "hey! there I'm available",
    status: "progress",
    category: "CyberSecurity"
  },
  {
    id: 12,
    name: "Jhon",
    surname: "Doe",
    image: "https://res.cloudinary.com/demo/image/twitter/1330457336.jpg",
    online: false,
    message: "hey! there I'm available",
    status: "progress",
    category: "Software",
  },
];

export const userDummySlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers: (state) => {
      return state; 
    },
  },
});

export const { setUsers } = userDummySlice.actions;

export default userDummySlice.reducer;

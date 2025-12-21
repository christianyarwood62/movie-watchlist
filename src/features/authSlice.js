import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [], // each user is {username: '...', password: '...'}
  loggedInUser: null,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      const existingUser = state.users.find(
        (user) =>
          user.username === action.payload.username &&
          user.password === action.payload.password
      );

      if (!existingUser) return { ...state, error: "No user found" };

      const correctUsername = state.users.find(
        (user) => user.username === action.payload.username
      );

      if (
        correctUsername &&
        correctUsername.password !== action.payload.password
      )
        return { ...state, error: "Incorrect password" };

      if (existingUser)
        return { ...state, error: null, loggedInUser: existingUser };
    },

    logout(state) {
      return { ...state, loggedInUser: null, error: null };
    },

    createAccount(state, action) {
      state.users.push({
        username: action.payload.username,
        password: action.payload.password,
      });
      state.error = null;
      state.loggedInUser = {
        username: action.payload.username,
        password: action.payload.password,
      };
    },
  },
});

export const { login, logout, createAccount } = authSlice.actions;

export default authSlice.reducer;

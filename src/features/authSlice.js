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
        (user) => user.username === action.payload.username
      );

      if (!existingUser) {
        state.error = "No user found";
        state.loggedInUser = null;
        return;
      }

      const correctUsername = state.users.find(
        (user) => user.username === action.payload.username
      );

      if (
        correctUsername &&
        correctUsername.password !== action.payload.password
      ) {
        state.error = "Incorrect password";
        return;
      }

      state.error = null;
      state.loggedInUser = { username: existingUser.username };
    },

    logout(state) {
      state.loggedInUser = null;
      state.error = null;
    },

    createAccount(state, action) {
      state.users.push({
        username: action.payload.username,
        password: action.payload.password,
      });
      state.error = null;
      state.loggedInUser = {
        username: action.payload.username,
      };
    },
  },
});

export const { login, logout, createAccount } = authSlice.actions;

export default authSlice.reducer;

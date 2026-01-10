import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [], // each user is {username: '...', password: '...', provider: '...'}
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

    googleLogin(state, action) {
      const email = action.payload;
      let existingUser = state.users.find(
        (user) => user.username === email && user.provider === "google"
      );

      if (!existingUser) {
        existingUser = {
          username: email,
          password: null,
          provider: "google",
        };
        state.users.push(existingUser);
      }

      state.loggedInUser = { username: existingUser.username };
      state.error = null;
    },

    resetError(state) {
      state.error = null;
    },
  },
});

export const { login, logout, createAccount, googleLogin, resetError } =
  authSlice.actions;

export default authSlice.reducer;

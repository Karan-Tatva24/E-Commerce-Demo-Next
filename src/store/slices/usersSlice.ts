import {
  UsersData,
  RegisterUserPayload,
  LogInUserPayload,
  UpdateUserPayload,
  ChangePasswordPayload,
  ForgotPasswordPayload,
  LogoutPayload,
} from "@/types/UsersData";
import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";

const initialState: { users: UsersData[] } = {
  users: [],
};

const checkEmailUnique = (email: string, users: UsersData[]) => {
  return users.findIndex((user) => user.email === email) === -1;
};

const findUserIndex = (id: string, users: UsersData[]) => {
  return users.findIndex((user) => user.id === id);
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    registerUser: (state, action: PayloadAction<RegisterUserPayload>) => {
      if (checkEmailUnique(action.payload.email, state.users)) {
        const user = { ...action.payload, id: nanoid(5), isLoggedIn: false };
        state.users.push(user);
      } else {
        throw new Error("Email is already registered");
      }
    },
    logInUser: (state, action: PayloadAction<LogInUserPayload>) => {
      const index = state.users.findIndex(
        (user) => user.email === action.payload.email
      );
      if (index !== -1) {
        const { email, password, username } = action.payload;
        const currentUser = state.users[index];
        if (
          currentUser.email === email &&
          currentUser.username === username &&
          currentUser.password === password
        ) {
          state.users[index].isLoggedIn = true;
        } else {
          throw new Error("Enter correct credentials");
        }
      } else {
        throw new Error("Enter correct credentials");
      }
    },
    updateUser: (state, action: PayloadAction<UpdateUserPayload>) => {
      const index = findUserIndex(action.payload.id, state.users);
      if (index !== -1) {
        if (state.users[index].isLoggedIn) {
          state.users[index] = { ...state.users[index], ...action.payload };
        }
      } else {
        throw new Error("User not found");
      }
    },
    deleteUser: (state, action: PayloadAction<{ id: string }>) => {
      state.users = state.users.filter((user) => user.id !== action.payload.id);
    },
    changePassword: (state, action: PayloadAction<ChangePasswordPayload>) => {
      const index = findUserIndex(action.payload.id, state.users);
      if (index !== -1) {
        if (state.users[index].password === action.payload.currentPassword) {
          state.users[index].password = action.payload.newPassword;
        } else {
          throw new Error("Please enter correct current password");
        }
      } else {
        throw new Error("User not exists.");
      }
    },
    forgotPassword: (state, action: PayloadAction<ForgotPasswordPayload>) => {
      const index = state.users.findIndex(
        (user) => user.email === action.payload.email
      );
      if (index !== -1) {
        state.users[index].password = action.payload.password;
      } else {
        throw new Error("User with this email does not exist");
      }
    },
    logout: (state, action: PayloadAction<LogoutPayload>) => {
      const index = findUserIndex(action.payload.id, state.users);
      if (index !== -1) {
        state.users[index].isLoggedIn = false;
      }
    },
  },
});

export default usersSlice.reducer;
export const {
  registerUser,
  logInUser,
  updateUser,
  deleteUser,
  changePassword,
  forgotPassword,
  logout,
} = usersSlice.actions;

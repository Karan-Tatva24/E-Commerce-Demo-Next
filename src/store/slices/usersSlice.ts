import {
  UsersData,
  RegisterUserPayload,
  LogInUserPayload,
  UpdateUserPayload,
  ChangePasswordPayload,
  ForgotPasswordPayload,
  LogoutPayload,
} from "@/types/UsersData";
import {
  createAsyncThunk,
  createSlice,
  nanoid,
  PayloadAction,
} from "@reduxjs/toolkit";
import axios from "axios";

const initialState: { user: UsersData | {} } = {
  user: {},
};

const findUserIndex = (id: string, users: UsersData[]) => {
  return users.findIndex((user) => user.id === id);
};

export const registerUser = createAsyncThunk(
  "users/registerUser",
  async (payload: RegisterUserPayload, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/register-user");
      const data = response.data as { users: UsersData[] };

      if (data.users.find((user) => user.email === payload.email)) {
        throw new Error("User exists with this email");
      }

      const newUser: UsersData = {
        id: nanoid(5),
        username: payload.username,
        email: payload.email,
        phoneNumber: payload.phoneNumber,
        password: payload.password,
        isLoggedIn: false,
      };

      data.users.push(newUser);
      await axios.post("/api/register-user", { users: data.users });

      return newUser;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const logInUser = createAsyncThunk(
  "users/loginUser",
  async (payload: LogInUserPayload, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/register-user");
      const data = response.data as { users: UsersData[] };

      const userIdx = data.users.findIndex(
        (user) => user.email === payload.email
      );

      if (userIdx === -1)
        throw new Error("User not exists please register user");

      const user = { ...data.users[userIdx], isLogin: true };
      data.users[userIdx].isLoggedIn = true;
      console.log({ user, data });
      await axios.post("/api/register-user", data);
      return user;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateUser = createAsyncThunk(
  "users/updateUser",
  async (payload: UpdateUserPayload, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/register-user");
      const data = response.data as { users: UsersData[] };

      const userIdx = data.users.findIndex(
        (user) => user.email === payload.email
      );

      if (userIdx === -1)
        throw new Error("User not exists please register user");

      if (data.users[userIdx].isLoggedIn) {
        const updatedUser = { ...data.users[userIdx], ...payload };
        data.users[userIdx] = updatedUser;
        await axios.post("/api/register-user", data);
        return updatedUser;
      }
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (payload: { id: string }, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/register-user");
      const data = response.data as { users: UsersData[] };

      data.users = data.users.filter((user) => user.id !== payload.id);

      await axios.post("/api/register-user", data);
      return null;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const logout = createAsyncThunk(
  "users/logout",
  async (payload: LogoutPayload, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/register-user");
      const data = response.data as { users: UsersData[] };

      const userIdx = data.users.findIndex((user) => user.id === payload.id);

      if (userIdx === -1)
        throw new Error("User not exists please register user");

      const user = { ...data.users[userIdx], isLogin: false };
      data.users[userIdx].isLoggedIn = false;
      console.log({ user, data });
      await axios.post("/api/register-user", data);
      return user;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    // changePassword: (state, action: PayloadAction<ChangePasswordPayload>) => {
    //   const index = findUserIndex(action.payload.id, data.users);
    //   if (index !== -1) {
    //     if (data.users[index].password === action.payload.currentPassword) {
    //       data.users[index].password = action.payload.newPassword;
    //       if ((state.user as UsersData).id === action.payload.id) {
    //         (state.user as UsersData).password = action.payload.newPassword;
    //         writeData(data);
    //       }
    //     } else {
    //       throw new Error("Please enter the correct current password");
    //     }
    //   } else {
    //     throw new Error("User not found");
    //   }
    // },
    // forgotPassword: (state, action: PayloadAction<ForgotPasswordPayload>) => {
    //   const index = data.users.findIndex(
    //     (user) => user.email === action.payload.email
    //   );
    //   if (index !== -1) {
    //     data.users[index].password = action.payload.password;
    //     if ((state.user as UsersData).email === action.payload.email) {
    //       (state.user as UsersData).password = action.payload.password;
    //       writeData(data);
    //     }
    //   } else {
    //     throw new Error("User with this email does not exist");
    //   }
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.fulfilled, (state) => {
        state.user = {};
      })
      .addCase(logInUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload!;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.user = action.payload;
      });
  },
});

export default usersSlice.reducer;

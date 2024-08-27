import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  registerUserAction,
  logInUserAction,
  updateUserAction,
  logoutAction,
  placeOrderAction,
  changePasswordAction,
} from "@/app/actions/userActions";
import {
  UsersData,
  RegisterUserPayload,
  LogInUserPayload,
  UpdateUserPayload,
  PlaceOrderPayload,
  ChangePasswordPayload,
} from "@/types/UsersData";

const initialState: { user: UsersData } = {
  user: {
    id: "",
    username: "",
    email: "",
    phoneNumber: "",
    password: "",
    isLoggedIn: false,
    orders: [],
  },
};

export const registerUser = createAsyncThunk(
  "users/registerUser",
  async (payload: RegisterUserPayload, { rejectWithValue }) => {
    try {
      const newUser = await registerUserAction(payload);
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
      const user = await logInUserAction(payload);
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
      const updatedUser = await updateUserAction(payload);
      return updatedUser;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const changePassword = createAsyncThunk(
  "users/changePassword",
  async (payload: ChangePasswordPayload, { rejectWithValue }) => {
    try {
      const changePassword = await changePasswordAction(payload);
      return changePassword;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const logout = createAsyncThunk(
  "users/logout",
  async (payload: { id: string }, { rejectWithValue }) => {
    try {
      const user = await logoutAction(payload.id);
      return user;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const placeOrder = createAsyncThunk(
  "users/placeOrder",
  async (payload: PlaceOrderPayload, { rejectWithValue }) => {
    try {
      const updatedUser = await placeOrderAction(payload);
      return updatedUser;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(logInUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload!;
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        state.user = action.payload!;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(placeOrder.fulfilled, (state, action) => {
        state.user = action.payload!;
      });
  },
});

export default usersSlice.reducer;

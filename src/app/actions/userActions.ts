"use server";

import {
  UsersData,
  RegisterUserPayload,
  UpdateUserPayload,
  PlaceOrderPayload,
  ChangePasswordPayload,
  LogInUserPayload,
} from "@/types/UsersData";
import { promises as fs } from "fs";
import { revalidatePath } from "next/cache";
import { nanoid } from "@reduxjs/toolkit";

const filePath = "D:\\NextJsFolder\\e-commerce-users.json";

const readFile = async (): Promise<{ users: UsersData[] }> => {
  try {
    const data = await fs.readFile(filePath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading file:", error);
    throw new Error("Failed to read users data.");
  }
};

const writeFile = async (data: { users: UsersData[] }) => {
  try {
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");
  } catch (error) {
    console.error("Error writing file:", error);
    throw new Error("Failed to write users data.");
  }
};

export const registerUserAction = async (
  payload: RegisterUserPayload
): Promise<UsersData> => {
  const data = await readFile();

  if (data.users.some((user) => user.email === payload.email)) {
    throw new Error("A user with this email already exists.");
  }

  const newUser: UsersData = {
    id: nanoid(5),
    username: payload.username,
    email: payload.email,
    phoneNumber: payload.phoneNumber,
    password: payload.password,
    isLoggedIn: false,
    orders: [],
  };

  data.users.push(newUser);
  await writeFile({ users: data.users });
  revalidatePath("/");
  return newUser;
};

export const logInUserAction = async (
  payload: LogInUserPayload
): Promise<UsersData> => {
  const data = await readFile();
  const user = data.users.find((user) => user.email === payload.email);

  if (!user) {
    throw new Error("User does not exist. Please register.");
  }

  if (
    user.password !== payload.password ||
    user.username !== payload.username
  ) {
    throw new Error("Invalid credentials. Please try again.");
  }

  user.isLoggedIn = true;
  await writeFile({ users: data.users });
  revalidatePath("/");
  return user;
};

export const updateUserAction = async (
  payload: UpdateUserPayload
): Promise<UsersData> => {
  const data = await readFile();
  const userIdx = data.users.findIndex((user) => user.email === payload.email);

  if (userIdx === -1) {
    throw new Error("User does not exist. Please register.");
  }

  const updatedUser: UsersData = { ...data.users[userIdx], ...payload };
  data.users[userIdx] = updatedUser;
  await writeFile({ users: data.users });
  revalidatePath("/profile");
  return updatedUser;
};

export const changePasswordAction = async (
  payload: ChangePasswordPayload
): Promise<UsersData> => {
  const data = await readFile();
  const userIdx = data.users.findIndex((user) => user.id === payload.id);

  if (userIdx === -1) throw new Error("User does not exists. Please register");

  if (data.users[userIdx].password !== payload.oldPassword)
    throw new Error("Please enter correct current password");

  const updatedUser: UsersData = {
    ...data.users[userIdx],
    password: payload.newPassword,
  };
  data.users[userIdx] = updatedUser;
  await writeFile({ users: data.users });
  revalidatePath("/profile");
  return updatedUser;
};

export const logoutAction = async (id: string): Promise<UsersData> => {
  const data = await readFile();
  const userIdx = data.users.findIndex((user) => user.id === id);

  if (userIdx === -1) {
    throw new Error("User does not exist. Please register.");
  }

  data.users[userIdx].isLoggedIn = false;
  await writeFile({ users: data.users });
  revalidatePath("/");
  return data.users[userIdx];
};

export const placeOrderAction = async (
  payload: PlaceOrderPayload
): Promise<UsersData> => {
  const data = await readFile();
  const userIdx = data.users.findIndex((user) => user.id === payload.userId);

  if (userIdx === -1) {
    throw new Error("User does not exist. Please register.");
  }

  const newOrder = {
    id: nanoid(4),
    date: payload.date,
    orderValue: payload.orderValue,
    items: payload.items,
    shippingAddress: payload.shippingAddress,
    deliveryStatus: payload.deliveryStatus,
    paymentMethod: payload.paymentMethod,
  };

  data.users[userIdx].orders.push(newOrder);
  await writeFile({ users: data.users });
  revalidatePath("/");
  return data.users[userIdx];
};

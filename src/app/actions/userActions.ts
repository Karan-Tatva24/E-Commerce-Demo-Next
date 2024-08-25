"use server";

import {
  UsersData,
  RegisterUserPayload,
  UpdateUserPayload,
  PlaceOrderPayload,
} from "@/types/UsersData";
import { promises as fs } from "fs";
import { revalidatePath } from "next/cache";
import { nanoid } from "@reduxjs/toolkit";

const filePath = "D:\\NextJsFolder\\e-commerce-users.json";
// const filePath = "D:\\Learn MERN\\NextJsLearnProjects\\e-commerce-users.json";

const readFile = async (): Promise<{ users: UsersData[] }> => {
  const data = await fs.readFile(filePath, "utf-8");
  return JSON.parse(data);
};

const writeFile = async (data: { users: UsersData[] }) => {
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");
};

export const registerUserAction = async (
  payload: RegisterUserPayload
): Promise<UsersData> => {
  const data = await readFile();

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
    orders: [],
  };

  data.users.push(newUser);
  await writeFile({ users: data.users });
  revalidatePath("/");
  return newUser;
};

export const logInUserAction = async (payload: {
  email: string;
  password: string;
}): Promise<UsersData> => {
  const data = await readFile();
  const userIdx = data.users.findIndex((user) => user.email === payload.email);

  if (userIdx === -1) throw new Error("User does not exist. Please register.");

  const user = { ...data.users[userIdx], isLoggedIn: true };
  data.users[userIdx].isLoggedIn = true;
  await writeFile({ users: data.users });
  revalidatePath("/");
  return user;
};

export const updateUserAction = async (
  payload: UpdateUserPayload
): Promise<UsersData> => {
  const data = await readFile();
  const userIdx = data.users.findIndex((user) => user.email === payload.email);

  if (userIdx === -1) throw new Error("User does not exist. Please register.");

  const updatedUser = { ...data.users[userIdx], ...payload };
  data.users[userIdx] = updatedUser;
  await writeFile({ users: data.users });
  revalidatePath("/");
  return updatedUser;
};

export const deleteUserAction = async (id: string): Promise<void> => {
  const data = await readFile();
  data.users = data.users.filter((user) => user.id !== id);
  await writeFile({ users: data.users });
  revalidatePath("/");
};

export const logoutAction = async (id: string): Promise<UsersData> => {
  const data = await readFile();
  const userIdx = data.users.findIndex((user) => user.id === id);

  if (userIdx === -1) throw new Error("User does not exist. Please register.");

  const user = { ...data.users[userIdx], isLoggedIn: false };
  data.users[userIdx].isLoggedIn = false;
  await writeFile({ users: data.users });
  revalidatePath("/");
  return user;
};

export const placeOrderAction = async (
  payload: PlaceOrderPayload
): Promise<UsersData> => {
  const data = await readFile();
  const userIdx = data.users.findIndex((user) => user.id === payload.userId);

  if (userIdx === -1) throw new Error("User does not exist. Please register.");

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
